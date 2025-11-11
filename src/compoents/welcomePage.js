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
    section: {
      backgroundColor: colors.primary,
      padding: isMobile ? "60px 20px" : isTablet ? "80px 40px" : "100px 60px",
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      transition: 'background 0.4s ease',
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: "'Raleway', sans-serif",
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
      pointerEvents: 'none',
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
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: isMobile ? '15px' : isTablet ? '20px' : '25px',
      textAlign: 'center',
    },
    superText: {
      // ✅ +0.3rem: 0.75→1.05, 0.9→1.2, 1→1.3
      fontSize: isMobile ? '1.05rem' : isTablet ? '1.2rem' : '1.3rem',
      color: colors.accent,
      letterSpacing: isMobile ? '3px' : '5px',
      textTransform: 'uppercase',
      fontWeight: 700,
      opacity: 0.9,
    },
    heading: {
      // ✅ +0.3rem: 2.2→2.5, 3.5→3.8, 4-7→4.3-7.3
      fontSize: isMobile ? '2.5rem' : isTablet ? '3.8rem' : 'clamp(4.3rem, 9vw, 7.3rem)',
      fontWeight: 900,
      color: colors.text,
      lineHeight: 0.95,
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
      // ✅ +0.3rem: 1.8→2.1, 3→3.3, 2.8-4.5→3.1-4.8
      fontSize: isMobile ? '2.1rem' : isTablet ? '3.3rem' : 'clamp(3.1rem, 5.5vw, 4.8rem)',
      fontWeight: 900,
      background: colors.accentGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textTransform: 'uppercase',
      letterSpacing: isMobile ? '-1px' : '-2px',
    },
    description: {
      // ✅ +0.3rem: 0.95→1.25, 1.05→1.35, 1.15→1.45
      fontSize: isMobile ? '1.25rem' : isTablet ? '1.35rem' : '1.45rem',
      color: colors.textSecondary,
      maxWidth: isMobile ? '100%' : isTablet ? '450px' : '550px',
      lineHeight: 1.6,
      transition: 'color 0.4s ease',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '10px' : '12px',
      background: colors.accentGradient,
      color: '#fff',
      border: 'none',
      padding: isMobile ? '14px 30px' : isTablet ? '16px 40px' : '18px 45px',
      // ✅ +0.3rem: 0.85→1.15, 0.95→1.25, 1→1.3
      fontSize: isMobile ? '1.15rem' : isTablet ? '1.25rem' : '1.3rem',
      fontWeight: 700,
      letterSpacing: isMobile ? '1px' : '2px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      boxShadow: hover 
        ? '0 20px 60px rgba(255,102,0,0.6)' 
        : '0 15px 50px rgba(255,102,0,0.4)',
      transform: hover && !isMobile ? 'translateY(-3px)' : 'translateY(0)',
      width: isMobile ? 'calc(100% - 40px)' : 'auto',
      maxWidth: isMobile ? '320px' : 'none',
      borderRadius: '30px',
    },
    arrow: {
      // ✅ +0.3rem: 1.1→1.4, 1.3→1.6
      fontSize: isMobile ? '1.4rem' : '1.6rem',
      transition: 'transform 0.3s ease',
      transform: hover ? 'translateX(10px)' : 'translateX(0)',
    },
    imageContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: isMobile ? '100%' : isTablet ? '450px' : '600px',
      height: isMobile ? '25vh' : isTablet ? '30vh' : '35vh',
      maxHeight: isMobile ? '300px' : isTablet ? '400px' : '500px',
      overflow: 'visible',
      padding: isMobile ? '15px' : isTablet ? '20px' : '30px',
    },
    heroImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      display: 'block',
      objectFit: 'contain',
      filter: isMobile 
        ? 'drop-shadow(0 20px 40px rgba(255,102,0,0.3))' 
        : isTablet
        ? 'drop-shadow(0 25px 60px rgba(255,102,0,0.35))'
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
      transition: 'all 0.3s ease-out',
    },
    socialProof: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '25px' : isTablet ? '40px' : '50px',
      flexWrap: 'wrap',
    },
    proofItem: {
      textAlign: 'center',
      flex: isMobile ? '1 1 auto' : 'none',
      minWidth: isMobile ? '70px' : 'auto',
    },
    proofNumber: {
      // ✅ +0.3rem: 1.5→1.8, 1.8→2.1, 2→2.3
      fontSize: isMobile ? '1.8rem' : isTablet ? '2.1rem' : '2.3rem',
      fontWeight: 900,
      color: colors.text,
      marginBottom: '5px',
      lineHeight: 1,
      transition: 'color 0.4s ease',
    },
    proofLabel: {
      // ✅ +0.3rem: 0.6→0.9, 0.7→1
      fontSize: isMobile ? '0.9rem' : '1rem',
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
    <section style={styles.section} id="home">
      <div style={styles.gridPattern}></div>
      <div style={styles.floatingElement}></div>
      
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
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {restaurantData.cta.primary}
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
            loading="eager"
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