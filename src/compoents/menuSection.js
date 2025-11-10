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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debug Log
  useEffect(() => {
    console.log('📊 Menu Data loaded:', { 
      dishes: dishes.length, 
      categories: categories.length 
    });
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  // "Alle" Kategorie hinzufügen
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

  // Filter Logik
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

  // Get filtered dishes
  const getFilteredDishes = () => {
    let filteredDishes = activeCategory === 'alle' 
      ? dishes 
      : dishes.filter(d => d.category === activeCategory);
    
    // Search filter
    if (searchTerm) {
      filteredDishes = filteredDishes.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filters
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
    },
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '8px' : isTablet ? '15px' : '20px',
      marginBottom: isMobile ? '30px' : '40px',
      flexWrap: 'wrap',
      padding: isMobile ? '0' : '0 20px',
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
    },
    tab: {
      padding: isMobile ? '10px 16px' : isTablet ? '12px 24px' : '14px 30px',
      background: 'transparent',
      border: `2px solid ${colors.border}`,
      borderRadius: '30px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '6px' : '8px',
      fontSize: isMobile ? '0.85rem' : isTablet ? '0.95rem' : '1rem',
      fontWeight: 600,
      color: colors.textSecondary,
      whiteSpace: 'nowrap',
    },
    tabActive: {
      background: colors.accent,
      borderColor: colors.accent,
      color: '#fff',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 30px rgba(255,102,0,0.3)',
    },
    tabIcon: {
      fontSize: isMobile ? '1rem' : '1.2rem',
    },
    tabCount: {
      background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      padding: '2px 6px',
      borderRadius: '12px',
      fontSize: isMobile ? '0.65rem' : '0.75rem',
      minWidth: '20px',
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
    },
    filtersWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '10px' : '15px',
    },
    filtersContainer: {
      display: 'flex',
      gap: isMobile ? '8px' : '10px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    filterButton: {
      padding: isMobile ? '8px 14px' : isTablet ? '10px 18px' : '10px 20px',
      background: 'transparent',
      border: `1px solid ${colors.border}`,
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: colors.textSecondary,
      fontWeight: 500,
      whiteSpace: 'nowrap',
    },
    filterActive: {
      background: theme === 'dark' ? 'rgba(255,102,0,0.15)' : 'rgba(255,102,0,0.1)',
      borderColor: colors.accent,
      color: colors.accent,
    },
    activeFiltersDisplay: {
      display: activeFilters.length > 0 ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginTop: '15px',
      flexWrap: 'wrap',
    },
    activeFilterTag: {
      background: colors.accent,
      color: '#fff',
      padding: '5px 12px',
      borderRadius: '15px',
      fontSize: '0.75rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    clearFiltersButton: {
      background: 'transparent',
      color: colors.textSecondary,
      border: 'none',
      fontSize: '0.75rem',
      textDecoration: 'underline',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
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
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '10px',
      gap: '10px',
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
    },
    dishDescription: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: colors.textSecondary,
      lineHeight: 1.5,
      marginBottom: isMobile ? '10px' : '15px',
    },
    dishPrice: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontWeight: 800,
      color: colors.accent,
      whiteSpace: 'nowrap',
    },
    dishTags: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
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
  };

  return (
    <section style={styles.section}>
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
              {(!isMobile || activeCategory === category.id) && (
                <span>{category.name}</span>
              )}
              <span style={styles.tabCount}>{category.count}</span>
            </button>
          ))}
        </div>

        {/* Search & Filters */}
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

          <div style={styles.filtersWrapper}>
            <div style={styles.filtersContainer}>
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    style={
                      activeFilters.includes(filter.id)
                        ? { ...styles.filterButton, ...styles.filterActive }
                        : styles.filterButton
                    }
                    onClick={() => toggleFilter(filter.id)}
                  >
                    <Icon size={isMobile ? 14 : 16} />
                    {!isMobile && filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={styles.activeFiltersDisplay}>
            {activeFilters.map(filterId => {
              const filter = filters.find(f => f.id === filterId);
              const Icon = filter?.icon;
              return (
                <div key={filterId} style={styles.activeFilterTag}>
                  <Icon size={12} />
                  {filter?.label}
                </div>
              );
            })}
            {activeFilters.length > 0 && (
              <button
                style={styles.clearFiltersButton}
                onClick={() => setActiveFilters([])}
                onMouseEnter={(e) => e.target.style.color = colors.accent}
                onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
              >
                Alle löschen
              </button>
            )}
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
                    <div style={styles.dishPrice}>€{dish.price.toFixed(2)}</div>
                  </div>
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
    </section>
  );
}

export default MenuSection;