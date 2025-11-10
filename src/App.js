import './App.css';
import { ThemeProvider } from './ThemeContext';
import Navbar from './compoents/navBar';
import WelcomePage from './compoents/welcomePage';
import FeaturedDishes from './compoents/featuredDishes';
import ThemeToggleButton from './compoents/ThemeToggleButton';
import MenuSection from './compoents/menuSection';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <WelcomePage />
        <FeaturedDishes />
        <MenuSection />
        <ThemeToggleButton />
      </div>
    </ThemeProvider>
  );
}

export default App;