import { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { Button } from './Button';

export const Player = () => {
  const { isPlaying, togglePlay, currentTrackIndex, tracks, nextTrack, prevTrack, volume, setVolume } = useStore();
  const audioRef = useRef(null);
  const track = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex, volume]);

  return (
    <div className="bg-retro-surface border-4 border-retro-dark p-6 rounded-sm shadow-hard max-w-md w-full relative">
      {/* Decorative Screws */}
      <div className="absolute top-2 left-2 w-3 h-3 border border-retro-dark rounded-full flex items-center justify-center"><div className="w-full h-[1px] bg-retro-dark rotate-45"></div></div>
      <div className="absolute top-2 right-2 w-3 h-3 border border-retro-dark rounded-full flex items-center justify-center"><div className="w-full h-[1px] bg-retro-dark rotate-45"></div></div>

      {/* Display LCD */}
      <div className="bg-retro-screen border-2 border-retro-dark p-4 mb-6 shadow-inner-hard font-display text-retro-dark/80">
        <div className="flex justify-between text-lg opacity-60 mb-1">
          <span>STEREO</span>
          <span>{isPlaying ? "PLAY" : "PAUSE"}</span>
        </div>
        <div className="text-3xl tracking-wide uppercase truncate">
          {track.title}
        </div>
        <div className="text-xl truncate opacity-75">
          {track.artist}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button onClick={prevTrack}><SkipBack size={20} /></Button>
        
        <Button onClick={togglePlay} variant="danger" className="w-16 h-16 rounded-full flex items-center justify-center border-4">
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </Button>

        <Button onClick={nextTrack}><SkipForward size={20} /></Button>
      </div>

      {/* Volume Slider Styling */}
      <div className="mt-6 flex items-center gap-3">
        <Volume2 size={18} />
        <input 
          type="range" 
          min="0" max="1" step="0.05" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-retro-dark h-2 bg-retro-dark/20 appearance-none cursor-pointer"
        />
      </div>

      <audio ref={audioRef} src={track.url} onEnded={nextTrack} />
    </div>
  );
};