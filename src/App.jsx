import { Player } from './components/Player';
import { Chat } from './components/Chat';

function App() {
  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">

      {/* --- HEADER --- */}
      <header className="mb-12 text-center space-y-6">
        {/* Título com fonte Arcade e sombra dura */}
        <h1 className="text-3xl md:text-5xl font-display text-retro-accent leading-tight"
            style={{ textShadow: '4px 4px 0px #1A1A1A' }}>
          FOCO ANALOGICO
        </h1>
        
        {/* Subtítulo estilo "etiqueta" */}
        <div className="inline-block bg-retro-dark text-retro-terminal px-4 py-2 font-mono text-xs md:text-sm shadow-hard-sm tracking-wider">
          ESTAÇÃO DE FOCO DE BAIXA FREQUÊNCIA // V1.0
        </div>
      </header>

      {/* --- GRID PRINCIPAL (O Console) --- */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-6xl items-start">

        {/* MÓDULO 1: PLAYER (Caixa Cinza) */}
        <div className="bg-retro-case border-4 border-retro-dark p-6 shadow-hard relative">
          {/* Parafusos Decorativos nos cantos */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>

          <div className="mb-6 text-center font-display text-[10px] text-retro-dark opacity-50 uppercase tracking-widest">
            Stereo Audio System
          </div>
          
          {/* Aqui vai o player (ainda vamos estilizar ele por dentro) */}
          <Player />
        </div>

        {/* MÓDULO 2: CHAT (Caixa Cinza) */}
        <div className="bg-retro-case border-4 border-retro-dark p-6 shadow-hard relative">
          {/* Parafusos Decorativos */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-retro-dark opacity-40"></div>
          
          <div className="mb-6 text-center font-display text-[10px] text-retro-dark opacity-50 uppercase tracking-widest">
            Net-Link 56k Terminal
          </div>

          {/* Aqui vai o chat (ainda vamos estilizar ele por dentro) */}
          <Chat />
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="mt-16 text-center font-mono text-xs opacity-40 uppercase">
        © 198X Analog Systems Corp. // All rights reserved.
      </footer>
    </div>
  );
}

export default App;