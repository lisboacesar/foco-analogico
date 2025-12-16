import { create } from 'zustand';

export const useStore = create((set) => ({
  // Estado do Player
  isPlaying: false,
  volume: 0.5,
  currentTrackIndex: 0,
  tracks: [
    { title: "Study Session 01", artist: "Analog Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Deep Focus Tape", artist: "LoFi Lab", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  ],
  
  // Ações do Player
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (vol) => set({ volume: vol }),
  nextTrack: () => set((state) => ({ 
    currentTrackIndex: (state.currentTrackIndex + 1) % state.tracks.length,
    isPlaying: true 
  })),
  prevTrack: () => set((state) => ({ 
    currentTrackIndex: (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length,
    isPlaying: true 
  })),

  // Estado do Chat (Simulação)
  messages: [
    { id: 1, user: "System", text: "Conexão estabelecida. 1200 baud.", time: "12:00" },
    { id: 2, user: "Alex", text: "Alguém estudando física?", time: "12:02" },
  ],
  addMessage: (text) => set((state) => ({
    messages: [...state.messages, { 
      id: Date.now(), 
      user: "Guest_" + Math.floor(Math.random() * 99), 
      text, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }]
  }))
}));