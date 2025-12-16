import { Player } from './components/Player';
import { Chat } from './components/Chat';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center gap-12">
      
      {/* Header / Logo */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-retro-dark border-b-4 border-retro-dark pb-2 inline-block">
          Foco Analogico
        </h1>
        <p className="font-mono text-sm md:text-base opacity-70 tracking-tight">
          ESTAÇÃO DE FOCO DE BAIXA FREQUÊNCIA // V1.0
        </p>
      </header>

      {/* Main Grid */}
      <main className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl justify-center items-start">
        
        {/* Lado Esquerdo: Player */}
        <div className="flex-1 w-full flex flex-col items-center gap-6">
          <div className="bg-retro-surface/50 p-4 border-2 border-dashed border-retro-dark/30 rounded w-full max-w-md text-center text-xs font-mono opacity-70">
             INSIRA O CARTUCHO DE ÁUDIO PARA INICIAR
          </div>
          <Player />
          
          <div className="w-full max-w-md text-justify font-mono text-xs opacity-60 leading-relaxed">
            * O sistema opera em loop contínuo. Ruídos estáticos são intencionais para simular hardware vintage.
            Mantenha o foco. Desconecte distrações externas.
          </div>
        </div>

        {/* Lado Direito: Chat */}
        <div className="flex-1 w-full flex justify-center">
          <Chat />
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs font-mono opacity-40 uppercase">
        © 198X Analog Systems Corp. // All rights reserved.
      </footer>
    </div>
  );
}

export default App;