const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SOURCE_FILE = path.join(ROOT, 'Examen simulación 2.txt');
const OUTPUT_FILE = path.join(ROOT, 'exam-data.js');
const EXPECTED_TOTAL = 128;
const ALLOW_PARTIAL = process.argv.includes('--partial') || process.env.IFR_ALLOW_PARTIAL === 'true';

const EXPECTED_AREAS = [
  { id: 'habilidad-matematica', name: 'Habilidad matemática', rangeStart: 1, rangeEnd: 16 },
  { id: 'biologia', name: 'Biología', rangeStart: 17, rangeEnd: 28 },
  { id: 'espanol', name: 'Español', rangeStart: 29, rangeEnd: 40 },
  { id: 'quimica', name: 'Química', rangeStart: 41, rangeEnd: 52 },
  { id: 'historia', name: 'Historia', rangeStart: 53, rangeEnd: 64 },
  { id: 'matematicas', name: 'Matemáticas', rangeStart: 65, rangeEnd: 76 },
  { id: 'habilidad-verbal', name: 'Habilidad verbal', rangeStart: 77, rangeEnd: 92 },
  { id: 'geografia', name: 'Geografía', rangeStart: 93, rangeEnd: 104 },
  { id: 'fisica', name: 'Física', rangeStart: 105, rangeEnd: 116 },
  { id: 'formacion-civica-etica', name: 'Formación cívica y ética', rangeStart: 117, rangeEnd: 128 }
].map((area) => ({
  ...area,
  totalExercises: area.rangeEnd - area.rangeStart + 1
}));

const FIELD_ALIASES = {
  area: ['Área temática:'],
  block: ['Bloque que corresponde al área temática:'],
  baseText: ['Texto base:'],
  prompt: ['Planteamiento:'],
  options: ['Opciones:'],
  hint: ['Pista:'],
  correctAnswer: ['Respuesta correcta:'],
  correctArgument: ['Argumento de la respuesta correcta:'],
  incorrectArguments: [
    'Argumentos de las respuestas incorrectas:',
    'Argumentos de las opciones incorrectas:'
  ]
};

const FIELD_LABELS = Object.values(FIELD_ALIASES).flat();
const LETTERS = ['a', 'b', 'c', 'd', 'e'];

function normalizeLine(line) {
  return String(line || '').trim();
}

function normalizeText(value) {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\uFEFF/g, '')
    .normalize('NFC');
}

function trimBlock(lines) {
  const copy = [...lines];
  while (copy.length && !normalizeLine(copy[0])) copy.shift();
  while (copy.length && !normalizeLine(copy[copy.length - 1])) copy.pop();
  return copy;
}

function blockToText(lines) {
  return trimBlock(lines).join('\n').trim();
}

function isFieldLabel(line) {
  const clean = normalizeLine(line);
  return FIELD_LABELS.includes(clean);
}

function isOperationalLine(line) {
  const clean = normalizeLine(line);
  return [
    /^ÁREA TEMÁTICA:/i,
    /^RANGO:/i,
    /^VERSIÓN:/i,
    /^CRITERIO GENERAL:/i,
    /^TABLA DE CONTROL/i,
    /^REVISIÓN DE DISTRIBUCIÓN/i,
    /^OBSERVACIONES/i,
    /^SECUENCIA DE RESPUESTAS/i,
    /^DISTRIBUCIÓN/i,
    /^=== FIN DEL ÁREA TEMÁTICA:/i,
    /^LISTO PARA PEGAR/i,
    /^Los reactivos \d+/i,
    /^El reactivo \d+ requiere apoyo visual/i
  ].some((pattern) => pattern.test(clean));
}

function findFieldIndex(lines, aliases) {
  return lines.findIndex((line) => aliases.includes(normalizeLine(line)));
}

function readField(lines, key) {
  const index = findFieldIndex(lines, FIELD_ALIASES[key]);
  if (index < 0) return null;
  let end = lines.length;
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    if (isFieldLabel(lines[cursor])) {
      end = cursor;
      break;
    }
  }
  return trimBlock(lines.slice(index + 1, end));
}

function parseLabeledItems(lines) {
  const items = [];
  let current = null;

  for (const rawLine of trimBlock(lines)) {
    const line = rawLine.trimEnd();
    if (isOperationalLine(line)) break;
    const match = line.match(/^([a-eA-E])\)\s*(.*)$/);
    if (match) {
      if (current) items.push(current);
      current = {
        label: match[1].toLowerCase(),
        textLines: match[2] ? [match[2]] : []
      };
      continue;
    }
    if (current) current.textLines.push(line);
  }

  if (current) items.push(current);
  return items.map((item) => ({
    label: item.label,
    text: blockToText(item.textLines)
  }));
}

