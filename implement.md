# Implementación operativa

## Secuencia

1. Trabajar siempre en `D:\Mi unidad\IFR\ECOEMS\Examen simulación 2`.
2. Usar como referencia técnica la simulación 1, pero publicar únicamente en:
   `https://github.com/raulmormen75/ecoems_examen_simulacion_2.git`.
3. No editar el contenido académico para inventar Física ni completar assets.
4. Ejecutar `node build-exam-data.js` después de cambios de parser o contenido.
5. Ejecutar `node build-exam-data.js --partial` cuando se necesite publicar una revisión interna con los reactivos disponibles.
6. Ejecutar `node qa/run-exam-qa.js` antes de commit.
7. Hacer commit y push al terminar cada entrega solicitada.

## Qué no debe alterarse

- Cronómetro de 10,800 segundos.
- Avance secuencial.
- Bloqueo de reactivos futuros.
- Cinco opciones por reactivo.
- Pista obligatoria.
- Retroalimentación diferenciada para respuesta correcta e incorrecta.
- Resultado final y descarga PNG.
- Identidad IFR, escudo institucional y Plus Jakarta Sans.

## Estado actual esperado

El build debe fallar mientras falte Física 105-116. Ese fallo es una protección de producción, no un error accidental.

Mensaje principal esperado:

```text
ERROR: Faltan reactivos 105 al 116 del área Física. El examen simulación 2 requiere 128 reactivos. No se generó build de producción.
```

Para revisión interna, `node build-exam-data.js --partial` genera `exam-data.js` con los 116 reactivos disponibles y placeholders de assets pendientes.

## Validación posterior a Física

Cuando se agregue Física:

1. Confirmar que el TXT contiene reactivos 105 al 116.
2. Generar o asociar assets nuevos si Física los requiere.
3. Ejecutar `node build-exam-data.js`.
4. Ejecutar `node qa/run-exam-qa.js`.
5. Servir con `python -m http.server 4173`.
6. Probar la app en navegador real, escritorio y móvil.
7. Commit y push.
