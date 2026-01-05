# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web application for analyzing Renfe train conductor schedules and verifying regulatory compliance. The app parses CSV files containing shift data and validates compliance with Spanish railway labor regulations.

**Tech Stack**: React 18 + Vite 5 + Tailwind CSS 3 + Recharts

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Component Structure

The application follows a **single-file architecture** with minimal component separation:

- **[src/App.jsx](src/App.jsx)** (2000+ lines): Main application component containing all business logic, state management, and UI
- **[src/SeccionColapsable.jsx](src/SeccionColapsable.jsx)**: Reusable collapsible section component
- **[src/CSVHelpModal.jsx](src/CSVHelpModal.jsx)**: Modal displaying CSV format documentation
- **[src/main.jsx](src/main.jsx)**: React entry point

### Core Data Flow

1. **CSV Parsing** ([src/App.jsx:67-78](src/App.jsx#L67-L78)): `parseData()` converts CSV text into structured objects
2. **Schedule Generation** ([src/App.jsx:366-464](src/App.jsx#L366-L464)): `analyzeMonth()` generates monthly schedule by:
   - Rotating through shift keys (101-115)
   - Matching days using LMXJVSD patterns (L=Monday, M=Tuesday, X=Wednesday, J=Thursday, V=Friday, S=Saturday, D=Sunday)
   - Handling special patterns: "DIARIO" (daily), "LMXJV" (weekdays), "SD" (weekends)
3. **Compliance Analysis** ([src/App.jsx:600-1000](src/App.jsx#L600-L1000)): `analyzeCompliance` validates against regulations
4. **Visualization**: Recharts displays metrics and violations

### Key State Management

The app uses React useState for:
- `csvData`: CSV file content (defaults to embedded sample data)
- `startingKey`: Initial shift number (101-115)
- `startingDay`: Week starting day (L/M/X/J/V/S/D)
- `selectedMonth/Year`: Analysis period
- `incidenciaOverrides`: Manual shift substitutions for incident days
- `delayOverrides`: Additional delay minutes per day

### Critical Business Logic

**Time Calculations** ([src/App.jsx:152-364](src/App.jsx#L152-L364)):
- `parseTime()`: Converts "HH:MM" → minutes since midnight
- `calculateEffectiveWorkTime()`: Computes work time (T/AUX services) vs travel time (SS services)
- `calculateAdjustedEffectiveTime()`: Applies "waiting time rule" (waits >60min count as 30min work)
- `calculateTotalShiftDuration()`: Total shift duration from first service to last
- `calculateTrainServiceTime()`: Time spent on trains (excludes SS/TAXI)

**Regulatory Limits** ([src/App.jsx:626-634](src/App.jsx#L626-L634)):
- Daily max effective work: 9h (540min)
- Daily max train service: 9h (540min)
- Max shift duration: 11h natural (660min) - **CRITICAL VIOLATION**
- Weekly rest minimum: 60h (3600min)
- Disconnected rest minimum: 38h (2280min)
- Monthly overtime limit: 25h (1500min) for "mayor dedicación" + "merma"

**CSV Structure** (documented in [src/CSVHelpModal.jsx](src/CSVHelpModal.jsx)):
- **CLAVE**: Shift number (101-115)
- **LMXJVSD**: Days of circulation pattern
- **PRES/SAL**: Service start time
- **LLEG/DEJ**: Service end time
- **SERV**: Service type (T=train, SS=deadhead, AUX=auxiliary, TAXI=taxi)
- **FJ**: HOTEL flag for overnight stays
- **DESDE/HASTA**: Origin/destination stations
- **N_CIRC**: Train number (or "DESCANSO" for rest days, "INCIDENCIAS" for incident shifts)

### Special Handling

**INCIDENCIAS** ([src/App.jsx:380-389](src/App.jsx#L380-L389)):
- Rows with `DESDE === 'INCIDENCIAS'` represent incident shifts (8h fixed duration)
- Can be overridden to use different shift keys via `incidenciaOverrides` state

**Hotel Logic** ([src/App.jsx:417](src/App.jsx#L417)):
- `FJ === 'HOTEL'` marks overnight stays away from residence
- Affects rest period compliance calculations

**Day Rotation** ([src/App.jsx:366-378](src/App.jsx#L366-L378)):
- Algorithm cycles through shift keys day-by-day
- Automatically increments key when moving to next day
- Wraps from 115 back to 101

## Code Modification Guidelines

### When modifying compliance logic:
- All regulatory constants are defined in `analyzeCompliance` ([src/App.jsx:626-634](src/App.jsx#L626-L634))
- Violations are categorized by severity: 'critica', 'alta', 'media', 'baja'
- Always test with the default CSV data (embedded in [src/App.jsx:6-51](src/App.jsx#L6-L51))

### When adding features:
- This is a single-user, client-side app with no backend
- All state is transient (resets on page reload)
- CSV processing must handle malformed data gracefully
- The UI is responsive (mobile-first with Tailwind)

### When debugging time calculations:
- All times are stored as minutes since midnight
- Overnight shifts (end < start) add 24*60 to duration
- The "adjusted effective time" includes the waiting time rule - don't confuse with raw effective time

## Deployment

**Vercel** (configured for Vite):
```bash
npm i -g vercel
vercel
```

Or import GitHub repo directly in Vercel dashboard (auto-detects Vite configuration).

## Spanish Labor Regulations Context

This app enforces collective bargaining agreement rules for Spanish railway conductors. Key concepts:

- **Mayor dedicación**: Overtime when natural shift exceeds 8h 13min (493min)
- **Merma de descanso**: Rest period reduction penalties
- **Empalme**: Consecutive shift with insufficient rest
- **Pernocta**: Overnight stay (affects rest calculations)
- **Jornada efectiva**: Effective work time (excludes travel between stations)

Do not modify regulatory thresholds without consulting the source labor agreement documentation.
