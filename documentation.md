# Documentación de estado

## Estado general

La simulación 2 está preparada en local a partir de la simulación 1. El proyecto conserva identidad IFR, estructura estática, app shell, cronómetro, métricas, bloqueo secuencial, retroalimentación y resultado final descargable.

El contenido ya está completo: 128 reactivos, 10 áreas y Física integrada del 105 al 116.

## Decisiones tomadas

- `exam-data.js` de producción solo se genera cuando existen 128 reactivos y todos los assets obligatorios.
- `visuals[]` es la fuente completa para apoyos visuales; `visual` se conserva como compatibilidad heredada.
- El reactivo 106 puede mostrar tabla horizontal e imagen en el mismo reactivo.
- Las instrucciones internas del TXT se filtran y no forman parte de `exam-data.js`.
- Las píldoras visuales se derivan del TXT.
- Las tablas marcadas se convierten en tablas renderizables con desplazamiento horizontal.
- Los planteamientos y argumentos de áreas numéricas deben mostrarse con notación escolar limpia, sin sintaxis tipo LaTeX o Markdown visible para el alumno.
- En reactivos con apoyo visual, el texto base visible debe funcionar como instrucción u objetivo; las descripciones largas de la imagen se reservan para el apoyo visual o el texto alternativo.
- Cuando las opciones ya están representadas en la imagen, el texto visible de las opciones puede compactarse como «Opción visual A-E».
- Los textos alternativos de imágenes deben ser útiles para el alumno y no conservar frases internas de generación.
- El nombre de descarga queda como `resultado-ecoems-ifr-simulacion-2.png`.

## Comandos

```powershell
node build-exam-data.js
node qa/run-exam-qa.js
python -m http.server 4173
```

## Última validación local

`node build-exam-data.js` generó `exam-data.js` con 128 reactivos y 10 áreas.

`node qa/run-exam-qa.js` validó datos, opciones, pistas, argumentos, assets, distribución de respuestas, ausencia de contenido interno en `exam-data.js`, ausencia de artefactos LaTeX/Markdown en textos visibles, textos base breves en reactivos con imagen revisados y textos alternativos sin frases de generación.

Validación en navegador local:

- Portada con título `Examen simulación 2 ECOEMS`.
- Conteo inicial: 128 reactivos y 10 áreas.
- Física aparece como presente con 12 reactivos disponibles.
- No aparece el panel de advertencia sobre refrescar página.
- Inicio de examen funcional.
- Reactivos 3 y 4 con tablas visuales en lugar de tablas Markdown crudas.
- Reactivo 5 carga imagen real en móvil y muestra una instrucción breve, sin el bloque descriptivo de figuras.
- Reactivos con imagen revisados mantienen objetivo de trabajo visible y assets reales.

## Siguiente hito

Confirmar que Vercel refleje el último push y revisar la URL pública.
