/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/App.tsx", "./components/*.tsx"],
  theme: {
    extend: {
      animation: {
        "spin-wheel": "spin-wheel 1s linear infinite forwards",
      },
      keyframes: {
        "spin-wheel": {
          "0%": {
            transform: "rotate(0deg)",
            borderTopColor: "#f59e0b",
            borderLeftColor: "#f59e0b",
            borderRightColor: "transparent",
            borderBottomColor: "transparent"
          },
          "50%": {
            transform: "rotate(180deg)",
            borderTopColor: "#84cc16",
            borderLeftColor: "#84cc16",
            borderRightColor: "transparent",
            borderBottomColor: "transparent"
          },
          "100%": {
            transform: "rotate(360deg)",
            borderTopColor: "#f59e0b",
            borderLeftColor: "#f59e0b",
            borderRightColor: "transparent",
            borderBottomColor: "transparent"
          },
        },
      },
    },
  },
  plugins: [],
};
