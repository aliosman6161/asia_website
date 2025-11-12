import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme, colors } = useTheme();
  const [hover, setHover] = useState(false);

  const styles = {
    container: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 999,
    },
    button: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      border: `2px solid ${hover ? colors.accent : colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: hover
        ? `0 10px 40px ${theme === 'dark' ? 'rgba(255,102,0,0.4)' : 'rgba(0,0,0,0.2)'}`
        : `0 5px 20px ${theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`,
      transform: hover ? 'scale(1.08)' : 'scale(1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
  };

  const animations = `
    /* Mobile Anpassung */
    @media (max-width: 768px) {
      .theme-toggle-container {
        bottom: 20px !important;
        right: 20px !important;
      }
      .theme-toggle-btn {
        width: 50px !important;
        height: 50px !important;
      }
    }
  `;

  React.useEffect(() => {
    if (!document.getElementById('theme-toggle-styles')) {
      const style = document.createElement('style');
      style.id = 'theme-toggle-styles';
      style.innerHTML = animations;
      document.head.appendChild(style);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={styles.container} className="theme-toggle-container">
      <button
        style={styles.button}
        className="theme-toggle-btn"
        onClick={toggleTheme}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
        aria-label="Toggle Theme"
      >
        <div style={styles.iconWrapper}>
          {theme === 'dark' ? (
            <Moon 
              size={24} 
              color={colors.accent}
              fill={hover ? colors.accent : 'none'}
              style={{ transition: 'all 0.3s ease' }}
            />
          ) : (
            <Sun 
              size={24} 
              color={colors.accent}
              fill={hover ? colors.accent : 'none'}
              style={{ transition: 'all 0.3s ease' }}
            />
          )}
        </div>
      </button>
    </div>
  );
}

export default ThemeToggleButton;