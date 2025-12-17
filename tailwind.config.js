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
          bg: '#EBE5CE',       // Bege suave (Fundo da página - Conforto)
          case: '#C0C0C0',     // Cinza clássico "Windows 95" / Gameboy
          screen: '#0F1510',   // Preto esverdeado (Tela desligada)
          screenOn: '#002200', // Verde escuro (Fundo do terminal ligado)
          terminal: '#33FF00', // Verde fósforo (Texto brilhante)
          accent: '#FF7F27',   // Laranja (Botões de ação)
          primary: '#3F48CC',  // Azul (Botões secundários)
          dark: '#1A1A1A',     // Preto quase absoluto (Bordas e textos)
        }
      },
      fontFamily: {
        // Fonte para títulos grandes e impactantes
        display: ['"Press Start 2P"', 'cursive'], 
        // Fonte para o chat e textos (estilo terminal)
        mono: ['"VT323"', 'monospace'],
      },
      boxShadow: {
        // Sombra dura para dar o efeito 3D pixelado
        'hard': '4px 4px 0px 0px #1A1A1A',
        'hard-sm': '2px 2px 0px 0px #1A1A1A',
        'inset': 'inset 2px 2px 0px 0px rgba(0,0,0,0.2)', // Profundidade na tela
      }
    },
  },
  plugins: [],
}