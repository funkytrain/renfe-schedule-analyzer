import { useEffect, useState } from "react";

const KEY = "tema";

function inicial() {
  try {
    const g = localStorage.getItem(KEY);
    if (g === "dark" || g === "light") return g === "dark";
  } catch { /* sin acceso a localStorage */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export default function useDarkMode() {
  const [dark, setDark] = useState(inicial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}
