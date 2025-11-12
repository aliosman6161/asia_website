import React, { useState, useEffect } from 'react';
import { Shield, Database, Cookie, Mail, Lock, Eye } from 'lucide-react';
import { useTheme } from '../ThemeContext';

function Datenschutz() {
  const { colors } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: colors.sectionAlt,
      padding: isMobile ? '80px 20px' : isTablet ? '100px 40px' : '120px 60px',
      fontFamily: "'Raleway', sans-serif",
      transition: 'background 0.4s ease',
    },
    
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%',
    },
    
    header: {
      marginBottom: isMobile ? '30px' : '40px',
    },
    
    title: {
      fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
      fontWeight: 900,
      color: colors.text,
      marginBottom: '15px',
      letterSpacing: '-1px',
      transition: 'color 0.4s ease',
    },
    
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: colors.textSecondary,
      lineHeight: 1.7,
      transition: 'color 0.4s ease',
    },
    
    lastUpdate: {
      fontSize: '0.85rem',
      color: colors.textTertiary,
      marginTop: '10px',
      fontStyle: 'italic',
    },
    
    content: {
      background: colors.secondary,
      borderRadius: '20px',
      padding: isMobile ? '25px' : isTablet ? '35px' : '45px',
      border: `1px solid ${colors.border}`,
      marginBottom: '30px',
    },
    
    section: {
      marginBottom: '35px',
    },
    
    sectionTitle: {
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      fontWeight: 700,
      color: colors.text,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'color 0.4s ease',
    },
    
    sectionIcon: {
      color: colors.accent,
    },
    
    subsectionTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 600,
      color: colors.text,
      marginTop: '25px',
      marginBottom: '15px',
      transition: 'color 0.4s ease',
    },
    
    paragraph: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: colors.textSecondary,
      lineHeight: 1.8,
      marginBottom: '15px',
      transition: 'color 0.4s ease',
    },
    
    list: {
      listStyle: 'none',
      padding: 0,
      margin: '15px 0',
    },
    
    listItem: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: colors.textSecondary,
      lineHeight: 1.8,
      marginBottom: '10px',
      paddingLeft: '25px',
      position: 'relative',
      transition: 'color 0.4s ease',
    },
    
    bullet: {
      position: 'absolute',
      left: '0',
      top: '8px',
      width: '6px',
      height: '6px',
      backgroundColor: colors.accent,
      borderRadius: '50%',
    },
    
    strong: {
      color: colors.text,
      fontWeight: 600,
    },
    
    divider: {
      borderBottom: `1px solid ${colors.border}`,
      margin: '30px 0',
    },
    
    infoBox: {
      background: colors.primary,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
    },
    
    link: {
      color: colors.accent,
      textDecoration: 'none',
      borderBottom: `1px solid ${colors.accent}`,
      transition: 'opacity 0.3s ease',
      cursor: 'pointer',
    },
  };


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Datenschutzerklärung</h1>
          <p style={styles.subtitle}>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          </p>
          <p style={styles.lastUpdate}>
            Stand: Januar 2025
          </p>
        </header>

        <div style={styles.content}>
          {/* Übersicht */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Shield size={20} style={styles.sectionIcon} />
              1. Übersicht
            </h2>
            <p style={styles.paragraph}>
              Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung 
              von personenbezogenen Daten auf unserer Website auf. Wir behandeln Ihre personenbezogenen 
              Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </section>

          {/* Verantwortlicher */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              2. Verantwortlicher
            </h2>
            <div style={styles.infoBox}>
              <p style={styles.paragraph}>
                <strong style={styles.strong}>AsianTaste Restaurant</strong><br />
                [Name des Inhabers]<br />
                [Straße und Hausnummer]<br />
                [PLZ] [Stadt]<br />
                E-Mail: [datenschutz@asiantaste.de]<br />
                Telefon: [+49 XXX XXXXXXX]
              </p>
            </div>
          </section>

          {/* Datenerfassung */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Database size={20} style={styles.sectionIcon} />
              3. Datenerfassung auf unserer Website
            </h2>
            
            <h3 style={styles.subsectionTitle}>3.1 Server-Log-Dateien</h3>
            <p style={styles.paragraph}>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                Browsertyp und Browserversion
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                Verwendetes Betriebssystem
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                Referrer URL
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                Hostname des zugreifenden Rechners
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                Uhrzeit der Serveranfrage
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                IP-Adresse
              </li>
            </ul>
            
            <h3 style={styles.subsectionTitle}>3.2 Kontaktformular</h3>
            <p style={styles.paragraph}>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h3 style={styles.subsectionTitle}>3.3 Speicherdauer</h3>
            <p style={styles.paragraph}>
              Wir löschen Ihre personenbezogenen Daten, sobald sie für die Erreichung des Zweckes ihrer 
              Erhebung nicht mehr erforderlich sind. Die Daten werden gelöscht, sobald sie für die 
              Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
            </p>
          </section>

          {/* Cookies */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Cookie size={20} style={styles.sectionIcon} />
              4. Cookies
            </h2>
            <p style={styles.paragraph}>
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf 
              Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, 
              effektiver und sicherer zu machen.
            </p>
            <p style={styles.paragraph}>
              <strong style={styles.strong}>Technisch notwendige Cookies:</strong> Diese Cookies sind 
              notwendig, damit unsere Website funktioniert.
            </p>
            <p style={styles.paragraph}>
              <strong style={styles.strong}>Funktionale Cookies:</strong> Diese Cookies speichern Ihre 
              Präferenzen wie z.B. die gewählte Sprache oder das Theme (Hell/Dunkel Modus).
            </p>
          </section>

          {/* Externe Dienste */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Eye size={20} style={styles.sectionIcon} />
              5. Externe Dienste
            </h2>
            
            <h3 style={styles.subsectionTitle}>5.1 Supabase</h3>
            <p style={styles.paragraph}>
              Wir nutzen Supabase als Datenbank-Service für unsere Speisekarte und andere Inhalte. 
              Supabase ist ein Open-Source Backend-as-a-Service Anbieter. Die Server befinden sich in der EU.
            </p>
            
            <h3 style={styles.subsectionTitle}>5.2 Google Maps</h3>
            <p style={styles.paragraph}>
              Wir nutzen Google Maps für die Darstellung unseres Standorts. Bei der Nutzung von Google Maps 
              werden von Google auch Daten über die Nutzung der Maps-Funktionen durch Besucher erhoben.
            </p>
          </section>

          <div style={styles.divider}></div>

          {/* Ihre Rechte */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Lock size={20} style={styles.sectionIcon} />
              6. Ihre Rechte
            </h2>
            <p style={styles.paragraph}>
              Sie haben jederzeit das Recht:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                <strong style={styles.strong}>Auskunft</strong> über Ihre bei uns gespeicherten Daten zu erhalten
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                <strong style={styles.strong}>Berichtigung</strong> unrichtiger personenbezogener Daten
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                <strong style={styles.strong}>Löschung</strong> Ihrer bei uns gespeicherten Daten
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                <strong style={styles.strong}>Einschränkung</strong> der Datenverarbeitung
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                <strong style={styles.strong}>Datenübertragbarkeit</strong> Ihrer Daten
              </li>
              <li style={styles.listItem}>
                <span style={styles.bullet}></span>
                <strong style={styles.strong}>Widerspruch</strong> gegen die Verarbeitung Ihrer Daten
              </li>
            </ul>
          </section>

          {/* Kontakt */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Mail size={20} style={styles.sectionIcon} />
              7. Kontakt bei Datenschutzfragen
            </h2>
            <p style={styles.paragraph}>
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, 
              bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
            </p>
            <div style={styles.infoBox}>
              <p style={styles.paragraph}>
                E-Mail: <a href="mailto:[datenschutz@asiantaste.de]" style={styles.link}>[datenschutz@asiantaste.de]</a><br />
                Telefon: [+49 XXX XXXXXXX]
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Datenschutz;