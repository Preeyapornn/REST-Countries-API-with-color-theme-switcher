/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primarybackground: "hsl(0, 0%, 98%)",
        primaryInput: "hsl(0, 0%, 52%)",
        primaryText: "hsl(200, 15%, 8%)",

        secondarybackground: "hsl(207, 26%, 17%)",
        secondaryElement: "hsl(209, 23%, 22%)",

        white: "hsl(0, 0%, 100%)",
      },
      screens: {
        sm: { min: "375px", max: "640px" },
        lg: { min: "1024px", max: "1440px" },
      },
    },
  },
  plugins: [],
};
