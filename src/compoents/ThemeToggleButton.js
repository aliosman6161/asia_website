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
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: hover
        ? `0 10px 40px ${theme === 'dark' ? 'rgba(255,102,0,0.4)' : 'rgba(0,0,0,0.2)'}`
        : `0 5px 20px ${theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`,
      transform: hover ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      animation: hover ? 'none' : 'pulse 2s ease-in-out infinite',
    },
    tooltip: {
      position: 'absolute',
      right: '75px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: colors.text,
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      border: `1px solid ${colors.border}`,
      boxShadow: `0 5px 20px ${theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`,
      opacity: hover ? 1 : 0,
      pointerEvents: 'none',
      transition: 'all 0.3s ease',
      transform: hover ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(10px)',
    },
    tooltipArrow: {
      position: 'absolute',
      right: '-6px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 0,
      height: 0,
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
      borderLeft: `6px solid ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}`,
    },
  };

  const animations = `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

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
      .theme-tooltip {
        display: none !important;
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
  }, []);

  return (
    <div style={styles.container} className="theme-toggle-container">
      <div style={styles.tooltip} className="theme-tooltip">
        {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        <div style={styles.tooltipArrow}></div>
      </div>
      
      <button
        style={styles.button}
        className="theme-toggle-btn"
        onClick={toggleTheme}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
              style={{ 
                transition: 'all 0.3s ease',
                animation: hover ? 'rotate 1s linear infinite' : 'none'
              }}
            />
          )}
        </div>
      </button>
    </div>
  );
}

export default ThemeToggleButton;