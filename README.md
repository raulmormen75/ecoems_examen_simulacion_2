# Simulador ECOEMS IFR, Examen simulación 2

Aplicación web estática institucional IFR para una segunda evaluación tipo ECOEMS 2026. Reutiliza la base funcional, visual y pedagógica de la simulación 1, pero trabaja con contenido nuevo, Física integrada y controles editoriales más estrictos.

## Repositorios

- Repositorio de esta evaluación: https://github.com/raulmormen75/ecoems_examen_simulacion_2.git
- Repositorio base de la versión 1: https://github.com/raulmormen75/ecoems_examen_simulacion_1.git
- App publicada de la versión 1: https://ecoems-examen-simulacion-1.vercel.app/

## Estado actual

Estado: completo en local y listo para revisión final de publicación.

El archivo `Examen simulación 2.txt` contiene 128 reactivos distribuidos en 10 áreas, incluida Física del 105 al 116. `build-exam-data.js` genera `exam-data.js` de producción sin faltantes de números ni assets.

También se generaron los assets visuales obligatorios en `assets/` y se validó que las instrucciones internas del TXT no queden en `exam-data.js`.

La aplicación conserva el progreso del intento si se refresca la página. Al volver a cargar, muestra una notificación con dos opciones: continuar sin reiniciar o borrar el intento para empezar desde cero.

La descarga del resultado PNG mantiene descarga directa en escritorio y agrega una ruta compatible con iPhone: vista previa guardable, apertura de imagen y uso de compartir cuando el navegador lo permite.

## Comandos locales

```powershell
node build-exam-data.js
node qa/run-exam-qa.js
python -m http.server 4173
```

Abrir `http://127.0.0.1:4173/` para revisar la aplicación.

## Contenido

- Reactivos totales: 128.
- Áreas temáticas: 10.
- Duración: 10,800 segundos.
- Opciones por reactivo: 5.
- Pistas: obligatorias en todos los reactivos.
- Resultado final: descargable como `resultado-ecoems-ifr-simulacion-2.png`.
- Recarga segura: progreso persistente con decisión explícita.
- Compatibilidad iOS: alternativa para guardar el resultado desde Safari o Chrome en iPhone.

## Requisitos para publicar

- Ejecutar `node build-exam-data.js` sin errores.
- Ejecutar `node qa/run-exam-qa.js` sin errores.
- Revisar portada, inicio del examen, reactivos con imagen y responsividad en navegador real.
- Confirmar que Vercel sirve la versión más reciente después del push.

## Documentación

- `docs/CONTEXTO_VERSION_1_A_VERSION_2.md`: antecedente técnico de la simulación 1.
- `docs/CONTEXTO_VERSION_2.md`: contexto propio de esta simulación.
- `docs/CONTROL_CONTENIDO_VERSION_2.md`: control editorial y técnico del contenido completo.
- `docs/QA_VERSION_2.md`: estado de pruebas y validaciones.
