import React, { useEffect } from "react";

export default function UserGuideModal({ onClose }) {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">

        {/* Cabecera */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-green-50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span>📖</span> Guía de Usuario
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 py-4 overflow-y-auto text-sm text-gray-700 space-y-6">

          {/* Descripción General */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">🚂 ¿Qué es esta aplicación?</h3>
            <p>
              Esta herramienta permite a los interventores de Renfe analizar su gráfico mensual de turnos
              y verificar el cumplimiento de la normativa laboral ferroviaria española.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Analiza tu gráfico mensual de turnos y servicios</li>
              <li>Verifica el cumplimiento de jornadas máximas y descansos</li>
              <li>Detecta infracciones y advertencias automáticamente</li>
              <li>Calcula mayor dedicación y mermas de descanso</li>
              <li>Gestiona incidencias y retrasos</li>
            </ul>
          </section>

          <hr />

          {/* Cómo Empezar */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">🚀 Cómo Empezar</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>La aplicación carga con <strong>datos de ejemplo</strong> para explorar</li>
              <li>Configura tu <strong>clave inicial</strong> (101-115) y <strong>día de inicio</strong></li>
              <li>Selecciona el <strong>mes y año</strong> a analizar</li>
              <li>Explora las pestañas <strong>Análisis General</strong> y <strong>Cumplimiento</strong></li>
              <li>Opcionalmente, carga tu propio archivo CSV</li>
            </ol>
          </section>

          <hr />

          {/* Pestañas */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">📊 Pestañas Disponibles</h3>

            <div className="bg-blue-50 p-3 rounded-lg mb-3">
              <h4 className="font-medium text-blue-800">Análisis General</h4>
              <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                <li>Resumen de horas totales, trabajo efectivo, esperas</li>
                <li>Sustitución de incidencias y registro de retrasos</li>
                <li>Detalle de pernoctas y horas extra por ciclo</li>
                <li>Gráficos y tablas detalladas</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-medium text-purple-800">Cumplimiento Normativo</h4>
              <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                <li>Indicadores de cumplimiento (✅/❌)</li>
                <li>Barra de progreso del límite mensual</li>
                <li>Listado de infracciones y advertencias</li>
                <li>Detalle de jornadas por día</li>
              </ul>
            </div>
          </section>

          <hr />

          {/* Normativa */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">⚖️ Límites Normativos</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left border">Concepto</th>
                    <th className="p-2 text-left border">Límite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">Trabajo efectivo diario</td><td className="p-2 border font-medium">9 horas</td></tr>
                  <tr><td className="p-2 border">Servicio en trenes</td><td className="p-2 border font-medium">9 horas</td></tr>
                  <tr><td className="p-2 border">Duración total turno</td><td className="p-2 border font-medium text-red-600">11 horas (crítico)</td></tr>
                  <tr><td className="p-2 border">Umbral mayor dedicación</td><td className="p-2 border font-medium">8h 13min</td></tr>
                  <tr><td className="p-2 border">Mayor dedicación + merma mensual</td><td className="p-2 border font-medium">25 horas</td></tr>
                  <tr><td className="p-2 border">Descanso semanal</td><td className="p-2 border font-medium">60 horas mínimo</td></tr>
                  <tr><td className="p-2 border">Descanso desvinculado</td><td className="p-2 border font-medium">38 horas mínimo</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr />

          {/* Gestión de Incidencias */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">🔄 Gestión de Incidencias</h3>
            <p className="mb-2">
              Cuando tu gráfico muestra "INCIDENCIAS" pero el supervisor te asigna otra clave:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Ve a la sección <strong>Sustitución de Incidencias</strong></li>
              <li>Selecciona la clave real que trabajaste</li>
              <li>El análisis se recalcula automáticamente</li>
            </ol>
          </section>

          <hr />

          {/* Retrasos */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">⏱️ Registro de Retrasos</h3>
            <p className="mb-2">
              Si un tren llegó con retraso y trabajaste más tiempo:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Ve a la sección <strong>Retrasos y Tiempo Extra</strong></li>
              <li>Selecciona el día afectado</li>
              <li>Indica los minutos de retraso y pulsa "Añadir"</li>
            </ol>
            <p className="text-xs text-gray-500 mt-2">
              Los retrasos afectan al cálculo de mayor dedicación y posibles infracciones.
            </p>
          </section>

          <hr />

          {/* Cargar CSV */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">📁 Cargar tu CSV</h3>
            <p className="mb-2">
              Puedes importar tu propio archivo CSV con el gráfico real:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Pulsa el botón <strong>"📁 Cargar CSV"</strong></li>
              <li>Selecciona tu archivo CSV</li>
              <li>La aplicación validará el formato automáticamente</li>
            </ol>
            <p className="text-xs text-gray-500 mt-2">
              Pulsa "❓ Ayuda CSV" para ver el formato requerido del archivo.
            </p>
          </section>

          <hr />

          {/* Preguntas Frecuentes */}
          <section>
            <h3 className="font-semibold text-base text-green-700 mb-2">❓ Preguntas Frecuentes</h3>

            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-sm">¿Se guardan mis datos?</p>
                <p className="text-xs text-gray-600 mt-1">
                  No. La aplicación funciona en tu navegador y no almacena datos.
                  Al cerrar la página se pierden los cambios.
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-sm">¿Qué es la "regla de esperas"?</p>
                <p className="text-xs text-gray-600 mt-1">
                  Las esperas superiores a 60 minutos entre servicios computan como
                  30 minutos de trabajo efectivo.
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-sm">¿Qué hago si supero las 11 horas de turno?</p>
                <p className="text-xs text-gray-600 mt-1">
                  Según la normativa, el interventor debe abandonar el servicio al
                  alcanzar las 11 horas naturales. Es una infracción crítica.
                </p>
              </div>
            </div>
          </section>

          {/* Nota final */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs">
            <p className="font-medium text-yellow-800 mb-1">📌 Nota importante</p>
            <p className="text-yellow-700">
              Esta aplicación es una herramienta de apoyo. Consulta siempre la normativa
              oficial y comunica cualquier incidencia a tu supervisor.
            </p>
          </div>

        </div>

        {/* Pie */}
        <div className="px-6 py-3 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
