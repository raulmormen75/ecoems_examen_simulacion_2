# QA de la versión 2

## Estado

Fecha de revisión: 8 de mayo de 2026.

Estado general: completo en local y listo para revisión de despliegue.

## Pruebas ejecutadas

### Build de datos

Comando:

```powershell
node build-exam-data.js
```

Resultado: pasó.

Hallazgos:

- 128 reactivos detectados.
- 10 áreas detectadas.
- Física 105-116 presente.
- Sin reactivos faltantes.
- Sin assets faltantes.
- Distribución final: a) 26, b) 26, c) 26, d) 25, e) 25.

### QA automatizada

Comando:

```powershell
node qa/run-exam-qa.js
```

Resultado: pasó.

Validó:

- Total de 128 reactivos.
- 10 áreas con rangos correctos.
- Cinco opciones por reactivo.
- Pistas obligatorias.
- Argumento correcto por reactivo.
- Argumentos de opciones incorrectas.
- Assets existentes.
- Tablas con desplazamiento horizontal.
- Ausencia de artefactos visibles tipo LaTeX o Markdown en planteamientos, opciones, pistas, argumentos y celdas de tablas.
- Textos base breves en reactivos con imagen revisados: 5, 6, 7, 8, 9, 10, 44, 73, 74, 94, 106, 108 y 112.
- Opciones visuales compactas en reactivos 5, 7 y 8.
- Textos alternativos de imágenes sin frases de generación ni instrucciones internas.
- Flujo de persistencia de progreso: llave exclusiva, firma completa del contenido, fecha límite real del cronómetro, modal de recarga, botones con emojis, guardado en `pagehide` y `visibilitychange`.
- Descarga del resultado: vista previa guardable para iOS, Android y Windows, Web Share API opcional, descarga desde modal, apertura de imagen y fallback de canvas.
- Control de marcas visuales en Español: sin resaltados ni subrayados cuando el planteamiento no los pide explícitamente; marcas conservadas solo en 32, 33, 34 y 37.
- Distribución de respuestas dentro de rango.
- Sin tres respuestas iguales consecutivas.
- Sin instrucciones internas en `exam-data.js`.

### Revisión en navegador local

Servidor:

```powershell
python -m http.server 4173
```

URL revisada:

```text
http://127.0.0.1:4173/
```

Resultado: pasó.

Validado:

- Título visible `Examen simulación 2 ECOEMS`.
- Escudo IFR visible.
- Cronómetro inicial `03:00:00`.
- Conteo inicial: 128 reactivos, 10 áreas, 3 h, 5 opciones.
- Física aparece con `Reactivos 105 a 116` y 12 reactivos disponibles.
- Los paneles iniciales conservan los emojis de la simulación 1: `📝`, `⏱️`, `📊` y `📚`.
- El panel de advertencia sobre refrescar página ya no aparece.
- Botón `Iniciar examen` funciona.
- Reactivo 1 se muestra como reactivo activo.
- Reactivos 3 y 4 muestran tablas visuales, no pipes Markdown en el planteamiento.
- Reactivos numéricos representativos muestran operaciones limpias sin `\(`, `\[`, `\frac`, `\text{}` ni comandos similares.
- Reactivo 5 carga imagen real en vista móvil y ya no muestra el bloque descriptivo de «Figura 1» a «Figura 4».
- Reactivos 5, 7 y 8 muestran opciones visuales compactas A-E, no matrices o descripciones largas duplicadas.
- Reactivos con imagen representativos muestran una instrucción breve u objetivo de resolución, no una descripción redundante de la imagen.
- Después de contestar reactivos y refrescar, aparece la modal `🔄 Hay un avance guardado`.
- `🔄 Continuar sin reiniciar` conserva respuestas, reactivo activo, métricas y cronómetro.
- `🧹 Reiniciar desde cero` borra el intento guardado y restaura portada, contador en cero y cronómetro `03:00:00`.
- En móvil, la modal no genera desplazamiento horizontal y los botones se ajustan al ancho disponible.
- Storage corrupto o inválido se descarta sin romper la aplicación.
- El cronómetro cierra por tiempo aunque el hilo del navegador quede bloqueado más tiempo que el restante.
- En modo escritorio Windows, la descarga muestra la modal `🖥️ Guarda tu resultado en Windows`, incluye imagen `blob:`, botón `💾 Descargar imagen` y apertura de imagen.
- Con perfiles móviles iPhone y Android, la descarga muestra modal específica de plataforma, imagen `blob:`, botones disponibles según soporte del navegador y sin desplazamiento horizontal.

### QA automatizada de navegador para descarga

Comando:

```powershell
node qa/run-result-download-browser-qa.js
```

Resultado: pasó.

Validó:

- Perfil Windows Chrome: modal `🖥️ Guarda tu resultado en Windows`, imagen `blob:`, compartir simulado, apertura de imagen y descarga `resultado-ecoems-ifr-simulacion-2.png`.
- Perfil Android Chrome: modal `📲 Guarda tu resultado en Android`, imagen `blob:`, compartir simulado, apertura de imagen, descarga y ausencia de desplazamiento horizontal.
- Perfil iPhone Safari: modal `📲 Guarda tu resultado en iPhone`, imagen `blob:`, compartir simulado, apertura de imagen, descarga y ausencia de desplazamiento horizontal.
- El botón `💾 Descargar imagen` usa el nombre correcto del PNG.
- El botón `🖼️ Abrir imagen` abre una URL `blob:`.

## Evidencia

- Captura local generada por Playwright MCP: `docs/qa/ecoems-simulacion-2-mobile-reactivo-5.png`.
- Captura móvil del reactivo 40 sin resaltado ni subrayado indebido: `docs/qa/ecoems-simulacion-2-mobile-espanol-marcas.png`.
- Captura móvil del reactivo 74 con diagrama generado por `imagegen`: `docs/qa/ecoems-simulacion-2-mobile-reactivo-74-imagegen.png`.

## Estado de publicación

Listo para revisión de despliegue después de commit y push.

Pendiente externo:

- Confirmar que Vercel haya tomado el último commit y que la URL pública muestre 128 reactivos.
