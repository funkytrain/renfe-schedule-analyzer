import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DEFAULT_CSV_DATA = `CLAVE,LMXJVSD,N_CIRC,N_VENTA,SERV,IJ,PRES,SAL,DESDE,HASTA,LLEG,DEJ,FJ
101,LMXJV,TAXI,TAXI,SS,,,11:30,PAMPLONA,CASTEJON,12:30,,
101,LMXJV,18048,18048,T,,14:00,14:23,CASTEJON,MIRAFLORES,15:39,,
101,LMXJV,18023,18023,T,,16:20,16:40,MIRAFLORES,PAMPLONA,19:06,19:21,
101,SD,80100,80100,T,,12:00,,INCIDENCIAS,INCIDENCIAS,,20:00,
102,LMXJ,80100,80100,T,,12:30,,INCIDENCIAS,INCIDENCIAS,,20:30,
102,V,18029,18029,AUX,,16:14,16:29,PAMPLONA,CASTEJON,17:31,,
102,V,18650,16070,T,,,18:00,CASTEJON,MIRAFLORES,19:22,,
102,V,18039,18039,T,,,20:00,MIRAFLORES,PAMPLONA,22:09,,
102,SD,80100,80100,T,,12:30,,INCIDENCIAS,INCIDENCIAS,,20:30,
103,DIARIO,626/622,626/622,SS,,,13:08,PAMPLONA,VITORIA,14:00,,
103,DIARIO,33029,18029,T,,15:07,15:22,PAMPLONA,MIRAFLORES,18:52,,
103,DIARIO,18077,18077,T,,,19:23,MIRAFLORES,PAMPLONA,21:49,22:04,
104,LMXJVS,33021,18021,T,,15:10,15:27,PAMPLONA,VITORIA,16:41,16:56,
104,LMXJVS,16011,16011,T,,18:45,19:00,VITORIA,CASTEJON,21:11,,
104,LMXJVS,18078,18078,T,,,21:34,CASTEJON,ZARAGOZA D.,22:42,22:57,HOTEL
104,D,33021,18021,T,,15:10,15:27,PAMPLONA,VITORIA,16:41,16:56,
104,D,16011,16011,T,,18:45,19:00,VITORIA,ZARAGOZA D.,22:10,22:25,HOTEL
105,LMXJVS,18071,18071,T,,5:56,6:11,ZARAGOZA D.,VITORIA,9:52,,
105,LMXJVS,16019,16019,T,,,9:55,VITORIA,PAMPLONA,11:00,11:15,
105,D,622,622,SS,,,11:08,ZARAGOZA D.,PAMPLONA,13:05,,
106,DIARIO,DESCANSO,,,,,,,,,,
107,DIARIO,DESCANSO,,,,,,,,,,
108,DIARIO,DESCANSO,,,,,,,,,,
109,LMXJV,625,625,SS,,,17:25,PAMPLONA,ZARAGOZA D.,19:21,,
109,LMXJV,18079,18079,T,,20:54,21:09,ZARAGOZA D.,CASTEJON,22:15,22:30,HOTEL
109,S,18029,18029,AUX,,16:14,16:29,PAMPLONA,CASTEJON,17:31,,
109,S,18650,16070,T,,,18:00,CASTEJON,MIRAFLORES,19:22,,
109,S,18079,18079,T,,,21:00,MIRAFLORES,CASTEJON,22:15,22:30,HOTEL
109,D,18022,18022,T,,18:31,18:46,PAMPLONA,ZARAGOZA D.,20:50,,
109,D,18079,18079,T,,,21:00,ZARAGOZA D.,CASTEJON,22:15,22:30,HOTEL
110,LMXJV,18068,18068,T,,5:50,6:05,CASTEJON,MIRAFLORES,7:25,,
110,LMXJV,18021,18021,AUX,,,13:00,MIRAFLORES,PAMPLONA,15:27,15:42,
110,SD,18074,18074,T,,8:35,8:50,CASTEJON,MIRAFLORES,10:05,10:20,
110,SD,18021,18021,AUX,,12:45,13:00,MIRAFLORES,PAMPLONA,15:27,15:42,
111,LMXJV,18046,18046,T,,5:50,6:05,PAMPLONA,MIRAFLORES,8:29,8:45,
111,LMXJV,18021,18021,T,,12:45,13:09,MIRAFLORES,PAMPLONA,15:25,15:40,
111,SD,80100,80100,T,,8:30,,INCIDENCIAS,INCIDENCIAS,,16:30,
112,LMXJV,18074,18074,T,,7:28,7:43,PAMPLONA,MIRAFLORES,10:05,10:20,
112,LMXJV,18073,18073,T,,14:15,14:30,MIRAFLORES,CASTEJON,15:50,16:05,
112,LMXJV,530,530,SS,,,17:30,CASTEJON,PAMPLONA,18:41,,
112,SD,18652,16020,T,,9:06,9:21,PAMPLONA,MIRAFLORES,11:43,,
112,SD,18021,18021,T,,,13:00,MIRAFLORES,PAMPLONA,15:27,15:42,
113,DIARIO,80100,80100,T,,12:30,,INCIDENCIAS,INCIDENCIAS,,20:30,
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
  const [csvFileName, setCsvFileName] = useState(null); // Para mostrar nombre del archivo cargado
  const [delayOverrides, setDelayOverrides] = useState({}); // { día: minutosRetraso }

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

// Manejar carga de archivo CSV
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      // Validar que tiene el formato esperado
      const firstLine = content.split('\n')[0];
      if (firstLine.includes('CLAVE') && firstLine.includes('LMXJVSD')) {
        setCsvData(content);
        setCsvFileName(file.name);
        setIncidenciaOverrides({}); // Resetear sustituciones al cargar nuevo CSV
      } else {
        alert('El archivo CSV no tiene el formato esperado. Asegúrate de que contiene las columnas: CLAVE, LMXJVSD, N_CIRC, N_VENTA, SERV, IJ, PRES, SAL, DESDE, HASTA, LLEG, DEJ, FJ');
      }
    };
    reader.readAsText(file);
  };

    const handleResetCSV = () => {
        setCsvData(DEFAULT_CSV_DATA);
        setCsvFileName(null);
        setIncidenciaOverrides({});
    };

  // Obtener claves disponibles para un día de la semana específico (excluyendo DESCANSO e INCIDENCIAS)
  const getAvailableKeysForDay = (dayCode) => {
    const availableKeys = [];
    for (let key = 101; key <= 115; key++) {
      const keyStr = key.toString();
      const keyData = data.filter(row => 
        row.CLAVE === keyStr && 
        matchesDayPattern(row.LMXJVSD, dayCode) &&
        row.N_CIRC !== 'DESCANSO' &&
        row.DESDE !== 'INCIDENCIAS'
      );
      if (keyData.length > 0) {
        availableKeys.push(keyStr);
      }
    }
    return availableKeys;
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

      // Calcular mayor dedicación con el retraso
      const adjustedMayorDedicacionMinutes = Math.max(0, adjustedTotalShiftMinutes - 540);

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
      });
    }
      
      currentKey++;
      if (currentKey > 115) currentKey = 101;
      
      currentDayIndex++;
      if (currentDayIndex >= 7) currentDayIndex = 0;
    }
    
    return results;
  };

  const monthAnalysis = useMemo(() => analyzeMonth(), [startingKey, startingDay, selectedMonth, selectedYear, incidenciaOverrides, delayOverrides]);

  // =============================================
  // ANÁLISIS DE CUMPLIMIENTO DE NORMATIVA
  // =============================================
  
  const analyzeCompliance = useMemo(() => {
    const violations = [];
    const warnings = [];
    const summary = {
      jornadaMaximaViolations: 0,
      servicioTrenesViolations: 0,
      turnoMaximoViolations: 0,
      descansoSemanalViolations: 0,
      descansoDesvinculadoViolations: 0,
      totalMayorDedicacion: 0,
      totalMermaDescanso: 0,
      limiteMensualExceeded: false
    };
    
    // 1. Verificar Jornada Máxima Diaria (9 horas = 540 minutos de trabajo efectivo ajustado)
    // 2. Verificar Servicio en Trenes (máximo 9 horas)
    // 3. Verificar Límite Máximo del Turno (11 horas = 660 minutos)
    // 4. Calcular Mayor Dedicación (exceso sobre 9h naturales del turno)
    
    for (const day of monthAnalysis) {
      if (day.type === 'DESCANSO') continue;
      
      const jornadaMaxima = 540; // 9 horas en minutos
      const turnoMaximo = 660; // 11 horas en minutos
      
      // Mayor dedicación: exceso sobre 9h naturales del turno (ya precalculado)
      if (day.mayorDedicacionMinutes > 0) {
        summary.totalMayorDedicacion += day.mayorDedicacionMinutes;
      }
      
      // Jornada máxima diaria de trabajo efectivo (con regla de esperas aplicada)
      if (day.adjustedEffectiveMinutes > jornadaMaxima) {
        const exceso = day.adjustedEffectiveMinutes - jornadaMaxima;
        summary.jornadaMaximaViolations++;
        violations.push({
          type: 'JORNADA_MAXIMA_EFECTIVA',
          severity: 'alta',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.adjustedEffectiveMinutes,
          limit: jornadaMaxima,
          excess: exceso,
          message: `Día ${day.day} (Clave ${day.key}): Trabajo efectivo de ${formatMinutes(day.adjustedEffectiveMinutes)} supera las 9h máximas. Exceso: ${formatMinutes(exceso)}`
        });
      }
      
      // Servicio en trenes (máximo 9 horas)
      if (day.trainServiceMinutes > jornadaMaxima) {
        const exceso = day.trainServiceMinutes - jornadaMaxima;
        summary.servicioTrenesViolations++;
        violations.push({
          type: 'SERVICIO_TRENES',
          severity: 'alta',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.trainServiceMinutes,
          limit: jornadaMaxima,
          excess: exceso,
          message: `Día ${day.day} (Clave ${day.key}): Servicio en trenes de ${formatMinutes(day.trainServiceMinutes)} supera las 9h máximas. Exceso: ${formatMinutes(exceso)}`
        });
      }
      
      // Límite máximo del turno (11 horas naturales)
      if (day.totalShiftMinutes > turnoMaximo) {
        const exceso = day.totalShiftMinutes - turnoMaximo;
        summary.turnoMaximoViolations++;
        violations.push({
          type: 'TURNO_MAXIMO',
          severity: 'critica',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.totalShiftMinutes,
          limit: turnoMaximo,
          excess: exceso,
          message: `Día ${day.day} (Clave ${day.key}): Turno de ${formatMinutes(day.totalShiftMinutes)} supera las 11h máximas. El interventor debería abandonar el servicio. Exceso: ${formatMinutes(exceso)}`
        });
      }
      
      // Advertencia si se acerca al límite (más de 10h de turno)
      if (day.totalShiftMinutes > 600 && day.totalShiftMinutes <= turnoMaximo) {
        warnings.push({
          type: 'TURNO_CERCANO_LIMITE',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.totalShiftMinutes,
          message: `Día ${day.day} (Clave ${day.key}): Turno de ${formatMinutes(day.totalShiftMinutes)} se acerca al límite de 11h`
        });
      }
      
      // Advertencia de mayor dedicación en el día
      if (day.mayorDedicacionMinutes > 0) {
        warnings.push({
          type: 'MAYOR_DEDICACION',
          day: day.day,
          key: day.key,
          dayName: day.dayName,
          value: day.mayorDedicacionMinutes,
          message: `Día ${day.day} (Clave ${day.key}): Mayor dedicación de ${formatMinutes(day.mayorDedicacionMinutes)} (turno de ${formatMinutes(day.totalShiftMinutes)} supera 9h naturales)`
        });
      }
    }
    
    // 4. Calcular descansos entre jornadas
    const restPeriods = [];
    for (let i = 0; i < monthAnalysis.length - 1; i++) {
      const currentDay = monthAnalysis[i];
      const nextDay = monthAnalysis[i + 1];
      
      if (currentDay.type === 'TRABAJO' && nextDay.type === 'TRABAJO') {
        // Calcular descanso: desde fin de jornada actual hasta inicio de siguiente
        const endTime = currentDay.endTime;
        const startTime = nextDay.startTime;
        
        if (endTime !== null && startTime !== null) {
          // Tiempo hasta medianoche + tiempo desde medianoche al día siguiente
          let restMinutes = (24 * 60 - endTime) + startTime;
          
          restPeriods.push({
            fromDay: currentDay.day,
            toDay: nextDay.day,
            fromKey: currentDay.key,
            toKey: nextDay.key,
            minutes: restMinutes,
            fromInResidence: currentDay.isInResidence,
            toInResidence: nextDay.isInResidence
          });
          
          // Verificar descanso mínimo entre jornadas
          const descansoMinimo = 11 * 60; // 11 horas mínimo entre jornadas
          if (restMinutes < descansoMinimo) {
            const merma = descansoMinimo - restMinutes;
            summary.totalMermaDescanso += merma;
            violations.push({
              type: 'DESCANSO_ENTRE_JORNADAS',
              severity: 'media',
              fromDay: currentDay.day,
              toDay: nextDay.day,
              value: restMinutes,
              limit: descansoMinimo,
              excess: merma,
              message: `Descanso entre día ${currentDay.day} y ${nextDay.day}: ${formatMinutes(restMinutes)} (mínimo recomendado: 11h). Merma: ${formatMinutes(merma)}`
            });
          }
        }
      }
    }
    
    // 5. Analizar descansos semanales (buscar secuencias de descanso)
    let consecutiveRestDays = 0;
    let restStartDay = null;
    let totalRestHours = 0;
    let hoursInResidence = 0;
    let hoursOutResidence = 0;
    let lastWorkDayBeforeRest = null;
    
    for (let i = 0; i < monthAnalysis.length; i++) {
      const day = monthAnalysis[i];
      
      if (day.type === 'DESCANSO') {
        if (consecutiveRestDays === 0) {
          restStartDay = day.day;
          // Buscar el último día de trabajo antes del descanso
          for (let j = i - 1; j >= 0; j--) {
            if (monthAnalysis[j].type === 'TRABAJO') {
              lastWorkDayBeforeRest = monthAnalysis[j];
              break;
            }
          }
        }
        consecutiveRestDays++;
        totalRestHours += 24; // 24 horas por día de descanso
        hoursInResidence += 24; // Asumimos descanso en residencia
      } else {
        if (consecutiveRestDays >= 2) {
          // Calcular tiempo real de descanso
          let actualRestMinutes = consecutiveRestDays * 24 * 60;
          
          // Añadir tiempo desde fin de última jornada hasta medianoche
          if (lastWorkDayBeforeRest && lastWorkDayBeforeRest.endTime) {
            actualRestMinutes += (24 * 60 - lastWorkDayBeforeRest.endTime);
          }
          
          // Añadir tiempo desde medianoche hasta inicio de siguiente jornada
          if (day.startTime) {
            actualRestMinutes += day.startTime;
          }
          
          const descansoSemanalMinimo = 60 * 60; // 60 horas
          
          if (actualRestMinutes < descansoSemanalMinimo) {
            summary.descansoSemanalViolations++;
            const deficit = descansoSemanalMinimo - actualRestMinutes;
            violations.push({
              type: 'DESCANSO_SEMANAL',
              severity: 'alta',
              fromDay: restStartDay,
              toDay: day.day - 1,
              days: consecutiveRestDays,
              value: actualRestMinutes,
              limit: descansoSemanalMinimo,
              deficit: deficit,
              message: `Periodo de descanso (días ${restStartDay}-${day.day - 1}): ${formatMinutes(actualRestMinutes)} no alcanza las 60h mínimas. Déficit: ${formatMinutes(deficit)}`
            });
          }
        }
        
        consecutiveRestDays = 0;
        totalRestHours = 0;
        hoursInResidence = 0;
        hoursOutResidence = 0;
        lastWorkDayBeforeRest = null;
      }
    }
    
    // 6. Verificar descanso desvinculado (38 horas mínimo entre ciclos de trabajo)
    // Buscar transiciones de trabajo a descanso a trabajo
    for (let i = 1; i < monthAnalysis.length - 1; i++) {
      const prevDay = monthAnalysis[i - 1];
      const currentDay = monthAnalysis[i];
      const nextDay = monthAnalysis[i + 1];
      
      // Si encontramos un período de descanso
      if (prevDay.type === 'TRABAJO' && currentDay.type === 'DESCANSO') {
        // Buscar el siguiente día de trabajo
        let nextWorkDayIndex = -1;
        for (let j = i + 1; j < monthAnalysis.length; j++) {
          if (monthAnalysis[j].type === 'TRABAJO') {
            nextWorkDayIndex = j;
            break;
          }
        }
        
        if (nextWorkDayIndex > 0) {
          const nextWorkDay = monthAnalysis[nextWorkDayIndex];
          const restDays = nextWorkDayIndex - i;
          
          // Calcular descanso total
          let totalRestMinutes = restDays * 24 * 60;
          
          // Añadir tiempo desde fin de última jornada
          if (prevDay.endTime) {
            totalRestMinutes += (24 * 60 - prevDay.endTime);
          }
          
          // Añadir tiempo hasta inicio de siguiente jornada
          if (nextWorkDay.startTime) {
            totalRestMinutes += nextWorkDay.startTime;
          }
          
          const descansoDesvinculadoMinimo = 38 * 60; // 38 horas
          
          if (totalRestMinutes < descansoDesvinculadoMinimo) {
            summary.descansoDesvinculadoViolations++;
            violations.push({
              type: 'DESCANSO_DESVINCULADO',
              severity: 'alta',
              fromDay: prevDay.day,
              toDay: nextWorkDay.day,
              value: totalRestMinutes,
              limit: descansoDesvinculadoMinimo,
              message: `Descanso desvinculado entre día ${prevDay.day} y ${nextWorkDay.day}: ${formatMinutes(totalRestMinutes)} no alcanza las 38h mínimas`
            });
          }
          
          // Verificar niveles de descanso según normativa
          const horasDescanso = totalRestMinutes / 60;
          
          if (horasDescanso < 24) {
            warnings.push({
              type: 'DESCANSO_NULO',
              message: `Período ${prevDay.day}-${nextWorkDay.day}: Con menos de 24h de descanso (${formatMinutes(totalRestMinutes)}), no se ha disfrutado ninguno de los dos días de descanso`
            });
          } else if (horasDescanso < 38) {
            warnings.push({
              type: 'DESCANSO_MERMADO',
              message: `Período ${prevDay.day}-${nextWorkDay.day}: Con ${formatMinutes(totalRestMinutes)} de descanso, el primer descanso no se disfrutó y el segundo está mermado`
            });
          } else if (horasDescanso < 48) {
            warnings.push({
              type: 'PRIMER_DESCANSO_NO_DISFRUTADO',
              message: `Período ${prevDay.day}-${nextWorkDay.day}: Con ${formatMinutes(totalRestMinutes)} de descanso, no se disfrutó el primer día de descanso`
            });
          }
        }
      }
    }
    
    // 7. Verificar límite mensual (25 horas de mayor dedicación + merma)
    const totalExcesoMensual = summary.totalMayorDedicacion + summary.totalMermaDescanso;
    const limiteMensual = 25 * 60; // 25 horas
    
    if (totalExcesoMensual > limiteMensual) {
      summary.limiteMensualExceeded = true;
      violations.push({
        type: 'LIMITE_MENSUAL',
        severity: 'critica',
        value: totalExcesoMensual,
        limit: limiteMensual,
        message: `Límite mensual excedido: ${formatMinutes(totalExcesoMensual)} de mayor dedicación + merma (máximo: 25h)`
      });
    }
    
    // 8. Verificar si requiere compensación (más de 30 horas)
    const limiteCompensacion = 30 * 60; // 30 horas
    if (totalExcesoMensual > limiteCompensacion) {
      const horasACompensar = totalExcesoMensual - limiteCompensacion;
      warnings.push({
        type: 'REQUIERE_COMPENSACION',
        value: horasACompensar,
        message: `Se han acumulado ${formatMinutes(totalExcesoMensual)} de exceso. Las ${formatMinutes(horasACompensar)} que superan las 30h deben compensarse con descanso en las próximas 14 semanas`
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
      restPeriods
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
    
    for (let key = 101; key <= 115; key++) {
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
    }
    
    return stats;
  }, [monthAnalysis]);

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
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Análisis de Gráfico de Interventores Renfe - Pamplona</h1>
        {/* Carga de CSV */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2">
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm font-medium transition-colors">
                        📁 Cargar CSV
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleCSVUpload}
                            className="hidden"
                        />
                    </label>
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
              {Array.from({length: 15}, (_, i) => i + 101).map(k => (
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
      {/* Gestión de Incidencias */}
      {(() => {
        const incidenciaDays = monthAnalysis.filter(d => d.wasIncidencia);
        if (incidenciaDays.length === 0) return null;
        
        return (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span>🔄</span> Sustitución de Incidencias
            </h2>
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
          </div>
        );
      })()}
      {/* Gestión de Retrasos */}
        {(() => {
          const workDays = monthAnalysis.filter(d => d.type === 'TRABAJO');
          if (workDays.length === 0) return null;

          const daysWithDelays = workDays.filter(d => d.delayMinutes > 0);

          return (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <span>⏱️</span> Retrasos y Tiempo Extra
              </h2>
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
            </div>
          );
        })()}
      {/* PESTAÑA: CUMPLIMIENTO DE NORMATIVA */}
      {activeTab === 'compliance' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Resumen ejecutivo */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span>📋</span> Resumen de Cumplimiento Normativo
            </h2>
            
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
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.jornadaMaximaViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.jornadaMaximaViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Jornada 9h</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.jornadaMaximaViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.servicioTrenesViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.servicioTrenesViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Serv. Trenes</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.servicioTrenesViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.turnoMaximoViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.turnoMaximoViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Turno 11h</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.turnoMaximoViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.descansoSemanalViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.descansoSemanalViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Desc. 60h</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.descansoSemanalViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${analyzeCompliance.summary.descansoDesvinculadoViolations === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{analyzeCompliance.summary.descansoDesvinculadoViolations === 0 ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Desvinc. 38h</div>
                <div className="text-xs sm:text-sm font-bold">{analyzeCompliance.summary.descansoDesvinculadoViolations}</div>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg text-center ${!analyzeCompliance.summary.limiteMensualExceeded ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-xl sm:text-2xl mb-1">{!analyzeCompliance.summary.limiteMensualExceeded ? '✅' : '❌'}</div>
                <div className="text-[10px] sm:text-xs font-medium">Límite 25h</div>
                <div className="text-xs sm:text-sm font-bold">{formatMinutes(analyzeCompliance.totalExcesoMensual)}</div>
              </div>
            </div>
          </div>
          
          {/* Barra de progreso del límite mensual */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">📊 Límite Mensual de Mayor Dedicación + Merma</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mb-1 gap-1">
                  <span>Acumulado: {formatMinutes(analyzeCompliance.totalExcesoMensual)}</span>
                  <span className="text-gray-500">Límite: 25h | Compensar: 30h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5 sm:h-6 relative overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      analyzeCompliance.totalExcesoMensual / 60 > 30 
                        ? 'bg-red-500' 
                        : analyzeCompliance.totalExcesoMensual / 60 > 25 
                          ? 'bg-orange-500' 
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((analyzeCompliance.totalExcesoMensual / (35 * 60)) * 100, 100)}%` }}
                  />
                  {/* Marcadores */}
                  <div className="absolute top-0 left-0 w-full h-full flex">
                    <div className="border-r-2 border-yellow-600" style={{ width: `${(25/35)*100}%` }} title="Límite 25h" />
                    <div className="border-r-2 border-red-600" style={{ width: `${(5/35)*100}%` }} title="Límite 30h" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
                  <span>0h</span>
                  <span className="text-yellow-600">25h</span>
                  <span className="text-red-600">30h</span>
                  <span>35h</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                <p className="mb-2"><strong>Mayor dedicación:</strong> {formatMinutes(analyzeCompliance.summary.totalMayorDedicacion)} (exceso sobre 9h naturales del turno)</p>
                <p><strong>Merma de descanso:</strong> {formatMinutes(analyzeCompliance.summary.totalMermaDescanso)} (reducción de descansos mínimos)</p>
              </div>
            </div>
          </div>
          
          {/* Listado de infracciones */}
          {analyzeCompliance.violations.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-red-700">🚨 Infracciones Detectadas</h3>
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
            </div>
          )}
          
          {/* Listado de advertencias */}
          {analyzeCompliance.warnings.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-yellow-700">⚠️ Advertencias</h3>
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
            </div>
          )}
          
          {/* Detalle de jornadas por día */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">📅 Detalle de Jornadas y Cumplimiento</h3>
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
          </div>
          
          {/* Referencia de normativa */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">📖 Referencia de Normativa Aplicada</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Jornada Máxima Diaria (Trabajo Efectivo)</h4>
                <p>La duración máxima de la jornada ordinaria de trabajo efectivo es de <strong>9 horas</strong>.</p>
                <p className="text-xs text-gray-600 mt-1">Nota: Si hay más de una espera, todas cuentan como trabajo efectivo excepto la más larga.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Servicio en Trenes</h4>
                <p>La prestación de servicios o atención a trenes será como máximo de <strong>9 horas</strong> por jornada.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Límite Máximo del Turno</h4>
                <p>Si el turno supera las <strong>11 horas naturales</strong> (desde inicio hasta fin, incluyendo esperas), el Interventor debe abandonar el servicio y actuar como Agente de Acompañamiento.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Mayor Dedicación</h4>
                <p>El exceso sobre <strong>9 horas naturales</strong> del turno (desde inicio hasta fin). Las esperas alargan la jornada natural y contribuyen al cálculo.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Descanso Semanal</h4>
                <p>Mínimo <strong>60 horas</strong> de descanso, con 40h + 20h en residencia propia. Ciclo actual: 5 días trabajo, 3 descanso, 5 trabajo, 2 descanso.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Descanso Desvinculado</h4>
                <p>Mínimo <strong>38 horas</strong> entre el fin de una jornada y el inicio del siguiente ciclo de trabajo.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Límite Mensual</h4>
                <p>Máximo <strong>25 horas/mes</strong> de mayor dedicación + merma. Si supera <strong>30 horas</strong>, el exceso se compensa con descanso en las 14 semanas siguientes (máx. 10h acumuladas).</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Merma de Descanso Diario</h4>
                <p>Si no se disfruta la compensación por merma, la jornada finalizará al alcanzar <strong>10 horas</strong> en residencia o <strong>6 horas</strong> fuera de ella.</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg col-span-full">
                <h4 className="font-semibold text-yellow-800 mb-2">Clasificación de Descansos Reducidos</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>&lt; 48h pero &gt; 38h:</strong> No se disfrutó el primer día de descanso</li>
                  <li><strong>&lt; 38h:</strong> Primer descanso no disfrutado, segundo mermado</li>
                  <li><strong>&lt; 24h:</strong> No se disfrutó ninguno de los dos descansos</li>
                </ul>
              </div>
            </div>
          </div>
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

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Horas promedio por clave</h2>
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
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Análisis de tiempos de espera entre trenes</h2>
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
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Detalle completo del mes</h2>
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
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Análisis y recomendaciones</h2>
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
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleAnalyzer;
