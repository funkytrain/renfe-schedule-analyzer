# 🚂 Analizador de Gráfico de Interventores Renfe

Aplicación web para analizar horarios y verificar el cumplimiento normativo de los interventores de Renfe.

## ✨ Características

- **Análisis General**: Visualización de horas trabajadas, tiempo efectivo, esperas y descansos
- **Cumplimiento Normativo**: Verificación automática de:
  - Jornada máxima diaria (9h de trabajo efectivo)
  - Servicio en trenes (máximo 9h)
  - Límite máximo de turno (11h naturales)
  - Descanso semanal (60h mínimo)
  - Descanso desvinculado (38h mínimo)
  - Límite mensual de mayor dedicación + merma (25h)

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube este proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Haz clic en "Add New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Vite
6. Haz clic en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio del proyecto
vercel
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📱 Responsividad

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1024px+)

## 📋 Normativa Implementada

| Concepto | Límite |
|----------|--------|
| Jornada máxima diaria | 9 horas de trabajo efectivo |
| Servicio en trenes | 9 horas máximo |
| Turno total | 11 horas naturales |
| Descanso semanal | 60 horas mínimo |
| Descanso desvinculado | 38 horas mínimo |
| Mayor dedicación + merma | 25h/mes (compensar >30h) |

## 🔧 Tecnologías

- React 18
- Vite 5
- Tailwind CSS 3
- Recharts (gráficos)

## 📄 Licencia

Uso interno - Renfe Interventores
