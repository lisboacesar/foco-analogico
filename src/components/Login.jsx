import { useState } from "react";
import { useStore } from "../store";
import { Power } from "lucide-react";

// Opções de Pintura Industrial
const SHELLS = [
  { id: 'classic', name: 'GUNMETAL GREY', color: 'bg-[#2d2d30]' },
  { id: 'cobalt', name: 'COBALT BLUE', color: 'bg-[#1e3a8a]' },
  { id: 'safety', name: 'SAFETY ORANGE', color: 'bg-[#ea580c]' },
  { id: 'void', name: 'VOID BLACK', color: 'bg-[#0f0f10]' },
];

export const Login = () => {
  const { setUser, setShell } = useStore();
  const [localName, setLocalName] = useState("");
  const [selectedShell, setSelectedShell] = useState("classic");

  const handleBoot = (e) => {
    e.preventDefault();
    if (!localName.trim()) return;
    setShell(selectedShell);
    setUser(localName);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50 font-mono text-sci-text selection:bg-sci-text selection:text-black">
      {/* Scanlines de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-md bg-metal-dark border-2 border-metal-light p-6 rounded-lg shadow-hull relative">
        
        {/* Cabeçalho do Boot */}
        <div className="mb-8 text-center border-b border-metal-light/30 pb-4">
          <h1 className="font-display text-xl text-sci-text mb-2">SYSTEM BOOT_LOADER</h1>
          <div className="text-xs text-sci-dim">v2.0.45 // AUTHENTICATION REQUIRED</div>
        </div>

        <form onSubmit={handleBoot} className="space-y-6">
          
          {/* 1. Identificação */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-metal-screw">/// ENTER OPERATOR ID</label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="CODENAME..."
              maxLength={12}
              className="w-full bg-black/50 border border-metal-light text-sci-text p-3 font-mono focus:outline-none focus:border-sci-text transition-colors text-lg uppercase placeholder:text-sci-dim/30"
              autoFocus
            />
          </div>

          {/* 2. Escolha de Chassi (Cores) */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-metal-screw">/// SELECT CHASSIS COLOR</label>
            <div className="grid grid-cols-4 gap-2">
              {SHELLS.map((shell) => (
                <button
                  key={shell.id}
                  type="button"
                  onClick={() => setSelectedShell(shell.id)}
                  className={`
                    h-12 border-2 rounded transition-all relative overflow-hidden group
                    ${selectedShell === shell.id ? 'border-sci-text shadow-[0_0_10px_rgba(74,246,38,0.3)] scale-105' : 'border-metal-dark opacity-60 hover:opacity-100'}
                  `}
                >
                  {/* Cor do Botão */}
                  <div className={`absolute inset-0 ${shell.color}`}></div>
                  
                  {/* Label (Tooltip) */}
                  <span className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {shell.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Botão de Inicializar */}
          <button
            type="submit"
            disabled={!localName.trim()}
            className="w-full bg-sci-text text-black font-display py-4 mt-4 rounded border-b-4 border-r-4 border-green-900 active:translate-y-1 active:border-none transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Power size={18} /> INITIALIZE SYSTEM
          </button>

        </form>
      </div>
    </div>
  );
};