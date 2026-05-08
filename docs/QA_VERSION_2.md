# QA de la versión 2

## Estado

Fecha de revisión: 8 de mayo de 2026.

Estado general: completo en local y listo para revisión de despliegue.

## Pruebas ejecutadas

### Build de datos

Comando:

```powershell
node build-exam-data.js
```

Resultado: pasó.

Hallazgos:

- 128 reactivos detectados.
- 10 áreas detectadas.
- Física 105-116 presente.
- Sin reactivos faltantes.
- Sin assets faltantes.
- Distribución final: a) 26, b) 26, c) 26, d) 25, e) 25.

### QA automatizada

Comando:

```powershell
node qa/run-exam-qa.js
```

Resultado: pasó.

Validó:

- Total de 128 reactivos.
- 10 áreas con rangos correctos.
- Cinco opciones por reactivo.
- Pistas obligatorias.
- Argumento correcto por reactivo.
- Argumentos de opciones incorrectas.
- Assets existentes.
- Tablas con desplazamiento horizontal.
- Distribución de respuestas dentro de rango.
- Sin tres respuestas iguales consecutivas.
- Sin instrucciones internas en `exam-data.js`.

### Revisión en navegador local

Servidor:

```powershell
python -m http.server 4173
```

URL revisada:

```text
http://127.0.0.1:4173/
```

Resultado: pasó.

Validado:

- Título visible `Examen simulación 2 ECOEMS`.
- Escudo IFR visible.
- Cronómetro inicial `03:00:00`.
- Conteo inicial: 128 reactivos, 10 áreas, 3 h, 5 opciones.
- Física aparece con `Reactivos 105 a 116` y 12 reactivos disponibles.
- Los paneles iniciales conservan los emojis de la simulación 1: `📝`, `⏱️`, `📊` y `📚`.
- El panel de advertencia sobre refrescar página ya no aparece.
- Botón `Iniciar examen` funciona.
- Reactivo 1 se muestra como reactivo activo.
- Reactivo 5 carga imagen real en vista móvil.

## Evidencia

- Captura local generada por Playwright MCP: `docs/qa/ecoems-simulacion-2-mobile-reactivo-5.png`.

## Estado de publicación

Listo para revisión de despliegue después de commit y push.

Pendiente externo:

- Confirmar que Vercel haya tomado el último commit y que la URL pública muestre 128 reactivos.
