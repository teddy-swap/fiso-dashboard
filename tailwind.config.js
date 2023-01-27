/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'teddy-active': "#46B58D",
        'teddy-reserved': "#66A7F2",
        'teddy-inactive': "rgba(255,255,255,0.62)"
      },
      backgroundImage: {
        'main': "url('/teddy-bg.jpg')"
      }
    },
  },
  plugins: [],
}