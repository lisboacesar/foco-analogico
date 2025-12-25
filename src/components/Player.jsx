import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { Play, Pause, SkipBack, SkipForward, List, Disc, X, Tv } from "lucide-react";
import { supabase } from '../supabaseClient';

// --- IMPORTS DOS GIFS (1 ao 25) ---
import gif1 from '../videos/bg1.gif';
import gif2 from '../videos/bg2.gif';
import gif3 from '../videos/bg3.gif';
import gif4 from '../videos/bg4.gif';
import gif5 from '../videos/bg5.gif';
import gif6 from '../videos/bg6.gif';
import gif7 from '../videos/bg7.gif';
import gif8 from '../videos/bg8.gif';
import gif9 from '../videos/bg9.gif';
import gif10 from '../videos/bg10.gif';
import gif11 from '../videos/bg11.gif';
import gif12 from '../videos/bg12.gif';
import gif13 from '../videos/bg13.gif';
import gif14 from '../videos/bg14.gif';
import gif15 from '../videos/bg15.gif';
import gif16 from '../videos/bg16.gif';
import gif17 from '../videos/bg17.gif';
import gif18 from '../videos/bg18.gif';
import gif19 from '../videos/bg19.gif';
import gif20 from '../videos/bg20.gif';
import gif21 from '../videos/bg21.gif';
import gif22 from '../videos/bg22.gif';
import gif23 from '../videos/bg23.gif';
import gif24 from '../videos/bg24.gif';
import gif25 from '../videos/bg25.gif';

const backgroundMap = {
  1: gif1, 2: gif2, 3: gif3, 4: gif4, 5: gif5,
  6: gif6, 7: gif7, 8: gif8, 9: gif9, 10: gif10,
  11: gif11, 12: gif12, 13: gif13, 14: gif14, 15: gif15,
  16: gif16, 17: gif17, 18: gif18, 19: gif19, 20: gif20,
  21: gif21, 22: gif22, 23: gif23, 24: gif24, 25: gif25
};

