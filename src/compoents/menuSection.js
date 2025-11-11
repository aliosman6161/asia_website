import React, { useState, useEffect } from "react";
import { Search, Flame, Leaf, Star, X } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { dishes, categories, categoryIcons } from "../data";

function MenuSection() {
  const { theme, colors } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeCategory, setActiveCategory] = useState('alle');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
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

  useEffect(() => {
    console.log('📊 Menu Data loaded:', { 
      dishes: dishes.length, 
      categories: categories.length 
    });
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const allCategories = [
    { 
      id: 'alle', 
      name: 'Alle', 
      icon: '🍽️', 
      count: dishes.length 
    },
    ...categories
  ];

  const filters = [
    { id: 'vegetarian', label: 'Vegetarisch', icon: Leaf },
    { id: 'spicy', label: 'Scharf', icon: Flame },
    { id: 'new', label: 'Neu', icon: Star },
  ];

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getFilteredDishes = () => {
    let filteredDishes = activeCategory === 'alle' 
      ? dishes 
      : dishes.filter(d => d.category === activeCategory);
    
    if (searchTerm) {
      filteredDishes = filteredDishes.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      filteredDishes = filteredDishes.filter(dish => {
        if (activeFilters.includes('vegetarian') && !dish.vegetarian) return false;
        if (activeFilters.includes('spicy') && !dish.spicy) return false;
        if (activeFilters.includes('new') && !dish.new) return false;
        return true;
      });
    }

    return filteredDishes;
  };

  const styles = {
    section: {
      backgroundColor: colors.primary,
      padding: isMobile ? "60px 20px" : isTablet ? "80px 40px" : "100px 60px",
      minHeight: '100vh',
      position: "relative",
      transition: 'background 0.4s ease',
      width: '100%',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      fontFamily: "'Raleway', sans-serif",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
    },
    header: {
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
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '8px' : isTablet ? '12px' : '15px',
      marginBottom: isMobile ? '30px' : '40px',
      flexWrap: 'wrap',
      padding: isMobile ? '15px 10px' : isTablet ? '18px 20px' : '20px 20px',
      width: '100%',
      maxWidth: '100%',
      overflow: 'visible',
      position: 'relative',
      minHeight: '60px',
    },
    tab: {
      padding: isMobile ? '10px 14px' : isTablet ? '12px 20px' : '14px 26px',
      background: 'transparent',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.25)',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '5px' : '8px',
      fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '0.95rem',
      fontWeight: 600,
      color: colors.textSecondary,
      whiteSpace: 'nowrap',
      outline: 'none',
    },
    tabActive: {
      background: colors.accent,
      borderColor: colors.accent,
      color: '#fff',
      transform: 'translateY(-3px)',
      boxShadow: '0 20px 60px rgba(255,102,0,0.5)',
      position: 'relative',
      zIndex: 10,
    },
    tabIcon: {
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    tabCount: {
      background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      padding: '2px 6px',
      borderRadius: '12px',
      fontSize: isMobile ? '0.65rem' : '0.7rem',
      minWidth: '18px',
      textAlign: 'center',
    },
    tabAll: {
      background: theme === 'dark' 
        ? 'rgba(255,102,0,0.08)' 
        : 'rgba(255,102,0,0.05)',
      borderColor: colors.borderHover,
    },
    controlsContainer: {
      marginBottom: isMobile ? '30px' : '40px',
      overflow: 'visible',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: isMobile ? '15px' : '20px',
    },
    searchBox: {
      position: 'relative',
      maxWidth: isMobile ? '100%' : '600px',
      margin: '0 auto',
      width: '100%',
      paddingLeft: '0',
      paddingRight: '0',
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.textSecondary,
      pointerEvents: 'none',
    },
    searchInput: {
      width: '100%',
      padding: isMobile ? '12px 40px 12px 45px' : '14px 45px 14px 50px',
      background: colors.secondary,
      border: `1px solid ${colors.border}`,
      borderRadius: '30px',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      color: colors.text,
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    clearButton: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      color: colors.textSecondary,
      cursor: 'pointer',
      padding: '5px',
      display: searchTerm ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.3s ease',
      outline: 'none',
    },
    filtersWrapper: {
      display: 'none',
    },
    dishGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? '1fr' 
        : isTablet 
        ? 'repeat(2, 1fr)' 
        : isDesktop
        ? 'repeat(3, 1fr)'
        : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : '25px',
    },
    dishCard: {
      background: colors.secondary,
      borderRadius: '15px',
      overflow: 'hidden',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.18)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
    },
    dishCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(255,102,0,0.2)',
      borderColor: colors.accent,
    },
    categoryBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      padding: '4px 10px',
      borderRadius: '15px',
      fontSize: '0.7rem',
      fontWeight: 600,
      textTransform: 'capitalize',
      zIndex: 1,
    },
    dishImage: {
      width: '100%',
      height: isMobile ? '180px' : '200px',
      objectFit: 'cover',
    },
    dishContent: {
      padding: isMobile ? '15px' : '20px',
    },
    dishHeader: {
      marginBottom: '10px',
    },
    dishInfo: {
      flex: 1,
    },
    dishName: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 700,
      color: colors.text,
      marginBottom: '5px',
      lineHeight: 1.3,
      transition: 'color 0.4s ease',
    },
    dishDescription: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: colors.textSecondary,
      lineHeight: 1.5,
      marginBottom: isMobile ? '10px' : '15px',
      transition: 'color 0.4s ease',
    },
    // ✅ NEU: Price Row mit Details Button
    priceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '12px',
      borderTop: `1px solid ${colors.border}`,
      marginTop: '10px',
    },
    dishPrice: {
      fontSize: isMobile ? '1.3rem' : '1.4rem',
      fontWeight: 800,
      background: colors.accentGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    detailsButton: {
      background: 'transparent',
      color: colors.accent,
      border: `2px solid ${colors.borderHover}`,
      padding: isMobile ? '6px 14px' : '8px 18px',
      borderRadius: '25px',
      fontSize: isMobile ? '0.75rem' : '0.8rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      outline: 'none',
    },
    dishTags: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginTop: '10px',
    },
    dishTag: {
      padding: isMobile ? '3px 8px' : '4px 10px',
      background: theme === 'dark' ? 'rgba(255,102,0,0.15)' : 'rgba(255,102,0,0.1)',
      borderRadius: '12px',
      fontSize: isMobile ? '0.65rem' : '0.75rem',
      color: colors.accent,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '3px',
    },
    noResults: {
      textAlign: 'center',
      padding: '60px 20px',
      color: colors.textSecondary,
      fontSize: isMobile ? '1rem' : '1.1rem',
      gridColumn: '1 / -1',
    },
    resultsCount: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: '0.9rem',
      marginBottom: '20px',
    },
    // Modal Styles
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
      outline: 'none',
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

    .details-btn {
      position: relative;
      overflow: hidden;
    }
    
    .details-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -100%;
      width: 100%;
      height: 2px;
      background: ${colors.accent};
      transform: translateY(-50%);
      transition: left 0.3s ease;
    }
    
    .details-btn:hover::before {
      left: 100%;
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
    const existingStyle = document.getElementById('menu-section-styles');
    if (existingStyle) {
      existingStyle.innerHTML = animations;
    } else {
      const style = document.createElement('style');
      style.id = 'menu-section-styles';
      style.innerHTML = animations;
      document.head.appendChild(style);
    }
  }, [theme, colors.accent, colors.secondary, animations]);

  return (
    <section style={styles.section} id="menu">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.badge}>
            🍽️ Unsere Speisekarte
          </span>
          <h2 style={styles.title}>
            Entdecke unsere <span style={styles.titleAccent}>Köstlichkeiten</span>
          </h2>
          <p style={styles.description}>
            Von traditionellen Klassikern bis zu modernen Kreationen
          </p>
        </div>

        {/* Category Tabs */}
        <div style={styles.tabsContainer}>
          {allCategories.map((category) => (
            <button
              key={category.id}
              style={
                activeCategory === category.id
                  ? { ...styles.tab, ...styles.tabActive }
                  : category.id === 'alle' 
                  ? { ...styles.tab, ...styles.tabAll }
                  : styles.tab
              }
              onClick={() => setActiveCategory(category.id)}
            >
              <span style={styles.tabIcon}>{category.icon}</span>
              <span>{category.name}</span>
              <span style={styles.tabCount}>{category.count}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
              <Search size={isMobile ? 18 : 20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder={isMobile ? "Suche..." : "Suche nach Gerichten..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <button
                style={styles.clearButton}
                onClick={clearSearch}
                onMouseEnter={(e) => e.target.style.color = colors.accent}
                onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {(searchTerm || activeFilters.length > 0) && (
          <div style={styles.resultsCount}>
            {getFilteredDishes().length} {getFilteredDishes().length === 1 ? 'Gericht' : 'Gerichte'} gefunden
          </div>
        )}

        {/* Dishes Grid */}
        <div style={styles.dishGrid}>
          {getFilteredDishes().length > 0 ? (
            getFilteredDishes().map((dish) => (
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
                {activeCategory === 'alle' && (
                  <div style={styles.categoryBadge}>
                    {categoryIcons[dish.category]} {dish.category}
                  </div>
                )}
                
                <img src={dish.image} alt={dish.name} style={styles.dishImage} />
                <div style={styles.dishContent}>
                  <div style={styles.dishHeader}>
                    <div style={styles.dishInfo}>
                      <div style={styles.dishName}>{dish.name}</div>
                      <div style={styles.dishDescription}>{dish.description}</div>
                    </div>
                  </div>
                  
                  {/* ✅ NEU: Price Row mit Details Button */}
                  <div style={styles.priceRow}>
                    <div style={styles.dishPrice}>€{dish.price.toFixed(2)}</div>
                    <button
                      style={styles.detailsButton}
                      className="details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDish(dish);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark' 
                          ? 'rgba(255,102,0,0.1)' 
                          : 'rgba(255,102,0,0.08)';
                        e.currentTarget.style.borderColor = colors.accent;
                        e.currentTarget.style.transform = 'translateX(3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = colors.borderHover;
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      Details
                    </button>
                  </div>
                  
                  {/* ✅ Tags jetzt UNTER der Price Row */}
                  <div style={styles.dishTags}>
                    {dish.vegetarian && (
                      <div style={styles.dishTag}>
                        <Leaf size={isMobile ? 10 : 12} />
                        {!isMobile && 'Vegi'}
                      </div>
                    )}
                    {dish.spicy && (
                      <div style={styles.dishTag}>
                        <Flame size={isMobile ? 10 : 12} />
                        {!isMobile && 'Scharf'}
                      </div>
                    )}
                    {dish.new && (
                      <div style={styles.dishTag}>
                        <Star size={isMobile ? 10 : 12} />
                        {!isMobile && 'Neu'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              Keine Gerichte gefunden. Versuche andere Filter oder Suchbegriffe.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
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
                {categoryIcons[selectedDish.category] || ''} {selectedDish.category}
              </span>

              <p style={styles.modalDescription}>
                {selectedDish.description}
              </p>

              {(selectedDish.spicy || selectedDish.vegetarian || selectedDish.vegan) && (
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
                  {selectedDish.vegan && (
                    <div style={styles.iconBadge}>
                      <Leaf size={isMobile ? 14 : 16} />
                      Vegan
                    </div>
                  )}
                </div>
              )}

              {selectedDish.ingredients && selectedDish.ingredients.length > 0 && (
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
              )}

              {selectedDish.allergens && selectedDish.allergens.length > 0 && (
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
              )}

              <div style={styles.modalPriceSection}>
                <div style={styles.modalPriceLabel}>Preis</div>
                <div style={styles.modalPrice}>€{selectedDish.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MenuSection;