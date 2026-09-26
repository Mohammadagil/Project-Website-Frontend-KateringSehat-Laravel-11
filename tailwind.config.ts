import type { Config } from "tailwindcss";

// Warna desain lama. Masih dipakai halaman di src/app/(legacy),
// hapus setelah semua halaman pindah ke desain baru.
const legacyColors = {
  color1: "#F97316",
  color2: "#4722F5",
  color3: "#0EA52F",
  color4: "#08041A",
  color5: "#FFBF32",

  gray1: "#D1D0D5",
  gray2: "#6C6D6F",
  gray3: "#F4F5F7",
  gray4: "#B9BBBE",
};

// Warna desain baru. Nilainya ada di CSS variable (src/assets/css/index.css)
// supaya otomatis berganti saat mode gelap aktif.
const token = (name: string) => `rgb(var(--ks-${name}) / <alpha-value>)`;

const colors = {
  surface: { DEFAULT: token("surface"), soft: token("surface-soft") },
  card: token("card"),
  ink: { DEFAULT: token("ink"), soft: token("ink-soft"), faint: token("ink-faint") },
  accent: { DEFAULT: token("accent"), deep: token("accent-deep"), tint: token("accent-tint") },
  primary: { DEFAULT: token("primary"), on: token("on-primary") },
  line: token("line"),
  good: { DEFAULT: token("good"), tint: token("good-tint") },
  warn: { DEFAULT: token("warn"), tint: token("warn-tint") },
  bad: { DEFAULT: token("bad"), tint: token("bad-tint") },
  leaf: { DEFAULT: token("leaf"), light: token("leaf-light") },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        ...legacyColors,
        ...colors,
      },

      fill: {
        ...legacyColors,
      },

      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;
