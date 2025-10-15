// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Important: make sure this path covers your App.jsx/App.tsx
  ],
  theme: {
    extend: {
      fontFamily:{
        campusfont: ['Campusfont', 'sans'],
        azonix: ['Azonix', 'sans'],
        montsterat:['Montsterat', 'sans']
      },
    },
  },
  plugins: [],
}