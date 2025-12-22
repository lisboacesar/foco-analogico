import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { Send, Terminal } from "lucide-react";

export const Chat = () => {
  const { chatMessages, addChatMessage, clearChatMessages, user, togglePlay, isPlaying, setVideo } = useStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const originalInput = input;
    setInput("");

    if (originalInput.startsWith('/')) {
      processCommand(originalInput);
    } else {
      addChatMessage({ id: Date.now(), user: user || "OP", text: originalInput });
    }
  };

  const processCommand = (cmd) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts[1];

    addChatMessage({ id: Date.now(), user: "CMD", text: `> ${cmd}`, isCommand: true });

    switch (command) {
      case '/help':
        // Atualizei a mensagem de ajuda
        addChatMessage({ id: Date.now() + 1, user: "System", text: "CMDS: /play, /stop, /clear, /bg [1-9], /time" });
        break;
      
      case '/clear':
      case '/cls':
        clearChatMessages();
        addChatMessage({ id: Date.now() + 2, user: "System", text: "Console cleared." });
        break;

      case '/play':
      case '/stop':
        togglePlay();
        addChatMessage({ id: Date.now() + 1, user: "System", text: `Audio Stream: ${!isPlaying ? 'STARTED' : 'STOPPED'}` });
        break;
      
      case '/bg':
        const videoId = parseInt(arg);
        // Atualizei a validação para aceitar até 9
        if (videoId >= 1 && videoId <= 9) {
            setVideo(videoId);
            addChatMessage({ id: Date.now() + 1, user: "System", text: `Display background updated to CH:0${videoId}` });
        } else {
            addChatMessage({ id: Date.now() + 1, user: "Error", text: "Invalid ID. Use 1-9." });
        }
        break;

      case '/time':
        addChatMessage({ id: Date.now() + 1, user: "System", text: `Current System Time: ${new Date().toLocaleTimeString()}` });
        break;
        
      case '/whoami':
        addChatMessage({ id: Date.now() + 1, user: "System", text: `User: ${user} // Role: ADMIN` });
        break;

      default:
        addChatMessage({ id: Date.now() + 1, user: "Error", text: `Unknown command: ${command}. Type /help.` });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--screen-bg)] border-2 border-[var(--screen-border)] rounded-md overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] relative p-4 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none bg-[length:100%_3px] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] z-10 opacity-50"></div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 z-0 mb-4 relative font-mono text-neon">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`text-sm leading-relaxed p-1 rounded flex items-start ${msg.user === 'Error' ? 'text-red-500' : ''} ${msg.user === 'CMD' ? 'opacity-50 italic' : ''}`}>
            {msg.user !== 'CMD' && (
               <span className="opacity-60 text-xs mr-2 select-none mt-0.5">
                 [{new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
               </span>
            )}
            <div>
              <span className={`font-bold opacity-90 mr-2 ${msg.user === 'System' ? 'text-[var(--btn-orange)]' : ''}`}>
                {msg.user === 'CMD' ? '' : `<${msg.user}>`}
              </span>
              <span className="opacity-100">{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="bg-[var(--btn-gray)] p-2 rounded border-t border-[var(--chassis-border)] flex gap-2 z-20 shadow-lg relative transition-colors duration-300">
        <div className="flex items-center justify-center pl-2 text-[var(--text-secondary)]">
            <Terminal size={16} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="TYPE COMMAND..."
          className="flex-1 bg-[var(--screen-bg)] border border-[var(--screen-border)] text-neon font-mono px-3 py-2 focus:outline-none focus:border-btn-orange/50 transition-colors rounded placeholder:text-neon/30 uppercase shadow-inner"
          autoComplete="off"
        />
        <button type="submit" disabled={!input.trim()} className="ko-key ko-key-orange px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
          SEND <Send size={14} />
        </button>
      </form>
    </div>
  );
};