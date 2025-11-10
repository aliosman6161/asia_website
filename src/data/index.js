import categoriesData from './categories.json';
import menuData from './menu.json';
import restaurantData from './restaurant.json';

// Validierung
const validateDish = (dish) => {
  if (!dish.id || !dish.name || !dish.price || !dish.category) {
    console.error('❌ Invalid dish data:', dish);
    return false;
  }
  return true;
};

// Filter ungültige Gerichte
const validDishes = menuData.filter(validateDish);

// Kategorien mit Dish-Count erweitern
const categoriesWithCount = categoriesData.map(category => ({
  ...category,
  count: validDishes.filter(dish => dish.category === category.id).length
}));

// Helper: Gerichte nach Kategorie gruppieren
const dishesByCategory = categoriesData.reduce((acc, category) => {
  acc[category.id] = validDishes.filter(dish => dish.category === category.id);
  return acc;
}, {});

// Helper: Featured Gerichte (popular oder new)
const featuredDishes = validDishes.filter(dish => dish.popular || dish.new).slice(0, 4);

// Stats berechnen
const menuStats = {
  totalDishes: validDishes.length,
  totalCategories: categoriesData.length,
  vegetarianDishes: validDishes.filter(d => d.vegetarian).length,
  spicyDishes: validDishes.filter(d => d.spicy).length,
  newDishes: validDishes.filter(d => d.new).length,
};

// Category Icons Map
const categoryIcons = categoriesData.reduce((acc, cat) => {
  acc[cat.id] = cat.icon;
  return acc;
}, {});

// Export alles
export {
  restaurantData as restaurant,
  validDishes as dishes,
  categoriesWithCount as categories,
  dishesByCategory,
  featuredDishes,
  menuStats,
  categoryIcons
};

// Default Export
export default {
  restaurant: restaurantData,
  dishes: validDishes,
  categories: categoriesWithCount,
  dishesByCategory,
  featuredDishes,
  menuStats,
  categoryIcons
};