function getExpectedAreaByNumber(number) {
  return EXPECTED_AREAS.find((area) => number >= area.rangeStart && number <= area.rangeEnd);
}

function cleanAssetPath(value) {
  return String(value || '').trim().replace(/^[/\\]+/, '').replace(/\\/g, '/');
}

function assetAlt(area, number, usage) {
  const cleanUsage = String(usage || '').replace(/\s+/g, ' ').trim();
  if (cleanUsage) return `${area}, reactivo ${number}: ${cleanUsage}`;
  return `${area}, reactivo ${number}: apoyo visual del planteamiento`;
}

function extractInstructionBlocks(lines) {
  const cleaned = [];
  const instructions = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!/^\[INSTRUCCIÓN INTERNA PARA CODEX\b/i.test(normalizeLine(lines[index]))) {
      cleaned.push(lines[index]);
      continue;
    }

    const block = [];
    let cursor = index + 1;
    while (cursor < lines.length && !/^\[\/INSTRUCCIÓN INTERNA PARA CODEX\]/i.test(normalizeLine(lines[cursor]))) {
      block.push(lines[cursor]);
      cursor += 1;
    }
    instructions.push(parseInstructionBlock(block));
    index = cursor;
  }

  return { cleaned, instructions };
}

function parseInstructionBlock(lines) {
  const values = Object.create(null);
  let currentKey = null;

  for (const line of trimBlock(lines)) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      currentKey = match[1].trim();
      values[currentKey] = match[2].trim();
      continue;
    }
    if (currentKey) {
      values[currentKey] = `${values[currentKey]}\n${line}`.trim();
    }
  }

  return {
    area: values['Área'] || '',
    number: Number.parseInt(values['Reactivo'] || '', 10) || null,
    usage: values['Uso'] || '',
    tool: values['Herramienta'] || '',
    imageType: values['Tipo de imagen'] || '',
    technicalDescription: values['Descripción técnica'] || '',
    style: values['Estilo'] || '',
    allowedText: values['Texto visible permitido'] || '',
    prohibitedText: values['Texto visible prohibido'] || '',
    suggestedFormat: values['Formato sugerido'] || '',
    suggestedDestination: cleanAssetPath(values['Destino sugerido'] || ''),
    validation: values['Validación'] || ''
  };
}

function extractAngledQuotedValues(line) {
  const values = [];
  const regex = /«([^»]+)»/g;
  let match = regex.exec(line);
  while (match) {
    values.push(match[1]);
    match = regex.exec(line);
  }
  return values;
}

function parsePillBlock(lines) {
  const content = [];
  const highlights = [];
  const underlines = [];
  let inMarks = false;

  for (const rawLine of trimBlock(lines)) {
    const line = rawLine.trimEnd();
    if (/^Marcas de énfasis:/i.test(line.trim())) {
      inMarks = true;
      continue;
    }
    if (!inMarks) {
      content.push(line);
      continue;
    }
    if (/^-\s*Resaltar:/i.test(line.trim())) {
      highlights.push(...extractAngledQuotedValues(line));
    }
    if (/^-\s*Subrayar:/i.test(line.trim())) {
      underlines.push(...extractAngledQuotedValues(line));
    }
  }

  return {
    type: 'pill',
    content: blockToText(content),
    highlights,
    underlines
  };
}

function parseMarkdownTable(lines) {
  const tableLines = trimBlock(lines).filter((line) => /^\s*\|.*\|\s*$/.test(line));
  if (tableLines.length < 2) return { headers: [], rows: [] };

  const splitRow = (line) => line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

  const headers = splitRow(tableLines[0]);
  const rows = tableLines
    .slice(2)
    .map(splitRow)
    .filter((row) => row.length === headers.length);

  return { headers, rows };
}

