# Implementación operativa

## Secuencia

1. Trabajar siempre en `D:\Mi unidad\IFR\ECOEMS\Examen simulación 2`.
2. Usar como referencia técnica la simulación 1, pero publicar únicamente en:
   `https://github.com/raulmormen75/ecoems_examen_simulacion_2.git`.
3. No editar contenido académico para inventar reactivos.
4. Ejecutar `node build-exam-data.js` después de cambios de parser o contenido.
5. Ejecutar `node qa/run-exam-qa.js` antes de commit.
6. Servir con `python -m http.server 4173` y probar en navegador real.
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

El build de producción debe pasar porque el TXT ya contiene los 128 reactivos y los assets obligatorios existen.

Comando principal:

```powershell
node build-exam-data.js
```

Resultado esperado:

```text
Generado exam-data.js con 128 reactivos y 10 áreas.
```

## Validación requerida

1. Confirmar que `exam-data.js` no contiene instrucciones internas, `$imagegen`, `GPT-Image 2` ni tablas de control.
2. Confirmar que no quedan artefactos visibles tipo LaTeX o Markdown en planteamientos, opciones, pistas, argumentos ni tablas.
3. Confirmar que Física tiene 12 reactivos disponibles.
4. Confirmar que los reactivos con imagen cargan assets reales.
5. Confirmar que las tablas 3, 4, 15, 72 y 106 conservan desplazamiento horizontal.
6. Confirmar que Español y Habilidad verbal conservan píldoras visuales.
7. Commit y push.
