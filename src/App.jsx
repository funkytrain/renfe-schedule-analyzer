import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SeccionColapsable from "./SeccionColapsable";
import CSVHelpModal from "./CSVHelpModal";
import UserGuideModal from "./UserGuideModal";


const DEFAULT_CSV_DATA = `CLAVE,LMXJVSD,N_CIRC,N_VENTA,SERV,IJ,PRES,SAL,DESDE,HASTA,LLEG,DEJ,FJ
101,LMXJV,TAXI,TAXI,SS,,,11:30,PAMPLONA,CASTEJON,12:30,,
101,LMXJV,18048,18048,T,,14:08,14:23,CASTEJON,MIRAFLORES,15:35,,
101,LMXJV,18023,18023,T,,,16:40,MIRAFLORES,PAMPLONA,19:08,19:23,
101,SD,80100,80100,T,,12:30,,INCIDENCIAS,INCIDENCIAS,,19:30,
102,LMXJ,80100,80100,T,,12:30,,INCIDENCIAS,INCIDENCIAS,,20:30,
102,V,18029,18029,AUX,,16:15,16:30,PAMPLONA,CASTEJON,17:31,,
102,V,18650,16070,T,,,18:01,CASTEJON,MIRAFLORES,19:22,,
102,V,18039,18039,T,,,20:00,MIRAFLORES,PAMPLONA,22:13,22:28,
102,SD,80100,80100,T,,12:30,,INCIDENCIAS,INCIDENCIAS,,20:30,
103,DIARIO,626/622,626/622,SS,,,13:09,PAMPLONA,VITORIA,14:01,,
103,DIARIO,33029,18029,T,,15:01,15:16,PAMPLONA,MIRAFLORES,18:53,,
103,DIARIO,18077,18077,T,,,19:34,MIRAFLORES,PAMPLONA,22:01,22:16,
104,LMXJVS,33021,18021,T,,15:13,15:28,PAMPLONA,VITORIA,16:50,17:05,
104,LMXJVS,16011,16011,T,,18:45,19:00,VITORIA,CASTEJON,21:24,,
104,LMXJVS,18078,18078,T,,,21:52,CASTEJON,ZARAGOZA D.,23:00,23:15,HOTEL
104,D,33021,18021,T,,15:13,15:28,PAMPLONA,VITORIA,16:50,,
104,D,16011,16011,T,,,19:00,VITORIA,ZARAGOZA D.,22:23,22:38,HOTEL
105,LMXJVS,18071,18071,T,,5:51,6:06,ZARAGOZA D.,VITORIA,9:57,,
105,LMXJVS,16019,16019,T,,,9:59,VITORIA,PAMPLONA,11:11,11:26,
105,D,622,622,SS,,,11:03,ZARAGOZA D.,PAMPLONA,13:05,,
106,DIARIO,DESCANSO,,,,,,,,,,
107,DIARIO,DESCANSO,,,,,,,,,,
108,DIARIO,DESCANSO,,,,,,,,,,
109,LMXJV,625,625,SS,,,17:22,PAMPLONA,ZARAGOZA D.,19:23,,
109,LMXJV,18079,18079,T,,20:54,21:09,ZARAGOZA D.,CASTEJON,22:15,22:30,HOTEL
109,S,18029,18029,AUX,,16:15,16:30,PAMPLONA,CASTEJON,17:31,,
109,S,18650,16070,T,,,18:01,CASTEJON,MIRAFLORES,19:22,,
109,S,18079,18079,T,,,21:00,MIRAFLORES,CASTEJON,22:15,22:30,HOTEL
109,D,18022,18022,T,,18:47,19:02,PAMPLONA,ZARAGOZA D.,20:59,,
109,D,18079,18079,T,,,21:09,ZARAGOZA D.,CASTEJON,22:15,22:30,HOTEL
110,LMXJV,18068,18068,T,,5:43,5:58,CASTEJON,MIRAFLORES,7:25,7:40,
110,LMXJV,18021,18021,AUX,,12:43,12:58,MIRAFLORES,PAMPLONA,15:26,15:41,
110,SD,18074,18074,T,,8:35,8:50,CASTEJON,MIRAFLORES,10:05,10:20,
110,SD,18021,18021,AUX,,12:43,12:58,MIRAFLORES,PAMPLONA,15:26,15:41,
111,LMXJV,18046,18046,T,,5:50,6:05,PAMPLONA,MIRAFLORES,7:58,8:13,
111,LMXJV,18021,18021,T,,12:43,12:58,MIRAFLORES,PAMPLONA,15:26,15:41,
111,SD,80100,80100,T,,8:30,,INCIDENCIAS,INCIDENCIAS,,16:30,
112,LMXJV,18074,18074,T,,7:25,7:40,PAMPLONA,MIRAFLORES,10:05,10:20,
112,LMXJV,18073,18073,T,,14:15,14:30,MIRAFLORES,CASTEJON,15:50,16:05,
112,LMXJV,530,530,SS,,,17:30,CASTEJON,PAMPLONA,18:41,,
112,SD,18652,16020,T,,9:06,9:21,PAMPLONA,MIRAFLORES,11:46,,
112,SD,18021,18021,T,,,12:58,MIRAFLORES,PAMPLONA,15:26,15:41,
113,DIARIO,80100,80100,T,,09:00,,INCIDENCIAS,INCIDENCIAS,,17:00,
114,DIARIO,DESCANSO,,,,,,,,,,
115,DIARIO,DESCANSO,,,,,,,,,,`;

const ScheduleAnalyzer = () => {
  const [startingKey, setStartingKey] = useState('103');
  const [startingDay, setStartingDay] = useState('S');
  const [activeTab, setActiveTab] = useState('analysis');
  const [optimizations, setOptimizations] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-11
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [incidenciaOverrides, setIncidenciaOverrides] = useState({}); // { día: 'clave' }
  const [csvData, setCsvData] = useState(DEFAULT_CSV_DATA);
  const [showCSVHelp, setShowCSVHelp] = useState(false); // Muestra la ayuda del CSV
  const [csvFileName, setCsvFileName] = useState(null); // Para mostrar nombre del archivo cargado
  const [delayOverrides, setDelayOverrides] = useState({}); // { día: minutosRetraso }
  const [showUserGuide, setShowUserGuide] = useState(false); // Muestra la guía de usuario

  const parseData = () => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || '';
        return obj;
      }, {});
    });
  };

  const data = useMemo(() => parseData(), [csvData]);

  // Detectar claves disponibles del CSV (extrae todas las claves únicas y las ordena)
  const availableKeys = useMemo(() => {
    const keys = new Set();
    data.forEach(row => {
      const key = parseInt(row.CLAVE);
      if (!isNaN(key)) {
        keys.add(key);
      }
    });
    return Array.from(keys).sort((a, b) => a - b);
  }, [data]);

  // Obtener la clave mínima y máxima disponibles
  const minKey = useMemo(() => availableKeys.length > 0 ? availableKeys[0] : 101, [availableKeys]);
  const maxKey = useMemo(() => availableKeys.length > 0 ? availableKeys[availableKeys.length - 1] : 115, [availableKeys]);

  // Ajustar startingKey si no está en las claves disponibles
  React.useEffect(() => {
    if (availableKeys.length > 0 && !availableKeys.includes(parseInt(startingKey))) {
      setStartingKey(availableKeys[0].toString());
    }
  }, [availableKeys, startingKey]);

  const dayMap = {
    'L': 'Lunes',
    'M': 'Martes',
    'X': 'Miércoles',
    'J': 'Jueves',
    'V': 'Viernes',
    'S': 'Sábado',
    'D': 'Domingo'
  };

  const dayOrder = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
  };

  const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

