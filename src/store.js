import { create } from 'zustand'

export const useStore = create((set) => ({
  // --- TEMA ---
  isDarkMode: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // --- USUÁRIO ---
  user: null,
  setUser: (name) => set({ user: name }),
  
  // --- PLAYER & VIDEO ---
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  volume: 50,
  setVolume: (val) => set({ volume: val }),
  
  // NOVO: Controle de Vídeo de Fundo
  currentVideo: 1, // Começa com o bg1.mp4
  setVideo: (id) => set({ currentVideo: id }), // Função para trocar

  // --- CHAT & TERMINAL ---
  chatMessages: [
    { id: 1, user: "System", text: "Boot sequence complete." },
    { id: 2, user: "RetroBot", text: "Ready for audio Input." },
  ],
  addChatMessage: (msg) => set((state) => ({ 
    chatMessages: [...state.chatMessages, msg] 
  })),
  clearChatMessages: () => set({ chatMessages: [] }),
}))