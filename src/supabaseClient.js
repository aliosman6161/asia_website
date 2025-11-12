import { createClient } from '@supabase/supabase-js';

// ✅ Funktioniert LOKAL (.env.local) UND auf NETLIFY (Netlify Extension)
const supabaseUrl = 
  process.env.REACT_APP_SUPABASE_URL ||     // Lokal mit REACT_APP_ prefix
  process.env.SUPABASE_URL;                  // Netlify Extension (ohne prefix)

const supabaseAnonKey = 
  process.env.REACT_APP_SUPABASE_ANON_KEY || // Lokal
  process.env.SUPABASE_ANON_KEY ||           // Netlify Extension
  process.env.SUPABASE_KEY;                  // Alternative Name

// ✅ Debug-Ausgabe (hilft beim Troubleshooting)
console.log('🔍 Supabase Config Check:');
console.log('URL:', supabaseUrl ? '✅ vorhanden' : '❌ fehlt');
console.log('Key:', supabaseAnonKey ? '✅ vorhanden' : '❌ fehlt');

// ✅ Fallback für Entwicklung (OPTIONAL - nur wenn du es temporär direkt eintragen willst)
/*
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Env Vars fehlen - nutze Fallback (NUR FÜR ENTWICKLUNG!)');
  const supabaseUrl = 'https://deinprojekt.supabase.co';
  const supabaseAnonKey = 'eyJhbG...';
}
*/

// ✅ Error wenn Credentials fehlen
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Supabase credentials fehlen!\n' +
    'Erstelle .env.local mit:\n' +
    'REACT_APP_SUPABASE_URL=https://xxx.supabase.co\n' +
    'REACT_APP_SUPABASE_ANON_KEY=eyJ...'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('✅ Supabase Client erfolgreich initialisiert');