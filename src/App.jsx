import { useState, useEffect, useCallback } from 'react';
import { Player } from './components/Player';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { useStore } from './store';
import { Moon, Sun } from 'lucide-react';

function App() {
  const { user, isDarkMode, toggleTheme, togglePlay, volume, setVolume } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  // Sensor de Responsividade
  useEffect(() => {
    const checkSize = () => setIsOpen(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Lógica de Atalhos (mantida igual)
  const handleKeyPress = useCallback((event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
    switch (event.code) {
      case 'Space': event.preventDefault(); togglePlay(); break;
      case 'KeyM': setVolume(volume > 0 ? 0 : 50); break;
      case 'ArrowUp': event.preventDefault(); setVolume(Math.min(parseInt(volume) + 10, 100)); break;
      case 'ArrowDown': event.preventDefault(); setVolume(Math.max(parseInt(volume) - 10, 0)); break;
      default: break;
    }
  }, [togglePlay, volume, setVolume]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!user) return <Login />;

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* --- O APARELHO (CHASSI) --- */}
      <div className={`
        bg-[var(--chassis-bg)] border-2 border-[var(--chassis-border)] 
        rounded-[16px]
        shadow-[10px_14px_30px_var(--shadow-color),_-2px_-2px_10px_rgba(255,255,255,0.1)]
        relative transition-all duration-500 ease-in-out outline-none
        /* LÓGICA RESPONSIVA REFINADA: */
        ${isOpen 
           ? 'flex flex-row gap-8 w-full max-w-6xl aspect-[16/9] max-h-[700px] p-6' // DESKTOP
           : 'flex flex-col gap-4 w-full max-w-[360px] py-6 px-5 h-auto' // MOBILE (Mais estreito e altura automática)
         }
      `}>
        
        {/* --- CABEÇALHO (Marca e Tema) --- */}
        {/* No Mobile: Vira flexbox normal (relative) para não encavalar. No Desktop: Fica absolute. */}
        <div className={`flex items-center justify-between z-50 ${isOpen ? 'absolute top-6 left-8 gap-4' : 'w-full mb-2'}`}>
            <div className="font-bold text-2xl tracking-tight opacity-80 text-[var(--text-primary)]">
              DEV <span className="text-[var(--btn-orange)]">DECK</span>
            </div>
            
            <button onClick={toggleTheme} className="ko-key ko-key-gray w-10 h-10 rounded-full flex items-center justify-center" title="Toggle Theme">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>

        {/* Info do OP (Só exibe no Desktop para limpar o visual mobile) */}
        {isOpen && (
          <div className="absolute top-7 right-8 font-mono text-xs uppercase tracking-widest opacity-60 text-[var(--text-secondary)]">
            OP: {user} // {isDarkMode ? 'NIGHT' : 'DAY'} MODE
          </div>
        )}

        {/* --- ÁREA DO PLAYER --- */}
        <div className={`flex flex-col gap-6 ${isOpen ? 'w-5/12 pt-16' : 'w-full'}`}>
          <Player compact={!isOpen} />
        </div>

        {/* --- ÁREA DO CHAT --- */}
        {/* Correção Crítica: Reduzi a altura fixa mobile de 450px para 280px */}
        <div className={`flex flex-col relative ${isOpen ? 'w-7/12 h-full pt-16' : 'w-full h-[280px]'}`}>
          <Chat />
        </div>

      </div>
    </div>
  );
}

export default App;