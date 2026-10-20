import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#1F3D2E", deep: "#122A1E", soft: "#2F5742", mist: "#DDE7DF" },
        cream: "#F8F5EE",
        sand: { DEFAULT: "#E8DCC4", light: "#F1E9D8", dark: "#CDBB95" },
        gold: { DEFAULT: "#B08D4F", dark: "#7C5F27" },
        ink: { DEFAULT: "#1B2420", soft: "#4A564F" },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,42,30,.06), 0 8px 24px -12px rgba(18,42,30,.18)",
        lift: "0 2px 4px rgba(18,42,30,.08), 0 24px 48px -20px rgba(18,42,30,.35)",
      },
    },
  },
  plugins: [],
};
export default config;
