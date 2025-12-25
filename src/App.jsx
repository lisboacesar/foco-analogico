import { useState, useEffect, useCallback } from 'react';
import { Player } from './components/Player';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { MediaSelector } from './components/MediaSelector'; // Componente Novo
import { useStore } from './store';
import { Moon, Sun, Disc3 } from 'lucide-react'; // Ícone Novo

function App() {
  const { user, isDarkMode, toggleTheme, togglePlay, volume, setVolume } = useStore();
  
  // Estados de Interface
  const [isOpen, setIsOpen] = useState(true); // Controla responsividade Desktop/Mobile
  const [isMediaOpen, setIsMediaOpen] = useState(false); // Controla o Modal de Mídias

  // Monitoramento de Tamanho de Tela (Debounced para performance seria ideal, mas nativo funciona bem aqui)
  useEffect(() => {
    const checkSize = () => setIsOpen(window.innerWidth >= 1024);
    checkSize(); // Checagem inicial
    
    // Adicionando listener passivo para melhor performance de scroll/resize
    window.addEventListener('resize', checkSize, { passive: true });
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Gerenciador de Atalhos de Teclado (Keyboard Events)
  const handleKeyPress = useCallback((event) => {
    // Evita acionar atalhos enquanto digita no chat
    const target = event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    switch (event.code) {
      case 'Space': 
        event.preventDefault(); // Evita scroll da página
        togglePlay(); 
        break;
      case 'KeyM': 
        setVolume(volume > 0 ? 0 : 50); 
        break;
      case 'KeyL': // Atalho 'L' para Library
        setIsMediaOpen(prev => !prev); 
        break;
      case 'ArrowUp': 
        event.preventDefault(); 
        setVolume(Math.min(parseInt(volume) + 10, 100)); 
        break;
      case 'ArrowDown': 
        event.preventDefault(); 
        setVolume(Math.max(parseInt(volume) - 10, 0)); 
        break;
      default: break;
    }
  }, [togglePlay, volume, setVolume]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Bloqueio de renderização se não autenticado (Security Check simples)
  if (!user) return <Login />;

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* --- CAMADA DE OVERLAY (Modal) --- */}
      <MediaSelector isOpen={isMediaOpen} onClose={() => setIsMediaOpen(false)} />

      {/* --- O APARELHO (CHASSI) --- */}
      <div className={`
        bg-[var(--chassis-bg)] border-2 border-[var(--chassis-border)] 
        rounded-[16px]
        shadow-[10px_14px_30px_var(--shadow-color),_-2px_-2px_10px_rgba(255,255,255,0.1)]
        relative transition-all duration-500 ease-in-out outline-none
        /* LÓGICA RESPONSIVA */
        ${isOpen 
           ? 'flex flex-row gap-8 w-full max-w-6xl aspect-[16/9] max-h-[700px] p-6' // Desktop
           : 'flex flex-col gap-4 w-full max-w-[360px] py-6 px-5 h-auto' // Mobile
         }
      `}>
        
        {/* --- CABEÇALHO (Marca e Controles) --- */}
        <div className={`flex items-center justify-between z-50 ${isOpen ? 'absolute top-6 left-8 gap-4 w-[calc(100%-4rem)]' : 'w-full mb-2'}`}>
            <div className="font-bold text-2xl tracking-tight opacity-80 text-[var(--text-primary)] select-none cursor-default">
              DEV <span className="text-[var(--btn-orange)]">DECK</span>
            </div>
            
            <div className="flex gap-3">
                {/* Botão MEDIA LIBRARY (Novo) */}
                <button 
                  onClick={() => setIsMediaOpen(true)} 
                  className="ko-key ko-key-gray w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--btn-orange)] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-orange)]" 
                  title="Media Library (L)"
                  aria-label="Abrir biblioteca de mídia"
                >
                    <Disc3 size={18} />
                </button>

                {/* Botão TEMA */}
                <button 
                  onClick={toggleTheme} 
                  className="ko-key ko-key-gray w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                  title="Toggle Theme"
                  aria-label="Alternar tema claro/escuro"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
        </div>

        {/* Info do OP (Somente Desktop) */}
        {isOpen && (
          <div className="absolute top-7 right-24 font-mono text-xs uppercase tracking-widest opacity-60 text-[var(--text-secondary)] mr-8 select-none">
            User: {user} // Secure
          </div>
        )}

        {/* --- ÁREA DO PLAYER --- */}
        <div className={`flex flex-col gap-6 ${isOpen ? 'w-5/12 pt-16' : 'w-full'}`}>
          <Player compact={!isOpen} />
        </div>

        {/* --- ÁREA DO CHAT --- */}
        <div className={`flex flex-col relative ${isOpen ? 'w-7/12 h-full pt-16' : 'w-full h-[280px]'}`}>
          <Chat />
        </div>

      </div>
    </div>
  );
}

export default App;