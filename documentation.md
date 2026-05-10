# Documentación de estado

## Estado general

La simulación 2 está preparada en local a partir de la simulación 1. El proyecto conserva identidad IFR, estructura estática, app shell, cronómetro, métricas, bloqueo secuencial, retroalimentación, recarga segura del progreso y resultado final descargable.

El contenido ya está completo: 128 reactivos, 10 áreas y Física integrada del 105 al 116.

## Decisiones tomadas

- `exam-data.js` de producción solo se genera cuando existen 128 reactivos y todos los assets obligatorios.
- `visuals[]` es la fuente completa para apoyos visuales; `visual` se conserva como compatibilidad heredada.
- El reactivo 106 puede mostrar tabla horizontal e imagen en el mismo reactivo.
- Las instrucciones internas del TXT se filtran y no forman parte de `exam-data.js`.
- Las píldoras visuales se derivan del TXT.
- En Español, las píldoras visuales conservan el bloque azul de lectura, pero los resaltados y subrayados solo se renderizan cuando el planteamiento los menciona de forma explícita.
- Las tablas marcadas se convierten en tablas renderizables con desplazamiento horizontal.
- Los planteamientos y argumentos de áreas numéricas deben mostrarse con notación escolar limpia, sin sintaxis tipo LaTeX o Markdown visible para el alumno.
- En reactivos con apoyo visual, el texto base visible debe funcionar como instrucción u objetivo; las descripciones largas de la imagen se reservan para el apoyo visual o el texto alternativo.
- Cuando las opciones ya están representadas en la imagen, el texto visible de las opciones puede compactarse como «Opción visual A-E».
- Los textos alternativos de imágenes deben ser útiles para el alumno y no conservar frases internas de generación.
- El progreso del intento se guarda en `localStorage` con una llave exclusiva de simulación 2 y una firma del contenido completo; al recargar, la app muestra una modal para continuar sin reiniciar o borrar el intento.
- La modal de recarga usa el tono IFR, botones con emojis y conserva el cronómetro con una fecha límite real, incluso si el navegador pausa temporizadores.
- El nombre de descarga queda como `resultado-ecoems-ifr-simulacion-2.png`.
- La descarga de resultados usa una vista previa multiplataforma para iOS, Android y Windows, con compartir/guardar cuando el navegador lo permite, descarga directa desde el modal y apertura de imagen.
- La generación del PNG tiene timeout para fuentes y fallback `toDataURL()` si `canvas.toBlob()` no responde.

## Comandos

```powershell
node build-exam-data.js
node qa/run-exam-qa.js
node qa/run-result-download-browser-qa.js
python -m http.server 4173
```

## Última validación local

`node build-exam-data.js` generó `exam-data.js` con 128 reactivos y 10 áreas.

`node qa/run-exam-qa.js` validó datos, opciones, pistas, argumentos, assets, distribución de respuestas, ausencia de contenido interno en `exam-data.js`, ausencia de artefactos LaTeX/Markdown en textos visibles, textos base breves en reactivos con imagen revisados, textos alternativos sin frases de generación y presencia del flujo de persistencia de progreso.

También valida que Español no conserve resaltados o subrayados dentro de los bloques azules salvo en los reactivos 32, 33, 34 y 37, donde el planteamiento pide explícitamente leer una expresión subrayada o palabras resaltadas.

`node qa/run-result-download-browser-qa.js` abrió Chrome o Edge por DevTools y validó la vista previa del resultado en perfiles Windows, Android e iPhone: imagen `blob:`, botones de compartir, descargar y abrir imagen, nombre del PNG y ausencia de desplazamiento horizontal.

Validación en navegador local:

- Portada con título `Examen simulación 2 ECOEMS`.
- Conteo inicial: 128 reactivos y 10 áreas.
- Física aparece como presente con 12 reactivos disponibles.
- No aparece el panel de advertencia sobre refrescar página.
- Inicio de examen funcional.
- Recarga después de contestar reactivos muestra la modal `🔄 Hay un avance guardado`.
- Botón `🔄 Continuar sin reiniciar` restaura respuestas, reactivo activo, métricas y cronómetro.
- Botón `🧹 Reiniciar desde cero` borra el intento guardado y vuelve a portada limpia.
- Storage corrupto se descarta sin romper la app.
- Cronómetro probado con pestaña bloqueada: cierra por tiempo al reconciliar contra la fecha límite real.
- Descarga de resultado probada en modo escritorio Windows: modal `🖥️ Guarda tu resultado en Windows`, imagen `blob:` visible, descarga desde el modal y apertura de imagen.
- Descarga de resultado probada con perfiles móviles iPhone y Android: modal de plataforma, imagen `blob:` visible, botones disponibles según navegador y sin overflow móvil.
- Reactivos 3 y 4 con tablas visuales en lugar de tablas Markdown crudas.
- Reactivo 5 carga imagen real en móvil y muestra una instrucción breve, sin el bloque descriptivo de figuras.
- Reactivos con imagen revisados mantienen objetivo de trabajo visible y assets reales; los reactivos 75 y 76 ya incluyen apoyos visuales neutrales.

## Siguiente hito

Confirmar que Vercel refleje el último push y revisar la URL pública.
