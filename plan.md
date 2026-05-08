# Plan de trabajo, Examen simulación 2 ECOEMS

## Dirección

Construir la segunda evaluación ECOEMS IFR como evolución técnica de la simulación 1. La experiencia conserva portada IFR, escudo, cronómetro de 3 horas, avance secuencial, métricas, retroalimentación inmediata, revisión final y descarga PNG.

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

5. Cerrar en GitHub.
   - Commit y push a `main` después de QA.

## Criterios de aceptación actuales

- 128 reactivos completos.
- 10 áreas con rangos correctos.
- Física presente del 105 al 116.
- Assets obligatorios existentes.
- QA automatizada sin errores.
- Revisión local en navegador realizada.
- Documentación actualizada.

## Criterios de publicación

- Confirmar que Vercel haya tomado el último commit.
- Revisar la URL pública después del despliegue.
- Probar portada, inicio, imagen real y conteo 128/10 en producción.
