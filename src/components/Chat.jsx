import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { Send } from "lucide-react";

export const Chat = () => {
  // Pegamos as mensagens, a função de adicionar e o USUÁRIO logado da store
  const { chatMessages, addChatMessage, user } = useStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll para baixo sempre que chega mensagem nova
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addChatMessage({ 
      id: Date.now(), 
      user: user || "OPERATOR", // Usa o nome real do login ou um fallback de segurança
      text: input 
    });
    
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-sci-base relative p-4">
      
      {/* --- EFEITOS VISUAIS CRT (Camadas decorativas) --- */}
      
      {/* Scanlines Overlay (Linhas de TV antigas) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none bg-[length:100%_4px,6px_100%] opacity-20 z-10"></div>
      
      {/* Vinheta/Sombra interna para dar profundidade de tela curva */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none z-10"></div>

      {/* --- ÁREA DE MENSAGENS (Log do Terminal) --- */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 z-0 mb-4 relative">
        {chatMessages.map((msg) => (
          <div key={msg.id} className="text-sm md:text-base font-mono leading-relaxed hover:bg-white/5 transition-colors p-1 rounded group">
            {/* Timestamp */}
            <span className="text-sci-dim text-xs mr-2 select-none group-hover:text-sci-dim/80">
              [{new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
            </span>
            
            {/* Nome do Usuário */}
            <span className="text-sci-text font-bold opacity-80 mr-2 group-hover:opacity-100">
              &lt;{msg.user}&gt;
            </span>
            
            {/* Texto da Mensagem */}
            <span className="text-sci-text opacity-90 text-shadow-glow">
              {msg.text}
            </span>
          </div>
        ))}
        {/* Elemento invisível para forçar o scroll até aqui */}
        <div ref={messagesEndRef} />
      </div>

      {/* --- ÁREA DE INPUT (Painel de Controle Metálico) --- */}
      <form onSubmit={handleSend} className="bg-metal-light p-2 rounded border-t-2 border-metal-light/50 flex gap-2 z-20 shadow-lg relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="TRANSMIT DATA..."
          className="flex-1 bg-metal-dark border-2 border-metal-dark text-sci-text font-mono px-3 py-2 focus:outline-none focus:border-sci-text/30 transition-colors rounded placeholder:text-sci-dim/50 uppercase"
        />
        
        <button 
          type="submit"
          disabled={!input.trim()}
          className="bg-action-red text-black font-display text-xs px-4 py-2 rounded border-b-4 border-r-4 border-black active:border-none active:translate-y-1 transition-all flex items-center gap-2 hover:brightness-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          SEND <Send size={12} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};