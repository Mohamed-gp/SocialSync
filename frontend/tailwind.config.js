/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: { center: true, padding: "2rem" },
      colors: {
        mainColor: "#00c2ff",
        darkThemeBG: "#242526",
        darkThemeBGLight: "#18191A",
        redColor: "#ff0000",
        // mainColor: "#00b207",
        // mainColor: "#8A33FD",
        bgColorWhite: "#ECEBEC",
        bgColorBlack: "#201F20",
        bgColorCartFooter: "#F6F6F6",

        // #8A33FD
        // #00acff
      },
    },
  },
  plugins: [],
};