export const Player = () => {
  const { isPlaying, togglePlay, volume, setVolume, currentVideo, setVideo } = useStore();
  const audioRef = useRef(null);

  // --- ESTADOS DO PLAYER ---
  const [allSongs, setAllSongs] = useState([]); 
  const [playlist, setPlaylist] = useState([]); 
  const [currentSongIndex, setCurrentSongIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  // --- ESTADOS DA INTERFACE ---
  const [activeMenu, setActiveMenu] = useState(null); // 'playlist' | 'visuals' | null
  const [activeFilter, setActiveFilter] = useState('todos'); 
  const [viewMode, setViewMode] = useState('visualizer'); 

  // 1. BUSCAR MÚSICAS NO SUPABASE
  useEffect(() => {
    async function buscarMusicas() {
      const { data, error } = await supabase.from('vinyls').select('*').order('id', { ascending: true });

      if (error) {
        console.error("Erro ao buscar músicas:", error);
      } else {
        setAllSongs(data);
        setPlaylist(data);
      }
      setLoading(false);
    }
    buscarMusicas();
  }, []);

  // 2. FUNÇÃO DE FILTRAR
  const filtrarMusicas = (filtro) => {
    setActiveFilter(filtro);
    setCurrentSongIndex(0); 
    
    if (filtro === 'todos') {
      setPlaylist(allSongs);
    } else {
      const filtradas = allSongs.filter(musica => musica.genre === filtro);
      setPlaylist(filtradas);
    }
  };

  // 3. CONTROLE DE PLAY/PAUSE
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        setTimeout(() => {
            audioRef.current.play().catch(e => console.error("Erro ao tocar:", e));
        }, 150);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, playlist]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume / 100; }, [volume]);

  // NAVEGAÇÃO
  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };
  
  const playSpecificSong = (index) => {
    setCurrentSongIndex(index);
    if (!isPlaying) togglePlay();
  };

  const handleSelectVisual = (id) => {
    setVideo(id);
    // setActiveMenu(null); // Descomente se quiser fechar o menu ao clicar
  };

  const currentSong = playlist[currentSongIndex];

  return (
    <div className="flex flex-col h-full gap-6 relative">
      
      <audio 
        ref={audioRef} 
        src={currentSong?.audio_url || ""} 
        crossOrigin="anonymous" 
        onEnded={handleNext} 
      />

      {/* --- DISPLAY (TELA DA TV) --- */}
      <div className="relative w-full aspect-[4/3] bg-black rounded-md overflow-hidden border-4 border-gray-800 shadow-2xl group">
        
        {/* MODO VISUALIZER (GIF) */}
        {viewMode === 'visualizer' && (
           <img 
             key={currentVideo}
             src={backgroundMap[currentVideo] || backgroundMap[1]} 
             alt="Visualizer"
             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-60' : 'opacity-20 grayscale'}`}
           />
        )}

        {/* MODO CAPA DO ÁLBUM */}
        {viewMode === 'cover' && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                {currentSong?.cover_url ? (
                  <img src={currentSong.cover_url} alt="Cover" className="w-full h-full object-contain p-2 shadow-lg animate-in fade-in" />
                ) : (
                  <div className="text-gray-600 font-mono text-xs">NO COVER ART</div>
                )}
            </div>
        )}

        {/* EFEITOS RETRO */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Transparent_pixel_art.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,2px_100%] pointer-events-none z-10 opacity-40"></div>

        {/* --- MENU OVERLAY: PLAYLIST --- */}
        {activeMenu === 'playlist' && (
          <div className="absolute inset-0 bg-black/95 z-50 flex flex-col p-4 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
             
             <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
                <h3 className="text-neon text-xs font-bold tracking-widest text-orange-400">SELECT GENRE</h3>
                <button onClick={() => setActiveMenu(null)} className="hover:bg-white/10 p-1 rounded transition-colors">
                    <X size={20} className="text-white hover:text-red-500"/>
                </button>
             </div>
             
             {/* Filtros */}
             <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {['todos', 'phonk', '8bits', 'retro', 'codar'].map(filtro => (
                    <button 
                        key={filtro} 
                        onClick={() => filtrarMusicas(filtro)} 
                        className={`px-3 py-1 text-[10px] font-bold rounded border whitespace-nowrap uppercase 
                        ${activeFilter === filtro ? 'bg-orange-500 text-black border-orange-500' : 'bg-transparent text-gray-400 border-gray-700'}`}
                    >
                        {filtro}
                    </button>
                ))}
             </div>

             {/* Lista */}
             <div className="overflow-y-auto flex-1 space-y-1 pr-2 custom-scrollbar">
                {playlist.length > 0 ? (
                    playlist.map((song, idx) => (
                      <div 
                        key={song.id} 
                        onClick={() => playSpecificSong(idx)}
                        className={`p-2 text-xs font-mono cursor-pointer border-l-2 hover:bg-white/10 transition-all truncate
                          ${idx === currentSongIndex ? 'border-orange-500 text-orange-400 bg-white/5' : 'border-transparent text-gray-400'}`}
                      >
                        {idx + 1}. {song.title} <span className="opacity-50 text-[10px] ml-1"> // {song.artist}</span>
                      </div>
                    ))
                ) : (
                    <div className="text-gray-600 text-xs text-center mt-10">NO TRACKS FOUND</div>
                )}
             </div>
          </div>
        )}

        {/* --- MENU OVERLAY: GALERIA DE GIFS (VISUALS) --- */}
        {activeMenu === 'visuals' && (
          <div className="absolute inset-0 bg-black/95 z-50 flex flex-col p-4 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
             <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
                <h3 className="text-neon text-xs font-bold tracking-widest text-blue-400">TV CHANNELS</h3>
                <button onClick={() => setActiveMenu(null)} className="hover:bg-white/10 p-1 rounded transition-colors">
                    <X size={20} className="text-white hover:text-red-500"/>
                </button>
             </div>

             <div className="overflow-y-auto flex-1 custom-scrollbar pr-2">
                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pb-4">
                    {Array.from({ length: 25 }, (_, i) => i + 1).map((id) => (
                        <button 
                            key={id}
                            onClick={() => handleSelectVisual(id)}
                            className={`relative aspect-video rounded border-2 overflow-hidden group transition-all
                                ${currentVideo === id ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-gray-800 hover:border-white/50'}
                            `}
                        >
                            <img 
                                src={backgroundMap[id]} 
                                alt={`BG ${id}`}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono shadow-sm">
                                {id.toString().padStart(2, '0')}
                            </span>
                        </button>
                    ))}
                 </div>
             </div>
          </div>
        )}

        {/* INFO NA TELA (Esquerda - só aparece se nenhum menu estiver aberto) */}
        {!activeMenu && (
          <div className="absolute top-4 left-4 z-30 font-mono text-neon w-full pr-16 pointer-events-none">
            <div className="text-[10px] font-bold opacity-80 mb-1 tracking-widest text-orange-300">
               CH: {currentVideo} // {activeFilter.toUpperCase()} // {isPlaying ? "PLAY" : "STOP"}
            </div>
            
            <div className="text-lg font-bold drop-shadow-md truncate max-w-[90%] text-white">
              {loading ? "LOADING..." : (currentSong?.title || "NO DISC")}
            </div>
            
            <div className="text-xs opacity-70 truncate text-gray-300">
               {currentSong?.artist || "INSERT CASSETTE"}
            </div>
          </div>
        )}
      </div>

      {/* --- BOTÕES INFERIORES (AGORA SÃO 6 COLUNAS PARA INCLUIR A TV) --- */}
      <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-2 items-center">
            {/* 1. PLAYLIST */}
            <button 
                onClick={() => setActiveMenu(activeMenu === 'playlist' ? null : 'playlist')} 
                className={`ko-key h-14 flex items-center justify-center transition-all ${activeMenu === 'playlist' ? 'ko-key-orange' : 'ko-key-gray'}`}
                title="Playlist"
            >
                <List size={18} />
            </button>

            {/* 2. TV / BACKGROUNDS (NOVO LUGAR - BEM VISÍVEL) */}
            <button 
                onClick={() => setActiveMenu(activeMenu === 'visuals' ? null : 'visuals')} 
                className={`ko-key h-14 flex items-center justify-center transition-all ${activeMenu === 'visuals' ? 'ko-key-blue' : 'ko-key-gray'}`}
                title="Visuals"
            >
                <Tv size={18} />
            </button>

            {/* 3. ANTERIOR */}
            <button onClick={handlePrev} className="ko-key ko-key-gray h-14 flex items-center justify-center active:translate-y-1 transition-transform">
                <SkipBack size={18} />
            </button>
            
            {/* 4. PLAY/PAUSE (Maior destaque) */}
            <button onClick={togglePlay} className="ko-key ko-key-orange h-16 -mt-2 shadow-lg z-10 flex items-center justify-center active:translate-y-1 transition-transform">
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            {/* 5. PRÓXIMO */}
            <button onClick={handleNext} className="ko-key ko-key-gray h-14 flex items-center justify-center active:translate-y-1 transition-transform">
                <SkipForward size={18} />
            </button>
            
            {/* 6. MODO DE VISUALIZAÇÃO (CAPA/GIF) */}
            <button onClick={() => setViewMode(viewMode === 'visualizer' ? 'cover' : 'visualizer')} className="ko-key ko-key-gray h-14 flex items-center justify-center active:translate-y-1 transition-transform">
                <Disc size={18} className={viewMode === 'cover' ? 'text-orange-500' : 'text-gray-600'} />
            </button>
          </div>

          <div className="flex items-center gap-4 px-2 bg-black/20 p-2 rounded-lg border border-white/5">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vol</div>
            <input 
              type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)}
              className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
      </div>
    </div>
  );
};