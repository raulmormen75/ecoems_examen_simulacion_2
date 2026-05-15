# Plan de trabajo, Examen simulación 2 ECOEMS

## Dirección

Construir la segunda evaluación ECOEMS IFR como evolución técnica de la simulación 1. La experiencia conserva portada IFR, escudo, cronómetro de 3 horas, avance secuencial, métricas, retroalimentación inmediata, revisión final y reporte imprimible de reactivos incorrectos para guardar como PDF.

## Hitos ejecutados

1. Preparar base local desde simulación 1.
   - Estructura técnica validada.
   - Textos visibles actualizados a simulación 2.
   - Identidad IFR y fuente Plus Jakarta Sans conservadas.

2. Normalizar contenido V2.
   - Lectura de `Examen simulación 2.txt`.
   - Filtro de tablas de control, observaciones e instrucciones internas.
   - Extracción de reactivos, píldoras, tablas, imágenes, pistas y argumentos.

3. Completar producción.
   - Física 105-116 integrada.
   - `exam-data.js` generado con 128 reactivos.
   - Assets obligatorios generados y validados.
   - Reactivo 106 compatible con tabla e imagen.

4. Preparar documentación.
   - Estado real del contenido actualizado.
   - Distribución de respuestas documentada.
   - Assets, tablas y píldoras registrados.

5. Ejecutar primera edición gráfica y visual.
   - Notación matemática visible limpiada en áreas numéricas.
   - Reactivos 3 y 4 convertidos a tablas visuales.
   - QA reforzada contra artefactos LaTeX o Markdown visibles.

6. Ejecutar depuración de texto en reactivos con imagen.
   - Reactivo 5 sin bloque descriptivo redundante de figuras.
   - Reactivos con imagen revisados para mostrar instrucción u objetivo visible.
   - Opciones visuales de los reactivos 5, 7 y 8 compactadas para no duplicar la imagen.
   - Textos alternativos de imágenes ajustados para no conservar frases de generación.

7. Implementar recarga segura del intento.
   - Progreso guardado en `localStorage` con llave exclusiva de simulación 2.
   - Modal `🔄 Hay un avance guardado` al refrescar si existe intento previo.
   - Botones `🔄 Continuar sin reiniciar` y `🧹 Reiniciar desde cero`.
   - Cronómetro controlado por fecha límite real para evitar pausas por pestaña suspendida.
   - Firma del contenido completo para evitar restaurar intentos incompatibles.
   - Storage inválido descartado sin romper la app.

8. Sustituir la descarga de resultado por reporte PDF de mejora.
   - Botón final `Obtener reactivos que debo mejorar`.
   - Reporte HTML con solo reactivos incorrectos, respuesta elegida, respuesta correcta y argumentos.
   - Diseño IFR con Plus Jakarta Sans, escudo institucional, banda azul y CSS de impresión.
   - Márgenes carta y paginación controlada para evitar cortes ilegibles.
   - QA de navegador reproducible para Windows Chrome, Android Chrome, iPhone Safari e iPhone Chrome.

9. Depurar marcas visuales en Español y Habilidad verbal.
   - Bloques azules de lectura conservados.
   - Resaltados y subrayados retirados cuando no son parte explícita de la consigna.
   - Parser y QA reforzados para impedir que esas marcas vuelvan a revelar respuestas.

10. Cerrar en GitHub.
   - Commit y push a `main` después de QA.

## Criterios de aceptación actuales

- 128 reactivos completos.
- 10 áreas con rangos correctos.
- Física presente del 105 al 116.
- Assets obligatorios existentes.
- QA automatizada sin errores.
- Sin artefactos tipo LaTeX o Markdown en contenido visible para el alumno.
- Reactivos con imagen revisados sin descripciones redundantes en el texto base visible.
- Opciones visuales compactas cuando la imagen ya muestra las alternativas.
- Textos alternativos de imágenes sin instrucciones de generación.
- Revisión local en navegador realizada.
- Recarga segura validada en escritorio y móvil.
- Reporte imprimible validado con PDF real en Windows Chrome y sin overflow en perfiles Android e iPhone.
- Español y Habilidad verbal sin marcas visuales que adelanten respuestas fuera de consignas explícitas.
- Documentación actualizada.

## Criterios de publicación

- Confirmar que Vercel haya tomado el último commit.
- Revisar la URL pública después del despliegue.
- Probar portada, inicio, imagen real, conteo 128/10 y recarga segura en producción.
