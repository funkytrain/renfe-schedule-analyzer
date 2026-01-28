import React, { useEffect } from "react";

export default function CSVHelpModal({ onClose }) {

  useEffect(() => {
    // Bloquear scroll del fondo
    document.body.style.overflow = "hidden";

      // Al cerrar el modal, restaurar scroll
      return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">

        {/* Cabecera */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            📘 Guía para importar el CSV de claves reales
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
        <div className="px-6 py-4 overflow-y-auto text-sm text-gray-700 space-y-5">

          <p>
            Esta guía explica <strong>cómo debe estar preparado el archivo CSV</strong> para que la
            aplicación pueda analizar correctamente los gráficos de los interventores.
            <br />
            <strong>No necesitas conocimientos informáticos</strong> para usar esta herramienta.
          </p>

          <hr />

          <h3 className="font-semibold text-base">📄 Formato original: Excel (.xlsx)</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="font-semibold text-yellow-800">⚠️ Paso previo obligatorio</p>
            <p className="mt-2">
              Los gráficos de claves se proporcionan originalmente en formato <strong>Excel (.xlsx)</strong>.
              Antes de usar esta aplicación, <strong>debes convertir el archivo a formato CSV</strong>.
            </p>
          </div>

          <p className="font-semibold">Cómo convertir de .xlsx a .csv:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Abre el archivo Excel (.xlsx) con Microsoft Excel o LibreOffice Calc</li>
            <li>Ve a <strong>Archivo → Guardar como...</strong></li>
            <li>En "Tipo de archivo", selecciona <strong>CSV (delimitado por comas)</strong></li>
            <li>Guarda el archivo con un nombre descriptivo (ej: "claves_enero_2025.csv")</li>
            <li>Ya puedes importar ese archivo .csv en esta aplicación</li>
          </ol>

          <h3 className="font-semibold text-base mt-4">🖼️ Ejemplo visual del formato</h3>
          <p className="text-gray-600 italic">
            Así es como se ve el archivo original en Excel antes de convertirlo a CSV:
          </p>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-md bg-white p-2">
            <img
              src="/csv-example.png"
              alt="Ejemplo de formato Excel con claves de interventores"
              className="w-full mx-auto rounded"
            />
          </div>
          <p className="text-xs text-gray-500 italic text-center">
            Imagen de referencia: estructura típica del archivo Excel de claves
          </p>

          <hr />

          <h3 className="font-semibold text-base">🧩 ¿Qué es el CSV?</h3>
          <p>
            El CSV es un archivo parecido a un Excel:
          </p>
          <ul className="list-disc list-inside">
            <li>Cada <strong>fila</strong> representa un servicio (tren, SS, taxi, incidencias…).</li>
            <li>Cada <strong>columna</strong> es un dato (clave, horario, estación…).</li>
          </ul>
          <p>
            👉 La aplicación <strong>NO modifica</strong> el CSV, solo lo lee y lo analiza.
          </p>

          <hr />

          <h3 className="font-semibold text-base">✅ Reglas generales importantes</h3>
          <ul className="list-disc list-inside">
            <li>Usa siempre el <strong>CSV real y actual</strong>, sin modificar.</li>
            <li>Una misma clave puede aparecer <strong>muchas veces</strong> (una por servicio).</li>
            <li>La aplicación decide qué filas usar según el día de la semana.</li>
            <li>No se mezclan días: cada día se analizan solo sus filas correspondientes.</li>
          </ul>

          <hr />

          <h3 className="font-semibold text-base">🗂️ Columnas obligatorias del CSV</h3>

          <p><strong>CLAVE</strong></p>
          <ul className="list-disc list-inside">
            <li>Número de turno (101 a 115).</li>
            <li>Representa el turno diario del interventor.</li>
            <li>Es la columna más importante.</li>
          </ul>

          <p><strong>LMXJVSD</strong> (días de circulación)</p>
          <p>Indica los días de la semana en los que se trabaja esa fila.</p>

          <div className="border rounded p-3 bg-gray-50 text-xs">
            <p><strong>DIARIO</strong> → lunes a domingo</p>
            <p><strong>LMXJV</strong> → lunes a viernes</p>
            <p><strong>S</strong> → solo sábado</p>
            <p><strong>D</strong> → solo domingo</p>
            <p><strong>SD</strong> → sábado y domingo</p>
          </div>

          <p className="italic text-gray-600">
            Si un interventor trabaja una clave un sábado, solo se usarán las filas
            cuya columna LMXJVSD incluya la letra <strong>S</strong>.
          </p>

          <p><strong>N_CIRC</strong></p>
          <ul className="list-disc list-inside">
            <li>Número de tren o servicio.</li>
            <li>Puede estar vacío en incidencias.</li>
          </ul>

          <p><strong>PRES / SAL</strong></p>
          <ul className="list-disc list-inside">
            <li>Hora de inicio del servicio.</li>
            <li>Formato obligatorio: <strong>HH:MM</strong> (por ejemplo 07:15).</li>
          </ul>

          <p><strong>LLEG / DEJ</strong></p>
          <ul className="list-disc list-inside">
            <li>Hora de finalización del servicio.</li>
            <li>Formato obligatorio: <strong>HH:MM</strong>.</li>
          </ul>

          <p><strong>DESDE / HASTA</strong></p>
          <ul className="list-disc list-inside">
            <li>Estación de origen y destino.</li>
            <li>Ayuda a entender desplazamientos y pernoctas.</li>
          </ul>

          <p><strong>SERV</strong></p>
          <ul className="list-disc list-inside">
            <li>T → trabajo en tren</li>
            <li>SS → sin servicio (desplazamiento)</li>
            <li>TAXI → traslado</li>
          </ul>

          <p><strong>FJ</strong></p>
          <ul className="list-disc list-inside">
            <li>HOTEL → pernocta fuera de residencia</li>
          </ul>

          <hr />

          <h3 className="font-semibold text-base">⚠️ Errores comunes</h3>
          <ul className="list-disc list-inside">
            <li>Eliminar columnas “porque no parecen importantes”.</li>
            <li>Modificar horarios manualmente.</li>
            <li>Escribir horas como <code>7:5</code> en lugar de <code>07:05</code>.</li>
            <li>Usar <strong>D</strong> para indicar DIARIO (D es solo domingo).</li>
          </ul>

          <hr />

          <h3 className="font-semibold text-base">✅ Resumen final</h3>
          <ul className="list-disc list-inside">
            <li>Usa el CSV real sin tocar.</li>
            <li>No borres columnas.</li>
            <li>Respeta los días en LMXJVSD.</li>
            <li>Cada fila es un servicio.</li>
            <li>La aplicación hace el resto.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
