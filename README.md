# Simulador ECOEMS IFR, Examen simulación 2

Aplicación web estática institucional IFR para una segunda evaluación tipo ECOEMS 2026. Reutiliza la base funcional, visual y pedagógica de la simulación 1, pero trabaja con contenido nuevo y controles editoriales más estrictos.

## Repositorios

- Repositorio de esta evaluación: https://github.com/raulmormen75/ecoems_examen_simulacion_2.git
- Repositorio base de la versión 1: https://github.com/raulmormen75/ecoems_examen_simulacion_1.git
- App publicada de la versión 1: https://ecoems-examen-simulacion-1.vercel.app/

## Estado actual

Estado: no listo para publicación.

El archivo `Examen simulación 2.txt` contiene 116 reactivos. Faltan los reactivos 105 al 116 del área Física. Por esta razón, `build-exam-data.js` bloquea la generación de `exam-data.js` de producción.

También faltan los assets visuales obligatorios indicados en el TXT. La carpeta `assets/` conserva la estructura de trabajo, pero no contiene todavía las imágenes finales.

## Comandos locales

```powershell
node build-exam-data.js
node qa/run-exam-qa.js
python -m http.server 4173
```

Abrir `http://127.0.0.1:4173/` solo cuando exista `exam-data.js` generado con los 128 reactivos.

## Requisitos para publicar

- Integrar Física, reactivos 105 al 116.
- Generar y validar todos los assets obligatorios.
- Ejecutar `node build-exam-data.js` sin errores.
- Ejecutar QA automatizada y revisión en navegador real.
- Confirmar que la descarga `resultado-ecoems-ifr-simulacion-2.png` funciona y no incluye controles internos.

## Documentación

- `docs/CONTEXTO_VERSION_1_A_VERSION_2.md`: antecedente técnico de la simulación 1.
- `docs/CONTEXTO_VERSION_2.md`: contexto propio de esta simulación.
- `docs/CONTROL_CONTENIDO_VERSION_2.md`: control editorial y técnico del contenido actual.
- `docs/QA_VERSION_2.md`: estado de pruebas y pendientes.
