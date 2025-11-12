import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ThemeToggle from './components/layout/ThemeToggle';
import WelcomeSection from './components/sections/WelcomeSection';
import MenuSection from './components/sections/MenuSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import './App.css';

// Main Website Component
function MainWebsite() {
  return (
    <>
      <Navbar />
      <WelcomeSection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ThemeToggle />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainWebsite />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;