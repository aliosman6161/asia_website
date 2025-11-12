import { createClient } from '@supabase/supabase-js';

// ✅ Alle möglichen Namen prüfen
const supabaseUrl = 
  process.env.REACT_APP_SUPABASE_URL ||
  process.env.REACT_APP_SUPABASE_DATABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.SUPABASE_DATABASE_URL;

const supabaseAnonKey = 
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_KEY ||
  process.env.SUPABASE_KEY;

// ✅ Debug
console.log('🔍 Supabase Config Check:');
console.log('URL:', supabaseUrl || '❌ fehlt');
console.log('Key:', supabaseAnonKey ? '✅ (' + supabaseAnonKey.length + ' chars)' : '❌ fehlt');

// ✅ Zeige ALLE ENV vars die mit SUPABASE anfangen
const supabaseEnvVars = Object.keys(process.env).filter(key => key.includes('SUPABASE'));
console.log('Available SUPABASE vars:', supabaseEnvVars);
supabaseEnvVars.forEach(key => {
  console.log(`  ${key}: ${process.env[key] ? '✅ gesetzt' : '❌ leer'}`);
});

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase Client erfolgreich initialisiert');
} else {
  console.error('❌ Supabase credentials fehlen!');
  
  // ✅ Vollständiger Dummy-Client mit .single() support
  const dummyError = { message: '❌ Supabase nicht konfiguriert. Bitte REACT_APP_SUPABASE_URL und REACT_APP_SUPABASE_ANON_KEY in Netlify setzen.' };
  
  const dummyResponse = {
    data: null,
    error: dummyError,
  };
  
  const dummyQuery = {
    select: () => dummyQuery,
    insert: () => dummyQuery,
    update: () => dummyQuery,
    delete: () => dummyQuery,
    eq: () => dummyQuery,
    single: () => Promise.resolve(dummyResponse),
    then: (resolve) => resolve(dummyResponse),
  };
  
  supabase = {
    from: () => dummyQuery,
  };
  
  console.warn('⚠️ Dummy-Client aktiv - DB-Funktionen nicht verfügbar');
}

export { supabase };