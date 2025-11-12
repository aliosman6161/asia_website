import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function SupabaseTest() {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
    // eslint-disable-next-line
  }, []);

  const testConnection = async () => {
    setStatus('loading');
    setError(null);
    
    console.log('🔍 Teste Supabase Verbindung...');
    
    try {
      // ✅ NEU: Menu Categories statt about_hero
      const { data, error } = await supabase
        .from('menu_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      console.log('✅ Verbindung erfolgreich!');
      console.log('📊 Daten:', data);
      
      setData(data);
      setStatus('success');
      
    } catch (err) {
      console.error('❌ Fehler:', err.message);
      setError(err.message);
      setStatus('error');
    }
  };

  const styles = {
    container: {
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      border: '2px solid',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
    },
    loading: {
      borderColor: '#ffc107',
      background: '#fff9e6',
    },
    success: {
      borderColor: '#28a745',
      background: '#e8f5e9',
    },
    error: {
      borderColor: '#dc3545',
      background: '#ffebee',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: '1.2rem',
      marginTop: '20px',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    data: {
      background: 'white',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
    button: {
      padding: '12px 24px',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    info: {
      background: '#f8f9fa',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '0.9rem',
      marginTop: '10px',
    },
    categoryItem: {
      background: 'white',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '10px',
      border: '1px solid #ddd',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔌 Supabase Verbindungstest</h1>

      {status === 'loading' && (
        <div style={{...styles.card, ...styles.loading}}>
          <h2>⏳ Lädt...</h2>
          <p>Teste Datenbankverbindung...</p>
        </div>
      )}

      {status === 'error' && (
        <div style={{...styles.card, ...styles.error}}>
          <h2>❌ Verbindung fehlgeschlagen</h2>
          <p><strong>Fehler:</strong> {error}</p>
          
          <div style={styles.info}>
            <strong>Mögliche Lösungen:</strong>
            <ul>
              <li>Prüfe ob Tabelle "menu_categories" in Supabase existiert</li>
              <li>Prüfe Environment Variables (.env.local)</li>
              <li>Prüfe Row Level Security (sollte disabled sein)</li>
            </ul>
          </div>
        </div>
      )}

      {status === 'success' && data && (
        <div style={{...styles.card, ...styles.success}}>
          <h2>✅ Verbindung erfolgreich!</h2>
          
          <h3 style={styles.subtitle}>📊 Menu Kategorien ({data.length}):</h3>
          
          {data.map((category, index) => (
            <div key={category.id} style={styles.categoryItem}>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                {category.icon} <strong>{category.name}</strong>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {category.description}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>
                ID: {category.id} | Order: {category.sort_order}
              </div>
            </div>
          ))}

          <h3 style={styles.subtitle}>🔍 Raw Data:</h3>
          <div style={styles.data}>
            {JSON.stringify(data, null, 2)}
          </div>
        </div>
      )}

      <button style={styles.button} onClick={testConnection}>
        🔄 Erneut testen
      </button>
    </div>
  );
}

export default SupabaseTest;