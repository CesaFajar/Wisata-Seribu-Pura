/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#40533A",
        cream: "#F8F5EE",
        sand: "#EDE6D8",
        ink: "#24251F"
      },
      boxShadow: {
        soft: "0 12px 35px rgba(45, 48, 37, .08)"
      }
    },
  },
  plugins: [],
};
