import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "../ThemeContext";
import restaurantData from "../data/restaurant.json";

function WelcomePage() {
  const { theme, colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log('🔥 Restaurant Data:', restaurantData);
  }, []);

  const randomImage = useMemo(() => {
    const images = restaurantData.heroImages || ['/images/fallback.png'];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [windowWidth]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const styles = {
    // ✅ UMBENANNT: container → section (äußerer Container)
    section: {
      minHeight: '100vh',
      backgroundColor: colors.primary,  // ← background → backgroundColor
      padding: isMobile ? "80px 20px 60px" : isTablet ? "100px 40px 80px" : "120px 60px 100px",  // ← Padding wie MenuSection
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.4s ease',
    },
    gridPattern: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `
        linear-gradient(${colors.gridPattern} 1px, transparent 1px),
        linear-gradient(90deg, ${colors.gridPattern} 1px, transparent 1px)
      `,
      backgroundSize: isMobile ? '30px 30px' : '50px 50px',
      transform: isDesktop 
        ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` 
        : 'translate(0, 0)',
      transition: 'transform 0.3s ease-out',
    },
    floatingElement: {
      position: 'absolute',
      width: isMobile ? '300px' : isTablet ? '400px' : '500px',
      height: isMobile ? '300px' : isTablet ? '400px' : '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,102,0,0.15) 0%, transparent 70%)',
      filter: isMobile ? 'blur(60px)' : 'blur(100px)',
      animation: 'float 8s ease-in-out infinite',
      top: isMobile ? '10%' : '20%',
      right: isMobile ? '-20%' : '10%',
      pointerEvents: 'none',
    },
    // ✅ UMBENANNT: content → container (innerer Container)
    container: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      padding: '0',  // ← Kein Padding mehr (jetzt in section)
      maxWidth: '1400px',
      width: '100%',
      margin: '0 auto',  // ← Hinzugefügt (wie MenuSection)
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    superText: {
      fontSize: isMobile ? '0.7rem' : isTablet ? '0.85rem' : '0.95rem',
      color: colors.accent,
      letterSpacing: isMobile ? '3px' : '5px',
      textTransform: 'uppercase',
      fontWeight: 700,
      marginBottom: isMobile ? '15px' : '20px',
      opacity: 0.9,
    },
    heading: {
      fontSize: isMobile ? '2.5rem' : isTablet ? '4rem' : 'clamp(4rem, 10vw, 8rem)',
      fontWeight: 900,
      color: colors.text,
      lineHeight: 0.95,
      marginBottom: isMobile ? '10px' : '20px',
      textTransform: 'uppercase',
      letterSpacing: isMobile ? '-1px' : isTablet ? '-2px' : '-3px',
      position: 'relative',
      display: 'inline-block',
      transition: 'color 0.4s ease',
    },
    headingOutline: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      color: 'transparent',
      WebkitTextStroke: isMobile 
        ? `1px ${theme === 'dark' ? 'rgba(255,102,0,0.3)' : 'rgba(255,102,0,0.2)'}` 
        : `2px ${theme === 'dark' ? 'rgba(255,102,0,0.3)' : 'rgba(255,102,0,0.2)'}`,
      zIndex: -1,
    },
    subheading: {
      fontSize: isMobile ? '2rem' : isTablet ? '3.5rem' : 'clamp(3rem, 6vw, 5rem)',
      fontWeight: 900,
      background: colors.accentGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textTransform: 'uppercase',
      letterSpacing: isMobile ? '-1px' : '-2px',
      marginBottom: isMobile ? '20px' : '30px',
    },
    description: {
      fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem',
      color: colors.textSecondary,
      maxWidth: isMobile ? '100%' : isTablet ? '500px' : '600px',
      margin: isMobile ? '0 auto 35px' : '0 auto 50px',
      lineHeight: 1.7,
      padding: isMobile ? '0 10px' : '0',
      transition: 'color 0.4s ease',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '10px' : '15px',
      background: colors.accentGradient,
      color: '#fff',
      border: 'none',
      padding: isMobile ? '16px 35px' : isTablet ? '18px 45px' : '20px 50px',
      fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
      fontWeight: 700,
      letterSpacing: isMobile ? '1px' : '2px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      marginBottom: isMobile ? '50px' : '70px',
      boxShadow: hover 
        ? '0 20px 60px rgba(255,102,0,0.6)' 
        : '0 15px 50px rgba(255,102,0,0.4)',
      transform: hover && !isMobile ? 'translateY(-3px)' : 'translateY(0)',
      width: isMobile ? 'calc(100% - 40px)' : 'auto',
      maxWidth: isMobile ? '320px' : 'none',
    },
    arrow: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      transition: 'transform 0.3s ease',
      transform: hover ? 'translateX(10px)' : 'translateX(0)',
    },
    imageContainer: {
      position: 'relative',
      marginTop: isMobile ? '0' : isTablet ? '0' : '0',
      marginBottom: isMobile ? '40px' : isTablet ? '50px' : '60px',
      display: 'block',
      width: '100%',
      maxWidth: isMobile ? '100%' : isTablet ? '500px' : '700px',
    },
    heroImage: {
      maxWidth: '100%',
      width: '100%',
      height: 'auto',
      display: 'block',
      filter: isMobile 
        ? 'drop-shadow(0 20px 40px rgba(255,102,0,0.3))' 
        : 'drop-shadow(0 30px 80px rgba(255,102,0,0.4))',
      transform: isMobile 
        ? `scale(${hover ? 1.03 : 1})`
        : isTablet
        ? `perspective(1000px) scale(${hover ? 1.05 : 1})`
        : `
          perspective(1000px) 
          rotateX(${mousePosition.y * 0.3}deg) 
          rotateY(${mousePosition.x * 0.3}deg)
          scale(${hover ? 1.05 : 1})
        `,
      transition: 'transform 0.3s ease-out',
    },
    socialProof: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '30px' : isTablet ? '50px' : '60px',
      marginTop: isMobile ? '0' : '0',
      flexWrap: 'wrap',
      padding: isMobile ? '0 10px' : '0',
    },
    proofItem: {
      textAlign: 'center',
      flex: isMobile ? '1 1 auto' : 'none',
      minWidth: isMobile ? '80px' : 'auto',
    },
    proofNumber: {
      fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
      fontWeight: 900,
      color: colors.text,
      marginBottom: '5px',
      lineHeight: 1,
      transition: 'color 0.4s ease',
    },
    proofLabel: {
      fontSize: isMobile ? '0.65rem' : '0.75rem',
      color: colors.textTertiary,
      letterSpacing: isMobile ? '1px' : '2px',
      textTransform: 'uppercase',
      transition: 'color 0.4s ease',
    },
  };

  useEffect(() => {
    if (!document.getElementById('hero-animation')) {
      const style = document.createElement('style');
      style.id = 'hero-animation';
      style.innerHTML = `
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, -50px); }
        }

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 768px) {
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-20px, -20px); }
          }
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    // ✅ GEÄNDERT: div → section + neuer Style-Name
    <section style={styles.section}>
      <div style={styles.gridPattern}></div>
      <div style={styles.floatingElement}></div>
      
      {/* ✅ GEÄNDERT: content → container */}
      <div style={styles.container}>
        <div style={styles.superText}>{restaurantData.tagline}</div>
        
        <h1 style={styles.heading}>
          Erlebe Den
          <div style={styles.headingOutline}>Erlebe Den</div>
        </h1>
        
        <div style={styles.subheading}>{restaurantData.slogan.split(' ').pop()}</div>
        
        <p style={styles.description}>
          {isMobile 
            ? restaurantData.description.short
            : restaurantData.description.long
          }
        </p>
        
        <button
          style={styles.ctaButton}
          onMouseEnter={() => !isMobile && setHover(true)}
          onMouseLeave={() => !isMobile && setHover(false)}
          onTouchStart={() => setHover(true)}
          onTouchEnd={() => setHover(false)}
        >
          {restaurantData.cta.primary}
          <span style={styles.arrow}>→</span>
        </button>

        <div 
          style={styles.imageContainer}
          onMouseEnter={() => !isMobile && setHover(true)}
          onMouseLeave={() => !isMobile && setHover(false)}
        >
          <img 
            src={randomImage} 
            alt="Asiatische Spezialitäten" 
            style={styles.heroImage}
            loading="lazy"
          />
        </div>

        <div style={styles.socialProof}>
          <div style={styles.proofItem}>
            <div style={styles.proofNumber}>{restaurantData.stats.yearsExperience}+</div>
            <div style={styles.proofLabel}>
              {isMobile ? 'Jahre' : 'Jahre Erfahrung'}
            </div>
          </div>
          <div style={styles.proofItem}>
            <div style={styles.proofNumber}>{restaurantData.stats.freshIngredients}</div>
            <div style={styles.proofLabel}>
              {isMobile ? 'Frisch' : 'Frische Zutaten'}
            </div>
          </div>
          <div style={styles.proofItem}>
            <div style={styles.proofNumber}>{restaurantData.stats.rating}★</div>
            <div style={styles.proofLabel}>
              {isMobile ? 'Bewertung' : restaurantData.stats.ratingLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;