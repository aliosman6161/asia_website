import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/navBar';
import WelcomePage from './components/welcomePage';
import ThemeToggleButton from './components/ThemeToggleButton';
import MenuSection from './components/menuSection';
import AboutSection from './components/aboutSection';
import ContactSection from './components/contactSection';
import Footer from './components/footer';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import './App.css';

function MainWebsite() {
  return (
    <>
      <Navbar />
      <WelcomePage />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ThemeToggleButton />
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