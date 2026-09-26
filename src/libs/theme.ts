export type TTheme = "light" | "dark";

export const THEME_COOKIE = "ks_theme";

// Dijalankan di <head> sebelum halaman tampil, supaya tidak berkedip terang-gelap.
// Tanpa cookie, tema mengikuti pengaturan sistem perangkat.
export const themeInitScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(light|dark)/);var d=m?m[1]==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export function getCurrentTheme(): TTheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: TTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
}
