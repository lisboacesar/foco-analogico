import { useState } from "react";
import { useStore } from "../store";
import { Power, Moon, Sun } from "lucide-react";

export const Login = () => {
  const { setUser, isDarkMode, toggleTheme } = useStore();
  const [localName, setLocalName] = useState("");

  const handleBoot = (e) => {
    e.preventDefault();
    if (!localName.trim()) return;
    setUser(localName);
  };

  return (
    // Container Fundo (Reativo ao Dark Mode)
    <div className={`fixed inset-0 flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'dark bg-[#121212]' : 'bg-[#f0f0f0]'}`}>
      
      {/* --- CARTÃO DE ACESSO (CHASSI FÍSICO) --- */}
      <div className={`
        w-full max-w-md 
        bg-[var(--chassis-bg)] 
        border-2 border-[var(--chassis-border)] 
        rounded-[16px] 
        p-8 
        shadow-[10px_14px_30px_var(--shadow-color),_-2px_-2px_10px_rgba(255,255,255,0.1)]
        flex flex-col gap-6
        relative
      `}>
        
        {/* Botão de Tema (Canto Superior Direito) */}
        <button 
            onClick={toggleTheme} 
            className="absolute top-6 right-6 ko-key ko-key-gray w-10 h-10 rounded-full" 
            title="Alternar Tema"
        >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Cabeçalho */}
        <div className="space-y-1 mt-2">
          <div className="font-bold text-2xl tracking-tight text-[var(--text-primary)]">
            DEV <span className="text-[var(--btn-orange)]">DECK</span>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
            System Bootloader v3.0
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleBoot} className="flex flex-col gap-6 mt-4">
          
          {/* Input Físico (Afundado) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">
              Operator ID
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="ENTER NAME..."
              maxLength={12}
              className="w-full h-12 bg-[var(--btn-gray)] rounded-[4px] px-4 font-mono text-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none shadow-inner border border-transparent focus:border-[var(--btn-orange)] transition-all uppercase"
              autoFocus
            />
          </div>

          {/* Botão START Gigante (Laranja) */}
          <button
            type="submit"
            disabled={!localName.trim()}
            className="ko-key ko-key-orange h-16 text-lg tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all group"
          >
            <Power size={20} className="group-active:scale-90 transition-transform" />
            INITIALIZE
          </button>

        </form>

        {/* Rodapé Decorativo */}
        <div className="border-t border-[var(--chassis-border)] pt-4 mt-2 flex justify-between items-center opacity-60">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--text-secondary)]"></div>
                <div className="w-2 h-2 rounded-full bg-[var(--text-secondary)]"></div>
            </div>
            <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                © 20XX ENG. DEPT
            </div>
        </div>

      </div>
    </div>
  );
};