# Contexto de la versión 2

## Propósito

`IFR | Examen simulación 2 ECOEMS` es una segunda evaluación estática para práctica tipo ECOEMS 2026. Debe conservar la base funcional de la simulación 1 y trabajar con contenido nuevo, mayor dificultad controlada y validaciones editoriales más estrictas.

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
- descarga PNG;
- estilos IFR con Plus Jakarta Sans.

## Cambios de V2

- Título visible: `Examen simulación 2 ECOEMS`.
- Archivo fuente: `Examen simulación 2.txt`.
- Parser específico para el formato V2.
- Píldoras visuales derivadas del TXT.
- Tablas marcadas con desplazamiento horizontal.
- Imágenes controladas por instrucciones internas privadas.
- Bloqueo de producción cuando faltan reactivos o assets.

## Estado del contenido

El TXT actual contiene 116 reactivos:

- Habilidad matemática: 1-16.
- Biología: 17-28.
- Español: 29-40.
- Química: 41-52.
- Historia: 53-64.
- Matemáticas: 65-76.
- Habilidad verbal: 77-92.
- Geografía: 93-104.
- Formación cívica y ética: 117-128.

Falta Física, reactivos 105 al 116. Por esta razón, el build de producción está bloqueado.

Para revisar el contenido ya disponible, existe modo parcial con `node build-exam-data.js --partial`. Este modo genera `exam-data.js` con 116 reactivos visibles, conserva Física como pendiente y no debe usarse para declarar el examen completo.

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

## Pendientes

- Recibir Física 105-116.
- Generar assets V2.
- Ejecutar build completo.
- Ejecutar QA de navegador.
- Publicar en Vercel solo después de pasar QA crítica.
