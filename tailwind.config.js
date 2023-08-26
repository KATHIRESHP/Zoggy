
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titilium: ["Titillium Web", "sans-serif"],
        comforta: ["Comfortaa", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        Tektur: ["Tektur", "cursive"]
      }
    },
  },
  plugins: [],
}

