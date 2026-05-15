# Contexto de la versión 2

## Propósito

`IFR | Examen simulación 2 ECOEMS` es una segunda evaluación estática para práctica tipo ECOEMS 2026. Conserva la base funcional de la simulación 1 y trabaja con contenido nuevo, dificultad controlada y validaciones editoriales más estrictas.

## Base reutilizada

Se reutiliza de la simulación 1:

- portada institucional IFR;
- escudo del Instituto Fernando Ramírez;
- cronómetro de 3 horas;
- avance secuencial;
- bloqueo de reactivos futuros;
- métricas en vivo;
- pista por reactivo;
- retroalimentación correcta e incorrecta;
- resultado final;
- reporte descargable;
- estilos IFR con Plus Jakarta Sans.

## Cambios de V2

- Título visible: `Examen simulación 2 ECOEMS`.
- Archivo fuente: `Examen simulación 2.txt`.
- Parser específico para el formato V2.
- Píldoras visuales derivadas del TXT.
- Tablas marcadas con desplazamiento horizontal.
- Imágenes controladas por instrucciones internas privadas.
- Soporte de `visuals[]` para más de un apoyo visual por reactivo.
- Bloqueo de producción cuando faltan reactivos o assets.
- Recarga segura con progreso persistente y decisión explícita para continuar o reiniciar.
- Descarga de reporte PDF con los reactivos incorrectos, márgenes estándar y cortes de página controlados.

## Estado del contenido

El TXT actual contiene 128 reactivos:

- Habilidad matemática: 1-16.
- Biología: 17-28.
- Español: 29-40.
- Química: 41-52.
- Historia: 53-64.
- Matemáticas: 65-76.
- Habilidad verbal: 77-92.
- Geografía: 93-104.
- Física: 105-116.
- Formación cívica y ética: 117-128.

El build de producción genera `exam-data.js` completo y sin faltantes.

## Validaciones nuevas del parser

- Total esperado de 128 reactivos.
- 10 áreas obligatorias.
- Rango exacto por área.
- Cinco opciones a), b), c), d), e).
- Pista obligatoria.
- Respuesta correcta válida.
- Argumento correcto.
- Argumentos de opciones incorrectas.
- Filtro de instrucciones internas.
- Detección de píldoras visuales.
- Conversión de tablas horizontales.
- Validación de assets requeridos.
- Distribución de respuestas por letra.
- Detección de más de un visual por reactivo.
- Validación de presencia del flujo de persistencia de progreso en `qa/run-exam-qa.js`.
- Validación de presencia del flujo de descarga PDF en iOS, Android y Windows.
- QA de navegador reproducible para descarga del resultado: `node qa/run-result-download-browser-qa.js`.

## QA ejecutada

- `node build-exam-data.js`.
- `node qa/run-exam-qa.js`.
- Revisión local en navegador con portada, conteo 128/10, Física presente, imagen real en reactivo 5, recarga segura en escritorio/móvil y descarga PDF con perfiles Windows, Android e iPhone.

## Pendientes

- Confirmar despliegue público en Vercel después del push.
