import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { useTheme } from "../ThemeContext";
import contactData from "../data/contact.json";

function ContactSection() {
  const { theme, colors } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const today = new Date().toLocaleDateString('de-DE', { weekday: 'long' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (contactData.form.fields.name.required && !formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    
    if (contactData.form.fields.email.required && !formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    
    // ✅ NEU: Telefon Validierung
    if (contactData.form.fields.phone.required && !formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    }
    
    if (contactData.form.fields.message.required && !formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('📧 Form submitted:', formData);
      setFormStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFormStatus(null);
      }, 3000);
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

    const styles = {
    section: {
        padding: isMobile ? "60px 20px" : isTablet ? "80px 40px" : "100px 60px",
        minHeight: '100vh',
        fontFamily: "'Raleway', sans-serif",
        position: "relative",
        transition: 'background 0.4s ease',
        backgroundColor: colors.sectionAlt,
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
    
    // ✅ TOP SECTION: Beide Spalten gleich hoch
    topSection: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "30px" : "40px",
        marginBottom: isMobile ? "50px" : "70px",
        alignItems: "stretch", // ✅ Beide Spalten gleich hoch
    },
    
    // LEFT COLUMN
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? "20px" : "25px",
    },
    
    mapContainer: {
        width: '100%',
        height: isMobile ? "300px" : isTablet ? "400px" : "450px",
        borderRadius: "15px",
        overflow: 'hidden',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.18)',
        outline: 'none',
    },
    
    map: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
    
    infoCard: {
        background: colors.secondary,
        padding: isMobile ? "20px" : "25px",
        borderRadius: "15px",
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.18)',
        outline: 'none',
    },
    
    infoTitle: {
        fontSize: isMobile ? "1.1rem" : "1.2rem",
        color: colors.text,
        fontWeight: 700,
        marginBottom: isMobile ? "15px" : "18px",
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'color 0.4s ease',
    },
    
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        marginBottom: isMobile ? "12px" : "14px",
        padding: "10px",
        borderRadius: "8px",
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    },
    
    infoItemHover: {
        background: theme === 'dark' ? 'rgba(255,102,0,0.05)' : 'rgba(255,102,0,0.03)',
    },
    
    infoIcon: {
        color: colors.accent,
        flexShrink: 0,
        marginTop: '2px',
    },
    
    infoText: {
        flex: 1,
    },
    
    infoLabel: {
        fontSize: "0.8rem",
        color: colors.textTertiary,
        marginBottom: "3px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: 'color 0.4s ease',
    },
    
    infoValue: {
        fontSize: isMobile ? "0.95rem" : "1rem",
        color: colors.text,
        fontWeight: 600,
        transition: 'color 0.4s ease',
    },
    
    infoLink: {
        color: colors.accent,
        textDecoration: 'none',
        transition: 'opacity 0.3s ease',
    },
    
// ✅ RIGHT COLUMN: 70% Öffnungszeiten (oben) + 30% Socials (unten)
rightColumn: {
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Gleiche Höhe wie linke Spalte
  gap: isMobile ? '20px' : '25px', // ✅ Gap zurück für Abstand zwischen Cards
  width: '100%', // ✅ NEU: Volle Breite
},

// ✅ HOURS CARD: 70% Höhe, volle Breite
hoursCard: {
  background: colors.secondary,
  padding: isMobile ? "20px" : "25px",
  borderRadius: "15px",
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme === 'dark' 
    ? 'rgba(255,255,255,0.1)' 
    : 'rgba(0,0,0,0.18)',
  outline: 'none',
  flex: isMobile ? '0 0 auto' : '7', // ✅ 70% via flex: 7
  display: 'flex',
  flexDirection: 'column',
  width: '100%', // ✅ NEU: Volle Breite
},

hoursTitle: {
  fontSize: isMobile ? "1.1rem" : "1.2rem",
  color: colors.text,
  fontWeight: 700,
  marginBottom: isMobile ? "15px" : "18px",
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'color 0.4s ease',
  flexShrink: 0,
},

hoursTable: {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  overflowY: 'auto',
},

hoursRow: {
  display: 'flex',
  justifyContent: 'space-between',
  padding: isMobile ? "12px 15px" : "14px 18px",
  borderRadius: "10px",
  background: colors.secondary,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme === 'dark' 
    ? 'rgba(255,255,255,0.05)' 
    : 'rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
},

hoursRowToday: {
  background: theme === 'dark' ? 'rgba(255,102,0,0.1)' : 'rgba(255,102,0,0.08)',
  borderColor: colors.accent,
  borderLeftWidth: '4px',
  boxShadow: '0 5px 15px rgba(255,102,0,0.2)',
},

hoursDay: {
  fontSize: isMobile ? "0.9rem" : "0.95rem",
  color: colors.text,
  fontWeight: 600,
  transition: 'color 0.4s ease',
},

hoursTime: {
  fontSize: isMobile ? "0.9rem" : "0.95rem",
  color: colors.textSecondary,
  transition: 'color 0.4s ease',
},

hoursClosed: {
  color: '#ff4444',
},

// ✅ SOCIALS CARD: 30% Höhe, volle Breite
socialsCard: {
  background: colors.secondary,
  padding: isMobile ? "20px" : "25px",
  borderRadius: "15px",
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme === 'dark' 
    ? 'rgba(255,255,255,0.1)' 
    : 'rgba(0,0,0,0.18)',
  outline: 'none',
  flex: isMobile ? '0 0 auto' : '3', // ✅ 30% via flex: 3
  display: 'flex',
  flexDirection: 'column',
  width: '100%', // ✅ NEU: Volle Breite
},

socialsTitle: {
  fontSize: isMobile ? "1.1rem" : "1.2rem",
  color: colors.text,
  fontWeight: 700,
  marginBottom: isMobile ? "15px" : "20px",
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'color 0.4s ease',
  flexShrink: 0,
},

socialsGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: isMobile ? "12px" : "15px",
  flex: 1,
  alignItems: 'center',
},

