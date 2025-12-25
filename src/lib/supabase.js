import { createClient } from '@supabase/supabase-js';

// Acessando as variáveis de ambiente de forma segura
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificação de Segurança: Garante que as chaves existem antes de tentar conectar
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ ERRO CRÍTICO: Chaves do Supabase não encontradas no .env.local');
}

// Cria a conexão única (Singleton)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);