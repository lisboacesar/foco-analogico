import React, { useEffect, useState } from 'react';
import { X, ExternalLink, HardDrive, Loader2 } from 'lucide-react'; // Ícones para dar o clima
import { supabase } from '../supabaseClient'; // Puxa a conexão

export function MediaSelector({ isOpen, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efeito sonoro/visual de "Mounting Disk"
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  async function fetchData() {
    setLoading(true);
    // Busca os dados da tabela 'dev_resources'
    const { data, error } = await supabase
      .from('dev_resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    // Fundo escuro com blur (Overlay)
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm font-mono">
      
      {/* Janela do "Sistema" */}
      <div className="w-full max-w-3xl border-2 border-[var(--text-secondary)] bg-[#1a1a1a] shadow-[0_0_20px_rgba(0,255,0,0.1)] rounded-sm flex flex-col max-h-[80vh]">
        
        {/* Barra de Título Retro */}
        <div className="bg-[var(--text-secondary)] text-black px-4 py-2 flex justify-between items-center font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <HardDrive size={18} />
            <span>A:\DATA_DISK_01</span>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-red-600 hover:text-white px-2 py-0.5 border border-black transition-colors"
          >
            [X] CLOSE
          </button>
        </div>

        {/* Corpo da Janela */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
          
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-[var(--btn-orange)] gap-4 opacity-80">
              <Loader2 size={48} className="animate-spin" />
              <span className="animate-pulse tracking-widest">READING SECTORS...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="border border-[var(--chassis-border)] bg-black/40 p-4 hover:border-[var(--btn-orange)] hover:bg-[var(--btn-orange)]/5 transition-all group relative">
                  
                  {/* Decoração Tech */}
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--text-secondary)] opacity-20 group-hover:bg-[var(--btn-orange)] group-hover:opacity-100 transition-all"></div>

                  <h3 className="text-[var(--text-primary)] font-bold text-lg mb-1 group-hover:text-[var(--btn-orange)]">
                    {item.title}
                  </h3>
                  
                  <div className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider border-b border-white/10 pb-2">
                    DIR: {item.category}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[var(--btn-orange)] border border-[var(--btn-orange)] px-3 py-1.5 hover:bg-[var(--btn-orange)] hover:text-black transition-colors uppercase font-bold"
                  >
                    EXECUTE <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé de Status */}
        <div className="border-t border-[var(--text-secondary)] p-2 bg-black text-[var(--text-secondary)] text-xs flex justify-between uppercase">
          <span>Files: {items.length}</span>
          <span>Status: MOUNTED</span>
        </div>

      </div>
    </div>
  );
}