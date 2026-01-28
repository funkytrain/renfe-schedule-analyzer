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
          <div className="border-2 border-gray-300 rounded-lg overflow-auto shadow-md bg-white p-3 max-h-96">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-2 py-1">CLAVES</th>
                  <th className="border border-gray-300 px-2 py-1">LMXJVSD</th>
                  <th className="border border-gray-300 px-2 py-1">Nº CIRC.</th>
                  <th className="border border-gray-300 px-2 py-1">nº VENTA</th>
                  <th className="border border-gray-300 px-2 py-1">SERV.</th>
                  <th className="border border-gray-300 px-2 py-1">I.J.</th>
                  <th className="border border-gray-300 px-2 py-1">PRES.</th>
                  <th className="border border-gray-300 px-2 py-1">SAL.</th>
                  <th className="border border-gray-300 px-2 py-1">DESDE</th>
                  <th className="border border-gray-300 px-2 py-1">HASTA</th>
                  <th className="border border-gray-300 px-2 py-1">LLEG.</th>
                  <th className="border border-gray-300 px-2 py-1">DEJ.</th>
                  <th className="border border-gray-300 px-2 py-1">F.J.</th>
                </tr>
              </thead>
              <tbody>
                {/* Clave 101 */}
                <tr>
                  <td rowSpan="5" className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">101</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJV</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">TAXI</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">TAXI</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">SS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">11:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">12:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJV</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19254</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19254</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">14:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">14:23</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD C</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">15:35</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJV</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19847</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19847</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">16:20</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">16:40</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD C</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19:08</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19:23</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">SD</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">80100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">80100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">12:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-yellow-400 font-bold">INCIDENCIAS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">20:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJ</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">80100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">80100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">12:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-yellow-400 font-bold">INCIDENCIAS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">20:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                {/* Clave 102 */}
                <tr>
                  <td rowSpan="4" className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">102</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">V</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19582</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19582</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">AUX</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">16:15</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">16:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">17:32</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">V</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19123</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">17456</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">18:04</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD C</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19:26</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">V</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19741</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19741</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">20:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD C</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">22:13</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">22:28</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">SD</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">80100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">80100</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">12:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-yellow-400 font-bold">INCIDENCIAS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">20:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                {/* Clave 103 */}
                <tr>
                  <td rowSpan="3" className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">103</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">DIARIO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">748/745</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">748/745</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">SS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">13:08</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD D</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">14:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">DIARIO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">34582</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19582</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">15:01</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">15:16</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD D</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD C</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">18:53</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">DIARIO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19263</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19263</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19:34</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD C</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">22:01</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">22:16</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                {/* Clave 104 - Con HOTEL */}
                <tr>
                  <td rowSpan="3" className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">104</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJVS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">34582</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19582</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">15:09</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">15:26</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD D</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">16:50</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">17:05</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJVS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">17258</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">17258</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">18:45</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD D</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">21:24</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJVS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19365</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19365</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">21:52</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD E</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">23:00</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">23:15</td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-cyan-100">H.Ritz</td>
                </tr>
                {/* Claves 106-108 DESCANSO */}
                <tr>
                  <td className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">106</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">DIARIO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-green-400 font-bold">DESCANSO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">107</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">DIARIO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-green-400 font-bold">DESCANSO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">108</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">DIARIO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-green-400 font-bold">DESCANSO</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                {/* Clave 109 - Con HOTEL */}
                <tr>
                  <td rowSpan="2" className="border border-gray-300 px-2 py-1 bg-gray-200 font-bold text-center">109</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJV</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">748</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">748</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">SS</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">17:25</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">ESTACIÓN A</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD E</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19:21</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 text-center">LMXJV</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19874</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">19874</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">T</td>
                  <td className="border border-gray-300 px-2 py-1 text-center"></td>
                  <td className="border border-gray-300 px-2 py-1 text-center">20:54</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">21:09</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD E</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">CIUDAD B</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">22:15</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">22:30</td>
                  <td className="border border-gray-300 px-2 py-1 text-center bg-cyan-100">H.SleepWell (2º A)</td>
                </tr>
                {/* Más claves truncadas para brevedad - la tabla continúa... */}
                <tr>
                  <td colSpan="13" className="border border-gray-300 px-2 py-2 text-center text-gray-500 italic">
                    ... (continúa hasta clave 115)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic text-center mt-2">
            Tabla de ejemplo: estructura típica del archivo Excel de claves (datos ficticios)
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
