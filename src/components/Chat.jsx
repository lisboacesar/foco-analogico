import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { Send } from 'lucide-react';

export const Chat = () => {
  const { messages, addMessage } = useStore();
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input);
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-retro-dark text-retro-bg p-1 border-4 border-retro-dark shadow-hard h-[500px] flex flex-col w-full max-w-md">
      {/* Header do Chat */}
      <div className="bg-retro-surface text-retro-dark p-2 font-bold text-center border-b-2 border-retro-dark mb-1">
        /// PUBLIC_NET
      </div>

      {/* Lista de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
        {messages.map((msg) => (
          <div key={msg.id} className="leading-relaxed">
            <span className="opacity-50">[{msg.time}]</span>{" "}
            <span className="text-retro-green font-bold text-[#4ADE80]">{`<${msg.user}>`}</span>{" "}
            <span className="text-retro-bg/90">{msg.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-2 border-t-2 border-retro-surface/20 flex gap-2">
        <span className="text-retro-accent animate-pulse">{">"}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Transmit..."
          className="bg-transparent flex-1 outline-none text-retro-bg font-mono placeholder:text-retro-bg/30"
        />
        <button type="submit" className="text-retro-surface hover:text-white">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};