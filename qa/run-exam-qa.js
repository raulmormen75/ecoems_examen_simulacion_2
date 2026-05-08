const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'exam-data.js');
const BUILD_FILE = path.join(ROOT, 'build-exam-data.js');
const EXPECTED_TOTAL = 128;
const EXPECTED_AREAS = [
  ['Habilidad matemática', 1, 16],
  ['Biología', 17, 28],
  ['Español', 29, 40],
  ['Química', 41, 52],
  ['Historia', 53, 64],
  ['Matemáticas', 65, 76],
  ['Habilidad verbal', 77, 92],
  ['Geografía', 93, 104],
  ['Física', 105, 116],
  ['Formación cívica y ética', 117, 128]
];
const LETTERS = ['a', 'b', 'c', 'd', 'e'];
const INTERNAL_PATTERNS = [
  'INSTRUCCIÓN INTERNA PARA CODEX',
  '$imagegen',
  'GPT-Image 2',
  'TABLA DE CONTROL DEL PAQUETE',
  'REVISIÓN DE DISTRIBUCIÓN',
  'TEXTO EN PÍLDORA VISUAL ESPECIAL',
  'RENDERIZAR COMO TABLA'
];
const FORBIDDEN_STUDENT_MARKUP_PATTERNS = [
  ['delimitador \\(', /\\\(/],
  ['delimitador \\)', /\\\)/],
  ['delimitador \\[', /\\\[/],
  ['delimitador \\]', /\\\]/],
  ['comando \\frac', /\\frac\b/],
  ['comando \\text', /\\text\b/],
  ['comando \\times', /\\times\b/],
  ['comando \\div', /\\div\b/],
  ['comando \\sqrt', /\\sqrt\b/],
  ['comando \\cdot', /\\cdot\b/],
  ['comando \\rightarrow', /\\rightarrow\b/],
  ['espaciado \\quad', /\\quad\b/],
  ['espaciado \\;', /\\;/],
  ['porcentaje escapado \\%', /\\%/],
  ['bloque $$', /\$\$/],
  ['backticks Markdown', /`/],
  ['negritas Markdown', /\*\*/],
  ['salto HTML <br>', /<br\s*\/?>/i],
  ['espacio HTML &nbsp;', /&nbsp;/i]
];
const EXPECTED_VISUAL_OBJECTIVE_BASE_TEXTS = new Map([
  [5, 'Observa la serie. Identifica el patrón de movimiento del punto y del triángulo.'],
  [6, 'Observa la serie de cruces. Identifica cómo aumenta la cantidad de mosaicos.'],
  [7, 'Observa la figura original y aplica un giro de 90° en sentido horario.'],
  [8, 'Observa la figura original y aplica un giro de 180°.'],
  [9, 'Observa la cuadrícula y cuenta todos los cuadrados posibles.'],
  [10, 'Observa la figura y cuenta todos los triángulos posibles.'],
  [44, 'Observa los modelos A, B y C. Clasifícalos según el tipo de partículas que muestran.'],
  [73, 'Observa la gráfica y compara los cambios entre días consecutivos.'],
  [74, 'Observa el diagrama e identifica el par de ángulos alternos internos.'],
  [94, 'Observa el mapa y ubica el punto P según su latitud y longitud.'],
  [106, 'Observa la tabla y la gráfica. Compara la rapidez media del carrito en cada intervalo.'],
  [108, 'Observa el diagrama de fuerzas sobre la caja y calcula la fuerza necesaria para mantener el equilibrio.'],
  [112, 'Observa la orientación de la aguja de la brújula.']
]);
const EXPECTED_PROMPTS_BY_EXERCISE = new Map([
  [44, 'Con base en los modelos, ¿cómo se clasifican correctamente A, B y C?']
]);
const EXPECTED_VISUAL_OPTION_EXERCISES = new Set([5, 7, 8]);

function log(message) {
  console.log(`[qa-v2] ${message}`);
}

function runBuildGate(args = []) {
  const result = spawnSync(process.execPath, [BUILD_FILE, ...args], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  const output = `${result.stdout || ''}${result.stderr || ''}`;

  if (result.status !== 0 && output.includes('Faltan reactivos 105 al 116 del área Física')) {
    log('Build de producción bloqueado correctamente por Física faltante.');
    log('Este estado es válido solo para revisión técnica interna, no para publicación.');
    return false;
  }

  if (result.status !== 0 && output.includes('requiere imagen') && output.includes('no se encontró el asset')) {
    log('Build de producción bloqueado correctamente por assets visuales faltantes.');
    log('Este estado es válido solo para revisión técnica interna, no para publicación.');
    return false;
  }

  if (result.status !== 0) {
    console.error(output);
    throw new Error('El build falló por un motivo distinto al bloqueo esperado.');
  }

  return true;
}

function loadData() {
  const code = fs.readFileSync(DATA_FILE, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: DATA_FILE });
  return sandbox.window.IFR_APP_DATA;
}

function visibleTextForExercise(exercise) {
  return [
    exercise.areaName,
    exercise.block,
    exercise.baseText,
    exercise.basePill && exercise.basePill.content,
    exercise.prompt,
    exercise.hint,
    exercise.correctArgument,
    ...exercise.options.map((option) => option.text),
    ...Object.values(exercise.incorrectArgumentsByOption || {})
  ].filter(Boolean).join('\n');
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

function visibleArtifactEntriesForExercise(exercise) {
  const entries = [
    ['areaName', exercise.areaName],
    ['block', exercise.block],
    ['baseText', exercise.baseText],
    ['basePill.content', exercise.basePill && exercise.basePill.content],
    ['prompt', exercise.prompt],
    ['hint', exercise.hint],
    ['correctArgument', exercise.correctArgument],
    ['correctOptionText', exercise.correctOptionText],
    ...exercise.options.map((option) => [`option ${option.label}`, option.text]),
    ...Object.entries(exercise.incorrectArgumentsByOption || {}).map(([letter, value]) => [`incorrect ${letter}`, value])
  ];

  for (const visual of getExerciseVisuals(exercise)) {
    if (visual.caption) entries.push(['visual.caption', visual.caption]);
    if (visual.content) entries.push(['visual.content', visual.content]);
    if (Array.isArray(visual.headers)) {
      visual.headers.forEach((header, index) => entries.push([`visual.header ${index + 1}`, header]));
    }
    if (Array.isArray(visual.rows)) {
      visual.rows.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => entries.push([`visual.row ${rowIndex + 1}.${cellIndex + 1}`, cell]));
      });
    }
  }

  return entries.filter(([, value]) => value !== null && value !== undefined && String(value).trim());
}

function validateData(data, { partial = false } = {}) {
  assert.ok(data, 'No se cargó window.IFR_APP_DATA.');
  assert.equal(data.meta.title, 'Examen simulación 2 ECOEMS');
  assert.equal(data.meta.durationSeconds, 10800);
  assert.equal(data.meta.totalExercises, data.exercises.length);
  assert.equal(data.areas.length, EXPECTED_AREAS.length);

  const serializedData = JSON.stringify(data);
  for (const pattern of INTERNAL_PATTERNS) {
    assert.equal(serializedData.includes(pattern), false, `exam-data.js conserva contenido interno: ${pattern}.`);
  }

  if (partial) {
    assert.equal(data.meta.contentStatus.partial, true, 'El build parcial debe marcar contentStatus.partial.');
    const missingNumbers = data.meta.contentStatus.missingNumbers || [];
    assert.equal(data.exercises.length, EXPECTED_TOTAL - missingNumbers.length, 'El build parcial debe exponer todos los reactivos disponibles.');
  } else {
    assert.equal(data.exercises.length, EXPECTED_TOTAL);
  }

  for (const [name, start, end] of EXPECTED_AREAS) {
    const area = data.areas.find((item) => item.name === name);
    assert.ok(area, `Falta el área ${name}.`);
    assert.equal(area.rangeStart, start, `Rango inicial incorrecto para ${name}.`);
    assert.equal(area.rangeEnd, end, `Rango final incorrecto para ${name}.`);
  }

  const numbers = data.exercises.map((exercise) => exercise.number).sort((a, b) => a - b);
  const missingNumbers = data.meta.contentStatus.missingNumbers || [];
  const expectedNumbers = partial
    ? Array.from({ length: EXPECTED_TOTAL }, (_, index) => index + 1).filter((number) => !missingNumbers.includes(number))
    : Array.from({ length: EXPECTED_TOTAL }, (_, index) => index + 1);
  assert.deepEqual(numbers, expectedNumbers, partial ? 'La numeración parcial no coincide con los reactivos disponibles.' : 'La numeración no cubre 1-128 sin huecos.');

  const distribution = LETTERS.reduce((accumulator, letter) => {
    accumulator[letter] = [];
    return accumulator;
  }, {});

  for (const exercise of data.exercises) {
    assert.equal(exercise.options.length, 5, `Reactivo ${exercise.number}: no tiene cinco opciones.`);
    assert.deepEqual(exercise.options.map((option) => option.label).sort(), LETTERS, `Reactivo ${exercise.number}: letras de opciones inválidas.`);
    assert.ok(exercise.hint, `Reactivo ${exercise.number}: falta pista.`);
    assert.ok(exercise.correctArgument, `Reactivo ${exercise.number}: falta argumento correcto.`);
    assert.ok(LETTERS.includes(exercise.correctOption), `Reactivo ${exercise.number}: respuesta correcta inválida.`);

    for (const letter of LETTERS.filter((letter) => letter !== exercise.correctOption)) {
      assert.ok(exercise.incorrectArgumentsByOption[letter], `Reactivo ${exercise.number}: falta argumento incorrecto ${letter}).`);
    }

    const visibleText = visibleTextForExercise(exercise);
    for (const pattern of INTERNAL_PATTERNS) {
      assert.equal(visibleText.includes(pattern), false, `Reactivo ${exercise.number}: contenido interno visible: ${pattern}.`);
    }

    for (const [field, value] of visibleArtifactEntriesForExercise(exercise)) {
      const cleanValue = String(value || '');
      for (const [name, pattern] of FORBIDDEN_STUDENT_MARKUP_PATTERNS) {
        assert.equal(
          pattern.test(cleanValue),
          false,
          `Reactivo ${exercise.number}: ${field} conserva artefacto visible (${name}).`
        );
      }
    }

    if (EXPECTED_VISUAL_OBJECTIVE_BASE_TEXTS.has(exercise.number)) {
      assert.equal(
        exercise.baseText,
        EXPECTED_VISUAL_OBJECTIVE_BASE_TEXTS.get(exercise.number),
        `Reactivo ${exercise.number}: el texto base debe ser una instrucción breve, no una descripción redundante de la imagen.`
      );
    }

    if (EXPECTED_PROMPTS_BY_EXERCISE.has(exercise.number)) {
      assert.equal(
        exercise.prompt,
        EXPECTED_PROMPTS_BY_EXERCISE.get(exercise.number),
        `Reactivo ${exercise.number}: planteamiento esperado no coincide.`
      );
    }

    if (EXPECTED_VISUAL_OPTION_EXERCISES.has(exercise.number)) {
      assert.deepEqual(
        exercise.options.map((option) => option.text),
        LETTERS.map((letter) => `Opción visual ${letter.toUpperCase()}`),
        `Reactivo ${exercise.number}: las opciones visuales deben quedar compactas y no duplicar la imagen.`
      );
      assert.equal(
        exercise.correctOptionText,
        `Opción visual ${exercise.correctOption.toUpperCase()}`,
        `Reactivo ${exercise.number}: texto de respuesta correcta visual no coincide.`
      );
    }

    for (const visual of getExerciseVisuals(exercise)) {
      if (visual.kind === 'image' && visual.required) {
        assert.ok(visual.alt, `Reactivo ${exercise.number}: imagen sin texto alternativo.`);
        assert.equal(
          /Generar apoyo visual|GPT-Image|imagegen|Destino sugerido/i.test(visual.alt),
          false,
          `Reactivo ${exercise.number}: texto alternativo de imagen conserva instrucciones de generación.`
        );
        assert.ok(fs.existsSync(path.join(ROOT, visual.src)), `Reactivo ${exercise.number}: asset faltante ${visual.src}.`);
      }

      if (visual.kind === 'pending-image') {
        assert.equal(partial, true, `Reactivo ${exercise.number}: solo el build parcial puede exponer imagen pendiente.`);
        assert.ok(visual.content.includes('Apoyo visual pendiente'), `Reactivo ${exercise.number}: placeholder visual inválido.`);
      }

      if (visual.kind === 'table') {
        assert.equal(visual.hasHorizontalScroll, true, `Reactivo ${exercise.number}: tabla sin scroll horizontal.`);
        assert.ok(visual.headers.length > 0, `Reactivo ${exercise.number}: tabla sin encabezados.`);
        assert.ok(visual.rows.length > 0, `Reactivo ${exercise.number}: tabla sin filas.`);
      }
    }

    distribution[exercise.correctOption].push(exercise.number);
  }

  if (!partial) {
    for (const letter of LETTERS) {
      const count = distribution[letter].length;
      assert.ok(count >= 25 && count <= 26, `Distribución fuera de rango para ${letter}): ${count}.`);
    }
  }

  for (let index = 0; index <= data.exercises.length - 3; index += 1) {
    const first = data.exercises[index];
    const second = data.exercises[index + 1];
    const third = data.exercises[index + 2];
    assert.notEqual(
      first.correctOption === second.correctOption && second.correctOption === third.correctOption,
      true,
      `Tres respuestas consecutivas iguales en ${first.number}-${third.number}.`
    );
  }

  log(partial
    ? `Datos parciales validados: ${data.exercises.length} reactivos disponibles, 10 áreas esperadas, contenido limpio y placeholders de assets.`
    : 'Datos completos validados: 128 reactivos, 10 áreas, opciones, pistas, argumentos, assets y distribución.');
}

function main() {
  const buildSucceeded = runBuildGate();
  if (buildSucceeded) {
    assert.ok(fs.existsSync(DATA_FILE), 'El build indicó éxito, pero no existe exam-data.js.');
    validateData(loadData());
    log('QA automatizada de datos completada. Ejecutar validación de navegador real antes de publicar en Vercel.');
    return;
  }

  log('Generando exam-data.js parcial para que la app muestre los reactivos disponibles.');
  const partialResult = spawnSync(process.execPath, [BUILD_FILE, '--partial'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  if (partialResult.status !== 0) {
    console.error(`${partialResult.stdout || ''}${partialResult.stderr || ''}`);
    throw new Error('No se pudo generar el build parcial de revisión interna.');
  }
  assert.ok(fs.existsSync(DATA_FILE), 'El build indicó éxito, pero no existe exam-data.js.');
  validateData(loadData(), { partial: true });
  log('QA parcial completada. El examen no debe publicarse hasta resolver los faltantes reportados.');
}

main();
