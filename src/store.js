import { create } from 'zustand'

export const useStore = create((set) => ({
  // --- ESTADO DO PLAYER ---
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  volume: 50,
  setVolume: (val) => set({ volume: val }),

  // --- ESTADO DO CHAT ---
  chatMessages: [
    { id: 1, user: "System", text: "Conexão estabelecida. 2400 baud." },
    { id: 2, user: "RetroBot", text: "Bem-vindo à estação de foco." },
    { id: 3, user: "Dev", text: "Sistema operacional... OK." }
  ],
  
  addChatMessage: (msg) => set((state) => ({ 
    chatMessages: [...state.chatMessages, msg] 
  })),
}))