function extractBaseFeatures(lines) {
  const afterInstructions = extractInstructionBlocks(lines);
  let working = afterInstructions.cleaned;
  const baseParts = [];
  let basePill = null;
  let tableVisual = null;

  for (let index = 0; index < working.length; index += 1) {
    const clean = normalizeLine(working[index]);

    if (/^\[TEXTO EN PÍLDORA VISUAL ESPECIAL\]/i.test(clean)) {
      const block = [];
      let cursor = index + 1;
      while (cursor < working.length && !/^\[\/TEXTO EN PÍLDORA VISUAL ESPECIAL\]/i.test(normalizeLine(working[cursor]))) {
        block.push(working[cursor]);
        cursor += 1;
      }
      basePill = parsePillBlock(block);
      index = cursor;
      continue;
    }

    if (/^\[RENDERIZAR COMO TABLA/i.test(clean)) {
      const block = [];
      let cursor = index + 1;
      while (cursor < working.length && !/^\[\/TABLA\]/i.test(normalizeLine(working[cursor]))) {
        block.push(working[cursor]);
        cursor += 1;
      }
      const tableStart = block.findIndex((line) => /^\s*\|.*\|\s*$/.test(line));
      const captionLines = tableStart > 0 ? block.slice(0, tableStart) : [];
      const tableLines = tableStart >= 0 ? block.slice(tableStart) : block;
      tableVisual = {
        kind: 'table',
        position: 'base',
        hasHorizontalScroll: true,
        caption: blockToText(captionLines),
        ...parseMarkdownTable(tableLines)
      };
      if (captionLines.length) baseParts.push(blockToText(captionLines));
      index = cursor;
      continue;
    }

    baseParts.push(working[index]);
  }

  const baseText = blockToText(baseParts);
  return {
    baseText: /^No aplica\.?$/i.test(baseText) || basePill ? '' : baseText,
    basePill,
    tableVisual,
    instructions: afterInstructions.instructions
  };
}

function containsInternalMarker(value) {
  return /\[\/?(INSTRUCCIÓN INTERNA PARA CODEX|TEXTO EN PÍLDORA VISUAL ESPECIAL|RENDERIZAR COMO TABLA|TABLA)\]/i.test(String(value || ''));
}

function parseReactivoBlock(blockLines) {
  const heading = normalizeLine(blockLines[0]);
  const numberMatch = heading.match(/^REACTIVO\s+(\d+)$/i);
  if (!numberMatch) throw new Error(`No se pudo leer el encabezado: ${heading}`);
  const number = Number.parseInt(numberMatch[1], 10);
  const body = blockLines.slice(1);

  const areaLines = readField(body, 'area') || [];
  const blockNameLines = readField(body, 'block') || [];
  const baseLines = readField(body, 'baseText') || [];
  const promptLines = readField(body, 'prompt') || [];
  const optionLines = readField(body, 'options') || [];
  const hintLines = readField(body, 'hint') || [];
  const correctAnswerLines = readField(body, 'correctAnswer') || [];
  const correctArgumentLines = readField(body, 'correctArgument') || [];
  const incorrectArgumentLines = readField(body, 'incorrectArguments') || [];

  const areaName = blockToText(areaLines);
  const blockName = blockToText(blockNameLines);
  const prompt = blockToText(promptLines);
  const hint = blockToText(hintLines);
  const correctArgument = blockToText(correctArgumentLines);
  const base = extractBaseFeatures(baseLines);
  const options = parseLabeledItems(optionLines);
  const correctAnswer = parseLabeledItems(correctAnswerLines)[0] || null;
  const incorrectArguments = parseLabeledItems(incorrectArgumentLines)
    .reduce((accumulator, item) => {
      accumulator[item.label] = item.text;
      return accumulator;
    }, {});

  const expectedArea = getExpectedAreaByNumber(number);
  const imageInstruction = base.instructions.find((instruction) => instruction.suggestedDestination);
  const visual = base.tableVisual || (imageInstruction ? {
    kind: 'image',
    position: 'base',
    required: true,
    src: imageInstruction.suggestedDestination,
    alt: assetAlt(areaName || imageInstruction.area, number, imageInstruction.usage),
    internalInstructionRemoved: true,
    instruction: {
      tool: imageInstruction.tool,
      imageType: imageInstruction.imageType,
      validation: imageInstruction.validation
    }
  } : { kind: 'none', content: '' });

  return {
    id: `reactivo-${number}`,
    number,
    areaId: expectedArea ? expectedArea.id : '',
    areaName,
    block: blockName,
    baseText: base.baseText || null,
    basePill: base.basePill,
    prompt,
    options,
    correctOption: correctAnswer ? correctAnswer.label : '',
    correctOptionText: correctAnswer ? (correctAnswer.text || (options.find((option) => option.label === correctAnswer.label) || {}).text || '') : '',
    hint,
    correctArgument,
    incorrectArgumentsByOption: incorrectArguments,
    visual,
    sourceOrder: number,
    rangeStart: expectedArea ? expectedArea.rangeStart : null,
    rangeEnd: expectedArea ? expectedArea.rangeEnd : null
  };
}

function parseSource(text) {
  const lines = normalizeText(text).split('\n');
  const indices = [];

  lines.forEach((line, index) => {
    if (/^REACTIVO\s+\d+\s*$/i.test(normalizeLine(line))) {
      indices.push(index);
    }
  });

  return indices.map((start, position) => {
    const end = position + 1 < indices.length ? indices[position + 1] : lines.length;
    return parseReactivoBlock(trimBlock(lines.slice(start, end)));
  });
}

function buildLetterDistribution(exercises) {
  const distribution = LETTERS.reduce((accumulator, letter) => {
    accumulator[letter] = [];
    return accumulator;
  }, {});

  for (const exercise of exercises) {
    if (distribution[exercise.correctOption]) {
      distribution[exercise.correctOption].push(exercise.number);
    }
  }

  return distribution;
}

function printDistribution(distribution) {
  console.log('\nDistribución de respuestas correctas');
  console.log('Letra | Cantidad | Reactivos');
  console.log('---|---:|---');
  for (const letter of LETTERS) {
    const numbers = distribution[letter] || [];
    console.log(`${letter}) | ${numbers.length} | ${numbers.join(', ') || '-'}`);
  }
}

function findRepeatedTriples(exercises) {
  const triples = [];
  const ordered = [...exercises].sort((a, b) => a.number - b.number);
  for (let index = 0; index <= ordered.length - 3; index += 1) {
    const a = ordered[index];
    const b = ordered[index + 1];
    const c = ordered[index + 2];
    if (a.correctOption && a.correctOption === b.correctOption && b.correctOption === c.correctOption) {
      triples.push(`${a.number}-${c.number}: ${a.correctOption})`);
    }
  }
  return triples;
}

function validateExercises(exercises) {
  const errors = [];
  const warnings = [];
  const byNumber = new Map();

  for (const exercise of exercises) {
    if (byNumber.has(exercise.number)) {
      errors.push(`ERROR: Reactivo duplicado: ${exercise.number}.`);
    }
    byNumber.set(exercise.number, exercise);
  }

  const missing = [];
  for (let number = 1; number <= EXPECTED_TOTAL; number += 1) {
    if (!byNumber.has(number)) missing.push(number);
  }

  const missingPhysics = EXPECTED_AREAS[8];
  const missingPhysicsNumbers = missing.filter((number) => number >= missingPhysics.rangeStart && number <= missingPhysics.rangeEnd);
  if (missingPhysicsNumbers.length === missingPhysics.totalExercises) {
    errors.push('ERROR: Faltan reactivos 105 al 116 del área Física. El examen simulación 2 requiere 128 reactivos. No se generó build de producción.');
  }

  if (missing.length) {
    errors.push(`ERROR: Faltan reactivos: ${missing.join(', ')}.`);
  }

  if (exercises.length !== EXPECTED_TOTAL) {
    errors.push(`ERROR: Se detectaron ${exercises.length} reactivos. El examen simulación 2 requiere ${EXPECTED_TOTAL} reactivos.`);
  }

  const detectedAreas = new Set(exercises.map((exercise) => exercise.areaName).filter(Boolean));
  for (const expectedArea of EXPECTED_AREAS) {
    const areaExercises = exercises.filter((exercise) => exercise.areaName === expectedArea.name);
    if (!areaExercises.length) {
      errors.push(`ERROR: Falta el área ${expectedArea.name} (${expectedArea.rangeStart}-${expectedArea.rangeEnd}).`);
      continue;
    }
    const outside = areaExercises.filter((exercise) => exercise.number < expectedArea.rangeStart || exercise.number > expectedArea.rangeEnd);
    if (outside.length) {
      errors.push(`ERROR: El área ${expectedArea.name} contiene reactivos fuera de rango: ${outside.map((exercise) => exercise.number).join(', ')}.`);
    }
  }

  if (detectedAreas.size !== EXPECTED_AREAS.length) {
    errors.push(`ERROR: Se detectaron ${detectedAreas.size} áreas. El examen simulación 2 requiere ${EXPECTED_AREAS.length} áreas.`);
  }

  for (const exercise of exercises) {
    const expectedArea = getExpectedAreaByNumber(exercise.number);
    if (!expectedArea) {
      errors.push(`ERROR: El reactivo ${exercise.number} está fuera del rango 1 a 128.`);
    } else if (exercise.areaName !== expectedArea.name) {
      errors.push(`ERROR: El reactivo ${exercise.number} pertenece al rango de ${expectedArea.name}, pero declara "${exercise.areaName}".`);
    }

    if (!exercise.areaName) errors.push(`ERROR: El reactivo ${exercise.number} no tiene área temática.`);
    if (!exercise.block) errors.push(`ERROR: El reactivo ${exercise.number} no tiene bloque temático.`);
    if (!exercise.prompt) errors.push(`ERROR: El reactivo ${exercise.number} no tiene planteamiento.`);
    if (!exercise.hint) errors.push(`ERROR: El reactivo ${exercise.number} no tiene pista. Todos los reactivos deben incluir pista.`);
    if (!exercise.correctArgument) errors.push(`ERROR: El reactivo ${exercise.number} no tiene argumento de respuesta correcta.`);

    const optionLabels = exercise.options.map((option) => option.label).sort();
    if (exercise.options.length !== 5 || optionLabels.join('') !== LETTERS.join('')) {
      errors.push(`ERROR: El reactivo ${exercise.number} no contiene exactamente cinco opciones a), b), c), d), e).`);
    }

    if (!LETTERS.includes(exercise.correctOption)) {
      errors.push(`ERROR: El reactivo ${exercise.number} no tiene respuesta correcta válida.`);
    } else if (!exercise.options.some((option) => option.label === exercise.correctOption)) {
      errors.push(`ERROR: La respuesta correcta del reactivo ${exercise.number} no coincide con las opciones.`);
    }

    for (const letter of LETTERS.filter((letter) => letter !== exercise.correctOption)) {
      if (!exercise.incorrectArgumentsByOption[letter]) {
        errors.push(`ERROR: El reactivo ${exercise.number} no tiene argumento para la opción incorrecta ${letter}).`);
      }
    }

    const visibleContent = [
      exercise.baseText,
      exercise.basePill && exercise.basePill.content,
      exercise.prompt,
      exercise.hint,
      exercise.correctArgument,
      ...exercise.options.map((option) => option.text),
      ...Object.values(exercise.incorrectArgumentsByOption)
    ].filter(Boolean).join('\n');

    if (containsInternalMarker(visibleContent)) {
      errors.push(`ERROR: Se detectó una instrucción interna en contenido visible del reactivo ${exercise.number}. Debe filtrarse antes de renderizar.`);
    }

    if (exercise.visual && exercise.visual.kind === 'image' && exercise.visual.required) {
      const assetPath = path.join(ROOT, exercise.visual.src);
      if (!fs.existsSync(assetPath)) {
        errors.push(`ERROR: El reactivo ${exercise.number} requiere imagen, pero no se encontró el asset en ${exercise.visual.src}.`);
      }
    }

    if (exercise.visual && exercise.visual.kind === 'table') {
      if (!exercise.visual.hasHorizontalScroll) {
        errors.push(`ERROR: El reactivo ${exercise.number} contiene tabla marcada para desplazamiento horizontal, pero no fue envuelta en contenedor responsive.`);
      }
      if (!exercise.visual.headers.length || !exercise.visual.rows.length) {
        errors.push(`ERROR: El reactivo ${exercise.number} contiene tabla marcada, pero no se pudo leer como tabla Markdown.`);
      }
    }
  }

  const distribution = buildLetterDistribution(exercises);
  const triples = findRepeatedTriples(exercises);
  if (triples.length) {
    warnings.push(`ADVERTENCIA: Se detectaron tres respuestas iguales consecutivas: ${triples.join('; ')}.`);
  }

  for (const letter of LETTERS) {
    const count = distribution[letter].length;
    if (exercises.length === EXPECTED_TOTAL && (count < 25 || count > 26)) {
      warnings.push(`ADVERTENCIA: Distribución de respuestas fuera del rango recomendado para ${letter}): ${count}.`);
    }
  }

  return { errors, warnings, distribution };
}

function getMissingNumbers(exercises) {
  const byNumber = new Set(exercises.map((exercise) => exercise.number));
  const missing = [];
  for (let number = 1; number <= EXPECTED_TOTAL; number += 1) {
    if (!byNumber.has(number)) missing.push(number);
  }
  return missing;
}

function getMissingAssets(exercises) {
  return exercises
    .filter((exercise) => exercise.visual && exercise.visual.kind === 'image' && exercise.visual.required)
    .filter((exercise) => !fs.existsSync(path.join(ROOT, exercise.visual.src)))
    .map((exercise) => ({
      number: exercise.number,
      src: exercise.visual.src
    }));
}

function isAllowedPartialError(error) {
  return [
    /^ERROR: Faltan reactivos 105 al 116 del área Física\./,
    /^ERROR: Faltan reactivos: 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116\./,
    /^ERROR: Se detectaron 116 reactivos\. El examen simulación 2 requiere 128 reactivos\./,
    /^ERROR: Falta el área Física \(105-116\)\./,
    /^ERROR: Se detectaron 9 áreas\. El examen simulación 2 requiere 10 áreas\./,
    /^ERROR: El reactivo \d+ requiere imagen, pero no se encontró el asset en /
  ].some((pattern) => pattern.test(error));
}

function prepareExercisesForOutput(exercises, allowPartial) {
  return [...exercises]
    .sort((a, b) => a.number - b.number)
    .map((exercise) => {
      const visual = exercise.visual;
      if (
        allowPartial
        && visual
        && visual.kind === 'image'
        && visual.required
        && !fs.existsSync(path.join(ROOT, visual.src))
      ) {
        return {
          ...exercise,
          visual: {
            kind: 'pending-image',
            position: visual.position || 'base',
            required: true,
            src: visual.src,
            alt: visual.alt,
            content: `Apoyo visual pendiente: ${visual.src}`
          }
        };
      }
      return exercise;
    });
}

function buildData(exercises, validation, allowPartial = false) {
  const areaCountMap = exercises.reduce((accumulator, exercise) => {
    accumulator[exercise.areaId] = (accumulator[exercise.areaId] || 0) + 1;
    return accumulator;
  }, {});
  const missingNumbers = getMissingNumbers(exercises);
  const missingAssets = getMissingAssets(exercises);

  return {
    meta: {
      version: '2',
      title: 'Examen simulación 2 ECOEMS',
      institution: 'Instituto Fernando Ramírez',
      durationSeconds: 10800,
      totalExercises: exercises.length,
      expectedTotalExercises: EXPECTED_TOTAL,
      scoreMode: 'raw-and-percent',
      contentStatus: {
        partial: allowPartial,
        label: allowPartial ? 'Revisión interna' : 'Completo',
        message: allowPartial
          ? 'Contenido disponible para revisión interna: faltan Física 105-116 y assets visuales obligatorios.'
          : 'Contenido completo validado.',
        missingNumbers,
        missingAssets
      }
    },
    areas: EXPECTED_AREAS.map((area) => ({
      ...area,
      totalExercises: areaCountMap[area.id] || 0
    })),
    exercises: prepareExercisesForOutput(exercises, allowPartial)
  };
}

function main() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`ERROR: No existe el archivo fuente ${SOURCE_FILE}.`);
    process.exit(1);
  }

  const source = fs.readFileSync(SOURCE_FILE, 'utf8');
  const exercises = parseSource(source);
  const validation = validateExercises(exercises);

  printDistribution(validation.distribution);

  for (const warning of validation.warnings) {
    console.warn(warning);
  }

  const blockingErrors = ALLOW_PARTIAL
    ? validation.errors.filter((error) => !isAllowedPartialError(error))
    : validation.errors;

  if (blockingErrors.length) {
    console.error('\nValidación detenida:');
    for (const error of blockingErrors) {
      console.error(error);
    }
    process.exit(1);
  }

  if (validation.errors.length && ALLOW_PARTIAL) {
    console.warn('\nBuild parcial de revisión interna:');
    for (const error of validation.errors) {
      console.warn(error);
    }
  } else if (validation.errors.length) {
    console.error('\nValidación detenida:');
    for (const error of validation.errors) {
      console.error(error);
    }
    process.exit(1);
  }

  const data = buildData(exercises, validation, ALLOW_PARTIAL);
  const output = `window.IFR_APP_DATA = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`Generado ${path.basename(OUTPUT_FILE)} con ${data.meta.totalExercises} reactivos y ${data.areas.length} áreas${ALLOW_PARTIAL ? ' en modo revisión interna' : ''}.`);
}

main();
