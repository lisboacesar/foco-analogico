import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { Send } from "lucide-react";

export const Chat = () => {
  const { chatMessages, addChatMessage, user } = useStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addChatMessage({ id: Date.now(), user: user || "OP", text: input });
    setInput("");
  };

  return (
    /* Fundo da tela agora usa --screen-bg para ser sempre escuro */
    <div className="flex flex-col h-full bg-[var(--screen-bg)] border-2 border-[var(--screen-border)] rounded-md overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] relative p-4">
      
      {/* Scanlines mais fortes para o terminal */}
      <div className="absolute inset-0 pointer-events-none bg-[length:100%_3px] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] z-10 opacity-50"></div>

      {/* --- ÁREA DE MENSAGENS (Tudo em Neon) --- */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 z-0 mb-4 relative font-mono text-neon">
        {chatMessages.map((msg) => (
          <div key={msg.id} className="text-sm leading-relaxed hover:bg-white/5 transition-colors p-1 rounded group flex items-start">
            <span className="opacity-60 text-xs mr-2 select-none mt-0.5">
              [{new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
            </span>
            <div>
              <span className="font-bold opacity-90 mr-2 group-hover:opacity-100">
                &lt;{msg.user}&gt;
              </span>
              <span className="opacity-100">
                {msg.text}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* --- INPUT (Painel Físico) --- */}
      <form onSubmit={handleSend} className="bg-[var(--btn-gray)] p-2 rounded border-t border-[var(--chassis-border)] flex gap-2 z-20 shadow-lg relative">
        {/* Input agora tem fundo escuro e texto neon */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="TYPE COMMAND..."
          className="flex-1 bg-[var(--screen-bg)] border border-[var(--screen-border)] text-neon font-mono px-3 py-2 focus:outline-none focus:border-btn-orange/50 transition-colors rounded placeholder:text-neon/50 uppercase shadow-inner"
        />
        
        <button 
          type="submit"
          disabled={!input.trim()}
          className="ko-key ko-key-orange px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          SEND <Send size={14} />
        </button>
      </form>
    </div>
  );
};