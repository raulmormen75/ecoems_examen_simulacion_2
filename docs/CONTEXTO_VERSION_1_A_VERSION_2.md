# Contexto de la versión 1 para generar la versión 2

## Propósito del documento

Este archivo concentra el estado real de la primera versión del simulador ECOEMS IFR y sirve como contexto de trabajo para planear la segunda versión con ChatGPT 5.5 Pro.

No sustituye al código ni al historial de Git. Resume lo que ya se construyó, qué decisiones deben respetarse y qué aprendizajes conviene conservar para que la siguiente versión no empiece desde cero ni repita problemas ya corregidos.

## Ligas oficiales

- Repositorio GitHub: https://github.com/raulmormen75/ecoems_examen_simulacion_1.git
- Aplicación en Vercel: https://ecoems-examen-simulacion-1.vercel.app/
- Rama publicada revisada localmente: `main`
- Remoto local revisado: `origin`

## Identidad del proyecto

La aplicación es un simulador educativo para practicar el examen ECOEMS con identidad institucional IFR. Está pensada para estudiantes que necesitan practicar con una experiencia ordenada, exigente y clara, cercana a un examen real, pero con retroalimentación pedagógica inmediata.

El objetivo pedagógico de la versión 1 es que el alumno pueda:

- Iniciar un intento completo del examen.
- Avanzar de manera secuencial por los reactivos.
- Responder sin ver reactivos futuros.
- Recibir retroalimentación clara después de contestar.
- Revisar al cierre sus aciertos, errores y bloques por reforzar.
- Descargar un resultado final en PNG como evidencia.

La versión 2 debe conservar este enfoque: práctica seria, interfaz limpia, información útil y retroalimentación sin ambigüedad.

## Estado actual verificado

El repositorio local revisado contiene una app web estática. No depende de un framework de frontend para ejecutarse.

Archivos principales:

- `index.html`: estructura base de la app, portada, shell del examen y puntos de montaje.
- `exam-app.js`: lógica de estado, inicio, cronómetro, avance, respuestas, retroalimentación, cierre, resumen final y descarga.
- `exam-styles.css`: identidad visual IFR, layout responsivo, tarjetas de reactivos, opciones, paneles, modales, tablas, figuras y resultado final.
- `build-exam-data.js`: parser que toma el archivo fuente del examen y genera datos estructurados.
- `exam-data.js`: datos generados como `window.IFR_APP_DATA`.
- `Examen simulación 1.txt`: fuente base del contenido.
- `assets/`: imágenes de apoyo visual para reactivos específicos.
- `qa/run-exam-qa.js`: pruebas automatizadas de flujo, visuales, responsividad, contenido, descarga y casos puntuales.
- `plan.md`, `implement.md`, `documentation.md`: documentos operativos previos de planeación, implementación y estado.

Datos estructurados actuales:

- Total de reactivos: 128.
- Total de áreas: 10.
- Duración del examen: 10,800 segundos, equivalente a 3 horas.
- Modo de calificación registrado: puntaje bruto más porcentaje.

## Base funcional de la versión 1

La versión 1 ya cuenta con una estructura funcional completa:

- Portada inicial con identidad IFR.
- Botón de inicio para comenzar el intento.
- Cronómetro de 3 horas.
- Avance secuencial por reactivo.
- Bloqueo de reactivos futuros.
- Métricas en vivo: contestados, correctos, incorrectos y puntaje.
- Retroalimentación inmediata para opción correcta e incorrecta.
- Revisión opcional del reactivo anterior.
- Cierre por término natural del examen.
- Cierre por tiempo agotado.
- Revisión final solo de lectura.
- Panel persistente `Resultado final`.
- Lista de bloques temáticos por reforzar.
- Descarga del resultado final en PNG.
- Reinicio total al refrescar la página.
- Ajustes responsivos para escritorio, tableta y móvil.

La segunda versión no debe romper esta base funcional. Si se cambia contenido, estructura o interacción, debe mantenerse el mismo nivel de control del intento.

## Identidad visual y editorial que debe conservarse

La aplicación pertenece a IFR. Debe conservar una identidad académica, seria, moderna y limpia.

Criterios visuales que ya rigen la versión 1:

