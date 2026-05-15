(() => {
  const DATA = window.IFR_APP_DATA || { meta: {}, areas: [], exercises: [] };
  const AREAS = DATA.areas || [];
  const EXERCISES = DATA.exercises || [];
  const TOTAL = EXERCISES.length;
  const DURATION = DATA.meta.durationSeconds || 10800;
  const EXPECTED_TOTAL = DATA.meta.expectedTotalExercises || DATA.meta.totalExercises || TOTAL;
  const CONTENT_STATUS = DATA.meta.contentStatus || {};
  const EXERCISE_INDEX = new Map(EXERCISES.map((exercise, index) => [exercise.id, index]));
  const STORAGE_KEY = 'ifr:ecoems:simulacion-2:progress:v1';
  const STORAGE_VERSION = 1;
  const STORAGE_WRITE_INTERVAL_MS = 10000;
  const PERSISTABLE_STATUSES = new Set(['running', 'finished', 'time_expired']);
  const CONTENT_FINGERPRINT = createContentFingerprint();

  const STATE = {
    status: 'idle',
    activeIndex: 0,
    remainingSeconds: DURATION,
    answersById: Object.create(null),
    reinforcementLog: [],
    hintsOpen: Object.create(null),
    expandedAnswered: Object.create(null),
    floatingReviewId: null,
    pendingSavedProgress: null,
    summary: null,
    modalStep: null,
    deadlineAt: null,
    timerId: null
  };

  const byId = (id) => document.getElementById(id);

  const nodes = {
    body: document.body,
    coverFacts: byId('coverFacts'),
    areaList: byId('areaList'),
    startExam: byId('startExam'),
    startState: byId('startState'),
    examBar: byId('examBar'),
    examBarTitle: byId('examBarTitle'),
    examBarText: byId('examBarText'),
    content: byId('content'),
    timerMetric: byId('timerMetric'),
    timerValue: byId('timerValue'),
    timerNote: byId('timerNote'),
    answeredValue: byId('answeredValue'),
    totalValue: byId('totalValue'),
    correctValue: byId('correctValue'),
    incorrectValue: byId('incorrectValue'),
    scoreValue: byId('scoreValue'),
    scorePercentValue: byId('scorePercentValue'),
    modalShell: byId('modalShell'),
    modalCard: byId('modalCard')
  };

  let topStateFrame = 0;
  let lastPersistedAt = 0;

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function isNarrowViewport() {
    return window.innerWidth <= 860;
  }

  function syncTopState() {
    const hasExamState = STATE.status !== 'idle';
    const isExamRunning = STATE.status === 'running';
    const isExamClosed = STATE.status === 'finished' || STATE.status === 'time_expired';
    const isNarrow = isNarrowViewport();
    const idleScroll = STATE.status === 'idle' && isNarrow ? Math.max(window.scrollY, 0) : 0;
    const idleCompactProgress = clamp(idleScroll / 64);
    const idleTightProgress = clamp((idleScroll - 64) / 120);
    const condensedThreshold = isNarrow ? 96 : 52;
    const hasCompactState = hasExamState;
    const isCondensed = hasExamState && window.scrollY > condensedThreshold;

    nodes.body.classList.toggle('exam-in-progress', isExamRunning);
    nodes.body.classList.toggle('exam-has-results', isExamClosed);
    nodes.body.classList.toggle('top-is-prestart-compact', idleCompactProgress > 0.02);
    nodes.body.classList.toggle('top-is-compact', hasCompactState);
    nodes.body.classList.toggle('top-is-condensed', isCondensed);
    nodes.body.classList.toggle('top-is-narrow', isNarrow);
    nodes.body.style.setProperty('--top-idle-compact-progress', idleCompactProgress.toFixed(3));
    nodes.body.style.setProperty('--top-idle-tight-progress', idleTightProgress.toFixed(3));
  }

  function queueTopStateSync() {
    if (topStateFrame) return;
    topStateFrame = window.requestAnimationFrame(() => {
      topStateFrame = 0;
      syncTopState();
    });
  }

  function stableHash(value) {
    const source = JSON.stringify(value);
    let hash = 2166136261;
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  }

  function createContentFingerprint() {
    return stableHash({
      meta: {
        title: DATA.meta.title || 'Examen simulación 2 ECOEMS',
        total: TOTAL,
        duration: DURATION
      },
      areas: AREAS.map((area) => ({
        id: area.id,
        name: area.name,
        rangeStart: area.rangeStart,
        rangeEnd: area.rangeEnd
      })),
      exercises: EXERCISES.map((exercise) => ({
        id: exercise.id,
        number: exercise.number,
        areaId: exercise.areaId,
        areaName: exercise.areaName,
        block: exercise.block,
        baseText: exercise.baseText,
        prompt: exercise.prompt,
        hint: exercise.hint,
        options: exercise.options.map((option) => ({ label: option.label, text: option.text })),
        correctOption: exercise.correctOption,
        correctOptionText: exercise.correctOptionText,
        correctArgument: exercise.correctArgument,
        incorrectArgumentsByOption: exercise.incorrectArgumentsByOption,
        basePill: exercise.basePill,
        visuals: getExerciseVisuals(exercise).map((visual) => ({
          kind: visual.kind,
          src: visual.src,
          alt: visual.alt,
          caption: visual.caption,
          headers: visual.headers,
          rows: visual.rows,
          hasHorizontalScroll: visual.hasHorizontalScroll
        }))
      }))
    });
  }

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMarkedText(value, marks = []) {
    const text = String(value ?? '');
    const ranges = [];

    for (const mark of marks) {
      const needle = String(mark.text || '');
      if (!needle) continue;
      let fromIndex = 0;
      let index = text.indexOf(needle, fromIndex);
      while (index >= 0) {
        ranges.push({
          start: index,
          end: index + needle.length,
          style: mark.style === 'underline' ? 'underline' : 'highlight'
        });
        fromIndex = index + needle.length;
        index = text.indexOf(needle, fromIndex);
      }
    }

    const cleanRanges = ranges
      .sort((left, right) => left.start - right.start || right.end - left.end)
      .reduce((accepted, range) => {
        const previous = accepted[accepted.length - 1];
        if (previous && range.start < previous.end) return accepted;
        accepted.push(range);
        return accepted;
      }, []);

    if (!cleanRanges.length) return esc(text);

    let cursor = 0;
    let html = '';
    for (const range of cleanRanges) {
      html += esc(text.slice(cursor, range.start));
      html += `<span class="prompt-mark prompt-mark-${range.style}">${esc(text.slice(range.start, range.end))}</span>`;
      cursor = range.end;
    }
    html += esc(text.slice(cursor));
    return html;
  }

  function renderPromptBlock(block, marks = [], className = 'prompt-text') {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    return `<div class="${className}">${lines.map((line) => `<p>${renderMarkedText(line, marks)}</p>`).join('')}</div>`;
  }

  function textToParagraphs(value, marks = []) {
    const blocks = String(value || '')
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    if (!blocks.length) return '';

    return blocks.map((block) => renderPromptBlock(block, marks)).join('');
  }

  function buildMarksFromPill(pill) {
    if (!pill) return [];
    const highlights = Array.isArray(pill.highlights) ? pill.highlights : [];
    const underlines = Array.isArray(pill.underlines) ? pill.underlines : [];
    return [
      ...highlights.map((text) => ({ text, style: 'highlight' })),
      ...underlines.map((text) => ({ text, style: 'underline' }))
    ];
  }

  function renderReadingCapsule(pill, exerciseNumber) {
    if (!pill || !pill.content) return '';
    const marks = buildMarksFromPill(pill);
    return `<div class="reading-capsule" data-reading-capsule="reactivo-${esc(exerciseNumber)}">${textToParagraphs(pill.content, marks).replace(/class="prompt-text"/g, 'class="prompt-text reading-capsule-text"')}</div>`;
  }

  function formatTime(totalSeconds) {
    const safeSeconds = Math.max(0, totalSeconds);
    const hours = String(Math.floor(safeSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((safeSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(safeSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function remainingSecondsUntil(deadlineAt, fallbackSeconds = STATE.remainingSeconds) {
    const safeDeadline = Number(deadlineAt);
    if (!Number.isFinite(safeDeadline) || safeDeadline <= 0) {
      return Math.max(0, Number(fallbackSeconds) || 0);
    }
    return Math.max(0, Math.ceil((safeDeadline - Date.now()) / 1000));
  }

  function setDeadlineFromRemaining(seconds) {
    const safeSeconds = Math.max(0, Number(seconds) || 0);
    STATE.deadlineAt = safeSeconds > 0 ? Date.now() + safeSeconds * 1000 : Date.now();
    STATE.remainingSeconds = safeSeconds;
  }

  function syncRemainingTime() {
    if (STATE.status !== 'running') return STATE.remainingSeconds;
    STATE.remainingSeconds = remainingSecondsUntil(STATE.deadlineAt, STATE.remainingSeconds);
    return STATE.remainingSeconds;
  }

  function formatSavedAt(timestamp) {
    const date = new Date(Number(timestamp) || Date.now());
    try {
      return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(date);
    } catch (error) {
      return date.toLocaleString();
    }
  }

  function plainRecord(record) {
    return Object.entries(record || {}).reduce((accumulator, [key, value]) => {
      accumulator[key] = value;
      return accumulator;
    }, {});
  }

  function booleanRecord(record, validIds) {
    const output = Object.create(null);
    const allowed = new Set(validIds);
    for (const [key, value] of Object.entries(record || {})) {
      if (allowed.has(key)) {
        output[key] = Boolean(value);
      }
    }
    return output;
  }

  function canUseStorage() {
    try {
      return Boolean(window.localStorage);
    } catch (error) {
      return false;
    }
  }

  function createProgressSnapshot(savedAt = Date.now()) {
    if (STATE.status === 'running') {
      syncRemainingTime();
    }

    return {
      version: STORAGE_VERSION,
      contentFingerprint: CONTENT_FINGERPRINT,
      title: DATA.meta.title || 'Examen simulación 2 ECOEMS',
      total: TOTAL,
      savedAt,
      status: STATE.status,
      activeIndex: STATE.activeIndex,
      remainingSeconds: Math.max(0, STATE.remainingSeconds),
      deadlineAt: STATE.deadlineAt,
      answersById: plainRecord(STATE.answersById),
      reinforcementLog: STATE.reinforcementLog.filter((exerciseId) => Boolean(STATE.answersById[exerciseId])),
      hintsOpen: plainRecord(STATE.hintsOpen),
      expandedAnswered: plainRecord(STATE.expandedAnswered),
      floatingReviewId: STATE.floatingReviewId
    };
  }

  function persistProgress({ force = false } = {}) {
    if (!canUseStorage() || !PERSISTABLE_STATUSES.has(STATE.status)) return;

    const now = Date.now();
    if (!force && STATE.status === 'running' && now - lastPersistedAt < STORAGE_WRITE_INTERVAL_MS) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createProgressSnapshot(now)));
      lastPersistedAt = now;
    } catch (error) {
      // Algunos modos privados bloquean localStorage; la evaluación sigue funcionando en memoria.
    }
  }

  function clearPersistedProgress() {
    if (!canUseStorage()) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      lastPersistedAt = 0;
    } catch (error) {
      lastPersistedAt = 0;
    }
  }

  function sanitizeSavedProgress(rawSnapshot) {
    if (!rawSnapshot || rawSnapshot.version !== STORAGE_VERSION) return null;
    if (rawSnapshot.contentFingerprint !== CONTENT_FINGERPRINT) return null;
    if (!PERSISTABLE_STATUSES.has(rawSnapshot.status)) return null;

    const rawAnswers = rawSnapshot.answersById || {};
    const answersById = Object.create(null);
    let firstUnansweredIndex = 0;

    for (const exercise of EXERCISES) {
      const savedAnswer = rawAnswers[exercise.id];
      if (!savedAnswer) break;

      const selectedOption = String(savedAnswer.selectedOption || '').toLowerCase();
      const validOptionLabels = new Set(exercise.options.map((option) => option.label));
      if (!validOptionLabels.has(selectedOption)) break;

      answersById[exercise.id] = {
        selectedOption,
        isCorrect: selectedOption === exercise.correctOption
      };
      firstUnansweredIndex += 1;
    }

    const answeredIds = Object.keys(answersById);
    if (!answeredIds.length && rawSnapshot.status === 'finished') return null;

    let status = rawSnapshot.status;
    let remainingSeconds = Math.max(0, Number(rawSnapshot.remainingSeconds) || 0);
    const savedAt = Number(rawSnapshot.savedAt) || Date.now();
    const rawDeadlineAt = Number(rawSnapshot.deadlineAt);
    const fallbackDeadlineAt = savedAt + remainingSeconds * 1000;
    const deadlineAt = Number.isFinite(rawDeadlineAt) && rawDeadlineAt > 0
      ? rawDeadlineAt
      : fallbackDeadlineAt;

    if (status === 'running') {
      remainingSeconds = remainingSecondsUntil(deadlineAt, remainingSeconds);
      if (remainingSeconds <= 0) {
        status = 'time_expired';
      }
    }

    if (status === 'running' && firstUnansweredIndex >= TOTAL) {
      status = 'finished';
    }

    const activeIndex = status === 'running'
      ? Math.min(firstUnansweredIndex, Math.max(TOTAL - 1, 0))
      : Math.min(Math.max(Number(rawSnapshot.activeIndex) || firstUnansweredIndex, 0), Math.max(TOTAL - 1, 0));

    const incorrectIds = answeredIds.filter((exerciseId) => answersById[exerciseId] && !answersById[exerciseId].isCorrect);
    const savedLog = Array.isArray(rawSnapshot.reinforcementLog) ? rawSnapshot.reinforcementLog : [];
    const reinforcementLog = savedLog.length
      ? savedLog.filter((exerciseId) => incorrectIds.includes(exerciseId))
      : incorrectIds;

    const floatingReviewId = answeredIds.includes(rawSnapshot.floatingReviewId) && status === 'running'
      ? rawSnapshot.floatingReviewId
      : null;

    return {
      status,
      activeIndex,
      remainingSeconds,
      deadlineAt: status === 'running' ? deadlineAt : null,
      answersById,
      reinforcementLog,
      hintsOpen: booleanRecord(rawSnapshot.hintsOpen, EXERCISES.map((exercise) => exercise.id)),
      expandedAnswered: booleanRecord(rawSnapshot.expandedAnswered, answeredIds),
      floatingReviewId,
      savedAt,
      answeredCount: answeredIds.length
    };
  }

  function readSavedProgress() {
    if (!canUseStorage()) return null;
    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);
      if (!rawValue) return null;
      const savedProgress = sanitizeSavedProgress(JSON.parse(rawValue));
      if (!savedProgress) {
        clearPersistedProgress();
      }
      return savedProgress;
    } catch (error) {
      clearPersistedProgress();
      return null;
    }
  }

  const IMPROVEMENT_PDF_FILENAME = 'reactivos-que-debo-mejorar-ecoems-ifr-simulacion-2.pdf';

  function triggerPdfDownload(blob, filename = IMPROVEMENT_PDF_FILENAME) {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  function waitForFontsReady(timeout = 1400) {
    if (!document.fonts || !document.fonts.ready) return Promise.resolve();
    return Promise.race([
      document.fonts.ready.catch(() => null),
      new Promise((resolve) => window.setTimeout(resolve, timeout))
    ]);
  }

  function formatPercent(value) {
    return `${value.toFixed(1)}/100`;
  }

  function isClosedStatus(status = STATE.status) {
    return status === 'finished' || status === 'time_expired';
  }

  function getMetrics() {
    const answers = Object.values(STATE.answersById);
    const answered = answers.length;
    const correct = answers.filter((answer) => answer.isCorrect).length;
    const incorrect = answered - correct;
    const percent = TOTAL ? (correct / TOTAL) * 100 : 0;

    return {
      answered,
      correct,
      incorrect,
      rawScore: correct,
      percent
    };
  }

  function buildCoverFacts() {
    if (CONTENT_STATUS.partial) {
      return [
        { value: `${TOTAL}/${EXPECTED_TOTAL}`, label: 'reactivos disponibles' },
        { value: AREAS.length, label: 'áreas esperadas' },
        { value: 'Física', label: 'pendiente 105 a 116' },
        { value: '3 h', label: 'tiempo límite' }
      ]
        .map(
          (fact) => `<article class="fact">
          <strong>${esc(fact.value)}</strong>
          <span>${esc(fact.label)}</span>
        </article>`
        )
        .join('');
    }

    return [
      { value: TOTAL, label: 'reactivos totales' },
      { value: AREAS.length, label: 'áreas temáticas' },
      { value: '3 h', label: 'tiempo límite' },
      { value: '5', label: 'opciones por reactivo' }
    ]
      .map(
        (fact) => `<article class="fact">
          <strong>${esc(fact.value)}</strong>
          <span>${esc(fact.label)}</span>
        </article>`
      )
      .join('');
  }

  function buildAreaList() {
    return AREAS.map(
      (area) => `<article class="area-item">
        <div class="area-item-head">
          <strong>${esc(area.name)}</strong>
          <span class="area-range">Reactivos ${esc(area.rangeStart)} a ${esc(area.rangeEnd)}</span>
        </div>
        <span>${area.totalExercises ? `${esc(area.totalExercises)} reactivos disponibles` : 'Pendiente'}</span>
      </article>`
    ).join('');
  }

  function renderTopMetrics() {
    if (STATE.status === 'running') {
      syncRemainingTime();
    }

    const metrics = getMetrics();
    nodes.totalValue.textContent = String(TOTAL);
    nodes.answeredValue.textContent = String(metrics.answered);
    nodes.correctValue.textContent = String(metrics.correct);
    nodes.incorrectValue.textContent = String(metrics.incorrect);
    nodes.scoreValue.textContent = `${metrics.rawScore}/${TOTAL}`;
    nodes.scorePercentValue.textContent = formatPercent(metrics.percent);
    nodes.timerValue.textContent = formatTime(STATE.remainingSeconds);

    nodes.timerMetric.classList.toggle('metric-critical', STATE.status === 'running' && STATE.remainingSeconds <= 300);

    if (STATE.status === 'idle') {
      nodes.timerNote.textContent = '';
      return;
    }

    if (STATE.status === 'running') {
      nodes.timerNote.textContent = 'Responde en orden hasta completar la evaluación.';
      return;
    }

    if (STATE.status === 'time_expired') {
      nodes.timerNote.textContent = 'El tiempo concluyó. La evaluación quedó cerrada.';
      return;
    }

    nodes.timerNote.textContent = 'La evaluación terminó. Puedes revisar solo tus reactivos contestados.';
  }

  function renderCover() {
    nodes.coverFacts.innerHTML = buildCoverFacts();
    nodes.areaList.innerHTML = buildAreaList();

    if (STATE.status === 'idle') {
      nodes.startExam.disabled = false;
      nodes.startExam.textContent = 'Iniciar examen';
      nodes.startState.textContent = 'La evaluación está detenida. El tiempo no corre hasta que presiones «Iniciar examen».';
      return;
    }

    nodes.startExam.disabled = true;
    nodes.startExam.textContent = STATE.status === 'running' ? 'Examen en curso' : 'Examen concluido';

    if (STATE.status === 'running') {
      nodes.startState.textContent = 'La evaluación está activa. Responde en orden para avanzar por los reactivos disponibles.';
      return;
    }

    if (STATE.status === 'time_expired') {
      nodes.startState.textContent = 'El tiempo límite terminó. Ahora solo puedes revisar tus reactivos ya contestados.';
      return;
    }

    nodes.startState.textContent = 'La evaluación terminó antes del tiempo límite. Puedes revisar tus reactivos contestados en modo lectura.';
  }

  function renderExamBar() {
    if (STATE.status === 'idle') {
      nodes.examBar.hidden = true;
      return;
    }

    nodes.examBar.hidden = false;

    if (STATE.status === 'running') {
      nodes.examBarTitle.textContent = 'Evaluación en curso';
      nodes.examBarText.textContent = 'Responde en orden. El siguiente reactivo se habilita cuando cierras el actual.';
      return;
    }

    if (STATE.status === 'time_expired') {
      nodes.examBarTitle.textContent = 'Tiempo agotado';
      nodes.examBarText.textContent = 'La evaluación se cerró de forma automática. Solo puedes revisar los reactivos que sí contestaste.';
      return;
    }

    nodes.examBarTitle.textContent = 'Evaluación concluida';
    nodes.examBarText.textContent = 'El examen ya quedó cerrado. Puedes consultar en modo lectura los reactivos que alcanzaste a contestar.';
  }

  function isRunning() {
    return STATE.status === 'running';
  }

  function getExerciseAnswer(exerciseId) {
    return STATE.answersById[exerciseId] || null;
  }

  function isCurrentExercise(index) {
    return isRunning() && index === STATE.activeIndex;
  }

  function isAnsweredExpanded(exerciseId) {
    return Boolean(STATE.expandedAnswered[exerciseId]);
  }

  function renderVisual(visual) {
    if (!visual || (!visual.content && !visual.src && !Array.isArray(visual.rows))) return '';

    if (visual.kind === 'image' && visual.src) {
      return `<div class="visual-panel visual-panel-image"><img src="${esc(visual.src)}" alt="${esc(visual.alt || '')}"></div>`;
    }

    if (visual.kind === 'svg') {
      return `<div class="visual-panel visual-panel-svg">${visual.content}</div>`;
    }

    if (visual.kind === 'preformatted') {
      return `<div class="visual-panel visual-panel-preformatted" role="region" aria-label="Tabla con desplazamiento horizontal" tabindex="0"><pre>${esc(visual.content)}</pre></div>`;
    }

    if (visual.kind === 'pending-image') {
      return `<div class="visual-panel visual-panel-pending" role="note">
        <strong>Apoyo visual pendiente</strong>
        <p>Este reactivo requiere una imagen que todavía debe generarse y validarse antes de publicar el examen completo.</p>
      </div>`;
    }

    if (visual.kind === 'table') {
      const headers = Array.isArray(visual.headers) ? visual.headers : [];
      const rows = Array.isArray(visual.rows) ? visual.rows : [];
      const headerMarkup = headers.length
        ? `<thead><tr>${headers.map((cell) => `<th scope="col">${esc(cell)}</th>`).join('')}</tr></thead>`
        : '';
      const bodyMarkup = rows.length
        ? `<tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`
        : '';
      return `<div class="visual-panel visual-panel-table" role="region" aria-label="Tabla con desplazamiento horizontal" tabindex="0"><table>${headerMarkup}${bodyMarkup}</table></div>`;
    }

    return '';
  }

  function getExerciseVisuals(exercise) {
    if (Array.isArray(exercise.visuals)) {
      return exercise.visuals.filter((visual) => visual && visual.kind && visual.kind !== 'none');
    }
    if (exercise.visual && exercise.visual.kind && exercise.visual.kind !== 'none') {
      return [exercise.visual];
    }
    return [];
  }

  function renderExercisePrompt(exercise) {
    const parts = [];
    const visuals = getExerciseVisuals(exercise);

    if (exercise.basePill) {
      parts.push(renderReadingCapsule(exercise.basePill, exercise.number));
    } else if (exercise.baseText) {
      parts.push(textToParagraphs(exercise.baseText, exercise.promptMarks));
    }

    visuals
      .filter((visual) => visual.position === 'base')
      .forEach((visual) => parts.push(renderVisual(visual)));

    parts.push(textToParagraphs(exercise.prompt, exercise.promptMarks));

    visuals
      .filter((visual) => visual.position !== 'base')
      .forEach((visual) => parts.push(renderVisual(visual)));

    return parts.filter(Boolean).join('');
  }

  function renderOptionCopy(option) {
    if (option.kind === 'image' && option.imageSrc) {
      const caption = option.text && option.showCaption !== false
        ? `<p class="option-caption">${esc(option.text)}</p>`
        : '';
      return `<div class="option-visual"><img src="${esc(option.imageSrc)}" alt="${esc(option.imageAlt || option.text || '')}"></div>${caption}`;
    }

    if (option.kind === 'svg' && option.visualContent) {
      return `<div class="option-visual">${option.visualContent}</div>${option.text ? `<p class="option-caption">${esc(option.text)}</p>` : ''}`;
    }

    if (option.kind === 'preformatted') {
      return `<pre class="option-pre">${esc(option.text)}</pre>`;
    }

    return textToParagraphs(option.text);
  }

  function renderInteractiveOption(option, exerciseId) {
    return `<button class="option is-button" type="button" data-action="answer" data-id="${esc(exerciseId)}" data-option="${esc(option.label)}">
      <div class="option-head">
        <span class="option-letter">${esc(option.label.toUpperCase())}</span>
        <span class="option-state">Selecciona</span>
      </div>
      <div class="option-copy">${renderOptionCopy(option)}</div>
    </button>`;
  }

  function renderResolvedOption(option, tone, stateLabel, shake = false) {
    const toneClass = tone === 'correct' ? 'is-correct' : tone === 'incorrect' ? 'is-incorrect' : 'is-muted';
    const shakeClass = shake ? ' is-shaking' : '';
    return `<article class="option ${toneClass}${shakeClass}">
      <div class="option-head">
        <span class="option-letter">${esc(option.label.toUpperCase())}</span>
        <span class="option-state">${esc(stateLabel)}</span>
      </div>
      <div class="option-copy">${renderOptionCopy(option)}</div>
    </article>`;
  }

  function renderHint(exerciseId, exercise) {
    if (!STATE.hintsOpen[exerciseId]) return '';
    return `<section class="hint-panel">
      <strong>Pista</strong>
      <p>${esc(exercise.hint)}</p>
    </section>`;
  }

  function renderCorrectFeedback(exercise) {
    const incorrectCards = exercise.options
      .filter((option) => option.label !== exercise.correctOption)
      .map((option) => {
        const text = exercise.incorrectArgumentsByOption[option.label] || 'Sin argumento disponible.';
        return `<article class="argument-card incorrect">
          <div class="argument-head">
            <strong>Opción ${esc(option.label.toUpperCase())}</strong>
            <span class="argument-badge">✘ Opción incorrecta</span>
          </div>
          ${textToParagraphs(text)}
        </article>`;
      })
      .join('');

    return `<section class="feedback-panel">
      <div class="feedback-title">
        <div>
          <strong>✓. Opción correcta</strong>
          <p>Se muestra el argumento correcto y, debajo, las razones por las que las demás opciones no corresponden.</p>
        </div>
        <span class="state-chip correct">✓. Opción correcta</span>
      </div>
      <div class="feedback-grid">
        <article class="argument-card correct">
          <div class="argument-head">
            <strong>Opción ${esc(exercise.correctOption.toUpperCase())}</strong>
            <span class="argument-badge">✓. Opción correcta</span>
          </div>
          ${textToParagraphs(exercise.correctArgument)}
        </article>
        ${incorrectCards}
      </div>
    </section>`;
  }

  function renderIncorrectFeedback(exercise, answer) {
    const wrongText = exercise.incorrectArgumentsByOption[answer.selectedOption] || 'Sin argumento disponible.';
    return `<section class="feedback-panel">
      <div class="feedback-title">
        <div>
          <strong>✘ Opción incorrecta</strong>
          <p>Se conserva solo la opción elegida, la respuesta correcta y los argumentos indispensables para revisar el error.</p>
        </div>
        <span class="state-chip incorrect">✘ Opción incorrecta</span>
      </div>
      <div class="feedback-grid">
        <article class="argument-card correct">
          <div class="argument-head">
            <strong>Opción ${esc(exercise.correctOption.toUpperCase())}</strong>
            <span class="argument-badge">✓. Opción correcta</span>
          </div>
          ${textToParagraphs(exercise.correctArgument)}
        </article>
        <article class="argument-card incorrect">
          <div class="argument-head">
            <strong>Opción ${esc(answer.selectedOption.toUpperCase())}</strong>
            <span class="argument-badge">✘ Opción incorrecta</span>
          </div>
          ${textToParagraphs(wrongText)}
        </article>
      </div>
    </section>`;
  }

  function renderFloatingReviewPrompt() {
    const exerciseId = STATE.floatingReviewId;
    if (!isRunning() || !exerciseId || !STATE.answersById[exerciseId]) return '';

    return `<section class="floating-review" aria-label="Revisión opcional del reactivo anterior">
      <div class="floating-review-copy">
        <strong>Revisión opcional del reactivo anterior</strong>
        <p>Si quieres, revisa si tu respuesta fue correcta o incorrecta y consulta los argumentos de cada opción antes de seguir.</p>
      </div>
      <div class="floating-review-actions">
        <button class="floating-review-btn" type="button" data-action="open-floating-review" data-id="${esc(exerciseId)}">
          Ver resultado y argumentos
        </button>
        <button class="floating-review-dismiss" type="button" aria-label="Descartar revisión opcional" data-action="dismiss-floating-review" data-id="${esc(exerciseId)}">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </section>`;
  }

  function renderCurrentCard(exercise) {
    return `<section class="exercise-shell exercise-shell-current" id="${esc(exercise.id)}">
      ${renderFloatingReviewPrompt()}
      <article class="card">
        <header class="card-header">
          <div class="card-title">
            <div class="card-kicker">
              <span class="kicker-chip">Reactivo ${esc(exercise.number)}</span>
              <span class="kicker-chip">${esc(exercise.areaName)}</span>
              <span class="kicker-chip">${esc(exercise.block)}</span>
            </div>
            <h2>Resuelve este reactivo para continuar</h2>
          </div>
          <div class="card-status">
            <span class="state-chip active">Actual</span>
          </div>
        </header>
        <div class="card-body">
          <section class="prompt-panel">
            ${renderExercisePrompt(exercise)}
          </section>
          <section class="option-list">
            ${exercise.options.map((option) => renderInteractiveOption(option, exercise.id)).join('')}
          </section>
          <div class="action-row">
            <button class="action-btn${STATE.hintsOpen[exercise.id] ? ' active' : ''}" type="button" data-action="toggle-hint" data-id="${esc(exercise.id)}">
              ${STATE.hintsOpen[exercise.id] ? 'Ocultar pista' : 'Ver pista'}
            </button>
          </div>
          ${renderHint(exercise.id, exercise)}
        </div>
      </article>
    </section>`;
  }

  function renderAnsweredCard(exercise, answer, expanded) {
    const selectedOption = exercise.options.find((option) => option.label === answer.selectedOption);
    const correctOption = exercise.options.find((option) => option.label === exercise.correctOption);
    const optionMarkup = answer.isCorrect
      ? exercise.options
          .map((option) => renderResolvedOption(option, option.label === exercise.correctOption ? 'correct' : 'incorrect', option.label === exercise.correctOption ? '✓. Opción correcta' : '✘ Opción incorrecta'))
          .join('')
      : [
          selectedOption ? renderResolvedOption(selectedOption, 'incorrect', '✘ Opción incorrecta', true) : '',
          correctOption ? renderResolvedOption(correctOption, 'correct', '✓. Opción correcta') : ''
        ].join('');

    const headerSummary = answer.isCorrect
      ? [
          '<span class="summary-chip">✓. Opción correcta</span>',
          `<span class="summary-chip">Opción ${esc(answer.selectedOption.toUpperCase())}</span>`
        ].join('')
      : [
          '<span class="summary-chip">✘ Opción incorrecta</span>',
          `<span class="summary-chip">Elegiste ${esc(answer.selectedOption.toUpperCase())}</span>`,
          `<span class="summary-chip">Correcta ${esc(exercise.correctOption.toUpperCase())}</span>`
        ].join('');

    return `<article class="card" id="${esc(exercise.id)}">
      <button class="card-toggle" type="button" data-action="toggle-card" data-id="${esc(exercise.id)}">
        <div class="card-title">
          <div class="card-kicker">
            <span class="kicker-chip">Reactivo ${esc(exercise.number)}</span>
            <span class="kicker-chip">${esc(exercise.areaName)}</span>
            <span class="kicker-chip">${esc(exercise.block)}</span>
          </div>
          <h3>${answer.isCorrect ? 'Reactivo resuelto correctamente' : 'Reactivo revisable con error detectado'}</h3>
          <p>Este reactivo ya quedó cerrado para edición. Puedes abrirlo solo para consulta.</p>
        </div>
        <div class="card-status">
          <span class="state-chip ${answer.isCorrect ? 'correct' : 'incorrect'}">${answer.isCorrect ? '✓. Opción correcta' : '✘ Opción incorrecta'}</span>
          <span class="toggle-label">${expanded ? 'Ocultar revisión' : 'Ver revisión'}</span>
          <div class="summary-inline">${headerSummary}</div>
        </div>
      </button>
      ${
        expanded
          ? `<div class="card-body">
              <section class="prompt-panel">
                ${renderExercisePrompt(exercise)}
              </section>
              <section class="option-list">${optionMarkup}</section>
              ${answer.isCorrect ? renderCorrectFeedback(exercise) : renderIncorrectFeedback(exercise, answer)}
            </div>`
          : ''
      }
    </article>`;
  }

  function renderLockedCard(exercise) {
    return `<article class="card is-locked" id="${esc(exercise.id)}">
      <header class="card-header">
        <div class="card-title">
          <div class="card-kicker">
            <span class="kicker-chip">Reactivo ${esc(exercise.number)}</span>
          </div>
          <h3>Reactivo bloqueado</h3>
          <p>Se habilitará automáticamente cuando termines el reactivo actual.</p>
        </div>
        <div class="card-status">
          <span class="state-chip locked">Bloqueado</span>
        </div>
      </header>
      <div class="locked-note">
        <strong>Contenido no disponible todavía</strong>
        <p>La evaluación se responde de arriba hacia abajo. No puedes visualizar el siguiente reactivo hasta resolver el actual.</p>
      </div>
    </article>`;
  }

  function renderUnansweredCard(exercise) {
    return `<article class="card is-unanswered" id="${esc(exercise.id)}">
      <header class="card-header">
        <div class="card-title">
          <div class="card-kicker">
            <span class="kicker-chip">Reactivo ${esc(exercise.number)}</span>
            <span class="kicker-chip">${esc(exercise.areaName)}</span>
            <span class="kicker-chip">${esc(exercise.block)}</span>
          </div>
          <h3>Reactivo no respondido</h3>
          <p>Este reactivo quedó sin resolver antes del cierre del examen y permanece bloqueado.</p>
        </div>
        <div class="card-status">
          <span class="state-chip timeout">No respondido</span>
        </div>
      </header>
      <div class="locked-note">
        <strong>Sin acceso al contenido</strong>
        <p>El tiempo límite o el cierre del examen impidieron responder este reactivo. Solo se conserva el registro para el resumen final.</p>
      </div>
    </article>`;
  }

  function trimPromptSummary(value, maxLength = 150) {
    const normalized = String(value || '')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.;:!?])/g, '$1')
      .trim();

    if (normalized.length <= maxLength) return normalized;

    const truncated = normalized.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const cutoff = lastSpace > 92 ? lastSpace : maxLength;
    return `${truncated.slice(0, cutoff).trim()}...`;
  }

  function summarizeExercisePrompt(exercise) {
    const prompt = String(exercise.prompt || '').trim();
    const visualAlt = getExerciseVisuals(exercise)
      .map((visual) => visual.alt)
      .filter(Boolean)
      .join(' ')
      .trim();
    const usesVisual = visualAlt && /\b(figura|imagen|tabla|gráfica|grafica|observa|siguiente)\b/i.test(prompt);
    const source = usesVisual ? `${prompt} ${visualAlt}` : prompt;
    return trimPromptSummary(source);
  }

  function buildReinforcementGroups() {
    const groups = [];
    const groupMap = new Map();
    const loggedExerciseIds = STATE.reinforcementLog.length
      ? STATE.reinforcementLog
      : EXERCISES
          .filter((exercise) => {
            const answer = STATE.answersById[exercise.id];
            return Boolean(answer && !answer.isCorrect);
          })
          .map((exercise) => exercise.id);

    loggedExerciseIds.forEach((exerciseId) => {
      const exerciseIndex = EXERCISE_INDEX.get(exerciseId);
      const exercise = Number.isInteger(exerciseIndex) ? EXERCISES[exerciseIndex] : null;
      if (!exercise) return;

      const key = `${exercise.areaId}::${exercise.block}`;
      if (!groupMap.has(key)) {
        const group = {
          areaName: exercise.areaName,
          block: exercise.block,
          exercises: []
        };
        groupMap.set(key, group);
        groups.push(group);
      }

      groupMap.get(key).exercises.push({
        number: exercise.number,
        summary: summarizeExercisePrompt(exercise)
      });
    });

    return groups;
  }

  function renderFinalMetrics(summary) {
    const cards = [
      {
        className: 'answered',
        label: 'Reactivos contestados',
        value: summary.metrics.answered,
        note: `de ${TOTAL}`
      },
      {
        className: 'correct',
        label: 'Reactivos correctos',
        value: summary.metrics.correct,
        note: 'aciertos'
      },
      {
        className: 'incorrect',
        label: 'Reactivos incorrectos',
        value: summary.metrics.incorrect,
        note: 'errores'
      },
      {
        className: 'score',
        label: 'Puntaje',
        value: `${summary.metrics.rawScore}/${TOTAL}`,
        note: formatPercent(summary.metrics.percent)
      }
    ];

    return `<section class="final-metrics" aria-label="Métricas del resultado final">
      ${cards.map((card) => `
        <article class="final-metric-card ${esc(card.className)}">
          <span>${esc(card.label)}</span>
          <strong>${esc(card.value)}</strong>
          <small>${esc(card.note)}</small>
        </article>
      `).join('')}
    </section>`;
  }

  function renderReinforcementList(summary) {
    const groups = summary.reinforcementGroups || [];
    if (!groups.length) {
      return `<section class="final-reinforcement" aria-labelledby="reinforcementTitle">
        <h3 id="reinforcementTitle">Bloques temáticos que debes reforzar 🤓:</h3>
        <div class="final-empty-state">
          <strong>No se registraron reactivos incorrectos.</strong>
          <p>El intento no generó bloques temáticos para reforzar por error. Puedes revisar tus reactivos contestados en modo lectura.</p>
        </div>
      </section>`;
    }

    return `<section class="final-reinforcement" aria-labelledby="reinforcementTitle">
      <h3 id="reinforcementTitle">Bloques temáticos que debes reforzar 🤓:</h3>
      <ul class="reinforcement-list">
        ${groups.map((group) => `
          <li class="reinforcement-group">
            <div class="reinforcement-area-row">
              <span class="reinforcement-hyphen" aria-hidden="true">-</span>
              <span class="reinforcement-pill area">${esc(group.areaName)}</span>
            </div>
            <div class="reinforcement-block-row">
              <span class="reinforcement-pill block">${esc(group.block)}</span>
            </div>
            <ul class="reinforcement-reactivos">
              ${group.exercises.map((item) => `
                <li><strong>Reactivo ${esc(item.number)}.</strong> ${esc(item.summary)}</li>
              `).join('')}
            </ul>
          </li>
        `).join('')}
      </ul>
    </section>`;
  }

  function renderFinalResultPanel(summary) {
    const modeLabel = summary.mode === 'time_expired' ? 'Cierre por tiempo' : 'Cierre por término';
    const modeText = summary.mode === 'time_expired'
      ? 'La evaluación se cerró al agotarse el tiempo. El resultado integra solo los reactivos contestados.'
      : 'La evaluación se cerró al terminar todos los reactivos. El resultado integra el intento completo.';

    return `<section class="final-result-panel" id="resultado-final" aria-labelledby="resultadoFinalTitle">
      <div class="final-result-head">
        <div>
          <span class="pill final-mode">${esc(modeLabel)}</span>
          <h2 id="resultadoFinalTitle">Resultado final</h2>
        </div>
        <div class="final-result-head-actions">
          <p>${esc(modeText)}</p>
          <button class="download-results-btn" type="button" data-action="download-results">Obtener reactivos que debo mejorar</button>
        </div>
      </div>
      ${renderFinalMetrics(summary)}
      ${renderReinforcementList(summary)}
      <div class="final-actions final-actions-bottom">
        <button class="download-results-btn" type="button" data-action="download-results">Obtener reactivos que debo mejorar</button>
      </div>
    </section>`;
  }

  function renderContent() {
    if (STATE.status === 'idle') {
      nodes.content.hidden = true;
      nodes.content.innerHTML = '';
      return;
    }

    nodes.content.hidden = false;
    const finalPanelMarkup = isClosedStatus() && STATE.summary ? renderFinalResultPanel(STATE.summary) : '';
    const exerciseMarkup = EXERCISES.map((exercise, index) => {
      const answer = getExerciseAnswer(exercise.id);
      if (answer) {
        return renderAnsweredCard(exercise, answer, isAnsweredExpanded(exercise.id));
      }

      if (isCurrentExercise(index)) {
        return renderCurrentCard(exercise);
      }

      if (STATE.status === 'running') {
        return renderLockedCard(exercise);
      }

      return renderUnansweredCard(exercise);
    }).join('');

    nodes.content.innerHTML = `${finalPanelMarkup}${exerciseMarkup}`;
  }

  function buildGroupedList(filterFn) {
    const groups = [];
    const groupMap = new Map();

    EXERCISES.forEach((exercise) => {
      if (!filterFn(exercise)) return;
      const key = `${exercise.areaId}::${exercise.block}`;
      if (!groupMap.has(key)) {
        const group = {
          areaName: exercise.areaName,
          block: exercise.block,
          numbers: []
        };
        groupMap.set(key, group);
        groups.push(group);
      }
      groupMap.get(key).numbers.push(exercise.number);
    });

    return groups;
  }

  function buildSummary(mode) {
    const metrics = getMetrics();
    const pendingGroups = mode === 'time_expired'
      ? buildGroupedList((exercise) => !STATE.answersById[exercise.id])
      : [];
    const reviewGroups = buildGroupedList((exercise) => {
      const answer = STATE.answersById[exercise.id];
      return Boolean(answer && !answer.isCorrect);
    });

    return {
      mode,
      metrics,
      pendingGroups,
      reviewGroups,
      reinforcementGroups: buildReinforcementGroups()
    };
  }

  function renderResumeChoiceModal(snapshot) {
    const isRunningSnapshot = snapshot.status === 'running';
    const statusLabel = snapshot.status === 'time_expired'
      ? 'Tiempo agotado'
      : snapshot.status === 'finished'
        ? 'Examen concluido'
        : 'Examen en curso';
    const currentExerciseNumber = isRunningSnapshot && EXERCISES[snapshot.activeIndex]
      ? EXERCISES[snapshot.activeIndex].number
      : snapshot.answeredCount;
    const progressLabel = isRunningSnapshot ? 'Reactivo' : 'Avance';
    const warningText = isRunningSnapshot
      ? 'Si reinicias, se borrarán tus respuestas guardadas, el avance y el tiempo registrado de este intento.'
      : 'Si reinicias, se borrará el intento guardado y volverás a la portada inicial.';

    return `<div class="modal-head resume-choice-head">
      <span class="pill">Recarga protegida</span>
      <h2 id="resumeChoiceTitle">🔄 Hay un avance guardado</h2>
      <p id="resumeChoiceText">Encontramos un intento anterior de esta evaluación. Puedes continuar sin reiniciar el progreso o borrar el intento para empezar desde cero.</p>
    </div>
    <section class="resume-choice-grid" aria-label="Resumen del intento guardado">
      <article class="resume-choice-card">
        <span>Estado</span>
        <strong>${esc(statusLabel)}</strong>
      </article>
      <article class="resume-choice-card">
        <span>${esc(progressLabel)}</span>
        <strong>${esc(currentExerciseNumber)}/${esc(TOTAL)}</strong>
      </article>
      <article class="resume-choice-card">
        <span>Contestados</span>
        <strong>${esc(snapshot.answeredCount)}</strong>
      </article>
      <article class="resume-choice-card">
        <span>Tiempo</span>
        <strong>${esc(formatTime(snapshot.remainingSeconds))}</strong>
      </article>
    </section>
    <p class="resume-choice-note">🕒 Guardado: ${esc(formatSavedAt(snapshot.savedAt))}</p>
    <p class="resume-warning">⚠️ ${esc(warningText)}</p>
    <div class="modal-actions resume-choice-actions">
      <button class="modal-btn primary" type="button" data-action="restore-progress" data-autofocus="true">🔄 Continuar sin reiniciar</button>
      <button class="modal-btn warning" type="button" data-action="reset-progress">🧹 Reiniciar desde cero</button>
    </div>`;
  }

  function renderSummaryModal(summary) {
    const title = summary.mode === 'time_expired' ? 'Tiempo límite alcanzado' : 'Examen concluido';
    const message = summary.mode === 'time_expired'
      ? 'La evaluación se cerró automáticamente. Aquí tienes el corte exacto de tu avance antes del agotamiento del tiempo.'
      : 'Terminaste el examen antes del tiempo límite. Aquí tienes tu resultado acumulado y el cierre del intento.';

    const pendingMarkup = summary.pendingGroups.length
      ? `<section class="group-list">
          ${summary.pendingGroups.map((group) => `
            <article class="review-card">
              <strong>${esc(group.areaName)} · ${esc(group.block)}</strong>
              <p>Reactivos faltantes por resolver</p>
              <div class="reactivo-list">
                ${group.numbers.map((number) => `<span class="reactivo-pill">${esc(number)}</span>`).join('')}
              </div>
            </article>
          `).join('')}
        </section>`
      : '';

    return `<div class="modal-head">
      <span class="pill">${summary.mode === 'time_expired' ? 'Cierre por tiempo' : 'Cierre por término'}</span>
      <h2>${esc(title)}</h2>
      <p>${esc(message)}</p>
    </div>
    <section class="modal-grid">
      <article class="summary-card">
        <strong>${esc(summary.metrics.answered)}</strong>
        <span>Reactivos contestados</span>
      </article>
      <article class="summary-card">
        <strong>${esc(summary.metrics.correct)}</strong>
        <span>Reactivos correctos</span>
      </article>
      <article class="summary-card">
        <strong>${esc(summary.metrics.incorrect)}</strong>
        <span>Reactivos incorrectos</span>
      </article>
      <article class="summary-card">
        <strong>${esc(summary.metrics.rawScore)}/${esc(TOTAL)}</strong>
        <span>Aciertos acumulados</span>
      </article>
      <article class="summary-card">
        <strong>${esc(summary.metrics.percent.toFixed(1))}</strong>
        <span>Puntaje sobre 100</span>
      </article>
    </section>
    ${
      summary.pendingGroups.length
        ? `<section class="modal-head">
            <h3>Reactivos pendientes al momento del cierre</h3>
            <p>Se listan por área temática y bloque para identificar lo que faltó resolver.</p>
          </section>
          ${pendingMarkup}`
        : ''
    }
    <div class="modal-actions">
      <button class="modal-btn primary" type="button" data-action="modal-review">Ver repaso recomendado</button>
    </div>`;
  }

  function renderReviewModal(summary) {
    const reviewMarkup = summary.reviewGroups.length
      ? `<section class="group-list">
          ${summary.reviewGroups.map((group) => `
            <article class="review-card">
              <strong>${esc(group.areaName)} · ${esc(group.block)}</strong>
              <p>Conviene repasar este bloque porque aquí hubo al menos un error.</p>
              <div class="reactivo-list">
                ${group.numbers.map((number) => `<span class="reactivo-pill">Reactivo ${esc(number)}</span>`).join('')}
              </div>
            </article>
          `).join('')}
        </section>`
      : `<section class="empty-review">
          <strong>No se detectaron bloques con error.</strong>
          <p>El cierre del examen no registró respuestas incorrectas. Puedes revisar tus reactivos contestados en modo lectura para confirmar el procedimiento.</p>
        </section>`;

    return `<div class="modal-head">
      <span class="pill">Repaso inteligente</span>
      <h2>Qué áreas y bloques conviene repasar</h2>
      <p>La recomendación se organiza por orden de aparición en el examen. Si un bloque tuvo al menos un error, aparece aquí para estudio posterior.</p>
    </div>
    ${reviewMarkup}
    <div class="modal-actions">
      <button class="modal-btn primary" type="button" data-action="modal-close">Ir a la revisión del examen</button>
    </div>`;
  }

  function renderModal() {
    if (STATE.modalStep === 'resumeChoice' && STATE.pendingSavedProgress) {
      nodes.modalShell.hidden = false;
      nodes.modalShell.setAttribute('aria-labelledby', 'resumeChoiceTitle');
      nodes.modalShell.setAttribute('aria-describedby', 'resumeChoiceText');
      nodes.modalCard.innerHTML = renderResumeChoiceModal(STATE.pendingSavedProgress);
      window.requestAnimationFrame(focusModalPrimaryAction);
      return;
    }

    if (!STATE.modalStep || !STATE.summary) {
      nodes.modalShell.hidden = true;
      nodes.modalShell.removeAttribute('aria-labelledby');
      nodes.modalShell.removeAttribute('aria-describedby');
      nodes.modalCard.innerHTML = '';
      return;
    }

    nodes.modalShell.hidden = false;
    nodes.modalShell.removeAttribute('aria-labelledby');
    nodes.modalShell.removeAttribute('aria-describedby');
    nodes.modalCard.innerHTML = STATE.modalStep === 'summary'
      ? renderSummaryModal(STATE.summary)
      : renderReviewModal(STATE.summary);
    window.requestAnimationFrame(focusModalPrimaryAction);
  }

  function render() {
    syncTopState();
    renderTopMetrics();
    renderCover();
    renderExamBar();
    renderContent();
    renderModal();
  }

  function getModalFocusableElements() {
    if (nodes.modalShell.hidden) return [];
    return Array.from(nodes.modalCard.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter((element) => !element.disabled && element.offsetParent !== null);
  }

  function focusModalPrimaryAction() {
    const target = nodes.modalCard.querySelector('[data-autofocus="true"], .modal-btn.primary');
    if (target && typeof target.focus === 'function') {
      target.focus({ preventScroll: true });
    }
  }

  function handleModalKeydown(event) {
    if (nodes.modalShell.hidden || event.key !== 'Tab') return;

    const focusableElements = getModalFocusableElements();
    if (!focusableElements.length) {
      event.preventDefault();
      nodes.modalCard.focus({ preventScroll: true });
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus({ preventScroll: true });
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus({ preventScroll: true });
    }
  }

  function clearTimer() {
    if (STATE.timerId) {
      window.clearInterval(STATE.timerId);
      STATE.timerId = null;
    }
  }

  function startTimer() {
    clearTimer();
    STATE.timerId = window.setInterval(() => {
      if (!isRunning()) return;

      syncRemainingTime();
      if (STATE.remainingSeconds <= 0) {
        STATE.remainingSeconds = 0;
        clearTimer();
        finishExam('time_expired');
        return;
      }

      renderTopMetrics();
      persistProgress();
    }, 1000);
  }

  function scrollToExercise(exerciseId) {
    const element = byId(exerciseId);
    if (!element) return;
    window.setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function scrollToFinalResult() {
    const element = byId('resultado-final');
    if (!element) return;
    window.setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function resetExamProgress() {
    clearTimer();
    STATE.status = 'idle';
    STATE.activeIndex = 0;
    STATE.remainingSeconds = DURATION;
    STATE.deadlineAt = null;
    STATE.answersById = Object.create(null);
    STATE.reinforcementLog = [];
    STATE.hintsOpen = Object.create(null);
    STATE.expandedAnswered = Object.create(null);
    STATE.floatingReviewId = null;
    STATE.pendingSavedProgress = null;
    STATE.summary = null;
    STATE.modalStep = null;
    clearPersistedProgress();
    render();
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (nodes.startExam) nodes.startExam.focus({ preventScroll: true });
    }, 80);
  }

  function applySavedProgress(snapshot) {
    if (!snapshot) {
      resetExamProgress();
      return;
    }

    clearTimer();
    let nextStatus = snapshot.status;
    let nextRemainingSeconds = snapshot.remainingSeconds;
    let nextDeadlineAt = snapshot.deadlineAt;
    if (nextStatus === 'running') {
      nextRemainingSeconds = remainingSecondsUntil(nextDeadlineAt, nextRemainingSeconds);
      if (nextRemainingSeconds <= 0) {
        nextStatus = 'time_expired';
        nextDeadlineAt = null;
      }
    }

    STATE.status = nextStatus;
    STATE.activeIndex = snapshot.activeIndex;
    STATE.remainingSeconds = nextRemainingSeconds;
    STATE.deadlineAt = nextStatus === 'running' ? nextDeadlineAt : null;
    STATE.answersById = snapshot.answersById;
    STATE.reinforcementLog = snapshot.reinforcementLog;
    STATE.hintsOpen = snapshot.hintsOpen;
    STATE.expandedAnswered = snapshot.expandedAnswered;
    STATE.floatingReviewId = snapshot.floatingReviewId;
    STATE.pendingSavedProgress = null;
    STATE.summary = isClosedStatus(nextStatus) ? buildSummary(nextStatus) : null;
    STATE.modalStep = null;

    if (STATE.status === 'running') {
      startTimer();
    }

    persistProgress({ force: true });
    render();

    if (STATE.status === 'running' && EXERCISES[STATE.activeIndex]) {
      scrollToExercise(EXERCISES[STATE.activeIndex].id);
      return;
    }

    if (isClosedStatus()) {
      scrollToFinalResult();
    }
  }

  function initializeSavedProgressPrompt() {
    const savedProgress = readSavedProgress();
    if (!savedProgress) return;
    STATE.pendingSavedProgress = savedProgress;
    STATE.modalStep = 'resumeChoice';
  }

  function startExam() {
    if (STATE.status !== 'idle') return;
    STATE.status = 'running';
    STATE.activeIndex = 0;
    setDeadlineFromRemaining(DURATION);
    STATE.answersById = Object.create(null);
    STATE.hintsOpen = Object.create(null);
    STATE.expandedAnswered = Object.create(null);
    STATE.reinforcementLog = [];
    STATE.floatingReviewId = null;
    STATE.pendingSavedProgress = null;
    STATE.summary = null;
    STATE.modalStep = null;
    startTimer();
    render();
    persistProgress({ force: true });
    scrollToExercise(EXERCISES[0].id);
  }

  function finishExam(mode) {
    if (STATE.status !== 'running') return;
    clearTimer();
    STATE.status = mode;
    STATE.deadlineAt = null;
    STATE.floatingReviewId = null;
    STATE.pendingSavedProgress = null;
    STATE.summary = buildSummary(mode);
    STATE.modalStep = null;
    render();
    persistProgress({ force: true });
    scrollToFinalResult();
  }

  function registerAnswer(exerciseId, selectedOption) {
    if (!isRunning()) return;
    if (syncRemainingTime() <= 0) {
      finishExam('time_expired');
      return;
    }

    const index = EXERCISE_INDEX.get(exerciseId);
    if (index !== STATE.activeIndex) return;
    if (STATE.answersById[exerciseId]) return;

    const exercise = EXERCISES[index];
    const validOptionLabels = new Set(exercise.options.map((option) => option.label));
    if (!validOptionLabels.has(selectedOption)) return;
    const isCorrect = selectedOption === exercise.correctOption;

    STATE.answersById[exerciseId] = {
      selectedOption,
      isCorrect
    };
    if (!isCorrect) {
      STATE.reinforcementLog.push(exerciseId);
    }
    STATE.hintsOpen[exerciseId] = false;

    if (index === TOTAL - 1) {
      finishExam('finished');
      return;
    }

    STATE.floatingReviewId = exerciseId;
    STATE.activeIndex = index + 1;
    render();
    persistProgress({ force: true });
    scrollToExercise(EXERCISES[STATE.activeIndex].id);
  }

  function toggleHint(exerciseId) {
    if (!isRunning()) return;
    if (EXERCISES[STATE.activeIndex].id !== exerciseId) return;
    STATE.hintsOpen[exerciseId] = !STATE.hintsOpen[exerciseId];
    render();
    persistProgress({ force: true });
  }

  function toggleCard(exerciseId) {
    const answer = STATE.answersById[exerciseId];
    if (!answer) return;
    const nextExpanded = !isAnsweredExpanded(exerciseId);
    STATE.expandedAnswered[exerciseId] = nextExpanded;
    if (nextExpanded && STATE.floatingReviewId === exerciseId) {
      STATE.floatingReviewId = null;
    }
    render();
    persistProgress({ force: true });
  }

  function openFloatingReview(exerciseId) {
    const answer = STATE.answersById[exerciseId];
    if (!answer) return;
    STATE.expandedAnswered[exerciseId] = true;
    STATE.floatingReviewId = null;
    render();
    persistProgress({ force: true });
    scrollToExercise(exerciseId);
  }

  function dismissFloatingReview(exerciseId) {
    if (STATE.floatingReviewId !== exerciseId) return;
    STATE.floatingReviewId = null;
    render();
    persistProgress({ force: true });
  }

  async function handleModalAction(action) {
    if (action === 'restore-progress') {
      applySavedProgress(STATE.pendingSavedProgress);
      return;
    }

    if (action === 'reset-progress') {
      resetExamProgress();
      return;
    }

    if (action === 'modal-review') {
      STATE.modalStep = 'review';
      renderModal();
      return;
    }

    if (action === 'modal-close') {
      STATE.modalStep = null;
      renderModal();
    }
  }

  const PDFMAKE_SOURCES = [
    'vendor/pdfmake/pdfmake.min.js',
    'vendor/pdfmake/vfs_fonts.js'
  ];
  let pdfMakeLoadPromise = null;

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-pdfmake-src="${src}"]`);
      if (existing && existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.pdfmakeSrc = src;
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });
      document.head.appendChild(script);
    });
  }

  function loadPdfMakeLibrary() {
    if (window.pdfMake && window.pdfMake.vfs) return Promise.resolve(window.pdfMake);
    if (!pdfMakeLoadPromise) {
      pdfMakeLoadPromise = PDFMAKE_SOURCES
        .reduce((chain, src) => chain.then(() => loadScriptOnce(src)), Promise.resolve())
        .then(() => {
          if (!window.pdfMake || !window.pdfMake.vfs) {
            throw new Error('La biblioteca PDF no quedó disponible.');
          }
          return window.pdfMake;
        });
    }
    return pdfMakeLoadPromise;
  }

  function cleanPdfText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.;:!?])/g, '$1')
      .trim();
  }

  function pdfParagraphs(title, value) {
    const text = cleanPdfText(value);
    if (!text) return [];
    return [
      { text: title, style: 'sectionLabel', margin: [0, 8, 0, 2] },
      { text, style: 'bodyText' }
    ];
  }

  function getExerciseBaseForPdf(exercise) {
    if (exercise.basePill && exercise.basePill.content) return exercise.basePill.content;
    return exercise.baseText || '';
  }

  function getOptionPdfText(option) {
    const pieces = [option.text, option.imageAlt, option.caption]
      .filter(Boolean)
      .map(cleanPdfText)
      .filter(Boolean);
    if (!pieces.length && option.kind && option.kind !== 'text') {
      pieces.push('Opción con apoyo visual.');
    }
    return pieces.join(' ');
  }

  function getIncorrectPdfItems() {
    return EXERCISES
      .filter((exercise) => {
        const answer = STATE.answersById[exercise.id];
        return Boolean(answer && !answer.isCorrect);
      })
      .map((exercise) => {
        const answer = STATE.answersById[exercise.id];
        const selectedOption = exercise.options.find((option) => option.label === answer.selectedOption) || null;
        const correctOption = exercise.options.find((option) => option.label === exercise.correctOption) || null;
        return {
          exercise,
          answer,
          selectedOption,
          correctOption,
          selectedText: selectedOption ? getOptionPdfText(selectedOption) : 'Sin respuesta registrada.',
          correctText: correctOption ? getOptionPdfText(correctOption) : exercise.correctOptionText,
          selectedArgument: exercise.incorrectArgumentsByOption[answer.selectedOption] || 'No hay argumento disponible para la opción elegida.',
          correctArgument: exercise.correctArgument || 'No hay argumento disponible para la respuesta correcta.'
        };
      });
  }

  function imageBlobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), { once: true });
      reader.addEventListener('error', reject, { once: true });
      reader.readAsDataURL(blob);
    });
  }

  async function fetchImageDataUrl(src) {
    const response = await fetch(src, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar la imagen ${src}`);
    const blob = await response.blob();
    return imageBlobToDataUrl(blob);
  }

  function renderTableVisualForPdf(visual) {
    const headers = Array.isArray(visual.headers) ? visual.headers : [];
    const rows = Array.isArray(visual.rows) ? visual.rows : [];
    if (!headers.length || !rows.length) return [];

    return [{
      table: {
        headerRows: 1,
        widths: headers.map(() => '*'),
        body: [
          headers.map((header) => ({ text: cleanPdfText(header), bold: true, fillColor: '#edf1ff', color: '#1C1E5A' })),
          ...rows.map((row) => headers.map((_, index) => cleanPdfText(row[index])))
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 6, 0, 4]
    }];
  }

  async function buildVisualPdfBlocks(exercise) {
    const blocks = [];
    const visuals = getExerciseVisuals(exercise);

    for (const visual of visuals) {
      if (visual.kind === 'image' && visual.src) {
        try {
          const dataUrl = await fetchImageDataUrl(visual.src);
          blocks.push({
            image: dataUrl,
            fit: [410, 170],
            alignment: 'center',
            margin: [0, 6, 0, 4]
          });
        } catch (error) {
          if (visual.alt) blocks.push({ text: `Apoyo visual: ${cleanPdfText(visual.alt)}`, style: 'visualNote' });
        }
      } else if (visual.kind === 'table') {
        blocks.push(...renderTableVisualForPdf(visual));
      } else if (visual.alt) {
        blocks.push({ text: `Apoyo visual: ${cleanPdfText(visual.alt)}`, style: 'visualNote' });
      } else if (visual.content) {
        blocks.push({ text: cleanPdfText(visual.content), style: 'visualNote' });
      }
    }

    return blocks;
  }

  function buildOptionsPdfTable(item) {
    const body = [
      [
        { text: 'Opción', style: 'tableHead' },
        { text: 'Texto de la opción', style: 'tableHead' }
      ]
    ];

    item.exercise.options.forEach((option) => {
      const isSelected = option.label === item.answer.selectedOption;
      const isCorrect = option.label === item.exercise.correctOption;
      const fillColor = isCorrect ? '#e8f8ea' : (isSelected ? '#fdeceb' : '#FFFFFF');
      const badges = [
        isSelected ? 'Elegida' : '',
        isCorrect ? 'Correcta' : ''
      ].filter(Boolean).join(' · ');
      body.push([
        { text: option.label.toUpperCase(), bold: true, color: '#1C1E5A', fillColor },
        {
          stack: [
            { text: getOptionPdfText(option) || 'Sin texto visible.', color: '#161a2d' },
            badges ? { text: badges, color: isCorrect ? '#117D21' : '#C24529', bold: true, margin: [0, 3, 0, 0] } : {}
          ].filter((node) => Object.keys(node).length),
          fillColor
        }
      ]);
    });

    return {
      table: {
        headerRows: 1,
        widths: [48, '*'],
        body,
        dontBreakRows: true
      },
      layout: {
        hLineColor: () => '#dfe1eb',
        vLineColor: () => '#dfe1eb',
        paddingTop: () => 6,
        paddingBottom: () => 6,
        paddingLeft: () => 7,
        paddingRight: () => 7
      },
      margin: [0, 8, 0, 8]
    };
  }

  function buildAnswerComparisonPdfTable(item) {
    return {
      unbreakable: true,
      table: {
        widths: ['*', '*'],
        body: [
          [
            { text: `Tu respuesta: ${item.answer.selectedOption.toUpperCase()}`, style: 'badAnswerHead' },
            { text: `Respuesta correcta: ${item.exercise.correctOption.toUpperCase()}`, style: 'goodAnswerHead' }
          ],
          [
            { text: item.selectedText, fillColor: '#fdeceb' },
            { text: item.correctText, fillColor: '#e8f8ea' }
          ]
        ]
      },
      layout: {
        hLineColor: () => '#dfe1eb',
        vLineColor: () => '#dfe1eb',
        paddingTop: () => 7,
        paddingBottom: () => 7,
        paddingLeft: () => 8,
        paddingRight: () => 8
      },
      margin: [0, 8, 0, 8]
    };
  }

  async function buildExercisePdfBlock(item) {
    const exercise = item.exercise;
    const blocks = [
      { text: `Reactivo ${exercise.number}`, style: 'exerciseTitle', headlineLevel: 1 },
      { text: `${exercise.areaName} · ${exercise.block}`, style: 'exerciseMeta' },
      ...pdfParagraphs('Texto base', getExerciseBaseForPdf(exercise)),
      ...(await buildVisualPdfBlocks(exercise)),
      ...pdfParagraphs('Planteamiento', exercise.prompt),
      { text: 'Opciones', style: 'sectionLabel', margin: [0, 9, 0, 2] },
      buildOptionsPdfTable(item),
      buildAnswerComparisonPdfTable(item),
      ...pdfParagraphs('Por qué conviene revisar este reactivo', item.selectedArgument),
      ...pdfParagraphs('Argumento de la respuesta correcta', item.correctArgument)
    ];

    return {
      stack: blocks,
      margin: [0, 0, 0, 18]
    };
  }

  async function buildImprovementPdfDefinition(summary) {
    const items = getIncorrectPdfItems();
    const modeText = summary.mode === 'time_expired'
      ? 'La evaluación se cerró al agotarse el tiempo.'
      : 'La evaluación se cerró al terminar todos los reactivos.';
    const content = [
      { text: 'Instituto Fernando Ramírez', style: 'brand' },
      { text: 'ECOEMS 2026 · Examen simulación 2', style: 'subtitle' },
      { text: 'Reactivos que debo mejorar', style: 'title' },
      {
        text: `${modeText} Este reporte incluye únicamente los reactivos respondidos de forma incorrecta para orientar el repaso posterior.`,
        style: 'intro'
      },
      {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [[
            { text: `Contestados\n${summary.metrics.answered} de ${TOTAL}`, style: 'metricCell' },
            { text: `Correctos\n${summary.metrics.correct}`, style: 'metricCellGood' },
            { text: `Incorrectos\n${summary.metrics.incorrect}`, style: 'metricCellBad' },
            { text: `Puntaje\n${summary.metrics.rawScore}/${TOTAL}`, style: 'metricCell' }
          ]]
        },
        layout: {
          hLineColor: () => '#dfe1eb',
          vLineColor: () => '#dfe1eb',
          paddingTop: () => 9,
          paddingBottom: () => 9,
          paddingLeft: () => 8,
          paddingRight: () => 8
        },
        margin: [0, 8, 0, 18],
        unbreakable: true
      }
    ];

    if (!items.length) {
      content.push({
        stack: [
          { text: 'No se registraron reactivos incorrectos.', style: 'emptyTitle' },
          { text: 'El intento no generó reactivos para mejorar por error. Puedes conservar este PDF como evidencia de que no hubo respuestas incorrectas.', style: 'bodyText' }
        ],
        margin: [0, 10, 0, 0],
        unbreakable: true
      });
    } else {
      content.push({ text: `Reactivos incluidos: ${items.length}`, style: 'sectionHeading' });
      for (const item of items) {
        content.push(await buildExercisePdfBlock(item));
      }
    }

    return {
      pageSize: 'LETTER',
      pageMargins: [54, 66, 54, 58],
      info: {
        title: 'Reactivos que debo mejorar · ECOEMS IFR Simulación 2',
        author: 'Instituto Fernando Ramírez',
        subject: 'Reporte de reactivos incorrectos'
      },
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10.5,
        lineHeight: 1.22,
        color: '#161a2d'
      },
      header: () => ({
        columns: [
          { text: 'IFR', bold: true, color: '#1C1E5A', fontSize: 11 },
          { text: 'Reactivos que debo mejorar', alignment: 'right', color: '#5b647f', fontSize: 9 }
        ],
        margin: [54, 26, 54, 0]
      }),
      footer: (currentPage, pageCount) => ({
        columns: [
          { text: 'Examen simulación 2 ECOEMS', color: '#5b647f', fontSize: 8.5 },
          { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right', color: '#5b647f', fontSize: 8.5 }
        ],
        margin: [54, 18, 54, 0]
      }),
      pageBreakBefore(currentNode, followingNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length < 5;
      },
      styles: {
        brand: { fontSize: 17, bold: true, color: '#1C1E5A' },
        subtitle: { fontSize: 10, bold: true, color: '#2B2F8F', margin: [0, 2, 0, 8] },
        title: { fontSize: 24, bold: true, color: '#14143A', margin: [0, 4, 0, 6] },
        intro: { fontSize: 10.5, color: '#5b647f', margin: [0, 0, 0, 8] },
        sectionHeading: { fontSize: 14, bold: true, color: '#14143A', margin: [0, 4, 0, 10] },
        exerciseTitle: { fontSize: 15, bold: true, color: '#14143A', margin: [0, 10, 0, 2] },
        exerciseMeta: { fontSize: 9.5, bold: true, color: '#1C1E5A', margin: [0, 0, 0, 5] },
        sectionLabel: { fontSize: 9.5, bold: true, color: '#5b647f' },
        bodyText: { fontSize: 10.5, color: '#161a2d' },
        visualNote: { fontSize: 9.5, italics: true, color: '#5b647f', margin: [0, 4, 0, 4] },
        tableHead: { bold: true, color: '#1C1E5A', fillColor: '#edf1ff' },
        badAnswerHead: { bold: true, color: '#C24529', fillColor: '#fdeceb' },
        goodAnswerHead: { bold: true, color: '#117D21', fillColor: '#e8f8ea' },
        metricCell: { bold: true, color: '#1C1E5A', alignment: 'center' },
        metricCellGood: { bold: true, color: '#117D21', alignment: 'center' },
        metricCellBad: { bold: true, color: '#C24529', alignment: 'center' },
        emptyTitle: { fontSize: 14, bold: true, color: '#117D21', margin: [0, 0, 0, 4] }
      },
      content
    };
  }

  function createPdfBlob(pdfMake, definition) {
    return new Promise((resolve, reject) => {
      try {
        pdfMake.createPdf(definition).getBlob((blob) => resolve(blob));
      } catch (error) {
        reject(error);
      }
    });
  }

  async function downloadImprovementPdf() {
    const panel = byId('resultado-final');
    if (!panel || !STATE.summary) return;

    const buttons = Array.from(panel.querySelectorAll('[data-action="download-results"]'));
    const originalButtonTexts = buttons.map((button) => button.textContent);

    buttons.forEach((button) => {
      button.disabled = true;
      button.textContent = 'Preparando PDF...';
    });

    try {
      await waitForFontsReady();
      const pdfMake = await loadPdfMakeLibrary();
      const definition = await buildImprovementPdfDefinition(STATE.summary);
      const blob = await createPdfBlob(pdfMake, definition);
      if (!blob || blob.type !== 'application/pdf') throw new Error('No se pudo generar el PDF.');
      triggerPdfDownload(blob);
    } catch (error) {
      console.error('No se pudo descargar el PDF de reactivos por mejorar.', error);
      buttons.forEach((button) => {
        button.disabled = false;
        button.textContent = 'Intenta descargar de nuevo';
      });
      return;
    }

    buttons.forEach((button, index) => {
      button.disabled = false;
      button.textContent = originalButtonTexts[index];
    });
  }

  function handleClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const { action, id, option } = target.dataset;

    if (action === 'answer' && id && option) {
      registerAnswer(id, option);
      return;
    }

    if (action === 'toggle-hint' && id) {
      toggleHint(id);
      return;
    }

    if (action === 'open-floating-review' && id) {
      openFloatingReview(id);
      return;
    }

    if (action === 'dismiss-floating-review' && id) {
      dismissFloatingReview(id);
      return;
    }

    if (action === 'toggle-card' && id) {
      toggleCard(id);
      return;
    }

    if (
      action === 'restore-progress'
      || action === 'reset-progress'
      || action === 'modal-review'
      || action === 'modal-close'
    ) {
      handleModalAction(action);
      return;
    }

    if (action === 'download-results') {
      downloadImprovementPdf();
    }
  }

  window.addEventListener('scroll', queueTopStateSync, { passive: true });
  window.addEventListener('resize', queueTopStateSync);
  window.addEventListener('pagehide', () => persistProgress({ force: true }));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      persistProgress({ force: true });
      return;
    }

    if (document.visibilityState === 'visible' && isRunning()) {
      syncRemainingTime();
      if (STATE.remainingSeconds <= 0) {
        finishExam('time_expired');
        return;
      }
      renderTopMetrics();
      persistProgress({ force: true });
    }
  });
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleModalKeydown);
  nodes.startExam.addEventListener('click', startExam);

  if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
    window.__IFR_EXAM_DEBUG__ = {
      startExam,
      finishExam,
      resetExamProgress,
      setRemainingSeconds(value) {
        setDeadlineFromRemaining(value);
        renderTopMetrics();
        persistProgress({ force: true });
      },
      downloadImprovementPdf,
      clearSavedProgress: clearPersistedProgress,
      readSavedProgress,
      getState() {
        return {
          status: STATE.status,
          activeIndex: STATE.activeIndex,
          remainingSeconds: STATE.remainingSeconds,
          deadlineAt: STATE.deadlineAt,
          answersById: { ...STATE.answersById },
          modalStep: STATE.modalStep,
          hasPendingSavedProgress: Boolean(STATE.pendingSavedProgress)
        };
      }
    };
  }

  initializeSavedProgressPrompt();
  render();
})();
