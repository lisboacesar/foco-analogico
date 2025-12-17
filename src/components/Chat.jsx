import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { Send, Terminal } from "lucide-react";

export const Chat = () => {
  const { chatMessages, addChatMessage } = useStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adiciona mensagem do usuário
    addChatMessage({ 
      id: Date.now(), 
      user: "Guest", // No futuro podemos deixar o usuário escolher o nome
      text: input 
    });
    
    setInput("");
  };

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      
      {/* --- A TELA (Monitor CRT) --- */}
      <div className="flex-1 bg-retro-screenOn border-4 border-retro-dark/20 rounded shadow-inset p-4 font-mono text-sm overflow-hidden relative">
        
        {/* Efeito de Scanline (Linhas de TV antiga - opcional, mas estiloso) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,6px_100%] opacity-20"></div>

        {/* Cabeçalho do Sistema */}
        <div className="border-b border-retro-terminal/30 pb-2 mb-4 text-retro-terminal opacity-70 text-xs uppercase flex items-center gap-2">
          <Terminal size={14} />
          <span>/// PUBLIC_NET CONNECTION ESTABLISHED</span>
        </div>

        {/* Lista de Mensagens */}
        <div className="h-[200px] overflow-y-auto pr-2 custom-scrollbar space-y-3 relative z-0">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="text-retro-terminal">
              <span className="opacity-50 text-xs mr-2">
                [{new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
              </span>
              <span className="font-bold mr-2 text-retro-terminal opacity-90">
                &lt;{msg.user}&gt;
              </span>
              <span className="text-retro-terminal/90 shadow-green-glow">
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* --- A ENTRADA (Teclado/Input) --- */}
      <form onSubmit={handleSend} className="mt-4 flex gap-3">
        <div className="relative flex-1">
           {/* Ícone de prompt ">" */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-display text-retro-dark text-xs">
            &gt;
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="TRANSMIT DATA..."
            className="w-full bg-retro-bg border-4 border-retro-dark py-2 pl-8 pr-4 font-mono text-retro-dark placeholder:text-retro-dark/40 focus:outline-none focus:bg-white transition-colors shadow-hard-sm text-sm uppercase"
          />
        </div>
        
        <button
          type="submit"
          className="bg-retro-accent border-4 border-retro-dark p-2 shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center hover:bg-retro-accent/90"
        >
          <Send size={20} className="text-retro-dark" />
        </button>
      </form>
    </div>
  );
};