- Uso de azules institucionales IFR.
- Verde IFR solo como acento de avance, éxito o acción destacada.
- Fondo claro cuando ayuda a la lectura.
- Escudo institucional visible.
- Tipografía sans serif profesional.
- Jerarquía clara entre portada, reactivos, opciones, retroalimentación y cierre.
- Componentes con separación suficiente y bordes suaves.
- Evitar decoración que no aporte función.

Criterios editoriales:

- Español de México profesional.
- Texto claro, directo y útil para estudiantes.
- Sin lenguaje rebuscado.
- Sin redundancia innecesaria.
- Sin bloques largos que saturen la pantalla.
- Con términos técnicos cuando sean necesarios, pero explicados de forma entendible.
- Retroalimentación concreta y diferenciada entre acierto y error.

## Historial real de la versión 1

El historial local revisado muestra 31 commits publicados en `main`, entre el 19 de abril y el 2 de mayo de 2026.

### Fase 1. Carga inicial y simulador base

- `f431fbc` - 2026-04-19 - Initial exam simulator upload.

Esta fase dejó la primera versión funcional del simulador, con estructura base, contenido, estilos, lógica principal y documentos operativos iniciales.

### Fase 2. Retroalimentación ECOEMS y QA inicial

- `eb433ef` - 2026-04-20 - Ajusta feedback ECOEMS y agrega QA en Edge.

Se reforzó la retroalimentación para que las opciones correctas e incorrectas fueran claras. También se incorporó validación automatizada en navegador.

### Fase 3. Apoyo visual del reactivo 8

- `b061288` - 2026-04-20 - Agrega figuras SVG al reactivo 8.
- `3341a3e` - 2026-04-22 - Convierte a imágenes raster el reactivo 8.
- `a73bbc8` - 2026-04-24 - Estabiliza QA del reactivo 8.

El reactivo 8 pasó de figuras construidas como SVG a imágenes raster para mejorar estabilidad visual. Después se reforzó la prueba automatizada para verificar carga real de las imágenes del planteamiento y de las cinco opciones.

### Fase 4. Revisión opcional y experiencia de avance

- `ccf971c` - 2026-04-22 - Agrega recordatorio opcional de revisión.

Se agregó un recordatorio para que el alumno pudiera revisar el reactivo anterior sin interrumpir la progresión principal.

### Fase 5. Apoyos visuales en reactivos matemáticos y científicos

- `e68e332` - 2026-04-24 - Reemplaza figura del reactivo 11.
- `aeebe60` - 2026-04-24 - Agrega figura del reactivo 12.
- `42bf025` - 2026-04-24 - Agrega apoyo visual del reactivo 13.
- `f22b697` - 2026-04-24 - Agrega apoyo visual del reactivo 14.
- `5bb5b56` - 2026-04-24 - Agrega apoyo visual del reactivo 15.
- `5666797` - 2026-04-24 - Agrega apoyo visual del reactivo 16.
- `dc88bfb` - 2026-04-24 - Agregar apoyo visual al reactivo 44.
- `978084b` - 2026-04-24 - Agregar apoyo visual al reactivo 74.
- `024779c` - 2026-05-02 - Agregar apoyo visual al reactivo 94.

Se agregaron o reemplazaron imágenes para reactivos que dependían de figuras, tablas o representaciones visuales. La intención fue que el alumno pudiera interpretar el reactivo sin depender de texto visual mal acomodado o difícil de leer.

### Fase 6. Limpieza editorial de instrucciones redundantes

- `5b6a5c9` - 2026-04-24 - Quita instrucción redundante del reactivo 17.
- `e94d8b8` - 2026-04-24 - Valida retiro de instrucción en reactivos 19 y 20.
- `2e3d088` - 2026-04-24 - Valida retiro de instrucción en reactivos 17 a 43.
- `cbaa26a` - 2026-04-24 - Valida retiro de instrucción en reactivos 45 a 73.

Se redujo ruido textual en reactivos que arrastraban instrucciones repetidas. Esta línea de trabajo es importante para la versión 2: el contenido fuente no debe aceptarse de forma automática si trae marcas, encabezados o instrucciones que no ayudan al alumno.

### Fase 7. Resultado final, evidencia y cierre del examen

