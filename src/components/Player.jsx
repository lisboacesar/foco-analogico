import { useEffect, useRef } from "react";
import { useStore } from "../store";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export const Player = () => {
  const { isPlaying, togglePlay, volume, setVolume } = useStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error(e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <div className="flex flex-col h-full gap-6 justify-center">
      <audio ref={audioRef} src="https://stream.zeno.fm/0r0xa792kwzuv" crossOrigin="anonymous" />

      {/* TELA DO PLAYER */}
      <div className="bg-sci-base border-4 border-metal-bezel rounded-lg p-4 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden min-h-[120px] flex flex-col justify-center items-center">
        {/* Reflexo no vidro */}
        <div className="absolute top-0 right-0 w-[150%] h-[50%] bg-gradient-to-b from-white/5 to-transparent -rotate-12 pointer-events-none"></div>
        
        <div className={`font-mono text-xl text-sci-text text-shadow-glow ${isPlaying ? 'animate-pulse' : 'opacity-50'}`}>
          {isPlaying ? "♪ ANALOG VIBES" : "WAITING INPUT..."}
        </div>
        <div className="text-[10px] text-sci-text/50 font-display mt-2 tracking-widest">
           {isPlaying ? "STREAMING DATA..." : "SYSTEM IDLE"}
        </div>
      </div>

      {/* CONTROLES PRINCIPAIS */}
      <div className="grid grid-cols-2 gap-4">
        {/* BOTÃO PLAY GIGANTE (LARANJA) */}
        <button 
          onClick={togglePlay}
          className="col-span-2 bg-action-orange border-b-4 border-r-4 border-black rounded shadow-btn active:shadow-btn-pressed active:translate-y-1 active:border-none transition-all h-20 flex items-center justify-center group"
        >
          {isPlaying ? (
             <Pause size={40} className="text-black drop-shadow-md" fill="currentColor" />
          ) : (
             <Play size={40} className="text-black drop-shadow-md" fill="currentColor" />
          )}
        </button>

        {/* BOTÕES DE NAVEGAÇÃO (VERMELHO E AZUL) */}
        <button className="bg-action-red border-b-4 border-r-4 border-black rounded shadow-btn active:shadow-btn-pressed active:translate-y-1 transition-all h-14 flex items-center justify-center hover:brightness-110">
          <SkipBack size={24} className="text-black" fill="currentColor" />
        </button>
        <button className="bg-action-cyan border-b-4 border-r-4 border-black rounded shadow-btn active:shadow-btn-pressed active:translate-y-1 transition-all h-14 flex items-center justify-center hover:brightness-110">
          <SkipForward size={24} className="text-black" fill="currentColor" />
        </button>
      </div>

      {/* KNOB DE VOLUME (AMARELO) */}
      <div className="mt-auto pt-4 flex items-center gap-4 bg-metal-dark/50 p-3 rounded-lg border border-metal-light/20">
        <Volume2 className="text-action-yellow" size={20} />
        {/* Estilizando o slider para parecer uma fita ou régua industrial */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume} 
          onChange={(e) => setVolume(e.target.value)}
          className="w-full h-4 bg-metal-dark rounded-full appearance-none border-2 border-metal-light cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-6 
            [&::-webkit-slider-thumb]:h-6 
            [&::-webkit-slider-thumb]:bg-action-yellow 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
    </div>
  );
};