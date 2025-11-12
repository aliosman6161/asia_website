import { createClient } from '@supabase/supabase-js';

// ✅ Netlify Extension mit REACT_APP_ Prefix
const supabaseUrl = 
  process.env.REACT_APP_SUPABASE_DATABASE_URL ||  // Netlify Extension nutzt DATABASE_URL
  process.env.REACT_APP_SUPABASE_URL ||           // Lokal
  process.env.SUPABASE_URL;                       // Fallback

const supabaseAnonKey = 
  process.env.REACT_APP_SUPABASE_ANON_KEY ||      // Netlify Extension + Lokal
  process.env.SUPABASE_ANON_KEY;                  // Fallback

console.log('🔍 Supabase Config Check:');
console.log('URL:', supabaseUrl ? '✅ vorhanden' : '❌ fehlt');
console.log('Key:', supabaseAnonKey ? '✅ vorhanden (Länge: ' + (supabaseAnonKey?.length || 0) + ')' : '❌ fehlt');

// ✅ Debug: Zeige alle SUPABASE env vars
console.log('Available SUPABASE vars:', 
  Object.keys(process.env)
    .filter(key => key.includes('SUPABASE'))
    .map(key => `${key}: ${process.env[key] ? '✅' : '❌'}`)
);

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase Client initialisiert');
} else {
  console.warn('⚠️ Supabase nicht konfiguriert - Website läuft trotzdem!');
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ 
        data: null, 
        error: { message: 'Supabase credentials fehlen' } 
      }),
    }),
  };
}

export { supabase };