- `648ac26` - 2026-05-02 - Agregar panel de resultado final descargable.
- `d4235f8` - 2026-05-02 - Ampliar QA del cierre natural del examen.
- `feefc6a` - 2026-05-02 - Duplica boton de descarga en resultado final.
- `185b7da` - 2026-05-02 - Actualiza version de assets del resultado final.
- `a79154e` - 2026-05-02 - Excluye boton de descarga del PNG final.

Se construyó el panel `Resultado final`, con métricas, bloques por reforzar y descarga en PNG. Después se ajustó el comportamiento visual de la descarga para que el archivo final no incluyera botones innecesarios.

### Fase 8. Correcciones responsivas y lectura en móvil

- `23998a7` - 2026-05-02 - Corrige acomodo móvil del reactivo 7.
- `5654d99` - 2026-05-02 - Mejora desplazamiento de tablas en movil.

Se corrigieron problemas de acomodo y desborde horizontal en móvil. La versión 2 debe tratar la responsividad como requisito desde el contenido, no como ajuste final.

### Fase 9. Textos base, marcas de lectura y cápsulas IFR

- `17ac0bc` - 2026-05-02 - Marca frases foco en Español y Habilidad verbal.
- `ea1af18` - 2026-05-02 - Agrega texto base al reactivo 80.
- `29835fc` - 2026-05-02 - Sincroniza textos base compartidos.
- `4d1b070` - 2026-05-02 - Agrega capsulas IFR a lecturas.

Se mejoró la lectura de reactivos de Español y Habilidad verbal mediante resaltados, subrayados, textos base compartidos y cápsulas de lectura. La versión 2 debe cuidar que las lecturas, preguntas y opciones queden separadas con claridad.

### Fase 10. Ajuste puntual del reactivo 94

- `a542e2d` - 2026-05-02 - Ajustar texto del reactivo 94.

Se ajustó el contenido del reactivo 94 después de agregar apoyo visual. Este caso confirma que cada apoyo visual debe revisarse junto con la redacción del planteamiento.

## Decisiones que debe respetar la versión 2

La segunda versión debe conservar estas decisiones:

- Mantener identidad IFR y no mezclar una paleta ajena.
- Conservar una experiencia secuencial y controlada.
- Evitar que el alumno vea reactivos futuros antes de avanzar.
- Mantener retroalimentación visible e inequívoca.
- Diferenciar con claridad `Opción correcta` y `Opción incorrecta`.
- Conservar cierre por término y por tiempo agotado.
- Mantener resultado final con métricas y bloques por reforzar.
- Conservar descarga de evidencia cuando aplique.
- Revisar contenido fuente antes de mostrarlo.
- Eliminar instrucciones repetidas, encabezados internos y ruido editorial.
- Usar apoyos visuales cuando el reactivo lo necesite para ser comprensible.
- Validar escritorio, tableta y móvil antes de publicar.

## Lecciones para generar contenido de la versión 2

La versión 1 muestra varios aprendizajes prácticos:

- El contenido no debe importarse sin revisión editorial.
- Las lecturas largas necesitan separación visual, no más texto alrededor.
- Los reactivos con figuras deben tener assets claros, legibles y con texto alternativo.
- Las tablas y bloques preformateados deben probarse en móvil.
- La retroalimentación debe ayudar al alumno a entender el error, no solo indicar si falló.
- Las opciones no deben recibir marcas que pertenecen al planteamiento.
- Los textos base compartidos deben aparecer antes de la pregunta y no contaminar los argumentos.
- La descarga final debe enfocarse en la evidencia, sin controles visuales sobrantes.
- La QA debe revisar contenido, estado, interacción y responsividad.

## Requisitos específicos para la versión 2

La segunda versión debe tomar como base la experiencia técnica y pedagógica de la versión 1, pero no debe reciclar sus reactivos.

Requisitos de contenido:

- No basarse en los reactivos del `Examen simulación 1`.
- No basarse en las dos guías resueltas.
- Generar reactivos nuevos, con mayor dificultad que la versión 1.
- Mantener el nivel de conocimientos esperados para secundaria en México.
- No subir a nivel medio superior.
- Conservar la pista en cada reactivo.
- Mantener la misma estructura de contenido: área, bloque temático, planteamiento, opciones, pista, respuesta correcta, argumento de la respuesta correcta y argumentos de las respuestas incorrectas.

