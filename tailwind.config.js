/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plastic: {
          base: '#1a1a1d',      // Plástico Preto Fosco
          light: '#2c2c30',     // Borda iluminada
          dark: '#0d0d0f',      // Sombra profunda
          face: '#222225',      // Superfície dos botões
        },
        screen: {
          base: '#050a05',      // Preto CRT
          text: '#4af626',      // Verde Fósforo
        },
        action: {
          orange: '#ff8800',
          red: '#dc2626',
        }
      },
      boxShadow: {
        // O efeito "Objeto Físico"
        'device': 'inset 0 2px 3px #2c2c30, 0 20px 40px -10px rgba(0,0,0,0.8), 0 5px 10px -5px rgba(0,0,0,0.5)',
        // O efeito "Tela Afundada"
        'screen': 'inset 0 4px 10px rgba(0,0,0,0.9), 0 0 0 2px #0d0d0f',
        // O efeito "Botão Elevado"
        'btn': '0 4px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        // O efeito "Botão Pressionado"
        'btn-pressed': 'inset 0 2px 4px rgba(0,0,0,0.5), 0 0 0 transparent',
      },
      backgroundImage: {
        // Textura de Ruído (Noise) via SVG Base64
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      animation: {
        'glitch-1': 'glitch1 3s infinite linear alternate-reverse',
        'glitch-2': 'glitch2 2.5s infinite linear alternate',
      },
      keyframes: {
        glitch1: {
          '0%, 95%': { display: 'none', transform: 'translate(0)', clipPath: 'inset(0 0 0 0)' },
          '96%': { display: 'block', transform: 'translate(-3px, 2px)', clipPath: 'inset(20% 0 50% 0)' },
          '98%': { display: 'block', transform: 'translate(3px, -1px)', clipPath: 'inset(60% 0 10% 0)' },
          '100%': { display: 'block', transform: 'translate(-2px, 1px)', clipPath: 'inset(10% 0 70% 0)' },
        },
        glitch2: {
          '0%, 95%': { display: 'none', transform: 'translate(0)' },
          '96%': { display: 'block', transform: 'translate(2px, -2px)', clipPath: 'inset(10% 0 60% 0)' },
          '98%': { display: 'block', transform: 'translate(-3px, 1px)', clipPath: 'inset(40% 0 20% 0)' },
          '100%': { display: 'block', transform: 'translate(2px, 0px)', clipPath: 'inset(80% 0 5% 0)' },
        },
      }
    },
  },
  plugins: [],
}