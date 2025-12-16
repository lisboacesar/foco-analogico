/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: '#E0DBCF',       /* Bege Clássico */
          surface: '#D4CFC2',  /* Plástico Envelhecido */
          dark: '#2D2A26',     /* Preto Carvão (Texto) */
          accent: '#FF4A4A',   /* Vermelho LED */
          screen: '#9EAFA2',   /* Verde LCD Gameboy */
        }
      },
      fontFamily: {
        display: ['"VT323"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}