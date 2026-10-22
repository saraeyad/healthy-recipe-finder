import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        inter: ["Inter", "Segoe UI", "sans-serif"],
        nunito: ["Inter", "Segoe UI", "sans-serif"],
        nunitoSans: ["Inter", "Segoe UI", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#028090",
          hover: "#026e7c",
        },
        accent: {
          DEFAULT: "#02c39a",
          hover: "#02aa86",
          active: "#019475",
        },
        canvas: "#f5faf9",
        card: "#ffffff",
        line: "#e1ecec",
        divider: "#f0f5f4",
        ink: {
          DEFAULT: "#0b2e30",
          muted: "#5c7a7c",
        },
        "mkt-teal": "#006572",
        "mkt-sky": "#b9f7ff",
        "mkt-body": "#3d4949",
        "mkt-jade": "#006b54",
        "mkt-amber": "#a36700",
        "mkt-mint": "#14b8a6",
        "mkt-mint-bg": "#f0fdfa",
        "mkt-mint-border": "#99f6e4",
        "mkt-emerald": "#0d9488",
        "mkt-emerald-deep": "#0f766e",
        "mkt-dark": "#0e3136",
        "mkt-dark-muted": "#a0c5c7",
        "mkt-night": "#071d20",
        "mkt-glow": "#5eead4",
        "mkt-nav": "#3e494b",
        "status-on": "#02c39a",
        "status-on-bg": "#e0f8f2",
        "status-attention": "#b9770e",
        "status-attention-bg": "#fbf1e0",
        neutral: {
          900: "#0b2e30",
          800: "#0e3136",
          600: "#5c7a7c",
          300: "#e1ecec",
          200: "#f0f5f4",
          100: "#f5faf9",
        },
        orange: {
          500: "#02c39a",
        },
        teal: {
          500: "#028090",
        },
      },
      boxShadow: {
        card: "0 1px 2px #0b2e300a, 0 8px 24px -8px #0b2e301a",
        "card-hover": "0 2px 4px #0b2e300d, 0 16px 32px -12px #0b2e3029",
        float: "0 4px 8px #0b2e300f, 0 24px 48px -16px #0b2e3038",
        panel: "0 1px 2px #0b2e3008, 0 12px 32px -14px #00657224",
        brand: "0 10px 24px -10px #0065728c",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out both",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const presets = {
        ".text-preset-1": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "800",
          letterSpacing: "-0.02em",
          lineHeight: "1.12",
          fontSize: "2.25rem",
          "@screen sm": { fontSize: "3rem" },
          "@screen lg": { fontSize: "3.625rem" },
        },
        ".text-preset-2": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "800",
          letterSpacing: "-0.02em",
          lineHeight: "1.15",
          fontSize: "1.875rem",
          "@screen sm": { fontSize: "2.25rem" },
          "@screen lg": { fontSize: "2.75rem" },
        },
        ".text-preset-3": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "700",
          letterSpacing: "-0.02em",
          lineHeight: "1.25",
          fontSize: "1.5rem",
        },
        ".text-preset-4": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "700",
          letterSpacing: "-0.015em",
          lineHeight: "1.3",
          fontSize: "1.25rem",
        },
        ".text-preset-5": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "700",
          letterSpacing: "-0.01em",
          lineHeight: "1.4",
          fontSize: "1.125rem",
        },
        ".text-preset-6": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "500",
          letterSpacing: "-0.01em",
          lineHeight: "1.7",
          fontSize: "1.0625rem",
        },
        ".text-preset-7": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "600",
          letterSpacing: "-0.01em",
          lineHeight: "1.5",
          fontSize: "0.9375rem",
        },
        ".text-preset-8": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "700",
          letterSpacing: "-0.01em",
          lineHeight: "1.5",
          fontSize: "0.875rem",
        },
        ".text-preset-9": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "500",
          letterSpacing: "-0.01em",
          lineHeight: "1.5",
          fontSize: "0.875rem",
        },
        ".text-preset-10": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "700",
          letterSpacing: "-0.01em",
          lineHeight: "1.5",
          fontSize: "0.75rem",
        },
      };

      addComponents(presets);
    }),
  ],
};
