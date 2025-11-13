import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ← NEU
import { useTheme } from '../../ThemeContext';

function Footer() {
  const { colors } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: colors.primary,
      borderTop: `1px solid ${colors.border}`,
      padding: isMobile ? '30px 20px' : '40px 60px',
      fontFamily: "'Raleway', sans-serif",
      transition: 'all 0.4s ease',
    },
    
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    },
    
    minimalContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '15px' : '20px',
      textAlign: 'center',
    },
    
    minimalText: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: isMobile ? '10px' : '15px',
      color: colors.textSecondary,
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    
    link: {
      color: colors.textSecondary,
      textDecoration: 'none',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      padding: '5px',
    },
    
    linkHover: {
      color: colors.accent,
    },
    
    dot: {
      color: colors.textTertiary,
      fontSize: '0.7rem',
      userSelect: 'none',
    },
    
    copyright: {
      color: colors.textTertiary,
      fontSize: isMobile ? '0.8rem' : '0.85rem',
    },
  };

  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.minimalContainer}>
          <div style={styles.minimalText}>
            <span style={styles.copyright}>© {currentYear} AsianTaste</span>
            <span style={styles.dot}>•</span>
            <Link
              to="/impressum"
              style={
                hoveredLink === 'impressum'
                  ? { ...styles.link, ...styles.linkHover }
                  : styles.link
              }
              onMouseEnter={() => setHoveredLink('impressum')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Impressum
            </Link>
            <span style={styles.dot}>•</span>
            <Link
              to="/datenschutz"
              style={
                hoveredLink === 'datenschutz'
                  ? { ...styles.link, ...styles.linkHover }
                  : styles.link
              }
              onMouseEnter={() => setHoveredLink('datenschutz')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;