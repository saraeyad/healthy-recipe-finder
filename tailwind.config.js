import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        neutral: {
          900: "#163A34",
          600: "#395852",
          300: "#D0DCD9",
          200: "#E0E6E3",
          100: "#F6F5F1",
        },
        orange: {
          500: "#FE9F6B",
        },
        teal: {
          500: "#49AC9B",
        },
        indigo: {
          500: "#697DDB",
        },
      },
      keyframes: {
        move1: {
          "50%": { transform: "translate(-1rem, -1rem)" },
        },
        move2: {
          "50%": { transform: "translate(1rem, 1rem)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        moveY: "move1 3s linear infinite",
        moveY2: "move2 3s linear infinite",
        reveal: "reveal 0.8s ease-out both",
        fadeIn: "fadeIn 0.4s ease-out both",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const presets = {
        ".text-preset-1": {
          fontFamily: theme("fontFamily.nunito"),
          fontWeight: "800",
          letterSpacing: "-2px",
          lineHeight: "110%",
          fontSize: "52px",
          "@screen md": { fontSize: "64px" },
          "@screen lg": { fontSize: "72px" },
        },
        ".text-preset-2": {
          fontFamily: theme("fontFamily.nunito"),
          fontWeight: "800",
          letterSpacing: "-2px",
          lineHeight: "120%",
          fontSize: "40px",
          "@screen md": { fontSize: "48px" },
        },
        ".text-preset-3": {
          fontFamily: theme("fontFamily.nunito"),
          fontWeight: "700",
          letterSpacing: "-1px",
          lineHeight: "130%",
          fontSize: "32px",
        },
        ".text-preset-4": {
          fontFamily: theme("fontFamily.nunito"),
          fontWeight: "700",
          letterSpacing: "-1px",
          lineHeight: "130%",
          fontSize: "24px",
        },
        ".text-preset-5": {
          fontFamily: theme("fontFamily.nunito"),
          fontWeight: "700",
          letterSpacing: "-0.5px",
          lineHeight: "140%",
          fontSize: "20px",
        },
        ".text-preset-6": {
          fontFamily: theme("fontFamily.nunitoSans"),
          fontWeight: "500",
          letterSpacing: "-0.4px",
          lineHeight: "150%",
          fontSize: "20px",
        },
        ".text-preset-7": {
          fontFamily: theme("fontFamily.nunito"),
          fontWeight: "600",
          letterSpacing: "-0.3px",
          lineHeight: "150%",
          fontSize: "18px",
        },
        ".text-preset-8": {
          fontFamily: theme("fontFamily.nunitoSans"),
          fontWeight: "700",
          letterSpacing: "-0.3px",
          lineHeight: "150%",
          fontSize: "16px",
        },
        ".text-preset-9": {
          fontFamily: theme("fontFamily.nunitoSans"),
          fontWeight: "500",
          letterSpacing: "-0.3px",
          lineHeight: "150%",
          fontSize: "16px",
        },
        ".text-preset-10": {
          fontFamily: theme("fontFamily.nunitoSans"),
          fontWeight: "700",
          letterSpacing: "-0.3px",
          lineHeight: "150%",
          fontSize: "14px",
        },
      };

      addComponents(presets);
    }),
  ],
};
