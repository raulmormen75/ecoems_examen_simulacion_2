(() => {
  const DATA = window.IFR_APP_DATA || { meta: {}, areas: [], exercises: [] };
  const AREAS = DATA.areas || [];
  const EXERCISES = DATA.exercises || [];
  const TOTAL = EXERCISES.length;
  const DURATION = DATA.meta.durationSeconds || 10800;
  const EXERCISE_INDEX = new Map(EXERCISES.map((exercise, index) => [exercise.id, index]));

  const STATE = {
    status: 'idle',
    activeIndex: 0,
    remainingSeconds: DURATION,
    answersById: Object.create(null),
    reinforcementLog: [],
    hintsOpen: Object.create(null),
    expandedAnswered: Object.create(null),
    floatingReviewId: null,
    summary: null,
    modalStep: null,
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
        <span>${esc(area.totalExercises)} reactivos</span>
      </article>`
    ).join('');
  }

  function renderTopMetrics() {
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
      nodes.timerNote.textContent = 'No refresques ni cierres la pestaña durante la evaluación.';
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
      nodes.startState.textContent = 'La evaluación está activa. Si refrescas esta página, el examen se reinicia completo.';
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

  function renderExercisePrompt(exercise) {
    const parts = [];

    if (exercise.basePill) {
      parts.push(renderReadingCapsule(exercise.basePill, exercise.number));
    } else if (exercise.baseText) {
      parts.push(textToParagraphs(exercise.baseText, exercise.promptMarks));
    }

    if (exercise.visual && exercise.visual.position === 'base') {
      parts.push(renderVisual(exercise.visual));
    }

    parts.push(textToParagraphs(exercise.prompt, exercise.promptMarks));

    if (exercise.visual && exercise.visual.position !== 'base') {
      parts.push(renderVisual(exercise.visual));
    }

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
    const visualAlt = exercise.visual && exercise.visual.alt ? String(exercise.visual.alt).trim() : '';
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
          <button class="download-results-btn" type="button" data-action="download-results">Descargar mis resultados</button>
        </div>
      </div>
      ${renderFinalMetrics(summary)}
      ${renderReinforcementList(summary)}
      <div class="final-actions final-actions-bottom">
        <button class="download-results-btn" type="button" data-action="download-results">Descargar mis resultados</button>
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
    if (!STATE.modalStep || !STATE.summary) {
      nodes.modalShell.hidden = true;
      nodes.modalCard.innerHTML = '';
      return;
    }

    nodes.modalShell.hidden = false;
    nodes.modalCard.innerHTML = STATE.modalStep === 'summary'
      ? renderSummaryModal(STATE.summary)
      : renderReviewModal(STATE.summary);
  }

  function render() {
    syncTopState();
    renderTopMetrics();
    renderCover();
    renderExamBar();
    renderContent();
    renderModal();
  }

  function clearTimer() {
    if (STATE.timerId) {
      window.clearInterval(STATE.timerId);
      STATE.timerId = null;
    }
  }

  function syncBeforeUnloadWarning() {
    if (!isRunning()) return '';
    return 'Si refrescas esta página, el examen se reinicia y perderás todo el avance.';
  }

  function startTimer() {
    clearTimer();
    STATE.timerId = window.setInterval(() => {
      if (!isRunning()) return;

      STATE.remainingSeconds -= 1;
      if (STATE.remainingSeconds <= 0) {
        STATE.remainingSeconds = 0;
        clearTimer();
        finishExam('time_expired');
        return;
      }

      renderTopMetrics();
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

  function startExam() {
    if (STATE.status !== 'idle') return;
    STATE.status = 'running';
    STATE.activeIndex = 0;
    STATE.remainingSeconds = DURATION;
    STATE.reinforcementLog = [];
    STATE.floatingReviewId = null;
    STATE.summary = null;
    STATE.modalStep = null;
    startTimer();
    render();
    scrollToExercise(EXERCISES[0].id);
  }

  function finishExam(mode) {
    if (STATE.status !== 'running') return;
    clearTimer();
    STATE.status = mode;
    STATE.floatingReviewId = null;
    STATE.summary = buildSummary(mode);
    STATE.modalStep = null;
    render();
    scrollToFinalResult();
  }

  function registerAnswer(exerciseId, selectedOption) {
    if (!isRunning()) return;
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
    scrollToExercise(EXERCISES[STATE.activeIndex].id);
  }

  function toggleHint(exerciseId) {
    if (!isRunning()) return;
    if (EXERCISES[STATE.activeIndex].id !== exerciseId) return;
    STATE.hintsOpen[exerciseId] = !STATE.hintsOpen[exerciseId];
    render();
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
  }

  function openFloatingReview(exerciseId) {
    const answer = STATE.answersById[exerciseId];
    if (!answer) return;
    STATE.expandedAnswered[exerciseId] = true;
    STATE.floatingReviewId = null;
    render();
    scrollToExercise(exerciseId);
  }

  function dismissFloatingReview(exerciseId) {
    if (STATE.floatingReviewId !== exerciseId) return;
    STATE.floatingReviewId = null;
    render();
  }

  function handleModalAction(action) {
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

  function setCanvasFont(context, size, weight = 700) {
    context.font = `${weight} ${size}px "Plus Jakarta Sans", "Segoe UI", Arial, sans-serif`;
  }

  function drawRoundRect(context, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + safeRadius, y);
    context.arcTo(x + width, y, x + width, y + height, safeRadius);
    context.arcTo(x + width, y + height, x, y + height, safeRadius);
    context.arcTo(x, y + height, x, y, safeRadius);
    context.arcTo(x, y, x + width, y, safeRadius);
    context.closePath();
  }

  function fillRoundRect(context, x, y, width, height, radius, fillStyle, strokeStyle = null) {
    drawRoundRect(context, x, y, width, height, radius);
    context.fillStyle = fillStyle;
    context.fill();
    if (strokeStyle) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = 1;
      context.stroke();
    }
  }

  function wrapCanvasText(context, text, maxWidth) {
    const words = String(text || '').split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';

    words.forEach((word) => {
      const nextLine = line ? `${line} ${word}` : word;
      if (context.measureText(nextLine).width <= maxWidth || !line) {
        line = nextLine;
        return;
      }
      lines.push(line);
      line = word;
    });

    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  function drawWrappedText(context, text, x, y, maxWidth, lineHeight, color, size, weight = 600) {
    setCanvasFont(context, size, weight);
    context.fillStyle = color;
    context.textBaseline = 'top';
    const lines = wrapCanvasText(context, text, maxWidth);
    lines.forEach((line, index) => {
      context.fillText(line, x, y + index * lineHeight);
    });
    return y + lines.length * lineHeight;
  }

  function drawCanvasPill(context, text, x, y, options) {
    setCanvasFont(context, options.size || 14, options.weight || 800);
    const paddingX = options.paddingX || 14;
    const height = options.height || 34;
    const width = Math.min(context.measureText(text).width + paddingX * 2, options.maxWidth || 760);
    fillRoundRect(context, x, y, width, height, height / 2, options.background, options.border || null);
    context.fillStyle = options.color;
    context.textBaseline = 'middle';
    context.fillText(text, x + paddingX, y + height / 2 + .5);
    return { width, height };
  }

  function renderResultCanvasContent(context, summary, draw, totalHeight = 0) {
    const colors = {
      background: '#f4f1e8',
      panel: '#fffefa',
      line: 'rgba(20,20,58,.16)',
      ink: '#161a2d',
      muted: '#5b647f',
      navy: '#1C1E5A',
      navy2: '#14143A',
      navy3: '#2B2F8F',
      green: '#2CE51E',
      ok: '#117D21',
      okSoft: '#e8f8ea',
      bad: '#C24529',
      badSoft: '#fdeceb',
      blueSoft: '#edf1ff',
      blockSoft: '#e8fbe7',
      white: '#FFFFFF'
    };
    const width = 1180;
    const outer = 24;
    const panelX = outer;
    const panelY = outer;
    const panelWidth = width - outer * 2;
    const pad = 32;
    const contentX = panelX + pad;
    const contentWidth = panelWidth - pad * 2;
    let y = panelY + pad;

    if (draw) {
      context.fillStyle = colors.background;
      context.fillRect(0, 0, width, totalHeight);
      fillRoundRect(context, panelX, panelY, panelWidth, totalHeight - outer * 2, 28, colors.panel, colors.line);
    }

    const modeLabel = summary.mode === 'time_expired' ? 'Cierre por tiempo' : 'Cierre por término';
    const modeText = summary.mode === 'time_expired'
      ? 'La evaluación se cerró al agotarse el tiempo. El resultado integra solo los reactivos contestados.'
      : 'La evaluación se cerró al terminar todos los reactivos. El resultado integra el intento completo.';
    const rightWidth = 430;
    const rightX = contentX + contentWidth - rightWidth;
    setCanvasFont(context, 15, 800);
    const rightLines = wrapCanvasText(context, modeText, rightWidth);
    const headerHeight = Math.max(124, rightLines.length * 24 + 20);

    if (draw) {
      drawCanvasPill(context, modeLabel, contentX, y, {
        background: colors.blueSoft,
        color: colors.navy,
        size: 14,
        height: 34
      });
      setCanvasFont(context, 46, 800);
      context.fillStyle = colors.navy2;
      context.textBaseline = 'top';
      context.fillText('Resultado final', contentX, y + 46);
      drawWrappedText(context, modeText, rightX, y + 14, rightWidth, 24, colors.muted, 15, 650);
    }
    y += headerHeight + 26;

    const metricGap = 12;
    const metricHeight = 126;
    const metricWidth = (contentWidth - metricGap * 3) / 4;
    const metrics = [
      { label: 'Reactivos contestados', value: summary.metrics.answered, note: `de ${TOTAL}`, color: colors.muted, bg: colors.white, border: colors.line },
      { label: 'Reactivos correctos', value: summary.metrics.correct, note: 'aciertos', color: colors.ok, bg: colors.okSoft, border: 'rgba(17,125,33,.24)' },
      { label: 'Reactivos incorrectos', value: summary.metrics.incorrect, note: 'errores', color: colors.bad, bg: colors.badSoft, border: 'rgba(194,69,41,.24)' },
      { label: 'Puntaje', value: `${summary.metrics.rawScore}/${TOTAL}`, note: formatPercent(summary.metrics.percent), color: colors.navy, bg: colors.blueSoft, border: 'rgba(28,30,90,.2)' }
    ];

    if (draw) {
      metrics.forEach((metric, index) => {
        const x = contentX + index * (metricWidth + metricGap);
        fillRoundRect(context, x, y, metricWidth, metricHeight, 22, metric.bg, metric.border);
        drawWrappedText(context, metric.label.toUpperCase(), x + 16, y + 16, metricWidth - 32, 17, colors.muted, 12, 800);
        setCanvasFont(context, 34, 800);
        context.fillStyle = metric.color;
        context.textBaseline = 'top';
        context.fillText(String(metric.value), x + 16, y + 52);
        setCanvasFont(context, 15, 700);
        context.fillStyle = colors.muted;
        context.fillText(metric.note, x + 16, y + 94);
      });
    }
    y += metricHeight + 26;

    if (draw) {
      setCanvasFont(context, 25, 800);
      context.fillStyle = colors.navy2;
      context.textBaseline = 'top';
      context.fillText('Bloques temáticos por reforzar:', contentX, y);
    }
    y += 44;

    const groups = summary.reinforcementGroups || [];
    if (!groups.length) {
      const emptyHeight = 88;
      if (draw) {
        fillRoundRect(context, contentX, y, contentWidth, emptyHeight, 22, colors.okSoft, 'rgba(17,125,33,.24)');
        setCanvasFont(context, 17, 800);
        context.fillStyle = colors.ok;
        context.textBaseline = 'top';
        context.fillText('No se registraron reactivos incorrectos.', contentX + 18, y + 16);
        drawWrappedText(context, 'El intento no generó bloques temáticos para reforzar por error. Puedes revisar tus reactivos contestados en modo lectura.', contentX + 18, y + 46, contentWidth - 36, 22, colors.ink, 15, 600);
      }
      y += emptyHeight + 18;
    } else {
      groups.forEach((group) => {
        const groupX = contentX;
        const groupWidth = contentWidth;
        const listX = groupX + 62;
        const listWidth = groupWidth - 86;
        setCanvasFont(context, 15, 650);
        const itemLayouts = group.exercises.map((item) => {
          const text = `Reactivo ${item.number}. ${item.summary}`;
          const lines = wrapCanvasText(context, text, listWidth);
          return { text, lines, height: lines.length * 23 + 7 };
        });
        const listHeight = itemLayouts.reduce((sum, item) => sum + item.height, 0);
        const groupHeight = 18 + 34 + 10 + 34 + 14 + listHeight + 14;

        if (draw) {
          fillRoundRect(context, groupX, y, groupWidth, groupHeight, 22, 'rgba(255,255,255,.96)', 'rgba(28,30,90,.12)');
          setCanvasFont(context, 18, 800);
          context.fillStyle = colors.navy;
          context.textBaseline = 'middle';
          context.fillText('-', groupX + 18, y + 35);
          drawCanvasPill(context, group.areaName, groupX + 40, y + 18, {
            background: colors.blueSoft,
            color: colors.navy,
            size: 15,
            height: 34,
            maxWidth: groupWidth - 72
          });
          drawCanvasPill(context, group.block, groupX + 40, y + 62, {
            background: colors.blockSoft,
            color: '#0f6d1a',
            size: 15,
            height: 34,
            maxWidth: groupWidth - 72
          });

          let itemY = y + 110;
          itemLayouts.forEach((item) => {
            context.beginPath();
            context.arc(groupX + 52, itemY + 10, 4, 0, Math.PI * 2);
            context.fillStyle = colors.green;
            context.fill();
            setCanvasFont(context, 15, 650);
            context.fillStyle = colors.ink;
            context.textBaseline = 'top';
            item.lines.forEach((line, index) => {
              context.fillText(line, listX, itemY + index * 23);
            });
            itemY += item.height;
          });
        }

        y += groupHeight + 14;
      });
    }

    y += pad + outer;

    return Math.ceil(y);
  }

  async function downloadResultsPng() {
    const panel = byId('resultado-final');
    if (!panel || !STATE.summary) return;

    const buttons = Array.from(panel.querySelectorAll('[data-action="download-results"]'));
    const originalButtonTexts = buttons.map((button) => button.textContent);

    buttons.forEach((button) => {
      button.disabled = true;
      button.textContent = 'Preparando descarga...';
    });

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const measuringCanvas = document.createElement('canvas');
      const measuringContext = measuringCanvas.getContext('2d');
      const exportWidth = 1180;
      const exportHeight = renderResultCanvasContent(measuringContext, STATE.summary, false);
      const scale = Math.min(2, 30000 / exportWidth, 30000 / exportHeight);
      const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(exportWidth * safeScale);
      canvas.height = Math.ceil(exportHeight * safeScale);
      const context = canvas.getContext('2d');
      context.scale(safeScale, safeScale);
      renderResultCanvasContent(context, STATE.summary, true, exportHeight);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1));
      if (!blob) throw new Error('No se pudo generar la imagen PNG.');

      const pngUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'resultado-ecoems-ifr-simulacion-2.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
    } catch (error) {
      console.error('No se pudo descargar el resultado final.', error);
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

    if (action === 'modal-review' || action === 'modal-close') {
      handleModalAction(action);
      return;
    }

    if (action === 'download-results') {
      downloadResultsPng();
    }
  }

  window.addEventListener('beforeunload', (event) => {
    const message = syncBeforeUnloadWarning();
    if (!message) return;
    event.preventDefault();
    event.returnValue = message;
  });

  window.addEventListener('scroll', queueTopStateSync, { passive: true });
  window.addEventListener('resize', queueTopStateSync);
  document.addEventListener('click', handleClick);
  nodes.startExam.addEventListener('click', startExam);

  if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
    window.__IFR_EXAM_DEBUG__ = {
      startExam,
      finishExam,
      setRemainingSeconds(value) {
        STATE.remainingSeconds = Math.max(0, Number(value) || 0);
        renderTopMetrics();
      },
      downloadResultsPng,
      getState() {
        return {
          status: STATE.status,
          activeIndex: STATE.activeIndex,
          remainingSeconds: STATE.remainingSeconds,
          answersById: { ...STATE.answersById }
        };
      }
    };
  }

  render();
})();
