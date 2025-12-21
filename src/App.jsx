import { useState, useEffect } from 'react';
import { Player } from './components/Player';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { useStore } from './store';
import { Moon, Sun } from 'lucide-react';

function App() {
  const { user, isDarkMode, toggleTheme } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  // Sensor de Responsividade
  useEffect(() => {
    const checkSize = () => setIsOpen(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  if (!user) return <Login />;

  return (
    // Aplica a classe 'dark' no container principal se isDarkMode for true
    <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* --- O APARELHO (CHASSI PRINCIPAL) --- */}
      <div className={`
        bg-[var(--chassis-bg)] /* Usa variável CSS para cor do chassi */
        border-2 border-[var(--chassis-border)] /* Borda reativa */
        p-6 rounded-[16px]
        shadow-[10px_14px_30px_var(--shadow-color),_-2px_-2px_10px_rgba(255,255,255,0.1)] /* Sombra reativa */
        relative transition-all duration-500 ease-in-out
        ${isOpen ? 'flex flex-row gap-8 w-full max-w-6xl aspect-[16/9] max-h-[700px]' : 'flex flex-col gap-6 w-full max-w-[400px] pb-8'}
      `}>
        
        {/* Marca e Botão de Tema */}
        <div className="absolute top-6 left-8 flex items-center gap-4">
            <div className="font-bold text-2xl tracking-tight opacity-80 text-[var(--text-primary)]">
              DEV <span className="text-[var(--btn-orange)]">DECK</span>
            </div>
            
            {/* Botão Físico para Alternar Tema */}
            <button onClick={toggleTheme} className="ko-key ko-key-gray w-10 h-10 rounded-full" title="Toggle Dark Mode">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>

        <div className="absolute top-7 right-8 font-mono text-xs uppercase tracking-widest opacity-60 text-[var(--text-secondary)]">
          OP: {user} // {isDarkMode ? 'NIGHT' : 'DAY'} MODE
        </div>

        {/* --- SEÇÃO ESQUERDA: PLAYER --- */}
        <div className={`flex flex-col gap-8 pt-16 ${isOpen ? 'w-5/12' : 'w-full'}`}>
          <Player compact={!isOpen} />
        </div>

        {/* --- SEÇÃO DIREITA: CHAT --- */}
        <div className={`flex flex-col relative ${isOpen ? 'w-7/12 h-full pt-16' : 'w-full h-[450px]'}`}>
          <Chat />
        </div>

      </div>
    </div>
  );
}

export default App;