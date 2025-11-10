import React, { useState, useEffect } from "react";
import { X, Flame, Leaf, ChefHat } from "lucide-react";
import { useTheme } from "../ThemeContext";

function FeaturedDishes() {
  const { theme, colors } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedDish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDish]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const dishes = [
    {
      id: 1,
      name: "Dragon Roll Supreme",
      description: "Frischer Lachs, Avocado & knuspriges Tempura mit hausgemachter Teriyaki-Sauce",
      price: "14.90",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600",
      category: "Sushi",
      ingredients: ["Lachs", "Avocado", "Tempura", "Nori", "Sushi-Reis", "Teriyaki-Sauce"],
      allergens: ["Fisch", "Gluten", "Soja"],
      spicy: false,
      vegetarian: false
    },
    {
      id: 2,
      name: "Tonkotsu Ramen",
      description: "20h gekochte Schweinebrühe, Chashu-Schwein, Ei & hausgemachte Nudeln",
      price: "13.50",
      image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600",
      category: "Ramen",
      ingredients: ["Schweine-Brühe", "Chashu-Schwein", "Ramen-Nudeln", "Ei", "Frühlingszwiebeln", "Nori"],
      allergens: ["Gluten", "Ei", "Soja"],
      spicy: false,
      vegetarian: false
    },
    {
      id: 3,
      name: "Thai Red Curry",
      description: "Cremiges rotes Curry mit Kokosmilch, Gemüse & duftendem Jasminreis",
      price: "12.90",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600",
      category: "Curry",
      ingredients: ["Kokosmilch", "Rote Currypaste", "Gemüse-Mix", "Jasminreis", "Thai-Basilikum"],
      allergens: ["Kann Spuren von Nüssen enthalten"],
      spicy: true,
      vegetarian: true
    },
    {
      id: 4,
      name: "Peking Duck Deluxe",
      description: "Knusprige Ente nach Peking-Art mit Pfannkuchen, Gurke & Hoisin-Sauce",
      price: "18.90",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600",
      category: "Signature",
      ingredients: ["Peking-Ente", "Weizen-Pfannkuchen", "Gurke", "Frühlingszwiebeln", "Hoisin-Sauce"],
      allergens: ["Gluten", "Soja"],
      spicy: false,
      vegetarian: false
    }
  ];

  const styles = {
    section: {
      backgroundColor: colors.primary,
      padding: isMobile ? "60px 20px" : isTablet ? "80px 40px" : "100px 60px",
      fontFamily: "'Raleway', sans-serif",
      position: "relative",
      overflow: "hidden",
      transition: 'background 0.4s ease',
    },
    gridPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(${colors.gridPatternLight} 1px, transparent 1px),
        linear-gradient(90deg, ${colors.gridPatternLight} 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      pointerEvents: "none",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    header: {
      textAlign: "center",
      marginBottom: isMobile ? "50px" : "70px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: theme === 'dark' ? "rgba(255,102,0,0.15)" : "rgba(255,102,0,0.1)",
      border: `1px solid ${colors.borderHover}`,
      padding: "8px 20px",
      borderRadius: "30px",
      fontSize: "0.75rem",
      letterSpacing: "2px",
      color: colors.accent,
      marginBottom: "20px",
      fontWeight: 600,
      textTransform: "uppercase",
      transition: 'all 0.4s ease',
    },
    title: {
      fontSize: isMobile ? "2rem" : isTablet ? "2.5rem" : "3rem",
      color: colors.text,
      fontWeight: 900,
      marginBottom: "15px",
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
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: colors.textSecondary,
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: 1.7,
      transition: 'color 0.4s ease',
    },
    dishesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
        ? "repeat(2, 1fr)" 
        : "repeat(4, 1fr)",
      gap: isMobile ? "25px" : "30px",
    },
    dishCard: {
      backgroundColor: colors.secondary,
      borderRadius: "15px",
      overflow: "hidden",
      border: `1px solid ${colors.border}`,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      position: "relative",
    },
    dishCardHover: {
      transform: "translateY(-10px)",
      border: `1px solid ${colors.borderHover}`,
      boxShadow: "0 20px 60px rgba(255,102,0,0.3)",
    },
    imageContainer: {
      width: "100%",
      height: isMobile ? "200px" : "220px",
      overflow: "hidden",
      position: "relative",
      backgroundColor: colors.tertiary,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    imageHover: {
      transform: "scale(1.15)",
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      background: theme === 'dark'
        ? "linear-gradient(to top, rgba(26,26,26,0.9) 0%, transparent 50%)"
        : "linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 50%)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    },
    imageOverlayHover: {
      opacity: 1,
    },
    categoryBadge: {
      position: "absolute",
      top: "15px",
      left: "15px",
      background: colors.accentGradient,
      color: "#fff",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      boxShadow: "0 5px 15px rgba(255,102,0,0.4)",
    },
    cardContent: {
      padding: isMobile ? "20px" : "25px",
    },
    dishName: {
      fontSize: isMobile ? "1.2rem" : "1.3rem",
      color: colors.text,
      fontWeight: 700,
      marginBottom: "10px",
      lineHeight: 1.3,
      transition: 'color 0.4s ease',
    },
    dishDescription: {
      fontSize: "0.85rem",
      color: colors.textSecondary,
      lineHeight: 1.6,
      marginBottom: "20px",
      minHeight: isMobile ? "auto" : "65px",
      transition: 'color 0.4s ease',
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "15px",
      borderTop: `1px solid ${colors.border}`,
    },
    price: {
      fontSize: isMobile ? "1.5rem" : "1.6rem",
      fontWeight: 900,
      background: colors.accentGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    viewButton: {
      background: "transparent",
      color: colors.accent,
      border: `2px solid ${colors.borderHover}`,
      padding: "8px 18px",
      borderRadius: "25px",
      fontSize: "0.8rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.overlay,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      padding: isMobile ? "15px" : "20px",
      animation: "fadeIn 0.3s ease",
    },
    modalContent: {
      backgroundColor: colors.secondary,
      border: `1px solid ${colors.borderHover}`,
      borderRadius: isMobile ? "15px" : "20px",
      maxWidth: "600px",
      width: "100%",
      maxHeight: isMobile ? "85vh" : "90vh",
      overflowY: "auto",
      position: "relative",
      animation: isMobile ? "slideUp 0.4s ease" : "zoomIn 0.4s ease",
      transition: 'all 0.4s ease',
    },
    modalBody: {
      padding: isMobile ? "25px 20px" : "35px 30px",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: isMobile ? "12px" : "15px",
      gap: "12px",
    },
    modalTitle: {
      fontSize: isMobile ? "1.4rem" : "1.8rem",
      color: colors.text,
      fontWeight: 900,
      flex: 1,
      lineHeight: 1.2,
      transition: 'color 0.4s ease',
    },
    closeButton: {
      backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      border: `1px solid ${colors.border}`,
      borderRadius: "50%",
      width: isMobile ? "36px" : "40px",
      height: isMobile ? "36px" : "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: colors.text,
      flexShrink: 0,
    },
    modalCategoryBadge: {
      display: "inline-block",
      background: colors.accentGradient,
      color: "#fff",
      padding: isMobile ? "5px 12px" : "6px 14px",
      borderRadius: "20px",
      fontSize: isMobile ? "0.65rem" : "0.7rem",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom: isMobile ? "12px" : "15px",
    },
    modalDescription: {
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      color: colors.textSecondary,
      lineHeight: 1.6,
      marginBottom: isMobile ? "18px" : "20px",
      transition: 'color 0.4s ease',
    },
    iconBadgesRow: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: isMobile ? "18px" : "20px",
    },
    iconBadge: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      padding: isMobile ? "6px 12px" : "7px 13px",
      backgroundColor: theme === 'dark' ? "rgba(255,102,0,0.1)" : "rgba(255,102,0,0.08)",
      border: `1px solid ${colors.borderHover}`,
      borderRadius: "20px",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      color: colors.accent,
      fontWeight: 600,
    },
    detailSection: {
      marginBottom: isMobile ? "15px" : "18px",
    },
    detailTitle: {
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      color: colors.text,
      fontWeight: 700,
      marginBottom: isMobile ? "8px" : "10px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: 'color 0.4s ease',
    },
    tagsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: isMobile ? "6px" : "8px",
    },
    tag: {
      backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      border: `1px solid ${colors.border}`,
      color: colors.textSecondary,
      padding: isMobile ? "5px 10px" : "6px 12px",
      borderRadius: "12px",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      fontWeight: 500,
      transition: 'all 0.4s ease',
    },
    allergenTag: {
      backgroundColor: theme === 'dark' ? "rgba(255,102,0,0.15)" : "rgba(255,102,0,0.1)",
      border: `1px solid ${colors.borderHover}`,
      color: colors.accent,
      padding: isMobile ? "5px 10px" : "6px 12px",
      borderRadius: "12px",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      fontWeight: 600,
    },
    modalPriceSection: {
      marginTop: isMobile ? "20px" : "25px",
      paddingTop: isMobile ? "18px" : "20px",
      borderTop: `2px solid ${colors.border}`,
      textAlign: "center",
    },
    modalPriceLabel: {
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      color: colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: "2px",
      marginBottom: isMobile ? "6px" : "8px",
      transition: 'color 0.4s ease',
    },
    modalPrice: {
      fontSize: isMobile ? "2rem" : "2.5rem",
      fontWeight: 900,
      background: colors.accentGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  };

  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .view-btn:hover {
      background: ${theme === 'dark' ? 'rgba(255,102,0,0.1)' : 'rgba(255,102,0,0.08)'} !important;
      border-color: ${colors.accent} !important;
      transform: translateX(5px);
    }

    .close-btn:hover {
      background: rgba(255,102,0,0.2) !important;
      border-color: ${colors.accent} !important;
      transform: rotate(90deg);
    }

    .modal-content {
      scrollbar-width: thin;
      scrollbar-color: ${colors.accent} ${colors.secondary};
    }

    .modal-content::-webkit-scrollbar {
      width: 6px;
    }

    .modal-content::-webkit-scrollbar-track {
      background: ${colors.secondary};
    }

    .modal-content::-webkit-scrollbar-thumb {
      background: ${colors.accent};
      border-radius: 10px;
    }

    @media (max-width: 768px) {
      .modal-content {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  `;

  useEffect(() => {
    const existingStyle = document.getElementById('featured-dishes-styles');
    if (existingStyle) {
      existingStyle.innerHTML = animations;
    } else {
      const style = document.createElement('style');
      style.id = 'featured-dishes-styles';
      style.innerHTML = animations;
      document.head.appendChild(style);
    }
  }, [theme]);

  return (
    <section style={styles.section}>
      <div style={styles.gridPattern}></div>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>
            <ChefHat size={14} />
            Chef's Selection
          </span>
          
          <h2 style={styles.title}>
            Unsere <span style={styles.titleAccent}>Highlights</span>
          </h2>
          
          <p style={styles.description}>
            Entdecke unsere beliebtesten Gerichte, mit Leidenschaft zubereitet
            und von unseren Gästen am meisten geschätzt
          </p>
        </div>

        <div style={styles.dishesGrid}>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              style={
                hoveredCard === dish.id
                  ? { ...styles.dishCard, ...styles.dishCardHover }
                  : styles.dishCard
              }
              onMouseEnter={() => setHoveredCard(dish.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedDish(dish)}
            >
              <div style={styles.imageContainer}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={
                    hoveredCard === dish.id
                      ? { ...styles.image, ...styles.imageHover }
                      : styles.image
                  }
                />
                <div 
                  style={
                    hoveredCard === dish.id
                      ? { ...styles.imageOverlay, ...styles.imageOverlayHover }
                      : styles.imageOverlay
                  }
                />
                <span style={styles.categoryBadge}>{dish.category}</span>
              </div>

              <div style={styles.cardContent}>
                <h3 style={styles.dishName}>{dish.name}</h3>
                <p style={styles.dishDescription}>{dish.description}</p>

                <div style={styles.priceRow}>
                  <span style={styles.price}>€{dish.price}</span>
                  <button
                    style={styles.viewButton}
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDish(dish);
                    }}
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDish && (
        <div 
          style={styles.modalOverlay}
          onClick={() => setSelectedDish(null)}
        >
          <div 
            style={styles.modalContent}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalBody}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>{selectedDish.name}</h2>
                <button 
                  style={styles.closeButton}
                  className="close-btn"
                  onClick={() => setSelectedDish(null)}
                >
                  <X size={isMobile ? 20 : 22} />
                </button>
              </div>

              <span style={styles.modalCategoryBadge}>
                {selectedDish.category}
              </span>

              <p style={styles.modalDescription}>
                {selectedDish.description}
              </p>

              {(selectedDish.spicy || selectedDish.vegetarian) && (
                <div style={styles.iconBadgesRow}>
                  {selectedDish.spicy && (
                    <div style={styles.iconBadge}>
                      <Flame size={isMobile ? 14 : 16} />
                      Scharf
                    </div>
                  )}
                  {selectedDish.vegetarian && (
                    <div style={styles.iconBadge}>
                      <Leaf size={isMobile ? 14 : 16} />
                      Vegetarisch
                    </div>
                  )}
                </div>
              )}

              <div style={styles.detailSection}>
                <h3 style={styles.detailTitle}>
                  <span>🥘</span> Zutaten
                </h3>
                <div style={styles.tagsList}>
                  {selectedDish.ingredients.map((ingredient, index) => (
                    <span key={index} style={styles.tag}>
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.detailTitle}>
                  <span>⚠️</span> Allergene
                </h3>
                <div style={styles.tagsList}>
                  {selectedDish.allergens.map((allergen, index) => (
                    <span key={index} style={styles.allergenTag}>
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.modalPriceSection}>
                <div style={styles.modalPriceLabel}>Preis</div>
                <div style={styles.modalPrice}>€{selectedDish.price}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FeaturedDishes;