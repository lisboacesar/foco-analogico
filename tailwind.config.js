/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Metais e Estrutura
        metal: {
          dark: '#1a1a1c',    // Chassi principal
          light: '#2d2d30',   // Relevos
          bezel: '#0f0f10',   // Moldura da tela
          screw: '#555555',   // Parafusos
        },
        // Luzes e Telas
        sci: {
          base: '#050a05',    // Fundo da tela (Preto esverdeado profundo)
          text: '#4af626',    // Verde Terminal (Fiel à imagem)
          dim: '#1e3a1e',     // Elementos desligados
        },
        // Botões Físicos (Paleta Tática)
        action: {
          orange: '#ff8800',  // Botão Play
          yellow: '#fbbf24',  // Botão/Knob Volume
          red: '#dc2626',     // Botão Send/Stop
          cyan: '#06b6d4',    // Botões de navegação
          gray: '#374151',    // Botões inativos/abas
        }
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'cursive'],
        mono: ['"VT323"', 'monospace'],
      },
      boxShadow: {
        // Efeito 3D Industrial (Luz vindo do topo-esquerda)
        'hull': '8px 8px 16px 0px rgba(0,0,0,0.6), inset 1px 1px 0px 0px rgba(255,255,255,0.1)', 
        'bezel': 'inset 4px 4px 8px 0px rgba(0,0,0,0.9), 0px 0px 0px 2px rgba(255,255,255,0.05)',
        'btn': '4px 4px 0px 0px rgba(0,0,0,0.8), inset 2px 2px 0px 0px rgba(255,255,255,0.1)',
        'btn-pressed': 'inset 4px 4px 8px 0px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'starfield': 'radial-gradient(circle at center, #111827 0%, #000000 100%)',
      }
    },
  },
  plugins: [],
}