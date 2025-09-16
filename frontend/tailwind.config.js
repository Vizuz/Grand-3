/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {fontFamily: {
        // указали свой Inter вместо дефолтного ui-serif
        serif: ['Lato', 'system-ui', 'sans-serif'],
        // а для надёжности и sans тоже явно
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },},
  },
  plugins: [],
};