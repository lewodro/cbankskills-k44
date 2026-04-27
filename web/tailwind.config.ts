import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "serif"],
      },
      colors: {
        primary:        "#2E8B57",
        "primary-dark": "#1f6b40",
        "primary-light":"#EBF3EE",
        surface:        "#FFFFFF",
        "surface-alt":  "#F5F9F7",
        border:         "rgba(0,0,0,0.11)",
        text:           "#0D1F14",
        "text-muted":   "#527A62",
        "text-subtle":  "#B8D4C2",
        success:        "#16a34a",
        danger:         "#dc2626",
      },
    },
  },
  plugins: [],
};
export default config;
