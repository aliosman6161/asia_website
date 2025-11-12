import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

function Navbar() {
  const { theme, colors } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: isMobile 
        ? '15px 20px' 
        : isTablet 
        ? (scrolled ? '12px 40px' : '20px 40px')
        : (scrolled ? '15px 60px' : '25px 60px'),
      background: scrolled ? colors.navBg : colors.navBgScrolled,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? `1px solid ${colors.navBorder}` : `1px solid ${colors.navBorderLight}`,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.1)' : 'none',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: isMobile ? '1.2rem' : isTablet ? '1.3rem' : '1.5rem',
      fontWeight: 900,
      background: colors.accentGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '1px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      zIndex: 1002,
      position: 'relative',
    },
    menu: {
      display: isMobile ? 'none' : 'flex',
      gap: isTablet ? '30px' : '45px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    link: {
      color: colors.text,
      textDecoration: 'none',
      fontSize: isTablet ? '0.85rem' : '0.95rem',
      fontWeight: 500,
      letterSpacing: '0.5px',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      padding: '8px 0',
    },
    ctaButton: {
      background: colors.accentGradient,
      color: '#fff',
      border: 'none',
      padding: isTablet ? '10px 22px' : '12px 28px',
      borderRadius: '50px',
      fontSize: isTablet ? '0.8rem' : '0.9rem',
      fontWeight: 600,
      letterSpacing: '1px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 20px rgba(255, 102, 0, 0.3)',
      textTransform: 'uppercase',
    },
    hamburger: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '5px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '5px',
      zIndex: 1002,
      position: 'relative',
    },
    hamburgerLine: {
      width: '28px',
      height: '3px',
      background: colors.text,
      borderRadius: '3px',
      transition: 'all 0.3s ease',
      transformOrigin: 'center',
    },
    mobileMenuBackdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      zIndex: 999,
      display: mobileMenuOpen ? 'block' : 'none',
      animation: mobileMenuOpen ? 'fadeIn 0.3s ease' : 'fadeOut 0.3s ease',
      cursor: 'pointer',
    },
    mobileMenuOverlay: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '85%',
      maxWidth: '400px',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 248, 0.98) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 1001,
      display: mobileMenuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      padding: '80px 30px 40px',
      overflowY: 'auto',
      animation: mobileMenuOpen ? 'slideInRight 0.4s ease-out' : 'slideOutRight 0.4s ease-out',
      boxShadow: theme === 'dark' 
        ? '-10px 0 50px rgba(0, 0, 0, 0.5)'
        : '-10px 0 50px rgba(0, 0, 0, 0.15)',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      border: `2px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: colors.text,
      fontSize: '1.5rem',
      fontWeight: 300,
      zIndex: 1002,
    },
    menuHeader: {
      marginBottom: '40px',
      paddingBottom: '20px',
      borderBottom: `1px solid ${colors.border}`,
    },
    menuTitle: {
      fontSize: '1.2rem',
      color: colors.text,
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      marginBottom: '5px',
    },
    menuSubtitle: {
      fontSize: '0.85rem',
      color: colors.textSecondary,
      fontWeight: 400,
    },
    mobileMenuList: {
      margin: 0,
      padding: 0,
      flex: 1,
    },
    mobileMenuItem: {
      listStyle: 'none',
      marginBottom: '10px',
      opacity: mobileMenuOpen ? 1 : 0,
      transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(50px)',
      transition: 'all 0.4s ease',
    },
    mobileLink: {
      color: colors.text,
      textDecoration: 'none',
      fontSize: '1.3rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'block',
      padding: '15px 20px',
      borderRadius: '10px',
      position: 'relative',
      overflow: 'hidden',
    },
    mobileCtaButton: {
      background: colors.accentGradient,
      color: '#fff',
      border: 'none',
      padding: '18px 40px',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: 700,
      letterSpacing: '1.5px',
      cursor: 'pointer',
      marginTop: '30px',
      width: '100%',
      boxShadow: '0 10px 40px rgba(255, 102, 0, 0.5)',
      textTransform: 'uppercase',
      opacity: mobileMenuOpen ? 1 : 0,
      transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease 0.3s',
    },
    mobileSocial: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
      justifyContent: 'center',
      opacity: mobileMenuOpen ? 1 : 0,
      transition: 'all 0.5s ease 0.4s',
    },
    socialIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: `2px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.text,
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  const styleSheet = `
    .nav-link:hover {
      color: ${colors.accent} !important;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: ${colors.accentGradient};
      transition: width 0.3s ease;
    }
    .nav-link:hover::after {
      width: 100%;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(255, 102, 0, 0.5);
    }
    .logo:hover {
      transform: scale(1.05);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    .mobile-link:hover {
      color: ${colors.accent} !important;
      background: ${theme === 'dark' ? 'rgba(255, 102, 0, 0.1)' : 'rgba(255, 102, 0, 0.08)'};
      padding-left: 30px;
    }

    .mobile-link::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 3px;
      background: ${colors.accentGradient};
      transition: width 0.3s ease;
      border-radius: 0 3px 3px 0;
    }

    .mobile-link:hover::before {
      width: 5px;
    }

    .mobile-link:active {
      transform: scale(0.98);
    }

    .close-btn:hover {
      background: rgba(255, 102, 0, 0.2);
      border-color: ${colors.accent};
      transform: rotate(90deg);
    }

    .close-btn:active {
      transform: scale(0.9) rotate(90deg);
    }

    .mobile-cta-btn:active {
      transform: scale(0.95);
    }

    .social-icon:hover {
      border-color: ${colors.accent};
      background: ${theme === 'dark' ? 'rgba(255, 102, 0, 0.1)' : 'rgba(255, 102, 0, 0.08)'};
      transform: scale(1.1);
    }

    .hamburger-line:nth-child(1) {
      transform: ${mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0) translateY(0)'};
    }
    .hamburger-line:nth-child(2) {
      opacity: ${mobileMenuOpen ? '0' : '1'};
    }
    .hamburger-line:nth-child(3) {
      transform: ${mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0) translateY(0)'};
    }

    * {
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  useEffect(() => {
    const existingStyle = document.getElementById('navbar-styles');
    if (existingStyle) {
      existingStyle.innerHTML = styleSheet;
    } else {
      const style = document.createElement('style');
      style.id = 'navbar-styles';
      style.innerHTML = styleSheet;
      document.head.appendChild(style);
    }
  }, [mobileMenuOpen, theme]);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Speisekarte', href: '#menu' },
    { label: 'Über Uns', href: '#about' },
    { label: 'Kontakt', href: '#contact' },
  ];

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.logo} className="logo">
            ASIAN<span style={{color: colors.text}}>TASTE</span>
          </div>

          <ul style={styles.menu}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a style={styles.link} className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button style={styles.ctaButton} className="cta-btn">
                Jetzt Anrufen
              </button>
            </li>
          </ul>

          <button 
            style={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span style={styles.hamburgerLine} className="hamburger-line"></span>
            <span style={styles.hamburgerLine} className="hamburger-line"></span>
            <span style={styles.hamburgerLine} className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {isMobile && (
        <div 
          style={styles.mobileMenuBackdrop}
          onClick={handleMenuClose}
        />
      )}

      {isMobile && (
        <div style={styles.mobileMenuOverlay}>
          <button 
            style={styles.closeButton}
            className="close-btn"
            onClick={handleMenuClose}
            aria-label="Close Menu"
          >
            ✕
          </button>

          <div style={styles.menuHeader}>
            <div style={styles.menuTitle}>Menü</div>
            <div style={styles.menuSubtitle}>Wähle eine Option</div>
          </div>

          <ul style={styles.mobileMenuList}>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                style={{
                  ...styles.mobileMenuItem,
                  transitionDelay: `${index * 0.08}s`,
                }}
              >
                <a 
                  style={styles.mobileLink} 
                  className="mobile-link"
                  href={item.href}
                  onClick={handleMenuClose}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button 
            style={styles.mobileCtaButton} 
            className="mobile-cta-btn"
            onClick={handleMenuClose}
          >
            Jetzt Anrufen
          </button>

          <div style={styles.mobileSocial}>
            <div style={styles.socialIcon} className="social-icon" onClick={handleMenuClose}>📱</div>
            <div style={styles.socialIcon} className="social-icon" onClick={handleMenuClose}>📧</div>
            <div style={styles.socialIcon} className="social-icon" onClick={handleMenuClose}>📍</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;