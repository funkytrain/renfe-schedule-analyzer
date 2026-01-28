# Analizador de Gráfico de Interventores Renfe

Aplicación web para analizar horarios de interventores de Renfe y verificar el cumplimiento de la normativa laboral ferroviaria española.

---

## Índice

1. [Descripción General](#descripción-general)
2. [Cómo Empezar](#cómo-empezar)
3. [Configuración del Análisis](#configuración-del-análisis)
4. [Pestaña: Análisis General](#pestaña-análisis-general)
5. [Pestaña: Cumplimiento Normativo](#pestaña-cumplimiento-normativo)
6. [Gestión de Incidencias y Retrasos](#gestión-de-incidencias-y-retrasos)
7. [Exportar Resultados](#exportar-resultados)
8. [Importar tu Propio Gráfico](#importar-tu-propio-gráfico)
9. [Normativa Aplicada](#normativa-aplicada)
10. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Descripción General

Esta herramienta permite a los interventores de Renfe:

- **Cargar archivos Excel o CSV** directamente sin conversiones manuales
- **Analizar su gráfico mensual** de turnos y servicios
- **Verificar el cumplimiento** de la normativa laboral (jornadas máximas, descansos, etc.)
- **Detectar infracciones** y advertencias automáticamente
- **Calcular mayor dedicación y mermas** de descanso
- **Gestionar incidencias** sustituyendo claves cuando el supervisor asigna otro turno
- **Registrar retrasos** para ajustar los cálculos de tiempo extra
- **Exportar resultados completos** a Excel (7 hojas con todos los datos) o PDF (informe profesional)

---

## Cómo Empezar

1. **Abre la aplicación** en tu navegador
2. La aplicación carga con **datos de ejemplo** para que puedas explorar las funcionalidades
3. Configura tu **clave inicial** y **día de la semana** de inicio
4. Selecciona el **mes y año** que deseas analizar
5. Explora las pestañas **Análisis General** y **Cumplimiento**

---

## Configuración del Análisis

En la parte superior encontrarás los controles de configuración:

| Campo | Descripción |
|-------|-------------|
| **Clave inicial** | Tu número de turno de inicio (según el rango de claves de tu gráfico) |
| **Día de la semana** | El día en que comienza el mes (L, M, X, J, V, S, D) |
| **Mes** | El mes a analizar |
| **Año** | El año a analizar |

### Rotación de Claves

El sistema rota automáticamente las claves día a día:
- Ejemplo: Día 1: Clave 103 → Día 2: Clave 104 → ... → última clave → vuelve a la primera clave

---

## Pestaña: Análisis General

### Resumen Mensual

Muestra estadísticas globales del mes:

- **Horas Totales**: Tiempo total en jornada
- **Trabajo Efectivo (T/AUX)**: Tiempo real en trenes y servicios auxiliares
- **Sin Servicio (SS)**: Tiempo de desplazamientos sin servicio
- **Tiempo de Espera**: Esperas entre servicios
- **Días trabajados / Descanso**: Distribución de días

### Secciones Disponibles

| Sección | Descripción |
|---------|-------------|
| **Sustitución de Incidencias** | Permite cambiar la clave en días de incidencias si el supervisor te asignó otro turno |
| **Retrasos y Tiempo Extra** | Registra minutos de retraso para ajustar cálculos de mayor dedicación |
| **Detalle de Pernoctas** | Información de noches en hotel con estados de merma/empalme |
| **Horas Extra por Ciclo** | Cálculo de horas extra por ciclos de 5 días (umbral: 36h 05min) |
| **Horas promedio por clave** | Gráfico de barras con horas promedio por cada clave |
| **Análisis de tiempos de espera** | Detalle de las esperas más largas entre trenes |
| **Detalle completo del mes** | Tabla con todos los días y sus métricas |
| **Análisis y recomendaciones** | Sugerencias de optimización |

---

## Pestaña: Cumplimiento Normativo

### Resumen de Cumplimiento

Panel con indicadores visuales (✅/❌) para cada límite normativo:

- Jornada 9h (trabajo efectivo)
- Servicio en trenes (máximo 9h)
- Turno 11h (duración total)
- Descanso semanal 60h
- Descanso desvinculado 38h
- Límite mensual 25h (mayor dedicación + merma)

### Barra de Progreso

Visualización del acumulado mensual de mayor dedicación + merma:
- **Verde**: Dentro del límite (< 25h)
- **Naranja**: Entre 25h y 30h (requiere compensación)
- **Rojo**: Supera 30h

### Infracciones y Advertencias

- **Infracciones** (rojo): Violaciones de la normativa que deben corregirse
- **Advertencias** (amarillo): Situaciones cercanas al límite o a vigilar

### Detalle de Jornadas

Tabla completa con:
- Trabajo efectivo ajustado por día
- Duración total del turno
- Mayor dedicación generada
- Indicadores de cumplimiento por día

---

## Gestión de Incidencias y Retrasos

### Sustitución de Incidencias

Cuando tu gráfico muestra "INCIDENCIAS" pero el supervisor te asigna otra clave:

1. Busca el día en la sección **Sustitución de Incidencias**
2. Selecciona la clave real que trabajaste
3. El análisis se recalcula automáticamente

### Registro de Retrasos

Si un tren llegó con retraso y trabajaste más tiempo:

1. Ve a la sección **Retrasos y Tiempo Extra**
2. Selecciona el día afectado
3. Indica los minutos de retraso
4. Pulsa "Añadir retraso"

Los retrasos afectan al cálculo de:
- Mayor dedicación
- Duración total del turno
- Posibles infracciones

---

## Exportar Resultados

La aplicación ofrece dos formatos de exportación profesional para guardar y compartir tus análisis.

### 📊 Exportación a Excel

Haz clic en el botón **"📊 Exportar Excel"** en la parte superior para generar un archivo completo con 7 hojas:

| Hoja | Contenido |
|------|-----------|
| **Resumen** | Configuración del análisis, estadísticas mensuales completas, indicadores de cumplimiento |
| **Detalle Diario** | Tabla día a día con: clave, tipo, horas totales, efectivas, SS, esperas, tren, turno total, mayor dedicación, hotel, retraso |
| **Infracciones** | Listado completo de violaciones: tipo, severidad, día, clave, valor vs límite, exceso, mensaje explicativo |
| **Avisos** | Advertencias no críticas: tipo, día, clave, mensaje |
| **Pernoctas** | Análisis de noches en hotel: días, ubicación, horarios, descanso, estado (OK/MERMA/EMPALME) |
| **Ciclos 5 Días** | Desglose de ciclos de trabajo: días involucrados, minutos totales, horas extra, claves utilizadas |
| **Desglose Turnos** | Detalle servicio por servicio: núm. tren, tipo, horarios, origen, destino, hotel, duración |

**Ventajas del Excel:**
- Datos manipulables: filtra, ordena, crea tus propios gráficos
- Formato universal: compatible con Excel, LibreOffice, Google Sheets
- Análisis personalizado: puedes calcular métricas adicionales
- Comparación entre meses: abre varios archivos para comparar

### 📄 Exportación a PDF

Haz clic en el botón **"📄 Exportar PDF"** para generar un informe profesional con:

- **Portada y configuración**: Mes, año, clave inicial, archivo CSV utilizado
- **Resumen estadístico**: Horas trabajadas, efectivas, SS, días trabajados/descanso, hotel
- **Cumplimiento normativo**: Contadores de infracciones por severidad, mayor dedicación, merma, exceso mensual
- **Detalle de infracciones**: Lista de las primeras 50 infracciones con severidad y descripción
- **Detalle diario resumido**: Tabla compacta con lo esencial de cada día
- **Análisis de pernoctas**: Primeras 30 pernoctas con estado y descanso
- **Pie de página**: Fecha de generación y numeración automática

**Ventajas del PDF:**
- Formato oficial: ideal para reclamaciones o documentación formal
- No editable: mantiene la integridad del informe
- Fácil compartir: adjunta por email o mensajería
- Imprimible: listo para llevar físicamente

### Nombres de Archivo Automáticos

Los archivos exportados se nombran automáticamente según el mes y año del análisis:
- Excel: `Analisis_Renfe_Enero_2025.xlsx`
- PDF: `Analisis_Renfe_Enero_2025.pdf`

### Privacidad

Ambas exportaciones se generan **íntegramente en tu navegador**. Ningún dato sale de tu ordenador hacia servidores externos.

---

## Importar tu Propio Gráfico

### Pasos para Importar

1. Pulsa el botón **"📁 Cargar archivo (.xlsx o .csv)"**
2. Selecciona tu archivo (Excel o CSV) con el gráfico real
3. La aplicación validará el formato automáticamente

### Formatos Soportados

La aplicación acepta dos formatos de archivo:

- **📊 Archivos Excel (.xlsx, .xls)**: Se convierten automáticamente a CSV en tu navegador
- **📄 Archivos CSV (.csv)**: Se cargan directamente

**Ventajas del formato Excel:**
- No necesitas convertir manualmente el archivo que recibes
- La conversión ocurre instantáneamente en tu navegador
- Tus datos nunca salen de tu ordenador (máxima privacidad)

### Formato del CSV

El archivo debe contener las siguientes columnas:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| CLAVE | Número de turno (según tu gráfico) | 103 |
| LMXJVSD | Días de circulación | LMXJV, SD, DIARIO |
| N_CIRC | Número de tren o DESCANSO/INCIDENCIAS | 18048 |
| PRES | Hora de presentación | 14:00 |
| SAL | Hora de salida | 14:23 |
| DESDE | Estación origen | PAMPLONA |
| HASTA | Estación destino | CASTEJON |
| LLEG | Hora de llegada | 15:39 |
| DEJ | Hora de dejación | 15:54 |
| SERV | Tipo de servicio (T, SS, AUX, TAXI) | T |
| FJ | Indicador de hotel | HOTEL |

### Códigos de Días (LMXJVSD)

| Código | Significado |
|--------|-------------|
| L | Lunes |
| M | Martes |
| X | Miércoles |
| J | Jueves |
| V | Viernes |
| S | Sábado |
| D | Domingo |
| DIARIO | Todos los días |
| LMXJV | Lunes a viernes |
| SD | Sábado y domingo |

### Tipos de Servicio (SERV)

| Código | Descripción |
|--------|-------------|
| T | Trabajo en tren |
| AUX | Servicio auxiliar |
| SS | Sin servicio (desplazamiento) |
| TAXI | Traslado en taxi |

---

## Normativa Aplicada

### Límites Diarios

| Concepto | Límite | Consecuencia |
|----------|--------|--------------|
| Trabajo efectivo | 9 horas | Infracción alta |
| Servicio en trenes | 9 horas | Infracción alta |
| Duración total turno | 11 horas | **Infracción crítica** (abandonar servicio) |

### Mayor Dedicación

Se genera cuando el turno natural supera **8h 13min (493 minutos)**:
- Cálculo: Duración turno - 8h 13min = Mayor dedicación

### Descansos Mínimos

**En residencia:**
- Normal: ≥ 14 horas
- Merma: < 14h y ≥ 10h
- Empalme: < 10 horas

**Fuera de residencia (hotel):**
- Normal: ≥ 9 horas
- Merma: < 9h y ≥ 6h
- Empalme: < 6 horas

### Límites Mensuales

| Concepto | Límite |
|----------|--------|
| Mayor dedicación + Merma | 25 horas |
| Umbral de compensación | 30 horas |
| Descanso semanal | 60 horas mínimo |
| Descanso desvinculado | 38 horas mínimo |

### Horas Extra por Ciclo

- Ciclo de 5 días laborables
- Umbral: 36h 05min de trabajo efectivo
- Exceso sobre umbral = Horas extra

---

## Preguntas Frecuentes

### ¿Puedo subir directamente el archivo Excel que me envían?

Sí. La aplicación acepta archivos Excel (.xlsx y .xls) y los convierte automáticamente a CSV en tu navegador. No necesitas hacer ninguna conversión manual.

### ¿Es seguro subir archivos Excel a la aplicación?

Completamente seguro. La conversión de Excel a CSV ocurre **íntegramente en tu navegador**, sin enviar ningún dato a servidores externos. Tus horarios nunca salen de tu ordenador.

### ¿Qué es la "regla de esperas"?

Las esperas superiores a 60 minutos entre servicios computan como 30 minutos de trabajo efectivo a efectos de jornada.

### ¿Qué significa "trabajo efectivo ajustado"?

Es el tiempo de trabajo efectivo después de aplicar la regla de esperas. Este es el valor que se compara con el límite de 9 horas.

### ¿Cómo se calcula la merma de descanso?

Cuando el descanso entre jornadas es inferior al mínimo pero superior al umbral de empalme, se genera merma. El tiempo de merma se suma al cómputo mensual junto con la mayor dedicación.

### ¿Qué hago si supero las 11 horas de turno?

Según la normativa, el interventor **debe abandonar el servicio** al alcanzar las 11 horas naturales. Esta es una infracción crítica que debe comunicarse inmediatamente.

### ¿Puedo exportar los resultados?

Sí. La aplicación incluye dos opciones de exportación en la parte superior:

**📊 Exportar a Excel**: Genera un archivo `.xlsx` con 7 hojas:
1. **Resumen**: Configuración, estadísticas mensuales y cumplimiento normativo
2. **Detalle Diario**: Tabla completa día a día con todas las métricas
3. **Infracciones**: Listado detallado de todas las violaciones normativas
4. **Avisos**: Advertencias no críticas
5. **Pernoctas**: Análisis completo de noches en hotel
6. **Ciclos 5 Días**: Horas extra por ciclo de 5 días trabajados
7. **Desglose Turnos**: Detalle servicio por servicio

El archivo Excel es ideal para análisis posteriores, filtrado de datos y creación de gráficos personalizados.

**📄 Exportar a PDF**: Genera un informe profesional en formato PDF con:
- Configuración del análisis
- Resumen estadístico con tablas
- Cumplimiento normativo e infracciones
- Detalle diario resumido
- Análisis de pernoctas
- Numeración de páginas y fecha de generación

El PDF es ideal para adjuntar a reclamaciones o enviar como informe oficial.

Ambas exportaciones reflejan exactamente el estado actual del análisis, incluyendo sustituciones de incidencias y retrasos aplicados.

### ¿Los datos se guardan?

No. La aplicación funciona completamente en tu navegador y **no almacena datos**. Al cerrar o recargar la página, se pierden los cambios. Guarda tu CSV original para futuros análisis.

---

## Soporte

Si encuentras algún error o tienes sugerencias, contacta con el desarrollador o abre una incidencia en el repositorio del proyecto.

---

*Aplicación desarrollada para uso interno de interventores de Renfe.*