socialButton: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: isMobile ? "18px 12px" : "22px 15px",
  background: colors.primary,
  borderRadius: "12px",
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme === 'dark' 
    ? 'rgba(255,255,255,0.1)' 
    : 'rgba(0,0,0,0.18)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%',
},

socialButtonHover: {
  transform: 'translateY(-5px)',
  boxShadow: '0 10px 25px rgba(255,102,0,0.2)',
},

socialIcon: {
  transition: 'all 0.3s ease',
},

socialName: {
  fontSize: isMobile ? "0.8rem" : "0.85rem",
  color: colors.text,
  fontWeight: 600,
  transition: 'color 0.4s ease',
},
    // FORM SECTION (unverändert)
    formSection: {
        background: colors.secondary,
        padding: isMobile ? "30px 25px" : isTablet ? "40px 35px" : "50px 45px",
        borderRadius: "20px",
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.18)',
        outline: 'none',
    },
    
    formTitle: {
        fontSize: isMobile ? "1.5rem" : "1.8rem",
        color: colors.text,
        fontWeight: 700,
        marginBottom: isMobile ? "25px" : "35px",
        textAlign: 'center',
        transition: 'color 0.4s ease',
    },
    
    form: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: isMobile ? "20px" : "25px",
        maxWidth: "1000px",
        margin: '0 auto',
    },
    
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    
    formGroupFull: {
        gridColumn: isMobile ? "1" : "1 / -1",
    },
    
    label: {
        fontSize: isMobile ? "0.9rem" : "0.95rem",
        color: colors.text,
        fontWeight: 600,
        transition: 'color 0.4s ease',
    },
    
    input: {
        padding: isMobile ? "12px 15px" : "14px 18px",
        background: colors.primary,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.18)',
        borderRadius: "10px",
        fontSize: isMobile ? "0.9rem" : "0.95rem",
        color: colors.text,
        outline: 'none',
        transition: 'all 0.3s ease',
        fontFamily: "'Raleway', sans-serif",
    },
    
    inputError: {
        borderColor: '#ff4444',
    },
    
    textarea: {
        padding: isMobile ? "12px 15px" : "14px 18px",
        background: colors.primary,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.18)',
        borderRadius: "10px",
        fontSize: isMobile ? "0.9rem" : "0.95rem",
        color: colors.text,
        outline: 'none',
        transition: 'all 0.3s ease',
        fontFamily: "'Raleway', sans-serif",
        resize: 'vertical',
        minHeight: isMobile ? "150px" : "180px",
    },
    
    errorText: {
        fontSize: "0.8rem",
        color: '#ff4444',
        marginTop: '-5px',
    },
    
    submitButton: {
        padding: isMobile ? "14px 30px" : "16px 40px",
        background: colors.accentGradient,
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        fontSize: isMobile ? "0.9rem" : "1rem",
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        outline: 'none',
        boxShadow: '0 10px 30px rgba(255,102,0,0.3)',
        gridColumn: isMobile ? "1" : "1 / -1",
        maxWidth: isMobile ? '100%' : '300px',
        margin: '0 auto',
        width: '100%',
    },
    
    submitButtonHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 15px 40px rgba(255,102,0,0.5)',
    },
    
    statusMessage: {
        padding: "15px 20px",
        borderRadius: "10px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: "0.9rem",
        fontWeight: 600,
        gridColumn: "1 / -1",
    },
    
    successMessage: {
        background: theme === 'dark' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        color: '#22c55e',
    },
    
    errorMessage: {
        background: theme === 'dark' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#ef4444',
    },
    };

  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // ✅ Social Icons Mapping
  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
  };

  // ✅ Social Colors
  const getSocialColor = (platform) => {
    const colors = {
      instagram: '#E4405F',
      facebook: '#1877F2',
      youtube: '#FF0000',
    };
    return colors[platform] || colors.accent;
  };

  return (
    <section style={styles.section} id="contact">
      <div style={styles.container}>
        {/* HERO */}
        <div style={styles.hero}>
          <span style={styles.badge}>{contactData.hero.badge}</span>
          <h2 style={styles.title}>
            {contactData.hero.title} <span style={styles.titleAccent}>{contactData.hero.titleAccent}</span>
          </h2>
          <p style={styles.description}>{contactData.hero.description}</p>
        </div>

        {/* TOP SECTION */}
        <div style={styles.topSection}>
          {/* LEFT: Maps + Contact Info */}
          <div style={styles.leftColumn}>
            {/* Google Maps */}
            <div style={styles.mapContainer}>
              <iframe
                src={contactData.info.maps.embedUrl}
                style={styles.map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>
                <MapPin size={20} />
                Kontaktinformationen
              </h3>

              {/* Address */}
              <a 
                href={contactData.info.maps.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{textDecoration: 'none'}}
              >
                <div
                  style={hoveredInfo === 'address' ? {...styles.infoItem, ...styles.infoItemHover} : styles.infoItem}
                  onMouseEnter={() => setHoveredInfo('address')}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <MapPin size={18} style={styles.infoIcon} />
                  <div style={styles.infoText}>
                    <div style={styles.infoLabel}>Adresse</div>
                    <div style={styles.infoValue}>
                      {contactData.info.address.street}<br />
                      {contactData.info.address.city}<br />
                      {contactData.info.address.country}
                    </div>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${contactData.info.contact.phone}`} style={{textDecoration: 'none'}}>
                <div
                  style={hoveredInfo === 'phone' ? {...styles.infoItem, ...styles.infoItemHover} : styles.infoItem}
                  onMouseEnter={() => setHoveredInfo('phone')}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <Phone size={18} style={styles.infoIcon} />
                  <div style={styles.infoText}>
                    <div style={styles.infoLabel}>Telefon</div>
                    <div style={{...styles.infoValue, ...styles.infoLink}}>
                      {contactData.info.contact.phone}
                    </div>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${contactData.info.contact.email}`} style={{textDecoration: 'none'}}>
                <div
                  style={hoveredInfo === 'email' ? {...styles.infoItem, ...styles.infoItemHover} : styles.infoItem}
                  onMouseEnter={() => setHoveredInfo('email')}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <Mail size={18} style={styles.infoIcon} />
                  <div style={styles.infoText}>
                    <div style={styles.infoLabel}>E-Mail</div>
                    <div style={{...styles.infoValue, ...styles.infoLink}}>
                      {contactData.info.contact.email}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT: Opening Hours + Socials */}
          <div style={styles.rightColumn}>
            {/* Opening Hours */}
            <div style={styles.hoursCard}>
              <h3 style={styles.hoursTitle}>
                <Clock size={20} />
                {contactData.info.openingHours.title}
              </h3>

              <div style={styles.hoursTable}>
                {contactData.info.openingHours.hours.map((day, index) => (
                  <div 
                    key={index}
                    style={
                      day.day === today
                        ? {...styles.hoursRow, ...styles.hoursRowToday}
                        : styles.hoursRow
                    }
                  >
                    <span style={styles.hoursDay}>{day.day}</span>
                    <span style={day.closed ? {...styles.hoursTime, ...styles.hoursClosed} : styles.hoursTime}>
                      {day.closed ? 'Geschlossen' : day.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Social Media */}
            <div style={styles.socialsCard}>
              <h3 style={styles.socialsTitle}>
                📱 Folgen Sie uns
              </h3>

              <div style={styles.socialsGrid}>
                {contactData.info.socials.map((social, index) => {
                  const IconComponent = socialIcons[social.platform];
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={
                        hoveredSocial === social.platform
                          ? {...styles.socialButton, ...styles.socialButtonHover}
                          : styles.socialButton
                      }
                      onMouseEnter={() => setHoveredSocial(social.platform)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <IconComponent 
                        size={isMobile ? 24 : 28} 
                        style={{
                          ...styles.socialIcon,
                          color: hoveredSocial === social.platform 
                            ? getSocialColor(social.platform)
                            : colors.textSecondary
                        }}
                      />
                      <span style={styles.socialName}>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div style={styles.formSection}>
          <h3 style={styles.formTitle}>{contactData.form.title}</h3>
          
          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                {contactData.form.fields.name.label}
                {contactData.form.fields.name.required && <span style={{color: colors.accent}}> *</span>}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={contactData.form.fields.name.placeholder}
                style={errors.name ? {...styles.input, ...styles.inputError} : styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? 'rgba(255,102,0,0.1)' : 'rgba(255,102,0,0.08)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.18)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                {contactData.form.fields.email.label}
                {contactData.form.fields.email.required && <span style={{color: colors.accent}}> *</span>}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={contactData.form.fields.email.placeholder}
                style={errors.email ? {...styles.input, ...styles.inputError} : styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? 'rgba(255,102,0,0.1)' : 'rgba(255,102,0,0.08)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.18)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Phone */}
            <div style={{...styles.formGroup, ...styles.formGroupFull}}>
              <label style={styles.label}>
                {contactData.form.fields.phone.label}
                {contactData.form.fields.phone.required && <span style={{color: colors.accent}}> *</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={contactData.form.fields.phone.placeholder}
                style={errors.phone ? {...styles.input, ...styles.inputError} : styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? 'rgba(255,102,0,0.1)' : 'rgba(255,102,0,0.08)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.18)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
            </div>

            {/* Message */}
            <div style={{...styles.formGroup, ...styles.formGroupFull}}>
              <label style={styles.label}>
                {contactData.form.fields.message.label}
                {contactData.form.fields.message.required && <span style={{color: colors.accent}}> *</span>}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={contactData.form.fields.message.placeholder}
                style={errors.message ? {...styles.textarea, ...styles.inputError} : styles.textarea}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? 'rgba(255,102,0,0.1)' : 'rgba(255,102,0,0.08)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.18)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.message && <span style={styles.errorText}>{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={buttonHover ? {...styles.submitButton, ...styles.submitButtonHover} : styles.submitButton}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              <Send size={20} />
              {contactData.form.submitButton}
            </button>

            {/* Status Messages */}
            {formStatus === 'success' && (
              <div style={{...styles.statusMessage, ...styles.successMessage}}>
                <CheckCircle size={20} />
                {contactData.form.successMessage}
              </div>
            )}
            {formStatus === 'error' && (
              <div style={{...styles.statusMessage, ...styles.errorMessage}}>
                <AlertCircle size={20} />
                {contactData.form.errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;