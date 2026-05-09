# Control de contenido de la versión 2

## Áreas y rangos

| Área | Rango esperado | Cantidad | Estado |
|---|---:|---:|---|
| Habilidad matemática | 1-16 | 16 | Presente |
| Biología | 17-28 | 12 | Presente |
| Español | 29-40 | 12 | Presente |
| Química | 41-52 | 12 | Presente |
| Historia | 53-64 | 12 | Presente |
| Matemáticas | 65-76 | 12 | Presente |
| Habilidad verbal | 77-92 | 16 | Presente |
| Geografía | 93-104 | 12 | Presente |
| Física | 105-116 | 12 | Presente |
| Formación cívica y ética | 117-128 | 12 | Presente |

## Conteo actual

- Reactivos detectados: 128.
- Reactivos faltantes: ninguno.
- Áreas detectadas: 10.
- Estado: completo para revisión final de publicación.

## Distribución de respuestas

| Letra | Cantidad | Reactivos |
|---|---:|---|
| a) | 26 | 4, 6, 11, 19, 23, 27, 32, 37, 42, 49, 55, 59, 62, 66, 72, 80, 85, 89, 94, 97, 101, 106, 111, 115, 120, 127 |
| b) | 26 | 2, 8, 13, 17, 22, 31, 35, 40, 45, 51, 54, 58, 64, 69, 75, 78, 83, 87, 96, 99, 104, 108, 113, 116, 118, 124 |
| c) | 26 | 5, 10, 15, 21, 26, 29, 34, 39, 44, 48, 56, 61, 65, 68, 71, 76, 81, 90, 93, 98, 103, 105, 109, 114, 122, 126 |
| d) | 25 | 1, 9, 14, 18, 24, 28, 33, 38, 41, 47, 52, 57, 63, 70, 74, 77, 84, 88, 92, 95, 102, 110, 119, 123, 128 |
| e) | 25 | 3, 7, 12, 16, 20, 25, 30, 36, 43, 46, 50, 53, 60, 67, 73, 79, 82, 86, 91, 100, 107, 112, 117, 121, 125 |

No se detectaron tres respuestas iguales consecutivas.

## Reactivos con imagen

- 5: `assets/habilidad-matematica/reactivo-05-serie-cuadricula.png`
- 6: `assets/habilidad-matematica/reactivo-06-cruces-mosaicos.png`
- 7: `assets/habilidad-matematica/reactivo-07-rotacion-90.png`
- 8: `assets/habilidad-matematica/reactivo-08-rotacion-180.png`
- 9: `assets/habilidad-matematica/reactivo-09-cuadricula-3x3.png`
- 10: `assets/habilidad-matematica/reactivo-10-triangulos.png`
- 19: `assets/biologia/reactivo-19-fotosintesis-almidon.png`
- 44: `assets/quimica/reactivo-44-modelos-particulas.png`
- 73: `assets/matematicas/reactivo-73-grafica-consumo-agua.png`
- 74: `assets/matematicas/reactivo-74-angulos-alternos-internos.png`
- 94: `assets/geografia/reactivo-94-coordenadas-p.png`
- 106: `assets/fisica/reactivo-106-grafica-posicion-tiempo.png`
- 108: `assets/fisica/reactivo-108-equilibrio-fuerzas.png`
- 112: `assets/fisica/reactivo-112-brujula.png`
- 113: `assets/fisica/reactivo-113-corriente-brujula.png`
- 115: `assets/fisica/reactivo-115-onda-cuerda.png`

## Reactivos con tabla horizontal

- 3.
- 4.
- 15.
- 72.
- 106.

## Reactivos con píldora visual

- Español: 29 al 40.
- Habilidad verbal: 77 al 92.

En Español, las píldoras conservan el bloque azul de lectura. Las marcas visuales se limitan a las consignas explícitas:

- 32: subrayado de «debido a que».
- 33: resaltado de «Primero», «después» y «finalmente».
- 34: subrayado de «sin embargo».
- 37: subrayado de «entregado», «revisadas», «corregidas» y «seleccionadas».

## Errores detectados y corregidos

- Física 105-116 ya fue integrada en el TXT.
- Se generaron los assets visuales obligatorios.
- Se agregó soporte para tabla e imagen simultáneas en el reactivo 106.
- Se eliminó de `exam-data.js` cualquier metadato interno de `$imagegen` o `GPT-Image 2`.
- Se quitó de la portada el panel de advertencia sobre refrescar página.
- Se limpió la notación matemática visible para que los argumentos y planteamientos no muestren sintaxis tipo LaTeX o Markdown.
- Los reactivos 3 y 4 pasaron de tablas crudas en el planteamiento a tablas visuales con desplazamiento horizontal.
- Se simplificó el texto visible de los reactivos con imagen 5, 6, 7, 8, 9, 10, 44, 73, 74, 94, 106, 108 y 112 para que presenten objetivo o instrucción, no descripciones redundantes de la figura.
- Las opciones visibles de los reactivos 5, 7 y 8 se compactaron como opciones visuales A-E para no duplicar la imagen.
- Los textos alternativos de imágenes se ajustaron para describir el apoyo visual al alumno, con más contexto accesible en 5, 7 y 8, y ya no conservar frases de generación.
- Se agregó recarga segura del intento: si existe progreso guardado, la app pregunta si se quiere continuar sin reiniciar o borrar el intento desde cero.
- El avance guardado conserva respuestas, reactivo activo, métricas y cronómetro; el tiempo se calcula contra una fecha límite real para evitar pausas por suspensión o pestaña inactiva.
- El intento guardado se invalida si cambia la firma del contenido estructurado del examen.
- Se mejoró la descarga del resultado PNG para iOS, Android y Windows: se muestra una vista previa guardable con opciones para compartir cuando el navegador lo permite, descargar la imagen o abrirla en otra pestaña.
- La URL `blob:` de la vista previa se conserva de forma diferida al cerrar la modal para evitar carreras mientras el navegador abre o descarga la imagen.
- La generación del PNG ya no depende indefinidamente de `document.fonts.ready` ni de `canvas.toBlob()`: ambos tienen una ruta de salida segura.
- En Español se retiraron resaltados y subrayados que adelantaban la respuesta en 29, 30, 31, 35, 36, 38, 39 y 40; en 32, 33, 34 y 37 se conserva solo la marca visual que el planteamiento pide explícitamente.
