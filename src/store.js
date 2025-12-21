import { create } from 'zustand'

export const useStore = create((set) => ({
  // --- TEMA (Dark Mode) ---
  isDarkMode: false, // Começa no Light Mode
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // --- USUÁRIO (Login) ---
  user: null,
  setUser: (name) => set({ user: name }),
  
  // --- PLAYER ---
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  volume: 50,
  setVolume: (val) => set({ volume: val }),

  // --- CHAT ---
  chatMessages: [
    { id: 1, user: "System", text: "Boot sequence complete." },
    { id: 2, user: "RetroBot", text: "Ready for audio Input." },
  ],
  addChatMessage: (msg) => set((state) => ({ 
    chatMessages: [...state.chatMessages, msg] 
  })),
}))