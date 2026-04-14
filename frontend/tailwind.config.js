/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      colors: {
        surface: "#FDF0D5",
        paper: "#FFF8EA",
        primary: "#780000",
        accent: "#C1121F",
        navy: "#003049",
        sky: "#669BBC",
        line: "#E9D9B8",
        slatePastel: "#5B7185",
        ink: "#003049",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 48, 73, 0.12)",
      },
      animation: {
        floatIn: "floatIn 0.5s ease-out",
        drift: "drift 12s ease-in-out infinite",
      },
      keyframes: {
        floatIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        drift: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "50%": {
            transform: "translate3d(0, -10px, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
