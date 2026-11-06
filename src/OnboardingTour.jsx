import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export const TOUR_KEY = "recorridoVisto";

// Cada paso apunta a un elemento con data-tour="<target>". Sin target = tarjeta centrada.
const PASOS = [
  {
    intro: true,
    titulo: "Analizador de gráfico",
    texto:
      "Calcula jornadas, mermas, excesos y cumplimiento del Marco Regulador a partir de tu gráfico. Un recorrido de 1 minuto por lo esencial.",
  },
  {
    target: "csv",
    tab: "analysis",
    titulo: "1. Carga tu gráfico",
    texto:
      "Sube tu archivo .xlsx o .csv con los turnos. Si no subes nada, se usan unos datos de ejemplo. «Ayuda CSV» explica el formato.",
  },
  {
    target: "config",
    tab: "analysis",
    titulo: "2. Configura el mes",
    texto:
      "Elige la clave y el día de la semana con los que empieza tu gráfico, y el mes y año a analizar. El calendario se genera solo.",
  },
  {
    target: "pestanas",
    tab: "analysis",
    titulo: "3. Dos vistas",
    texto:
      "«Análisis General» muestra horas, esperas y gráficos. «Cumplimiento» revisa el Marco Regulador y marca infracciones.",
  },
  {
    target: "resumen",
    tab: "analysis",
    titulo: "Resumen del mes",
    texto:
      "Horas totales, tiempo de espera y otras cifras clave del mes. Más abajo hay gráficos y el detalle día a día.",
  },
  {
    target: "cumplimiento",
    tab: "compliance",
    titulo: "4. Cumplimiento",
    texto:
      "Aquí ves de un vistazo si hay infracciones o advertencias. Despliega cada sección para ver el detalle de mermas, excesos y descansos.",
  },
  {
    target: "herramientas",
    tab: "analysis",
    titulo: "5. Herramientas",
    texto:
      "Exporta a Excel o PDF, consulta el Marco Regulador completo con buscador, cambia a modo oscuro o repite este recorrido cuando quieras.",
  },
];

const MARGEN = 12;

export default function OnboardingTour({ onClose, setActiveTab }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);
  const paso = PASOS[i];

  const terminar = useCallback(() => {
    try { localStorage.setItem(TOUR_KEY, "1"); } catch { /* ignore */ }
    setActiveTab("analysis");
    onClose();
  }, [onClose, setActiveTab]);

  const medir = useCallback(() => {
    if (!paso.target) return setRect(null);
    const el = document.querySelector(`[data-tour="${paso.target}"]`);
    if (!el) return setRect(null);
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [paso]);

  // Cambia de pestaña, desplaza hasta el elemento y mide.
  useEffect(() => {
    if (paso.tab) setActiveTab(paso.tab);
    let t2;
    const t1 = setTimeout(() => {
      const el = paso.target && document.querySelector(`[data-tour="${paso.target}"]`);
      if (el) {
        const r = el.getBoundingClientRect();
        el.scrollIntoView({
          block: r.height > window.innerHeight * 0.5 ? "start" : "center",
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      t2 = setTimeout(medir, 450);
    }, 60);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener("resize", medir);
    window.addEventListener("scroll", medir, true);
    return () => {
      window.removeEventListener("resize", medir);
      window.removeEventListener("scroll", medir, true);
    };
  }, [medir]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") terminar();
      if (e.key === "ArrowRight") setI((n) => Math.min(n + 1, PASOS.length - 1));
      if (e.key === "ArrowLeft") setI((n) => Math.max(n - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terminar]);

  // Coloca la tarjeta junto al elemento resaltado.
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const cw = card.offsetWidth, ch = card.offsetHeight;
    if (!rect) {
      setPos({ top: Math.max(MARGEN, (vh - ch) / 2), left: Math.max(MARGEN, (vw - cw) / 2) });
      return;
    }
    const left = Math.min(Math.max(MARGEN, rect.left + rect.width / 2 - cw / 2), vw - cw - MARGEN);
    const debajo = rect.top + rect.height + MARGEN;
    const encima = rect.top - ch - MARGEN;
    let top;
    if (debajo + ch <= vh - MARGEN) top = debajo;
    else if (encima >= MARGEN) top = encima;
    else top = vh - ch - MARGEN; // elemento muy alto: tarjeta fija abajo
    setPos({ top, left });
  }, [rect, i]);

  const ultimo = i === PASOS.length - 1;
  const numPasos = PASOS.length - 1;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-label="Recorrido guiado">
      {/* Capa que bloquea clics; el hueco resalta el elemento */}
      <div className="absolute inset-0" onClick={terminar} />
      {rect ? (
        <div
          className="absolute rounded-xl pointer-events-none transition-all duration-300"
          style={{
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
      )}

      <div
        ref={cardRef}
        className="tour-card absolute bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-5 transition-all duration-300"
        style={{ top: pos.top, left: pos.left, width: "min(440px, calc(100vw - 24px))" }}
      >
        <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">
          <span>{paso.intro ? "Recorrido" : `${i} de ${numPasos}`}</span>
          <button onClick={terminar} className="hover:text-gray-800 dark:hover:text-gray-100">
            {paso.intro ? "Ahora no" : "Saltar"}
          </button>
        </div>
        <h3 className="text-lg font-bold text-purple-900 dark:text-purple-200 mb-1">{paso.titulo}</h3>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{paso.texto}</p>

        <div className="flex items-center justify-between mt-4 gap-2">
          {i > 0 ? (
            <button
              onClick={() => setI(i - 1)}
              className="px-4 py-2 rounded-full border border-gray-300 text-purple-900 dark:text-purple-200 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Atrás
            </button>
          ) : <span />}
          <button
            onClick={() => (ultimo ? terminar() : setI(i + 1))}
            className="px-5 py-2 rounded-full bg-purple-900 hover:bg-purple-800 text-white text-sm font-semibold shadow"
          >
            {paso.intro ? "Empezar · 1 min" : ultimo ? "Terminar" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