// Manejar carga de archivo CSV o Excel
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      let content;

      // Detectar tipo de archivo y procesar
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        try {
          // Leer archivo Excel
          const workbook = XLSX.read(data, { type: 'binary' });

          // Obtener primera hoja
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convertir a CSV
          content = XLSX.utils.sheet_to_csv(worksheet);
        } catch (error) {
          alert('Error al leer el archivo Excel: ' + error.message);
          return;
        }
      } else if (file.name.endsWith('.csv')) {
        // Es CSV, usar directamente
        content = data;
      } else {
        alert('Formato no soportado. Por favor, sube un archivo .xlsx, .xls o .csv');
        return;
      }

      // Validar que tiene el formato esperado
      const firstLine = content.split('\n')[0];
      if (firstLine.includes('CLAVE') && firstLine.includes('LMXJVSD')) {
        setCsvData(content);
        setCsvFileName(file.name);
        setIncidenciaOverrides({}); // Resetear sustituciones al cargar nuevo CSV
      } else {
        alert('El archivo no tiene el formato esperado. Asegúrate de que contiene las columnas: CLAVE, LMXJVSD, N_CIRC, N_VENTA, SERV, IJ, PRES, SAL, DESDE, HASTA, LLEG, DEJ, FJ');
      }
    };

    // Leer como binario para Excel, como texto para CSV
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

    const handleResetCSV = () => {
        setCsvData(DEFAULT_CSV_DATA);
        setCsvFileName(null);
        setIncidenciaOverrides({});
    };

  // =============================================
  // EXPORTACIÓN A EXCEL
  // =============================================
  const exportToExcel = () => {
    const monthName = monthNames[selectedMonth];
    const fileName = `Analisis_Renfe_${monthName}_${selectedYear}.xlsx`;

    // Crear un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();

    // ========== HOJA 1: RESUMEN ==========
    const resumenData = [
      ['ANÁLISIS DE GRÁFICO DE INTERVENTORES RENFE'],
      [''],
      ['CONFIGURACIÓN'],
      ['Mes:', `${monthName} ${selectedYear}`],
      ['Días en el mes:', getDaysInMonth(selectedMonth, selectedYear)],
      ['Clave inicial:', startingKey],
      ['Día inicial:', `${dayMap[startingDay]} (${startingDay})`],
      ['Archivo CSV:', csvFileName || 'Datos por defecto'],
      [''],
      ['ESTADÍSTICAS MENSUALES'],
      ['Total horas trabajadas:', monthlyStats.totalWorkedHours + ' h'],
      ['Horas efectivas de trabajo:', monthlyStats.totalEffectiveHours + ' h'],
      ['Horas en SS (desplazamiento):', monthlyStats.totalSSHours + ' h'],
      ['Horas de descanso entre trenes:', monthlyStats.totalRestHours + ' h'],
      ['Días trabajados:', monthlyStats.workedDays],
      ['Días de descanso:', monthlyStats.restDays],
      ['Noches en hotel:', monthlyStats.hotelNights],
      ['Promedio horas/día trabajado:', monthlyStats.avgHoursPerWorkDay + ' h'],
      ['Promedio descanso entre trenes:', (monthlyStats.avgRestBetweenTrains / 60).toFixed(2) + ' h'],
      [''],
      ['CUMPLIMIENTO NORMATIVO'],
      ['Total infracciones:', analyzeCompliance.violations.length],
      ['Infracciones críticas:', analyzeCompliance.violations.filter(v => v.severity === 'critica').length],
      ['Infracciones altas:', analyzeCompliance.violations.filter(v => v.severity === 'alta').length],
      ['Infracciones medias:', analyzeCompliance.violations.filter(v => v.severity === 'media').length],
      ['Total avisos:', analyzeCompliance.warnings.length],
      [''],
      ['HORAS EXTRA Y MERMA'],
      ['Mayor dedicación total:', (analyzeCompliance.summary.totalMayorDedicacion / 60).toFixed(2) + ' h'],
      ['Merma de descanso total:', (analyzeCompliance.summary.totalMermaDescanso / 60).toFixed(2) + ' h'],
      ['Horas extra ciclo 5 días:', (horasExtraCiclo.totalHorasExtra / 60).toFixed(2) + ' h'],
      ['Exceso mensual total:', (analyzeCompliance.summary.totalExcesoMensual / 60).toFixed(2) + ' h'],
      ['Límite mensual (25h):', analyzeCompliance.summary.limiteMensualExceeded ? '❌ EXCEDIDO' : '✅ OK'],
    ];
    const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);
    XLSX.utils.book_append_sheet(workbook, wsResumen, 'Resumen');

    // ========== HOJA 2: DETALLE DIARIO ==========
    const detalleDiarioData = [
      ['Día', 'Clave', 'Día Semana', 'Tipo', 'Horas Totales', 'Efectivas', 'SS (min)', 'Esperas', 'Tren (min)', 'Turno Total', 'Mayor Dedic.', 'Hotel', 'Retraso']
    ];
    monthAnalysis.forEach(day => {
      detalleDiarioData.push([
        day.day,
        day.key,
        day.dayName,
        day.type,
        (day.workedMinutes / 60).toFixed(2),
        (day.effectiveMinutes / 60).toFixed(2),
        day.ssMinutes,
        (day.adjustedEffectiveMinutes - day.effectiveMinutes),
        day.trainServiceMinutes,
        day.totalShiftMinutes,
        day.mayorDedicacionMinutes,
        day.endsInHotel ? 'SÍ' : 'NO',
        day.delayMinutes || 0
      ]);
    });
    const wsDetalle = XLSX.utils.aoa_to_sheet(detalleDiarioData);
    XLSX.utils.book_append_sheet(workbook, wsDetalle, 'Detalle Diario');

    // ========== HOJA 3: INFRACCIONES ==========
    const infraccionesData = [
      ['Tipo', 'Severidad', 'Día', 'Clave', 'Valor', 'Límite', 'Exceso', 'Mensaje']
    ];
    analyzeCompliance.violations.forEach(v => {
      infraccionesData.push([
        v.type,
        v.severity.toUpperCase(),
        v.day || `${v.fromDay}-${v.toDay}`,
        v.key || '-',
        v.value ? (v.value / 60).toFixed(2) + ' h' : '-',
        v.limit ? (v.limit / 60).toFixed(2) + ' h' : '-',
        v.excess ? (v.excess / 60).toFixed(2) + ' h' : (v.deficit ? (v.deficit / 60).toFixed(2) + ' h' : '-'),
        v.message
      ]);
    });
    const wsInfracciones = XLSX.utils.aoa_to_sheet(infraccionesData);
    XLSX.utils.book_append_sheet(workbook, wsInfracciones, 'Infracciones');

    // ========== HOJA 4: AVISOS ==========
    const avisosData = [
      ['Tipo', 'Día', 'Clave', 'Mensaje']
    ];
    analyzeCompliance.warnings.forEach(w => {
      avisosData.push([
        w.type,
        w.day || '-',
        w.key || '-',
        w.message
      ]);
    });
    const wsAvisos = XLSX.utils.aoa_to_sheet(avisosData);
    XLSX.utils.book_append_sheet(workbook, wsAvisos, 'Avisos');

    // ========== HOJA 5: PERNOCTAS ==========
    const pernoctasData = [
      ['Día', 'Día Siguiente', 'Ubicación', 'Llegada', 'Salida', 'Descanso (h)', 'Estado', 'Clave Actual', 'Clave Siguiente', 'Retraso']
    ];
    pernoctasAnalysis.forEach(p => {
      const formatTime = (mins) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      };
      pernoctasData.push([
        p.dia,
        p.diaSiguiente,
        p.ubicacion,
        formatTime(p.llegada),
        formatTime(p.salida),
        (p.descansoMinutos / 60).toFixed(2),
        p.estado,
        p.claveActual,
        p.claveSiguiente,
        p.retrasoAplicado || 0
      ]);
    });
    const wsPernoctas = XLSX.utils.aoa_to_sheet(pernoctasData);
    XLSX.utils.book_append_sheet(workbook, wsPernoctas, 'Pernoctas');

    // ========== HOJA 6: CICLOS 5 DÍAS ==========
    const ciclosData = [
      ['Ciclo', 'Días', 'Total Minutos', 'Horas Extra', 'Claves', 'Incompleto']
    ];
    horasExtraCiclo.ciclos.forEach((c, idx) => {
      ciclosData.push([
        idx + 1,
        c.dias.join(', '),
        c.totalMinutos,
        (c.horasExtraMinutos / 60).toFixed(2),
        c.claves.join(', '),
        c.incompleto ? 'SÍ' : 'NO'
      ]);
    });
    ciclosData.push([]);
    ciclosData.push(['TOTAL HORAS EXTRA:', '', '', (horasExtraCiclo.totalHorasExtra / 60).toFixed(2) + ' h']);
    const wsCiclos = XLSX.utils.aoa_to_sheet(ciclosData);
    XLSX.utils.book_append_sheet(workbook, wsCiclos, 'Ciclos 5 Días');

    // ========== HOJA 7: DESGLOSE DE TURNOS ==========
    const turnosData = [
      ['Día', 'Clave', 'Núm. Tren', 'Servicio', 'Presentación', 'Salida', 'Origen', 'Destino', 'Llegada', 'Dejación', 'Hotel', 'Duración (min)']
    ];
    monthAnalysis.forEach(day => {
      if (day.type === 'TRABAJO' && day.trains && day.trains.length > 0) {
        day.trains.forEach((train, idx) => {
          const formatTime = (mins) => {
            if (!mins && mins !== 0) return '-';
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          };
          turnosData.push([
            idx === 0 ? day.day : '',
            idx === 0 ? day.key : '',
            train.N_CIRC,
            train.SERV,
            formatTime(train.presentacion),
            formatTime(train.salida),
            train.DESDE,
            train.HASTA,
            formatTime(train.llegada),
            formatTime(train.dejacion),
            train.FJ === 'HOTEL' ? 'SÍ' : 'NO',
            train.duracion || '-'
          ]);
        });
      }
    });
    const wsTurnos = XLSX.utils.aoa_to_sheet(turnosData);
    XLSX.utils.book_append_sheet(workbook, wsTurnos, 'Desglose Turnos');

    // Descargar el archivo
    XLSX.writeFile(workbook, fileName);
  };

  // =============================================
  // EXPORTACIÓN A PDF
  // =============================================
  const exportToPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const monthName = monthNames[selectedMonth];
    const fileName = `Analisis_Renfe_${monthName}_${selectedYear}.pdf`;

    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;

    // Función auxiliar para añadir nueva página si es necesario
    const checkAddPage = (requiredSpace = 20) => {
      if (yPos + requiredSpace > pageHeight - marginBottom) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // ========== TÍTULO PRINCIPAL ==========
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('ANÁLISIS DE GRÁFICO DE INTERVENTORES RENFE', 105, yPos, { align: 'center' });
    yPos += 10;

    // ========== CONFIGURACIÓN ==========
    doc.setFontSize(14);
    doc.text('Configuración', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Mes: ${monthName} ${selectedYear} (${getDaysInMonth(selectedMonth, selectedYear)} días)`, 20, yPos);
    yPos += 6;
    doc.text(`Clave inicial: ${startingKey} | Día inicial: ${dayMap[startingDay]} (${startingDay})`, 20, yPos);
    yPos += 6;
    doc.text(`Archivo CSV: ${csvFileName || 'Datos por defecto'}`, 20, yPos);
    yPos += 10;

    // ========== RESUMEN ESTADÍSTICO ==========
    checkAddPage(60);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Resumen Estadístico', 20, yPos);
    yPos += 8;

    autoTable(doc, {
      startY: yPos,
      head: [['Métrica', 'Valor']],
      body: [
        ['Total horas trabajadas', monthlyStats.totalWorkedHours + ' h'],
        ['Horas efectivas de trabajo', monthlyStats.totalEffectiveHours + ' h'],
        ['Horas en SS (desplazamiento)', monthlyStats.totalSSHours + ' h'],
        ['Días trabajados', monthlyStats.workedDays],
        ['Días de descanso', monthlyStats.restDays],
        ['Noches en hotel', monthlyStats.hotelNights],
        ['Promedio horas/día trabajado', monthlyStats.avgHoursPerWorkDay + ' h'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20, right: 20 },
    });
    yPos = doc.lastAutoTable.finalY + 10;

    // ========== CUMPLIMIENTO NORMATIVO ==========
    checkAddPage(60);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Cumplimiento Normativo', 20, yPos);
    yPos += 8;

    const criticalCount = analyzeCompliance.violations.filter(v => v.severity === 'critica').length;
    const highCount = analyzeCompliance.violations.filter(v => v.severity === 'alta').length;
    const mediumCount = analyzeCompliance.violations.filter(v => v.severity === 'media').length;

    autoTable(doc, {
      startY: yPos,
      head: [['Indicador', 'Valor']],
      body: [
        ['Total infracciones', analyzeCompliance.violations.length.toString()],
        ['Infracciones críticas', criticalCount.toString()],
        ['Infracciones altas', highCount.toString()],
        ['Infracciones medias', mediumCount.toString()],
        ['Total avisos', analyzeCompliance.warnings.length.toString()],
        ['Mayor dedicación total', (analyzeCompliance.summary.totalMayorDedicacion / 60).toFixed(2) + ' h'],
        ['Merma de descanso total', (analyzeCompliance.summary.totalMermaDescanso / 60).toFixed(2) + ' h'],
        ['Exceso mensual', (analyzeCompliance.summary.totalExcesoMensual / 60).toFixed(2) + ' h'],
        ['Límite 25h', analyzeCompliance.summary.limiteMensualExceeded ? 'EXCEDIDO' : 'OK'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20, right: 20 },
    });
    yPos = doc.lastAutoTable.finalY + 10;

    // ========== DETALLE DE INFRACCIONES ==========
    if (analyzeCompliance.violations.length > 0) {
      checkAddPage(40);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Detalle de Infracciones', 20, yPos);
      yPos += 8;

      const infraccionesBody = analyzeCompliance.violations.slice(0, 50).map(v => [
        v.severity.toUpperCase(),
        v.day || `${v.fromDay}-${v.toDay}`,
        v.key || '-',
        v.message.length > 60 ? v.message.substring(0, 57) + '...' : v.message
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Severidad', 'Día', 'Clave', 'Mensaje']],
        body: infraccionesBody,
        theme: 'striped',
        headStyles: { fillColor: [239, 68, 68] },
        margin: { left: 20, right: 20 },
        styles: { fontSize: 8 },
      });
      yPos = doc.lastAutoTable.finalY + 10;

      if (analyzeCompliance.violations.length > 50) {
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        doc.text(`(Mostrando 50 de ${analyzeCompliance.violations.length} infracciones. Ver Excel para el listado completo)`, 20, yPos);
        yPos += 10;
      }
    }

    // ========== DETALLE DIARIO (RESUMEN) ==========
    checkAddPage(40);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Detalle Diario', 20, yPos);
    yPos += 8;

    const detalleDiarioBody = monthAnalysis.slice(0, 31).map(day => [
      day.day,
      day.key,
      day.dayName.substring(0, 3),
      day.type === 'TRABAJO' ? 'T' : 'D',
      (day.workedMinutes / 60).toFixed(1),
      (day.effectiveMinutes / 60).toFixed(1),
      day.endsInHotel ? 'SÍ' : 'NO'
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Día', 'Clave', 'D.S.', 'Tipo', 'H.Tot', 'H.Efec', 'Hotel']],
      body: detalleDiarioBody,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20, right: 20 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
      }
    });
    yPos = doc.lastAutoTable.finalY + 10;

    // ========== PERNOCTAS ==========
    if (pernoctasAnalysis.length > 0) {
      checkAddPage(40);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Análisis de Pernoctas', 20, yPos);
      yPos += 8;

      const formatTime = (mins) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      };

      const pernoctasBody = pernoctasAnalysis.slice(0, 30).map(p => [
        `${p.dia}-${p.diaSiguiente}`,
        p.ubicacion.substring(0, 12),
        formatTime(p.llegada),
        formatTime(p.salida),
        (p.descansoMinutos / 60).toFixed(1),
        p.estado
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Días', 'Ubicación', 'Llegada', 'Salida', 'Desc.(h)', 'Estado']],
        body: pernoctasBody,
        theme: 'striped',
        headStyles: { fillColor: [139, 92, 246] },
        margin: { left: 20, right: 20 },
        styles: { fontSize: 8 },
      });
      yPos = doc.lastAutoTable.finalY + 10;
    }

    // ========== PIE DE PÁGINA ==========
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(
        `Generado el ${new Date().toLocaleDateString('es-ES')} - Página ${i} de ${totalPages}`,
        105,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Descargar el PDF
    doc.save(fileName);
  };

  // Obtener claves disponibles para un día de la semana específico (excluyendo DESCANSO e INCIDENCIAS)
  const getAvailableKeysForDay = (dayCode) => {
    const keysForDay = [];
    availableKeys.forEach(key => {
      const keyStr = key.toString();
      const keyData = data.filter(row =>
        row.CLAVE === keyStr &&
        matchesDayPattern(row.LMXJVSD, dayCode) &&
        row.N_CIRC !== 'DESCANSO' &&
        row.DESDE !== 'INCIDENCIAS'
      );
      if (keyData.length > 0) {
        keysForDay.push(keyStr);
      }
    });
    return keysForDay;
  };

  const matchesDayPattern = (pattern, day) => {
    if (pattern === 'DIARIO') return true;
    return pattern.includes(day);
  };

  const parseTime = (timeStr) => {
    if (!timeStr || timeStr === '') return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatMinutes = (minutes) => {
    if (minutes === 0) return '0h 0m';
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const formatHours = (minutes) => {
    return (minutes / 60).toFixed(2);
  };

  // Calcular tiempo de trabajo efectivo (T/AUX)
  const calculateEffectiveWorkTime = (trains) => {
    let effectiveMinutes = 0;
    let ssMinutes = 0;
    
    for (const train of trains) {
      if (train.DESDE === 'INCIDENCIAS') {
        effectiveMinutes += 480;
        continue;
      }
      
      let start, end;
      
      if (train.SERV === 'SS') {
        start = parseTime(train.SAL);
        end = parseTime(train.LLEG);
        if (start !== null && end !== null) {
          let duration = end - start;
          if (duration < 0) duration += 24 * 60;
          ssMinutes += duration;
        }
      } else if (train.SERV === 'T' || train.SERV === 'AUX') {
        start = parseTime(train.PRES);
        if (start === null) {
          start = parseTime(train.SAL);
        }
        
        end = parseTime(train.DEJ);
        if (end === null) {
          end = parseTime(train.LLEG);
        }
        
        if (start !== null && end !== null) {
          let duration = end - start;
          if (duration < 0) duration += 24 * 60;
          effectiveMinutes += duration;
        }
      }
    }
    
    return { effectiveMinutes, ssMinutes };
  };

  // Calcular duración total del turno (desde inicio hasta fin)
  const calculateTotalShiftDuration = (trains) => {
    if (trains.length === 0) return 0;
    
    // Encontrar el inicio más temprano
    let firstStart = null;
    for (const train of trains) {
      if (train.DESDE === 'INCIDENCIAS') {
        const presTime = parseTime(train.PRES);
        if (presTime !== null && (firstStart === null || presTime < firstStart)) {
          firstStart = presTime;
        }
        continue;
      }
      
      let start = parseTime(train.PRES);
      if (start === null) start = parseTime(train.SAL);
      
      if (start !== null && (firstStart === null || start < firstStart)) {
        firstStart = start;
      }
    }
    
    // Encontrar el fin más tardío
    let lastEnd = null;
    for (const train of trains) {
      if (train.DESDE === 'INCIDENCIAS') {
        const dejTime = parseTime(train.DEJ);
        if (dejTime !== null && (lastEnd === null || dejTime > lastEnd)) {
          lastEnd = dejTime;
        }
        continue;
      }
      
      let end = parseTime(train.DEJ);
      if (end === null) end = parseTime(train.LLEG);
      
      if (end !== null && (lastEnd === null || end > lastEnd)) {
        lastEnd = end;
      }
    }
    
    if (firstStart !== null && lastEnd !== null) {
      let duration = lastEnd - firstStart;
      if (duration < 0) duration += 24 * 60;
      return duration;
    }
    
    return 0;
  };

  // Calcular tiempo de servicio en trenes (solo T/AUX, excluyendo SS)
  const calculateTrainServiceTime = (trains) => {
    let serviceMinutes = 0;
    
    for (const train of trains) {
      if (train.DESDE === 'INCIDENCIAS') {
        serviceMinutes += 480;
        continue;
      }
      
      if (train.SERV === 'T' || train.SERV === 'AUX') {
        let start = parseTime(train.PRES);
        if (start === null) start = parseTime(train.SAL);
        
        let end = parseTime(train.DEJ);
        if (end === null) end = parseTime(train.LLEG);
        
        if (start !== null && end !== null) {
          let duration = end - start;
          if (duration < 0) duration += 24 * 60;
          serviceMinutes += duration;
        }
      }
    }
    
    return serviceMinutes;
  };

  const calculateRestBetweenTrains = (trains) => {
    const rests = [];
    for (let i = 0; i < trains.length - 1; i++) {
      let currentEnd = parseTime(trains[i].DEJ);
      if (currentEnd === null) {
        currentEnd = parseTime(trains[i].LLEG);
      }
      
      let nextStart = parseTime(trains[i + 1].PRES);
      if (nextStart === null) {
        nextStart = parseTime(trains[i + 1].SAL);
      }
      
      if (currentEnd !== null && nextStart !== null) {
        let restTime = nextStart - currentEnd;
        if (restTime < 0) restTime += 24 * 60;
        
        if (restTime < 12 * 60) {
          rests.push({
            minutes: restTime,
            from: trains[i].N_VENTA,
            to: trains[i + 1].N_VENTA,
            fromEnd: trains[i].DEJ || trains[i].LLEG,
            toStart: trains[i + 1].PRES || trains[i + 1].SAL
          });
        }
      }
    }
    return rests;
  };

  // Calcular trabajo efectivo considerando la regla de esperas:
  // Si hay más de una espera, todas cuentan como trabajo efectivo EXCEPTO la más larga
  const calculateAdjustedEffectiveTime = (baseEffectiveMinutes, rests) => {
    if (rests.length <= 1) {
      // Con 0 o 1 espera, no se añade nada al trabajo efectivo
      return baseEffectiveMinutes;
    }
    
    // Con más de 1 espera: todas cuentan excepto la más larga
    const sortedRests = [...rests].sort((a, b) => b.minutes - a.minutes);
    let additionalMinutes = 0;
    
    // Sumar todas las esperas excepto la primera (la más larga)
    for (let i = 1; i < sortedRests.length; i++) {
      additionalMinutes += sortedRests[i].minutes;
    }
    
    return baseEffectiveMinutes + additionalMinutes;
  };

  // Obtener hora de fin del día (para calcular descansos entre días)
  const getDayEndTime = (trains) => {
    if (trains.length === 0) return null;
    
    const lastTrain = trains[trains.length - 1];
    if (lastTrain.DESDE === 'INCIDENCIAS') {
      return parseTime(lastTrain.DEJ);
    }
    
    return parseTime(lastTrain.DEJ) || parseTime(lastTrain.LLEG);
  };

  // Obtener hora de inicio del día
  const getDayStartTime = (trains) => {
    if (trains.length === 0) return null;
    
    const firstTrain = trains[0];
    if (firstTrain.DESDE === 'INCIDENCIAS') {
      return parseTime(firstTrain.PRES);
    }
    
    return parseTime(firstTrain.PRES) || parseTime(firstTrain.SAL);
  };

  const analyzeMonth = () => {
    const results = [];
    let currentKey = parseInt(startingKey);
    let currentDayIndex = dayOrder.indexOf(startingDay);
    
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCode = dayOrder[currentDayIndex];
      const keyStr = currentKey.toString();
      
      let trainsForDay = data.filter(row => 
        row.CLAVE === keyStr && matchesDayPattern(row.LMXJVSD, dayCode)
      );

      // Verificar si es INCIDENCIAS y hay una sustitución definida
      const isIncidencia = trainsForDay.length > 0 && trainsForDay[0].DESDE === 'INCIDENCIAS';
      const hasOverride = incidenciaOverrides[day];

      if (isIncidencia && hasOverride) {
        // Usar la clave sustituta en lugar de INCIDENCIAS
        trainsForDay = data.filter(row => 
          row.CLAVE === hasOverride && matchesDayPattern(row.LMXJVSD, dayCode)
        );
      }
      
      if (trainsForDay.length > 0 && trainsForDay[0].N_CIRC === 'DESCANSO') {
        results.push({
          day,
          key: keyStr,
          dayName: dayMap[dayCode],
          type: 'DESCANSO',
          workedMinutes: 0,
          effectiveMinutes: 0,
          adjustedEffectiveMinutes: 0,
          ssMinutes: 0,
          totalShiftMinutes: 0,
          trainServiceMinutes: 0,
          mayorDedicacionMinutes: 0,
          trains: [],
          rests: [],
          endsInHotel: false,
          isInResidence: true,
          startTime: null,
          endTime: null
        });
    } else if (trainsForDay.length > 0) {
      const { effectiveMinutes, ssMinutes } = calculateEffectiveWorkTime(trainsForDay);
      const rests = calculateRestBetweenTrains(trainsForDay);
      const totalRestMinutes = rests.reduce((sum, r) => sum + r.minutes, 0);
      const totalShiftMinutes = calculateTotalShiftDuration(trainsForDay);
      const trainServiceMinutes = calculateTrainServiceTime(trainsForDay);
      const endsInHotel = trainsForDay[trainsForDay.length - 1].FJ === 'HOTEL';

      // Trabajo efectivo ajustado según regla de esperas
      const adjustedEffectiveMinutes = calculateAdjustedEffectiveTime(effectiveMinutes, rests);

      // Obtener tiempos de inicio y fin
      const startTime = getDayStartTime(trainsForDay);
      const endTime = getDayEndTime(trainsForDay);  // <-- Definir ANTES de usar

      // Aplicar retraso si existe
      const delayMinutes = delayOverrides[day] || 0;
      const adjustedTotalShiftMinutes = totalShiftMinutes + delayMinutes;
      const adjustedEndTime = endTime !== null ? endTime + delayMinutes : null;

      // Calcular mayor dedicación con el retraso (umbral: 8h 13min = 493 min)
      const adjustedMayorDedicacionMinutes = Math.max(0, adjustedTotalShiftMinutes - 493);

      results.push({
        day,
        key: hasOverride || keyStr,
        originalKey: keyStr,
        dayCode,
        isIncidencia: isIncidencia && !hasOverride,
        wasIncidencia: isIncidencia,
        overrideKey: hasOverride || null,
        dayName: dayMap[dayCode],
        type: 'TRABAJO',
        workedMinutes: effectiveMinutes + ssMinutes + totalRestMinutes + delayMinutes,
        effectiveMinutes,
        adjustedEffectiveMinutes,
        ssMinutes,
        totalShiftMinutes: adjustedTotalShiftMinutes,
        originalShiftMinutes: totalShiftMinutes,
        trainServiceMinutes,
        mayorDedicacionMinutes: adjustedMayorDedicacionMinutes,
        delayMinutes,
        trains: trainsForDay,
        rests,
        endsInHotel,
        isInResidence: !endsInHotel,
        startTime,
        endTime: adjustedEndTime,
        originalEndTime: endTime,
        // Información de pernocta para el día anterior (si este día empieza desde hotel)
        arrivalTimeFromPreviousDay: null, // Se calculará después
        departureTime: startTime, // Hora de salida de este día
      });
    }

      // Rotar a la siguiente clave disponible
      const currentKeyIndex = availableKeys.indexOf(currentKey);
      if (currentKeyIndex !== -1 && currentKeyIndex < availableKeys.length - 1) {
        currentKey = availableKeys[currentKeyIndex + 1];
      } else {
        currentKey = availableKeys[0]; // Volver a la primera clave
      }

      currentDayIndex++;
      if (currentDayIndex >= 7) currentDayIndex = 0;
    }

    return results;
  };

  const monthAnalysis = useMemo(() => analyzeMonth(), [startingKey, startingDay, selectedMonth, selectedYear, incidenciaOverrides, delayOverrides, availableKeys]);
  // Calcular información de pernoctas (noches en hotel con tiempos de descanso)
  const pernoctasAnalysis = useMemo(() => {
  const pernoctas = [];

  for (let i = 0; i < monthAnalysis.length - 1; i++) {
    const currentDay = monthAnalysis[i];
    const nextDay = monthAnalysis[i + 1];

    // Solo si el día actual termina en hotel
    if (currentDay.endsInHotel && currentDay.type === 'TRABAJO' && nextDay.type === 'TRABAJO') {
      const llegada = currentDay.endTime; // Ya incluye retrasos si los hay
      const salida = nextDay.startTime;

      // Calcular descanso: desde fin hasta medianoche + desde medianoche hasta inicio
      let descansoMinutos = 0;
      if (llegada !== null && salida !== null) {
        descansoMinutos = (24 * 60 - llegada) + salida;
      }

      // Determinar ubicación (último destino del día)
      const lastTrain = currentDay.trains[currentDay.trains.length - 1];
      const ubicacion = lastTrain?.HASTA || 'Desconocido';
      const esResidencia = ubicacion.toUpperCase().includes('PAMPLONA');

      // Determinar estado según umbrales
      let estado = 'OK';
      let esMerma = false;
      let esEmpalme = false;

      if (esResidencia) {
        if (descansoMinutos < 600) { // < 10h
          estado = 'EMPALME';
          esEmpalme = true;
        } else if (descansoMinutos < 840) { // < 14h
          estado = 'MERMA';
          esMerma = true;
        }
      } else {
        if (descansoMinutos < 360) { // < 6h
          estado = 'EMPALME';
          esEmpalme = true;
        } else if (descansoMinutos < 540) { // < 9h
          estado = 'MERMA';
          esMerma = true;
        }
      }

      pernoctas.push({
        dia: currentDay.day,
        diaSiguiente: nextDay.day,
        ubicacion,
        esResidencia,
        llegada,
        salida,
        descansoMinutos,
        estado,
        esMerma,
        esEmpalme,
        claveActual: currentDay.key,
        claveSiguiente: nextDay.key,
        retrasoAplicado: currentDay.delayMinutes || 0
      });
    }
  }

  return pernoctas;
}, [monthAnalysis]);

  // horasExtraCiclo se calcula dentro de analyzeCompliance (ciclosAnalysis).
  // Mantenemos este memo solo para compatibilidad con exportación Excel/PDF.
  const horasExtraCiclo = useMemo(() => {
    const ciclos = analyzeCompliance.ciclosAnalysis || [];
    return {
      ciclos: ciclos.map(c => ({
        dias: c.dias,
        totalMinutos: c.jornadaCiclica,
        horasExtraMinutos: c.horasExtraMin,
        claves: c.claves,
        incompleto: !c.completo,
      })),
      totalHorasExtra: ciclos.reduce((sum, c) => sum + c.horasExtraMin, 0),
    };
  }, [analyzeCompliance]);

  // =============================================
  // ANÁLISIS DE CUMPLIMIENTO DE NORMATIVA
  // Marco Regulador de Intervención MD
  // =============================================

  // Constantes normativas
  const MAYOR_DEDICACION_UMBRAL = 493;   // 8h 13min — umbral jornada ordinaria para mayor dedicación
  const JORNADA_EFECTIVA_MAXIMA = 433;   // 7h 13min — jornada efectiva máxima por turno/día
  const DESCANSO_MIN_RESIDENCIA = 840;   // 14h — descanso diario mínimo completo en residencia
  const DESCANSO_EMPALME_RESIDENCIA = 600; // 10h — mínimo para finalizar jornada en residencia
  const DESCANSO_MIN_FUERA = 540;        // 9h — descanso diario mínimo completo fuera de residencia
  const DESCANSO_EMPALME_FUERA = 360;    // 6h — mínimo para finalizar jornada fuera de residencia
  const DESCANSO_ENTRE_CICLOS_NORMAL = 3720; // 62h — descanso mínimo entre ciclos (ciclo normal 5 días)
  const DESCANSO_ENTRE_CICLOS_REDUCIDO = 2280; // 38h — descanso mínimo entre ciclos reducidos
  const LIMITE_MENSUAL_GRAFIADO = 1500;  // 25h — máximo de mayor dedicación + merma por mes
  const LIMITE_COMPENSACION = 1800;      // 30h — a partir de aquí el exceso va al fondo de compensación
  const FONDO_COMPENSACION_DESCANSO = 433; // 7h 13min — cada vez que se acumula esto, se genera 1 descanso compensatorio

  const analyzeCompliance = useMemo(() => {
    const violations = [];
    const warnings = [];
    const enlacesDeJornada = []; // días fusionados por empalme
    const summary = {
      jornadaEfectivaViolations: 0,
      servicioTrenesViolations: 0,
      turnoMaximoViolations: 0,
      descansoEntreciclasViolations: 0,
      descansoDesvinculadoViolations: 0,
      totalMayorDedicacion: 0,
      totalMermaDescanso: 0,
      totalHorasExtraCiclo: 0,
      totalEmpalmes: 0,
      descansosSinDisfrutar: 0,
      limiteMensualExceeded: false,
      fondoCompensacion: 0,
      descansosCompensatorios: 0,
    };

    // ── PASO 1: Detectar enlaces de jornada (empalmes) ──────────────────────
    // Cuando el descanso entre dos turnos consecutivos NO alcanza el mínimo para
    // finalizar jornada (10h resid. / 6h fuera), ambos turnos se fusionan en una
    // única jornada ordinaria (Marco Regulador — Descanso diario).
    const workDaysSeq = monthAnalysis.filter(d => d.type === 'TRABAJO');
    const enlaceSet = new Set(); // índices (en workDaysSeq) del 2º turno de un empalme

    for (let i = 0; i < workDaysSeq.length - 1; i++) {
      const cur = workDaysSeq[i];
      const nxt = workDaysSeq[i + 1];
      if (cur.endTime === null || nxt.startTime === null) continue;

      // Descanso real entre ambos turnos (pueden ser días consecutivos o separados por descansos)
      const curIdx = monthAnalysis.findIndex(d => d.day === cur.day);
      const nxtIdx = monthAnalysis.findIndex(d => d.day === nxt.day);
      const calendarDaysBetween = nxtIdx - curIdx; // días de calendario entre ambos
      let restMinutes = (calendarDaysBetween * 24 * 60) - cur.endTime + nxt.startTime;
      if (calendarDaysBetween === 1) {
        restMinutes = (24 * 60 - cur.endTime) + nxt.startTime;
      }

      // El umbral de empalme depende de si el turno anterior termina en residencia o fuera
      const umbralEmpalme = cur.isInResidence ? DESCANSO_EMPALME_RESIDENCIA : DESCANSO_EMPALME_FUERA;

      if (restMinutes < umbralEmpalme) {
        // ENLACE DE JORNADA: fusionar los dos turnos
        enlaceSet.add(i + 1); // el segundo turno queda absorbido por el primero
        const jornadaFusionadaMinutos = cur.totalShiftMinutes + restMinutes + nxt.totalShiftMinutes;
        const mayorDedicFusionada = Math.max(0, jornadaFusionadaMinutos - MAYOR_DEDICACION_UMBRAL);

        enlacesDeJornada.push({
          dia1: cur.day,
          dia2: nxt.day,
          key1: cur.key,
          key2: nxt.key,
          descansoMinutos: restMinutes,
          umbralEmpalme,
          jornadaFusionadaMinutos,
          mayorDedicFusionada,
          esResidencia: cur.isInResidence,
        });

        summary.totalEmpalmes++;
        violations.push({
          type: 'ENLACE_DE_JORNADA',
          severity: 'critica',
          day: cur.day,
          key: cur.key,
          dayName: cur.dayName,
          value: restMinutes,
          limit: umbralEmpalme,
          message: `Enlace de jornada días ${cur.day}-${nxt.day} (Claves ${cur.key}/${nxt.key}): descanso de ${formatMinutes(restMinutes)} inferior al mínimo de ${formatMinutes(umbralEmpalme)} para finalizar jornada. Jornada fusionada: ${formatMinutes(jornadaFusionadaMinutos)}, mayor dedicación: ${formatMinutes(mayorDedicFusionada)}`
        });
      }
    }

    // ── PASO 2: Verificaciones diarias ──────────────────────────────────────
    for (let i = 0; i < workDaysSeq.length; i++) {
      const day = workDaysSeq[i];
      if (enlaceSet.has(i)) continue; // turno absorbido por enlace, no computar dos veces

      // Mayor dedicación (jornada ordinaria > 8h 13min)
      if (day.mayorDedicacionMinutes > 0) {
        summary.totalMayorDedicacion += day.mayorDedicacionMinutes;
        warnings.push({
          type: 'MAYOR_DEDICACION',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.mayorDedicacionMinutes,
          message: `Día ${day.day} (Clave ${day.key}): Mayor dedicación de ${formatMinutes(day.mayorDedicacionMinutes)} — jornada ordinaria de ${formatMinutes(day.totalShiftMinutes)} supera las 8h 13min`
        });
      }

      // Jornada efectiva máxima diaria (9h)
      // La normativa fija la jornada efectiva máxima en 9h cuando hay ampliación,
      // y la ordinaria en 7h 13min por turno. Se avisa si se supera el umbral efectivo.
      if (day.adjustedEffectiveMinutes > 540) {
        const exceso = day.adjustedEffectiveMinutes - 540;
        summary.jornadaEfectivaViolations++;
        violations.push({
          type: 'JORNADA_EFECTIVA_MAXIMA',
          severity: 'alta',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.adjustedEffectiveMinutes,
          limit: 540,
          excess: exceso,
          message: `Día ${day.day} (Clave ${day.key}): Jornada efectiva de ${formatMinutes(day.adjustedEffectiveMinutes)} supera las 9h máximas permitidas. Exceso: ${formatMinutes(exceso)}`
        });
      }

      // Servicio en trenes (máximo 9 horas)
      if (day.trainServiceMinutes > 540) {
        const exceso = day.trainServiceMinutes - 540;
        summary.servicioTrenesViolations++;
        violations.push({
          type: 'SERVICIO_TRENES_MAXIMO',
          severity: 'alta',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.trainServiceMinutes,
          limit: 540,
          excess: exceso,
          message: `Día ${day.day} (Clave ${day.key}): Servicio en trenes de ${formatMinutes(day.trainServiceMinutes)} supera las 9h máximas. Exceso: ${formatMinutes(exceso)}`
        });
      }

      // Advertencia si turno > 10h (se acerca al límite de jornada ordinaria ampliada)
      if (day.totalShiftMinutes > 600) {
        warnings.push({
          type: 'TURNO_CERCANO_LIMITE',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.totalShiftMinutes,
          message: `Día ${day.day} (Clave ${day.key}): Jornada ordinaria de ${formatMinutes(day.totalShiftMinutes)} (>10h) — revisa si está justificada por única circulación o ida/regreso`
        });
      }
    }

    // Sumar mayor dedicación de enlaces de jornada (reemplaza los dos turnos)
    for (const enlace of enlacesDeJornada) {
      summary.totalMayorDedicacion += enlace.mayorDedicFusionada;
    }

    // ── PASO 3: Descansos diarios entre turnos consecutivos ─────────────────
    const restPeriods = [];
    for (let i = 0; i < workDaysSeq.length - 1; i++) {
      if (enlaceSet.has(i + 1)) continue; // este par ya es un enlace, ya contabilizado
      const cur = workDaysSeq[i];
      const nxt = workDaysSeq[i + 1];
      if (cur.endTime === null || nxt.startTime === null) continue;

      const curIdx = monthAnalysis.findIndex(d => d.day === cur.day);
      const nxtIdx = monthAnalysis.findIndex(d => d.day === nxt.day);
      const calDays = nxtIdx - curIdx;
      let restMinutes;
      if (calDays === 1) {
        restMinutes = (24 * 60 - cur.endTime) + nxt.startTime;
      } else {
        restMinutes = (calDays * 24 * 60) - cur.endTime + nxt.startTime;
      }

      // Umbral según ubicación al finalizar el turno
      const descansoMinCompleto = cur.isInResidence ? DESCANSO_MIN_RESIDENCIA : DESCANSO_MIN_FUERA;
      const descansoEmpalme = cur.isInResidence ? DESCANSO_EMPALME_RESIDENCIA : DESCANSO_EMPALME_FUERA;
      const lugar = cur.isInResidence ? 'residencia' : 'fuera de residencia';

      restPeriods.push({
        fromDay: cur.day,
        toDay: nxt.day,
        fromKey: cur.key,
        toKey: nxt.key,
        minutes: restMinutes,
        descansoMinCompleto,
        descansoEmpalme,
        fromInResidence: cur.isInResidence,
      });

      if (restMinutes >= descansoEmpalme && restMinutes < descansoMinCompleto) {
        // Merma de descanso diario
        const merma = descansoMinCompleto - restMinutes;
        summary.totalMermaDescanso += merma;
        violations.push({
          type: 'MERMA_DESCANSO_DIARIO',
          severity: 'media',
          fromDay: cur.day,
          toDay: nxt.day,
          value: restMinutes,
          limit: descansoMinCompleto,
          excess: merma,
          message: `Merma de descanso diario entre días ${cur.day} y ${nxt.day} (${lugar}): descanso de ${formatMinutes(restMinutes)}, faltan ${formatMinutes(merma)} para alcanzar las ${formatMinutes(descansoMinCompleto)} mínimas`
        });
      }
    }

    // ── PASO 4: Descanso entre ciclos (ciclos normales de 5 días) ───────────
    // Se identifica cada bloque de descanso ordinario (días DESCANSO) entre ciclos
    // y se aplica la tabla normativa de 4 niveles.
    let i = 0;
    while (i < monthAnalysis.length) {
      const day = monthAnalysis[i];
      if (day.type === 'DESCANSO') {
        // Encontrar inicio y fin del bloque de descanso
        let restBlockStart = i;
        let restBlockEnd = i;
        while (restBlockEnd + 1 < monthAnalysis.length && monthAnalysis[restBlockEnd + 1].type === 'DESCANSO') {
          restBlockEnd++;
        }
        const numDescansos = restBlockEnd - restBlockStart + 1;

        // Último turno antes del descanso y primer turno después
        let prevWorkDay = null;
        for (let j = restBlockStart - 1; j >= 0; j--) {
          if (monthAnalysis[j].type === 'TRABAJO') { prevWorkDay = monthAnalysis[j]; break; }
        }
        let nextWorkDay = null;
        for (let j = restBlockEnd + 1; j < monthAnalysis.length; j++) {
          if (monthAnalysis[j].type === 'TRABAJO') { nextWorkDay = monthAnalysis[j]; break; }
        }

        if (prevWorkDay && nextWorkDay && prevWorkDay.endTime !== null && nextWorkDay.startTime !== null) {
          // Tiempo total del descanso entre ciclos
          const calDaysRest = (restBlockEnd - restBlockStart + 1) + 1; // días DESCANSO + 1 día calendario
          const totalRestMinutes =
            (24 * 60 - prevWorkDay.endTime) +
            (restBlockEnd - restBlockStart) * 24 * 60 +
            nextWorkDay.startTime;

          const restHours = totalRestMinutes / 60;

          // Tabla normativa ciclos normales (2 descansos = 62h mínimo grafiado)
          // < 62h pero ≥ 48h → merma descanso último turno (62h - tiempo)
          // < 48h pero ≥ 38h → 1 descanso sin disfrutar
          // < 38h pero ≥ 24h → 1 descanso sin disfrutar + merma (38h - tiempo)
          // < 24h → 2 descansos sin disfrutar
          if (numDescansos >= 2) {
            if (totalRestMinutes < 1440) { // < 24h → 2 descansos no disfrutados
              summary.descansoEntreciclasViolations++;
              summary.descansosSinDisfrutar += 2;
              violations.push({
                type: 'DESCANSO_ENTRE_CICLOS',
                severity: 'critica',
                fromDay: prevWorkDay.day,
                toDay: nextWorkDay.day,
                value: totalRestMinutes,
                limit: DESCANSO_ENTRE_CICLOS_NORMAL,
                message: `Descanso entre ciclos días ${prevWorkDay.day}-${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} — menos de 24h: 2 descansos ordinarios no disfrutados. Se generan 2 descansos alternativos.`
              });
            } else if (totalRestMinutes < DESCANSO_ENTRE_CICLOS_REDUCIDO) { // < 38h → 1 descanso no disfrutado + merma
              const merma = DESCANSO_ENTRE_CICLOS_REDUCIDO - totalRestMinutes;
              summary.descansoEntreciclasViolations++;
              summary.descansosSinDisfrutar++;
              summary.totalMermaDescanso += merma;
              violations.push({
                type: 'DESCANSO_ENTRE_CICLOS',
                severity: 'critica',
                fromDay: prevWorkDay.day,
                toDay: nextWorkDay.day,
                value: totalRestMinutes,
                limit: DESCANSO_ENTRE_CICLOS_NORMAL,
                message: `Descanso entre ciclos días ${prevWorkDay.day}-${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} — 1 descanso ordinario no disfrutado + merma de ${formatMinutes(merma)} en último turno. Se genera 1 descanso alternativo.`
              });
            } else if (totalRestMinutes < 2880) { // < 48h → 1 descanso no disfrutado
              summary.descansosSinDisfrutar++;
              warnings.push({
                type: 'DESCANSO_NO_DISFRUTADO',
                fromDay: prevWorkDay.day,
                toDay: nextWorkDay.day,
                value: totalRestMinutes,
                message: `Descanso entre ciclos días ${prevWorkDay.day}-${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} — 1 descanso ordinario no disfrutado. Derecho a descanso alternativo dentro de 14 semanas.`
              });
            } else if (totalRestMinutes < DESCANSO_ENTRE_CICLOS_NORMAL) { // < 62h → merma descanso
              const merma = DESCANSO_ENTRE_CICLOS_NORMAL - totalRestMinutes;
              summary.descansoEntreciclasViolations++;
              summary.totalMermaDescanso += merma;
              violations.push({
                type: 'DESCANSO_ENTRE_CICLOS',
                severity: 'alta',
                fromDay: prevWorkDay.day,
                toDay: nextWorkDay.day,
                value: totalRestMinutes,
                limit: DESCANSO_ENTRE_CICLOS_NORMAL,
                message: `Descanso entre ciclos días ${prevWorkDay.day}-${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} — merma de ${formatMinutes(merma)} en el descanso diario del último turno del ciclo anterior.`
              });
            }
          } else if (numDescansos === 1) {
            // Ciclo reducido: mínimo 38h
            if (totalRestMinutes < 1440) { // < 24h → 1 descanso no disfrutado
              summary.descansosSinDisfrutar++;
              violations.push({
                type: 'DESCANSO_ENTRE_CICLOS_REDUCIDO',
                severity: 'critica',
                fromDay: prevWorkDay.day,
                toDay: nextWorkDay.day,
                value: totalRestMinutes,
                limit: DESCANSO_ENTRE_CICLOS_REDUCIDO,
                message: `Descanso entre ciclos reducidos días ${prevWorkDay.day}-${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} — 1 descanso ordinario no disfrutado. Se genera 1 descanso alternativo.`
              });
            } else if (totalRestMinutes < DESCANSO_ENTRE_CICLOS_REDUCIDO) { // < 38h → merma
              const merma = DESCANSO_ENTRE_CICLOS_REDUCIDO - totalRestMinutes;
              summary.descansoEntreciclasViolations++;
              summary.totalMermaDescanso += merma;
              violations.push({
                type: 'DESCANSO_ENTRE_CICLOS_REDUCIDO',
                severity: 'alta',
                fromDay: prevWorkDay.day,
                toDay: nextWorkDay.day,
                value: totalRestMinutes,
                limit: DESCANSO_ENTRE_CICLOS_REDUCIDO,
                message: `Descanso entre ciclos reducidos días ${prevWorkDay.day}-${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} — merma de ${formatMinutes(merma)} para alcanzar las 38h mínimas.`
              });
            }
          }
        }
        i = restBlockEnd + 1;
      } else {
        i++;
      }
    }

    // ── PASO 5: Jornada cíclica y horas extraordinarias ─────────────────────
    // La jornada cíclica = suma jornada efectiva de todos los turnos del ciclo
    //                     + 50% de los viajes sin servicio (SS) del ciclo.
    // Máximo cíclico = nº días trabajo del ciclo × 7h 13min (433 min).
    // El exceso son horas extraordinarias → van al fondo de compensación.
    const ciclosAnalysis = [];
    let cicloActual = [];
    let diasTrabajadosEnCiclo = 0;
    let cicloIdx = 0;

    for (const day of monthAnalysis) {
      if (day.type === 'TRABAJO') {
        cicloActual.push(day);
        diasTrabajadosEnCiclo++;

        if (diasTrabajadosEnCiclo === 5) {
          const jornadaEfectivaCiclo = cicloActual.reduce((s, d) => s + d.effectiveMinutes, 0);
          const ssCiclo = cicloActual.reduce((s, d) => s + d.ssMinutes, 0);
          const jornadaCiclica = jornadaEfectivaCiclo + Math.round(ssCiclo * 0.5);
          const maximoCiclico = 5 * JORNADA_EFECTIVA_MAXIMA; // 5 × 7h13min = 2165 min
          const horasExtraMin = Math.max(0, jornadaCiclica - maximoCiclico);

          ciclosAnalysis.push({
            idx: ++cicloIdx,
            dias: cicloActual.map(d => d.day),
            claves: cicloActual.map(d => d.key),
            jornadaEfectivaCiclo,
            ssCiclo,
            jornadaCiclica,
            maximoCiclico,
            horasExtraMin,
            completo: true,
          });
          summary.totalHorasExtraCiclo += horasExtraMin;
          cicloActual = [];
          diasTrabajadosEnCiclo = 0;
        }
      } else if (day.type === 'DESCANSO' && diasTrabajadosEnCiclo > 0) {
        // fin de ciclo al llegar a descansos
        const jornadaEfectivaCiclo = cicloActual.reduce((s, d) => s + d.effectiveMinutes, 0);
        const ssCiclo = cicloActual.reduce((s, d) => s + d.ssMinutes, 0);
        const jornadaCiclica = jornadaEfectivaCiclo + Math.round(ssCiclo * 0.5);
        const maximoCiclico = diasTrabajadosEnCiclo * JORNADA_EFECTIVA_MAXIMA;
        const horasExtraMin = Math.max(0, jornadaCiclica - maximoCiclico);

        ciclosAnalysis.push({
          idx: ++cicloIdx,
          dias: cicloActual.map(d => d.day),
          claves: cicloActual.map(d => d.key),
          jornadaEfectivaCiclo,
          ssCiclo,
          jornadaCiclica,
          maximoCiclico,
          horasExtraMin,
          completo: diasTrabajadosEnCiclo >= 3,
        });
        summary.totalHorasExtraCiclo += horasExtraMin;
        cicloActual = [];
        diasTrabajadosEnCiclo = 0;
      }
    }
    // Ciclo incompleto al final del mes (sin descanso cierre)
    if (cicloActual.length > 0) {
      const jornadaEfectivaCiclo = cicloActual.reduce((s, d) => s + d.effectiveMinutes, 0);
      const ssCiclo = cicloActual.reduce((s, d) => s + d.ssMinutes, 0);
      const jornadaCiclica = jornadaEfectivaCiclo + Math.round(ssCiclo * 0.5);
      const maximoCiclico = cicloActual.length * JORNADA_EFECTIVA_MAXIMA;
      const horasExtraMin = Math.max(0, jornadaCiclica - maximoCiclico);

      ciclosAnalysis.push({
        idx: ++cicloIdx,
        dias: cicloActual.map(d => d.day),
        claves: cicloActual.map(d => d.key),
        jornadaEfectivaCiclo,
        ssCiclo,
        jornadaCiclica,
        maximoCiclico,
        horasExtraMin,
        completo: false,
      });
      summary.totalHorasExtraCiclo += horasExtraMin;
    }

    // ── PASO 6: Cómputo mensual de excesos y mermas ─────────────────────────
    // Se cierra al final del último ciclo COMPLETO del mes.
    // Si el total no supera las 30h → se pierde todo y se reinicia.
    // Si supera las 30h → el exceso va al fondo de compensación.
    // El límite grafiado (25h) aplica en cualquier caso.
    const totalExcesoMensual = summary.totalMayorDedicacion + summary.totalMermaDescanso;

    if (totalExcesoMensual > LIMITE_MENSUAL_GRAFIADO) {
      summary.limiteMensualExceeded = true;
      violations.push({
        type: 'LIMITE_MENSUAL_EXCEDIDO',
        severity: 'critica',
        value: totalExcesoMensual,
        limit: LIMITE_MENSUAL_GRAFIADO,
        message: `Cómputo mensual: ${formatMinutes(totalExcesoMensual)} de mayor dedicación + merma supera el límite de 25h grafiado. Exceso: ${formatMinutes(totalExcesoMensual - LIMITE_MENSUAL_GRAFIADO)}`
      });
    }

    // ── PASO 7: Fondo de compensación ───────────────────────────────────────
    // Horas extraordinarias (exceso de jornada cíclica) se acumulan en el fondo.
    // Cada 7h 13min acumuladas → 1 descanso compensatorio (a disfrutar en 14 semanas).
    // Si el cómputo mensual supera 30h, el exceso también va al fondo.
    let fondoCompensacion = summary.totalHorasExtraCiclo;
    if (totalExcesoMensual > LIMITE_COMPENSACION) {
      fondoCompensacion += totalExcesoMensual - LIMITE_COMPENSACION;
    }
    const descansosCompensatorios = Math.floor(fondoCompensacion / FONDO_COMPENSACION_DESCANSO);
    summary.fondoCompensacion = fondoCompensacion;
    summary.descansosCompensatorios = descansosCompensatorios;

    if (fondoCompensacion > 0) {
      warnings.push({
        type: 'FONDO_COMPENSACION',
        value: fondoCompensacion,
        message: `Fondo de compensación: ${formatMinutes(fondoCompensacion)} acumulados${descansosCompensatorios > 0 ? ` → ${descansosCompensatorios} descanso(s) compensatorio(s) generado(s) (a disfrutar en las próximas 14 semanas)` : ' (aún no se genera descanso compensatorio; se necesitan 7h 13min)'}`
      });
    }

    if (totalExcesoMensual > 0 && totalExcesoMensual <= LIMITE_COMPENSACION) {
      warnings.push({
        type: 'COMPUTO_MENSUAL',
        value: totalExcesoMensual,
        message: `Cómputo mensual de excesos y mermas: ${formatMinutes(totalExcesoMensual)}. ${totalExcesoMensual <= LIMITE_MENSUAL_GRAFIADO ? 'Dentro del límite de 25h — no genera compensación adicional.' : `Supera las 25h pero no alcanza las 30h — el exceso de ${formatMinutes(totalExcesoMensual - LIMITE_MENSUAL_GRAFIADO)} queda acumulado.`}`
      });
    }

    return {
      violations: violations.sort((a, b) => {
        const severityOrder = { critica: 0, alta: 1, media: 2, baja: 3 };
        return (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3);
      }),
      warnings,
      summary,
      totalExcesoMensual,
      restPeriods,
      ciclosAnalysis,
      enlacesDeJornada,
    };
  }, [monthAnalysis]);

  const monthlyStats = useMemo(() => {
    const totalWorkedMinutes = monthAnalysis.reduce((sum, day) => sum + day.workedMinutes, 0);
    const totalEffectiveMinutes = monthAnalysis.reduce((sum, day) => sum + day.effectiveMinutes, 0);
    const totalSSMinutes = monthAnalysis.reduce((sum, day) => sum + day.ssMinutes, 0);
    const workedDays = monthAnalysis.filter(d => d.type === 'TRABAJO').length;
    const restDays = monthAnalysis.filter(d => d.type === 'DESCANSO').length;
    const hotelNights = monthAnalysis.filter(d => d.endsInHotel).length;
    
    const allRests = monthAnalysis.flatMap(d => d.rests);
    const totalRestMinutes = allRests.reduce((sum, r) => sum + r.minutes, 0);
    const avgRestBetweenTrains = allRests.length > 0 
      ? totalRestMinutes / allRests.length 
      : 0;
    
    return {
      totalWorkedMinutes,
      totalWorkedHours: (totalWorkedMinutes / 60).toFixed(2),
      totalEffectiveMinutes,
      totalEffectiveHours: (totalEffectiveMinutes / 60).toFixed(2),
      totalSSMinutes,
      totalSSHours: (totalSSMinutes / 60).toFixed(2),
      totalRestMinutes,
      totalRestHours: (totalRestMinutes / 60).toFixed(2),
      workedDays,
      restDays,
      hotelNights,
      avgRestBetweenTrains,
      avgHoursPerWorkDay: workedDays > 0 ? (totalWorkedMinutes / workedDays / 60).toFixed(2) : 0
    };
  }, [monthAnalysis]);

  const keyStats = useMemo(() => {
    const stats = {};

    availableKeys.forEach(key => {
      const keyStr = key.toString();
      const keyData = monthAnalysis.filter(d => d.key === keyStr);

      if (keyData.length > 0) {
        const totalMinutes = keyData.reduce((sum, d) => sum + d.workedMinutes, 0);
        const avgMinutes = totalMinutes / keyData.length;

        stats[keyStr] = {
          appearances: keyData.length,
          totalMinutes,
          avgMinutes,
          isRest: keyData[0].type === 'DESCANSO'
        };
      }
    });

    return stats;
  }, [monthAnalysis, availableKeys]);

  const chartData = Object.keys(keyStats).map(key => ({
    clave: key,
    horas: (keyStats[key].avgMinutes / 60).toFixed(2),
    tipo: keyStats[key].isRest ? 'Descanso' : 'Trabajo'
  })).filter(d => d.tipo === 'Trabajo');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Colores para severidad
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critica': return 'bg-red-100 border-red-500 text-red-800';
      case 'alta': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'media': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'baja': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critica': return '🚨 CRÍTICA';
      case 'alta': return '⚠️ ALTA';
      case 'media': return '⚡ MEDIA';
      case 'baja': return 'ℹ️ BAJA';
      default: return 'INFO';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Análisis de Gráfico de Interventores Renfe</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
            title="Exportar análisis completo a Excel"
          >
            <span>📊</span> Exportar Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
            title="Exportar informe a PDF"
          >
            <span>📄</span> Exportar PDF
          </button>
          <button
            onClick={() => setShowUserGuide(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
          >
            <span>📖</span> Guía de Usuario
          </button>
        </div>
      </div>
        {/* Carga de CSV */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2">
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm font-medium transition-colors">
                        📁 Cargar archivo (.xlsx o .csv)
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleCSVUpload}
                            className="hidden"
                        />
                    </label>

                    {/* BOTÓN AYUDA (nuevo) */}
                    <button
                      onClick={() => setShowCSVHelp(true)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ❓ Ayuda CSV
                    </button>
                    {csvFileName && (
                        <button
                            onClick={handleResetCSV}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm font-medium transition-colors"
                        >
                            ↺ Restablecer
                        </button>
                    )}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                    {csvFileName ? (
                        <span className="flex items-center gap-1">
                            <span className="text-green-600">✓</span>
                            Archivo cargado: <strong>{csvFileName}</strong>
                        </span>
                    ) : (
                        <span>Usando datos por defecto del gráfico</span>
                    )}
                </div>
            </div>
        </div>

        {/* Enlace a IA de Normativa */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-purple-800">
            <span className="mr-2">🤖</span>
            ¿Tienes alguna duda acerca de la Normativa Laboral de Renfe?{' '}
            <a
              href="https://notebooklm.google.com/notebook/dc223916-0d50-4f9e-91c0-68d311435f07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-semibold underline"
            >
              Pregúntale a la IA ↗
            </a>
          </p>
        </div>

      {/* Pestañas de navegación */}
      <div className="mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="flex space-x-2 sm:space-x-4 min-w-max">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-t-lg whitespace-nowrap ${
              activeTab === 'analysis'
                ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 Análisis General
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-t-lg whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ⚖️ Cumplimiento
            {analyzeCompliance.violations.length > 0 && (
              <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {analyzeCompliance.violations.length}
              </span>
            )}
          </button>
        </nav>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Configuración del análisis - {monthNames[selectedMonth]} {selectedYear} ({getDaysInMonth(selectedMonth, selectedYear)} días)</h2>
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Clave inicial:</label>
            <select
              value={startingKey}
              onChange={(e) => setStartingKey(e.target.value)}
              className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
            >
              {availableKeys.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Día de la semana:</label>
            <select 
              value={startingDay} 
              onChange={(e) => setStartingDay(e.target.value)}
              className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
            >
              {dayOrder.map(d => (
                <option key={d} value={d}>{dayMap[d]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Mes:</label>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Año:</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
            >
              {[2024, 2025, 2026, 2027].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
        </div>
        </div>
      </div>

      {/* Secciones que solo aparecen en Análisis General */}
      {activeTab === 'analysis' && (
        <>
        {/* Gestión de Incidencias */}
        {(() => {
          const incidenciaDays = monthAnalysis.filter(d => d.wasIncidencia);
        if (incidenciaDays.length === 0) return null;
        
        return (
          <SeccionColapsable titulo="Sustitución de Incidencias" icono="🔄">
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Si el supervisor te ha asignado otra clave en algún día de incidencias, selecciónala aquí para actualizar el análisis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {incidenciaDays.map((d) => {
                const availableKeys = getAvailableKeysForDay(d.dayCode);
                return (
                  <div 
                    key={d.day} 
                    className={`p-3 rounded-lg border ${d.overrideKey ? 'bg-blue-50 border-blue-300' : 'bg-yellow-50 border-yellow-300'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">
                        Día {d.day} ({d.dayName})
                      </span>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                        Clave {d.originalKey}
                      </span>
                    </div>
                    <select
                      value={incidenciaOverrides[d.day] || ''}
                      onChange={(e) => {
                        const newOverrides = { ...incidenciaOverrides };
                        if (e.target.value === '') {
                          delete newOverrides[d.day];
                        } else {
                          newOverrides[d.day] = e.target.value;
                        }
                        setIncidenciaOverrides(newOverrides);
                      }}
                      className="w-full border rounded px-2 py-1.5 text-sm"
                    >
                      <option value="">INCIDENCIAS (8h)</option>
                      {availableKeys.map(k => (
                        <option key={k} value={k}>Clave {k}</option>
                      ))}
                    </select>
                    {d.overrideKey && (
                      <div className="mt-2 text-xs text-blue-600">
                        ✓ Sustituida por clave {d.overrideKey}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {Object.keys(incidenciaOverrides).length > 0 && (
              <button
                onClick={() => setIncidenciaOverrides({})}
                className="mt-4 text-sm text-red-600 hover:text-red-800 underline"
              >
                Restablecer todas las incidencias
              </button>
            )}
          </SeccionColapsable>
        );
      })()}
      {/* Gestión de Retrasos */}
        {(() => {
          const workDays = monthAnalysis.filter(d => d.type === 'TRABAJO');
          if (workDays.length === 0) return null;

          const daysWithDelays = workDays.filter(d => d.delayMinutes > 0);

          return (
            <SeccionColapsable titulo="Retrasos y Tiempo Extra" icono="⏱️">
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Si algún día el tren llegó con retraso, indica los minutos extra trabajados para ajustar el cálculo de mayor dedicación y mermas.
              </p>

              {/* Resumen de retrasos */}
              {daysWithDelays.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <div className="text-sm font-medium text-orange-800 mb-2">
                    Retrasos registrados: {daysWithDelays.length} día(s)
                  </div>
                  <div className="text-xs text-orange-700">
                    Total tiempo extra: {formatMinutes(daysWithDelays.reduce((sum, d) => sum + d.delayMinutes, 0))}
                  </div>
                </div>
              )}

              {/* Selector de día y minutos */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Día:</label>
                  <select
                    id="delay-day-select"
                    className="border rounded px-2 py-1.5 text-sm min-w-[150px]"
                    defaultValue=""
                  >
                    <option value="">Seleccionar día...</option>
                    {workDays.map(d => (
                      <option key={d.day} value={d.day}>
                        Día {d.day} ({d.dayName}) - Clave {d.key}
                        {d.delayMinutes > 0 ? ` [+${d.delayMinutes}min]` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Minutos de retraso:</label>
                  <input
                    id="delay-minutes-input"
                    type="number"
                    min="0"
                    max="480"
                    placeholder="Ej: 45"
                    className="border rounded px-2 py-1.5 text-sm w-24"
                  />
                </div>
                <button
                  onClick={() => {
                    const daySelect = document.getElementById('delay-day-select');
                    const minutesInput = document.getElementById('delay-minutes-input');
                    const day = parseInt(daySelect.value);
                    const minutes = parseInt(minutesInput.value) || 0;

                    if (!day) {
                      alert('Selecciona un día');
                      return;
                    }

                    const newDelays = { ...delayOverrides };
                    if (minutes > 0) {
                      newDelays[day] = minutes;
                    } else {
                      delete newDelays[day];
                    }
                    setDelayOverrides(newDelays);

                    // Limpiar inputs
                    daySelect.value = '';
                    minutesInput.value = '';
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Aplicar
                </button>
              </div>

              {/* Lista de retrasos aplicados */}
              {daysWithDelays.length > 0 && (
                <div className="border-t pt-3">
                  <div className="text-xs sm:text-sm font-medium mb-2">Retrasos aplicados:</div>
                  <div className="flex flex-wrap gap-2">
                    {daysWithDelays.map(d => (
                      <div
                        key={d.day}
                        className="bg-orange-100 border border-orange-300 rounded px-2 py-1 text-xs sm:text-sm flex items-center gap-2"
                      >
                        <span>Día {d.day}: +{d.delayMinutes}min</span>
                        <button
                          onClick={() => {
                            const newDelays = { ...delayOverrides };
                            delete newDelays[d.day];
                            setDelayOverrides(newDelays);
                          }}
                          className="text-orange-600 hover:text-orange-800 font-bold"
                          title="Eliminar retraso"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setDelayOverrides({})}
                    className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Eliminar todos los retrasos
                  </button>
                </div>
              )}
            </SeccionColapsable>
          );
        })()}

        {/* Detalle de Pernoctas */}
        {(() => {
          if (pernoctasAnalysis.length === 0) return null;

          return (
            <SeccionColapsable titulo="Detalle de Pernoctas" icono="🏨">
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Información de descansos en hotel con tiempos de llegada, salida y estado de merma/empalme.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Día</th>
                      <th className="p-2 text-left">Ubicación</th>
                      <th className="p-2 text-left">Llegada</th>
                      <th className="p-2 text-left">Salida (día+1)</th>
                      <th className="p-2 text-left">Descanso</th>
                      <th className="p-2 text-left">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pernoctasAnalysis.map((p, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${p.esEmpalme ? 'bg-red-50' : p.esMerma ? 'bg-yellow-50' : ''}`}>
                        <td className="p-2">
                          {p.dia} → {p.diaSiguiente}
                          <div className="text-xs text-gray-500">Clave {p.claveActual}</div>
                        </td>
                        <td className="p-2">
                          {p.ubicacion}
                          {p.esResidencia && <span className="text-xs text-blue-600 ml-1">(Res.)</span>}
                        </td>
                        <td className="p-2">
                          {p.llegada !== null ? `${Math.floor(p.llegada / 60).toString().padStart(2, '0')}:${(p.llegada % 60).toString().padStart(2, '0')}` : '-'}
                          {p.retrasoAplicado > 0 && (
                            <span className="text-orange-500 text-xs ml-1">(+{p.retrasoAplicado}m)</span>
                          )}
                        </td>
                        <td className="p-2">
                          {p.salida !== null ? `${Math.floor(p.salida / 60).toString().padStart(2, '0')}:${(p.salida % 60).toString().padStart(2, '0')}` : '-'}
                        </td>
                        <td className="p-2 font-medium">
                          {formatMinutes(p.descansoMinutos)}
                        </td>
                        <td className="p-2">
                          {p.esEmpalme ? (
                            <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800 font-medium">
                              🔴 EMPALME
                            </span>
                          ) : p.esMerma ? (
                            <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">
                              ⚠️ MERMA
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                              ✓ OK
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen de pernoctas */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600">
                    {pernoctasAnalysis.filter(p => !p.esMerma && !p.esEmpalme).length}
                  </div>
                  <div className="text-xs text-green-800">Descansos OK</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-yellow-600">
                    {pernoctasAnalysis.filter(p => p.esMerma).length}
                  </div>
                  <div className="text-xs text-yellow-800">Con Merma</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-red-600">
                    {pernoctasAnalysis.filter(p => p.esEmpalme).length}
                  </div>
                  <div className="text-xs text-red-800">Empalmes</div>
                </div>
              </div>

              {/* Leyenda de umbrales */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs">
                <div className="font-medium mb-2">Umbrales de descanso:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <strong>Fuera de residencia:</strong> Normal ≥9h | Merma &lt;9h y ≥6h | Empalme &lt;6h
                  </div>
                  <div>
                    <strong>En residencia:</strong> Normal ≥14h | Merma &lt;14h y ≥10h | Empalme &lt;10h
                  </div>
                </div>
              </div>
            </SeccionColapsable>
          );
        })()}

        {/* Ciclos: Jornada Cíclica y Horas Extraordinarias */}
        {(() => {
          const ciclos = analyzeCompliance.ciclosAnalysis || [];
          if (ciclos.length === 0) return null;

          return (
            <SeccionColapsable titulo="Jornada Cíclica y Horas Extraordinarias" icono="⏰">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                La <strong>jornada cíclica</strong> es la jornada efectiva total del ciclo, calculada como la suma de la jornada efectiva de todos sus turnos más el <strong>50% de los viajes sin servicio (SS)</strong> del ciclo. El máximo es <strong>nº días × 7h 13min</strong>. El exceso son <strong>horas extraordinarias</strong>.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Las horas extraordinarias se acumulan en el fondo de compensación. Cada 7h 13min acumuladas generan un descanso compensatorio a disfrutar en las 14 semanas siguientes.
              </p>

              <div className="space-y-3">
                {ciclos.map((ciclo) => (
                  <div
                    key={ciclo.idx}
                    className={`p-3 rounded-lg border ${ciclo.horasExtraMin > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <span className="font-medium">Ciclo {ciclo.idx}</span>
                        {!ciclo.completo && <span className="text-xs text-gray-500 ml-2">(incompleto — pendiente de cerrar)</span>}
                        <div className="text-xs text-gray-600 mt-0.5">
                          Días: {ciclo.dias.join(', ')} | Claves: {ciclo.claves.join(', ')}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Jornada efectiva: {formatMinutes(ciclo.jornadaEfectivaCiclo)} + 50% SS ({formatMinutes(ciclo.ssCiclo)} → {formatMinutes(Math.round(ciclo.ssCiclo * 0.5))}) = {formatMinutes(ciclo.jornadaCiclica)}
                        </div>
                      </div>
                      <div className="text-right min-w-[140px]">
                        <div className="text-sm">
                          Jornada cíclica: <strong>{formatMinutes(ciclo.jornadaCiclica)}</strong>
                        </div>
                        <div className="text-xs text-gray-500">
                          Máximo ({ciclo.dias.length} días × 7h13m): {formatMinutes(ciclo.maximoCiclico)}
                        </div>
                        {ciclo.horasExtraMin > 0 ? (
                          <div className="text-red-600 font-semibold mt-1">
                            +{formatMinutes(ciclo.horasExtraMin)} H. extraordinarias
                          </div>
                        ) : (
                          <div className="text-green-600 text-sm mt-1">Sin exceso</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-blue-700 font-medium">Total horas extraordinarias</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatMinutes(ciclos.reduce((s, c) => s + c.horasExtraMin, 0))}
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-orange-700 font-medium">Fondo de compensación total</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatMinutes(analyzeCompliance.summary.fondoCompensacion)}
                  </div>
                </div>
                <div className={`p-3 rounded-lg text-center ${analyzeCompliance.summary.descansosCompensatorios > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <div className={`text-sm font-medium ${analyzeCompliance.summary.descansosCompensatorios > 0 ? 'text-red-700' : 'text-gray-600'}`}>
                    Descansos compensatorios
                  </div>
                  <div className={`text-2xl font-bold ${analyzeCompliance.summary.descansosCompensatorios > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {analyzeCompliance.summary.descansosCompensatorios}
                  </div>
                </div>
              </div>
            </SeccionColapsable>
          );
        })()}
        </>
      )}

      {/* PESTAÑA: CUMPLIMIENTO DE NORMATIVA */}
      {activeTab === 'compliance' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Resumen ejecutivo */}
          <SeccionColapsable titulo="Resumen de Cumplimiento Normativo" icono="📋">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className={`p-3 sm:p-4 rounded-lg border-l-4 ${analyzeCompliance.violations.length === 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Total Infracciones</h3>
                <p className={`text-2xl sm:text-3xl font-bold ${analyzeCompliance.violations.length === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyzeCompliance.violations.length}
                </p>
              </div>
              <div className={`p-3 sm:p-4 rounded-lg border-l-4 ${analyzeCompliance.warnings.length === 0 ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'}`}>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Advertencias</h3>
                <p className={`text-2xl sm:text-3xl font-bold ${analyzeCompliance.warnings.length === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {analyzeCompliance.warnings.length}
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border-l-4 bg-blue-50 border-blue-500">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Mayor Dedicación</h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {formatMinutes(analyzeCompliance.summary.totalMayorDedicacion)}
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border-l-4 bg-purple-50 border-purple-500">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Merma Descanso</h3>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  {formatMinutes(analyzeCompliance.summary.totalMermaDescanso)}
                </p>
              </div>
            </div>
            
            {/* Indicadores de cumplimiento */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.jornadaEfectivaViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.jornadaEfectivaViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Jornada ef. 9h</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.jornadaEfectivaViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.servicioTrenesViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.servicioTrenesViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Serv. Trenes</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.servicioTrenesViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.totalEmpalmes === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.totalEmpalmes === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Empalmes</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.totalEmpalmes}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.descansoEntreciclasViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.descansoEntreciclasViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Desc. ciclos</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.descansoEntreciclasViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.totalHorasExtraCiclo === 0 ? 'bg-green-100' : 'bg-orange-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.totalHorasExtraCiclo === 0 ? '✅' : '⚠️'}</div>
                <div className="text-[10px] sm:text-xs font-medium">H. extra ciclo</div>
                <div className="text-xs sm:text-sm font-bold">{formatMinutes(analyzeCompliance.summary.totalHorasExtraCiclo)}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${!analyzeCompliance.summary.limiteMensualExceeded ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{!analyzeCompliance.summary.limiteMensualExceeded ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Límite 25h</div>
                <div className="text-xs sm:text-sm font-bold">{formatMinutes(analyzeCompliance.totalExcesoMensual)}</div>
              </div>
            </div>
          </SeccionColapsable>

          {/* Cómputo mensual y fondo de compensación */}
          <SeccionColapsable titulo="Cómputo Mensual de Excesos y Mermas" icono="📊">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mb-1 gap-1">
                  <span>Acumulado: <strong>{formatMinutes(analyzeCompliance.totalExcesoMensual)}</strong></span>
                  <span className="text-gray-500">Límite grafiado: 25h | Pasa a compensación: 30h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5 sm:h-6 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      analyzeCompliance.totalExcesoMensual > 1800
                        ? 'bg-red-500'
                        : analyzeCompliance.totalExcesoMensual > 1500
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((analyzeCompliance.totalExcesoMensual / (35 * 60)) * 100, 100)}%` }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex">
                    <div className="border-r-2 border-yellow-600" style={{ width: `${(25/35)*100}%` }} title="Límite grafiado 25h" />
                    <div className="border-r-2 border-red-600" style={{ width: `${(5/35)*100}%` }} title="Pasa a fondo de compensación 30h" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
                  <span>0h</span>
                  <span className="text-yellow-600">25h (límite)</span>
                  <span className="text-red-600">30h (compensación)</span>
                  <span>35h</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg text-xs sm:text-sm">
                  <p className="font-semibold mb-2 text-gray-700">Desglose del cómputo mensual:</p>
                  <p className="mb-1"><strong>Mayor dedicación:</strong> {formatMinutes(analyzeCompliance.summary.totalMayorDedicacion)}</p>
                  <p className="mb-1"><strong>Merma de descanso:</strong> {formatMinutes(analyzeCompliance.summary.totalMermaDescanso)}</p>
                  <p className="border-t pt-1 mt-1 font-semibold">Total: {formatMinutes(analyzeCompliance.totalExcesoMensual)}</p>
                  <p className="text-gray-500 mt-1 text-[11px]">
                    {analyzeCompliance.totalExcesoMensual <= 1500
                      ? 'No supera las 25h — no genera compensación. El saldo se pierde al cerrar el mes.'
                      : analyzeCompliance.totalExcesoMensual <= 1800
                        ? `Supera las 25h pero no alcanza 30h — exceso de ${formatMinutes(analyzeCompliance.totalExcesoMensual - 1500)} acumulado. Aún no genera compensación.`
                        : `Supera las 30h — ${formatMinutes(analyzeCompliance.totalExcesoMensual - 1800)} pasan al fondo de compensación.`}
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-xs sm:text-sm">
                  <p className="font-semibold mb-2 text-blue-700">Fondo de compensación:</p>
                  <p className="mb-1"><strong>H. extra por ciclos:</strong> {formatMinutes(analyzeCompliance.summary.totalHorasExtraCiclo)}</p>
                  {analyzeCompliance.totalExcesoMensual > 1800 && (
                    <p className="mb-1"><strong>Del cómputo mensual:</strong> {formatMinutes(analyzeCompliance.totalExcesoMensual - 1800)}</p>
                  )}
                  <p className="border-t pt-1 mt-1 font-semibold">Total fondo: {formatMinutes(analyzeCompliance.summary.fondoCompensacion)}</p>
                  <p className={`mt-1 font-bold ${analyzeCompliance.summary.descansosCompensatorios > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
                    {analyzeCompliance.summary.descansosCompensatorios > 0
                      ? `→ ${analyzeCompliance.summary.descansosCompensatorios} descanso(s) compensatorio(s) generado(s)`
                      : 'Sin descansos compensatorios (se necesitan 7h 13min)'}
                  </p>
                  {analyzeCompliance.summary.descansosCompensatorios > 0 && (
                    <p className="text-[11px] text-orange-700 mt-1">Deben disfrutarse en las 14 semanas siguientes al cierre del mes.</p>
                  )}
                </div>
              </div>
            </div>
          </SeccionColapsable>

          {/* Listado de infracciones */}
          {analyzeCompliance.violations.length > 0 && (
            <SeccionColapsable titulo="Infracciones Detectadas" icono="🚨">
              <div className="space-y-2 sm:space-y-3">
                {analyzeCompliance.violations.map((violation, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-lg border-l-4 ${getSeverityColor(violation.severity)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold uppercase">{getSeverityLabel(violation.severity)}</span>
                        <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">{violation.type.replace(/_/g, ' ')}</span>
                      </div>
                      {violation.day && <span className="text-xs text-gray-500">Día {violation.day}</span>}
                    </div>
                    <p className="mt-2 text-sm">{violation.message}</p>
                  </div>
                ))}
              </div>
            </SeccionColapsable>
          )}

          {/* Listado de advertencias */}
          {analyzeCompliance.warnings.length > 0 && (
            <SeccionColapsable titulo="Advertencias" icono="⚠️">
              <div className="space-y-3">
                {analyzeCompliance.warnings.map((warning, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-lg border-l-4 bg-yellow-50 border-yellow-400 text-yellow-800"
                  >
                    <span className="text-xs font-bold uppercase bg-yellow-200 px-2 py-0.5 rounded">
                      {warning.type.replace(/_/g, ' ')}
                    </span>
                    <p className="mt-2 text-sm">{warning.message}</p>
                  </div>
                ))}
              </div>
            </SeccionColapsable>
          )}

          {/* Enlace de jornada */}
          {analyzeCompliance.enlacesDeJornada && analyzeCompliance.enlacesDeJornada.length > 0 && (
            <SeccionColapsable titulo={`Enlace de Jornada — ${analyzeCompliance.enlacesDeJornada.length} detectado(s)`} icono="🔗">
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                Cuando el descanso entre dos turnos consecutivos no alcanza el mínimo para finalizar jornada (<strong>10h en residencia / 6h fuera</strong>), la normativa obliga a tratar ambos turnos como una única jornada ordinaria. Se recalcula la mayor dedicación sobre el total fusionado.
              </p>
              <div className="space-y-3">
                {analyzeCompliance.enlacesDeJornada.map((enlace, idx) => (
                  <div key={idx} className="p-3 bg-red-50 border border-red-300 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <div>
                        <span className="font-semibold text-red-700">Días {enlace.dia1} → {enlace.dia2}</span>
                        <span className="text-xs text-gray-500 ml-2">(Claves {enlace.key1} / {enlace.key2})</span>
                        <div className="text-xs mt-1 text-gray-600">
                          Descanso real: <strong className="text-red-600">{formatMinutes(enlace.descansoMinutos)}</strong> — mínimo para finalizar jornada: {formatMinutes(enlace.umbralEmpalme)} ({enlace.esResidencia ? 'residencia' : 'fuera de residencia'})
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div>Jornada fusionada: <strong>{formatMinutes(enlace.jornadaFusionadaMinutos)}</strong></div>
                        <div className="text-orange-600 font-medium">Mayor dedicación: {formatMinutes(enlace.mayorDedicFusionada)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SeccionColapsable>
          )}

          {/* Descansos sin disfrutar */}
          {analyzeCompliance.summary.descansosSinDisfrutar > 0 && (
            <div className="p-3 bg-orange-50 border border-orange-300 rounded-lg text-sm">
              <span className="font-semibold text-orange-700">⚠️ Descansos ordinarios no disfrutados: {analyzeCompliance.summary.descansosSinDisfrutar}</span>
              <p className="text-xs text-orange-600 mt-1">Cuando por retrasos en la circulación el descanso entre ciclos es inferior al mínimo, se generan descansos alternativos a compensar. Consultar con la empresa para fijar las fechas de disfrute.</p>
            </div>
          )}

          {/* Detalle de jornadas por día */}
          <SeccionColapsable titulo="Detalle de Jornadas y Cumplimiento" icono="📅">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Día</th>
                    <th className="p-2 text-left">Clave</th>
                    <th className="p-2 text-left">Día</th>
                    <th className="p-2 text-left">Trabajo Efectivo</th>
                    <th className="p-2 text-left">Servicio Trenes</th>
                    <th className="p-2 text-left">Turno Total</th>
                    <th className="p-2 text-left">Mayor Dedicación</th>
                    <th className="p-2 text-left">Ubicación</th>
                    <th className="p-2 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {monthAnalysis.map((day, idx) => {
                    const jornadaOk = day.adjustedEffectiveMinutes <= 540;
                    const servicioOk = day.trainServiceMinutes <= 540;
                    const turnoOk = day.totalShiftMinutes <= 660;
                    const allOk = day.type === 'DESCANSO' || (jornadaOk && servicioOk && turnoOk);
                    const hasMayorDedicacion = day.mayorDedicacionMinutes > 0;
                    
                    return (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${!allOk ? 'bg-red-50' : ''}`}>
                        <td className="p-2">{day.day}</td>
                        <td className="p-2 font-medium">{day.key}</td>
                        <td className="p-2">{day.dayName}</td>
                        <td className={`p-2 ${!jornadaOk && day.type !== 'DESCANSO' ? 'text-red-600 font-bold' : ''}`}>
                          {day.type === 'DESCANSO' ? '-' : (
                            <>
                              {formatMinutes(day.adjustedEffectiveMinutes)}
                              {day.rests.length > 1 && (
                                <span className="text-xs text-gray-500 ml-1" title="Incluye esperas por regla de múltiples esperas">
                                  (+{formatMinutes(day.adjustedEffectiveMinutes - day.effectiveMinutes)})
                                </span>
                              )}
                              {!jornadaOk && ' ⚠️'}
                            </>
                          )}
                        </td>
                        <td className={`p-2 ${!servicioOk && day.type !== 'DESCANSO' ? 'text-red-600 font-bold' : ''}`}>
                          {day.type === 'DESCANSO' ? '-' : formatMinutes(day.trainServiceMinutes)}
                          {!servicioOk && day.type !== 'DESCANSO' && ' ⚠️'}
                        </td>
                        <td className={`p-2 ${!turnoOk && day.type !== 'DESCANSO' ? 'text-red-600 font-bold' : ''}`}>
                          {day.type === 'DESCANSO' ? '-' : (
                            <>
                              {formatMinutes(day.totalShiftMinutes)}
                              {day.delayMinutes > 0 && (
                                <span className="text-orange-500 text-xs ml-1" title={`Incluye ${day.delayMinutes}min de retraso`}>
                                  (+{day.delayMinutes}m)
                                </span>
                              )}
                              {!turnoOk && ' 🚨'}
                            </>
                          )}
                        </td>
                        <td className={`p-2 ${hasMayorDedicacion ? 'text-orange-600 font-medium' : ''}`}>
                          {day.type === 'DESCANSO' ? '-' : (
                            hasMayorDedicacion ? formatMinutes(day.mayorDedicacionMinutes) : '-'
                          )}
                        </td>
                        <td className="p-2">
                          {day.type === 'DESCANSO' ? '🏠 Residencia' : (day.endsInHotel ? '🏨 Hotel' : '🏠 Residencia')}
                        </td>
                        <td className="p-2">
                          {day.type === 'DESCANSO' ? (
                            <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">DESCANSO</span>
                          ) : allOk ? (
                            <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">✓ OK</span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">⚠️ INFRACCIÓN</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SeccionColapsable>
          
          {/* Referencia de normativa */}
          <SeccionColapsable titulo="Referencia de Normativa Aplicada — Marco Regulador de Intervención MD" icono="📖">
            <p className="text-xs text-gray-500 mb-4">Fuente: Marco Regulador de Intervención MD (Renfe). Los valores aquí recogidos son los que esta aplicación utiliza en sus cálculos.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Jornada Diaria — Jornada Ordinaria y Efectiva</h4>
                <p><strong>Jornada ordinaria:</strong> tiempo total del turno desde inicio hasta fin.</p>
                <p className="mt-1"><strong>Jornada efectiva:</strong> jornada ordinaria menos el único intervalo no efectivo de mayor duración del turno (esperas o viajes sin servicio).</p>
                <p className="mt-1"><strong>Máximo ordinario:</strong> 9h (amplíable si el turno consiste en un único servicio hasta destino, o un servicio de ida y regreso con ida ≤6h y sin servicios anterior/posterior).</p>
                <p className="mt-1 text-xs text-gray-600">La normativa establece 7h 13min como jornada efectiva máxima individual; el Marco Regulador la gestiona de forma cíclica.</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Mayor Dedicación</h4>
                <p>Horas naturales de jornada ordinaria que exceden de <strong>8h 13min</strong> en un turno.</p>
                <p className="mt-1">Se acumulan diariamente en el <strong>cómputo mensual de excesos y mermas</strong> junto con las mermas de descanso.</p>
                <p className="mt-1 text-xs text-gray-600">En caso de enlace de jornada (empalme), la mayor dedicación se calcula sobre la jornada fusionada total.</p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Intervalos y Servicios</h4>
                <p><strong>Tiempo efectivo:</strong> servicios en trenes (T, toma+deje 15min c/u), servicios en estaciones (reserva, ATTs), e intervalos entre servicios efectivos &lt;90min.</p>
                <p className="mt-1"><strong>Tiempo no efectivo:</strong> viajes sin servicio (SS) y esperas (≥90min entre servicios; 15min previos a SS al inicio del turno; tiempo desde deje hasta primer tren de regreso).</p>
                <p className="mt-1 text-xs text-gray-600">Solo se descuenta el intervalo no efectivo de mayor duración. Máximo 6h de SS por ciclo.</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Descanso Diario Entre Turnos</h4>
                <p><strong>En residencia:</strong></p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
                  <li>Descanso mínimo completo: <strong>14h</strong></li>
                  <li>Mínimo para finalizar jornada: <strong>10h</strong></li>
                  <li>Si ≥10h y &lt;14h → <strong>merma de descanso</strong> (14h − tiempo)</li>
                  <li>Si &lt;10h → <strong>enlace de jornada</strong></li>
                </ul>
                <p className="mt-2"><strong>Fuera de residencia:</strong></p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
                  <li>Descanso mínimo completo: <strong>9h</strong></li>
                  <li>Mínimo para finalizar jornada: <strong>6h</strong></li>
                  <li>Si ≥6h y &lt;9h → <strong>merma de descanso</strong> (9h − tiempo)</li>
                  <li>Si &lt;6h → <strong>enlace de jornada</strong></li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Enlace de Jornada (Empalme)</h4>
                <p>Si el descanso no alcanza el mínimo para finalizar jornada, el tiempo desde el inicio del primer turno hasta el fin del segundo se computa como <strong>una única jornada ordinaria</strong>.</p>
                <p className="mt-1 text-xs text-gray-600">Cálculo: (turno1 + descanso + turno2) − 8h13min = mayor dedicación del empalme. Solo puede producirse por retrasos en la circulación, nunca en gráfico.</p>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-800 mb-2">Descanso Entre Ciclos (ciclo normal 5 días)</h4>
                <p>Tabla normativa según tiempo alcanzado:</p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
                  <li><strong>≥62h:</strong> Descanso completo — OK</li>
                  <li><strong>≥48h y &lt;62h:</strong> Merma de descanso en último turno (62h − tiempo)</li>
                  <li><strong>≥38h y &lt;48h:</strong> 1 descanso ordinario no disfrutado</li>
                  <li><strong>≥24h y &lt;38h:</strong> 1 descanso no disfrutado + merma (38h − tiempo)</li>
                  <li><strong>&lt;24h:</strong> 2 descansos ordinarios no disfrutados</li>
                </ul>
                <p className="mt-1 text-xs text-gray-600">Ciclos reducidos (3 días): mínimo 38h. &lt;38h → merma; &lt;24h → 1 descanso no disfrutado. El mínimo grafiado en ciclos normales es 62h; en reducidos, 38h.</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Jornada Cíclica y Horas Extraordinarias</h4>
                <p><strong>Jornada cíclica</strong> = suma jornada efectiva de todos los turnos del ciclo + <strong>50% de los SS</strong> del ciclo.</p>
                <p className="mt-1"><strong>Máximo cíclico</strong> = nº días trabajo × <strong>7h 13min</strong>.</p>
                <p className="mt-1">El exceso sobre el máximo cíclico son <strong>horas extraordinarias</strong>, que se acumulan al final de cada ciclo en el fondo de compensación.</p>
                <p className="mt-1 text-xs text-gray-600">Los ciclos solo pueden cerrarse cuando el ciclo tiene todos sus días computados. Si el último ciclo del mes incluye días del mes siguiente, se imputa al mes siguiente.</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Cómputo Mensual y Fondo de Compensación</h4>
                <p><strong>Cómputo mensual:</strong> acumula mayor dedicación + mermas de descanso diario. Se cierra al final del último ciclo completo del mes.</p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
                  <li>Si total <strong>≤30h</strong>: se pierde, no genera compensación.</li>
                  <li>Si total <strong>&gt;30h</strong>: el exceso pasa al fondo de compensación.</li>
                  <li>Límite <strong>grafiado: 25h</strong> — no se pueden grafiar ciclos que superen este valor.</li>
                </ul>
                <p className="mt-2"><strong>Fondo de compensación:</strong> acumula horas extraordinarias (exceso jornada cíclica) + exceso del cómputo mensual sobre 30h. Sin caducidad.</p>
                <p className="mt-1 text-xs text-gray-600">Cada <strong>7h 13min</strong> acumuladas en el fondo → 1 descanso compensatorio. A disfrutar en las 14 semanas siguientes al cierre del mes en que se generó.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg col-span-full">
                <h4 className="font-semibold text-gray-700 mb-2">Descansos Compensatorios — Días de Descanso No Disfrutados</h4>
                <p>Cuando no se disfruta un descanso ordinario (por descanso entre ciclos insuficiente), se tiene derecho a un <strong>descanso alternativo</strong>. Los días del ciclo en que se compensan estos descansos computan con una jornada efectiva de <strong>7h 13min</strong> para la tasación de dicho ciclo.</p>
                <p className="mt-1 text-xs text-gray-600">Los descansos compensatorios (generados por el fondo de compensación) también deben disfrutarse en las 14 semanas siguientes al cierre del mes en que se generaron.</p>
              </div>
            </div>
          </SeccionColapsable>
        </div>
      )}

      {/* PESTAÑA: ANÁLISIS GENERAL (contenido original) */}
      {activeTab === 'analysis' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Horas Totales (mes)</h3>
              <p className="text-2xl font-bold text-blue-600">{monthlyStats.totalWorkedHours}h</p>
              <p className="text-xs text-gray-500">{formatMinutes(monthlyStats.totalWorkedMinutes)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Trabajo Efectivo (T/AUX)</h3>
              <p className="text-2xl font-bold text-green-600">{monthlyStats.totalEffectiveHours}h</p>
              <p className="text-xs text-gray-500">{formatMinutes(monthlyStats.totalEffectiveMinutes)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Sin Servicio (SS)</h3>
              <p className="text-2xl font-bold text-purple-600">{monthlyStats.totalSSHours}h</p>
              <p className="text-xs text-gray-500">{formatMinutes(monthlyStats.totalSSMinutes)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Tiempo de Espera</h3>
              <p className="text-2xl font-bold text-orange-600">{monthlyStats.totalRestHours}h</p>
              <p className="text-xs text-gray-500">{formatMinutes(monthlyStats.totalRestMinutes)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Días trabajados / Descanso</h3>
              <p className="text-2xl font-bold text-gray-700">{monthlyStats.workedDays} / {monthlyStats.restDays}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Media por día trabajado</h3>
              <p className="text-2xl font-bold text-blue-600">{monthlyStats.avgHoursPerWorkDay}h</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-600">Noches en hotel</h3>
              <p className="text-2xl font-bold text-orange-600">{monthlyStats.hotelNights}</p>
            </div>
          </div>

          <SeccionColapsable titulo="Horas promedio por clave" icono="📊">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="clave" />
                <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas" fill="#3b82f6" name="Horas promedio" />
              </BarChart>
            </ResponsiveContainer>
          </SeccionColapsable>

          <SeccionColapsable titulo="Análisis de tiempos de espera entre trenes">
            <p className="text-gray-700 mb-2">
              <strong>Tiempo total de espera en el mes:</strong> {formatMinutes(Math.round(monthlyStats.totalRestMinutes))} ({monthlyStats.totalRestHours}h)
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Espera promedio entre trenes:</strong> {formatMinutes(Math.round(monthlyStats.avgRestBetweenTrains))}
            </p>
            
            <div className="mt-4 space-y-3">
              <h3 className="font-medium text-lg">⏱️ Esperas más largas (claves a optimizar):</h3>
              {monthAnalysis
                .flatMap(d => d.rests.map(r => ({...r, day: d.day, key: d.key, dayName: d.dayName})))
                .sort((a, b) => b.minutes - a.minutes)
                .slice(0, 15)
                .map((rest, idx) => (
                  <div key={idx} className="text-sm border-l-4 border-orange-500 pl-3 py-2 bg-orange-50">
                    <div className="font-semibold">
                      Día {rest.day} - Clave {rest.key} ({rest.dayName}): {formatMinutes(rest.minutes)}
                    </div>
                    <div className="text-gray-600 text-xs mt-1">
                      Tren {rest.from} (fin: {rest.fromEnd}) → Tren {rest.to} (inicio: {rest.toStart})
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <h3 className="font-semibold mb-2">💡 Oportunidades de optimización detectadas:</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Esperas superiores a 3 horas podrían reorganizarse</li>
                <li>Considerar agrupar servicios más cercanos en tiempo</li>
                <li>Evaluar si algunos SS se pueden eliminar o sustituir</li>
              </ul>
            </div>
          </SeccionColapsable>

         <SeccionColapsable titulo="Detalle completo del mes">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Día</th>
                    <th className="p-2 text-left">Clave</th>
                    <th className="p-2 text-left">Día semana</th>
                    <th className="p-2 text-left">Tipo</th>
                    <th className="p-2 text-left">Horas totales</th>
                    <th className="p-2 text-left">Trabajo efectivo</th>
                    <th className="p-2 text-left">Sin servicio</th>
                    <th className="p-2 text-left">Tiempo espera</th>
                    <th className="p-2 text-left">Trenes</th>
                    <th className="p-2 text-left">Hotel</th>
                  </tr>
                </thead>
                <tbody>
                  {monthAnalysis.map((day, idx) => {
                    const totalRestTime = day.rests.reduce((sum, r) => sum + r.minutes, 0);
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-2">{day.day}</td>
                        <td className="p-2 font-medium">{day.key}</td>
                        <td className="p-2">{day.dayName}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            day.type === 'DESCANSO' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {day.type}
                          </span>
                        </td>
                        <td className="p-2 font-medium">{formatMinutes(day.workedMinutes)}</td>
                        <td className="p-2 text-green-700">{formatMinutes(day.effectiveMinutes)}</td>
                        <td className="p-2 text-purple-700">{formatMinutes(day.ssMinutes)}</td>
                        <td className="p-2">
                          {totalRestTime > 0 ? (
                            <span className="text-orange-600">{formatMinutes(totalRestTime)}</span>
                          ) : '-'}
                        </td>
                        <td className="p-2">{day.trains.length}</td>
                        <td className="p-2">{day.endsInHotel ? '🏨' : '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SeccionColapsable>

          <SeccionColapsable titulo="Análisis y recomendaciones">
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">📊 Desglose completo de horas:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Horas totales en jornada:</strong> {monthlyStats.totalWorkedHours}h</li>
                  <li><strong>Trabajo efectivo (T/AUX):</strong> {monthlyStats.totalEffectiveHours}h ({((monthlyStats.totalEffectiveMinutes / monthlyStats.totalWorkedMinutes) * 100).toFixed(1)}%)</li>
                  <li><strong>Sin servicio (SS):</strong> {monthlyStats.totalSSHours}h ({((monthlyStats.totalSSMinutes / monthlyStats.totalWorkedMinutes) * 100).toFixed(1)}%)</li>
                  <li><strong>Tiempo de espera entre trenes:</strong> {monthlyStats.totalRestHours}h ({((monthlyStats.totalRestMinutes / monthlyStats.totalWorkedMinutes) * 100).toFixed(1)}%)</li>
                  <li><strong>Espera promedio entre trenes:</strong> {formatMinutes(Math.round(monthlyStats.avgRestBetweenTrains))}</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <h3 className="font-semibold mb-2">📈 Interpretación:</h3>
                <p className="text-sm">De las {monthlyStats.totalWorkedHours}h totales mensuales:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                  <li><strong>{monthlyStats.totalEffectiveHours}h</strong> son trabajo real en trenes (T/AUX)</li>
                  <li><strong>{monthlyStats.totalSSHours}h</strong> son desplazamientos sin servicio (SS)</li>
                  <li><strong>{monthlyStats.totalRestHours}h</strong> son esperas entre servicios</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">⚠️ Claves con más tiempo de espera:</h3>
                <p className="text-sm mb-2">Estas son las claves prioritarias para optimización:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Clave 112:</strong> Esperas largas entre servicios (~3-4h)</li>
                  <li><strong>Clave 101:</strong> Tiempo muerto considerable</li>
                  <li><strong>Clave 103:</strong> SS inicial genera espera antes del trabajo efectivo</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 Recomendaciones de optimización:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Reducir esperas &gt;3h:</strong> Permitir volver a casa o reasignar servicios intermedios</li>
                  <li><strong>Optimizar SS:</strong> Evaluar si algunos desplazamientos pueden eliminarse</li>
                  <li><strong>Agrupar servicios:</strong> Concentrar trenes en ventanas de tiempo más reducidas</li>
                  <li><strong>Potencial ahorro:</strong> Optimizando esperas se podrían reducir ~{(monthlyStats.totalRestMinutes * 0.3 / 60).toFixed(0)}h mensuales</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <h3 className="font-semibold mb-2">🎯 Impacto estimado:</h3>
                <p className="text-sm">Reorganizando las claves con más esperas podría lograrse:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                  <li>Reducción de {((monthlyStats.totalRestMinutes / monthlyStats.totalWorkedMinutes) * 100).toFixed(0)}% → 15-20% del tiempo de espera</li>
                  <li>Menos horas improductivas sin afectar servicios prestados</li>
                  <li>Mejor calidad de vida y descanso</li>
                </ul>
              </div>
            </div>
          </SeccionColapsable>
        </>
      )}
      {showCSVHelp && (
        <CSVHelpModal onClose={() => setShowCSVHelp(false)} />
      )}
      {showUserGuide && (
        <UserGuideModal onClose={() => setShowUserGuide(false)} />
      )}
            {/* Disclaimer legal */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center leading-relaxed">
        <p>
          Esta aplicación se ha creado sin ánimo de lucro para facilitar el cálculo
          de turnos y mermas del personal de intervención. A pesar de haber sido
          probada, sus resultados son solo orientativos y siempre deben ser
          revisados antes de tomar decisiones laborales o administrativas. El
          desarrollador y el sindicato no se responsabilizan de posibles errores o
          discrepancias.
        </p>
      </div>
    </div>
  );
};

export default ScheduleAnalyzer;
