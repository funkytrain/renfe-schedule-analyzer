# Analizador de Gráfico de Interventores Renfe

Aplicación web para analizar horarios de interventores de Renfe y verificar el cumplimiento de la normativa laboral ferroviaria española, basada en el **Marco Regulador de Intervención MD**.

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
- **Verificar el cumplimiento** de la normativa laboral del Marco Regulador de Intervención MD
- **Detectar infracciones** y advertencias automáticamente
- **Calcular mayor dedicación, mermas y jornada cíclica** según la normativa
- **Detectar enlaces de jornada (empalmes)** con fusión correcta de turnos
- **Calcular el fondo de compensación** y los descansos compensatorios generados
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
| **Jornada Cíclica y Horas Extraordinarias** | Cálculo de jornada cíclica por ciclo (efectiva + 50% SS), horas extraordinarias, fondo de compensación y descansos compensatorios generados |
| **Horas promedio por clave** | Gráfico de barras con horas promedio por cada clave |
| **Análisis de tiempos de espera** | Detalle de las esperas más largas entre trenes |
| **Detalle completo del mes** | Tabla con todos los días y sus métricas |
| **Análisis y recomendaciones** | Sugerencias de optimización |

---

## Pestaña: Cumplimiento Normativo

### Resumen de Cumplimiento

Panel con indicadores visuales (✅/❌/⚠️) para cada límite normativo:

- Jornada efectiva 9h (trabajo efectivo por turno)
- Servicio en trenes (máximo 9h)
- Empalmes de jornada detectados
- Descanso entre ciclos (tabla de 4 niveles)
- Horas extraordinarias por ciclo
- Límite mensual 25h (mayor dedicación + merma)

### Cómputo Mensual y Fondo de Compensación

Panel con desglose del cómputo mensual de excesos y mermas y el estado del fondo de compensación:

- **Verde** (≤ 25h): Dentro del límite grafiado — el saldo se pierde al cerrar el mes, sin compensación
- **Naranja** (25h–30h): Supera el límite grafiado pero sin generar compensación todavía
- **Rojo** (> 30h): El exceso sobre 30h pasa al fondo de compensación

El **fondo de compensación** acumula horas extraordinarias de ciclo y el exceso del cómputo mensual sobre 30h. Cada **7h 13min** acumuladas generan un descanso compensatorio a disfrutar en las 14 semanas siguientes.

### Infracciones y Advertencias

- **Infracciones críticas** (rojo): Enlace de jornada, superación de límites de descanso entre ciclos, exceso del límite mensual de 25h
- **Infracciones altas** (naranja): Jornada efectiva > 9h, servicio en trenes > 9h, merma de descanso entre ciclos
- **Infracciones medias** (amarillo): Merma de descanso diario entre turnos consecutivos
- **Advertencias**: Mayor dedicación, turno cercano al límite, fondo de compensación, cómputo mensual

### Enlace de Jornada

Panel específico que aparece cuando se detectan empalmes. Muestra los pares de turnos fusionados, el descanso real alcanzado, el umbral normativo y la mayor dedicación resultante de la jornada fusionada.

### Detalle de Jornadas

Tabla completa con:
- Trabajo efectivo ajustado por día
- Servicio en trenes
- Jornada ordinaria total
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
4. Pulsa "Aplicar"

Los retrasos afectan al cálculo de:
- Mayor dedicación
- Duración total del turno
- Posibles infracciones y mermas de descanso

---

## Exportar Resultados

La aplicación ofrece dos formatos de exportación profesional para guardar y compartir tus análisis.

### Exportación a Excel

Haz clic en el botón **"📊 Exportar Excel"** en la parte superior para generar un archivo completo con 7 hojas:

| Hoja | Contenido |
|------|-----------|
| **Resumen** | Configuración del análisis, estadísticas mensuales completas, indicadores de cumplimiento |
| **Detalle Diario** | Tabla día a día con: clave, tipo, horas totales, efectivas, SS, esperas, tren, turno total, mayor dedicación, hotel, retraso |
| **Infracciones** | Listado completo de violaciones: tipo, severidad, día, clave, valor vs límite, exceso, mensaje explicativo |
| **Avisos** | Advertencias no críticas: tipo, día, clave, mensaje |
| **Pernoctas** | Análisis de noches en hotel: días, ubicación, horarios, descanso, estado (OK/MERMA/EMPALME) |
| **Ciclos** | Desglose de ciclos: jornada efectiva, SS, jornada cíclica, máximo permitido, horas extraordinarias |
| **Desglose Turnos** | Detalle servicio por servicio: núm. tren, tipo, horarios, origen, destino, hotel, duración |

### Exportación a PDF

