window.IFR_APP_DATA = {
  "meta": {
    "version": "2",
    "title": "Examen simulación 2 ECOEMS",
    "institution": "Instituto Fernando Ramírez",
    "durationSeconds": 10800,
    "totalExercises": 128,
    "expectedTotalExercises": 128,
    "scoreMode": "raw-and-percent",
    "contentStatus": {
      "partial": false,
      "label": "Completo",
      "message": "Contenido completo validado.",
      "missingNumbers": [],
      "missingAssets": []
    }
  },
  "areas": [
    {
      "id": "habilidad-matematica",
      "name": "Habilidad matemática",
      "rangeStart": 1,
      "rangeEnd": 16,
      "totalExercises": 16
    },
    {
      "id": "biologia",
      "name": "Biología",
      "rangeStart": 17,
      "rangeEnd": 28,
      "totalExercises": 12
    },
    {
      "id": "espanol",
      "name": "Español",
      "rangeStart": 29,
      "rangeEnd": 40,
      "totalExercises": 12
    },
    {
      "id": "quimica",
      "name": "Química",
      "rangeStart": 41,
      "rangeEnd": 52,
      "totalExercises": 12
    },
    {
      "id": "historia",
      "name": "Historia",
      "rangeStart": 53,
      "rangeEnd": 64,
      "totalExercises": 12
    },
    {
      "id": "matematicas",
      "name": "Matemáticas",
      "rangeStart": 65,
      "rangeEnd": 76,
      "totalExercises": 12
    },
    {
      "id": "habilidad-verbal",
      "name": "Habilidad verbal",
      "rangeStart": 77,
      "rangeEnd": 92,
      "totalExercises": 16
    },
    {
      "id": "geografia",
      "name": "Geografía",
      "rangeStart": 93,
      "rangeEnd": 104,
      "totalExercises": 12
    },
    {
      "id": "fisica",
      "name": "Física",
      "rangeStart": 105,
      "rangeEnd": 116,
      "totalExercises": 12
    },
    {
      "id": "formacion-civica-etica",
      "name": "Formación cívica y ética",
      "rangeStart": 117,
      "rangeEnd": 128,
      "totalExercises": 12
    }
  ],
  "exercises": [
    {
      "id": "reactivo-1",
      "number": 1,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Series con dos reglas que se turnan",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Qué números continúan en la siguiente sucesión?\n\n96, 24, 84, 27, 72, 30, __, __",
      "options": [
        {
          "label": "a",
          "text": "60, 30"
        },
        {
          "label": "b",
          "text": "72, 33"
        },
        {
          "label": "c",
          "text": "58, 33"
        },
        {
          "label": "d",
          "text": "60, 33"
        },
        {
          "label": "e",
          "text": "63, 36"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "60, 33",
      "hint": "Separa los términos que están en posiciones impares y los que están en posiciones pares.",
      "correctArgument": "La sucesión combina dos reglas. En las posiciones impares aparecen:\n96, 84, 72, __\n\nCada término disminuye 12:\n96 - 12 = 84\n84 - 12 = 72\n72 - 12 = 60\n\nEn las posiciones pares aparecen:\n24, 27, 30, __\n\nCada término aumenta 3:\n24 + 3 = 27\n27 + 3 = 30\n30 + 3 = 33\n\nPor eso los números que continúan son 60 y 33.",
      "incorrectArgumentsByOption": {
        "a": "60, 30: el 60 sí respeta la serie impar, pero 30 repite el término par anterior y no avanza a 33.",
        "b": "72, 33: el 33 sí respeta la serie par, pero 72 repite el término impar anterior.",
        "c": "58, 33: el 33 es correcto, pero 58 no resulta de restar 12 a 72.",
        "e": "63, 36: cambia ambas reglas, porque no sigue ni la disminución de 12 ni el aumento de 3."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 1,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-2",
      "number": 2,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Series por ciclos",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Qué números completan la siguiente cadena?\n\n5, 15, 12, 24, 21, 63, __, __",
      "options": [
        {
          "label": "a",
          "text": "60, 117"
        },
        {
          "label": "b",
          "text": "60, 120"
        },
        {
          "label": "c",
          "text": "66, 132"
        },
        {
          "label": "d",
          "text": "63, 126"
        },
        {
          "label": "e",
          "text": "57, 114"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "60, 120",
      "hint": "El patrón no usa una sola operación; observa el ciclo completo de movimientos.",
      "correctArgument": "La cadena sigue este ciclo de operaciones:\n\nMultiplicar por 3, restar 3, multiplicar por 2, restar 3.\n\nSe comprueba así:\n5 × 3 = 15\n15 - 3 = 12\n12 × 2 = 24\n24 - 3 = 21\n21 × 3 = 63\n\nAhora continúa:\n63 - 3 = 60\n60 × 2 = 120\n\nPor eso los números faltantes son 60 y 120.",
      "incorrectArgumentsByOption": {
        "a": "60, 117: el primer número sí es correcto, pero después de 60 corresponde multiplicar por 2.",
        "c": "66, 132: suma 3 después de 63, pero el ciclo indica restar 3.",
        "d": "63, 126: repite el 63 y no aplica la resta que corresponde.",
        "e": "57, 114: resta 6 en lugar de 3, por lo que rompe el ciclo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 2,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-3",
      "number": 3,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Tablas con números",
      "baseText": "La siguiente tabla muestra tres filas con números y un resultado.",
      "basePill": null,
      "prompt": "¿Qué valor falta en la tercera fila?",
      "options": [
        {
          "label": "a",
          "text": "70"
        },
        {
          "label": "b",
          "text": "72"
        },
        {
          "label": "c",
          "text": "73"
        },
        {
          "label": "d",
          "text": "76"
        },
        {
          "label": "e",
          "text": "74"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "74",
      "hint": "En cada fila, primero se multiplican los dos primeros números y luego se usa el tercer número.",
      "correctArgument": "La regla de cada fila es:\n\nResultado = (Número 1 × Número 2) + Número 3\n\nFila 1:\n4 × 7 + 3 = 28 + 3 = 31\n\nFila 2:\n6 × 5 + 4 = 30 + 4 = 34\n\nFila 3:\n8 × 9 + 2 = 72 + 2 = 74\n\nPor eso el número faltante es 74.",
      "incorrectArgumentsByOption": {
        "a": "70: queda por debajo del producto 8 × 9, por lo que no puede cumplir la regla.",
        "b": "72: solo considera 8 × 9, pero omite sumar el tercer número.",
        "c": "73: suma 1 en lugar de sumar 2.",
        "d": "76: suma 4, pero el tercer número de la fila es 2."
      },
      "visual": {
        "kind": "table",
        "position": "base",
        "hasHorizontalScroll": true,
        "caption": "La siguiente tabla muestra tres filas con números y un resultado.",
        "headers": [
          "Número 1",
          "Número 2",
          "Número 3",
          "Resultado"
        ],
        "rows": [
          [
            "4",
            "7",
            "3",
            "31"
          ],
          [
            "6",
            "5",
            "4",
            "34"
          ],
          [
            "8",
            "9",
            "2",
            "valor faltante"
          ]
        ]
      },
      "visuals": [
        {
          "kind": "table",
          "position": "base",
          "hasHorizontalScroll": true,
          "caption": "La siguiente tabla muestra tres filas con números y un resultado.",
          "headers": [
            "Número 1",
            "Número 2",
            "Número 3",
            "Resultado"
          ],
          "rows": [
            [
              "4",
              "7",
              "3",
              "31"
            ],
            [
              "6",
              "5",
              "4",
              "34"
            ],
            [
              "8",
              "9",
              "2",
              "valor faltante"
            ]
          ]
        }
      ],
      "sourceOrder": 3,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-4",
      "number": 4,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Tablas con números",
      "baseText": "El siguiente cuadro muestra dos números y el resultado de cada fila.",
      "basePill": null,
      "prompt": "¿Qué valor falta en la tercera fila?",
      "options": [
        {
          "label": "a",
          "text": "29"
        },
        {
          "label": "b",
          "text": "27"
        },
        {
          "label": "c",
          "text": "28"
        },
        {
          "label": "d",
          "text": "30"
        },
        {
          "label": "e",
          "text": "31"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "29",
      "hint": "Revisa si el resultado se obtiene duplicando uno de los números y luego sumando el otro.",
      "correctArgument": "La regla horizontal es:\n\nResultado = Primer número + 2(Segundo número)\n\nFila 1:\n2 + 2(6) = 2 + 12 = 14\n\nFila 2:\n3 + 2(8) = 3 + 16 = 19\n\nFila 3:\n5 + 2(12) = 5 + 24 = 29\n\nPor eso el número faltante es 29.",
      "incorrectArgumentsByOption": {
        "b": "27: no duplica correctamente el segundo número antes de sumar.",
        "c": "28: queda una unidad abajo del resultado de aplicar la regla.",
        "d": "30: se pasa por una unidad respecto del resultado correcto.",
        "e": "31: no respeta la relación de las dos primeras filas."
      },
      "visual": {
        "kind": "table",
        "position": "base",
        "hasHorizontalScroll": true,
        "caption": "El siguiente cuadro muestra dos números y el resultado de cada fila.",
        "headers": [
          "Primer número",
          "Segundo número",
          "Resultado"
        ],
        "rows": [
          [
            "2",
            "6",
            "14"
          ],
          [
            "3",
            "8",
            "19"
          ],
          [
            "5",
            "12",
            "valor faltante"
          ]
        ]
      },
      "visuals": [
        {
          "kind": "table",
          "position": "base",
          "hasHorizontalScroll": true,
          "caption": "El siguiente cuadro muestra dos números y el resultado de cada fila.",
          "headers": [
            "Primer número",
            "Segundo número",
            "Resultado"
          ],
          "rows": [
            [
              "2",
              "6",
              "14"
            ],
            [
              "3",
              "8",
              "19"
            ],
            [
              "5",
              "12",
              "valor faltante"
            ]
          ]
        }
      ],
      "sourceOrder": 4,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-5",
      "number": 5,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Figuras en secuencia",
      "baseText": "Observa la serie. Identifica el patrón de movimiento del punto y del triángulo.",
      "basePill": null,
      "prompt": "¿Cuál es la figura que continúa la serie?",
      "options": [
        {
          "label": "a",
          "text": "Opción visual A"
        },
        {
          "label": "b",
          "text": "Opción visual B"
        },
        {
          "label": "c",
          "text": "Opción visual C"
        },
        {
          "label": "d",
          "text": "Opción visual D"
        },
        {
          "label": "e",
          "text": "Opción visual E"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Opción visual C",
      "hint": "Observa dos cambios al mismo tiempo: el punto se mueve por el contorno y el triángulo alterna entre dos posiciones.",
      "correctArgument": "El punto negro se mueve una posición por el contorno de la cuadrícula en sentido horario:\nesquina superior izquierda, superior centro, esquina superior derecha, centro derecha, esquina inferior derecha.\n\nAl mismo tiempo, el triángulo alterna entre el centro y la casilla inferior central:\ncentro, inferior central, centro, inferior central, centro.\n\nPor eso la siguiente figura debe tener el punto negro en la esquina inferior derecha y el triángulo en el centro.",
      "incorrectArgumentsByOption": {
        "a": "El triángulo está en el centro, pero el punto negro queda en la esquina inferior izquierda y se salta una posición.",
        "b": "Repite la figura 4, por lo que no avanza la secuencia.",
        "d": "Repite la posición del punto de la figura 3 y no continúa el recorrido.",
        "e": "El punto negro está bien colocado, pero el triángulo debería regresar al centro."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/habilidad-matematica/reactivo-05-serie-cuadricula.png",
        "alt": "Habilidad matemática, reactivo 5: Serie visual en cuadrícula 3 × 3. Figuras de referencia: el punto avanza por el contorno en sentido horario y el triángulo alterna centro e inferior central. Opciones A-E muestran posibles continuaciones sin marcar la respuesta.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/habilidad-matematica/reactivo-05-serie-cuadricula.png",
          "alt": "Habilidad matemática, reactivo 5: Serie visual en cuadrícula 3 × 3. Figuras de referencia: el punto avanza por el contorno en sentido horario y el triángulo alterna centro e inferior central. Opciones A-E muestran posibles continuaciones sin marcar la respuesta.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 5,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-6",
      "number": 6,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Figuras en secuencia",
      "baseText": "Observa la serie de cruces. Identifica cómo aumenta la cantidad de mosaicos.",
      "basePill": null,
      "prompt": "Si la regla de crecimiento se mantiene, ¿cuántos mosaicos tendrá la figura 6?",
      "options": [
        {
          "label": "a",
          "text": "25"
        },
        {
          "label": "b",
          "text": "21"
        },
        {
          "label": "c",
          "text": "24"
        },
        {
          "label": "d",
          "text": "27"
        },
        {
          "label": "e",
          "text": "29"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "25",
      "hint": "Revisa cuántos mosaicos se agregan de una figura a la siguiente.",
      "correctArgument": "La cantidad de mosaicos sigue esta sucesión:\n\n5, 9, 13, 17, __, __\n\nCada figura aumenta 4 mosaicos:\n5 + 4 = 9\n9 + 4 = 13\n13 + 4 = 17\n\nEntonces:\n17 + 4 = 21\n21 + 4 = 25\n\nLa figura 6 tendrá 25 mosaicos.",
      "incorrectArgumentsByOption": {
        "b": "21: corresponde a la figura 5, no a la figura 6.",
        "c": "24: queda una unidad abajo del valor que resulta al sumar 4 dos veces desde la figura 4.",
        "d": "27: suma de más y rompe el crecimiento constante.",
        "e": "29: aumenta demasiado respecto del patrón observado."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/habilidad-matematica/reactivo-06-cruces-mosaicos.png",
        "alt": "Habilidad matemática, reactivo 6: Serie de cruces formadas con mosaicos cuadrados para identificar el crecimiento de la figura.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/habilidad-matematica/reactivo-06-cruces-mosaicos.png",
          "alt": "Habilidad matemática, reactivo 6: Serie de cruces formadas con mosaicos cuadrados para identificar el crecimiento de la figura.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 6,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-7",
      "number": 7,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Giros de figuras, rotación de 90°",
      "baseText": "Observa la figura original y aplica un giro de 90° en sentido horario.",
      "basePill": null,
      "prompt": "Selecciona la opción que representa la figura después de girarla 90° en el sentido de las manecillas del reloj.",
      "options": [
        {
          "label": "a",
          "text": "Opción visual A"
        },
        {
          "label": "b",
          "text": "Opción visual B"
        },
        {
          "label": "c",
          "text": "Opción visual C"
        },
        {
          "label": "d",
          "text": "Opción visual D"
        },
        {
          "label": "e",
          "text": "Opción visual E"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Opción visual E",
      "hint": "Al girar 90° a la derecha, la columna izquierda de la figura original se convierte en la fila superior.",
      "correctArgument": "En una rotación de 90° en sentido horario, cada elemento cambia de posición así:\n\nEl triángulo que estaba arriba a la izquierda pasa arriba a la derecha.\nEl círculo sólido que estaba al centro izquierda pasa arriba al centro.\nEl círculo vacío que estaba abajo al centro pasa al centro izquierda.\nEl cuadrado vacío que estaba arriba al centro pasa al centro derecha.\nEl cuadrado sólido que estaba al centro derecha pasa abajo al centro.\n\nEsa distribución coincide con la opción e).",
      "incorrectArgumentsByOption": {
        "a": "Coloca algunos símbolos en posiciones propias de una rotación incompleta.",
        "b": "Se parece más a un giro de 180° que a uno de 90° horario.",
        "c": "Repite la figura original, por lo que no hay giro.",
        "d": "Representa un giro de 90° en sentido contrario al solicitado."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/habilidad-matematica/reactivo-07-rotacion-90.png",
        "alt": "Habilidad matemática, reactivo 7: Figura original y cinco opciones en cuadrícula 3 × 3 para elegir la rotación de 90° en sentido horario. La imagen muestra la figura inicial, las opciones A-E y no marca la respuesta.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/habilidad-matematica/reactivo-07-rotacion-90.png",
          "alt": "Habilidad matemática, reactivo 7: Figura original y cinco opciones en cuadrícula 3 × 3 para elegir la rotación de 90° en sentido horario. La imagen muestra la figura inicial, las opciones A-E y no marca la respuesta.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 7,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-8",
      "number": 8,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Giros de figuras, rotación de 180°",
      "baseText": "Observa la figura original y aplica un giro de 180°.",
      "basePill": null,
      "prompt": "¿Cuál opción representa la figura después de girarla 180°?",
      "options": [
        {
          "label": "a",
          "text": "Opción visual A"
        },
        {
          "label": "b",
          "text": "Opción visual B"
        },
        {
          "label": "c",
          "text": "Opción visual C"
        },
        {
          "label": "d",
          "text": "Opción visual D"
        },
        {
          "label": "e",
          "text": "Opción visual E"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Opción visual B",
      "hint": "Un giro de 180° deja arriba lo que estaba abajo y también invierte izquierda y derecha.",
      "correctArgument": "Al girar 180°, la segunda fila pasa arriba, pero en orden invertido:\n■, vacío, ●, □\nse convierte en:\n□, ●, vacío, ■\n\nLa primera fila pasa abajo, también en orden invertido:\n★, ○, vacío, △\nse convierte en:\n△, vacío, ○, ★\n\nPor eso la opción correcta es b).",
      "incorrectArgumentsByOption": {
        "a": "Repite la figura original, así que no realiza ningún giro.",
        "c": "Solo cambia las filas de lugar, pero no invierte izquierda y derecha.",
        "d": "Invierte cada fila, pero no coloca arriba la fila que originalmente estaba abajo.",
        "e": "Cambia el orden de algunos símbolos y no conserva el resultado exacto del giro."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/habilidad-matematica/reactivo-08-rotacion-180.png",
        "alt": "Habilidad matemática, reactivo 8: Figura original y cinco opciones en arreglo 2 × 4 para elegir la rotación de 180°. La imagen muestra la figura inicial, las opciones A-E y no marca la respuesta.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/habilidad-matematica/reactivo-08-rotacion-180.png",
          "alt": "Habilidad matemática, reactivo 8: Figura original y cinco opciones en arreglo 2 × 4 para elegir la rotación de 180°. La imagen muestra la figura inicial, las opciones A-E y no marca la respuesta.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 8,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-9",
      "number": 9,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Conteo visual de cuadrados",
      "baseText": "Observa la cuadrícula y cuenta todos los cuadrados posibles.",
      "basePill": null,
      "prompt": "¿Cuántos cuadrados hay en total en la figura?",
      "options": [
        {
          "label": "a",
          "text": "9"
        },
        {
          "label": "b",
          "text": "12"
        },
        {
          "label": "c",
          "text": "13"
        },
        {
          "label": "d",
          "text": "14"
        },
        {
          "label": "e",
          "text": "16"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "14",
      "hint": "Cuenta los cuadrados de tamaño 1 × 1, luego los de tamaño 2 × 2 y finalmente el de tamaño 3 × 3.",
      "correctArgument": "En una cuadrícula 3 × 3 hay:\n\nCuadrados pequeños de 1 × 1:\n9\n\nCuadrados medianos de 2 × 2:\n4\n\nCuadrado grande de 3 × 3:\n1\n\nTotal:\n9 + 4 + 1 = 14\n\nPor eso hay 14 cuadrados.",
      "incorrectArgumentsByOption": {
        "a": "9: solo cuenta los cuadrados pequeños y omite los cuadrados mayores.",
        "b": "12: reconoce algunos cuadrados grandes, pero deja fuera varios de 2 × 2.",
        "c": "13: falta contar uno de los cuadrados posibles.",
        "e": "16: agrega figuras que no son cuadrados completos."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/habilidad-matematica/reactivo-09-cuadricula-3x3.png",
        "alt": "Habilidad matemática, reactivo 9: Cuadrícula 3 × 3 para contar todos los cuadrados posibles.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/habilidad-matematica/reactivo-09-cuadricula-3x3.png",
          "alt": "Habilidad matemática, reactivo 9: Cuadrícula 3 × 3 para contar todos los cuadrados posibles.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 9,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-10",
      "number": 10,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Conteo visual de triángulos",
      "baseText": "Observa la figura y cuenta todos los triángulos posibles.",
      "basePill": null,
      "prompt": "¿Cuántos triángulos hay en total en la figura?",
      "options": [
        {
          "label": "a",
          "text": "6"
        },
        {
          "label": "b",
          "text": "8"
        },
        {
          "label": "c",
          "text": "10"
        },
        {
          "label": "d",
          "text": "12"
        },
        {
          "label": "e",
          "text": "15"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "10",
      "hint": "No cuentes solo los triángulos pequeños; también considera los que se forman al unir dos, tres o cuatro partes de la base.",
      "correctArgument": "La base queda dividida en cuatro partes. Los triángulos posibles se cuentan así:\n\nTriángulos de una parte:\n4\n\nTriángulos formados por dos partes:\n3\n\nTriángulos formados por tres partes:\n2\n\nTriángulo formado por las cuatro partes:\n1\n\nTotal:\n4 + 3 + 2 + 1 = 10\n\nPor eso hay 10 triángulos.",
      "incorrectArgumentsByOption": {
        "a": "6: cuenta algunos triángulos pequeños y medianos, pero omite varios.",
        "b": "8: reconoce que hay triángulos compuestos, pero no todos.",
        "d": "12: sobrecuenta figuras que no tienen lados completos.",
        "e": "15: corresponde a un conteo excesivo, incluyendo combinaciones que no forman triángulos válidos."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/habilidad-matematica/reactivo-10-triangulos.png",
        "alt": "Habilidad matemática, reactivo 10: Triángulo dividido desde el vértice superior para contar todos los triángulos posibles.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/habilidad-matematica/reactivo-10-triangulos.png",
          "alt": "Habilidad matemática, reactivo 10: Triángulo dividido desde el vértice superior para contar todos los triángulos posibles.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 10,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-11",
      "number": 11,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Series de números, alternancia de operaciones",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Qué número sigue en la sucesión?\n\n4, 9, 18, 23, 46, 51, __",
      "options": [
        {
          "label": "a",
          "text": "102"
        },
        {
          "label": "b",
          "text": "56"
        },
        {
          "label": "c",
          "text": "101"
        },
        {
          "label": "d",
          "text": "92"
        },
        {
          "label": "e",
          "text": "108"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "102",
      "hint": "La sucesión alterna entre sumar una cantidad fija y duplicar el resultado.",
      "correctArgument": "La sucesión alterna dos operaciones:\n\nSumar 5 y multiplicar por 2.\n\n4 + 5 = 9\n9 × 2 = 18\n18 + 5 = 23\n23 × 2 = 46\n46 + 5 = 51\n\nLa operación que sigue es multiplicar por 2:\n51 × 2 = 102\n\nPor eso el número que sigue es 102.",
      "incorrectArgumentsByOption": {
        "b": "56: resultaría de volver a sumar 5, pero en ese lugar corresponde multiplicar por 2.",
        "c": "101: está cerca del resultado, pero 51 × 2 da 102.",
        "d": "92: no corresponde a la operación que sigue.",
        "e": "108: multiplica o suma de forma incorrecta y rompe la alternancia."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 11,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-12",
      "number": 12,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Problemas con dos datos que se cruzan",
      "baseText": null,
      "basePill": null,
      "prompt": "En una caja hay fichas rojas, azules y verdes. Las fichas rojas son el doble de las verdes. Las fichas azules son 5 más que las verdes. En total hay 29 fichas.\n\n¿Cuántas fichas verdes hay?",
      "options": [
        {
          "label": "a",
          "text": "4"
        },
        {
          "label": "b",
          "text": "5"
        },
        {
          "label": "c",
          "text": "7"
        },
        {
          "label": "d",
          "text": "8"
        },
        {
          "label": "e",
          "text": "6"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "6",
      "hint": "Representa las fichas verdes con una cantidad desconocida y expresa las demás en función de esa cantidad.",
      "correctArgument": "Sea v la cantidad de fichas verdes.\n\nEntonces:\nRojas:\n2v\n\nAzules:\nv + 5\n\nTotal:\nv + 2v + (v + 5) = 29\n\nSe simplifica:\n4v + 5 = 29\n\nRestamos 5:\n4v = 24\n\nDividimos entre 4:\nv = 6\n\nPor eso hay 6 fichas verdes.",
      "incorrectArgumentsByOption": {
        "a": "4: si hubiera 4 verdes, habría 8 rojas y 9 azules; el total sería 21.",
        "b": "5: si hubiera 5 verdes, habría 10 rojas y 10 azules; el total sería 25.",
        "c": "7: si hubiera 7 verdes, habría 14 rojas y 12 azules; el total sería 33.",
        "d": "8: si hubiera 8 verdes, habría 16 rojas y 13 azules; el total sería 37."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 12,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-13",
      "number": 13,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Problemas de aplicación con razonamiento y proporciones",
      "baseText": null,
      "basePill": null,
      "prompt": "Cuatro llaves iguales llenan un tanque en 18 minutos. Si se abren seis llaves iguales trabajando al mismo ritmo, ¿en cuántos minutos se llenará el mismo tanque?",
      "options": [
        {
          "label": "a",
          "text": "10"
        },
        {
          "label": "b",
          "text": "12"
        },
        {
          "label": "c",
          "text": "14"
        },
        {
          "label": "d",
          "text": "16"
        },
        {
          "label": "e",
          "text": "27"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "12",
      "hint": "Más llaves trabajando al mismo ritmo llenan el tanque en menos tiempo. Usa una proporción inversa.",
      "correctArgument": "El trabajo total puede medirse en «llave minutos».\n\nCuatro llaves tardan 18 minutos:\n4 × 18 = 72\n\nEso significa que el tanque requiere 72 llave minutos.\n\nSi trabajan 6 llaves:\n72 ÷ 6 = 12\n\nPor eso el tanque se llenará en 12 minutos.",
      "incorrectArgumentsByOption": {
        "a": "10: reduce demasiado el tiempo y no conserva el trabajo total.",
        "c": "14: no corresponde a dividir 72 entre 6.",
        "d": "16: es más tiempo del correcto, aunque se aumentó el número de llaves.",
        "e": "27: interpreta mal la relación, porque con más llaves el tiempo no debe aumentar."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 13,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-14",
      "number": 14,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Problemas de razonamiento, orden lógico",
      "baseText": null,
      "basePill": null,
      "prompt": "En una carrera participaron Ana, Beto, Carla y Diego. Se sabe lo siguiente:\n\nAna llegó antes que Beto.\nCarla llegó después de Ana, pero antes que Diego.\nBeto llegó después de Diego.\n\n¿Quién llegó en segundo lugar?",
      "options": [
        {
          "label": "a",
          "text": "Ana"
        },
        {
          "label": "b",
          "text": "Beto"
        },
        {
          "label": "c",
          "text": "Diego"
        },
        {
          "label": "d",
          "text": "Carla"
        },
        {
          "label": "e",
          "text": "No se puede saber"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Carla",
      "hint": "Ordena las posiciones usando las relaciones «antes que» y «después de».",
      "correctArgument": "Carla llegó después de Ana, así que Ana va antes que Carla.\n\nTambién se dice que Carla llegó antes que Diego:\nAna, Carla, Diego\n\nAdemás, Beto llegó después de Diego:\nAna, Carla, Diego, Beto\n\nPor lo tanto, quien llegó en segundo lugar fue Carla.",
      "incorrectArgumentsByOption": {
        "a": "Ana: llegó antes que Carla, así que ocupa el primer lugar.",
        "b": "Beto: llegó después de Diego, por lo que no puede ser segundo.",
        "c": "Diego: llegó después de Carla, así que no ocupa el segundo lugar.",
        "e": "No se puede saber: sí se puede determinar el orden completo con los datos dados."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 14,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-15",
      "number": 15,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Problemas de aplicación con razonamiento y proporciones, comparación de tasas",
      "baseText": "La siguiente tabla muestra el trabajo de cinco equipos durante una actividad.",
      "basePill": null,
      "prompt": "¿Qué equipo tuvo el mayor rendimiento de paquetes entregados por minuto?",
      "options": [
        {
          "label": "a",
          "text": "Equipo A"
        },
        {
          "label": "b",
          "text": "Equipo B"
        },
        {
          "label": "c",
          "text": "Equipo C"
        },
        {
          "label": "d",
          "text": "Equipo D"
        },
        {
          "label": "e",
          "text": "Equipo E"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Equipo C",
      "hint": "Calcula cuántos paquetes entrega cada equipo en un minuto y compara los resultados.",
      "correctArgument": "Calculamos el rendimiento de cada equipo:\n\nEquipo A:\n48 ÷ 6 = 8\n\nEquipo B:\n54 ÷ 9 = 6\n\nEquipo C:\n63 ÷ 7 = 9\n\nEquipo D:\n72 ÷ 12 = 6\n\nEquipo E:\n84 ÷ 14 = 6\n\nEl mayor rendimiento es 9 paquetes por minuto, correspondiente al Equipo C.",
      "incorrectArgumentsByOption": {
        "a": "Equipo A: entrega 8 paquetes por minuto, menos que el Equipo C.",
        "b": "Equipo B: entrega 6 paquetes por minuto, no es el mayor rendimiento.",
        "d": "Equipo D: también entrega 6 paquetes por minuto.",
        "e": "Equipo E: aunque entrega más paquetes en total, tarda más tiempo y su rendimiento es de 6 paquetes por minuto."
      },
      "visual": {
        "kind": "table",
        "position": "base",
        "hasHorizontalScroll": true,
        "caption": "La siguiente tabla muestra el trabajo de cinco equipos durante una actividad.",
        "headers": [
          "Dato",
          "Equipo A",
          "Equipo B",
          "Equipo C",
          "Equipo D",
          "Equipo E"
        ],
        "rows": [
          [
            "Paquetes entregados",
            "48",
            "54",
            "63",
            "72",
            "84"
          ],
          [
            "Tiempo empleado en minutos",
            "6",
            "9",
            "7",
            "12",
            "14"
          ]
        ]
      },
      "visuals": [
        {
          "kind": "table",
          "position": "base",
          "hasHorizontalScroll": true,
          "caption": "La siguiente tabla muestra el trabajo de cinco equipos durante una actividad.",
          "headers": [
            "Dato",
            "Equipo A",
            "Equipo B",
            "Equipo C",
            "Equipo D",
            "Equipo E"
          ],
          "rows": [
            [
              "Paquetes entregados",
              "48",
              "54",
              "63",
              "72",
              "84"
            ],
            [
              "Tiempo empleado en minutos",
              "6",
              "9",
              "7",
              "12",
              "14"
            ]
          ]
        }
      ],
      "sourceOrder": 15,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-16",
      "number": 16,
      "areaId": "habilidad-matematica",
      "areaName": "Habilidad matemática",
      "block": "Problemas de aplicación con razonamiento y proporciones",
      "baseText": null,
      "basePill": null,
      "prompt": "Cinco estudiantes organizan 30 sobres en 2 horas. Si todos trabajan al mismo ritmo, ¿cuántos sobres organizarán 8 estudiantes en 3 horas?",
      "options": [
        {
          "label": "a",
          "text": "48"
        },
        {
          "label": "b",
          "text": "54"
        },
        {
          "label": "c",
          "text": "60"
        },
        {
          "label": "d",
          "text": "66"
        },
        {
          "label": "e",
          "text": "72"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "72",
      "hint": "Primero calcula cuántos sobres organiza un estudiante en una hora.",
      "correctArgument": "Primero calculamos el trabajo por estudiante y por hora.\n\nCinco estudiantes en 2 horas equivalen a:\n5 × 2 = 10\nestudiante horas.\n\nEn 10 estudiante horas organizan 30 sobres:\n30 ÷ 10 = 3\n\nCada estudiante organiza 3 sobres por hora.\n\nAhora calculamos el trabajo de 8 estudiantes durante 3 horas:\n8 × 3 = 24\nestudiante horas.\n\nEntonces:\n24 × 3 = 72\n\nPor eso organizarán 72 sobres.",
      "incorrectArgumentsByOption": {
        "a": "48: no considera correctamente el aumento de estudiantes y horas.",
        "b": "54: queda por debajo del resultado al calcular el ritmo por estudiante y por hora.",
        "c": "60: aumenta la producción, pero no lo suficiente para 8 estudiantes durante 3 horas.",
        "d": "66: se acerca, pero no corresponde al producto 24 × 3."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 16,
      "rangeStart": 1,
      "rangeEnd": 16
    },
    {
      "id": "reactivo-17",
      "number": 17,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Seres vivos: características generales y cómo reconocerlas en ejemplos",
      "baseText": null,
      "basePill": null,
      "prompt": "En una práctica escolar se observan tres situaciones:\n\nUna planta inclina sus tallos hacia la ventana.\nUn caracol retrae sus antenas cuando se le toca suavemente.\nUna lombriz se aleja de una zona con luz intensa.\n\n¿Qué característica de los seres vivos se reconoce en los tres casos?",
      "options": [
        {
          "label": "a",
          "text": "Reproducción"
        },
        {
          "label": "b",
          "text": "Irritabilidad"
        },
        {
          "label": "c",
          "text": "Nutrición"
        },
        {
          "label": "d",
          "text": "Excreción"
        },
        {
          "label": "e",
          "text": "Respiración"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Irritabilidad",
      "hint": "Busca la característica relacionada con reaccionar ante cambios del ambiente.",
      "correctArgument": "La irritabilidad es la capacidad de los seres vivos para responder a estímulos del ambiente. En los ejemplos, la luz, el contacto y la intensidad luminosa provocan respuestas observables en los organismos.",
      "incorrectArgumentsByOption": {
        "a": "Reproducción: se refiere a originar nuevos individuos, pero en los ejemplos no se forman descendientes.",
        "c": "Nutrición: implica obtener y utilizar materia y energía, pero las situaciones describen respuestas ante estímulos.",
        "d": "Excreción: consiste en eliminar sustancias de desecho, lo cual no se observa en los casos.",
        "e": "Respiración: es un proceso para obtener energía a partir de nutrientes, pero no explica los movimientos descritos."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 17,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-18",
      "number": 18,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Nutrición: autótrofos y heterótrofos",
      "baseText": null,
      "basePill": null,
      "prompt": "En una charca, las algas producen materia orgánica utilizando luz solar, agua y dióxido de carbono. En el mismo ambiente, algunas larvas de insecto se alimentan de restos de algas y de otros organismos pequeños.\n\nSegún su forma de nutrición, ¿cómo se clasifican las algas y las larvas?",
      "options": [
        {
          "label": "a",
          "text": "Las algas son heterótrofas y las larvas son autótrofas."
        },
        {
          "label": "b",
          "text": "Las algas y las larvas son autótrofas."
        },
        {
          "label": "c",
          "text": "Las algas y las larvas son heterótrofas."
        },
        {
          "label": "d",
          "text": "Las algas son autótrofas y las larvas son heterótrofas."
        },
        {
          "label": "e",
          "text": "Las algas son consumidoras y las larvas son productoras."
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Las algas son autótrofas y las larvas son heterótrofas.",
      "hint": "Identifica quién fabrica su propio alimento y quién depende de otros seres vivos o de sus restos.",
      "correctArgument": "Las algas son autótrofas porque producen su propio alimento mediante fotosíntesis. Las larvas son heterótrofas porque obtienen alimento de otros organismos o de sus restos.",
      "incorrectArgumentsByOption": {
        "a": "Las algas son heterótrofas y las larvas son autótrofas: invierte la clasificación, porque las algas producen alimento y las larvas lo consumen.",
        "b": "Las algas y las larvas son autótrofas: las larvas no fabrican su propio alimento con luz solar.",
        "c": "Las algas y las larvas son heterótrofas: las algas sí pueden producir materia orgánica mediante fotosíntesis.",
        "e": "Las algas son consumidoras y las larvas son productoras: también invierte las funciones dentro del ecosistema."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 18,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-19",
      "number": 19,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Fotosíntesis: qué necesita la planta y qué produce",
      "baseText": "Un equipo cubre con papel aluminio una parte de una hoja de geranio y deja la planta cerca de una ventana durante varias horas. Después retira el papel y aplica yodo para detectar almidón. La parte que recibió luz se oscurece; la parte cubierta casi no cambia.",
      "basePill": null,
      "prompt": "¿Qué conclusión se obtiene mejor a partir del experimento?",
      "options": [
        {
          "label": "a",
          "text": "La luz es necesaria para que la hoja produzca almidón durante la fotosíntesis."
        },
        {
          "label": "b",
          "text": "El papel aluminio aporta alimento a la hoja."
        },
        {
          "label": "c",
          "text": "La oscuridad aumenta la producción de almidón en la planta."
        },
        {
          "label": "d",
          "text": "El yodo permite que la hoja realice respiración."
        },
        {
          "label": "e",
          "text": "El almidón se produce igual en cualquier condición."
        }
      ],
      "correctOption": "a",
      "correctOptionText": "La luz es necesaria para que la hoja produzca almidón durante la fotosíntesis.",
      "hint": "Compara qué ocurrió en la zona iluminada y qué ocurrió en la zona cubierta.",
      "correctArgument": "La parte de la hoja que recibió luz se oscureció con el yodo, lo que indica presencia de almidón. La parte cubierta casi no cambió. Esto permite concluir que la luz fue necesaria para producir almidón durante la fotosíntesis.",
      "incorrectArgumentsByOption": {
        "b": "El papel aluminio aporta alimento a la hoja: el papel solo bloqueó la luz, no proporcionó nutrientes.",
        "c": "La oscuridad aumenta la producción de almidón en la planta: el resultado muestra lo contrario, porque la zona cubierta no produjo almidón de manera evidente.",
        "d": "El yodo permite que la hoja realice respiración: el yodo se usa como indicador, no como sustancia para respirar.",
        "e": "El almidón se produce igual en cualquier condición: el experimento muestra diferencia entre la zona iluminada y la zona cubierta."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/biologia/reactivo-19-fotosintesis-almidon.png",
        "alt": "Biología, reactivo 19: Experimento con hoja parcialmente cubierta, luz y yodo para interpretar la producción de almidón.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/biologia/reactivo-19-fotosintesis-almidon.png",
          "alt": "Biología, reactivo 19: Experimento con hoja parcialmente cubierta, luz y yodo para interpretar la producción de almidón.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 19,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-20",
      "number": 20,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Alimentación: alimentos con almidón",
      "baseText": null,
      "basePill": null,
      "prompt": "En una actividad de laboratorio, un grupo quiere elegir un alimento que probablemente cambie a color azul oscuro o negro al agregarle yodo, debido a su contenido de almidón.\n\n¿Cuál alimento es más adecuado para esa prueba?",
      "options": [
        {
          "label": "a",
          "text": "Aceite vegetal"
        },
        {
          "label": "b",
          "text": "Pechuga de pollo"
        },
        {
          "label": "c",
          "text": "Aguacate"
        },
        {
          "label": "d",
          "text": "Queso panela"
        },
        {
          "label": "e",
          "text": "Arroz cocido"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Arroz cocido",
      "hint": "El almidón es un carbohidrato abundante en granos, cereales y algunos tubérculos.",
      "correctArgument": "El arroz contiene almidón, un carbohidrato de reserva presente en muchos granos. Por eso es probable que reaccione con yodo y produzca un color oscuro.",
      "incorrectArgumentsByOption": {
        "a": "Aceite vegetal: contiene principalmente lípidos, no almidón.",
        "b": "Pechuga de pollo: aporta sobre todo proteínas, no carbohidratos de reserva vegetal.",
        "c": "Aguacate: contiene grasas saludables y fibra, pero no es una fuente principal de almidón.",
        "d": "Queso panela: contiene proteínas y grasas, no almidón en cantidad importante."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 20,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-21",
      "number": 21,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Evolución: selección natural y cambios en poblaciones",
      "baseText": null,
      "basePill": null,
      "prompt": "En una laguna hay peces de color claro y peces de color oscuro. El fondo de la laguna es oscuro, por lo que las aves depredadoras detectan con más facilidad a los peces claros. Después de varias generaciones, la población tiene más peces oscuros que claros.\n\n¿Cuál explicación es la más adecuada?",
      "options": [
        {
          "label": "a",
          "text": "Los peces claros decidieron cambiar de color para esconderse."
        },
        {
          "label": "b",
          "text": "Las aves provocaron directamente que nacieran peces oscuros."
        },
        {
          "label": "c",
          "text": "Los peces oscuros sobrevivieron más y dejaron más descendencia."
        },
        {
          "label": "d",
          "text": "El agua pintó a todos los peces hasta volverlos oscuros."
        },
        {
          "label": "e",
          "text": "Todos los peces nacieron iguales y cambiaron al mismo tiempo."
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Los peces oscuros sobrevivieron más y dejaron más descendencia.",
      "hint": "Observa qué organismos tienen mayor posibilidad de sobrevivir y reproducirse.",
      "correctArgument": "La selección natural favorece a los individuos con características que aumentan su supervivencia y reproducción en un ambiente determinado. En este caso, los peces oscuros se camuflan mejor, sobreviven más y transmiten con mayor frecuencia esa característica a sus descendientes.",
      "incorrectArgumentsByOption": {
        "a": "Los peces claros decidieron cambiar de color para esconderse: los organismos no modifican voluntariamente sus rasgos hereditarios.",
        "b": "Las aves provocaron directamente que nacieran peces oscuros: los depredadores no producen el rasgo, solo ejercen presión sobre la población.",
        "d": "El agua pintó a todos los peces hasta volverlos oscuros: no explica un cambio hereditario en la población.",
        "e": "Todos los peces nacieron iguales y cambiaron al mismo tiempo: el caso muestra diferencias entre individuos desde el inicio."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 21,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-22",
      "number": 22,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Biodiversidad: causas de pérdida y consecuencias",
      "baseText": null,
      "basePill": null,
      "prompt": "En un humedal se introduce una planta acuática ornamental que crece muy rápido. Con el tiempo cubre gran parte de la superficie del agua, reduce la entrada de luz y desplaza a varias especies nativas.\n\n¿Cuál es el efecto principal de esta situación sobre la biodiversidad?",
      "options": [
        {
          "label": "a",
          "text": "Aumenta la variedad de especies nativas."
        },
        {
          "label": "b",
          "text": "Altera el ecosistema y reduce poblaciones locales."
        },
        {
          "label": "c",
          "text": "Evita cualquier enfermedad en los organismos del humedal."
        },
        {
          "label": "d",
          "text": "Produce nuevas especies nativas de inmediato."
        },
        {
          "label": "e",
          "text": "Convierte el humedal en zona desértica en pocos días."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Altera el ecosistema y reduce poblaciones locales.",
      "hint": "Piensa en lo que ocurre cuando una especie desplaza a otras que ya formaban parte del ecosistema.",
      "correctArgument": "Una especie introducida que crece rápidamente puede competir por luz, espacio y nutrientes. Al desplazar especies nativas, modifica el equilibrio del ecosistema y disminuye la biodiversidad local.",
      "incorrectArgumentsByOption": {
        "a": "Aumenta la variedad de especies nativas: ocurre lo contrario, porque varias especies locales son desplazadas.",
        "c": "Evita cualquier enfermedad en los organismos del humedal: el planteamiento no habla de prevención de enfermedades.",
        "d": "Produce nuevas especies nativas de inmediato: la aparición de especies no ocurre de forma inmediata por este proceso.",
        "e": "Convierte el humedal en zona desértica en pocos días: exagera el efecto y no corresponde al caso descrito."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 22,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-23",
      "number": 23,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Desarrollo sustentable: acciones concretas y decisiones responsables",
      "baseText": null,
      "basePill": null,
      "prompt": "Una cooperativa pesquera decide capturar solo peces adultos, respetar la temporada de reproducción, limpiar la zona de manglar y vender su producto sin agotar la población de peces.\n\nEstas acciones se relacionan principalmente con el",
      "options": [
        {
          "label": "a",
          "text": "desarrollo sustentable"
        },
        {
          "label": "b",
          "text": "consumo ilimitado de recursos"
        },
        {
          "label": "c",
          "text": "aislamiento de especies"
        },
        {
          "label": "d",
          "text": "crecimiento urbano acelerado"
        },
        {
          "label": "e",
          "text": "abandono de actividades productivas"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "desarrollo sustentable",
      "hint": "La situación busca obtener recursos hoy sin impedir que sigan existiendo mañana.",
      "correctArgument": "El desarrollo sustentable implica usar los recursos naturales de forma responsable para satisfacer necesidades actuales sin comprometer su disponibilidad futura. La cooperativa mantiene una actividad económica, pero cuida la reproducción de los peces y el ambiente.",
      "incorrectArgumentsByOption": {
        "b": "Consumo ilimitado de recursos: la cooperativa pone límites y respeta tiempos de reproducción.",
        "c": "Aislamiento de especies: no se busca separar organismos, sino manejar responsablemente el recurso.",
        "d": "Crecimiento urbano acelerado: el caso trata de pesca y cuidado ambiental, no de expansión de ciudades.",
        "e": "Abandono de actividades productivas: la actividad continúa, pero con reglas de conservación."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 23,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-24",
      "number": 24,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Reproducción: sexual y asexual, diferencias y ejemplos",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál de las siguientes situaciones corresponde a reproducción sexual?",
      "options": [
        {
          "label": "a",
          "text": "Una bacteria se divide y forma dos células casi iguales."
        },
        {
          "label": "b",
          "text": "Una levadura forma una yema que crece hasta separarse."
        },
        {
          "label": "c",
          "text": "Una nueva planta se desarrolla a partir de un tubérculo."
        },
        {
          "label": "d",
          "text": "Un pez macho y una hembra liberan gametos que se unen durante la fecundación."
        },
        {
          "label": "e",
          "text": "Un fragmento de una estrella de mar regenera una parte del cuerpo."
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Un pez macho y una hembra liberan gametos que se unen durante la fecundación.",
      "hint": "Busca el caso donde participan células reproductoras de dos progenitores.",
      "correctArgument": "La reproducción sexual requiere la unión de gametos. En el caso de los peces, la fecundación ocurre cuando las células reproductoras masculina y femenina se unen para originar un nuevo individuo.",
      "incorrectArgumentsByOption": {
        "a": "Una bacteria se divide y forma dos células casi iguales: corresponde a reproducción asexual por bipartición.",
        "b": "Una levadura forma una yema que crece hasta separarse: corresponde a reproducción asexual por gemación.",
        "c": "Una nueva planta se desarrolla a partir de un tubérculo: es reproducción asexual vegetativa.",
        "e": "Un fragmento de una estrella de mar regenera una parte del cuerpo: describe regeneración y puede relacionarse con reproducción asexual en ciertos casos, pero no implica unión de gametos."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 24,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-25",
      "number": 25,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Métodos anticonceptivos: qué previenen y comparación general de eficacia",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál afirmación compara correctamente algunos métodos anticonceptivos?",
      "options": [
        {
          "label": "a",
          "text": "Todos los métodos anticonceptivos previenen infecciones de transmisión sexual con la misma eficacia."
        },
        {
          "label": "b",
          "text": "Las pastillas hormonales funcionan como barrera física."
        },
        {
          "label": "c",
          "text": "El método del ritmo protege contra infecciones de transmisión sexual."
        },
        {
          "label": "d",
          "text": "El condón evita únicamente embarazos, pero no reduce riesgos de infección."
        },
        {
          "label": "e",
          "text": "El condón funciona como barrera y puede reducir el riesgo de infecciones de transmisión sexual; los métodos hormonales no funcionan como barrera."
        }
      ],
      "correctOption": "e",
      "correctOptionText": "El condón funciona como barrera y puede reducir el riesgo de infecciones de transmisión sexual; los métodos hormonales no funcionan como barrera.",
      "hint": "Distingue entre prevenir embarazo y reducir el riesgo de infecciones mediante una barrera física.",
      "correctArgument": "El condón actúa como una barrera física, por lo que ayuda a prevenir embarazos y también puede reducir el riesgo de infecciones de transmisión sexual. Los métodos hormonales pueden prevenir embarazos, pero no funcionan como barrera frente a infecciones.",
      "incorrectArgumentsByOption": {
        "a": "Todos los métodos anticonceptivos previenen infecciones de transmisión sexual con la misma eficacia: es falso, porque no todos funcionan como barrera.",
        "b": "Las pastillas hormonales funcionan como barrera física: las pastillas actúan mediante hormonas, no bloqueando físicamente el contacto.",
        "c": "El método del ritmo protege contra infecciones de transmisión sexual: este método no funciona como barrera.",
        "d": "El condón evita únicamente embarazos, pero no reduce riesgos de infección: omite su función como barrera física."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 25,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-26",
      "number": 26,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Salud respiratoria: prevención en situaciones cotidianas",
      "baseText": null,
      "basePill": null,
      "prompt": "Durante una temporada de frío, en una comunidad también hay polvo por construcción y humo por quema de basura. ¿Cuál acción ayuda mejor a prevenir problemas respiratorios?",
      "options": [
        {
          "label": "a",
          "text": "Permanecer todo el día en habitaciones cerradas sin ventilación."
        },
        {
          "label": "b",
          "text": "Hacer ejercicio intenso cerca del humo para fortalecer los pulmones."
        },
        {
          "label": "c",
          "text": "Evitar el humo, cubrir nariz y boca en zonas con polvo y ventilar la casa de forma adecuada."
        },
        {
          "label": "d",
          "text": "Tomar antibióticos sin revisión médica cada vez que haya frío."
        },
        {
          "label": "e",
          "text": "Consumir únicamente bebidas muy frías para acostumbrar la garganta."
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Evitar el humo, cubrir nariz y boca en zonas con polvo y ventilar la casa de forma adecuada.",
      "hint": "Elige la opción que reduce la exposición a contaminantes y favorece un ambiente más sano.",
      "correctArgument": "Evitar humo y polvo disminuye la irritación de las vías respiratorias. Además, ventilar adecuadamente ayuda a renovar el aire interior y reducir acumulación de contaminantes.",
      "incorrectArgumentsByOption": {
        "a": "Permanecer todo el día en habitaciones cerradas sin ventilación: puede concentrar polvo, humo u otros contaminantes.",
        "b": "Hacer ejercicio intenso cerca del humo para fortalecer los pulmones: aumenta la inhalación de contaminantes.",
        "d": "Tomar antibióticos sin revisión médica cada vez que haya frío: no es una medida preventiva adecuada y puede ser riesgosa.",
        "e": "Consumir únicamente bebidas muy frías para acostumbrar la garganta: no reduce la exposición a contaminantes ni previene de forma adecuada."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 26,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-27",
      "number": 27,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Ciencia y tecnología en alimentos: transgénicos y manipulación genética",
      "baseText": null,
      "basePill": null,
      "prompt": "Un grupo de investigación desarrolla una variedad de jitomate que madura más lentamente mediante la modificación controlada de su información genética. Esto permite que el fruto dure más tiempo antes de echarse a perder.\n\nEste caso es un ejemplo de",
      "options": [
        {
          "label": "a",
          "text": "aplicación de ciencia y tecnología para modificar características de un organismo"
        },
        {
          "label": "b",
          "text": "conocimiento empírico obtenido solo por tradición oral"
        },
        {
          "label": "c",
          "text": "cambio natural sin intervención humana"
        },
        {
          "label": "d",
          "text": "reproducción asexual sin modificación hereditaria"
        },
        {
          "label": "e",
          "text": "cambio físico del fruto sin relación con su información genética"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "aplicación de ciencia y tecnología para modificar características de un organismo",
      "hint": "Observa si el cambio se logró aplicando conocimientos científicos y procedimientos técnicos.",
      "correctArgument": "La modificación controlada de información genética usa conocimiento científico sobre los seres vivos y técnicas desarrolladas para intervenir en sus características. Por eso representa interacción entre ciencia y tecnología.",
      "incorrectArgumentsByOption": {
        "b": "Conocimiento empírico obtenido solo por tradición oral: el caso menciona investigación y modificación genética controlada.",
        "c": "Cambio natural sin intervención humana: sí hay intervención humana mediante procedimientos técnicos.",
        "d": "Reproducción asexual sin modificación hereditaria: el planteamiento no trata de reproducir organismos por sí mismos, sino de modificar una característica.",
        "e": "Cambio físico del fruto sin relación con su información genética: el caso señala que se modificó información genética."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 27,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-28",
      "number": 28,
      "areaId": "biologia",
      "areaName": "Biología",
      "block": "Manipulación genética: qué es y para qué se usa",
      "baseText": null,
      "basePill": null,
      "prompt": "Lee el procedimiento:\n\n1. Se identifica un fragmento de ADN relacionado con la producción de una proteína útil.\n2. Ese fragmento se introduce en células bacterianas.\n3. Las bacterias producen la proteína que se busca obtener.\n\n¿Qué característica de la manipulación genética se muestra en el procedimiento?",
      "options": [
        {
          "label": "a",
          "text": "Mezcla organismos únicamente mediante reproducción sexual."
        },
        {
          "label": "b",
          "text": "Selecciona organismos solo por su apariencia externa."
        },
        {
          "label": "c",
          "text": "Evita el uso de conocimientos científicos."
        },
        {
          "label": "d",
          "text": "Modifica información genética de manera controlada para obtener una característica o producto."
        },
        {
          "label": "e",
          "text": "Forma seres vivos completos a partir de materia sin vida."
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Modifica información genética de manera controlada para obtener una característica o producto.",
      "hint": "Fíjate en el papel del ADN dentro del procedimiento.",
      "correctArgument": "La manipulación genética consiste en intervenir la información hereditaria de un organismo para lograr que exprese una característica o produzca una sustancia determinada. En el procedimiento, las bacterias reciben un fragmento de ADN y producen una proteína útil.",
      "incorrectArgumentsByOption": {
        "a": "Mezcla organismos únicamente mediante reproducción sexual: el procedimiento no usa fecundación ni gametos.",
        "b": "Selecciona organismos solo por su apariencia externa: no se basa en observar rasgos externos, sino en intervenir ADN.",
        "c": "Evita el uso de conocimientos científicos: ocurre lo contrario, requiere conocimiento sobre genes, células y proteínas.",
        "e": "Forma seres vivos completos a partir de materia sin vida: no describe el procedimiento ni corresponde a manipulación genética."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 28,
      "rangeStart": 17,
      "rangeEnd": 28
    },
    {
      "id": "reactivo-29",
      "number": 29,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Fichas para registrar fuentes",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "En una actividad escolar se registraron estos datos:\n\nAutor: Laura Mendoza Ruiz\nTítulo: Caminos de la lluvia\nEditorial: Río Claro\nLugar de publicación: Puebla\nAño: 2022",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué tipo de ficha permite conservar estos datos para identificar una obra consultada?",
      "options": [
        {
          "label": "a",
          "text": "Ficha de resumen"
        },
        {
          "label": "b",
          "text": "Ficha de comentario"
        },
        {
          "label": "c",
          "text": "Ficha bibliográfica"
        },
        {
          "label": "d",
          "text": "Ficha de paráfrasis"
        },
        {
          "label": "e",
          "text": "Ficha de cita textual"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Ficha bibliográfica",
      "hint": "Observa que los datos sirven para identificar una obra completa, no para copiar una idea específica.",
      "correctArgument": "La ficha bibliográfica registra los datos generales de una obra, como autor, título, editorial, lugar y año de publicación. Su función es permitir identificar y localizar la fuente consultada.",
      "incorrectArgumentsByOption": {
        "a": "Ficha de resumen: sirve para sintetizar información, no para registrar formalmente los datos editoriales de una obra.",
        "b": "Ficha de comentario: se usa para anotar una opinión o valoración personal sobre una lectura.",
        "d": "Ficha de paráfrasis: reescribe una idea con otras palabras, pero no se centra en los datos de identificación de la obra.",
        "e": "Ficha de cita textual: conserva un fragmento escrito exactamente como aparece en la fuente, no solo los datos generales de la publicación."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 29,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-30",
      "number": 30,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Orden de párrafos",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Ordena los siguientes enunciados para formar un texto con sentido cronológico.\n\nI. Al finalizar, los vecinos colocaron etiquetas en los estantes y abrieron la biblioteca comunitaria.\nII. Días antes, la coordinadora pidió a los voluntarios reunir libros donados.\nIII. Más tarde, separaron los ejemplares por edad, tema y estado de conservación.\nIV. El sábado por la mañana, limpiaron el salón y acomodaron mesas para revisar los libros.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Cuál es el orden correcto de los enunciados?",
      "options": [
        {
          "label": "a",
          "text": "I, III, II, IV"
        },
        {
          "label": "b",
          "text": "IV, II, I, III"
        },
        {
          "label": "c",
          "text": "II, III, I, IV"
        },
        {
          "label": "d",
          "text": "III, IV, II, I"
        },
        {
          "label": "e",
          "text": "II, IV, III, I"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "II, IV, III, I",
      "hint": "Busca primero la acción de preparación, después el inicio de la jornada, luego la clasificación y al final la apertura.",
      "correctArgument": "El texto inicia con la preparación previa: la coordinadora pide reunir libros. Después, el sábado por la mañana, se limpia y acomoda el salón. Más tarde, los libros se separan por edad, tema y estado. Al finalizar, se colocan etiquetas y se abre la biblioteca. Por eso el orden correcto es II, IV, III, I.",
      "incorrectArgumentsByOption": {
        "a": "I, III, II, IV: comienza con el cierre de la actividad, por lo que rompe el orden temporal.",
        "b": "IV, II, I, III: coloca la jornada del sábado antes de la preparación previa.",
        "c": "II, III, I, IV: pone la apertura antes de limpiar y acomodar el salón.",
        "d": "III, IV, II, I: inicia con la clasificación sin haber explicado primero de dónde salieron los libros ni cómo se preparó el espacio."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 30,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-31",
      "number": 31,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Recursos para desarrollar ideas: paráfrasis",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El consumo responsable consiste en adquirir productos después de pensar si realmente se necesitan, cuánto durarán y qué efecto tendrán en el ambiente. En otras palabras, implica comprar con conciencia y no por impulso.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué recurso se emplea principalmente para desarrollar la idea?",
      "options": [
        {
          "label": "a",
          "text": "Ejemplificación"
        },
        {
          "label": "b",
          "text": "Paráfrasis"
        },
        {
          "label": "c",
          "text": "Narración"
        },
        {
          "label": "d",
          "text": "Contradicción"
        },
        {
          "label": "e",
          "text": "Enumeración cronológica"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Paráfrasis",
      "hint": "La segunda oración vuelve a expresar la primera idea con otras palabras.",
      "correctArgument": "La paráfrasis consiste en expresar una idea con palabras distintas, pero conservando su sentido. En el fragmento, la segunda oración reformula la idea de consumo responsable al decir que se trata de comprar con conciencia y no por impulso.",
      "incorrectArgumentsByOption": {
        "a": "Ejemplificación: no se presentan casos concretos, sino una reformulación de la idea.",
        "c": "Narración: no se cuenta una serie de acontecimientos.",
        "d": "Contradicción: no se oponen dos ideas, sino que se explica la misma idea de otra manera.",
        "e": "Enumeración cronológica: no hay una secuencia de hechos ordenados en el tiempo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 31,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-32",
      "number": 32,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Conectores: causa",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El entrenamiento se suspendió debido a que la cancha quedó inundada por la lluvia.",
        "highlights": [],
        "underlines": [
          "debido a que"
        ]
      },
      "prompt": "La expresión subrayada cumple la función de",
      "options": [
        {
          "label": "a",
          "text": "presentar una causa"
        },
        {
          "label": "b",
          "text": "introducir una consecuencia"
        },
        {
          "label": "c",
          "text": "indicar simultaneidad"
        },
        {
          "label": "d",
          "text": "marcar una comparación"
        },
        {
          "label": "e",
          "text": "cerrar una conclusión"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "presentar una causa",
      "hint": "Pregúntate por qué se suspendió el entrenamiento.",
      "correctArgument": "La expresión «debido a que» introduce la razón por la cual ocurrió la suspensión. La causa es que la cancha quedó inundada por la lluvia.",
      "incorrectArgumentsByOption": {
        "b": "Introducir una consecuencia: la consecuencia es la suspensión, no la expresión que explica el motivo.",
        "c": "Indicar simultaneidad: no señala acciones que ocurren al mismo tiempo.",
        "d": "Marcar una comparación: no compara dos elementos.",
        "e": "Cerrar una conclusión: no resume ni finaliza una argumentación."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 32,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-33",
      "number": 33,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Conectores: tiempo",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Primero, los alumnos revisaron las instrucciones del experimento; después, reunieron los materiales; finalmente, anotaron sus observaciones en una tabla.",
        "highlights": [
          "Primero",
          "después",
          "finalmente"
        ],
        "underlines": []
      },
      "prompt": "Las palabras resaltadas sirven para",
      "options": [
        {
          "label": "a",
          "text": "presentar una causa"
        },
        {
          "label": "b",
          "text": "establecer una comparación"
        },
        {
          "label": "c",
          "text": "negar una idea anterior"
        },
        {
          "label": "d",
          "text": "ordenar temporalmente las acciones"
        },
        {
          "label": "e",
          "text": "introducir una definición"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "ordenar temporalmente las acciones",
      "hint": "Observa que las palabras indican qué ocurrió antes, en medio y al final.",
      "correctArgument": "«Primero», «después» y «finalmente» son conectores temporales. Sirven para organizar las acciones según el orden en que ocurrieron.",
      "incorrectArgumentsByOption": {
        "a": "Presentar una causa: no explican por qué sucedió algo.",
        "b": "Establecer una comparación: no relacionan semejanzas o diferencias.",
        "c": "Negar una idea anterior: no contradicen información previa.",
        "e": "Introducir una definición: no presentan el significado de un concepto."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 33,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-34",
      "number": 34,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Conectores: contraste",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "La escuela instaló nuevos botes para separar residuos; sin embargo, varios estudiantes todavía mezclan papel, plástico y restos de comida.",
        "highlights": [],
        "underlines": [
          "sin embargo"
        ]
      },
      "prompt": "La expresión subrayada funciona principalmente para",
      "options": [
        {
          "label": "a",
          "text": "anunciar una enumeración"
        },
        {
          "label": "b",
          "text": "presentar una causa"
        },
        {
          "label": "c",
          "text": "marcar un contraste entre ideas"
        },
        {
          "label": "d",
          "text": "indicar una consecuencia inevitable"
        },
        {
          "label": "e",
          "text": "señalar simultaneidad"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "marcar un contraste entre ideas",
      "hint": "Compara la primera acción con lo que sigue después de la expresión subrayada.",
      "correctArgument": "«Sin embargo» introduce una idea que se opone parcialmente a la anterior. Aunque la escuela instaló botes para separar residuos, algunos estudiantes aún mezclan distintos materiales.",
      "incorrectArgumentsByOption": {
        "a": "Anunciar una enumeración: no introduce una lista de elementos.",
        "b": "Presentar una causa: no explica el motivo de la instalación de los botes.",
        "d": "Indicar una consecuencia inevitable: la segunda idea no se presenta como resultado obligatorio.",
        "e": "Señalar simultaneidad: no indica que dos acciones ocurran al mismo tiempo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 34,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-35",
      "number": 35,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Puntuación para dar sentido: punto y coma",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "En el festival escolar, el grupo de música interpretó sones, jarabes y huapangos__ el taller de arte mostró grabados, acuarelas y máscaras__ y el club de lectura presentó cuentos, crónicas y poemas.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué signo de puntuación debe colocarse en los espacios en blanco?",
      "options": [
        {
          "label": "a",
          "text": "Comas"
        },
        {
          "label": "b",
          "text": "Punto y coma"
        },
        {
          "label": "c",
          "text": "Dos puntos"
        },
        {
          "label": "d",
          "text": "Punto y seguido"
        },
        {
          "label": "e",
          "text": "Punto y aparte"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Punto y coma",
      "hint": "Cada parte de la oración ya contiene comas internas, por lo que se necesita una pausa mayor para separar los grupos.",
      "correctArgument": "El punto y coma se usa para separar elementos complejos de una enumeración cuando cada grupo ya contiene comas internas. Aquí se separan tres participaciones del festival, y cada una incluye varios elementos.",
      "incorrectArgumentsByOption": {
        "a": "Comas: podrían confundir los grupos principales con los elementos internos de cada grupo.",
        "c": "Dos puntos: sirven para anunciar una enumeración, pero no para separar cada bloque complejo de esta lista.",
        "d": "Punto y seguido: separaría el texto en oraciones independientes de manera innecesaria.",
        "e": "Punto y aparte: marcaría un cambio de párrafo, no una separación dentro de la misma oración."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 35,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-36",
      "number": 36,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Puntuación para dar sentido: dos puntos",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Para la práctica de ciencias se pidieron estos materiales__ vaso medidor, sal, agua, cuchara y recipiente transparente.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué signo de puntuación debe colocarse después de «estos materiales»?",
      "options": [
        {
          "label": "a",
          "text": "Punto y seguido"
        },
        {
          "label": "b",
          "text": "Coma"
        },
        {
          "label": "c",
          "text": "Punto y coma"
        },
        {
          "label": "d",
          "text": "Signos de admiración"
        },
        {
          "label": "e",
          "text": "Dos puntos"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Dos puntos",
      "hint": "El signo debe anunciar la lista de materiales que aparece después.",
      "correctArgument": "Los dos puntos se usan para introducir enumeraciones. En este caso, después de «estos materiales» aparece la lista de objetos solicitados para la práctica.",
      "incorrectArgumentsByOption": {
        "a": "Punto y seguido: cerraría la oración antes de presentar la enumeración.",
        "b": "Coma: no anuncia con suficiente precisión la lista que sigue.",
        "c": "Punto y coma: separa partes complejas, pero aquí se requiere presentar una enumeración.",
        "d": "Signos de admiración: expresan énfasis o sorpresa, no introducen una lista."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 36,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-37",
      "number": 37,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Gramática en contexto: participios",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El informe entregado por el equipo incluía gráficas revisadas, conclusiones corregidas y fotografías seleccionadas.",
        "highlights": [],
        "underlines": [
          "entregado",
          "revisadas",
          "corregidas",
          "seleccionadas"
        ]
      },
      "prompt": "Las palabras subrayadas pertenecen principalmente a la categoría de",
      "options": [
        {
          "label": "a",
          "text": "participios"
        },
        {
          "label": "b",
          "text": "sustantivos"
        },
        {
          "label": "c",
          "text": "adverbios"
        },
        {
          "label": "d",
          "text": "preposiciones"
        },
        {
          "label": "e",
          "text": "pronombres"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "participios",
      "hint": "Estas palabras derivan de verbos y describen el estado de los sustantivos.",
      "correctArgument": "«Entregado», «revisadas», «corregidas» y «seleccionadas» son participios. En el fragmento funcionan como modificadores de sustantivos, porque indican cómo está el informe, las gráficas, las conclusiones y las fotografías.",
      "incorrectArgumentsByOption": {
        "b": "Sustantivos: los sustantivos son «informe», «gráficas», «conclusiones» y «fotografías».",
        "c": "Adverbios: no modifican verbos ni indican modo, tiempo o lugar de una acción.",
        "d": "Preposiciones: no enlazan palabras como «de», «con», «para» o «por».",
        "e": "Pronombres: no sustituyen a un sustantivo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 37,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-38",
      "number": 38,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Tipos de texto: texto de opinión",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Considero que las bibliotecas escolares deben abrir por las tardes, porque muchos estudiantes no tienen un espacio tranquilo para leer en casa. Además, ampliar su horario permitiría consultar libros después de clases y aprovechar mejor los recursos de la escuela.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "El fragmento se clasifica principalmente como texto de opinión porque",
      "options": [
        {
          "label": "a",
          "text": "relata hechos en orden temporal"
        },
        {
          "label": "b",
          "text": "describe físicamente un lugar"
        },
        {
          "label": "c",
          "text": "da instrucciones para realizar una actividad"
        },
        {
          "label": "d",
          "text": "presenta una postura y razones para sostenerla"
        },
        {
          "label": "e",
          "text": "registra datos de una obra consultada"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "presenta una postura y razones para sostenerla",
      "hint": "Busca si el autor defiende una idea personal mediante razones.",
      "correctArgument": "El fragmento expresa una postura: que las bibliotecas escolares deben abrir por las tardes. Además, ofrece razones para sostener esa postura, como la necesidad de un espacio tranquilo y el mejor aprovechamiento de los recursos escolares.",
      "incorrectArgumentsByOption": {
        "a": "Relata hechos en orden temporal: no cuenta una historia ni una secuencia de acontecimientos.",
        "b": "Describe físicamente un lugar: no se centra en características visuales de una biblioteca.",
        "c": "Da instrucciones para realizar una actividad: no presenta pasos que el lector deba seguir.",
        "e": "Registra datos de una obra consultada: no corresponde a una ficha de fuente."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 38,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-39",
      "number": 39,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Publicidad: eslogan e intención del mensaje",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Fragmentos publicitarios para comparar:\n\n«Tu sonrisa, nuestra mejor carta»\n«El sabor de casa en cada bocado»\n«Ahorra agua: cierra la llave mientras te cepillas»\n«Más fresco que la mañana»\n«El color que viste tus días»",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Cuál eslogan pretende lograr un cambio de conducta en el receptor?",
      "options": [
        {
          "label": "a",
          "text": "«Tu sonrisa, nuestra mejor carta»"
        },
        {
          "label": "b",
          "text": "«El sabor de casa en cada bocado»"
        },
        {
          "label": "c",
          "text": "«Ahorra agua: cierra la llave mientras te cepillas»"
        },
        {
          "label": "d",
          "text": "«Más fresco que la mañana»"
        },
        {
          "label": "e",
          "text": "«El color que viste tus días»"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "«Ahorra agua: cierra la llave mientras te cepillas»",
      "hint": "Busca el mensaje que pide realizar una acción concreta.",
      "correctArgument": "Ese eslogan busca modificar la conducta del receptor porque le pide realizar una acción concreta: cerrar la llave mientras se cepilla. Su intención no es solo describir un producto, sino promover un hábito.",
      "incorrectArgumentsByOption": {
        "a": "«Tu sonrisa, nuestra mejor carta»: construye una imagen positiva, pero no pide una acción específica.",
        "b": "«El sabor de casa en cada bocado»: resalta una cualidad afectiva de un producto.",
        "d": "«Más fresco que la mañana»: destaca una cualidad mediante comparación, pero no modifica directamente una conducta.",
        "e": "«El color que viste tus días»: busca asociar el producto con una imagen atractiva, no con una acción concreta."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 39,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-40",
      "number": 40,
      "areaId": "espanol",
      "areaName": "Español",
      "block": "Publicidad: exageración de cualidades",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Textos publicitarios para comparar:\n\n«Pan horneado todos los días»\n«Tan suave que hasta las nubes lo envidian»\n«Crema para manos de uso diario»\n«Agua natural sin azúcar añadida»\n«Cuaderno con cien hojas rayadas»",
        "highlights": [],
        "underlines": []
      },
      "prompt": "Selecciona el ejemplo donde se exageran las cualidades de un producto.",
      "options": [
        {
          "label": "a",
          "text": "«Pan horneado todos los días»"
        },
        {
          "label": "b",
          "text": "«Tan suave que hasta las nubes lo envidian»"
        },
        {
          "label": "c",
          "text": "«Crema para manos de uso diario»"
        },
        {
          "label": "d",
          "text": "«Agua natural sin azúcar añadida»"
        },
        {
          "label": "e",
          "text": "«Cuaderno con cien hojas rayadas»"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "«Tan suave que hasta las nubes lo envidian»",
      "hint": "Busca la frase que atribuye al producto una cualidad imposible de comprobar de manera literal.",
      "correctArgument": "La frase exagera la suavidad del producto al decir que las nubes lo envidian. Esa expresión no debe entenderse literalmente; se usa para hacer más llamativo el mensaje publicitario.",
      "incorrectArgumentsByOption": {
        "a": "«Pan horneado todos los días»: presenta una característica concreta, no una exageración evidente.",
        "c": "«Crema para manos de uso diario»: indica el uso del producto sin exagerar sus efectos.",
        "d": "«Agua natural sin azúcar añadida»: ofrece información directa sobre el producto.",
        "e": "«Cuaderno con cien hojas rayadas»: describe una característica medible del producto."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 40,
      "rangeStart": 29,
      "rangeEnd": 40
    },
    {
      "id": "reactivo-41",
      "number": 41,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Materia y estados: gases en la vida diaria",
      "baseText": null,
      "basePill": null,
      "prompt": "En una práctica, una estudiante tapa la salida de una jeringa con aire y empuja el émbolo; observa que el aire ocupa menos espacio. Después, en otra parte del salón, alguien abre un frasco de perfume y el olor llega a varios compañeros.\n\n¿Qué propiedades de los gases se reconocen en estas dos situaciones?",
      "options": [
        {
          "label": "a",
          "text": "Dureza y brillo"
        },
        {
          "label": "b",
          "text": "Maleabilidad y volumen fijo"
        },
        {
          "label": "c",
          "text": "Fusión y condensación"
        },
        {
          "label": "d",
          "text": "Compresibilidad y difusión"
        },
        {
          "label": "e",
          "text": "Fragilidad y solubilidad"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Compresibilidad y difusión",
      "hint": "Relaciona la primera situación con reducir el espacio ocupado por un gas y la segunda con su dispersión en el aire.",
      "correctArgument": "La compresibilidad es la capacidad de un gas para disminuir su volumen cuando se le aplica presión. Eso ocurre con el aire dentro de la jeringa. La difusión es la dispersión de partículas de una sustancia en otra; por eso el olor del perfume se distribuye en el aire del salón.",
      "incorrectArgumentsByOption": {
        "a": "Dureza y brillo: son propiedades asociadas principalmente con algunos sólidos, no con el comportamiento de los gases.",
        "b": "Maleabilidad y volumen fijo: la maleabilidad se relaciona con sólidos que pueden formar láminas; además, los gases no tienen volumen fijo.",
        "c": "Fusión y condensación: son cambios de estado, no propiedades observadas en las dos situaciones.",
        "e": "Fragilidad y solubilidad: la fragilidad no describe gases y la solubilidad no explica el olor que se dispersa en el aire."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 41,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-42",
      "number": 42,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Propiedades físicas: masa, volumen y densidad",
      "baseText": null,
      "basePill": null,
      "prompt": "Una muestra de metal tiene una masa de 72 g y ocupa un volumen de 24 cm³.\n\n¿Cuál es su densidad?",
      "options": [
        {
          "label": "a",
          "text": "3 g/cm³"
        },
        {
          "label": "b",
          "text": "24 g/cm³"
        },
        {
          "label": "c",
          "text": "48 g/cm³"
        },
        {
          "label": "d",
          "text": "72 g/cm³"
        },
        {
          "label": "e",
          "text": "96 g/cm³"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "3 g/cm³",
      "hint": "La densidad se obtiene dividiendo la masa entre el volumen.",
      "correctArgument": "La densidad se calcula con la expresión:\n\ndensidad = masa/volumen\n\nSustituimos los datos:\n\ndensidad = 72 g/24 cm³\n\n72 ÷ 24 = 3\n\nPor lo tanto, la densidad es:\n\n3 g/cm³",
      "incorrectArgumentsByOption": {
        "b": "24 g/cm³: corresponde al volumen dado, no al resultado de dividir masa entre volumen.",
        "c": "48 g/cm³: resulta de restar 72 - 24, pero la densidad no se calcula con resta.",
        "d": "72 g/cm³: corresponde a la masa, no a la densidad.",
        "e": "96 g/cm³: resulta de sumar 72 + 24, operación que no permite calcular densidad."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 42,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-43",
      "number": 43,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Cambios físicos: conservación de la masa en sistema cerrado",
      "baseText": null,
      "basePill": null,
      "prompt": "En un frasco cerrado se coloca una pequeña cantidad de alcohol líquido. Al calentarlo, el alcohol se evapora y pasa al estado gaseoso, pero el frasco permanece cerrado.\n\n¿Qué propiedad permanece constante durante este cambio físico?",
      "options": [
        {
          "label": "a",
          "text": "La forma del alcohol"
        },
        {
          "label": "b",
          "text": "El estado de agregación"
        },
        {
          "label": "c",
          "text": "El volumen que ocupa el alcohol"
        },
        {
          "label": "d",
          "text": "La distancia entre sus partículas"
        },
        {
          "label": "e",
          "text": "La masa total del alcohol dentro del frasco"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "La masa total del alcohol dentro del frasco",
      "hint": "El alcohol cambia de estado, pero no sale del frasco ni se transforma en otra sustancia.",
      "correctArgument": "Cuando el alcohol se evapora en un frasco cerrado, cambia de líquido a gas, pero sigue siendo alcohol. Como no escapa materia del recipiente, la masa total se conserva.",
      "incorrectArgumentsByOption": {
        "a": "La forma del alcohol: cambia, porque un líquido y un gas no ocupan el espacio de la misma manera.",
        "b": "El estado de agregación: no permanece constante, ya que pasa de líquido a gas.",
        "c": "El volumen que ocupa el alcohol: puede aumentar al transformarse en gas.",
        "d": "La distancia entre sus partículas: cambia, porque en el estado gaseoso las partículas están más separadas que en el líquido."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 43,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-44",
      "number": 44,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Sustancias puras y mezclas: lectura de modelos de partículas",
      "baseText": "Observa los modelos A, B y C. Clasifícalos según el tipo de partículas que muestran.",
      "basePill": null,
      "prompt": "Con base en los modelos, ¿cómo se clasifican correctamente A, B y C?",
      "options": [
        {
          "label": "a",
          "text": "A es elemento, B es mezcla y C es compuesto."
        },
        {
          "label": "b",
          "text": "A es compuesto, B es elemento y C es mezcla."
        },
        {
          "label": "c",
          "text": "A es mezcla, B es elemento y C es compuesto."
        },
        {
          "label": "d",
          "text": "A es mezcla, B es compuesto y C es elemento."
        },
        {
          "label": "e",
          "text": "A es compuesto, B es mezcla y C es elemento."
        }
      ],
      "correctOption": "c",
      "correctOptionText": "A es mezcla, B es elemento y C es compuesto.",
      "hint": "Identifica primero si hay un solo tipo de partícula o varios tipos mezclados.",
      "correctArgument": "El Modelo A es una mezcla porque contiene partículas diferentes que no están unidas químicamente entre sí. El Modelo B es un elemento porque muestra partículas formadas por átomos del mismo tipo. El Modelo C es un compuesto porque sus partículas son iguales, pero están formadas por átomos de distintos tipos unidos.",
      "incorrectArgumentsByOption": {
        "a": "A es elemento, B es mezcla y C es compuesto: clasifica mal A y B, porque A tiene más de un tipo de partícula y B solo muestra un tipo.",
        "b": "A es compuesto, B es elemento y C es mezcla: A no es compuesto porque sus partículas no están unidas químicamente; C no es mezcla porque sus partículas son iguales.",
        "d": "A es mezcla, B es compuesto y C es elemento: A está bien, pero B no es compuesto porque tiene átomos del mismo tipo, y C no es elemento porque tiene átomos distintos.",
        "e": "A es compuesto, B es mezcla y C es elemento: clasifica incorrectamente los tres modelos."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/quimica/reactivo-44-modelos-particulas.png",
        "alt": "Química, reactivo 44: Tres modelos de partículas identificados como A, B y C para clasificar mezcla, elemento y compuesto.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/quimica/reactivo-44-modelos-particulas.png",
          "alt": "Química, reactivo 44: Tres modelos de partículas identificados como A, B y C para clasificar mezcla, elemento y compuesto.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 44,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-45",
      "number": 45,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Estructura del átomo: partículas subatómicas",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál afirmación describe correctamente una partícula subatómica?",
      "options": [
        {
          "label": "a",
          "text": "Los electrones tienen carga positiva y se ubican en el núcleo."
        },
        {
          "label": "b",
          "text": "Los protones tienen carga positiva y se ubican en el núcleo."
        },
        {
          "label": "c",
          "text": "Los neutrones tienen carga negativa y se ubican alrededor del núcleo."
        },
        {
          "label": "d",
          "text": "Los protones tienen carga negativa y se ubican fuera del núcleo."
        },
        {
          "label": "e",
          "text": "Los electrones no tienen carga y forman la mayor parte de la masa del átomo."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Los protones tienen carga positiva y se ubican en el núcleo.",
      "hint": "Recuerda qué partículas están en el núcleo y cuál de ellas tiene carga positiva.",
      "correctArgument": "Los protones son partículas subatómicas con carga positiva y se localizan en el núcleo del átomo. Junto con los neutrones, forman la mayor parte de la masa atómica.",
      "incorrectArgumentsByOption": {
        "a": "Los electrones tienen carga positiva y se ubican en el núcleo: los electrones tienen carga negativa y se encuentran alrededor del núcleo.",
        "c": "Los neutrones tienen carga negativa y se ubican alrededor del núcleo: los neutrones no tienen carga y están en el núcleo.",
        "d": "Los protones tienen carga negativa y se ubican fuera del núcleo: los protones tienen carga positiva y se ubican en el núcleo.",
        "e": "Los electrones no tienen carga y forman la mayor parte de la masa del átomo: los electrones tienen carga negativa y su masa es muy pequeña en comparación con protones y neutrones."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 45,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-46",
      "number": 46,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Número de masa: protones y neutrones",
      "baseText": null,
      "basePill": null,
      "prompt": "Un átomo tiene número atómico 13 y número de masa 27.\n\n¿Cuántos neutrones tiene?",
      "options": [
        {
          "label": "a",
          "text": "13"
        },
        {
          "label": "b",
          "text": "15"
        },
        {
          "label": "c",
          "text": "27"
        },
        {
          "label": "d",
          "text": "40"
        },
        {
          "label": "e",
          "text": "14"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "14",
      "hint": "El número atómico indica la cantidad de protones. Para obtener los neutrones, compara ese dato con el número de masa.",
      "correctArgument": "El número de masa se obtiene sumando protones y neutrones:\n\nA = p + n\n\nEl número atómico indica los protones:\n\np = 13\n\nEl número de masa es:\n\nA = 27\n\nEntonces:\n\nn = A - p\n\nn = 27 - 13 = 14\n\nPor lo tanto, el átomo tiene 14 neutrones.",
      "incorrectArgumentsByOption": {
        "a": "13: corresponde al número de protones, no al número de neutrones.",
        "b": "15: resulta de una resta incorrecta.",
        "c": "27: corresponde al número de masa completo, no solo a los neutrones.",
        "d": "40: suma el número atómico y el número de masa, pero los neutrones no se calculan así."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 46,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-47",
      "number": 47,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Fórmulas químicas: conteo de átomos",
      "baseText": null,
      "basePill": null,
      "prompt": "En la fórmula Ca(OH)₂, ¿cuántos átomos hay en total dentro de una unidad de la sustancia?",
      "options": [
        {
          "label": "a",
          "text": "2 átomos"
        },
        {
          "label": "b",
          "text": "3 átomos"
        },
        {
          "label": "c",
          "text": "4 átomos"
        },
        {
          "label": "d",
          "text": "5 átomos"
        },
        {
          "label": "e",
          "text": "6 átomos"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "5 átomos",
      "hint": "El subíndice fuera del paréntesis multiplica a todos los átomos que están dentro de él.",
      "correctArgument": "La fórmula Ca(OH)₂ se interpreta así:\n\nHay 1 átomo de calcio:\n\nCa = 1\n\nDentro del paréntesis hay O y H. El subíndice 2 multiplica a ambos:\n\nO = 2\n\nH = 2\n\nTotal de átomos:\n\n1 + 2 + 2 = 5\n\nPor eso hay 5 átomos en total.",
      "incorrectArgumentsByOption": {
        "a": "2 átomos: solo toma el subíndice 2 y omite el resto de la fórmula.",
        "b": "3 átomos: cuenta Ca, O y H, pero no aplica el subíndice fuera del paréntesis.",
        "c": "4 átomos: deja fuera uno de los átomos al hacer el conteo.",
        "e": "6 átomos: multiplica de más y no respeta la estructura de la fórmula."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 47,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-48",
      "number": 48,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Tabla periódica: número atómico",
      "baseText": null,
      "basePill": null,
      "prompt": "En una ficha de la tabla periódica aparece un elemento con número atómico 17.\n\n¿Qué indica ese número?",
      "options": [
        {
          "label": "a",
          "text": "La cantidad de neutrones del átomo"
        },
        {
          "label": "b",
          "text": "La suma de protones y neutrones"
        },
        {
          "label": "c",
          "text": "La cantidad de protones del átomo"
        },
        {
          "label": "d",
          "text": "La cantidad de moléculas del elemento"
        },
        {
          "label": "e",
          "text": "La masa de una muestra del elemento en gramos"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "La cantidad de protones del átomo",
      "hint": "El número atómico se relaciona con la identidad del elemento.",
      "correctArgument": "El número atómico indica cuántos protones tiene el átomo de un elemento. Por eso un elemento con número atómico 17 tiene 17 protones en su núcleo.",
      "incorrectArgumentsByOption": {
        "a": "La cantidad de neutrones del átomo: los neutrones se obtienen comparando número de masa y número atómico, no con el número atómico solo.",
        "b": "La suma de protones y neutrones: eso corresponde al número de masa.",
        "d": "La cantidad de moléculas del elemento: el número atómico no cuenta moléculas.",
        "e": "La masa de una muestra del elemento en gramos: eso depende de la cantidad de sustancia medida, no del número atómico."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 48,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-49",
      "number": 49,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Enlace químico: fuerzas que unen átomos",
      "baseText": null,
      "basePill": null,
      "prompt": "En el cloruro de sodio, el ion sodio tiene carga positiva y el ion cloruro tiene carga negativa. La unión entre ellos se mantiene principalmente por fuerzas de naturaleza",
      "options": [
        {
          "label": "a",
          "text": "eléctrica"
        },
        {
          "label": "b",
          "text": "sonora"
        },
        {
          "label": "c",
          "text": "gravitacional"
        },
        {
          "label": "d",
          "text": "luminosa"
        },
        {
          "label": "e",
          "text": "muscular"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "eléctrica",
      "hint": "Las cargas opuestas se atraen.",
      "correctArgument": "Los enlaces químicos se deben a interacciones entre cargas eléctricas. En el cloruro de sodio, los iones con cargas opuestas se atraen y esa atracción mantiene unida la sustancia.",
      "incorrectArgumentsByOption": {
        "b": "Sonora: el sonido no mantiene unidos a los átomos ni a los iones.",
        "c": "Gravitacional: la gravedad existe, pero a escala atómica no explica la unión química principal.",
        "d": "Luminosa: la luz puede participar en algunos procesos, pero no es la fuerza que mantiene unidos a los iones.",
        "e": "Muscular: no tiene relación con las interacciones entre partículas químicas."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 49,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-50",
      "number": 50,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Cantidad de sustancia: idea de mol",
      "baseText": null,
      "basePill": null,
      "prompt": "En química se usa el mol de manera parecida a como se usa la docena en la vida cotidiana. Si una docena sirve para contar 12 objetos, el mol sirve principalmente para",
      "options": [
        {
          "label": "a",
          "text": "medir únicamente la temperatura de una sustancia"
        },
        {
          "label": "b",
          "text": "separar mezclas por filtración"
        },
        {
          "label": "c",
          "text": "cambiar una sustancia sólida a líquida"
        },
        {
          "label": "d",
          "text": "identificar el color de una sustancia"
        },
        {
          "label": "e",
          "text": "contar cantidades muy grandes de partículas"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "contar cantidades muy grandes de partículas",
      "hint": "Piensa en una unidad que ayuda a contar partículas tan pequeñas que no pueden contarse una por una.",
      "correctArgument": "El mol es una unidad de cantidad de sustancia que permite contar partículas muy pequeñas, como átomos, moléculas o iones, en cantidades enormes. Es útil porque esas partículas no pueden contarse directamente una por una.",
      "incorrectArgumentsByOption": {
        "a": "Medir únicamente la temperatura de una sustancia: la temperatura se mide con unidades como grados Celsius o kelvin, no con mol.",
        "b": "Separar mezclas por filtración: la filtración es un método de separación, no una unidad para contar partículas.",
        "c": "Cambiar una sustancia sólida a líquida: eso describe un cambio de estado, no el uso del mol.",
        "d": "Identificar el color de una sustancia: el color es una propiedad observable, no una cantidad de sustancia."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 50,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-51",
      "number": 51,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Ecuaciones químicas: lectura de coeficientes",
      "baseText": null,
      "basePill": null,
      "prompt": "Interpreta la siguiente ecuación química:\n\nN₂ + 3H₂ → 2NH₃\n\n¿Cuál lectura corresponde a los coeficientes de la ecuación?",
      "options": [
        {
          "label": "a",
          "text": "1 molécula de nitrógeno más 2 moléculas de hidrógeno forman 3 moléculas de amoniaco."
        },
        {
          "label": "b",
          "text": "1 molécula de nitrógeno más 3 moléculas de hidrógeno forman 2 moléculas de amoniaco."
        },
        {
          "label": "c",
          "text": "2 moléculas de nitrógeno más 3 moléculas de hidrógeno forman 1 molécula de amoniaco."
        },
        {
          "label": "d",
          "text": "3 moléculas de nitrógeno más 1 molécula de hidrógeno forman 2 moléculas de amoniaco."
        },
        {
          "label": "e",
          "text": "1 molécula de nitrógeno más 1 molécula de hidrógeno forman 1 molécula de amoniaco."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "1 molécula de nitrógeno más 3 moléculas de hidrógeno forman 2 moléculas de amoniaco.",
      "hint": "Cuando no aparece número antes de una fórmula, se entiende que el coeficiente es 1.",
      "correctArgument": "En la ecuación:\n\nN₂ + 3H₂ → 2NH₃\n\nEl N₂ no tiene coeficiente escrito, por lo que se interpreta como 1 molécula de nitrógeno. El 3H₂ indica 3 moléculas de hidrógeno. El 2NH₃ indica 2 moléculas de amoniaco. Por eso la lectura correcta es: 1 molécula de nitrógeno más 3 moléculas de hidrógeno forman 2 moléculas de amoniaco.",
      "incorrectArgumentsByOption": {
        "a": "Cambia los coeficientes de hidrógeno y amoniaco, por lo que no respeta la ecuación.",
        "c": "Usa 2 moléculas de nitrógeno, pero el coeficiente de N₂ es 1.",
        "d": "Invierte la proporción de nitrógeno e hidrógeno.",
        "e": "Ignora los coeficientes 3 y 2 que aparecen en la ecuación."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 51,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-52",
      "number": 52,
      "areaId": "quimica",
      "areaName": "Química",
      "block": "Oxidación y reducción: ejemplos cotidianos",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál conjunto contiene únicamente procesos relacionados con oxidación y reducción?",
      "options": [
        {
          "label": "a",
          "text": "Derretir mantequilla, evaporar agua y cortar papel"
        },
        {
          "label": "b",
          "text": "Congelar jugo, triturar sal y mezclar arena con agua"
        },
        {
          "label": "c",
          "text": "Sublimar yodo, hervir alcohol y romper vidrio"
        },
        {
          "label": "d",
          "text": "Corrosión de un clavo, combustión de una vela y oscurecimiento de una manzana cortada"
        },
        {
          "label": "e",
          "text": "Disolver azúcar, filtrar café y doblar alambre"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Corrosión de un clavo, combustión de una vela y oscurecimiento de una manzana cortada",
      "hint": "Busca cambios químicos en los que intervenga el oxígeno o haya transferencia de electrones.",
      "correctArgument": "La corrosión de un clavo, la combustión de una vela y el oscurecimiento de una manzana cortada son procesos químicos relacionados con oxidación y reducción. En ellos se forman sustancias nuevas y hay cambios en la composición de la materia.",
      "incorrectArgumentsByOption": {
        "a": "Derretir mantequilla, evaporar agua y cortar papel: son cambios físicos, porque no necesariamente forman sustancias nuevas.",
        "b": "Congelar jugo, triturar sal y mezclar arena con agua: son procesos físicos o mezclas, no reacciones de oxidación y reducción.",
        "c": "Sublimar yodo, hervir alcohol y romper vidrio: son cambios de estado o cambios mecánicos.",
        "e": "Disolver azúcar, filtrar café y doblar alambre: son procesos físicos o de separación, no procesos de oxidación y reducción."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 52,
      "rangeStart": 41,
      "rangeEnd": 52
    },
    {
      "id": "reactivo-53",
      "number": 53,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Constantinopla: cambio en rutas y comercio",
      "baseText": null,
      "basePill": null,
      "prompt": "En el siglo XV, varios comerciantes europeos tuvieron mayores dificultades para obtener especias, seda y otros productos asiáticos por las rutas tradicionales del Mediterráneo oriental. Este problema se agravó después de que Constantinopla quedó bajo control otomano.\n\n¿Qué consecuencia tuvo esta situación para reinos como Portugal y Castilla?",
      "options": [
        {
          "label": "a",
          "text": "Cancelaron el comercio con Asia y se concentraron únicamente en el campo."
        },
        {
          "label": "b",
          "text": "Abandonaron la navegación porque el Atlántico dejó de ser útil."
        },
        {
          "label": "c",
          "text": "Fundaron fábricas industriales para sustituir todos los productos orientales."
        },
        {
          "label": "d",
          "text": "Trasladaron sus capitales políticas al norte de África."
        },
        {
          "label": "e",
          "text": "Buscaron rutas marítimas alternas para llegar a Asia."
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Buscaron rutas marítimas alternas para llegar a Asia.",
      "hint": "Relaciona el cierre o encarecimiento de rutas comerciales con la exploración por mar.",
      "correctArgument": "La toma de Constantinopla por los turcos otomanos dificultó y encareció el comercio europeo con Asia por rutas tradicionales. Esto impulsó a reinos europeos, especialmente Portugal y Castilla, a explorar rutas marítimas alternativas por el Atlántico y alrededor de África.",
      "incorrectArgumentsByOption": {
        "a": "Cancelaron el comercio con Asia y se concentraron únicamente en el campo: no abandonaron el comercio asiático, sino que buscaron nuevas formas de llegar a esos productos.",
        "b": "Abandonaron la navegación porque el Atlántico dejó de ser útil: ocurrió lo contrario, el Atlántico ganó importancia para la exploración.",
        "c": "Fundaron fábricas industriales para sustituir todos los productos orientales: la industrialización ocurrió mucho después y no explica la respuesta inmediata del siglo XV.",
        "d": "Trasladaron sus capitales políticas al norte de África: no fue una consecuencia de este proceso comercial."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 53,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-54",
      "number": 54,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Santo Oficio: qué era y qué hacía",
      "baseText": null,
      "basePill": null,
      "prompt": "En la Nueva España, una institución revisaba libros, vigilaba creencias religiosas y podía iniciar procesos contra personas acusadas de herejía o prácticas contrarias a la doctrina católica.\n\n¿A qué institución se refiere la descripción?",
      "options": [
        {
          "label": "a",
          "text": "Real Hacienda"
        },
        {
          "label": "b",
          "text": "Tribunal del Santo Oficio"
        },
        {
          "label": "c",
          "text": "Cabildo indígena"
        },
        {
          "label": "d",
          "text": "Consulado de Comerciantes"
        },
        {
          "label": "e",
          "text": "Casa de Moneda"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Tribunal del Santo Oficio",
      "hint": "Busca la institución relacionada con el control religioso y la vigilancia de la ortodoxia católica.",
      "correctArgument": "El Tribunal del Santo Oficio, también conocido como Inquisición, tenía funciones de vigilancia religiosa. En la Nueva España buscaba mantener la ortodoxia católica y perseguir ideas o prácticas consideradas herejías.",
      "incorrectArgumentsByOption": {
        "a": "Real Hacienda: administraba ingresos, impuestos y recursos económicos de la Corona, no la vigilancia religiosa.",
        "c": "Cabildo indígena: era una forma de gobierno local en comunidades indígenas, no un tribunal religioso.",
        "d": "Consulado de Comerciantes: representaba intereses comerciales, no doctrinales.",
        "e": "Casa de Moneda: se encargaba de acuñar moneda, no de controlar creencias."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 54,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-55",
      "number": 55,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Nueva España: minería y metales como base económica",
      "baseText": null,
      "basePill": null,
      "prompt": "Durante el periodo novohispano, regiones como Zacatecas, Guanajuato y San Luis Potosí impulsaron caminos, comercio, haciendas y crecimiento urbano debido a una actividad económica central.\n\n¿Cuál fue esa actividad?",
      "options": [
        {
          "label": "a",
          "text": "Extracción de plata y otros metales preciosos"
        },
        {
          "label": "b",
          "text": "Producción de automóviles"
        },
        {
          "label": "c",
          "text": "Explotación petrolera industrial"
        },
        {
          "label": "d",
          "text": "Exportación masiva de aparatos eléctricos"
        },
        {
          "label": "e",
          "text": "Turismo internacional"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Extracción de plata y otros metales preciosos",
      "hint": "Piensa en la actividad que dio riqueza a muchas zonas del centro y norte de la Nueva España.",
      "correctArgument": "La minería, en especial la extracción de plata, fue una de las bases económicas de la Nueva España. Generó riqueza, atrajo población, abrió caminos y fortaleció actividades relacionadas como agricultura, ganadería y comercio.",
      "incorrectArgumentsByOption": {
        "b": "Producción de automóviles: corresponde al periodo industrial contemporáneo, no al virreinato.",
        "c": "Explotación petrolera industrial: el petróleo se volvió central mucho después, no durante la economía novohispana.",
        "d": "Exportación masiva de aparatos eléctricos: es anacrónica para el periodo colonial.",
        "e": "Turismo internacional: no fue la actividad económica que sostuvo la riqueza novohispana."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 55,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-56",
      "number": 56,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Revolución Francesa: ideas e influencia en movimientos del siglo XIX",
      "baseText": null,
      "basePill": null,
      "prompt": "Un grupo de criollos americanos lee textos políticos donde se afirma que todos los ciudadanos deben ser iguales ante la ley, que los gobernantes no deben tener poder absoluto y que la autoridad debe provenir del pueblo.\n\n¿Qué ideas influyeron en este tipo de pensamiento independentista?",
      "options": [
        {
          "label": "a",
          "text": "Defensa del derecho divino de los reyes"
        },
        {
          "label": "b",
          "text": "Restauración de privilegios de nacimiento"
        },
        {
          "label": "c",
          "text": "Principios de igualdad jurídica y soberanía popular"
        },
        {
          "label": "d",
          "text": "Aceptación total del absolutismo monárquico"
        },
        {
          "label": "e",
          "text": "Rechazo de toda participación ciudadana"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Principios de igualdad jurídica y soberanía popular",
      "hint": "Identifica las ideas políticas que cuestionan los privilegios y el poder absoluto.",
      "correctArgument": "La Revolución Francesa difundió ideas como libertad, igualdad ante la ley y soberanía popular. Estas ideas influyeron en movimientos políticos del siglo XIX, incluyendo procesos de independencia en América.",
      "incorrectArgumentsByOption": {
        "a": "Defensa del derecho divino de los reyes: esa idea justificaba la monarquía absoluta, no los movimientos independentistas.",
        "b": "Restauración de privilegios de nacimiento: contradice la idea de igualdad ante la ley.",
        "d": "Aceptación total del absolutismo monárquico: se opone a los principios revolucionarios.",
        "e": "Rechazo de toda participación ciudadana: la soberanía popular implica participación política del pueblo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 56,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-57",
      "number": 57,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Primera Guerra Mundial: características generales",
      "baseText": null,
      "basePill": null,
      "prompt": "En el frente occidental de la Primera Guerra Mundial, los soldados pasaban largos periodos protegidos en zanjas profundas, desde donde resistían ataques y defendían posiciones. El avance territorial era lento y costoso.\n\n¿Qué característica militar se describe?",
      "options": [
        {
          "label": "a",
          "text": "Guerra relámpago"
        },
        {
          "label": "b",
          "text": "Guerra naval exclusiva"
        },
        {
          "label": "c",
          "text": "Guerra nuclear"
        },
        {
          "label": "d",
          "text": "Guerra de trincheras"
        },
        {
          "label": "e",
          "text": "Guerra de independencia colonial"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Guerra de trincheras",
      "hint": "Observa que el combate se organiza alrededor de posiciones fijas excavadas en el terreno.",
      "correctArgument": "La guerra de trincheras fue una característica representativa de la Primera Guerra Mundial. Consistía en líneas defensivas excavadas en el suelo, donde los soldados permanecían durante mucho tiempo y los avances eran difíciles.",
      "incorrectArgumentsByOption": {
        "a": "Guerra relámpago: se relaciona con movimientos rápidos y coordinados, especialmente en la Segunda Guerra Mundial.",
        "b": "Guerra naval exclusiva: la descripción se refiere a combate terrestre, no solo marítimo.",
        "c": "Guerra nuclear: las armas nucleares no se usaron en la Primera Guerra Mundial.",
        "e": "Guerra de independencia colonial: no corresponde al contexto europeo de 1914 a 1918."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 57,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-58",
      "number": 58,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Primera Guerra Mundial: consecuencias",
      "baseText": null,
      "basePill": null,
      "prompt": "Al terminar la Primera Guerra Mundial, desaparecieron o se debilitaron grandes imperios europeos y se modificaron fronteras. De ese proceso surgieron nuevos Estados y tensiones políticas.\n\n¿Cuál opción resume mejor una consecuencia del conflicto?",
      "options": [
        {
          "label": "a",
          "text": "Regreso completo al orden europeo anterior a 1914"
        },
        {
          "label": "b",
          "text": "Reorganización territorial y caída de imperios"
        },
        {
          "label": "c",
          "text": "Unión inmediata de todos los países europeos"
        },
        {
          "label": "d",
          "text": "Eliminación definitiva de conflictos internacionales"
        },
        {
          "label": "e",
          "text": "Fortalecimiento del poder zarista en Rusia"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Reorganización territorial y caída de imperios",
      "hint": "Observa qué ocurrió con imperios como el austrohúngaro, el otomano y el ruso.",
      "correctArgument": "La Primera Guerra Mundial provocó cambios profundos en el mapa político. Imperios como el austrohúngaro y el otomano se desintegraron, mientras que en Rusia el zarismo había caído durante el proceso revolucionario.",
      "incorrectArgumentsByOption": {
        "a": "Regreso completo al orden europeo anterior a 1914: el conflicto modificó fronteras y estructuras políticas.",
        "c": "Unión inmediata de todos los países europeos: no se formó un solo país europeo después de la guerra.",
        "d": "Eliminación definitiva de conflictos internacionales: las tensiones continuaron y contribuyeron a nuevos conflictos.",
        "e": "Fortalecimiento del poder zarista en Rusia: el zarismo desapareció, no se fortaleció."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 58,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-59",
      "number": 59,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Guerra Fría: bloques y tensiones principales",
      "baseText": null,
      "basePill": null,
      "prompt": "Después de la Segunda Guerra Mundial, Estados Unidos y la Unión Soviética compitieron por influencia política, económica, tecnológica y militar. Aunque evitaron una guerra frontal directa entre ellos, apoyaron bandos opuestos en distintos conflictos regionales.\n\nEste proceso se conoce como",
      "options": [
        {
          "label": "a",
          "text": "Guerra Fría"
        },
        {
          "label": "b",
          "text": "Reforma protestante"
        },
        {
          "label": "c",
          "text": "Revolución Industrial"
        },
        {
          "label": "d",
          "text": "Paz Armada del siglo XIX"
        },
        {
          "label": "e",
          "text": "Expansión ultramarina portuguesa"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Guerra Fría",
      "hint": "Se trata de una rivalidad entre dos bloques ideológicos después de 1945.",
      "correctArgument": "La Guerra Fría fue la confrontación política, ideológica, económica y militar entre el bloque capitalista liderado por Estados Unidos y el bloque socialista encabezado por la Unión Soviética. Se caracterizó por tensiones indirectas, carrera armamentista y conflictos regionales.",
      "incorrectArgumentsByOption": {
        "b": "Reforma protestante: ocurrió en el siglo XVI y fue un movimiento religioso.",
        "c": "Revolución Industrial: fue un proceso económico y tecnológico iniciado antes, no una rivalidad entre bloques posteriores a 1945.",
        "d": "Paz Armada del siglo XIX: se refiere al periodo previo a la Primera Guerra Mundial.",
        "e": "Expansión ultramarina portuguesa: pertenece a los procesos de exploración marítima de los siglos XV y XVI."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 59,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-60",
      "number": 60,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Guerra del Golfo: petróleo como factor del conflicto",
      "baseText": null,
      "basePill": null,
      "prompt": "En 1990, Iraq invadió Kuwait. La respuesta internacional fue rápida porque la región del Golfo Pérsico tenía gran importancia económica y estratégica para el abastecimiento mundial de energía.\n\n¿Qué recurso explica en gran parte ese interés internacional?",
      "options": [
        {
          "label": "a",
          "text": "Diamantes"
        },
        {
          "label": "b",
          "text": "Trigo"
        },
        {
          "label": "c",
          "text": "Madera tropical"
        },
        {
          "label": "d",
          "text": "Uranio"
        },
        {
          "label": "e",
          "text": "Petróleo"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Petróleo",
      "hint": "Piensa en el recurso energético más asociado con el Golfo Pérsico.",
      "correctArgument": "El Golfo Pérsico es una región de enorme importancia petrolera. La invasión de Kuwait por Iraq generó preocupación internacional porque podía afectar el control y suministro de petróleo.",
      "incorrectArgumentsByOption": {
        "a": "Diamantes: no son el recurso estratégico principal de la región.",
        "b": "Trigo: no explica el interés geopolítico central en el Golfo Pérsico.",
        "c": "Madera tropical: no corresponde a las características económicas principales de esa zona.",
        "d": "Uranio: no fue el recurso que explicó el interés internacional inmediato en el conflicto."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 60,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-61",
      "number": 61,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Guerra México Estados Unidos de 1846 a 1847: Texas y expansionismo",
      "baseText": null,
      "basePill": null,
      "prompt": "A mediados del siglo XIX, Estados Unidos buscaba expandirse hacia el oeste. En ese contexto, la anexión de Texas y las disputas sobre los límites territoriales aumentaron la tensión con México.\n\n¿Qué factor se relaciona directamente con la guerra entre México y Estados Unidos de 1846 a 1847?",
      "options": [
        {
          "label": "a",
          "text": "La independencia de Cuba"
        },
        {
          "label": "b",
          "text": "La caída de Constantinopla"
        },
        {
          "label": "c",
          "text": "El expansionismo estadounidense y la anexión de Texas"
        },
        {
          "label": "d",
          "text": "La creación de la Organización de las Naciones Unidas"
        },
        {
          "label": "e",
          "text": "La Revolución rusa"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "El expansionismo estadounidense y la anexión de Texas",
      "hint": "Ubica el conflicto en el siglo XIX y relaciónalo con territorio, frontera y expansión.",
      "correctArgument": "La anexión de Texas por Estados Unidos y su política expansionista fueron factores directos del conflicto con México. La disputa territorial intensificó las tensiones hasta llegar a la guerra de 1846 a 1847.",
      "incorrectArgumentsByOption": {
        "a": "La independencia de Cuba: corresponde a otro proceso histórico y no explica la guerra México Estados Unidos.",
        "b": "La caída de Constantinopla: ocurrió en 1453 y pertenece a otro contexto.",
        "d": "La creación de la Organización de las Naciones Unidas: ocurrió después de la Segunda Guerra Mundial.",
        "e": "La Revolución rusa: sucedió en el siglo XX y no se relaciona con ese conflicto mexicano."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 61,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-62",
      "number": 62,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Constitución de 1917: artículo 27 y su tema central",
      "baseText": null,
      "basePill": null,
      "prompt": "En una clase se discute qué artículo constitucional permitió al Estado mexicano regular la propiedad de tierras, aguas y recursos del subsuelo, como minerales e hidrocarburos.\n\n¿Qué principio corresponde al artículo 27 de la Constitución de 1917?",
      "options": [
        {
          "label": "a",
          "text": "La Nación tiene dominio originario sobre tierras, aguas y recursos naturales."
        },
        {
          "label": "b",
          "text": "Los cargos públicos deben heredarse dentro de una misma familia."
        },
        {
          "label": "c",
          "text": "Las tierras comunales no pueden ser reconocidas por la ley."
        },
        {
          "label": "d",
          "text": "Los recursos del subsuelo pertenecen únicamente a empresas extranjeras."
        },
        {
          "label": "e",
          "text": "La educación religiosa debe ser obligatoria en todas las escuelas."
        }
      ],
      "correctOption": "a",
      "correctOptionText": "La Nación tiene dominio originario sobre tierras, aguas y recursos naturales.",
      "hint": "El artículo se relaciona con tierra, subsuelo y recursos naturales.",
      "correctArgument": "El artículo 27 de la Constitución de 1917 establece que la propiedad de tierras y aguas corresponde originariamente a la Nación. También permite regular recursos naturales y el subsuelo en beneficio del país.",
      "incorrectArgumentsByOption": {
        "b": "Los cargos públicos deben heredarse dentro de una misma familia: eso contradice un sistema republicano.",
        "c": "Las tierras comunales no pueden ser reconocidas por la ley: el artículo 27 se relaciona con derechos agrarios y propiedad social.",
        "d": "Los recursos del subsuelo pertenecen únicamente a empresas extranjeras: el artículo sostiene el dominio de la Nación.",
        "e": "La educación religiosa debe ser obligatoria en todas las escuelas: ese tema no corresponde al artículo 27."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 62,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-63",
      "number": 63,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "Modernismo en México",
      "baseText": null,
      "basePill": null,
      "prompt": "Un estudiante identifica un texto mexicano de fines del siglo XIX con lenguaje cuidado, musicalidad, búsqueda de belleza formal e influencia de corrientes literarias internacionales.\n\n¿Qué movimiento literario se relaciona mejor con esas características?",
      "options": [
        {
          "label": "a",
          "text": "Realismo mágico"
        },
        {
          "label": "b",
          "text": "Neoclasicismo novohispano"
        },
        {
          "label": "c",
          "text": "Literatura prehispánica"
        },
        {
          "label": "d",
          "text": "Modernismo"
        },
        {
          "label": "e",
          "text": "Crónica de conquista"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Modernismo",
      "hint": "Ubica un movimiento de renovación estética asociado con autores como Manuel Gutiérrez Nájera.",
      "correctArgument": "El Modernismo fue un movimiento literario de renovación estética que cuidó la musicalidad, las imágenes poéticas y la belleza formal del lenguaje. En México, Manuel Gutiérrez Nájera es uno de sus representantes importantes.",
      "incorrectArgumentsByOption": {
        "a": "Realismo mágico: pertenece a una etapa literaria posterior y se asocia más con la narrativa latinoamericana del siglo XX.",
        "b": "Neoclasicismo novohispano: corresponde a un periodo anterior y a otros rasgos estéticos.",
        "c": "Literatura prehispánica: pertenece a culturas originarias antes de la conquista europea.",
        "e": "Crónica de conquista: se relaciona con relatos del periodo de conquista, no con la renovación literaria de fines del siglo XIX."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 63,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-64",
      "number": 64,
      "areaId": "historia",
      "areaName": "Historia",
      "block": "México contemporáneo: instituciones electorales",
      "baseText": null,
      "basePill": null,
      "prompt": "Después de las elecciones federales de 1988, surgió una fuerte demanda social para dar mayor confianza y organización a los procesos electorales. En ese contexto se creó una institución electoral federal antes del actual INE.\n\n¿Cuál fue esa institución?",
      "options": [
        {
          "label": "a",
          "text": "Banco de México"
        },
        {
          "label": "b",
          "text": "Instituto Federal Electoral"
        },
        {
          "label": "c",
          "text": "Secretaría de Educación Pública"
        },
        {
          "label": "d",
          "text": "Comisión Federal de Electricidad"
        },
        {
          "label": "e",
          "text": "Instituto Mexicano del Seguro Social"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Instituto Federal Electoral",
      "hint": "Busca la institución que organizó elecciones federales antes de transformarse en el actual INE.",
      "correctArgument": "El Instituto Federal Electoral fue creado en 1990 para organizar las elecciones federales y responder a la necesidad de mayor confianza en los procesos electorales después de la crisis política de 1988.",
      "incorrectArgumentsByOption": {
        "a": "Banco de México: se encarga de funciones monetarias y financieras, no de elecciones.",
        "c": "Secretaría de Educación Pública: organiza políticas educativas, no comicios federales.",
        "d": "Comisión Federal de Electricidad: se relaciona con el servicio eléctrico.",
        "e": "Instituto Mexicano del Seguro Social: atiende seguridad social y servicios médicos, no organización electoral."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 64,
      "rangeStart": 53,
      "rangeEnd": 64
    },
    {
      "id": "reactivo-65",
      "number": 65,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Operaciones con números con signo y jerarquía básica",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál es el resultado de la siguiente operación?\n\n-18 + 4(-3) - [(-20) ÷ 5]",
      "options": [
        {
          "label": "a",
          "text": "-34"
        },
        {
          "label": "b",
          "text": "-30"
        },
        {
          "label": "c",
          "text": "-26"
        },
        {
          "label": "d",
          "text": "-22"
        },
        {
          "label": "e",
          "text": "26"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "-26",
      "hint": "Primero resuelve la multiplicación y la división; después cuida el signo al restar un número negativo.",
      "correctArgument": "Primero se resuelven multiplicación y división:\n\n4(-3) = -12\n\n(-20) ÷ 5 = -4\n\nAhora sustituimos en la expresión:\n\n-18 + (-12) - (-4)\n\nRestar un número negativo equivale a sumar:\n\n-18 - 12 + 4\n\n-30 + 4 = -26\n\nPor eso el resultado correcto es -26.",
      "incorrectArgumentsByOption": {
        "a": "-34: resulta de restar 4 al final, pero se debía sumar porque aparece -(-4).",
        "b": "-30: omite el efecto de restar el resultado de la división.",
        "d": "-22: cambia incorrectamente el signo de uno de los términos.",
        "e": "26: conserva la cantidad, pero cambia el signo del resultado final."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 65,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-66",
      "number": 66,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Fracciones y decimales: conversión y operación",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál es el resultado de la siguiente operación?\n\n5/6 - 0.25 + 2/3",
      "options": [
        {
          "label": "a",
          "text": "1.25"
        },
        {
          "label": "b",
          "text": "0.75"
        },
        {
          "label": "c",
          "text": "1.50"
        },
        {
          "label": "d",
          "text": "1.75"
        },
        {
          "label": "e",
          "text": "2.25"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "1.25",
      "hint": "Convierte 0.25 a fracción y usa denominadores comunes.",
      "correctArgument": "Primero convertimos el decimal:\n\n0.25 = 1/4\n\nLa operación queda:\n\n5/6 - 1/4 + 2/3\n\nSumamos primero las fracciones con denominador 6:\n\n5/6 + 2/3 = 5/6 + 4/6 = 9/6 = 3/2\n\nAhora restamos:\n\n3/2 - 1/4\n\nConvertimos a cuartos:\n\n3/2 = 6/4\n\n6/4 - 1/4 = 5/4\n\n5/4 = 1.25\n\nPor eso el resultado correcto es 1.25.",
      "incorrectArgumentsByOption": {
        "b": "0.75: aparece si se resta demasiado al convertir el decimal.",
        "c": "1.50: corresponde a sumar 5/6 + 2/3, pero omite restar 0.25.",
        "d": "1.75: suma el decimal en lugar de restarlo.",
        "e": "2.25: excede el resultado porque combina mal las fracciones y el decimal."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 66,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-67",
      "number": 67,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Porcentajes: aumento y descuento sucesivo",
      "baseText": null,
      "basePill": null,
      "prompt": "Una calculadora costaba 360 pesos. Primero su precio aumentó 15% y después se aplicó un descuento de 10% sobre el nuevo precio.\n\n¿Cuál fue el precio final?",
      "options": [
        {
          "label": "a",
          "text": "342 pesos"
        },
        {
          "label": "b",
          "text": "360 pesos"
        },
        {
          "label": "c",
          "text": "378 pesos"
        },
        {
          "label": "d",
          "text": "396 pesos"
        },
        {
          "label": "e",
          "text": "372.60 pesos"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "372.60 pesos",
      "hint": "El descuento se aplica después del aumento, no sobre el precio original.",
      "correctArgument": "Primero calculamos el aumento de 15% sobre 360:\n\n15% = 0.15\n\n360(0.15) = 54\n\nNuevo precio:\n\n360 + 54 = 414\n\nDespués se aplica 10% de descuento sobre 414:\n\n10% = 0.10\n\n414(0.10) = 41.40\n\nPrecio final:\n\n414 - 41.40 = 372.60\n\nPor eso el precio final fue 372.60 pesos.",
      "incorrectArgumentsByOption": {
        "a": "342 pesos: aplica una disminución directa de 5% sobre el precio original, pero los porcentajes sucesivos no se combinan así.",
        "b": "360 pesos: supone que el aumento de 15% y el descuento de 10% se cancelan, pero se aplican sobre cantidades distintas.",
        "c": "378 pesos: se acerca, pero no calcula el descuento sobre el precio aumentado.",
        "d": "396 pesos: corresponde a un descuento incompleto o a un aumento mal aplicado."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 67,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-68",
      "number": 68,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Álgebra básica: simplificación de expresiones",
      "baseText": null,
      "basePill": null,
      "prompt": "Simplifica la siguiente expresión:\n\n5x - 2(3x - 4) + 7",
      "options": [
        {
          "label": "a",
          "text": "x + 15"
        },
        {
          "label": "b",
          "text": "-x + 8"
        },
        {
          "label": "c",
          "text": "-x + 15"
        },
        {
          "label": "d",
          "text": "11x - 1"
        },
        {
          "label": "e",
          "text": "-x - 15"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "-x + 15",
      "hint": "Distribuye el -2 en todo el paréntesis antes de juntar términos semejantes.",
      "correctArgument": "Primero distribuimos -2:\n\n-2(3x - 4) = -6x + 8\n\nLa expresión queda:\n\n5x - 6x + 8 + 7\n\nJuntamos términos semejantes:\n\n5x - 6x = -x\n\n8 + 7 = 15\n\nEntonces:\n\n5x - 2(3x - 4) + 7 = -x + 15\n\nPor eso la expresión simplificada es -x + 15.",
      "incorrectArgumentsByOption": {
        "a": "x + 15: distribuye mal el signo negativo y deja positivo el término con x.",
        "b": "-x + 8: omite sumar el 7 final.",
        "d": "11x - 1: suma los coeficientes como si no hubiera distribución negativa.",
        "e": "-x - 15: cambia el signo de los términos independientes."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 68,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-69",
      "number": 69,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Ecuaciones de primer grado con texto",
      "baseText": null,
      "basePill": null,
      "prompt": "Cuatro veces un número menos 6 es igual a dos veces ese mismo número más 22.\n\n¿Cuál es ese número?",
      "options": [
        {
          "label": "a",
          "text": "12"
        },
        {
          "label": "b",
          "text": "14"
        },
        {
          "label": "c",
          "text": "16"
        },
        {
          "label": "d",
          "text": "18"
        },
        {
          "label": "e",
          "text": "28"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "14",
      "hint": "Traduce el enunciado a una ecuación y reúne los términos con la incógnita en un solo lado.",
      "correctArgument": "Sea x el número.\n\n«Cuatro veces un número menos 6» se representa como:\n\n4x - 6\n\n«Dos veces ese mismo número más 22» se representa como:\n\n2x + 22\n\nLa ecuación es:\n\n4x - 6 = 2x + 22\n\nRestamos 2x en ambos lados:\n\n2x - 6 = 22\n\nSumamos 6:\n\n2x = 28\n\nDividimos entre 2:\n\nx = 14\n\nPor eso el número es 14.",
      "incorrectArgumentsByOption": {
        "a": "12: al sustituirlo, 4(12)-6 = 42 y 2(12)+22 = 46; no son iguales.",
        "c": "16: al sustituirlo, 4(16)-6 = 58 y 2(16)+22 = 54; no son iguales.",
        "d": "18: produce valores más altos y no satisface la igualdad.",
        "e": "28: corresponde a un paso intermedio, no al valor final del número."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 69,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-70",
      "number": 70,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Sistemas de 2 × 2",
      "baseText": null,
      "basePill": null,
      "prompt": "Resuelve el siguiente sistema de ecuaciones:\n\n3x + 2y = 22\n\nx + y = 8",
      "options": [
        {
          "label": "a",
          "text": "x = 4,  y = 4"
        },
        {
          "label": "b",
          "text": "x = 5,  y = 3"
        },
        {
          "label": "c",
          "text": "x = 2,  y = 6"
        },
        {
          "label": "d",
          "text": "x = 6,  y = 2"
        },
        {
          "label": "e",
          "text": "x = 7,  y = 1"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "x = 6,  y = 2",
      "hint": "Despeja una variable en la segunda ecuación y sustitúyela en la primera.",
      "correctArgument": "De la segunda ecuación:\n\nx + y = 8\n\nDespejamos y:\n\ny = 8 - x\n\nSustituimos en la primera ecuación:\n\n3x + 2(8 - x) = 22\n\nDistribuimos:\n\n3x + 16 - 2x = 22\n\nSimplificamos:\n\nx + 16 = 22\n\nRestamos 16:\n\nx = 6\n\nSustituimos en y = 8 - x:\n\ny = 8 - 6 = 2\n\nPor eso la solución es:\n\nx = 6, y = 2",
      "incorrectArgumentsByOption": {
        "a": "x = 4,  y = 4: cumple x + y = 8, pero 3(4) + 2(4) = 20, no 22.",
        "b": "x = 5,  y = 3: cumple x + y = 8, pero 3(5) + 2(3) = 21, no 22.",
        "c": "x = 2,  y = 6: cumple x + y = 8, pero 3(2) + 2(6) = 18, no 22.",
        "e": "x = 7,  y = 1: cumple x + y = 8, pero 3(7) + 2(1) = 23, no 22."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 70,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-71",
      "number": 71,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Ecuación cuadrática por factorización",
      "baseText": null,
      "basePill": null,
      "prompt": "Selecciona los valores de x que satisfacen la ecuación:\n\nx² - 8x + 15 = 0",
      "options": [
        {
          "label": "a",
          "text": "1 y 15"
        },
        {
          "label": "b",
          "text": "2 y 6"
        },
        {
          "label": "c",
          "text": "3 y 5"
        },
        {
          "label": "d",
          "text": "-3 y -5"
        },
        {
          "label": "e",
          "text": "4 y 4"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "3 y 5",
      "hint": "Busca dos números que multiplicados den 15 y sumados den 8.",
      "correctArgument": "La ecuación se factoriza así:\n\nx² - 8x + 15 = (x - 3)(x - 5)\n\nPara que el producto sea cero:\n\nx - 3 = 0\n\no\n\nx - 5 = 0\n\nEntonces:\n\nx = 3\n\ny\n\nx = 5\n\nPor eso los valores que satisfacen la ecuación son 3 y 5.",
      "incorrectArgumentsByOption": {
        "a": "1 y 15: multiplican 15, pero suman 16, no 8.",
        "b": "2 y 6: suman 8, pero multiplican 12, no 15.",
        "d": "-3 y -5: sus signos no corresponden, porque la ecuación se factoriza con x - 3 y x - 5.",
        "e": "4 y 4: suman 8, pero multiplican 16, no 15."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 71,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-72",
      "number": 72,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Lectura de tablas y datos",
      "baseText": "La siguiente tabla muestra la asistencia a talleres de regularización durante una semana.",
      "basePill": null,
      "prompt": "¿Qué taller tuvo la mayor asistencia total durante la semana?",
      "options": [
        {
          "label": "a",
          "text": "Taller B"
        },
        {
          "label": "b",
          "text": "Taller A"
        },
        {
          "label": "c",
          "text": "Taller C"
        },
        {
          "label": "d",
          "text": "Taller D"
        },
        {
          "label": "e",
          "text": "Taller A y Taller D"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Taller B",
      "hint": "Suma la asistencia de cada taller durante los cinco días y compara los totales.",
      "correctArgument": "Sumamos la asistencia semanal de cada taller.\n\nTaller A:\n\n18 + 20 + 15 + 17 + 16 = 86\n\nTaller B:\n\n14 + 24 + 19 + 18 + 15 = 90\n\nTaller C:\n\n20 + 16 + 18 + 12 + 17 = 83\n\nTaller D:\n\n16 + 17 + 20 + 19 + 14 = 86\n\nEl total mayor es 90, correspondiente al Taller B.",
      "incorrectArgumentsByOption": {
        "b": "Taller A: tuvo 86 asistentes en total, menos que el Taller B.",
        "c": "Taller C: tuvo 83 asistentes, que es el total menor de la tabla.",
        "d": "Taller D: tuvo 86 asistentes, igual que el Taller A, pero menos que el Taller B.",
        "e": "Taller A y Taller D: ambos empatan con 86, pero no son los de mayor asistencia total."
      },
      "visual": {
        "kind": "table",
        "position": "base",
        "hasHorizontalScroll": true,
        "caption": "La siguiente tabla muestra la asistencia a talleres de regularización durante una semana.",
        "headers": [
          "Taller",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes"
        ],
        "rows": [
          [
            "Taller A",
            "18",
            "20",
            "15",
            "17",
            "16"
          ],
          [
            "Taller B",
            "14",
            "24",
            "19",
            "18",
            "15"
          ],
          [
            "Taller C",
            "20",
            "16",
            "18",
            "12",
            "17"
          ],
          [
            "Taller D",
            "16",
            "17",
            "20",
            "19",
            "14"
          ]
        ]
      },
      "visuals": [
        {
          "kind": "table",
          "position": "base",
          "hasHorizontalScroll": true,
          "caption": "La siguiente tabla muestra la asistencia a talleres de regularización durante una semana.",
          "headers": [
            "Taller",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes"
          ],
          "rows": [
            [
              "Taller A",
              "18",
              "20",
              "15",
              "17",
              "16"
            ],
            [
              "Taller B",
              "14",
              "24",
              "19",
              "18",
              "15"
            ],
            [
              "Taller C",
              "20",
              "16",
              "18",
              "12",
              "17"
            ],
            [
              "Taller D",
              "16",
              "17",
              "20",
              "19",
              "14"
            ]
          ]
        }
      ],
      "sourceOrder": 72,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-73",
      "number": 73,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Lectura de gráficas sencillas",
      "baseText": "Observa la gráfica y compara los cambios entre días consecutivos.",
      "basePill": null,
      "prompt": "De acuerdo con la gráfica, ¿entre qué dos días consecutivos hubo la mayor disminución en el consumo de agua?",
      "options": [
        {
          "label": "a",
          "text": "Lunes a martes"
        },
        {
          "label": "b",
          "text": "Martes a miércoles"
        },
        {
          "label": "c",
          "text": "Miércoles a jueves"
        },
        {
          "label": "d",
          "text": "Lunes a viernes"
        },
        {
          "label": "e",
          "text": "Jueves a viernes"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Jueves a viernes",
      "hint": "Compara cuánto baja la gráfica de un día al siguiente, no solo cuál día tuvo el menor consumo.",
      "correctArgument": "Calculamos los cambios entre días consecutivos:\n\nDe lunes a martes:\n\n96 - 88 = 8\n\nDe martes a miércoles:\n\n88 - 78 = 10\n\nDe miércoles a jueves no hubo disminución, sino aumento:\n\n82 - 78 = 4\n\nDe jueves a viernes:\n\n82 - 66 = 16\n\nLa mayor disminución fue de 16 litros, entre jueves y viernes.",
      "incorrectArgumentsByOption": {
        "a": "Lunes a martes: hubo disminución de 8 litros, pero no fue la mayor.",
        "b": "Martes a miércoles: hubo disminución de 10 litros, menor que 16.",
        "c": "Miércoles a jueves: no hubo disminución, sino aumento.",
        "d": "Lunes a viernes: compara días no consecutivos, pero el planteamiento pide dos días consecutivos."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/matematicas/reactivo-73-grafica-consumo-agua.png",
        "alt": "Matemáticas, reactivo 73: Gráfica de líneas del consumo diario de agua para comparar cambios entre días consecutivos.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/matematicas/reactivo-73-grafica-consumo-agua.png",
          "alt": "Matemáticas, reactivo 73: Gráfica de líneas del consumo diario de agua para comparar cambios entre días consecutivos.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 73,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-74",
      "number": 74,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Geometría: ángulos alternos internos",
      "baseText": "Observa el diagrama e identifica el par de ángulos alternos internos.",
      "basePill": null,
      "prompt": "¿Cuál de los siguientes pares forma ángulos alternos internos?",
      "options": [
        {
          "label": "a",
          "text": "1 y 5"
        },
        {
          "label": "b",
          "text": "3 y 4"
        },
        {
          "label": "c",
          "text": "5 y 6"
        },
        {
          "label": "d",
          "text": "3 y 6"
        },
        {
          "label": "e",
          "text": "2 y 7"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "3 y 6",
      "hint": "Los ángulos alternos internos están entre las dos rectas paralelas y en lados opuestos de la transversal.",
      "correctArgument": "Los ángulos interiores son los que quedan entre las rectas paralelas:\n\n3,  4,  5,  6\n\nLos alternos internos deben estar dentro de las paralelas y en lados opuestos de la transversal. El ángulo 3 está en el interior y a un lado de la transversal; el ángulo 6 también está en el interior, pero al lado opuesto. Por eso 3 y 6 forman un par de ángulos alternos internos.",
      "incorrectArgumentsByOption": {
        "a": "1 y 5: el ángulo 1 es exterior, por lo que no puede formar un par alterno interno.",
        "b": "3 y 4: ambos son interiores, pero están en la misma intersección, no alternan entre las dos rectas.",
        "c": "5 y 6: ambos son interiores, pero están en la misma intersección.",
        "e": "2 y 7: ambos son exteriores, no interiores."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/matematicas/reactivo-74-angulos-alternos-internos.png",
        "alt": "Matemáticas, reactivo 74: Diagrama de dos rectas paralelas cortadas por una transversal con ángulos numerados.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/matematicas/reactivo-74-angulos-alternos-internos.png",
          "alt": "Matemáticas, reactivo 74: Diagrama de dos rectas paralelas cortadas por una transversal con ángulos numerados.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 74,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-75",
      "number": 75,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Medición: área de figura compuesta",
      "baseText": null,
      "basePill": null,
      "prompt": "Un terreno está formado por un rectángulo de 18 m de largo y 9 m de ancho. A uno de sus lados se le agrega un jardín triangular cuya base mide 6 m y cuya altura mide 9 m.\n\n¿Cuál es el área total del terreno?",
      "options": [
        {
          "label": "a",
          "text": "162 m²"
        },
        {
          "label": "b",
          "text": "189 m²"
        },
        {
          "label": "c",
          "text": "216 m²"
        },
        {
          "label": "d",
          "text": "243 m²"
        },
        {
          "label": "e",
          "text": "270 m²"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "189 m²",
      "hint": "Calcula por separado el área del rectángulo y el área del triángulo; después suma ambas.",
      "correctArgument": "Primero calculamos el área del rectángulo:\n\nA = 18 × 9 = 162\n\nEl área del rectángulo es:\n\n162 m²\n\nAhora calculamos el área del triángulo:\n\nA = b × h/2\n\nA = 6 × 9/2\n\nA = 54/2 = 27\n\nEl área del triángulo es:\n\n27 m²\n\nÁrea total:\n\n162 + 27 = 189\n\nPor eso el área total del terreno es:\n\n189 m²",
      "incorrectArgumentsByOption": {
        "a": "162 m²: solo considera el rectángulo y omite el jardín triangular.",
        "c": "216 m²: suma una región mayor que la del triángulo descrito.",
        "d": "243 m²: se obtiene al tratar incorrectamente el triángulo como si fuera otro rectángulo completo.",
        "e": "270 m²: excede el área real porque no respeta las fórmulas de las figuras."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/matematicas/reactivo-75-area-figura-compuesta.png",
        "alt": "Matemáticas, reactivo 75: Diagrama de terreno compuesto por un rectángulo y un jardín triangular, solo como referencia visual de medidas.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/matematicas/reactivo-75-area-figura-compuesta.png",
          "alt": "Matemáticas, reactivo 75: Diagrama de terreno compuesto por un rectángulo y un jardín triangular, solo como referencia visual de medidas.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 75,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-76",
      "number": 76,
      "areaId": "matematicas",
      "areaName": "Matemáticas",
      "block": "Medición: volumen y comparación de sólidos",
      "baseText": null,
      "basePill": null,
      "prompt": "Un cubo tiene aristas de 7 cm. Un prisma rectangular mide 10 cm de largo, 4 cm de ancho y 5 cm de alto.\n\n¿Por cuántos centímetros cúbicos es mayor el volumen del cubo que el volumen del prisma?",
      "options": [
        {
          "label": "a",
          "text": "83 cm³"
        },
        {
          "label": "b",
          "text": "120 cm³"
        },
        {
          "label": "c",
          "text": "143 cm³"
        },
        {
          "label": "d",
          "text": "200 cm³"
        },
        {
          "label": "e",
          "text": "343 cm³"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "143 cm³",
      "hint": "Calcula primero el volumen de cada sólido y después resta el menor al mayor.",
      "correctArgument": "El volumen del cubo se calcula elevando la arista al cubo:\n\nV = 7³\n\nV = 7 × 7 × 7 = 343\n\nEl volumen del cubo es:\n\n343 cm³\n\nEl volumen del prisma rectangular se calcula multiplicando largo, ancho y alto:\n\nV = 10 × 4 × 5\n\nV = 200\n\nEl volumen del prisma es:\n\n200 cm³\n\nAhora restamos:\n\n343 - 200 = 143\n\nPor eso el volumen del cubo es mayor por:\n\n143 cm³",
      "incorrectArgumentsByOption": {
        "a": "83 cm³: corresponde a una resta incorrecta entre los volúmenes.",
        "b": "120 cm³: no corresponde al volumen de ninguno de los dos sólidos ni a su diferencia.",
        "d": "200 cm³: es el volumen del prisma rectangular, no la diferencia.",
        "e": "343 cm³: es el volumen del cubo, pero el planteamiento pide cuánto mayor es respecto al prisma."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/matematicas/reactivo-76-volumen-solidos.png",
        "alt": "Matemáticas, reactivo 76: Diagrama comparativo neutral de un cubo y un prisma rectangular con sus medidas.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/matematicas/reactivo-76-volumen-solidos.png",
          "alt": "Matemáticas, reactivo 76: Diagrama comparativo neutral de un cubo y un prisma rectangular con sus medidas.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 76,
      "rangeStart": 65,
      "rangeEnd": 76
    },
    {
      "id": "reactivo-77",
      "number": 77,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Comprensión lectora: sentido global",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Los humedales urbanos suelen parecer terrenos abandonados, pero cumplen funciones ambientales importantes. Durante la temporada de lluvias actúan como esponjas naturales: retienen parte del agua, reducen inundaciones y permiten que algunas sustancias contaminantes se filtren antes de llegar a ríos o lagos. Además, sirven como refugio para aves, insectos, anfibios y plantas que difícilmente sobrevivirían entre avenidas, edificios y estacionamientos.\n\nDurante muchos años, varios humedales fueron rellenados para construir viviendas, centros comerciales o vialidades. Se pensaba que eran espacios inútiles o insalubres. Sin embargo, investigaciones recientes han mostrado que conservarlos puede disminuir daños por lluvias intensas y ayudar a regular la temperatura en zonas urbanas. Aun así, su protección enfrenta obstáculos: presión inmobiliaria, basura, descargas de agua contaminada y falta de vigilancia. Algunos especialistas plantean que restaurar humedales y conectarlos mediante corredores verdes podría mejorar la calidad ambiental de las ciudades.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "Según el sentido global del texto, los humedales urbanos",
      "options": [
        {
          "label": "a",
          "text": "son espacios sin utilidad que deben reemplazarse por construcciones."
        },
        {
          "label": "b",
          "text": "solo sirven para almacenar basura y agua contaminada."
        },
        {
          "label": "c",
          "text": "impiden todo crecimiento de las ciudades modernas."
        },
        {
          "label": "d",
          "text": "cumplen funciones ambientales valiosas, aunque enfrentan amenazas."
        },
        {
          "label": "e",
          "text": "ya no pueden recuperarse porque fueron destruidos por completo."
        }
      ],
      "correctOption": "d",
      "correctOptionText": "cumplen funciones ambientales valiosas, aunque enfrentan amenazas.",
      "hint": "Identifica la valoración general que hace el texto sobre los humedales y los problemas que enfrentan.",
      "correctArgument": "El texto explica que los humedales urbanos retienen agua, reducen inundaciones, filtran contaminantes y sirven como refugio para seres vivos. También señala que enfrentan presión inmobiliaria, basura, descargas contaminantes y falta de vigilancia. Por eso la idea global es que tienen valor ambiental, pero están amenazados.",
      "incorrectArgumentsByOption": {
        "a": "Son espacios sin utilidad que deben reemplazarse por construcciones: contradice el texto, porque se explican varias funciones ambientales importantes.",
        "b": "Solo sirven para almacenar basura y agua contaminada: reduce el contenido del texto a un problema, pero omite sus beneficios.",
        "c": "Impiden todo crecimiento de las ciudades modernas: el texto no dice que el crecimiento urbano sea imposible, sino que debe considerar su conservación.",
        "e": "Ya no pueden recuperarse porque fueron destruidos por completo: el texto menciona la posibilidad de restaurarlos, por lo que no los presenta como irrecuperables."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 77,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-78",
      "number": 78,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Comprensión lectora: relación causa consecuencia",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Los humedales urbanos suelen parecer terrenos abandonados, pero cumplen funciones ambientales importantes. Durante la temporada de lluvias actúan como esponjas naturales: retienen parte del agua, reducen inundaciones y permiten que algunas sustancias contaminantes se filtren antes de llegar a ríos o lagos. Además, sirven como refugio para aves, insectos, anfibios y plantas que difícilmente sobrevivirían entre avenidas, edificios y estacionamientos.\n\nDurante muchos años, varios humedales fueron rellenados para construir viviendas, centros comerciales o vialidades. Se pensaba que eran espacios inútiles o insalubres. Sin embargo, investigaciones recientes han mostrado que conservarlos puede disminuir daños por lluvias intensas y ayudar a regular la temperatura en zonas urbanas. Aun así, su protección enfrenta obstáculos: presión inmobiliaria, basura, descargas de agua contaminada y falta de vigilancia. Algunos especialistas plantean que restaurar humedales y conectarlos mediante corredores verdes podría mejorar la calidad ambiental de las ciudades.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "De acuerdo con el texto, una causa por la que varios humedales urbanos fueron rellenados fue que",
      "options": [
        {
          "label": "a",
          "text": "no retenían agua durante la temporada de lluvias."
        },
        {
          "label": "b",
          "text": "se les consideraba espacios inútiles o insalubres."
        },
        {
          "label": "c",
          "text": "todos habían perdido por completo sus especies."
        },
        {
          "label": "d",
          "text": "producían más contaminación que las vialidades."
        },
        {
          "label": "e",
          "text": "impedían que existieran aves e insectos."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "se les consideraba espacios inútiles o insalubres.",
      "hint": "Busca en el segundo párrafo la razón que explica por qué se rellenaron esos espacios.",
      "correctArgument": "El texto afirma que durante muchos años varios humedales fueron rellenados y enseguida explica que «se pensaba que eran espacios inútiles o insalubres». Esa idea funcionó como una razón para sustituirlos por construcciones.",
      "incorrectArgumentsByOption": {
        "a": "No retenían agua durante la temporada de lluvias: el texto dice lo contrario, porque los describe como esponjas naturales.",
        "c": "Todos habían perdido por completo sus especies: el texto no afirma eso.",
        "d": "Producían más contaminación que las vialidades: el texto no compara los humedales con las vialidades de esa manera.",
        "e": "Impedían que existieran aves e insectos: el texto señala que sirven como refugio para esos seres vivos."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 78,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-79",
      "number": 79,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Comprensión lectora: hipótesis",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Los humedales urbanos suelen parecer terrenos abandonados, pero cumplen funciones ambientales importantes. Durante la temporada de lluvias actúan como esponjas naturales: retienen parte del agua, reducen inundaciones y permiten que algunas sustancias contaminantes se filtren antes de llegar a ríos o lagos. Además, sirven como refugio para aves, insectos, anfibios y plantas que difícilmente sobrevivirían entre avenidas, edificios y estacionamientos.\n\nDurante muchos años, varios humedales fueron rellenados para construir viviendas, centros comerciales o vialidades. Se pensaba que eran espacios inútiles o insalubres. Sin embargo, investigaciones recientes han mostrado que conservarlos puede disminuir daños por lluvias intensas y ayudar a regular la temperatura en zonas urbanas. Aun así, su protección enfrenta obstáculos: presión inmobiliaria, basura, descargas de agua contaminada y falta de vigilancia. Algunos especialistas plantean que restaurar humedales y conectarlos mediante corredores verdes podría mejorar la calidad ambiental de las ciudades.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Cuál de los siguientes enunciados funciona como una hipótesis dentro del texto?",
      "options": [
        {
          "label": "a",
          "text": "Los humedales urbanos retienen parte del agua durante la temporada de lluvias."
        },
        {
          "label": "b",
          "text": "Algunas sustancias contaminantes pueden filtrarse antes de llegar a ríos o lagos."
        },
        {
          "label": "c",
          "text": "Durante muchos años varios humedales fueron rellenados."
        },
        {
          "label": "d",
          "text": "La protección de los humedales enfrenta presión inmobiliaria y falta de vigilancia."
        },
        {
          "label": "e",
          "text": "Restaurar humedales y conectarlos mediante corredores verdes podría mejorar la calidad ambiental de las ciudades."
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Restaurar humedales y conectarlos mediante corredores verdes podría mejorar la calidad ambiental de las ciudades.",
      "hint": "Una hipótesis plantea una posibilidad que aún requiere comprobarse completamente.",
      "correctArgument": "La opción e) expresa una posibilidad mediante la palabra «podría». No se presenta como un hecho comprobado en todos los casos, sino como una propuesta de especialistas que puede investigarse o ponerse a prueba.",
      "incorrectArgumentsByOption": {
        "a": "Los humedales urbanos retienen parte del agua durante la temporada de lluvias: el texto lo presenta como una función, no como hipótesis.",
        "b": "Algunas sustancias contaminantes pueden filtrarse antes de llegar a ríos o lagos: se menciona como función ambiental.",
        "c": "Durante muchos años varios humedales fueron rellenados: es un dato histórico del texto.",
        "d": "La protección de los humedales enfrenta presión inmobiliaria y falta de vigilancia: se presenta como obstáculo actual, no como posibilidad por comprobar."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 79,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-80",
      "number": 80,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Comprensión lectora: tema central",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Los humedales urbanos suelen parecer terrenos abandonados, pero cumplen funciones ambientales importantes. Durante la temporada de lluvias actúan como esponjas naturales: retienen parte del agua, reducen inundaciones y permiten que algunas sustancias contaminantes se filtren antes de llegar a ríos o lagos. Además, sirven como refugio para aves, insectos, anfibios y plantas que difícilmente sobrevivirían entre avenidas, edificios y estacionamientos.\n\nDurante muchos años, varios humedales fueron rellenados para construir viviendas, centros comerciales o vialidades. Se pensaba que eran espacios inútiles o insalubres. Sin embargo, investigaciones recientes han mostrado que conservarlos puede disminuir daños por lluvias intensas y ayudar a regular la temperatura en zonas urbanas. Aun así, su protección enfrenta obstáculos: presión inmobiliaria, basura, descargas de agua contaminada y falta de vigilancia. Algunos especialistas plantean que restaurar humedales y conectarlos mediante corredores verdes podría mejorar la calidad ambiental de las ciudades.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Cuál es el tema central del texto?",
      "options": [
        {
          "label": "a",
          "text": "La importancia ambiental y conservación de los humedales urbanos."
        },
        {
          "label": "b",
          "text": "La construcción de centros comerciales en zonas húmedas."
        },
        {
          "label": "c",
          "text": "Las especies de aves que viven únicamente en estacionamientos."
        },
        {
          "label": "d",
          "text": "El uso de sensores para medir la temperatura en las ciudades."
        },
        {
          "label": "e",
          "text": "La historia completa de todas las vialidades urbanas."
        }
      ],
      "correctOption": "a",
      "correctOptionText": "La importancia ambiental y conservación de los humedales urbanos.",
      "hint": "El tema central debe abarcar los dos párrafos, no solo un detalle aislado.",
      "correctArgument": "El texto explica qué son los humedales urbanos, qué funciones cumplen, por qué fueron afectados y por qué conviene protegerlos o restaurarlos. Por eso el tema central es su importancia ambiental y conservación.",
      "incorrectArgumentsByOption": {
        "b": "La construcción de centros comerciales en zonas húmedas: aparece como un ejemplo de transformación, pero no resume todo el texto.",
        "c": "Las especies de aves que viven únicamente en estacionamientos: el texto no afirma eso y no se centra en aves.",
        "d": "El uso de sensores para medir la temperatura en las ciudades: no es un contenido del texto.",
        "e": "La historia completa de todas las vialidades urbanas: es demasiado amplia y ajena al propósito del fragmento."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 80,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-81",
      "number": 81,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Lectura aplicada: fábula y comprensión literal",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El zorro y el cántaro\n\nUn zorro sediento encontró un cántaro medio lleno de agua junto a una cerca. Como la abertura era estrecha, metió la cabeza con cuidado y bebió hasta calmar la sed. Cuando quiso salir, el cuello del cántaro lo atrapó.\n\nUn cuervo, que lo miraba desde una rama, le dijo:\n«Rompe el cántaro contra la piedra y quedarás libre».\n\nEl zorro respondió:\n«No puedo hacerlo. Mira cómo brilla. Sería una lástima romper algo tan hermoso».\n\nPasaron las horas. El dueño del cántaro volvió, encontró al zorro atrapado y lo espantó con un palo. Desde lo alto, el cuervo murmuró:\n«Quien prefiere conservar la apariencia antes que salvarse, termina perdiendo ambas cosas».",
        "highlights": [],
        "underlines": []
      },
      "prompt": "En la fábula, el zorro permanece atrapado principalmente porque",
      "options": [
        {
          "label": "a",
          "text": "el cuervo le impide acercarse a la piedra."
        },
        {
          "label": "b",
          "text": "el cántaro estaba completamente vacío."
        },
        {
          "label": "c",
          "text": "se niega a romper el cántaro por valorar más su apariencia."
        },
        {
          "label": "d",
          "text": "el dueño del cántaro lo encerró desde el inicio."
        },
        {
          "label": "e",
          "text": "no alcanza a beber agua antes de quedar atrapado."
        }
      ],
      "correctOption": "c",
      "correctOptionText": "se niega a romper el cántaro por valorar más su apariencia.",
      "hint": "Observa qué solución le propone el cuervo y por qué el zorro la rechaza.",
      "correctArgument": "El cuervo le propone romper el cántaro para quedar libre. El zorro rechaza esa solución porque considera que el cántaro es hermoso y no quiere destruirlo. Por eso sigue atrapado.",
      "incorrectArgumentsByOption": {
        "a": "El cuervo le impide acercarse a la piedra: el cuervo intenta ayudarlo, no detenerlo.",
        "b": "El cántaro estaba completamente vacío: el texto dice que estaba medio lleno de agua.",
        "d": "El dueño del cántaro lo encerró desde el inicio: el zorro se atrapó al meter la cabeza en el cántaro.",
        "e": "No alcanza a beber agua antes de quedar atrapado: sí bebe hasta calmar la sed."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 81,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-82",
      "number": 82,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Lectura aplicada: fábula y personificación",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El zorro y el cántaro\n\nUn zorro sediento encontró un cántaro medio lleno de agua junto a una cerca. Como la abertura era estrecha, metió la cabeza con cuidado y bebió hasta calmar la sed. Cuando quiso salir, el cuello del cántaro lo atrapó.\n\nUn cuervo, que lo miraba desde una rama, le dijo:\n«Rompe el cántaro contra la piedra y quedarás libre».\n\nEl zorro respondió:\n«No puedo hacerlo. Mira cómo brilla. Sería una lástima romper algo tan hermoso».\n\nPasaron las horas. El dueño del cántaro volvió, encontró al zorro atrapado y lo espantó con un palo. Desde lo alto, el cuervo murmuró:\n«Quien prefiere conservar la apariencia antes que salvarse, termina perdiendo ambas cosas».",
        "highlights": [],
        "underlines": []
      },
      "prompt": "En el texto, los animales hablan porque se trata de una fábula en la que",
      "options": [
        {
          "label": "a",
          "text": "se describen animales como en un reporte científico."
        },
        {
          "label": "b",
          "text": "se narran hechos históricos comprobables."
        },
        {
          "label": "c",
          "text": "se explican instrucciones para cuidar aves."
        },
        {
          "label": "d",
          "text": "se evita cualquier enseñanza moral."
        },
        {
          "label": "e",
          "text": "se atribuyen características humanas a los animales."
        }
      ],
      "correctOption": "e",
      "correctOptionText": "se atribuyen características humanas a los animales.",
      "hint": "Piensa en el recurso que permite que animales actúen, hablen o razonen como personas.",
      "correctArgument": "En las fábulas es común que los animales hablen, razonen y tomen decisiones como si fueran personas. Ese recurso permite construir una enseñanza moral mediante personajes animales.",
      "incorrectArgumentsByOption": {
        "a": "Se describen animales como en un reporte científico: el texto no tiene propósito científico, sino narrativo y moral.",
        "b": "Se narran hechos históricos comprobables: no es un relato histórico.",
        "c": "Se explican instrucciones para cuidar aves: el texto no busca enseñar cuidado animal.",
        "d": "Se evita cualquier enseñanza moral: ocurre lo contrario, porque la fábula termina con una enseñanza."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 82,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-83",
      "number": 83,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Lectura aplicada: moraleja",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El zorro y el cántaro\n\nUn zorro sediento encontró un cántaro medio lleno de agua junto a una cerca. Como la abertura era estrecha, metió la cabeza con cuidado y bebió hasta calmar la sed. Cuando quiso salir, el cuello del cántaro lo atrapó.\n\nUn cuervo, que lo miraba desde una rama, le dijo:\n«Rompe el cántaro contra la piedra y quedarás libre».\n\nEl zorro respondió:\n«No puedo hacerlo. Mira cómo brilla. Sería una lástima romper algo tan hermoso».\n\nPasaron las horas. El dueño del cántaro volvió, encontró al zorro atrapado y lo espantó con un palo. Desde lo alto, el cuervo murmuró:\n«Quien prefiere conservar la apariencia antes que salvarse, termina perdiendo ambas cosas».",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Cuál es la moraleja que mejor corresponde a la fábula?",
      "options": [
        {
          "label": "a",
          "text": "Siempre conviene guardar los objetos brillantes."
        },
        {
          "label": "b",
          "text": "Valorar más la apariencia que la solución puede traer consecuencias."
        },
        {
          "label": "c",
          "text": "La sed desaparece cuando se espera suficiente tiempo."
        },
        {
          "label": "d",
          "text": "Los cuervos siempre engañan a los zorros."
        },
        {
          "label": "e",
          "text": "Los cántaros deben colocarse lejos de las cercas."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Valorar más la apariencia que la solución puede traer consecuencias.",
      "hint": "Relaciona la decisión del zorro con la consecuencia que enfrenta al final.",
      "correctArgument": "El zorro pudo liberarse si rompía el cántaro, pero prefirió conservarlo por su apariencia. Esa decisión lo mantuvo atrapado y le trajo una consecuencia negativa. Por eso la moraleja se relaciona con no anteponer la apariencia a una solución necesaria.",
      "incorrectArgumentsByOption": {
        "a": "Siempre conviene guardar los objetos brillantes: contradice el mensaje de la fábula.",
        "c": "La sed desaparece cuando se espera suficiente tiempo: el conflicto no es la sed, sino la decisión de no romper el cántaro.",
        "d": "Los cuervos siempre engañan a los zorros: en el texto, el cuervo ofrece una solución útil.",
        "e": "Los cántaros deben colocarse lejos de las cercas: es un detalle material, no la enseñanza moral."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 83,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-84",
      "number": 84,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Analogías: instrumento y medición",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Selecciona la opción con una relación análoga a la siguiente:\n\nTERMÓMETRO : TEMPERATURA",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué par de palabras mantiene una relación semejante?",
      "options": [
        {
          "label": "a",
          "text": "lápiz : papel"
        },
        {
          "label": "b",
          "text": "mapa : camino"
        },
        {
          "label": "c",
          "text": "campana : sonido"
        },
        {
          "label": "d",
          "text": "reloj : tiempo"
        },
        {
          "label": "e",
          "text": "tijeras : tela"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "reloj : tiempo",
      "hint": "El primer elemento es un instrumento que sirve para medir o indicar el segundo.",
      "correctArgument": "Un termómetro sirve para medir la temperatura. De manera semejante, un reloj sirve para medir o indicar el tiempo. La relación es instrumento y aquello que mide.",
      "incorrectArgumentsByOption": {
        "a": "Lápiz : papel: el lápiz escribe sobre el papel, pero no lo mide.",
        "b": "Mapa : camino: un mapa representa lugares o rutas, pero no mide el camino como función principal.",
        "c": "Campana : sonido: la campana produce sonido, no lo mide.",
        "e": "Tijeras : tela: las tijeras cortan tela, no la miden."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 84,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-85",
      "number": 85,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Analogías: origen y desarrollo",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Selecciona la opción con una relación análoga a la siguiente:\n\nSEMILLA : ÁRBOL",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué par de palabras conserva la misma relación?",
      "options": [
        {
          "label": "a",
          "text": "huevo : ave"
        },
        {
          "label": "b",
          "text": "nube : viento"
        },
        {
          "label": "c",
          "text": "libro : biblioteca"
        },
        {
          "label": "d",
          "text": "hoja : rama"
        },
        {
          "label": "e",
          "text": "río : puente"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "huevo : ave",
      "hint": "El primer elemento puede dar origen al segundo en un proceso de desarrollo.",
      "correctArgument": "Una semilla puede dar origen a un árbol. De forma semejante, un huevo puede dar origen a un ave. La relación es origen y desarrollo de un ser vivo.",
      "incorrectArgumentsByOption": {
        "b": "Nube : viento: no hay una relación de origen y desarrollo entre ambos.",
        "c": "Libro : biblioteca: una biblioteca contiene libros, pero un libro no se desarrolla hasta convertirse en biblioteca.",
        "d": "Hoja : rama: una hoja forma parte de una planta, pero no da origen a una rama.",
        "e": "Río : puente: el puente puede construirse sobre un río, pero no se origina de él."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 85,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-86",
      "number": 86,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Analogías: agente y grupo atendido",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Selecciona la opción con una relación análoga a la siguiente:\n\nMAESTRA : ALUMNOS",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Qué par conserva mejor la relación?",
      "options": [
        {
          "label": "a",
          "text": "médico : recetario"
        },
        {
          "label": "b",
          "text": "pescador : red"
        },
        {
          "label": "c",
          "text": "piloto : avión"
        },
        {
          "label": "d",
          "text": "jardinero : tijeras"
        },
        {
          "label": "e",
          "text": "entrenador : equipo"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "entrenador : equipo",
      "hint": "El primer elemento guía, forma o trabaja directamente con un grupo de personas.",
      "correctArgument": "Una maestra enseña y guía a un grupo de alumnos. De manera semejante, un entrenador dirige y prepara a un equipo. En ambos casos se trata de una persona que orienta a un grupo.",
      "incorrectArgumentsByOption": {
        "a": "Médico : recetario: el recetario es un objeto, no un grupo atendido por el médico.",
        "b": "Pescador : red: la red es una herramienta, no un grupo.",
        "c": "Piloto : avión: el avión es un medio de transporte, no un grupo guiado.",
        "d": "Jardinero : tijeras: las tijeras son una herramienta, no un grupo de personas."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 86,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-87",
      "number": 87,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Antónimos en contexto",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "El comité decidió POSPONER la reunión hasta la próxima semana.",
        "highlights": [
          "POSPONER"
        ],
        "underlines": []
      },
      "prompt": "Selecciona la opción que sustituye con un antónimo la palabra resaltada.",
      "options": [
        {
          "label": "a",
          "text": "cancelar"
        },
        {
          "label": "b",
          "text": "adelantar"
        },
        {
          "label": "c",
          "text": "retrasar"
        },
        {
          "label": "d",
          "text": "aplazar"
        },
        {
          "label": "e",
          "text": "prolongar"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "adelantar",
      "hint": "Busca una palabra que indique hacer algo antes, no después.",
      "correctArgument": "«Posponer» significa dejar algo para después. Su antónimo en este contexto es «adelantar», porque indica realizarlo antes de lo previsto.",
      "incorrectArgumentsByOption": {
        "a": "Cancelar: significa dejar sin efecto, no hacer antes.",
        "c": "Retrasar: es cercano a posponer, no su contrario.",
        "d": "Aplazar: también significa dejar para después.",
        "e": "Prolongar: significa extender la duración, no adelantar una fecha."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 87,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-88",
      "number": 88,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Antónimos en contexto",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "La explicación del procedimiento fue CONFUSA para la mayoría del grupo.",
        "highlights": [
          "CONFUSA"
        ],
        "underlines": []
      },
      "prompt": "Selecciona la opción que sustituye con un antónimo la palabra resaltada.",
      "options": [
        {
          "label": "a",
          "text": "extensa"
        },
        {
          "label": "b",
          "text": "breve"
        },
        {
          "label": "c",
          "text": "complicada"
        },
        {
          "label": "d",
          "text": "clara"
        },
        {
          "label": "e",
          "text": "incompleta"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "clara",
      "hint": "Busca una palabra que indique que la explicación se entiende con facilidad.",
      "correctArgument": "«Confusa» significa difícil de entender o poco ordenada. Su antónimo es «clara», porque una explicación clara se comprende con facilidad.",
      "incorrectArgumentsByOption": {
        "a": "Extensa: se refiere a longitud, no a facilidad de comprensión.",
        "b": "Breve: indica poca extensión, pero no necesariamente claridad.",
        "c": "Complicada: es cercana a confusa, no su contrario.",
        "e": "Incompleta: significa que le falta información, pero no es antónimo directo de confusa."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 88,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-89",
      "number": 89,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Antónimos",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "La palabra que se debe sustituir con un antónimo es:\n\nESCASO",
        "highlights": [
          "ESCASO"
        ],
        "underlines": []
      },
      "prompt": "¿Cuál opción es antónimo de la palabra resaltada?",
      "options": [
        {
          "label": "a",
          "text": "abundante"
        },
        {
          "label": "b",
          "text": "limitado"
        },
        {
          "label": "c",
          "text": "pequeño"
        },
        {
          "label": "d",
          "text": "raro"
        },
        {
          "label": "e",
          "text": "insuficiente"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "abundante",
      "hint": "Piensa en una cantidad que no falta, sino que sobra o existe en gran número.",
      "correctArgument": "«Escaso» significa poco, limitado o insuficiente. Su antónimo es «abundante», que significa que existe en gran cantidad.",
      "incorrectArgumentsByOption": {
        "b": "Limitado: es cercano a escaso, no su contrario.",
        "c": "Pequeño: se refiere a tamaño, no necesariamente a cantidad disponible.",
        "d": "Raro: puede relacionarse con poca frecuencia, pero no es el antónimo más preciso.",
        "e": "Insuficiente: también expresa falta o poca cantidad, por lo que se acerca a escaso."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 89,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-90",
      "number": 90,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Sinónimos: par de palabras",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "Selecciona la opción que contenga un par de sinónimos.",
        "highlights": [],
        "underlines": []
      },
      "prompt": "¿Cuál opción contiene dos palabras con significado semejante?",
      "options": [
        {
          "label": "a",
          "text": "alto : bajo"
        },
        {
          "label": "b",
          "text": "rápido : lento"
        },
        {
          "label": "c",
          "text": "calma : tranquilidad"
        },
        {
          "label": "d",
          "text": "ruido : silencio"
        },
        {
          "label": "e",
          "text": "avance : retroceso"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "calma : tranquilidad",
      "hint": "Busca dos palabras que puedan usarse con sentido parecido en una misma oración.",
      "correctArgument": "«Calma» y «tranquilidad» tienen significados semejantes, porque ambas se relacionan con ausencia de agitación o inquietud.",
      "incorrectArgumentsByOption": {
        "a": "Alto : bajo: son antónimos.",
        "b": "Rápido : lento: son antónimos.",
        "d": "Ruido : silencio: son opuestos.",
        "e": "Avance : retroceso: expresan direcciones contrarias."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 90,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-91",
      "number": 91,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Sinónimos en contexto",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "La respuesta del alumno fue PRECISA y resolvió la duda del grupo.",
        "highlights": [
          "PRECISA"
        ],
        "underlines": []
      },
      "prompt": "Selecciona la opción que sustituye con un sinónimo la palabra resaltada.",
      "options": [
        {
          "label": "a",
          "text": "extensa"
        },
        {
          "label": "b",
          "text": "dudosa"
        },
        {
          "label": "c",
          "text": "lenta"
        },
        {
          "label": "d",
          "text": "confusa"
        },
        {
          "label": "e",
          "text": "exacta"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "exacta",
      "hint": "Busca una palabra que indique que la respuesta fue clara y sin error.",
      "correctArgument": "En este contexto, «precisa» significa exacta, clara y ajustada a lo que se preguntó. Por eso «exacta» es el sinónimo más adecuado.",
      "incorrectArgumentsByOption": {
        "a": "Extensa: significa larga, pero una respuesta larga no necesariamente es precisa.",
        "b": "Dudosa: indica falta de seguridad, lo contrario de una respuesta precisa.",
        "c": "Lenta: se refiere al tiempo de respuesta, no a su exactitud.",
        "d": "Confusa: significa difícil de entender, por lo que no es sinónimo de precisa."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 91,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-92",
      "number": 92,
      "areaId": "habilidad-verbal",
      "areaName": "Habilidad verbal",
      "block": "Sinónimos en contexto",
      "baseText": null,
      "basePill": {
        "type": "pill",
        "content": "La comunidad decidió RESGUARDAR los documentos antiguos en una sala seca y segura.",
        "highlights": [
          "RESGUARDAR"
        ],
        "underlines": []
      },
      "prompt": "Selecciona la opción que sustituye con un sinónimo la palabra resaltada.",
      "options": [
        {
          "label": "a",
          "text": "vender"
        },
        {
          "label": "b",
          "text": "olvidar"
        },
        {
          "label": "c",
          "text": "dividir"
        },
        {
          "label": "d",
          "text": "proteger"
        },
        {
          "label": "e",
          "text": "prestar"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "proteger",
      "hint": "Observa que los documentos se colocan en un lugar seguro para evitar daños.",
      "correctArgument": "«Resguardar» significa proteger, cuidar o mantener algo seguro. En el contexto, los documentos se colocan en una sala seca y segura para evitar deterioro.",
      "incorrectArgumentsByOption": {
        "a": "Vender: implica transferir algo a cambio de dinero, no cuidarlo.",
        "b": "Olvidar: significa dejar de recordar o atender algo, lo contrario de resguardarlo.",
        "c": "Dividir: significa separar en partes, no proteger.",
        "e": "Prestar: implica entregar temporalmente algo a otra persona, no mantenerlo seguro."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 92,
      "rangeStart": 77,
      "rangeEnd": 92
    },
    {
      "id": "reactivo-93",
      "number": 93,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Espacio geográfico: componentes económicos",
      "baseText": null,
      "basePill": null,
      "prompt": "En una región se cultivan hortalizas, se empacan en bodegas, se transportan en camiones refrigerados y se venden en centrales de abasto.\n\n¿Qué componente del espacio geográfico se observa principalmente en esta situación?",
      "options": [
        {
          "label": "a",
          "text": "Físico"
        },
        {
          "label": "b",
          "text": "Político"
        },
        {
          "label": "c",
          "text": "Económico"
        },
        {
          "label": "d",
          "text": "Natural"
        },
        {
          "label": "e",
          "text": "Astronómico"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Económico",
      "hint": "Identifica si la situación se relaciona con producción, transporte, intercambio o consumo de bienes.",
      "correctArgument": "El componente económico del espacio geográfico incluye actividades relacionadas con producir, transportar, comercializar y consumir bienes o servicios. En el caso se mencionan cultivo, empaque, transporte y venta de hortalizas.",
      "incorrectArgumentsByOption": {
        "a": "Físico: se relaciona con relieve, clima, agua o suelo, pero el caso se centra en actividades productivas y comerciales.",
        "b": "Político: se refiere a límites, gobierno, administración y organización territorial.",
        "d": "Natural: puede incluir elementos del ambiente, pero no explica la cadena de producción y venta descrita.",
        "e": "Astronómico: no corresponde al estudio del espacio geográfico en esta situación."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 93,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-94",
      "number": 94,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Coordenadas: latitud y longitud",
      "baseText": "Observa el mapa y ubica el punto P según su latitud y longitud.",
      "basePill": null,
      "prompt": "¿Cuáles son las coordenadas geográficas del punto P?",
      "options": [
        {
          "label": "a",
          "text": "20° S, 40° W"
        },
        {
          "label": "b",
          "text": "20° N, 40° W"
        },
        {
          "label": "c",
          "text": "40° S, 20° E"
        },
        {
          "label": "d",
          "text": "40° N, 20° W"
        },
        {
          "label": "e",
          "text": "20° S, 40° E"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "20° S, 40° W",
      "hint": "Primero identifica si el punto está al norte o al sur del ecuador; después revisa si está al este o al oeste de Greenwich.",
      "correctArgument": "El punto P se encuentra debajo del ecuador, por lo que su latitud es sur:\n\n20° S.\n\nTambién se ubica a la izquierda del meridiano de Greenwich, por lo que su longitud es oeste:\n\n40° W.\n\nPor eso sus coordenadas son 20° S, 40° W.",
      "incorrectArgumentsByOption": {
        "b": "20° N, 40° W: ubica correctamente el oeste, pero coloca el punto al norte en lugar de al sur.",
        "c": "40° S, 20° E: invierte los valores y además cambia el hemisferio de longitud.",
        "d": "40° N, 20° W: invierte los valores y cambia la latitud al norte.",
        "e": "20° S, 40° E: ubica bien la latitud sur, pero cambia oeste por este."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/geografia/reactivo-94-coordenadas-p.png",
        "alt": "Geografía, reactivo 94: Mapa de coordenadas con punto P para identificar latitud y longitud.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/geografia/reactivo-94-coordenadas-p.png",
          "alt": "Geografía, reactivo 94: Mapa de coordenadas con punto P para identificar latitud y longitud.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 94,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-95",
      "number": 95,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Sismos: relación con placas y zonas propensas",
      "baseText": null,
      "basePill": null,
      "prompt": "Una ciudad se localiza cerca de una zona donde una placa tectónica se introduce por debajo de otra. En esa región se registran sismos frecuentes y algunos de gran intensidad.\n\n¿Qué condición explica mejor esta sismicidad?",
      "options": [
        {
          "label": "a",
          "text": "La presencia de una llanura alejada de los bordes de placas"
        },
        {
          "label": "b",
          "text": "La ausencia total de movimiento en la corteza terrestre"
        },
        {
          "label": "c",
          "text": "La cercanía a una zona polar con bajas temperaturas"
        },
        {
          "label": "d",
          "text": "El contacto convergente entre placas tectónicas"
        },
        {
          "label": "e",
          "text": "La falta de ríos superficiales en la región"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "El contacto convergente entre placas tectónicas",
      "hint": "Relaciona los sismos con el movimiento y contacto entre placas de la corteza terrestre.",
      "correctArgument": "Los límites convergentes ocurren cuando dos placas se acercan. Si una se hunde bajo otra, se acumula energía en la corteza y pueden generarse sismos fuertes. Por eso estas zonas suelen ser sísmicamente activas.",
      "incorrectArgumentsByOption": {
        "a": "La presencia de una llanura alejada de los bordes de placas: las zonas alejadas de límites tectónicos suelen tener menor actividad sísmica.",
        "b": "La ausencia total de movimiento en la corteza terrestre: si no hubiera movimiento, no se explicaría la sismicidad.",
        "c": "La cercanía a una zona polar con bajas temperaturas: la temperatura polar no es la causa principal de sismos.",
        "e": "La falta de ríos superficiales en la región: no explica el origen tectónico de los sismos."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 95,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-96",
      "number": 96,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Agua: ciclo del agua e infiltración",
      "baseText": null,
      "basePill": null,
      "prompt": "Después de una lluvia intensa, parte del agua corre por la superficie, pero otra parte penetra lentamente en el suelo hasta llegar a capas subterráneas.\n\n¿Qué etapa del ciclo del agua se describe?",
      "options": [
        {
          "label": "a",
          "text": "Condensación"
        },
        {
          "label": "b",
          "text": "Infiltración"
        },
        {
          "label": "c",
          "text": "Evaporación"
        },
        {
          "label": "d",
          "text": "Precipitación"
        },
        {
          "label": "e",
          "text": "Escorrentía marina"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Infiltración",
      "hint": "Busca el proceso mediante el cual el agua entra al suelo y puede alimentar acuíferos.",
      "correctArgument": "La infiltración ocurre cuando el agua penetra en el suelo y se mueve hacia capas subterráneas. Este proceso ayuda a recargar acuíferos y aguas subterráneas.",
      "incorrectArgumentsByOption": {
        "a": "Condensación: ocurre cuando el vapor de agua se transforma en pequeñas gotas.",
        "c": "Evaporación: es el paso del agua líquida a vapor por efecto del calor.",
        "d": "Precipitación: es la caída de agua desde la atmósfera en forma de lluvia, nieve o granizo.",
        "e": "Escorrentía marina: no describe el ingreso del agua al suelo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 96,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-97",
      "number": 97,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Mar territorial: millas náuticas y soberanía",
      "baseText": null,
      "basePill": null,
      "prompt": "Un país ejerce soberanía sobre una franja de mar que se extiende hasta 12 millas náuticas desde su costa, incluyendo el espacio aéreo y el fondo marino correspondiente.\n\n¿A qué zona marítima se refiere la descripción?",
      "options": [
        {
          "label": "a",
          "text": "Mar territorial"
        },
        {
          "label": "b",
          "text": "Alta mar"
        },
        {
          "label": "c",
          "text": "Plataforma continental exterior"
        },
        {
          "label": "d",
          "text": "Zona polar"
        },
        {
          "label": "e",
          "text": "Cuenca oceánica profunda"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Mar territorial",
      "hint": "Busca la franja marina inmediata a la costa donde el Estado tiene soberanía.",
      "correctArgument": "El mar territorial es la franja marítima cercana a la costa donde un Estado ejerce soberanía. Se extiende hasta 12 millas náuticas desde la línea de base costera.",
      "incorrectArgumentsByOption": {
        "b": "Alta mar: se refiere a zonas fuera de la jurisdicción directa de un solo Estado.",
        "c": "Plataforma continental exterior: se relaciona con la prolongación submarina del territorio, pero no es la franja de soberanía marítima inmediata de 12 millas.",
        "d": "Zona polar: describe una región del planeta, no una categoría marítima de soberanía.",
        "e": "Cuenca oceánica profunda: es una forma del relieve submarino, no una zona jurídica marítima."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 97,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-98",
      "number": 98,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Riesgos regionales: huracanes en la península de Yucatán",
      "baseText": null,
      "basePill": null,
      "prompt": "Una comunidad de la península de Yucatán prepara refugios temporales, revisa rutas de evacuación y protege ventanas antes de la temporada de lluvias. Las autoridades advierten sobre vientos intensos, oleaje elevado y lluvias abundantes.\n\n¿Qué riesgo natural se está atendiendo principalmente?",
      "options": [
        {
          "label": "a",
          "text": "Avalanchas"
        },
        {
          "label": "b",
          "text": "Erupciones volcánicas"
        },
        {
          "label": "c",
          "text": "Huracanes"
        },
        {
          "label": "d",
          "text": "Nevadas extremas"
        },
        {
          "label": "e",
          "text": "Tornados de alta montaña"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Huracanes",
      "hint": "Relaciona la ubicación de la península con fenómenos tropicales del mar Caribe y el Golfo de México.",
      "correctArgument": "La península de Yucatán está expuesta a huracanes por su ubicación entre el mar Caribe y el Golfo de México. Estos fenómenos pueden producir vientos fuertes, lluvias intensas, oleaje elevado e inundaciones.",
      "incorrectArgumentsByOption": {
        "a": "Avalanchas: se relacionan con zonas montañosas con acumulación de nieve, no con la península de Yucatán.",
        "b": "Erupciones volcánicas: no son el riesgo regional principal de esa zona.",
        "d": "Nevadas extremas: no corresponden al clima tropical de la región.",
        "e": "Tornados de alta montaña: no explican el conjunto de oleaje, lluvias y vientos descritos."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 98,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-99",
      "number": 99,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Hidrocarburos en México: regiones vinculadas a actividad petrolera",
      "baseText": null,
      "basePill": null,
      "prompt": "Un estudiante investiga regiones mexicanas asociadas con extracción y actividad petrolera. Debe elegir un conjunto de entidades vinculadas históricamente con hidrocarburos.\n\n¿Cuál opción es la más adecuada?",
      "options": [
        {
          "label": "a",
          "text": "Durango, Zacatecas y Aguascalientes"
        },
        {
          "label": "b",
          "text": "Campeche, Tabasco y Veracruz"
        },
        {
          "label": "c",
          "text": "Tlaxcala, Morelos y Querétaro"
        },
        {
          "label": "d",
          "text": "Nayarit, Colima y Guanajuato"
        },
        {
          "label": "e",
          "text": "Chihuahua, Sonora y Baja California"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Campeche, Tabasco y Veracruz",
      "hint": "Piensa en entidades relacionadas con el Golfo de México y la actividad petrolera.",
      "correctArgument": "Campeche, Tabasco y Veracruz se asocian con regiones petroleras y actividades vinculadas con hidrocarburos, especialmente por su relación con el Golfo de México y zonas de extracción, procesamiento o transporte.",
      "incorrectArgumentsByOption": {
        "a": "Durango, Zacatecas y Aguascalientes: se asocian más con otras actividades, como minería o industria, no con el principal corredor petrolero del Golfo.",
        "c": "Tlaxcala, Morelos y Querétaro: no forman un conjunto representativo de actividad petrolera.",
        "d": "Nayarit, Colima y Guanajuato: no corresponden al conjunto más reconocido por hidrocarburos.",
        "e": "Chihuahua, Sonora y Baja California: se relacionan con el norte del país, pero no con la principal región petrolera del Golfo."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 99,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-100",
      "number": 100,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Transporte marítimo: función y mercancías que mueve",
      "baseText": null,
      "basePill": null,
      "prompt": "Una empresa necesita trasladar contenedores con maquinaria, granos y autopartes entre continentes. Busca un medio adecuado para mover grandes volúmenes a larga distancia.\n\n¿Qué tipo de transporte resulta más apropiado?",
      "options": [
        {
          "label": "a",
          "text": "Transporte peatonal"
        },
        {
          "label": "b",
          "text": "Transporte en bicicleta"
        },
        {
          "label": "c",
          "text": "Transporte por teleférico urbano"
        },
        {
          "label": "d",
          "text": "Transporte en motocicleta"
        },
        {
          "label": "e",
          "text": "Transporte marítimo"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Transporte marítimo",
      "hint": "Considera qué medio permite mover cargas pesadas o voluminosas entre países separados por océanos.",
      "correctArgument": "El transporte marítimo es adecuado para trasladar grandes volúmenes de mercancías entre regiones y continentes. Se usa en el comercio internacional para mover contenedores, maquinaria, materias primas y productos manufacturados.",
      "incorrectArgumentsByOption": {
        "a": "Transporte peatonal: no sirve para carga internacional de gran volumen.",
        "b": "Transporte en bicicleta: es útil en distancias cortas y cargas pequeñas, no para comercio intercontinental.",
        "c": "Transporte por teleférico urbano: tiene usos locales y específicos, no para cruzar océanos.",
        "d": "Transporte en motocicleta: permite movilidad rápida en distancias cortas, pero no carga masiva internacional."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 100,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-101",
      "number": 101,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Combustibles alternativos: aceites vegetales como alternativa",
      "baseText": null,
      "basePill": null,
      "prompt": "Una comunidad busca reducir el uso de combustibles fósiles en algunos vehículos agrícolas. Para ello estudia producir un combustible a partir de aceites vegetales usados y tratados.\n\n¿Qué alternativa energética se relaciona con esta propuesta?",
      "options": [
        {
          "label": "a",
          "text": "Biodiésel"
        },
        {
          "label": "b",
          "text": "Carbón mineral"
        },
        {
          "label": "c",
          "text": "Gasolina convencional"
        },
        {
          "label": "d",
          "text": "Turba natural"
        },
        {
          "label": "e",
          "text": "Coque metalúrgico"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Biodiésel",
      "hint": "Busca el combustible que puede elaborarse a partir de aceites vegetales o grasas.",
      "correctArgument": "El biodiésel puede producirse a partir de aceites vegetales o grasas, y se considera una alternativa a combustibles derivados directamente del petróleo en ciertos usos.",
      "incorrectArgumentsByOption": {
        "b": "Carbón mineral: es un combustible fósil sólido, no se elabora con aceites vegetales.",
        "c": "Gasolina convencional: proviene del petróleo y no corresponde al proceso descrito.",
        "d": "Turba natural: es materia orgánica acumulada en ambientes húmedos, no un combustible elaborado con aceites tratados.",
        "e": "Coque metalúrgico: se obtiene a partir del carbón y se usa en procesos industriales, no como alternativa basada en aceites vegetales."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 101,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-102",
      "number": 102,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Organizaciones mundiales: cooperación internacional",
      "baseText": null,
      "basePill": null,
      "prompt": "Un país enfrenta problemas para pagar compromisos externos y solicita apoyo financiero internacional. También recibe recomendaciones sobre estabilidad económica y manejo de recursos.\n\n¿Qué organismo internacional se relaciona principalmente con este tipo de apoyo?",
      "options": [
        {
          "label": "a",
          "text": "Organización Mundial del Turismo"
        },
        {
          "label": "b",
          "text": "Comité Olímpico Internacional"
        },
        {
          "label": "c",
          "text": "Fondo de las Naciones Unidas para la Infancia"
        },
        {
          "label": "d",
          "text": "Fondo Monetario Internacional"
        },
        {
          "label": "e",
          "text": "Organización de las Naciones Unidas para la Alimentación y la Agricultura"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Fondo Monetario Internacional",
      "hint": "Identifica el organismo relacionado con préstamos, estabilidad financiera y cooperación monetaria entre países.",
      "correctArgument": "El Fondo Monetario Internacional se relaciona con cooperación monetaria, estabilidad financiera y apoyo a países que enfrentan dificultades económicas externas. Por eso corresponde al caso planteado.",
      "incorrectArgumentsByOption": {
        "a": "Organización Mundial del Turismo: se relaciona con actividades turísticas.",
        "b": "Comité Olímpico Internacional: organiza y regula aspectos del movimiento olímpico.",
        "c": "Fondo de las Naciones Unidas para la Infancia: se enfoca en derechos y bienestar de niñas, niños y adolescentes.",
        "e": "Organización de las Naciones Unidas para la Alimentación y la Agricultura: atiende temas de alimentación, agricultura y seguridad alimentaria."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 102,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-103",
      "number": 103,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Cambios geopolíticos: fronteras, Estados y poder territorial",
      "baseText": null,
      "basePill": null,
      "prompt": "Después de un conflicto político, un territorio que antes formaba parte de un solo país se divide y surgen dos nuevos Estados con fronteras, gobiernos y relaciones internacionales propias.\n\n¿Qué tipo de cambio se describe?",
      "options": [
        {
          "label": "a",
          "text": "Cambio climático"
        },
        {
          "label": "b",
          "text": "Movimiento de rotación terrestre"
        },
        {
          "label": "c",
          "text": "Cambio geopolítico"
        },
        {
          "label": "d",
          "text": "Proceso de erosión costera"
        },
        {
          "label": "e",
          "text": "Ciclo hidrológico"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Cambio geopolítico",
      "hint": "Observa que cambia la organización política del territorio y la distribución del poder.",
      "correctArgument": "Un cambio geopolítico ocurre cuando se modifica la organización política del espacio, como fronteras, Estados, alianzas o control territorial. En el caso, la división de un país y el surgimiento de nuevos Estados transforman el mapa político.",
      "incorrectArgumentsByOption": {
        "a": "Cambio climático: se relaciona con variaciones de largo plazo en temperatura, lluvias y otros elementos del clima.",
        "b": "Movimiento de rotación terrestre: es el giro de la Tierra sobre su eje, no un cambio político.",
        "d": "Proceso de erosión costera: implica desgaste del relieve por acción del agua o viento.",
        "e": "Ciclo hidrológico: describe la circulación del agua en la naturaleza."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 103,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-104",
      "number": 104,
      "areaId": "geografia",
      "areaName": "Geografía",
      "block": "Patrimonio cultural en México: relacionar sitios con su estado",
      "baseText": null,
      "basePill": null,
      "prompt": "¿Cuál relación entre sitio de patrimonio cultural y entidad federativa es correcta?",
      "options": [
        {
          "label": "a",
          "text": "Chichén Itzá, Oaxaca"
        },
        {
          "label": "b",
          "text": "Chichén Itzá, Yucatán"
        },
        {
          "label": "c",
          "text": "Monte Albán, Nuevo León"
        },
        {
          "label": "d",
          "text": "Palenque, Sinaloa"
        },
        {
          "label": "e",
          "text": "Teotihuacán, Baja California Sur"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Chichén Itzá, Yucatán",
      "hint": "Recuerda la ubicación de zonas arqueológicas representativas de México.",
      "correctArgument": "Chichén Itzá es una zona arqueológica maya ubicada en Yucatán. Por eso la relación correcta es Chichén Itzá, Yucatán.",
      "incorrectArgumentsByOption": {
        "a": "Chichén Itzá, Oaxaca: Chichén Itzá no se ubica en Oaxaca.",
        "c": "Monte Albán, Nuevo León: Monte Albán se localiza en Oaxaca, no en Nuevo León.",
        "d": "Palenque, Sinaloa: Palenque se ubica en Chiapas, no en Sinaloa.",
        "e": "Teotihuacán, Baja California Sur: Teotihuacán se localiza en el Estado de México, no en Baja California Sur."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 104,
      "rangeStart": 93,
      "rangeEnd": 104
    },
    {
      "id": "reactivo-105",
      "number": 105,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Rapidez y velocidad: interpretación y cálculo básico",
      "baseText": null,
      "basePill": null,
      "prompt": "Un ciclista recorre 540 metros en línea recta durante 3 minutos. Si mantiene el mismo sentido de movimiento, ¿cuál es su rapidez promedio?",
      "options": [
        {
          "label": "a",
          "text": "1 m/s"
        },
        {
          "label": "b",
          "text": "2 m/s"
        },
        {
          "label": "c",
          "text": "3 m/s"
        },
        {
          "label": "d",
          "text": "9 m/s"
        },
        {
          "label": "e",
          "text": "180 m/s"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "3 m/s",
      "hint": "Convierte los minutos a segundos antes de dividir la distancia entre el tiempo.",
      "correctArgument": "La rapidez promedio se calcula con la expresión:\n\nv = d/t\n\nLa distancia es:\n\nd = 540 m\n\nEl tiempo es de 3 minutos. Convertimos a segundos:\n\n3 min = 3 × 60 = 180 s\n\nAhora calculamos:\n\nv = 540/180 = 3\n\nPor eso la rapidez promedio es:\n\n3 m/s",
      "incorrectArgumentsByOption": {
        "a": "1 m/s: resulta de dividir de manera incorrecta la distancia entre el tiempo.",
        "b": "2 m/s: queda por debajo del valor obtenido al convertir correctamente los minutos a segundos.",
        "d": "9 m/s: no corresponde a la división 540 ÷ 180.",
        "e": "180 m/s: corresponde al tiempo en segundos, no a la rapidez."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 105,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-106",
      "number": 106,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Tablas y gráficas: leer movimiento y cambios con el tiempo",
      "baseText": "Observa la tabla y la gráfica. Compara la rapidez media del carrito en cada intervalo.",
      "basePill": null,
      "prompt": "¿En qué intervalo de tiempo el carrito tuvo la mayor rapidez media?",
      "options": [
        {
          "label": "a",
          "text": "De 6 s a 8 s"
        },
        {
          "label": "b",
          "text": "De 0 s a 2 s"
        },
        {
          "label": "c",
          "text": "De 2 s a 4 s"
        },
        {
          "label": "d",
          "text": "De 4 s a 6 s"
        },
        {
          "label": "e",
          "text": "De 0 s a 8 s"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "De 6 s a 8 s",
      "hint": "Compara cuánto cambia la posición en cada intervalo de 2 segundos.",
      "correctArgument": "Calculamos el cambio de posición en cada intervalo:\n\nDe 0 s a 2 s:\n\n5 - 0 = 5 m\n\nDe 2 s a 4 s:\n\n20 - 5 = 15 m\n\nDe 4 s a 6 s:\n\n45 - 20 = 25 m\n\nDe 6 s a 8 s:\n\n80 - 45 = 35 m\n\nTodos los intervalos duran 2 segundos, así que el mayor cambio de posición corresponde a la mayor rapidez media. El mayor cambio es de 35 m, entre 6 s y 8 s.",
      "incorrectArgumentsByOption": {
        "b": "De 0 s a 2 s: solo avanza 5 m, que es el menor cambio de la tabla.",
        "c": "De 2 s a 4 s: avanza 15 m, pero no es el mayor cambio.",
        "d": "De 4 s a 6 s: avanza 25 m, menos que en el intervalo de 6 s a 8 s.",
        "e": "De 0 s a 8 s: compara todo el recorrido, pero el planteamiento pide el intervalo donde la rapidez media fue mayor."
      },
      "visual": {
        "kind": "table",
        "position": "base",
        "hasHorizontalScroll": true,
        "caption": "Observa la tabla y la gráfica. Compara la rapidez media del carrito en cada intervalo.",
        "headers": [
          "Tiempo t en segundos",
          "0",
          "2",
          "4",
          "6",
          "8"
        ],
        "rows": [
          [
            "Posición x en metros",
            "0",
            "5",
            "20",
            "45",
            "80"
          ]
        ]
      },
      "visuals": [
        {
          "kind": "table",
          "position": "base",
          "hasHorizontalScroll": true,
          "caption": "Observa la tabla y la gráfica. Compara la rapidez media del carrito en cada intervalo.",
          "headers": [
            "Tiempo t en segundos",
            "0",
            "2",
            "4",
            "6",
            "8"
          ],
          "rows": [
            [
              "Posición x en metros",
              "0",
              "5",
              "20",
              "45",
              "80"
            ]
          ]
        },
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/fisica/reactivo-106-grafica-posicion-tiempo.png",
          "alt": "Física, reactivo 106: Gráfica posición-tiempo para interpretar la rapidez media por intervalos.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 106,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-107",
      "number": 107,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Fuerza y aceleración: uso de F = ma en problemas",
      "baseText": null,
      "basePill": null,
      "prompt": "Sobre un carrito de 6 kg actúa una fuerza neta de 24 N. ¿Qué aceleración adquiere?",
      "options": [
        {
          "label": "a",
          "text": "2 m/s²"
        },
        {
          "label": "b",
          "text": "3 m/s²"
        },
        {
          "label": "c",
          "text": "6 m/s²"
        },
        {
          "label": "d",
          "text": "24 m/s²"
        },
        {
          "label": "e",
          "text": "4 m/s²"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "4 m/s²",
      "hint": "Usa la relación F = ma y despeja la aceleración.",
      "correctArgument": "La relación entre fuerza, masa y aceleración es:\n\nF = ma\n\nDespejamos la aceleración:\n\na = F/m\n\nSustituimos los datos:\n\na = 24 N/6 kg\n\na = 4 m/s²\n\nPor eso la aceleración del carrito es:\n\n4 m/s²",
      "incorrectArgumentsByOption": {
        "a": "2 m/s²: no corresponde a dividir 24 entre 6.",
        "b": "3 m/s²: resulta de una división incorrecta.",
        "c": "6 m/s²: corresponde a la masa dada, no a la aceleración.",
        "d": "24 m/s²: corresponde a la fuerza numérica, pero no al resultado de aplicar a = F/m."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 107,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-108",
      "number": 108,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Equilibrio: resultante R = 0 en situaciones simples",
      "baseText": "Observa el diagrama de fuerzas sobre la caja y calcula la fuerza necesaria para mantener el equilibrio.",
      "basePill": null,
      "prompt": "¿Qué fuerza debe aplicarse hacia la izquierda para que la caja esté en equilibrio?",
      "options": [
        {
          "label": "a",
          "text": "11 N"
        },
        {
          "label": "b",
          "text": "25 N"
        },
        {
          "label": "c",
          "text": "18 N"
        },
        {
          "label": "d",
          "text": "7 N"
        },
        {
          "label": "e",
          "text": "30 N"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "25 N",
      "hint": "Para que haya equilibrio, la suma de fuerzas hacia la derecha debe igualar la fuerza hacia la izquierda.",
      "correctArgument": "En equilibrio, la fuerza resultante debe ser cero:\n\nR = 0\n\nPrimero sumamos las fuerzas hacia la derecha:\n\n18 N + 7 N = 25 N\n\nPara equilibrarlas, se necesita una fuerza igual hacia la izquierda:\n\nF = 25 N\n\nPor eso la fuerza requerida es 25 N hacia la izquierda.",
      "incorrectArgumentsByOption": {
        "a": "11 N: resulta de restar 18 - 7, pero las fuerzas dadas van en la misma dirección y deben sumarse.",
        "c": "18 N: solo iguala una de las fuerzas hacia la derecha, pero deja sin equilibrar la de 7 N.",
        "d": "7 N: solo iguala la fuerza menor, no la suma total.",
        "e": "30 N: excede la suma de las fuerzas hacia la derecha, por lo que la caja ya no estaría en equilibrio."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/fisica/reactivo-108-equilibrio-fuerzas.png",
        "alt": "Física, reactivo 108: Diagrama de fuerzas horizontales sobre una caja para analizar equilibrio.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/fisica/reactivo-108-equilibrio-fuerzas.png",
          "alt": "Física, reactivo 108: Diagrama de fuerzas horizontales sobre una caja para analizar equilibrio.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 108,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-109",
      "number": 109,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Calor y temperatura: diferencias y ejemplos en la vida diaria",
      "baseText": null,
      "basePill": null,
      "prompt": "Una cuchara metálica se deja dentro de una taza con agua caliente. Después de unos minutos, el mango de la cuchara también se siente caliente.\n\n¿Qué explicación es la más adecuada?",
      "options": [
        {
          "label": "a",
          "text": "La temperatura es una sustancia que se mueve por la cuchara."
        },
        {
          "label": "b",
          "text": "El metal impide por completo el paso de energía."
        },
        {
          "label": "c",
          "text": "El calor se transfiere del agua caliente hacia la cuchara por conducción."
        },
        {
          "label": "d",
          "text": "La cuchara produce frío para equilibrar el agua."
        },
        {
          "label": "e",
          "text": "El agua deja de tener energía cuando toca el metal."
        }
      ],
      "correctOption": "c",
      "correctOptionText": "El calor se transfiere del agua caliente hacia la cuchara por conducción.",
      "hint": "Piensa en cómo se transfiere energía térmica a través de un sólido.",
      "correctArgument": "El calor es energía que se transfiere de un cuerpo con mayor temperatura a otro con menor temperatura. En este caso, la energía térmica pasa del agua caliente a la cuchara metálica y se distribuye por el metal mediante conducción.",
      "incorrectArgumentsByOption": {
        "a": "La temperatura es una sustancia que se mueve por la cuchara: la temperatura no es una sustancia, sino una medida relacionada con el movimiento de las partículas.",
        "b": "El metal impide por completo el paso de energía: los metales suelen conducir bien el calor.",
        "d": "La cuchara produce frío para equilibrar el agua: la cuchara no produce frío; recibe energía térmica.",
        "e": "El agua deja de tener energía cuando toca el metal: el agua puede transferir parte de su energía, pero no se queda sin energía."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 109,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-110",
      "number": 110,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Trabajo y energía: significado de trabajo mecánico",
      "baseText": null,
      "basePill": null,
      "prompt": "Una persona empuja una caja con una fuerza constante de 30 N y la desplaza 4 m en la misma dirección de la fuerza.\n\n¿Cuánto trabajo mecánico realiza?",
      "options": [
        {
          "label": "a",
          "text": "7.5 J"
        },
        {
          "label": "b",
          "text": "26 J"
        },
        {
          "label": "c",
          "text": "34 J"
        },
        {
          "label": "d",
          "text": "120 J"
        },
        {
          "label": "e",
          "text": "300 J"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "120 J",
      "hint": "Cuando la fuerza y el desplazamiento tienen la misma dirección, el trabajo se calcula multiplicando fuerza por distancia.",
      "correctArgument": "El trabajo mecánico se calcula con:\n\nW = Fd\n\nSustituimos los datos:\n\nW = 30 N × 4 m\n\nW = 120 J\n\nPor eso el trabajo realizado es:\n\n120 J",
      "incorrectArgumentsByOption": {
        "a": "7.5 J: resulta de dividir 30 entre 4, pero el trabajo se calcula multiplicando.",
        "b": "26 J: se obtiene al restar los datos, operación que no corresponde.",
        "c": "34 J: se obtiene al sumar los datos, pero el trabajo no se calcula así.",
        "e": "300 J: multiplica por un valor que no corresponde al desplazamiento dado."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 110,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-111",
      "number": 111,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Electricidad estática: carga por frotamiento y atracción",
      "baseText": null,
      "basePill": null,
      "prompt": "Después de frotar un globo con el cabello seco, el globo puede atraer pequeños pedazos de papel.\n\n¿Qué fenómeno explica mejor esta situación?",
      "options": [
        {
          "label": "a",
          "text": "Electricidad estática producida por frotamiento"
        },
        {
          "label": "b",
          "text": "Magnetismo producido por una pila"
        },
        {
          "label": "c",
          "text": "Corriente eléctrica en un cable"
        },
        {
          "label": "d",
          "text": "Reflexión de la luz en el papel"
        },
        {
          "label": "e",
          "text": "Evaporación del agua del cabello"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Electricidad estática producida por frotamiento",
      "hint": "La fricción puede provocar que un objeto gane o pierda carga eléctrica.",
      "correctArgument": "Al frotar el globo con el cabello, puede transferirse carga eléctrica entre ambos. Esa acumulación de carga produce electricidad estática, capaz de atraer objetos ligeros como pequeños pedazos de papel.",
      "incorrectArgumentsByOption": {
        "b": "Magnetismo producido por una pila: no hay imanes ni corriente de una pila en la situación.",
        "c": "Corriente eléctrica en un cable: no se menciona un circuito ni flujo continuo de carga.",
        "d": "Reflexión de la luz en el papel: la luz no explica la atracción de los pedazos de papel.",
        "e": "Evaporación del agua del cabello: no es el fenómeno que provoca la atracción eléctrica."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 111,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-112",
      "number": 112,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Magnetismo: brújula y campo magnético terrestre",
      "baseText": "Observa la orientación de la aguja de la brújula.",
      "basePill": null,
      "prompt": "¿Por qué la aguja de la brújula se orienta de esa manera?",
      "options": [
        {
          "label": "a",
          "text": "Porque la brújula mide la temperatura del aire."
        },
        {
          "label": "b",
          "text": "Porque la aguja responde al sonido del ambiente."
        },
        {
          "label": "c",
          "text": "Porque la gravedad cambia de dirección cada minuto."
        },
        {
          "label": "d",
          "text": "Porque la luz del Sol empuja la aguja hacia el norte."
        },
        {
          "label": "e",
          "text": "Porque la aguja imantada interactúa con el campo magnético terrestre."
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Porque la aguja imantada interactúa con el campo magnético terrestre.",
      "hint": "La brújula funciona gracias al magnetismo, no por calor, sonido o luz.",
      "correctArgument": "La aguja de una brújula es un pequeño imán. Como la Tierra tiene un campo magnético, la aguja se orienta aproximadamente en la dirección norte sur al interactuar con ese campo.",
      "incorrectArgumentsByOption": {
        "a": "Porque la brújula mide la temperatura del aire: la brújula no mide temperatura; para eso se usa un termómetro.",
        "b": "Porque la aguja responde al sonido del ambiente: el sonido no orienta la aguja de la brújula.",
        "c": "Porque la gravedad cambia de dirección cada minuto: la gravedad no cambia así ni explica la orientación norte sur.",
        "d": "Porque la luz del Sol empuja la aguja hacia el norte: la luz no es la causa del funcionamiento normal de una brújula."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/fisica/reactivo-112-brujula.png",
        "alt": "Física, reactivo 112: Brújula con aguja orientada norte-sur para interpretar el campo magnético terrestre.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/fisica/reactivo-112-brujula.png",
          "alt": "Física, reactivo 112: Brújula con aguja orientada norte-sur para interpretar el campo magnético terrestre.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 112,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-113",
      "number": 113,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Corriente y magnetismo: corriente que genera campo magnético",
      "baseText": "Un alambre conectado a una pila pasa cerca de una brújula. Cuando se cierra el circuito y circula corriente, la aguja de la brújula se desvía.",
      "basePill": null,
      "prompt": "¿Qué muestra mejor este experimento?",
      "options": [
        {
          "label": "a",
          "text": "Que una brújula solo funciona dentro del agua."
        },
        {
          "label": "b",
          "text": "Que una corriente eléctrica puede generar un campo magnético."
        },
        {
          "label": "c",
          "text": "Que la pila enfría el alambre hasta mover la aguja."
        },
        {
          "label": "d",
          "text": "Que el alambre pierde toda su masa cuando circula corriente."
        },
        {
          "label": "e",
          "text": "Que el interruptor cambia la gravedad alrededor de la brújula."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Que una corriente eléctrica puede generar un campo magnético.",
      "hint": "Observa qué ocurre cuando empieza a circular corriente por el alambre.",
      "correctArgument": "Cuando circula corriente por un alambre, se produce un campo magnético alrededor de él. Ese campo puede interactuar con la aguja imantada de la brújula y desviarla.",
      "incorrectArgumentsByOption": {
        "a": "Que una brújula solo funciona dentro del agua: la brújula puede funcionar fuera del agua.",
        "c": "Que la pila enfría el alambre hasta mover la aguja: el movimiento de la aguja se relaciona con magnetismo, no con enfriamiento.",
        "d": "Que el alambre pierde toda su masa cuando circula corriente: la corriente no implica pérdida total de masa.",
        "e": "Que el interruptor cambia la gravedad alrededor de la brújula: el interruptor permite o impide el paso de corriente, no modifica la gravedad."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/fisica/reactivo-113-corriente-brujula.png",
        "alt": "Física, reactivo 113: Circuito con alambre y brújula cercana para observar el efecto magnético de la corriente eléctrica.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/fisica/reactivo-113-corriente-brujula.png",
          "alt": "Física, reactivo 113: Circuito con alambre y brújula cercana para observar el efecto magnético de la corriente eléctrica.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 113,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-114",
      "number": 114,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Gases: teoría cinética, partículas en movimiento y temperatura",
      "baseText": null,
      "basePill": null,
      "prompt": "Un globo con aire se coloca en agua tibia durante algunos minutos. Después se observa que el globo aumenta ligeramente su tamaño.\n\n¿Cuál explicación se relaciona mejor con la teoría cinética de los gases?",
      "options": [
        {
          "label": "a",
          "text": "Las partículas del aire se detienen y ocupan menos espacio."
        },
        {
          "label": "b",
          "text": "El aire se transforma en metal dentro del globo."
        },
        {
          "label": "c",
          "text": "Al aumentar la temperatura, las partículas del gas se mueven más rápido y chocan más con las paredes del globo."
        },
        {
          "label": "d",
          "text": "El agua tibia elimina todas las partículas del gas."
        },
        {
          "label": "e",
          "text": "El globo crece porque la masa del aire se duplica de inmediato."
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Al aumentar la temperatura, las partículas del gas se mueven más rápido y chocan más con las paredes del globo.",
      "hint": "Relaciona temperatura con movimiento de partículas.",
      "correctArgument": "Según la teoría cinética, las partículas de un gas están en movimiento constante. Cuando aumenta la temperatura, se mueven más rápido y chocan con mayor frecuencia e intensidad contra las paredes del recipiente. Por eso el globo puede expandirse.",
      "incorrectArgumentsByOption": {
        "a": "Las partículas del aire se detienen y ocupan menos espacio: ocurre lo contrario, al calentarse se mueven más.",
        "b": "El aire se transforma en metal dentro del globo: no hay cambio de sustancia de ese tipo.",
        "d": "El agua tibia elimina todas las partículas del gas: el aire sigue dentro del globo.",
        "e": "El globo crece porque la masa del aire se duplica de inmediato: el aumento de tamaño se explica por el movimiento de partículas, no por duplicación inmediata de masa."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 114,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-115",
      "number": 115,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Ondas: transmisión de energía",
      "baseText": "Una estudiante mueve hacia arriba y abajo un extremo de una cuerda tensa. Se observa una perturbación que avanza por la cuerda hasta llegar al otro extremo.",
      "basePill": null,
      "prompt": "¿Qué se transmite principalmente mediante la onda que avanza por la cuerda?",
      "options": [
        {
          "label": "a",
          "text": "Energía"
        },
        {
          "label": "b",
          "text": "Masa de toda la cuerda"
        },
        {
          "label": "c",
          "text": "Aire caliente"
        },
        {
          "label": "d",
          "text": "Carga eléctrica permanente"
        },
        {
          "label": "e",
          "text": "Luz visible"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Energía",
      "hint": "La cuerda vibra, pero no viaja completa de un extremo al otro.",
      "correctArgument": "Una onda transporta energía de un punto a otro sin trasladar toda la materia del medio. En este caso, la cuerda vibra, pero lo que se propaga a lo largo de ella es la perturbación que transporta energía.",
      "incorrectArgumentsByOption": {
        "b": "Masa de toda la cuerda: la cuerda no se mueve completa de un extremo al otro.",
        "c": "Aire caliente: no es lo que se propaga por la cuerda.",
        "d": "Carga eléctrica permanente: no corresponde al fenómeno descrito.",
        "e": "Luz visible: la situación describe una onda mecánica en una cuerda, no una onda luminosa."
      },
      "visual": {
        "kind": "image",
        "position": "base",
        "required": true,
        "src": "assets/fisica/reactivo-115-onda-cuerda.png",
        "alt": "Física, reactivo 115: Onda transversal en una cuerda para reconocer la transmisión de energía.",
        "internalInstructionRemoved": true
      },
      "visuals": [
        {
          "kind": "image",
          "position": "base",
          "required": true,
          "src": "assets/fisica/reactivo-115-onda-cuerda.png",
          "alt": "Física, reactivo 115: Onda transversal en una cuerda para reconocer la transmisión de energía.",
          "internalInstructionRemoved": true
        }
      ],
      "sourceOrder": 115,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-116",
      "number": 116,
      "areaId": "fisica",
      "areaName": "Física",
      "block": "Luz visible: relación entre longitud de onda y color",
      "baseText": null,
      "basePill": null,
      "prompt": "En la luz visible, el color rojo tiene una longitud de onda mayor que el color azul.\n\nCon base en esta relación, ¿cuál afirmación es correcta?",
      "options": [
        {
          "label": "a",
          "text": "La luz azul tiene siempre mayor longitud de onda que la roja."
        },
        {
          "label": "b",
          "text": "La luz roja tiene mayor longitud de onda que la azul."
        },
        {
          "label": "c",
          "text": "Todos los colores visibles tienen exactamente la misma longitud de onda."
        },
        {
          "label": "d",
          "text": "La longitud de onda no se relaciona con el color."
        },
        {
          "label": "e",
          "text": "La luz visible no forma parte de las ondas electromagnéticas."
        }
      ],
      "correctOption": "b",
      "correctOptionText": "La luz roja tiene mayor longitud de onda que la azul.",
      "hint": "Compara solo la longitud de onda entre rojo y azul dentro del espectro visible.",
      "correctArgument": "Dentro del espectro visible, los colores se relacionan con diferentes longitudes de onda. El rojo tiene una longitud de onda mayor que el azul, por eso la afirmación correcta es que la luz roja tiene mayor longitud de onda.",
      "incorrectArgumentsByOption": {
        "a": "La luz azul tiene siempre mayor longitud de onda que la roja: invierte la relación indicada.",
        "c": "Todos los colores visibles tienen exactamente la misma longitud de onda: si fueran iguales, no se distinguirían por color.",
        "d": "La longitud de onda no se relaciona con el color: en la luz visible, el color sí se relaciona con la longitud de onda.",
        "e": "La luz visible no forma parte de las ondas electromagnéticas: la luz visible sí pertenece al espectro electromagnético."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 116,
      "rangeStart": 105,
      "rangeEnd": 116
    },
    {
      "id": "reactivo-117",
      "number": 117,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Identidad personal: decisiones y relación con el entorno",
      "baseText": null,
      "basePill": null,
      "prompt": "Daniela quiere mejorar sus calificaciones, pero algunas amistades le insisten en faltar a clases y copiar tareas. Ella decide organizar sus horarios, pedir apoyo a su maestra y explicar a sus amistades que no quiere afectar sus metas.\n\n¿Qué aspecto de su identidad personal se muestra en esta decisión?",
      "options": [
        {
          "label": "a",
          "text": "Dependencia total de la opinión del grupo"
        },
        {
          "label": "b",
          "text": "Rechazo de cualquier convivencia social"
        },
        {
          "label": "c",
          "text": "Falta de responsabilidad ante sus estudios"
        },
        {
          "label": "d",
          "text": "Obediencia automática a la presión de sus amistades"
        },
        {
          "label": "e",
          "text": "Autonomía responsable para decidir conforme a sus metas"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Autonomía responsable para decidir conforme a sus metas",
      "hint": "Observa si Daniela decide por presión externa o si considera sus metas y consecuencias.",
      "correctArgument": "Daniela toma una decisión considerando sus metas escolares, sus responsabilidades y las consecuencias de sus actos. No rompe necesariamente con su grupo, pero establece un límite. Eso muestra autonomía responsable en la construcción de su identidad personal.",
      "incorrectArgumentsByOption": {
        "a": "Dependencia total de la opinión del grupo: Daniela no actúa según la presión de sus amistades.",
        "b": "Rechazo de cualquier convivencia social: ella no rechaza convivir, sino que decide no participar en acciones que afectan sus metas.",
        "c": "Falta de responsabilidad ante sus estudios: ocurre lo contrario, porque busca mejorar sus calificaciones.",
        "d": "Obediencia automática a la presión de sus amistades: Daniela no obedece esa presión, sino que toma una decisión propia."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 117,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-118",
      "number": 118,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Derechos y obligaciones: distinguirlos en casos cotidianos",
      "baseText": null,
      "basePill": null,
      "prompt": "En una secundaria, todos los alumnos tienen derecho a recibir clases, usar la biblioteca y participar en actividades escolares. Al mismo tiempo, deben asistir con regularidad, respetar a sus compañeros y cuidar los materiales comunes.\n\n¿Cuál opción distingue correctamente un derecho y una obligación?",
      "options": [
        {
          "label": "a",
          "text": "Derecho: faltar sin avisar; obligación: recibir clases"
        },
        {
          "label": "b",
          "text": "Derecho: recibir educación; obligación: cuidar los materiales comunes"
        },
        {
          "label": "c",
          "text": "Derecho: dañar mobiliario; obligación: usar la biblioteca"
        },
        {
          "label": "d",
          "text": "Derecho: interrumpir la clase; obligación: participar en actividades"
        },
        {
          "label": "e",
          "text": "Derecho: ignorar acuerdos; obligación: recibir apoyo escolar"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Derecho: recibir educación; obligación: cuidar los materiales comunes",
      "hint": "Un derecho protege algo que la persona puede exigir; una obligación indica una responsabilidad que debe cumplir.",
      "correctArgument": "Recibir educación es un derecho porque permite el desarrollo de las personas y debe ser garantizado. Cuidar los materiales comunes es una obligación porque ayuda a que todos puedan usar los recursos escolares.",
      "incorrectArgumentsByOption": {
        "a": "Derecho: faltar sin avisar; obligación: recibir clases: faltar sin avisar no es un derecho y recibir clases corresponde a un derecho, no a una obligación del alumno.",
        "c": "Derecho: dañar mobiliario; obligación: usar la biblioteca: dañar mobiliario afecta a otros y no es un derecho.",
        "d": "Derecho: interrumpir la clase; obligación: participar en actividades: interrumpir afecta el derecho de otros a aprender.",
        "e": "Derecho: ignorar acuerdos; obligación: recibir apoyo escolar: ignorar acuerdos no es un derecho; recibir apoyo escolar se relaciona con el derecho a la educación."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 118,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-119",
      "number": 119,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Democracia: principio de mayoría y reglas de convivencia",
      "baseText": null,
      "basePill": null,
      "prompt": "Un grupo debe elegir el proyecto final de la materia. Después de escuchar tres propuestas, votan. La propuesta ganadora obtiene la mayoría, pero el grupo acuerda incorporar una sugerencia de quienes votaron por otra opción.\n\n¿Qué principio democrático se aplica mejor?",
      "options": [
        {
          "label": "a",
          "text": "La minoría siempre debe decidir por encima de los demás."
        },
        {
          "label": "b",
          "text": "La mayoría puede ignorar todas las opiniones distintas."
        },
        {
          "label": "c",
          "text": "Las decisiones deben tomarse sin diálogo."
        },
        {
          "label": "d",
          "text": "La mayoría decide, pero se respetan las opiniones de la minoría."
        },
        {
          "label": "e",
          "text": "La votación elimina la necesidad de acuerdos."
        }
      ],
      "correctOption": "d",
      "correctOptionText": "La mayoría decide, pero se respetan las opiniones de la minoría.",
      "hint": "La democracia no solo implica votar; también requiere escuchar y respetar a quienes piensan diferente.",
      "correctArgument": "En una convivencia democrática, la mayoría puede tomar decisiones mediante votación, pero eso no significa ignorar a quienes tienen otra opinión. Incorporar una sugerencia de la minoría muestra respeto, diálogo y búsqueda de acuerdos.",
      "incorrectArgumentsByOption": {
        "a": "La minoría siempre debe decidir por encima de los demás: la minoría debe ser respetada, pero no sustituye automáticamente la decisión de la mayoría.",
        "b": "La mayoría puede ignorar todas las opiniones distintas: eso debilita la convivencia democrática.",
        "c": "Las decisiones deben tomarse sin diálogo: el caso muestra diálogo antes y después de votar.",
        "e": "La votación elimina la necesidad de acuerdos: la votación ayuda a decidir, pero los acuerdos siguen siendo importantes."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 119,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-120",
      "number": 120,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Participación ciudadana: formas de participar y responsabilidades",
      "baseText": null,
      "basePill": null,
      "prompt": "Vecinas y vecinos detectan que un parque está deteriorado. En lugar de destruir mobiliario o bloquear una avenida sin aviso, reúnen evidencias, organizan una asamblea, elaboran una solicitud y la presentan ante la autoridad correspondiente.\n\n¿Qué forma de participación ciudadana representa el caso?",
      "options": [
        {
          "label": "a",
          "text": "Participación organizada, responsable y pacífica"
        },
        {
          "label": "b",
          "text": "Imposición de una decisión particular"
        },
        {
          "label": "c",
          "text": "Desinterés por el espacio público"
        },
        {
          "label": "d",
          "text": "Sustitución completa de las autoridades"
        },
        {
          "label": "e",
          "text": "Uso de violencia para resolver problemas"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Participación organizada, responsable y pacífica",
      "hint": "Identifica si las personas actúan de manera colectiva, ordenada y con respeto a los procedimientos.",
      "correctArgument": "El caso muestra participación ciudadana porque las personas se organizan para atender un problema común. Además, actúan de forma pacífica, reúnen información y acuden a una autoridad, lo que fortalece la vida comunitaria.",
      "incorrectArgumentsByOption": {
        "b": "Imposición de una decisión particular: no imponen por la fuerza, sino que presentan una solicitud colectiva.",
        "c": "Desinterés por el espacio público: ocurre lo contrario, buscan mejorar el parque.",
        "d": "Sustitución completa de las autoridades: no reemplazan a la autoridad, sino que le solicitan atención.",
        "e": "Uso de violencia para resolver problemas: el caso evita acciones violentas."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 120,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-121",
      "number": 121,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Valores: estético, económico y moral en situaciones",
      "baseText": null,
      "basePill": null,
      "prompt": "Luis encuentra a la venta un celular muy barato y con diseño atractivo. Sin embargo, nota que el vendedor no puede demostrar su procedencia y sospecha que pudo ser robado. Decide no comprarlo.\n\n¿Qué tipo de valor orienta principalmente la decisión de Luis?",
      "options": [
        {
          "label": "a",
          "text": "Valor estético, porque el celular tiene buen diseño"
        },
        {
          "label": "b",
          "text": "Valor económico, porque el precio es bajo"
        },
        {
          "label": "c",
          "text": "Valor recreativo, porque podría usarlo para juegos"
        },
        {
          "label": "d",
          "text": "Valor técnico, porque el aparato funciona"
        },
        {
          "label": "e",
          "text": "Valor moral, porque considera si la compra es justa y correcta"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Valor moral, porque considera si la compra es justa y correcta",
      "hint": "Fíjate en que Luis no decide por apariencia ni por precio, sino por lo que considera correcto.",
      "correctArgument": "El valor moral se relaciona con distinguir entre acciones justas o injustas, honestas o deshonestas. Luis decide no comprar el celular porque sospecha que adquirirlo podría apoyar una acción incorrecta.",
      "incorrectArgumentsByOption": {
        "a": "Valor estético, porque el celular tiene buen diseño: el diseño le llama la atención, pero no determina su decisión.",
        "b": "Valor económico, porque el precio es bajo: el precio es atractivo, pero Luis decide no comprar por razones éticas.",
        "c": "Valor recreativo, porque podría usarlo para juegos: no es el criterio que guía la decisión.",
        "d": "Valor técnico, porque el aparato funciona: el funcionamiento no resuelve la duda sobre su procedencia."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 121,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-122",
      "number": 122,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Territorio y soberanía: significado en ejemplos",
      "baseText": null,
      "basePill": null,
      "prompt": "Un país establece normas para proteger sus bosques, mares, ríos y recursos del subsuelo. También decide cómo administrar su territorio y defender sus límites frente a otros Estados.\n\n¿Qué concepto se relaciona mejor con esta situación?",
      "options": [
        {
          "label": "a",
          "text": "Consumo individual"
        },
        {
          "label": "b",
          "text": "Moda cultural"
        },
        {
          "label": "c",
          "text": "Soberanía sobre el territorio"
        },
        {
          "label": "d",
          "text": "Competencia deportiva"
        },
        {
          "label": "e",
          "text": "Opinión personal"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Soberanía sobre el territorio",
      "hint": "Busca el concepto relacionado con la autoridad de un Estado para decidir sobre su territorio y recursos.",
      "correctArgument": "La soberanía implica que un Estado tiene autoridad para tomar decisiones dentro de su territorio, establecer leyes, proteger recursos y defender sus límites frente a otros Estados.",
      "incorrectArgumentsByOption": {
        "a": "Consumo individual: se refiere a decisiones personales de compra, no a autoridad territorial.",
        "b": "Moda cultural: trata de gustos o tendencias, no de organización política del territorio.",
        "d": "Competencia deportiva: no tiene relación con normas sobre territorio y recursos.",
        "e": "Opinión personal: una opinión no equivale a la facultad del Estado para ejercer autoridad territorial."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 122,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-123",
      "number": 123,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Violencia económica: reconocerla en un caso y qué derechos se afectan",
      "baseText": null,
      "basePill": null,
      "prompt": "María trabaja y recibe un salario. Su pareja le quita todo el dinero, revisa cada gasto, le prohíbe comprar artículos personales y le impide ahorrar o decidir sobre sus propios ingresos.\n\n¿Qué tipo de violencia se reconoce principalmente en el caso?",
      "options": [
        {
          "label": "a",
          "text": "Violencia física"
        },
        {
          "label": "b",
          "text": "Violencia digital"
        },
        {
          "label": "c",
          "text": "Violencia escolar"
        },
        {
          "label": "d",
          "text": "Violencia económica"
        },
        {
          "label": "e",
          "text": "Violencia vial"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Violencia económica",
      "hint": "Observa si el control se ejerce sobre el dinero, los recursos y la posibilidad de decidir sobre ellos.",
      "correctArgument": "La violencia económica ocurre cuando una persona controla, limita o se apropia de los recursos económicos de otra para afectar su autonomía. En el caso, María no puede decidir sobre su salario ni ahorrar, por lo que se vulnera su libertad y seguridad económica.",
      "incorrectArgumentsByOption": {
        "a": "Violencia física: implicaría golpes o daño corporal directo, lo cual no se describe en el caso.",
        "b": "Violencia digital: se relaciona con daño o control mediante medios digitales.",
        "c": "Violencia escolar: ocurre dentro de contextos escolares entre integrantes de la comunidad educativa.",
        "e": "Violencia vial: se relaciona con conductas de riesgo o agresión en calles y transporte."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 123,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-124",
      "number": 124,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Medios de comunicación: función social y responsabilidad",
      "baseText": null,
      "basePill": null,
      "prompt": "En un grupo de mensajería circula un audio que acusa a una persona de cometer un delito, pero no incluye fuente confiable ni evidencia. Antes de compartirlo, Ana revisa si la información proviene de una autoridad o medio confiable y decide no difundirlo.\n\n¿Qué responsabilidad ciudadana muestra Ana?",
      "options": [
        {
          "label": "a",
          "text": "Compartir cualquier mensaje para que todos opinen"
        },
        {
          "label": "b",
          "text": "Verificar información antes de difundirla"
        },
        {
          "label": "c",
          "text": "Aumentar rumores para presionar a la comunidad"
        },
        {
          "label": "d",
          "text": "Sustituir la investigación de las autoridades"
        },
        {
          "label": "e",
          "text": "Publicar acusaciones sin revisar su origen"
        }
      ],
      "correctOption": "b",
      "correctOptionText": "Verificar información antes de difundirla",
      "hint": "Piensa en el daño que puede causar difundir información no comprobada.",
      "correctArgument": "Los medios y redes de comunicación deben usarse con responsabilidad. Verificar información antes de compartirla ayuda a evitar rumores, daños a la reputación de personas y desinformación dentro de la comunidad.",
      "incorrectArgumentsByOption": {
        "a": "Compartir cualquier mensaje para que todos opinen: difundir sin revisar puede causar daño.",
        "c": "Aumentar rumores para presionar a la comunidad: fomenta desinformación y conflicto.",
        "d": "Sustituir la investigación de las autoridades: Ana no investiga como autoridad, solo actúa responsablemente al no difundir información dudosa.",
        "e": "Publicar acusaciones sin revisar su origen: es una conducta irresponsable."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 124,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-125",
      "number": 125,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Cuidado del entorno natural: acciones concretas y efectos",
      "baseText": null,
      "basePill": null,
      "prompt": "Una escuela quiere reducir el impacto ambiental de sus actividades. Para ello propone separar residuos, evitar plásticos de un solo uso, reparar fugas de agua y usar hojas por ambos lados.\n\n¿Qué efecto pueden tener estas acciones?",
      "options": [
        {
          "label": "a",
          "text": "Aumentar el desperdicio de agua y papel"
        },
        {
          "label": "b",
          "text": "Impedir cualquier convivencia escolar"
        },
        {
          "label": "c",
          "text": "Eliminar todos los problemas ambientales del país de inmediato"
        },
        {
          "label": "d",
          "text": "Sustituir la participación de la comunidad"
        },
        {
          "label": "e",
          "text": "Disminuir el consumo de recursos y la generación de residuos"
        }
      ],
      "correctOption": "e",
      "correctOptionText": "Disminuir el consumo de recursos y la generación de residuos",
      "hint": "Relaciona cada acción con el uso responsable de agua, papel y materiales.",
      "correctArgument": "Separar residuos, reducir plásticos, reparar fugas y reutilizar hojas son acciones concretas que disminuyen el desperdicio y favorecen el cuidado del entorno natural. No resuelven todos los problemas ambientales, pero sí ayudan en el espacio escolar.",
      "incorrectArgumentsByOption": {
        "a": "Aumentar el desperdicio de agua y papel: las acciones buscan reducirlo.",
        "b": "Impedir cualquier convivencia escolar: no afectan negativamente la convivencia; pueden fortalecerla mediante acuerdos.",
        "c": "Eliminar todos los problemas ambientales del país de inmediato: exagera el alcance de acciones escolares.",
        "d": "Sustituir la participación de la comunidad: estas acciones requieren justamente participación comunitaria."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 125,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-126",
      "number": 126,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Resolución de conflictos: negociación y diálogo",
      "baseText": null,
      "basePill": null,
      "prompt": "Dos grupos quieren usar la cancha escolar a la misma hora. En lugar de gritarse o empujarse, exponen sus necesidades, escuchan propuestas y acuerdan turnarse los días de uso.\n\n¿Qué forma de resolución de conflictos aplicaron?",
      "options": [
        {
          "label": "a",
          "text": "Imposición"
        },
        {
          "label": "b",
          "text": "Castigo colectivo"
        },
        {
          "label": "c",
          "text": "Negociación mediante diálogo"
        },
        {
          "label": "d",
          "text": "Evasión permanente"
        },
        {
          "label": "e",
          "text": "Competencia sin reglas"
        }
      ],
      "correctOption": "c",
      "correctOptionText": "Negociación mediante diálogo",
      "hint": "Busca la opción donde las partes escuchan, proponen y llegan a un acuerdo.",
      "correctArgument": "La negociación mediante diálogo permite que las partes expresen sus intereses, escuchen a los demás y construyan un acuerdo. En este caso, turnarse los días de uso evita la agresión y atiende las necesidades de ambos grupos.",
      "incorrectArgumentsByOption": {
        "a": "Imposición: nadie obliga unilateralmente al otro grupo.",
        "b": "Castigo colectivo: no se sanciona a todos, sino que se busca una solución.",
        "d": "Evasión permanente: el problema no se ignora, se atiende.",
        "e": "Competencia sin reglas: el acuerdo establece una forma ordenada de uso."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 126,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-127",
      "number": 127,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Derechos y obligaciones: igualdad y no discriminación",
      "baseText": null,
      "basePill": null,
      "prompt": "Durante la organización de una obra escolar, un alumno propone que Sofía no participe porque usa silla de ruedas. Otra compañera señala que deben adaptar el espacio para que Sofía pueda integrarse como los demás.\n\n¿Qué derecho se busca proteger?",
      "options": [
        {
          "label": "a",
          "text": "Igualdad y no discriminación"
        },
        {
          "label": "b",
          "text": "Privilegio exclusivo de un grupo"
        },
        {
          "label": "c",
          "text": "Derecho a excluir por comodidad"
        },
        {
          "label": "d",
          "text": "Obligación de competir físicamente"
        },
        {
          "label": "e",
          "text": "Derecho a cancelar la actividad"
        }
      ],
      "correctOption": "a",
      "correctOptionText": "Igualdad y no discriminación",
      "hint": "Observa si la situación trata de impedir o permitir la participación de una persona en condiciones de respeto.",
      "correctArgument": "La igualdad y la no discriminación implican que todas las personas deben tener oportunidades de participar y ser tratadas con dignidad. Adaptar el espacio busca eliminar una barrera y evitar excluir a Sofía por su condición.",
      "incorrectArgumentsByOption": {
        "b": "Privilegio exclusivo de un grupo: la propuesta busca incluir, no dar privilegios injustificados.",
        "c": "Derecho a excluir por comodidad: excluir por una condición personal es discriminatorio.",
        "d": "Obligación de competir físicamente: la obra escolar no exige competir físicamente.",
        "e": "Derecho a cancelar la actividad: no se busca cancelar, sino hacerla accesible."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 127,
      "rangeStart": 117,
      "rangeEnd": 128
    },
    {
      "id": "reactivo-128",
      "number": 128,
      "areaId": "formacion-civica-etica",
      "areaName": "Formación cívica y ética",
      "block": "Democracia y cultura de la legalidad: reglas comunes",
      "baseText": null,
      "basePill": null,
      "prompt": "En una escuela se acuerda que los representantes de grupo serán elegidos por votación. Un alumno no está conforme con el resultado, pero reconoce que el proceso fue limpio y decide presentar sus propuestas en la siguiente asamblea.\n\n¿Qué actitud favorece la cultura democrática?",
      "options": [
        {
          "label": "a",
          "text": "Desconocer cualquier resultado cuando no conviene"
        },
        {
          "label": "b",
          "text": "Impedir que la mayoría participe"
        },
        {
          "label": "c",
          "text": "Romper los acuerdos para repetir la votación sin motivo"
        },
        {
          "label": "d",
          "text": "Respetar las reglas comunes y usar mecanismos de participación"
        },
        {
          "label": "e",
          "text": "Evitar toda participación futura"
        }
      ],
      "correctOption": "d",
      "correctOptionText": "Respetar las reglas comunes y usar mecanismos de participación",
      "hint": "Distingue entre estar en desacuerdo y actuar de manera responsable dentro de las reglas acordadas.",
      "correctArgument": "La cultura democrática exige respetar reglas comunes cuando el proceso fue limpio, aunque el resultado no sea el preferido. Presentar propuestas en la siguiente asamblea permite seguir participando de forma responsable.",
      "incorrectArgumentsByOption": {
        "a": "Desconocer cualquier resultado cuando no conviene: debilita la confianza en los acuerdos democráticos.",
        "b": "Impedir que la mayoría participe: contradice la participación democrática.",
        "c": "Romper los acuerdos para repetir la votación sin motivo: no respeta las reglas establecidas.",
        "e": "Evitar toda participación futura: aleja al alumno de los mecanismos democráticos."
      },
      "visual": {
        "kind": "none",
        "content": ""
      },
      "visuals": [],
      "sourceOrder": 128,
      "rangeStart": 117,
      "rangeEnd": 128
    }
  ]
};
