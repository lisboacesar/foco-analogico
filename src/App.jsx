import { useState, useEffect } from 'react';
import { useStore } from './store'; // Importando a Store
import { Player } from './components/Player';
import { Chat } from './components/Chat';
import { Login } from './components/Login'; // Importando a Tela de Boot

// Mapa de Cores para o Tailwind aplicar dinamicamente
const SHELL_COLORS = {
  classic: 'border-metal-light bg-metal-dark', 
  cobalt: 'border-blue-900 bg-[#0a1020]',     
  safety: 'border-orange-900 bg-[#1a1005]',
  void: 'border-[#111] bg-[#050505]',
};

// Mapa de "Tintas" para detalhes (botões e acentos)
const ACCENT_COLORS = {
  classic: 'text-sci-text',
  cobalt: 'text-blue-400',
  safety: 'text-orange-400',
  void: 'text-gray-400',
};

function App() {
  const { user, shell } = useStore(); // Pegamos o usuário e a cor da store
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsOpen(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // SE NÃO TIVER USUÁRIO, MOSTRA A TELA DE BOOT
  if (!user) {
    return <Login />;
  }

  // Define a classe de cor baseada na escolha
  const shellClass = SHELL_COLORS[shell] || SHELL_COLORS.classic;
  const accentClass = ACCENT_COLORS[shell] || ACCENT_COLORS.classic;

  return (
    <div className="min-h-screen w-full bg-starfield flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden text-sci-text selection:bg-sci-text selection:text-black">
      
      <header className="mb-8 text-center space-y-2">
        <h1 className={`text-3xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
          DEV TUNES
        </h1>
        <div className="text-xs font-mono tracking-[0.2em] opacity-60 flex justify-center items-center gap-2">
          <span>♦</span> OPERATOR: <span className={accentClass}>{user}</span> <span>♦</span>
        </div>
      </header>

      {/* --- O DISPOSITIVO (Com cor dinâmica) --- */}
      <div className={`
        ${shellClass} border-4 p-3 rounded-3xl shadow-hull relative transition-all duration-1000 ease-in-out
        ${isOpen ? 'flex flex-row gap-4 w-full max-w-5xl aspect-[16/9] max-h-[600px]' : 'flex flex-col gap-4 w-[360px] pb-8'}
      `}>
        
        {/* Parafusos */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-metal-screw shadow-inner flex items-center justify-center"><div className="w-full h-[1px] bg-black/50 rotate-45"></div></div>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-metal-screw shadow-inner flex items-center justify-center"><div className="w-full h-[1px] bg-black/50 rotate-45"></div></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-metal-screw shadow-inner flex items-center justify-center"><div className="w-full h-[1px] bg-black/50 rotate-45"></div></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-metal-screw shadow-inner flex items-center justify-center"><div className="w-full h-[1px] bg-black/50 rotate-45"></div></div>

        {/* --- MÓDULO DE ÁUDIO --- */}
        <div className={`
          bg-black/20 border-2 border-black/30 rounded-xl p-4 flex flex-col gap-4 relative shadow-bezel transition-all
          ${isOpen ? 'w-5/12' : 'w-full'}
        `}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-display text-metal-screw uppercase tracking-widest opacity-50">
            Audio Module
          </div>
          <Player compact={!isOpen} />
        </div>

        {/* --- MÓDULO DE DADOS --- */}
        <div className={`
          flex flex-col relative transition-all
          ${isOpen ? 'w-7/12 h-full' : 'w-full h-[400px]'}
        `}>
          
          <div className="grid grid-cols-3 px-4 gap-1 transform translate-y-[2px]">
            <button className="bg-metal-dark border-t-2 border-l-2 border-r-2 border-black/30 py-2 rounded-t-lg text-sci-text font-display text-[10px] md:text-xs shadow-[0_-2px_4px_rgba(0,0,0,0.2)] z-10 w-full text-center truncate">
              CHAT
            </button>
            <button className="bg-metal-dark/50 border-t-2 border-l-2 border-r-2 border-black/10 py-2 rounded-t-lg text-metal-screw font-display text-[10px] md:text-xs hover:bg-metal-dark/80 transition-colors w-full text-center truncate">
              REGRAS
            </button>
            <button className="bg-metal-dark/50 border-t-2 border-l-2 border-r-2 border-black/10 py-2 rounded-t-lg text-metal-screw font-display text-[10px] md:text-xs hover:bg-metal-dark/80 transition-colors w-full text-center truncate">
              FÓRUM
            </button>
          </div>

          <div className="flex-1 bg-metal-dark border-4 border-black/30 rounded-xl rounded-tl-none p-1 shadow-bezel overflow-hidden relative z-0">
             <Chat />
          </div>
        </div>

      </div>
      
      <footer className="mt-8 text-metal-screw text-[10px] font-mono select-none">
        © 20XX DEV SYSTEMS CORP. // SYSTEM READY
      </footer>

    </div>
  );
}

export default App;