Requisitos sobre opciones correctas:

- Evitar concentrar respuestas correctas en la opción `a)`.
- Usar de manera equilibrada las opciones `a)`, `b)`, `c)`, `d)` y `e)`.
- No permitir patrones consecutivos evidentes.
- No repetir con frecuencia una misma letra como respuesta correcta.
- No crear secuencias fáciles de detectar, como alternancias mecánicas o ciclos previsibles.
- Revisar la distribución final de respuestas antes de entregar el contenido.

Requisitos por área:

- En Habilidad matemática, Matemáticas, Química, Física, Biología y Geografía, cuando un reactivo requiera apoyo visual, el TXT de contenido debe incluir instrucciones internas para Codex sobre cómo generar la imagen con `$imagegen` y GPT-Image 2.
- Esas instrucciones internas deben ser operativas, técnicas y privadas. No deben mostrarse en la aplicación ni quedar visibles para los alumnos.
- En Español y Habilidad verbal, mantener la renderización de palabras, frases, sinónimos o fragmentos que el reactivo solicite resaltar o subrayar.
- En Español y Habilidad verbal, los textos o fragmentos de lectura deben encerrarse en píldoras especiales para distinguirlos visualmente.
- Si un texto de Español o Habilidad verbal se relaciona con varios reactivos, debe repetirse en cada reactivo que lo necesite para que el alumno no tenga que regresar a un reactivo anterior.
- En Habilidad matemática, Matemáticas y Física, las tablas con muchas columnas deben tener espacio de desplazamiento horizontal y barra visible para evitar lectura apretada en móvil.

Formato recomendado para instrucciones internas de imagen en el TXT de contenido:

```text
[INSTRUCCIÓN INTERNA PARA CODEX - NO MOSTRAR EN LA APP]
Área: <área temática>
Reactivo: <número o identificador provisional>
Uso: generar apoyo visual para el planteamiento.
Herramienta: $imagegen con GPT-Image 2.
Tipo de imagen: <diagrama educativo / tabla visual / esquema científico / mapa / gráfica>.
Descripción técnica: <describir con precisión qué debe verse>.
Estilo: limpio, académico, legible, sin elementos decorativos innecesarios, con contraste suficiente.
Texto visible permitido: <solo si es indispensable>.
Texto visible prohibido: no incluir respuesta correcta, pistas, explicación ni marcas que resuelvan el reactivo.
Formato sugerido: PNG horizontal o cuadrado, alta legibilidad en móvil.
Destino sugerido: assets/reactivo-<n>/prompt/<nombre-descriptivo>.png.
Validación: la imagen debe ayudar a resolver el reactivo sin revelar la respuesta.
[/INSTRUCCIÓN INTERNA PARA CODEX]
```

## Reglas operativas para la versión 2

Al planear o construir la versión 2, aplicar estas reglas:

- No rediseñar lo que ya funciona si el cambio es de contenido.
- No agregar tarjetas, cápsulas o textos si no aportan utilidad directa.
- No saturar la interfaz con explicaciones repetidas.
- No confiar en que el archivo fuente viene bien redactado o bien marcado.
- No publicar sin prueba real.
- No dar por bueno un cambio solo porque compila o carga.
- Si hay duda entre más contenido o lectura rápida, elegir lectura rápida.
- Si hay duda entre decoración o claridad, elegir claridad.
- Si hay duda entre rapidez o verificación, elegir verificación.
- Si un reactivo necesita apoyo visual, planearlo desde el contenido y no improvisarlo al final.
- Si una tabla puede desbordarse en móvil, definir desde el contenido que requiere contenedor con desplazamiento horizontal.
- Si una lectura se usa en varios reactivos, repetirla donde corresponda para evitar que el alumno dependa de regresar a reactivos anteriores.

## Cómo correr y verificar la versión actual

Comandos locales:

```powershell
node build-exam-data.js
python -m http.server 4173
```

Después abrir:

```text
http://127.0.0.1:4173/
```

Pruebas esperadas:

- Iniciar examen.
- Responder un reactivo de forma correcta.
- Responder un reactivo de forma incorrecta.
- Confirmar que las métricas cambian.
- Confirmar que el siguiente reactivo se desbloquea.
- Confirmar que los reactivos futuros siguen bloqueados.
- Revisar figuras y tablas en escritorio y móvil.
- Cerrar por término natural.
- Confirmar que aparece `Resultado final`.
- Descargar PNG y confirmar que no está vacío.
- Revisar flujo de tiempo agotado cuando se pruebe ese caso.

## Prompt sugerido para ChatGPT 5.5 Pro

```text
Actúa como especialista en diseño instruccional, evaluación educativa y generación de contenido para aplicaciones web educativas IFR.

Voy a darte el contexto completo de la versión 1 del simulador ECOEMS IFR, incluyendo repositorio, aplicación publicada, historial de commits, decisiones técnicas, errores corregidos y reglas editoriales. Tu tarea no es reescribir la app ni proponer un rediseño visual desde cero. Tu tarea es ayudarme a planear y generar el contenido de la versión 2 con base en lo que ya funciona, evitando los errores detectados en la primera versión.

Repositorio que debes considerar como fuente de contexto técnico:
https://github.com/raulmormen75/ecoems_examen_simulacion_1.git

Aplicación publicada:
https://ecoems-examen-simulacion-1.vercel.app/

Antes de generar contenido, revisa el contexto del repositorio y toma en cuenta que la versión 1 ya registró en commits correcciones sobre retroalimentación, apoyos visuales, textos base, cápsulas de lectura, tablas en móvil, resultado final descargable y ajustes de reactivos puntuales.

Debes respetar estas condiciones:

1. La aplicación conserva identidad institucional IFR.
2. El contenido debe estar en español de México profesional, claro y adecuado para estudiantes.
3. No debe haber infoxicación, redundancia ni explicaciones infladas.
4. Cada reactivo debe tener planteamiento, opciones, respuesta correcta, argumento de la respuesta correcta y argumentos de opciones incorrectas.
5. Si hay textos base, deben estar separados de la pregunta y no contaminar opciones ni argumentos.
6. Si un reactivo requiere figura, tabla o imagen, debes indicarlo desde la planeación del contenido.
7. La retroalimentación debe explicar por qué la opción es correcta o incorrecta.
8. No debes confiar en que el contenido fuente viene listo; debes detectar problemas de redacción, estructura, marcas internas, instrucciones repetidas o ambigüedad.
9. La versión 2 debe conservar la experiencia secuencial, el cronómetro, las métricas, el resultado final y la revisión posterior.
10. Antes de proponer contenido final, debes entregar un plan verificable de estructura, criterios editoriales, tipos de reactivos, controles de calidad y riesgos.

Reglas nuevas para la versión 2:

1. No debes basarte en los reactivos del Examen simulación 1 ni en las dos guías resueltas.
2. Los reactivos deben ser nuevos.
3. El nivel de dificultad debe subir respecto a la versión 1, pero debe mantenerse dentro de conocimientos suficientes para secundaria en México.
4. No generes problemas de nivel medio superior.
5. Conserva la pista en todos los reactivos.
6. Conserva la estructura: área temática, bloque temático, planteamiento, opciones, pista, respuesta correcta, argumento de la respuesta correcta y argumentos de las respuestas incorrectas.
7. No cargues respuestas correctas en la opción a).
8. Distribuye las respuestas correctas de forma equilibrada entre a), b), c), d) y e).
9. No dejes patrones repetitivos, frecuentes o consecutivos de una misma respuesta correcta.
10. Evita secuencias previsibles como alternancias mecánicas o ciclos evidentes.
11. Antes de entregar el contenido, revisa la distribución de respuestas correctas y corrige cualquier sesgo.

Reglas por tipo de reactivo:

1. En Habilidad matemática, Matemáticas, Química, Física, Biología y Geografía, cuando un reactivo requiera apoyo visual, incluye en el TXT de contenido una instrucción interna para Codex sobre cómo generar la imagen con $imagegen y GPT-Image 2.
2. Esa instrucción interna debe estar marcada como privada y no debe mostrarse en la aplicación.
3. La instrucción interna debe describir la imagen de manera técnica: tipo de diagrama, elementos visibles, estilo, restricciones, texto permitido, texto prohibido, formato sugerido y ruta sugerida en assets.
4. La imagen no debe revelar la respuesta correcta ni resolver el reactivo por sí sola.
5. En Español y Habilidad verbal, conserva la indicación de palabras o fragmentos que deben resaltarse o subrayarse.
6. En Español y Habilidad verbal, los textos y fragmentos de lectura deben ir en píldoras visuales especiales.
7. Si un texto o fragmento se relaciona con varios reactivos, repítelo dentro de cada reactivo que lo necesite para que el alumno no tenga que regresar a un reactivo anterior.
8. En Habilidad matemática, Matemáticas y Física, cuando haya tablas con muchas columnas, indica que deben renderizarse con contenedor de desplazamiento horizontal y barra visible.

Formato obligatorio para cada reactivo:

Área temática:
<nombre del área>

Bloque que corresponde al área temática:
<nombre del bloque>

Texto base:
<solo si aplica; si pertenece a Español o Habilidad verbal, indicar que va en píldora visual especial>

Planteamiento:
<problema o pregunta>

Opciones:
a) <opción>
b) <opción>
c) <opción>
d) <opción>
e) <opción>

Pista:
<pista breve que oriente sin resolver>

Respuesta correcta:
<letra>

Argumento de la respuesta correcta:
<explicación clara>

Argumentos de las opciones incorrectas:
a) <explicación si es incorrecta; si es correcta, escribir "Es la respuesta correcta.">
b) <explicación si es incorrecta; si es correcta, escribir "Es la respuesta correcta.">
c) <explicación si es incorrecta; si es correcta, escribir "Es la respuesta correcta.">
d) <explicación si es incorrecta; si es correcta, escribir "Es la respuesta correcta.">
e) <explicación si es incorrecta; si es correcta, escribir "Es la respuesta correcta.">

Formato para instrucciones internas de imagen:

[INSTRUCCIÓN INTERNA PARA CODEX - NO MOSTRAR EN LA APP]
Área: <área temática>
Reactivo: <número o identificador provisional>
Uso: generar apoyo visual para el planteamiento.
Herramienta: $imagegen con GPT-Image 2.
Tipo de imagen: <diagrama educativo / tabla visual / esquema científico / mapa / gráfica>.
Descripción técnica: <describir con precisión qué debe verse>.
Estilo: limpio, académico, legible, sin elementos decorativos innecesarios, con contraste suficiente.
Texto visible permitido: <solo si es indispensable>.
Texto visible prohibido: no incluir respuesta correcta, pistas, explicación ni marcas que resuelvan el reactivo.
Formato sugerido: PNG horizontal o cuadrado, alta legibilidad en móvil.
Destino sugerido: assets/reactivo-<n>/prompt/<nombre-descriptivo>.png.
Validación: la imagen debe ayudar a resolver el reactivo sin revelar la respuesta.
[/INSTRUCCIÓN INTERNA PARA CODEX]

Con este contexto, genera un plan para construir el contenido de la versión 2. El plan debe incluir:

- Objetivo pedagógico de la versión 2.
- Estructura sugerida por áreas y bloques.
- Criterios para redactar reactivos.
- Criterios para retroalimentación correcta e incorrecta.
- Criterios para textos base, figuras, tablas y apoyos visuales.
- Checklist editorial antes de integrar contenido a la app.
- Checklist técnico para que Codex pueda convertir el contenido en datos de la aplicación.
- Riesgos que deben evitarse.
- Primer paquete de trabajo recomendado para iniciar la versión 2.

Después del plan, genera el contenido en paquetes revisables. No entregues todos los reactivos de golpe si eso reduce la calidad. En cada paquete, incluye una tabla de control con:

- Número de reactivo.
- Área.
- Bloque.
- Letra correcta.
- Si requiere imagen.
- Si requiere tabla con desplazamiento horizontal.
- Si requiere texto en píldora visual.
- Riesgo editorial o técnico detectado.

Al final de cada paquete, revisa la distribución de respuestas correctas y declara si hay sesgos o patrones que corregir.
```

## Cierre para la versión 2

La versión 2 debe construirse sobre la base funcional de la versión 1. El valor nuevo debe estar en mejorar contenido, claridad pedagógica, consistencia editorial, cobertura temática y calidad de retroalimentación.

La app ya tiene una estructura útil. La siguiente etapa debe cuidar que el nuevo contenido sea igual de útil, verificable y fácil de estudiar.
