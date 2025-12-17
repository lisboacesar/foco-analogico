import { useStore } from "../store";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export const Player = () => {
  const { isPlaying, togglePlay, volume, setVolume } = useStore();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
      
      {/* --- VISOR LCD --- */}
      <div className="w-full bg-retro-screen border-4 border-retro-dark/50 rounded-lg p-4 shadow-inset relative overflow-hidden">
        {/* Brilho na tela */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="font-mono text-retro-terminal text-sm text-center animate-pulse">
          {isPlaying ? "▶ TOCANDO: LOFI BEATS" : "❚❚ PAUSADO"}
        </div>
        <div className="mt-2 h-1 w-full bg-retro-screenOn rounded overflow-hidden">
           {/* Barrinha de progresso fake animada */}
           <div className={`h-full bg-retro-terminal ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`}></div>
        </div>
      </div>

      {/* --- CONTROLES --- */}
      <div className="flex items-center gap-4">
        {/* Botão Voltar */}
        <button className="bg-retro-primary w-12 h-12 border-4 border-retro-dark shadow-hard-sm flex items-center justify-center active:translate-y-1 active:shadow-none transition-all">
          <SkipBack className="text-white" size={20} fill="currentColor" />
        </button>

        {/* Botão Play/Pause (Laranjão) */}
        <button 
          onClick={togglePlay}
          className="bg-retro-accent w-16 h-16 border-4 border-retro-dark shadow-hard flex items-center justify-center active:translate-y-1 active:shadow-none transition-all rounded-sm"
        >
          {isPlaying ? (
            <Pause className="text-retro-dark" size={32} fill="currentColor" />
          ) : (
            <Play className="text-retro-dark" size={32} fill="currentColor" />
          )}
        </button>

        {/* Botão Avançar */}
        <button className="bg-retro-primary w-12 h-12 border-4 border-retro-dark shadow-hard-sm flex items-center justify-center active:translate-y-1 active:shadow-none transition-all">
          <SkipForward className="text-white" size={20} fill="currentColor" />
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