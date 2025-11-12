import './App.css';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/navBar';
import WelcomePage from './components/welcomePage';
import ThemeToggleButton from './components/ThemeToggleButton';
import MenuSection from './components/menuSection';
import AboutSection from './components/aboutSection';
import ContactSection from './components/contactSection';
import SupabaseTest from './components/SupabaseTest';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <WelcomePage />

        <MenuSection />
        <AboutSection />
        <ContactSection />
        <ThemeToggleButton />
        <SupabaseTest />
      </div>
    </ThemeProvider>
  );
}

export default App;