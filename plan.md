# Plan de trabajo, Examen simulación 2 ECOEMS

## Dirección

Construir la segunda evaluación ECOEMS IFR como evolución técnica de la simulación 1. La experiencia debe conservar portada IFR, escudo, cronómetro de 3 horas, avance secuencial, métricas, retroalimentación inmediata, revisión final y descarga PNG.

## Hitos

1. Preparar base local desde simulación 1.
   - Copiar estructura técnica validada.
   - Cambiar textos visibles a simulación 2.
   - Mantener identidad IFR y fuente Plus Jakarta Sans.

2. Normalizar contenido V2.
   - Leer `Examen simulación 2.txt`.
   - Filtrar tablas de control, observaciones e instrucciones internas.
   - Extraer reactivos, píldoras, tablas, imágenes, pistas y argumentos.

3. Bloquear producción incompleta.
   - Detener build si faltan Física 105-116.
   - Detener build si faltan assets obligatorios.
   - No generar `exam-data.js` de producción con 116 reactivos.
   - Permitir `exam-data.js` parcial solo como revisión interna visible.

4. Preparar documentación.
   - Registrar estado real del contenido.
   - Documentar pendientes y requisitos de publicación.
   - Mantener referencia a la versión 1 como antecedente.

5. Cerrar en GitHub.
   - Inicializar o conectar Git local.
   - Configurar `origin` con el repo dedicado de simulación 2.
   - Hacer commit y push a `main`.

## Criterios de aceptación actuales

- Base técnica V2 presente en local.
- Parser V2 ejecuta y falla de forma controlada por Física faltante.
- Build parcial permite revisar los 116 reactivos disponibles.
- QA editorial confirma el bloqueo esperado.
- Documentación declara estado no publicable.
- Cambios guardados en GitHub.

## Criterios para publicar después

- 128 reactivos completos.
- 10 áreas con rangos correctos.
- Assets obligatorios existentes y cargando.
- QA automatizada sin errores.
- Revisión manual en escritorio y móvil.
- PNG final válido.
