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

function validateData(data, { partial = false } = {}) {
  assert.ok(data, 'No se cargó window.IFR_APP_DATA.');
  assert.equal(data.meta.title, 'Examen simulación 2 ECOEMS');
  assert.equal(data.meta.durationSeconds, 10800);
  assert.equal(data.meta.totalExercises, data.exercises.length);
  assert.equal(data.areas.length, EXPECTED_AREAS.length);

  if (partial) {
    assert.equal(data.meta.contentStatus.partial, true, 'El build parcial debe marcar contentStatus.partial.');
    assert.equal(data.exercises.length, 116, 'El build parcial debe exponer los 116 reactivos disponibles.');
    assert.deepEqual(data.meta.contentStatus.missingNumbers, [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116], 'El build parcial debe declarar Física faltante.');
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
  const expectedNumbers = partial
    ? [...Array.from({ length: 104 }, (_, index) => index + 1), ...Array.from({ length: 12 }, (_, index) => index + 117)]
    : Array.from({ length: EXPECTED_TOTAL }, (_, index) => index + 1);
  assert.deepEqual(numbers, expectedNumbers, partial ? 'La numeración parcial no coincide con los 116 reactivos disponibles.' : 'La numeración no cubre 1-128 sin huecos.');

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

    if (exercise.visual && exercise.visual.kind === 'image' && exercise.visual.required) {
      assert.ok(exercise.visual.alt, `Reactivo ${exercise.number}: imagen sin texto alternativo.`);
      assert.ok(fs.existsSync(path.join(ROOT, exercise.visual.src)), `Reactivo ${exercise.number}: asset faltante ${exercise.visual.src}.`);
    }

    if (exercise.visual && exercise.visual.kind === 'pending-image') {
      assert.equal(partial, true, `Reactivo ${exercise.number}: solo el build parcial puede exponer imagen pendiente.`);
      assert.ok(exercise.visual.content.includes('Apoyo visual pendiente'), `Reactivo ${exercise.number}: placeholder visual inválido.`);
    }

    if (exercise.visual && exercise.visual.kind === 'table') {
      assert.equal(exercise.visual.hasHorizontalScroll, true, `Reactivo ${exercise.number}: tabla sin scroll horizontal.`);
      assert.ok(exercise.visual.headers.length > 0, `Reactivo ${exercise.number}: tabla sin encabezados.`);
      assert.ok(exercise.visual.rows.length > 0, `Reactivo ${exercise.number}: tabla sin filas.`);
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
    ? 'Datos parciales validados: 116 reactivos disponibles, 10 áreas esperadas, contenido limpio y placeholders de assets.'
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
  log('QA parcial completada. Sigue pendiente Física 105-116 antes de publicar como examen completo.');
}

main();