Haz clic en el botón **"📄 Exportar PDF"** para generar un informe profesional con:

- **Portada y configuración**: Mes, año, clave inicial, archivo CSV utilizado
- **Resumen estadístico**: Horas trabajadas, efectivas, SS, días trabajados/descanso, hotel
- **Cumplimiento normativo**: Contadores de infracciones por severidad, mayor dedicación, merma, cómputo mensual, fondo de compensación
- **Detalle de infracciones**: Lista de las primeras 50 infracciones con severidad y descripción
- **Detalle diario resumido**: Tabla compacta con lo esencial de cada día
- **Análisis de pernoctas**: Primeras 30 pernoctas con estado y descanso
- **Pie de página**: Fecha de generación y numeración automática

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

- **Archivos Excel (.xlsx, .xls)**: Se convierten automáticamente a CSV en tu navegador
- **Archivos CSV (.csv)**: Se cargan directamente

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

| Código | Descripción | Tiempo efectivo |
|--------|-------------|-----------------|
| T | Servicio en tren (incluye toma/deje de 15min c/u) | Sí |
| AUX | Servicio auxiliar en estación | Sí |
| SS | Viaje sin servicio (desplazamiento) | No (50% computa en jornada cíclica) |
| TAXI | Traslado en taxi | No |

---

## Normativa Aplicada

La aplicación implementa el **Marco Regulador de Intervención MD** de Renfe. A continuación se recogen los conceptos y umbrales utilizados.

### Jornada Diaria

| Concepto | Definición |
|----------|------------|
| **Jornada ordinaria** | Tiempo total del turno desde inicio hasta fin |
| **Jornada efectiva** | Jornada ordinaria menos el único intervalo no efectivo de mayor duración (espera o SS) |
| **Máximo jornada ordinaria** | 9h (ampliable en turno de única circulación o servicio de ida y regreso con ida ≤6h y sin servicios anterior/posterior) |
| **Mayor dedicación** | Exceso de la jornada ordinaria sobre **8h 13min** |

### Intervalos de Tiempo

| Tipo | Situaciones |
|------|-------------|
| **Tiempo efectivo** | Servicios en trenes (T/AUX, incluida toma y deje de 15min); servicios en estaciones (reserva, ATTs); intervalos entre servicios efectivos < 90min |
| **Tiempo no efectivo** | Viajes sin servicio (SS); esperas ≥ 90min; 15min previos a SS al inicio del turno; tiempo desde deje hasta primer tren de regreso |

Solo se descuenta el intervalo no efectivo de mayor duración. Máximo 6h de SS por ciclo.

### Descanso Diario Entre Turnos

**En residencia:**

| Tiempo alcanzado | Situación |
|------------------|-----------|
| ≥ 14h | Descanso completo — OK |
| ≥ 10h y < 14h | **Merma de descanso** (14h − tiempo alcanzado) |
| < 10h | **Enlace de jornada** — los dos turnos se fusionan |

**Fuera de residencia:**

| Tiempo alcanzado | Situación |
|------------------|-----------|
| ≥ 9h | Descanso completo — OK |
| ≥ 6h y < 9h | **Merma de descanso** (9h − tiempo alcanzado) |
| < 6h | **Enlace de jornada** — los dos turnos se fusionan |

**Enlace de jornada:** cuando el descanso no alcanza el mínimo para finalizar jornada, los dos turnos se tratan como una única jornada ordinaria. Mayor dedicación = (turno1 + descanso + turno2) − 8h 13min. Solo puede producirse por retrasos en la circulación, nunca en gráfico.

### Descanso Entre Ciclos (ciclos normales de 5 días)

El mínimo grafiado es **62h** (14h del último turno + 24h × 2 descansos ordinarios).

| Tiempo alcanzado | Situación |
|------------------|-----------|
| ≥ 62h | Descanso completo — OK |
| ≥ 48h y < 62h | Merma de descanso en el último turno del ciclo (62h − tiempo) |
| ≥ 38h y < 48h | 1 descanso ordinario no disfrutado → derecho a descanso alternativo |
| ≥ 24h y < 38h | 1 descanso no disfrutado + merma (38h − tiempo) |
| < 24h | 2 descansos ordinarios no disfrutados |

Para **ciclos reducidos** (3 días, 1 descanso): mínimo grafiado 38h. < 38h → merma; < 24h → 1 descanso no disfrutado.

### Jornada Cíclica y Horas Extraordinarias

```
Jornada cíclica = Σ jornada efectiva de todos los turnos del ciclo
                 + 50% de los viajes sin servicio (SS) del ciclo

Máximo cíclico = nº días trabajados × 7h 13min

Horas extraordinarias = max(0, jornada cíclica − máximo cíclico)
```

