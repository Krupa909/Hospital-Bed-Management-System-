/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        mist: "#eef7ff",
        mint: "#dff6ea",
        lavender: "#efe7ff",
        blush: "#ffe7ef",
        powder: "#dcecff",
        slatePastel: "#8a94ab",
        ink: "#304056",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(150, 169, 202, 0.16)",
      },
      animation: {
        floatIn: "floatIn 0.5s ease-out",
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
      },
    },
  },
  plugins: [],
};
