import { useState } from "react";

export default function SeccionColapsable({ titulo, icono, children }) {
  const [abierta, setAbierta] = useState(true);

  return (
    <div className="mb-6">
      <h2
        onClick={() => setAbierta(!abierta)}
        className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 cursor-pointer select-none"
      >
        <span>{abierta ? "🔽" : "▶️"}</span>
        {icono && <span>{icono}</span>}
        {titulo}
      </h2>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          abierta ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
