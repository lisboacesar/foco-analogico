import { useEffect, useRef } from "react";
import { useStore } from "../store";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export const Player = () => {
  const { isPlaying, togglePlay, volume, setVolume } = useStore();
  
  // Criamos uma referência direta para o elemento de áudio HTML
  const audioRef = useRef(null);

  // Efeito 1: Sincroniza o Play/Pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.log("Erro ao tentar tocar (o navegador pode ter bloqueado):", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Efeito 2: Sincroniza o Volume
  useEffect(() => {
    if (audioRef.current) {
      // O HTML Audio usa volume de 0.0 a 1.0, mas nosso slider é 0 a 100
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
      
      {/* --- O ELEMENTO DE ÁUDIO INVISÍVEL --- */}
      {/* Usamos um stream de rádio Lofi online estável */}
      <audio 
        ref={audioRef} 
        src="https://stream.zeno.fm/0r0xa792kwzuv" 
        crossOrigin="anonymous"
      />

      {/* --- VISOR LCD --- */}
      <div className="w-full bg-retro-screen border-4 border-retro-dark/50 rounded-lg p-4 shadow-inset relative overflow-hidden transition-all duration-300">
        {/* Brilho na tela */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
        
        <div className={`font-mono text-retro-terminal text-sm text-center ${isPlaying ? 'animate-pulse' : ''}`}>
          {isPlaying ? "▶ TOCANDO: LOFI RADIO" : "❚❚ AGUARDANDO COMANDO"}
        </div>
        
        {/* Visualizador de Áudio Fake (Barrinhas animadas) */}
        <div className="mt-3 flex justify-center gap-1 h-4 items-end opacity-80">
           {[...Array(8)].map((_, i) => (
             <div 
               key={i} 
               className={`w-2 bg-retro-terminal transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-1'}`}
               style={{ 
                 height: isPlaying ? `${Math.random() * 100}%` : '10%',
                 animationDelay: `${i * 0.1}s` 
               }} 
             ></div>
           ))}
        </div>
      </div>

      {/* --- CONTROLES --- */}
      <div className="flex items-center gap-4">
        {/* Botão Voltar (Decorativo por enquanto, pois é rádio ao vivo) */}
        <button className="bg-retro-primary w-12 h-12 border-4 border-retro-dark shadow-hard-sm flex items-center justify-center active:translate-y-1 active:shadow-none transition-all group">
          <SkipBack className="text-white group-active:scale-90 transition-transform" size={20} fill="currentColor" />
        </button>

        {/* Botão Play/Pause (Laranjão) */}
        <button 
          onClick={togglePlay}
          className="bg-retro-accent w-16 h-16 border-4 border-retro-dark shadow-hard flex items-center justify-center active:translate-y-1 active:shadow-none transition-all rounded-sm group"
        >
          {isPlaying ? (
            <Pause className="text-retro-dark group-active:scale-90 transition-transform" size={32} fill="currentColor" />
          ) : (
            <Play className="text-retro-dark group-active:scale-90 transition-transform" size={32} fill="currentColor" />
          )}
        </button>

        {/* Botão Avançar */}
        <button className="bg-retro-primary w-12 h-12 border-4 border-retro-dark shadow-hard-sm flex items-center justify-center active:translate-y-1 active:shadow-none transition-all group">
          <SkipForward className="text-white group-active:scale-90 transition-transform" size={20} fill="currentColor" />
        </button>
      </div>

      {/* --- VOLUME --- */}
      <div className="flex items-center gap-3 w-full px-4">
        <Volume2 size={16} className="text-retro-dark opacity-50" />
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume} 
          onChange={(e) => setVolume(e.target.value)}
          className="w-full h-4 bg-retro-dark appearance-none rounded-full border-2 border-transparent accent-retro-accent cursor-pointer opacity-80 hover:opacity-100"
        />
      </div>

    </div>
  );
};