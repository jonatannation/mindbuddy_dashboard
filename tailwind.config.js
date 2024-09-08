/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js}',
    './*.html',  // For å fange opp HTML-filer i rotmappen
    './js/**/*.js'  // For JavaScript-filer i en eventuell js-mappe
  ],
  theme: {
    extend: {
      colors: {
        'mindbuddy-navy': '#0A2342',
        'mindbuddy-lightblue': '#68B2FC',
        'mindbuddy-lightgray': '#F5F7F9',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
