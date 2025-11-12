import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, User, Building, FileText } from 'lucide-react';
import { useTheme } from '../ThemeContext';

function Impressum() {
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
      margin: 0,
    },
    
    listItem: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: colors.textSecondary,
      lineHeight: 1.8,
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      transition: 'color 0.4s ease',
    },
    
    listIcon: {
      color: colors.accent,
      marginTop: '4px',
      flexShrink: 0,
    },
    
    strong: {
      color: colors.text,
      fontWeight: 600,
    },
    
    divider: {
      borderBottom: `1px solid ${colors.border}`,
      margin: '30px 0',
    },
  };


  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <header style={styles.header}>
          <h1 style={styles.title}>Impressum</h1>
          <p style={styles.subtitle}>
            Angaben gemäß § 5 TMG
          </p>
        </header>

        <div style={styles.content}>
          {/* Betreiber */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Building size={20} style={styles.sectionIcon} />
              Betreiber
            </h2>
            <p style={styles.paragraph}>
              <strong style={styles.strong}>AsianTaste Restaurant</strong><br />
              [Firmenname/Inhaber Name]<br />
              [Rechtsform: GmbH/GbR/Einzelunternehmen]
            </p>
          </section>

          {/* Anschrift */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <MapPin size={20} style={styles.sectionIcon} />
              Anschrift
            </h2>
            <p style={styles.paragraph}>
              [Straße und Hausnummer]<br />
              [PLZ] [Stadt]<br />
              Deutschland
            </p>
          </section>

          {/* Kontakt */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Phone size={20} style={styles.sectionIcon} />
              Kontakt
            </h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Phone size={16} style={styles.listIcon} />
                <span><strong style={styles.strong}>Telefon:</strong> [+49 XXX XXXXXXX]</span>
              </li>
              <li style={styles.listItem}>
                <Mail size={16} style={styles.listIcon} />
                <span><strong style={styles.strong}>E-Mail:</strong> [info@asiantaste.de]</span>
              </li>
            </ul>
          </section>

          <div style={styles.divider}></div>

          {/* Registereintrag */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <FileText size={20} style={styles.sectionIcon} />
              Registereintrag
            </h2>
            <p style={styles.paragraph}>
              <strong style={styles.strong}>Handelsregister:</strong> [HRB XXXXX]<br />
              <strong style={styles.strong}>Registergericht:</strong> [Amtsgericht Stadt]<br />
              <strong style={styles.strong}>Umsatzsteuer-ID:</strong> [DE XXXXXXXXX]
            </p>
          </section>

          {/* Verantwortlich für Inhalt */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <User size={20} style={styles.sectionIcon} />
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p style={styles.paragraph}>
              [Vor- und Nachname]<br />
              [Anschrift wie oben]
            </p>
          </section>

          <div style={styles.divider}></div>

          {/* Haftungsausschluss */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Haftungsausschluss
            </h2>
            <p style={styles.paragraph}>
              <strong style={styles.strong}>Haftung für Inhalte:</strong> Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. 
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p style={styles.paragraph}>
              <strong style={styles.strong}>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Webseiten Dritter, 
              auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </section>

          {/* Urheberrecht */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Urheberrecht
            </h2>
            <p style={styles.paragraph}>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Impressum;