Las horas extraordinarias se acumulan al cierre de cada ciclo en el **fondo de compensación**.

### Cómputo Mensual de Excesos y Mermas

Se cierra al final del **último ciclo completo del mes**. Si el último ciclo incluye días del mes siguiente, se imputa al mes siguiente.

| Total acumulado | Resultado |
|-----------------|-----------|
| ≤ 30h | El saldo se pierde, no genera compensación |
| > 30h | El exceso sobre 30h pasa al fondo de compensación |
| > 25h (en gráfico) | Infracción — no se puede grafiar ciclos con este resultado |

### Fondo de Compensación y Descansos Compensatorios

El fondo acumula:
1. Horas extraordinarias (exceso de jornada cíclica)
2. Exceso del cómputo mensual sobre 30h

Cada **7h 13min** acumuladas en el fondo generan **1 descanso compensatorio**, que debe disfrutarse en las **14 semanas siguientes** al cierre del mes en que se generó.

Los días del ciclo en que se disfrutan descansos compensatorios o se devuelven descansos no disfrutados computan con **7h 13min** de jornada efectiva a efectos de tasación.

---

## Preguntas Frecuentes

### ¿Puedo subir directamente el archivo Excel que me envían?

Sí. La aplicación acepta archivos Excel (.xlsx y .xls) y los convierte automáticamente a CSV en tu navegador. No necesitas hacer ninguna conversión manual.

### ¿Es seguro subir archivos Excel a la aplicación?

Completamente seguro. La conversión ocurre **íntegramente en tu navegador**, sin enviar ningún dato a servidores externos. Tus horarios nunca salen de tu ordenador.

### ¿Qué es la "jornada efectiva" y en qué se diferencia de la "jornada ordinaria"?

La **jornada ordinaria** es el tiempo total del turno, desde que empieza hasta que termina. La **jornada efectiva** es ese tiempo menos el intervalo no efectivo de mayor duración (la espera más larga o el viaje sin servicio más largo). Solo se descuenta uno, aunque haya varios intervalos no efectivos.

### ¿Qué es el "enlace de jornada" (empalme)?

Cuando el descanso entre dos turnos consecutivos no alcanza el mínimo para finalizar la jornada (10h en residencia, 6h fuera), la normativa obliga a tratar ambos turnos como una única jornada ordinaria. La mayor dedicación se calcula sobre el total fusionado. Solo puede ocurrir por retrasos en la circulación; nunca se puede grafiar un enlace de jornada.

### ¿Cómo se calcula la jornada cíclica?

Es la suma de la jornada efectiva de todos los turnos del ciclo más el 50% de los viajes sin servicio (SS) del ciclo. El máximo permitido es el número de días trabajados multiplicado por 7h 13min. El exceso son horas extraordinarias.

### ¿Qué es el fondo de compensación?

Es un acumulado personal (sin caducidad) donde se suman las horas extraordinarias generadas por exceso de jornada cíclica y el exceso del cómputo mensual sobre 30h. Cada 7h 13min acumuladas generan un descanso compensatorio que debe disfrutarse en las 14 semanas siguientes al cierre del mes.

### ¿Qué pasa si supero las 25h en el cómputo mensual?

Las 25h son el límite que no se puede superar en el gráfico. Si se supera por retrasos, se acumula en el cómputo mensual. Si el total no llega a 30h, el exceso se pierde al cerrar el mes. Si supera las 30h, el exceso pasa al fondo de compensación.

### ¿Cómo se calcula la merma de descanso?

Cuando el descanso entre turnos es inferior al mínimo completo pero superior al umbral de empalme, se genera merma. El tiempo de merma (mínimo completo − tiempo real) se suma al cómputo mensual de excesos y mermas junto con la mayor dedicación.

### ¿Los datos se guardan?

No. La aplicación funciona completamente en tu navegador y **no almacena datos**. Al cerrar o recargar la página, se pierden los cambios. Guarda tu archivo original para futuros análisis.

### ¿Puedo exportar los resultados?

Sí. La aplicación incluye dos opciones en la parte superior: **Excel** (7 hojas con todos los datos, ideal para análisis y archivo) y **PDF** (informe profesional, ideal para reclamaciones o documentación formal). Ambas exportaciones reflejan el estado actual del análisis incluyendo incidencias y retrasos aplicados.

---

## Soporte

Si encuentras algún error o tienes sugerencias, contacta con el desarrollador o abre una incidencia en el repositorio del proyecto.

---

*Aplicación desarrollada sin ánimo de lucro para uso del personal de intervención de Renfe. Los resultados son orientativos y deben revisarse antes de tomar decisiones laborales o administrativas.*
