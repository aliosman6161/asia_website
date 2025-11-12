import React, { useState, useEffect } from "react";
import { useTheme } from '../../ThemeContext';
import aboutData from "../../config/about.json";

function AboutSection() {
  const { theme, colors } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredTimeline, setHoveredTimeline] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const styles = {
    section: {
      backgroundColor: colors.primary,
      padding: isMobile ? "60px 20px" : isTablet ? "80px 40px" : "100px 60px",
      minHeight: '100vh',
      fontFamily: "'Raleway', sans-serif",
      position: "relative",
      transition: 'background 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      
    },
    
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      width: '100%',
      position: "relative",
      zIndex: 2,
    },
    
    hero: {
      textAlign: "center",
      marginBottom: isMobile ? "40px" : "60px",
    },
    
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: theme === 'dark' ? "rgba(255,102,0,0.15)" : "rgba(255,102,0,0.1)",
      border: `1px solid ${colors.borderHover}`,
      padding: "8px 20px",
      borderRadius: "30px",
      fontSize: isMobile ? "0.7rem" : "0.75rem",
      letterSpacing: "2px",
      color: colors.accent,
      marginBottom: "20px",
      fontWeight: 600,
      textTransform: "uppercase",
    },
    
    title: {
      fontSize: isMobile ? "2rem" : isTablet ? "2.5rem" : "3rem",
      color: colors.text,
      fontWeight: 900,
      marginBottom: "10px",
      letterSpacing: "-1px",
      transition: 'color 0.4s ease',
    },
    
    titleAccent: {
      background: colors.accentGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    
    description: {
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      color: colors.textSecondary,
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: 1.7,
      transition: 'color 0.4s ease',
    },
    
    // TIMELINE
    timelineSection: {
      marginBottom: isMobile ? "50px" : "70px",
    },
    
    timeline: {
      position: "relative",
      padding: isMobile ? "0" : "0 50px",
    },
    
    timelineLine: {
      position: "absolute",
      left: isMobile ? "20px" : "50%",
      top: 0,
      bottom: 0,
      width: "2px",
      background: colors.borderHover,
      transform: isMobile ? "none" : "translateX(-50%)",
    },
    
    timelineItem: {
      position: "relative",
      marginBottom: isMobile ? "40px" : "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "flex-start" : "center",
    },
    
    timelineContent: {
      background: colors.secondary,
      borderRadius: "15px",
      padding: isMobile ? "20px" : "25px",
      width: isMobile ? "calc(100% - 60px)" : "45%",
      marginLeft: isMobile ? "60px" : "0",
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.18)',
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      outline: 'none',
    },
    
    timelineContentHover: {
      transform: "translateY(-5px)",
      borderColor: colors.accent,
      boxShadow: "0 15px 40px rgba(255,102,0,0.2)",
    },
    
    // ✅ LEERER ORANGER KREIS
    timelineIcon: {
      position: "absolute",
      left: isMobile ? "0px" : "50%",
      transform: isMobile ? "none" : "translateX(-50%)",
      width: isMobile ? "40px" : "50px",
      height: isMobile ? "40px" : "50px",
      background: colors.accent,
      borderRadius: "50%",
      border: `4px solid ${colors.primary}`,
      zIndex: 2,
      boxShadow: "0 5px 20px rgba(255,102,0,0.5)",
      transition: "all 0.3s ease",
    },
    
    timelineIconHover: {
      transform: isMobile ? "scale(1.1)" : "translateX(-50%) scale(1.1)",
      boxShadow: "0 8px 30px rgba(255,102,0,0.7)",
    },
    
    timelineYear: {
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      color: colors.accent,
      fontWeight: 700,
      letterSpacing: "2px",
      marginBottom: "8px",
    },
    
    timelineTitle: {
      fontSize: isMobile ? "1.1rem" : "1.2rem",
      color: colors.text,
      fontWeight: 700,
      marginBottom: "5px",
      transition: 'color 0.4s ease',
    },
    
    timelineDescription: {
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      color: colors.textSecondary,
      transition: 'color 0.4s ease',
    },
    
    // ✅ QUOTE SECTION (statt Philosophy)
    quoteSection: {
      textAlign: "center",
      padding: isMobile ? "40px 20px" : isTablet ? "50px 40px" : "60px 60px",
      background: theme === 'dark' 
        ? "linear-gradient(135deg, rgba(255,102,0,0.08) 0%, rgba(255,149,0,0.04) 100%)"
        : "linear-gradient(135deg, rgba(255,102,0,0.06) 0%, rgba(255,149,0,0.02) 100%)",
      borderRadius: "20px",
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.borderHover,
      position: "relative",
      overflow: "hidden",
    },
    
    quoteIcon: {
      fontSize: isMobile ? "3rem" : "4rem",
      color: colors.accent,
      opacity: 0.2,
      position: "absolute",
      top: isMobile ? "10px" : "20px",
      left: isMobile ? "20px" : "40px",
      fontFamily: "Georgia, serif",
      lineHeight: 1,
    },
    
    quoteText: {
      fontSize: isMobile ? "1.1rem" : isTablet ? "1.3rem" : "1.5rem",
      color: colors.text,
      fontStyle: "italic",
      fontWeight: 500,
      lineHeight: 1.8,
      marginBottom: isMobile ? "20px" : "25px",
      position: "relative",
      zIndex: 1,
      maxWidth: "800px",
      margin: "0 auto 20px",
      transition: 'color 0.4s ease',
    },
    
    quoteAuthor: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      color: colors.accent,
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      position: "relative",
      zIndex: 1,
    },
    
    quoteAuthorPrefix: {
      color: colors.textSecondary,
      fontWeight: 400,
      marginRight: "5px",
      transition: 'color 0.4s ease',
    },
  };

  // ANIMATIONS
  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .timeline-item {
      animation: fadeIn 0.6s ease-out forwards;
      opacity: 0;
    }
    
    .timeline-item:nth-child(1) { animation-delay: 0.1s; }
    .timeline-item:nth-child(2) { animation-delay: 0.2s; }
    .timeline-item:nth-child(3) { animation-delay: 0.3s; }
    .timeline-item:nth-child(4) { animation-delay: 0.4s; }
  `;

  useEffect(() => {
    const existingStyle = document.getElementById('about-section-styles');
    if (existingStyle) {
      existingStyle.innerHTML = animations;
    } else {
      const style = document.createElement('style');
      style.id = 'about-section-styles';
      style.innerHTML = animations;
      document.head.appendChild(style);
    }
  }, [animations]);

  return (
    <section style={styles.section} id="about">
      <div style={styles.container}>
        {/* HERO */}
        <div style={styles.hero}>
          <span style={styles.badge}>{aboutData.hero.badge}</span>
          <h2 style={styles.title}>
            {aboutData.hero.title} <span style={styles.titleAccent}>{aboutData.hero.titleAccent}</span>
          </h2>
          <p style={styles.description}>{aboutData.hero.description}</p>
        </div>

        {/* TIMELINE */}
        <div style={styles.timelineSection}>
          <div style={styles.timeline}>
            <div style={styles.timelineLine}></div>
            
            {aboutData.timeline.map((item, index) => (
              <div 
                key={index} 
                className="timeline-item"
                style={{
                  ...styles.timelineItem,
                  justifyContent: !isMobile && index % 2 === 1 ? "flex-start" : "flex-end",
                }}
              >
                {/* ✅ LEERER ORANGER KREIS */}
                <div 
                  style={
                    hoveredTimeline === index
                      ? { ...styles.timelineIcon, ...styles.timelineIconHover }
                      : styles.timelineIcon
                  }
                ></div>
                
                <div
                  style={
                    hoveredTimeline === index
                      ? { ...styles.timelineContent, ...styles.timelineContentHover }
                      : styles.timelineContent
                  }
                  onMouseEnter={() => setHoveredTimeline(index)}
                  onMouseLeave={() => setHoveredTimeline(null)}
                >
                  <div style={styles.timelineYear}>{item.year}</div>
                  <div style={styles.timelineTitle}>{item.title}</div>
                  <div style={styles.timelineDescription}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ QUOTE SECTION (statt Philosophy) */}
        <div style={styles.quoteSection}>
          <div style={styles.quoteIcon}>"</div>
          <p style={styles.quoteText}>{aboutData.quote.text}</p>
          <div style={styles.quoteAuthor}>
            <span style={styles.quoteAuthorPrefix}>—</span>
            {aboutData.quote.author}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;