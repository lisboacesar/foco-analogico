import { useEffect, useRef } from "react";
import { useStore } from "../store";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

// --- IMPORTAÇÃO DOS 9 GIFS ---
import gif1 from '../videos/bg1.gif';
import gif2 from '../videos/bg2.gif';
import gif3 from '../videos/bg3.gif';
import gif4 from '../videos/bg4.gif';
import gif5 from '../videos/bg5.gif';
import gif6 from '../videos/bg6.gif';
import gif7 from '../videos/bg7.gif';
import gif8 from '../videos/bg8.gif';
import gif9 from '../videos/bg9.gif';

const backgroundMap = {
  1: gif1,
  2: gif2,
  3: gif3,
  4: gif4,
  5: gif5,
  6: gif6,
  7: gif7,
  8: gif8,
  9: gif9
};

export const Player = ({ compact }) => {
  const { isPlaying, togglePlay, volume, setVolume, currentVideo } = useStore();
  const audioRef = useRef(null);

  // Controle APENAS do Áudio
  useEffect(() => {
    if (isPlaying) { 
        audioRef.current.play().catch(e => console.error("Erro Audio:", e));
    } else { 
        audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume / 100; }, [volume]);

  return (
    <div className="flex flex-col h-full gap-8 relative">
      <audio ref={audioRef} src="https://stream.zeno.fm/0r0xa792kwzuv" crossOrigin="anonymous" />

      {/* --- DISPLAY --- */}
      <div className="relative w-full aspect-[4/3] bg-[var(--screen-bg)] rounded-md overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-2px_4px_rgba(0,0,0,0.7)] border-2 border-[var(--screen-border)] group">
        
        {/* GIF DE FUNDO */}
        <img 
            key={currentVideo} 
            src={backgroundMap[currentVideo] || backgroundMap[1]} 
            alt="Retro Visualizer"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-80' : 'opacity-20 grayscale'}`}
        />

        {/* Overlay Pixel Art */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Transparent_pixel_art.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%] pointer-events-none z-10 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20"></div>

        {/* Info na Tela */}
        <div className="absolute top-4 left-4 z-30 font-mono text-neon">
          <div className="text-xs opacity-80 mb-1">CH: 0{currentVideo} // {isPlaying ? "ACTIVE" : "STANDBY"}</div>
          <div className="text-lg font-bold drop-shadow-md">{isPlaying ? "♪ LOFI STREAM" : "NO SIGNAL"}</div>
        </div>
      </div>

      {/* --- CONTROLES --- */}
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