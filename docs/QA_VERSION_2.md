# QA de la versión 2

## Estado

Fecha de revisión: 7 de mayo de 2026.

Estado general: listo solo para revisión técnica interna. No listo para Vercel.

## Pruebas ejecutadas

### Build de datos

Comando:

```powershell
node build-exam-data.js
```

Resultado: falló de forma controlada.

Hallazgos:

- 116 reactivos detectados.
- 9 áreas detectadas.
- Física 105-116 faltante.
- 11 assets obligatorios faltantes.
- No se generó `exam-data.js` de producción.

### QA automatizada de puerta editorial

Comando:

```powershell
node qa/run-exam-qa.js
```

Resultado esperado mientras falte Física: confirmar que el build queda bloqueado por el motivo correcto.

Resultado ejecutado: pasó como puerta editorial. El script confirmó que el build de producción quedó bloqueado correctamente por Física faltante y que el estado solo sirve para revisión técnica interna.

## Pruebas pendientes

Estas pruebas se ejecutarán cuando exista `exam-data.js` completo:

- Carga inicial en navegador.
- Portada con escudo IFR.
- Título `Examen simulación 2 ECOEMS`.
- Cronómetro en `03:00:00`.
- Inicio del examen.
- Bloqueo secuencial.
- Respuesta correcta e incorrecta.
- Métricas en vivo.
- Píldoras visuales en Español y Habilidad verbal.
- Tablas con desplazamiento horizontal en móvil.
- Imágenes cargadas con tamaño real.
- Cierre natural.
- Cierre por tiempo.
- Descarga PNG válida.
- Revisión de escritorio, tableta y móvil.

## Estado de publicación

No listo.

Motivo: falta Física 105-116 y faltan assets visuales obligatorios.
