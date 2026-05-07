# Control de contenido de la versión 2

## Áreas y rangos

| Área | Rango esperado | Estado |
|---|---:|---|
| Habilidad matemática | 1-16 | Presente |
| Biología | 17-28 | Presente |
| Español | 29-40 | Presente |
| Química | 41-52 | Presente |
| Historia | 53-64 | Presente |
| Matemáticas | 65-76 | Presente |
| Habilidad verbal | 77-92 | Presente |
| Geografía | 93-104 | Presente |
| Física | 105-116 | Faltante |
| Formación cívica y ética | 117-128 | Presente |

## Conteo actual

- Reactivos detectados: 116.
- Reactivos faltantes: 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115 y 116.
- Áreas detectadas: 9.
- Estado: no publicable.

## Distribución de respuestas actual, sin Física

| Letra | Cantidad |
|---|---:|
| a) | 23 |
| b) | 23 |
| c) | 23 |
| d) | 24 |
| e) | 23 |

No se detectaron tres respuestas iguales consecutivas en el contenido actual.

## Reactivos con imagen pendiente

- 5: `assets/habilidad-matematica/reactivo-05-serie-cuadricula.png`
- 6: `assets/habilidad-matematica/reactivo-06-cruces-mosaicos.png`
- 7: `assets/habilidad-matematica/reactivo-07-rotacion-90.png`
- 8: `assets/habilidad-matematica/reactivo-08-rotacion-180.png`
- 9: `assets/habilidad-matematica/reactivo-09-cuadricula-3x3.png`
- 10: `assets/habilidad-matematica/reactivo-10-triangulos.png`
- 19: `assets/biologia/reactivo-19-fotosintesis-almidon.png`
- 44: `assets/quimica/reactivo-44-modelos-particulas.png`
- 73: `assets/matematicas/reactivo-73-grafica-consumo-agua.png`
- 74: `assets/matematicas/reactivo-74-angulos-alternos-internos.png`
- 94: `assets/geografia/reactivo-94-coordenadas-p.png`

## Reactivos con tabla horizontal

- 15.
- 72.

## Reactivos con píldora visual

- Español: 29 al 40.
- Habilidad verbal: 77 al 92.

## Errores detectados

- Falta Física 105-116.
- Falta generar o incorporar assets visuales V2.
- No existe `exam-data.js` de producción porque el build fue detenido correctamente.

## Correcciones aplicadas

- Se adaptó el parser para no mostrar instrucciones internas.
- Se separó el contenido visible de las instrucciones operativas.
- Se reemplazó el render hardcodeado de cápsulas por datos derivados del TXT.
- Se agregó render de tablas con desplazamiento horizontal.
- Se limpió la carpeta `assets/` para no conservar visuales reciclados de la simulación 1.
