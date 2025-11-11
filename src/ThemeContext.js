import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Check localStorage oder System Preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // System Preference checken
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'dark'; // Default: Dark Mode
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const colors = {
    dark: {
      // Backgrounds
      primary: '#0f0f0f',
      secondary: '#1a1a1a',
      tertiary: '#0a0a0a',
      sectionAlt: '#141414',  // ✅ NEU: Alternativer Section Background
      
      // Text
      text: '#ffffff',
      textSecondary: '#999',
      textTertiary: '#666',
      
      // Borders & Overlays
      border: 'rgba(255,255,255,0.05)',
      borderHover: 'rgba(255,102,0,0.3)',
      overlay: 'rgba(15, 15, 15, 0.95)',
      
      // Nav
      navBg: 'rgba(15, 15, 15, 0.95)',
      navBgScrolled: 'rgba(15, 15, 15, 0.3)',
      navBorder: 'rgba(255, 102, 0, 0.2)',
      navBorderLight: 'rgba(255, 255, 255, 0.05)',
      
      // Accents (bleiben gleich)
      accent: '#ff6600',
      accentHover: '#ff4400',
      accentGradient: 'linear-gradient(135deg, #ff6600 0%, #ff9500 100%)',
      
      // Grid Pattern
      gridPattern: 'rgba(255,102,0,0.03)',
      gridPatternLight: 'rgba(255,102,0,0.02)',
    },
    light: {
      // Backgrounds
      primary: '#fafaf8',
      secondary: '#ffffff',
      tertiary: '#f5f5f5',
      sectionAlt: '#f5f5f5',  // ✅ NEU: Alternativer Section Background
      
      // Text
      text: '#1a1a1a',
      textSecondary: '#666',
      textTertiary: '#999',
      
      // Borders & Overlays
      border: 'rgba(0,0,0,0.08)',
      borderHover: 'rgba(255,102,0,0.3)',
      overlay: 'rgba(250, 250, 248, 0.95)',
      
      // Nav
      navBg: 'rgba(255, 255, 255, 0.95)',
      navBgScrolled: 'rgba(255, 255, 255, 0.7)',
      navBorder: 'rgba(255, 102, 0, 0.2)',
      navBorderLight: 'rgba(0, 0, 0, 0.08)',
      
      // Accents (bleiben gleich)
      accent: '#ff6600',
      accentHover: '#ff4400',
      accentGradient: 'linear-gradient(135deg, #ff6600 0%, #ff9500 100%)',
      
      // Grid Pattern
      gridPattern: 'rgba(255,102,0,0.08)',
      gridPatternLight: 'rgba(255,102,0,0.05)',
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: colors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};