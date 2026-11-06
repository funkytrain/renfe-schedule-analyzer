import React, { useEffect, useMemo, useState } from "react";
import {
  MARCO_SECCIONES,
  MARCO_CHIPS,
  MARCO_TITULO,
  MARCO_SUBTITULO,
  MARCO_PDF_URL,
} from "./marcoReguladorData";

// Normaliza para buscar sin tildes ni mayúsculas (conserva la longitud del texto).
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[áàä]/g, "a")
    .replace(/[éèë]/g, "e")
    .replace(/[íìï]/g, "i")
    .replace(/[óòö]/g, "o")
    .replace(/[úùü]/g, "u");

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Resaltado({ texto, consulta }) {
  if (!consulta) return texto;
  const re = new RegExp(escapeRe(norm(consulta)), "g");
  const n = norm(texto);
  const partes = [];
  let ultimo = 0;
  let m;
  while ((m = re.exec(n)) !== null) {
    if (m[0].length === 0) break;
    partes.push(texto.slice(ultimo, m.index));
    partes.push(
      <mark
        key={m.index}
        className="bg-yellow-200 text-gray-900 dark:bg-yellow-500/40 dark:text-yellow-100 rounded px-0.5"
      >
        {texto.slice(m.index, m.index + m[0].length)}
      </mark>
    );
    ultimo = m.index + m[0].length;
  }
  partes.push(texto.slice(ultimo));
  return partes;
}

export default function MarcoReguladorModal({ onClose }) {
  const [consulta, setConsulta] = useState("");
  const [abiertas, setAbiertas] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const q = consulta.trim();
  const buscando = q.length >= 2;

  // Filtra artículos que contienen la consulta.
  const { secciones, total } = useMemo(() => {
    if (!buscando) return { secciones: MARCO_SECCIONES, total: 0 };
    const nq = norm(q);
    let total = 0;
    const secciones = MARCO_SECCIONES.map((s) => {
      const bloques = s.bloques
        .map((b) => ({
          ...b,
          items: b.items.filter((it) => {
            const hay = norm(
              `${it.n} ${it.t} ${(it.tabla || []).flat().join(" ")}`
            );
            return hay.includes(nq);
          }),
        }))
        .filter((b) => b.items.length > 0);
      total += bloques.reduce((a, b) => a + b.items.length, 0);
      return { ...s, bloques };
    }).filter((s) => s.bloques.length > 0);
    return { secciones, total };
  }, [q, buscando]);

  const toggle = (id) => setAbiertas((a) => ({ ...a, [id]: !a[id] }));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-xl max-w-3xl w-full h-[92vh] sm:h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Marco Regulador"
      >
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600 sm:hidden" />

        {/* Cabecera */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Marco Regulador
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 text-xl font-bold leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            <strong>{MARCO_TITULO}.</strong> {MARCO_SUBTITULO}
          </p>

          <a
            href={MARCO_PDF_URL}
            download="Marco Regulador Intervencion Regionales.pdf"
            className="inline-flex items-center gap-2 mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow"
          >
            <span>⬇️</span> Descargar PDF
          </a>

          {/* Buscador */}
          <div className="relative mt-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Buscar en el texto"
              className="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Atajos */}
          <div className="flex flex-wrap gap-2 mt-3">
            {MARCO_CHIPS.map((c) => {
              const activo = norm(consulta) === norm(c.q);
              return (
                <button
                  key={c.label}
                  onClick={() => setConsulta(activo ? "" : c.q)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activo
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          {buscando && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {total} {total === 1 ? "resultado" : "resultados"}
            </p>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {buscando && total === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              Sin resultados para «{q}».
            </p>
          )}

          {secciones.map((s) => {
            const abierta = buscando || !!abiertas[s.id];
            return (
              <section
                key={s.id}
                className="mb-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggle(s.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                  aria-expanded={abierta}
                >
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    {s.num && <span className="mr-2">{s.num}.</span>}
                    {s.titulo}
                  </span>
                  <span
                    className={`text-gray-400 transition-transform ${abierta ? "rotate-90" : ""}`}
                  >
                    ›
                  </span>
                </button>

                {abierta && (
                  <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                    {s.bloques.map((b, bi) => (
                      <div key={bi} className="mt-3">
                        {b.sub && (
                          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                            {b.sub}
                          </h3>
                        )}
                        <ul className="space-y-3">
                          {b.items.map((it, ii) => (
                            <li key={ii} className="flex gap-3 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                              {it.n && (
                                <span className="font-bold text-gray-900 dark:text-gray-50 shrink-0 w-9">
                                  {it.n}
                                </span>
                              )}
                              <div className="min-w-0">
                                <p>
                                  <Resaltado texto={it.t} consulta={buscando ? q : ""} />
                                </p>
                                {it.tabla && (
                                  <table className="mt-2 w-full text-sm border border-gray-200 dark:border-gray-700">
                                    <tbody>
                                      {it.tabla.map((r, ri) => (
                                        <tr key={ri} className="border-t border-gray-200 dark:border-gray-700 first:border-t-0">
                                          <td className="px-2 py-1">
                                            <Resaltado texto={r[0]} consulta={buscando ? q : ""} />
                                          </td>
                                          <td className="px-2 py-1 text-right font-medium whitespace-nowrap">
                                            <Resaltado texto={r[1]} consulta={buscando ? q : ""} />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
