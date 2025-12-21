import { useEffect, useRef } from "react";
import { useStore } from "../store";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const PIXEL_ART_URL = "https://i.pinimg.com/originals/2b/53/03/2b53037859d6be48a5651d9998671631.gif";

export const Player = ({ compact }) => {
  const { isPlaying, togglePlay, volume, setVolume } = useStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) audioRef.current.play().catch(e => console.error(e));
    else audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume / 100; }, [volume]);

  return (
    <div className="flex flex-col h-full gap-8 relative">
      <audio ref={audioRef} src="https://stream.zeno.fm/0r0xa792kwzuv" crossOrigin="anonymous" />

      {/* --- TELA LCD CRT --- */}
      {/* Usando a nova variável --screen-bg para fundo sempre escuro */}
      <div className="relative w-full aspect-[4/3] bg-[var(--screen-bg)] rounded-md overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-2px_4px_rgba(0,0,0,0.7)] border-2 border-[var(--screen-border)] group">
        
        {/* Camada Pixel Art Base (Mais escura quando pausado) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center image-pixelated transition-all duration-500 ${isPlaying ? 'opacity-60' : 'grayscale opacity-20'}`}
          style={{ backgroundImage: `url(${PIXEL_ART_URL})` }}
        ></div>

        {/* --- NOVO GLITCH SUAVE CONSTANTE --- */}
        {/* Camadas Ciano e Magenta sempre presentes, mais visíveis no play */}
        <div className={`absolute inset-0 bg-cover bg-center image-pixelated animate-glitch-cyan pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-50' : 'opacity-20'}`} style={{ backgroundImage: `url(${PIXEL_ART_URL})` }}></div>
        <div className={`absolute inset-0 bg-cover bg-center image-pixelated animate-glitch-magenta pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-50' : 'opacity-20'}`} style={{ backgroundImage: `url(${PIXEL_ART_URL})` }}></div>


        {/* Scanlines e Reflexo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%] pointer-events-none z-10 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20"></div>

        {/* Texto da Tela (Agora usando a classe text-neon) */}
        <div className="absolute top-4 left-4 z-30 font-mono text-neon">
          <div className="text-xs opacity-80 mb-1">STATUS: {isPlaying ? "ACTIVE" : "STANDBY"}</div>
          <div className="text-lg font-bold">{isPlaying ? "♪ LOFI STREAM" : "NO SIGNAL"}</div>
        </div>
      </div>

      {/* --- CONTROLES FÍSICOS --- */}
      <div className="grid grid-cols-3 gap-4">
        <button className="ko-key ko-key-gray h-16"><SkipBack size={24} /></button>
        <button onClick={togglePlay} className="ko-key ko-key-orange h-16">
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
        </button>
        <button className="ko-key ko-key-gray h-16"><SkipForward size={24} /></button>
      </div>

      {/* --- VOLUME --- */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--chassis-border)]">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-bold uppercase tracking-wider opacity-70">Main Vol</div>
          <div className="ko-knob" style={{ transform: `rotate(${volume * 2.7}deg)` }}></div>
        </div>
        <div className="flex-1 ml-8 relative h-12 flex items-center">
            <input 
              type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)}
              className="w-full h-2 bg-[var(--btn-gray)] rounded-full appearance-none cursor-pointer shadow-inner
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-10
                [&::-webkit-slider-thumb]:bg-[var(--btn-black)] [&::-webkit-slider-thumb]:rounded-[4px]
                [&::-webkit-slider-thumb]:shadow-[2px_3px_5px_var(--shadow-color),_inset_1px_1px_0px_rgba(255,255,255,0.2)]"
            />
        </div>
      </div>
    </div>
  );
};