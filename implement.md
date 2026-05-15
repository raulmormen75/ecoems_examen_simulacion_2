# Implementación operativa

## Secuencia

1. Trabajar siempre en `D:\Mi unidad\IFR\ECOEMS\Examen simulación 2`.
2. Usar como referencia técnica la simulación 1, pero publicar únicamente en:
   `https://github.com/raulmormen75/ecoems_examen_simulacion_2.git`.
3. No editar contenido académico para inventar reactivos.
4. Ejecutar `node build-exam-data.js` después de cambios de parser o contenido.
5. Ejecutar `node qa/run-exam-qa.js` antes de commit.
6. Ejecutar `node qa/run-result-download-browser-qa.js` cuando cambie la descarga del resultado.
7. Servir con `python -m http.server 4173` y probar en navegador real.
8. En reactivos con imagen, mantener texto visible breve y orientado a la tarea; evitar descripciones largas que repitan la figura.
9. En reactivos cuyas opciones ya están dibujadas en la imagen, usar opciones visibles compactas A-E.
10. En Español y Habilidad verbal, conservar los bloques azules de lectura, pero quitar resaltados y subrayados cuando el planteamiento no los pida explícitamente.
11. Conservar la recarga segura: si existe progreso guardado, mostrar una modal para continuar sin reiniciar o borrar el intento.
12. Hacer commit y push al terminar cada entrega solicitada.

## Qué no debe alterarse

- Cronómetro de 10,800 segundos.
- Avance secuencial.
- Bloqueo de reactivos futuros.
- Cinco opciones por reactivo.
- Pista obligatoria.
- Retroalimentación diferenciada para respuesta correcta e incorrecta.
- Resultado final con reporte HTML imprimible y guardado como PDF de reactivos incorrectos.
- Persistencia de progreso con decisión explícita al recargar.
- Ruta multiplataforma para abrir el reporte imprimible y guardar el PDF final en iOS, Android y Windows.
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
7. Confirmar que los reactivos con imagen revisados usan instrucción u objetivo visible, no descripción redundante.
8. Confirmar que las opciones visuales compactas no dupliquen matrices o descripciones largas.
9. Confirmar que los textos alternativos de imagen no conserven frases de generación.
10. Confirmar que Español y Habilidad verbal no muestren marcas visuales que revelen la respuesta, salvo en consignas explícitas sobre texto resaltado o subrayado.
11. Confirmar que la recarga restaura avance, respuestas, reactivo activo y cronómetro.
12. Confirmar que el cronómetro se calcula contra una fecha límite real, no solo contra `setInterval`.
13. Confirmar que `🧹 Reiniciar desde cero` borra el storage y vuelve a estado inicial.
14. Confirmar que el resultado genera un reporte HTML imprimible de reactivos incorrectos en iOS, Android y Windows, con diseño IFR, Plus Jakarta Sans, márgenes legibles y cortes de página controlados para guardar como PDF.
15. Commit y push.
