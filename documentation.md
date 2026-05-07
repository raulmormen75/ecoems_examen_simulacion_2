# Documentación de estado

## Estado general

La base técnica de la simulación 2 está preparada en local a partir de la simulación 1. El proyecto conserva identidad IFR, estructura estática, app shell, cronómetro, métricas, bloqueo secuencial, retroalimentación y resultado final descargable.

La aplicación todavía no es publicable porque falta el paquete de Física, reactivos 105 al 116, y faltan assets visuales nuevos.

## Decisiones tomadas

- No se genera `exam-data.js` de producción mientras el examen tenga 116 reactivos.
- Las instrucciones internas del TXT se filtran y no forman parte del contenido visible.
- Las píldoras visuales se derivan del TXT y no de mapas hardcodeados de la simulación 1.
- Las tablas marcadas se convierten en tablas renderizables con desplazamiento horizontal.
- Las imágenes de la simulación 1 no se reutilizan como contenido final.
- El nombre de descarga queda como `resultado-ecoems-ifr-simulacion-2.png`.

## Comandos

```powershell
node build-exam-data.js
node qa/run-exam-qa.js
python -m http.server 4173
```

## Última validación local

Fecha: 7 de mayo de 2026.

`node build-exam-data.js` leyó el TXT, imprimió distribución de respuestas y bloqueó producción por:

- Física faltante 105-116.
- Total detectado de 116 reactivos.
- 9 áreas detectadas.
- 11 assets visuales pendientes.

## Siguiente hito

Integrar Física 105-116, generar assets y ejecutar QA completa con navegador real.
