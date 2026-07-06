// Menu data — single source of truth for the Menu page & favourites section.
// `image` holds a reference resolved via img() in src/data/images.js.
//
// FUTURE PHASE: swap a reference for your own imported photo (see images.js).

import { food } from './images'

export const categories = [
  { id: 'mains', label: 'Main Dishes' },
  { id: 'efie', label: 'Efie Ne Fie' }, // local / home food
  { id: 'sunday', label: 'Sunday Specials' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
]

export const menu = [
  // ---------- Main Dishes ----------
  {
    id: 'jollof-chicken',
    name: 'Jollof & Chicken',
    description:
      'Smoky party-style jollof rice in a rich tomato base, served with grilled chicken & coleslaw.',
    price: 70,
    rating: 4.9,
    reviews: 312,
    category: 'mains',
    featured: true,
    image: food.jollofChicken,
  },
  {
    id: 'fried-rice-chicken',
    name: 'Fried Rice & Chicken',
    description:
      'Ghana-style vegetable fried rice with golden fried chicken and house coleslaw.',
    price: 75,
    rating: 4.8,
    reviews: 241,
    category: 'mains',
    featured: true,
    image: food.friedRiceChicken,
  },
  {
    id: 'assorted-jollof',
    name: 'Assorted Jollof',
    description:
      'Loaded jollof rice served with assorted mixed meats and boiled egg.',
    price: 85,
    rating: 4.8,
    reviews: 168,
    category: 'mains',
    featured: false,
    image: food.assortedJollof,
  },
  {
    id: 'shawarma',
    name: 'Teez Special Shawarma',
    description:
      'Loaded chicken & beef shawarma wrap with garlic sauce, sausage and fresh veggies.',
    price: 50,
    rating: 4.7,
    reviews: 197,
    category: 'mains',
    featured: true,
    image: food.shawarma,
  },

  // ---------- Efie Ne Fie (home food) ----------
  {
    id: 'banku-tilapia',
    name: 'Banku & Tilapia',
    description:
      'Soft banku with whole grilled tilapia, fresh pepper sauce, onions and tomatoes.',
    price: 90,
    rating: 4.9,
    reviews: 268,
    category: 'efie',
    featured: true,
    image: food.bankuTilapia,
  },
  {
    id: 'fufu-light-soup',
    name: 'Fufu & Light Soup',
    description:
      'Hand-pounded fufu in aromatic goat light soup, spiced to warm the soul.',
    price: 80,
    rating: 4.9,
    reviews: 284,
    category: 'efie',
    featured: true,
    image: food.fufuLightSoup,
  },
  {
    id: 'waakye',
    name: 'Waakye Special',
    description:
      'Rice & beans with spaghetti, gari, boiled egg, fish and signature shito.',
    price: 65,
    rating: 4.8,
    reviews: 221,
    category: 'efie',
    featured: false,
    image: food.waakye,
  },
  {
    id: 'banku-okro',
    name: 'Banku & Okro Stew',
    description:
      'Soft banku served with rich okro stew loaded with assorted meat and fish.',
    price: 70,
    rating: 4.7,
    reviews: 142,
    category: 'efie',
    featured: false,
    image: food.bankuOkro,
  },
  {
    id: 'red-red',
    name: 'Red Red & Plantain',
    description:
      'Slow-cooked bean stew in palm oil served with sweet fried plantain.',
    price: 50,
    rating: 4.7,
    reviews: 118,
    category: 'efie',
    featured: false,
    image: food.redRed,
  },
  {
    id: 'kokonte-groundnut',
    name: 'Kokonte & Groundnut Soup',
    description:
      'Smooth kokonte paired with rich groundnut soup and assorted fish or meat.',
    price: 75,
    rating: 4.6,
    reviews: 96,
    category: 'efie',
    featured: false,
    image: food.kokonteGroundnut,
  },
  {
    id: 'omotuo-groundnut',
    name: 'Omotuo & Groundnut Soup',
    description:
      'Soft rice balls served in a hearty, nutty groundnut soup — a Sunday classic.',
    price: 80,
    rating: 4.7,
    reviews: 109,
    category: 'efie',
    featured: false,
    image: food.omotuoGroundnut,
  },

  // ---------- Sunday Specials ----------
  {
    id: 'rice-goat',
    name: 'Plain Rice & Goat Stew',
    description:
      'Fluffy white rice served with a rich, tender goat meat stew.',
    price: 85,
    rating: 4.8,
    reviews: 173,
    category: 'sunday',
    featured: false,
    image: food.riceGoat,
  },
  {
    id: 'attieke-chicken',
    name: 'Attieke & Grilled Chicken',
    description:
      'Cassava attieke served with smoky grilled chicken and fresh pepper sauce.',
    price: 80,
    rating: 4.8,
    reviews: 134,
    category: 'sunday',
    featured: false,
    image: food.attiekeChicken,
  },
  {
    id: 'kenkey-fish',
    name: 'Kenkey & Fried Fish',
    description:
      'Fante kenkey with crispy fried fish, ground pepper, onions and tomatoes.',
    price: 55,
    rating: 4.7,
    reviews: 121,
    category: 'sunday',
    featured: false,
    image: food.kenkeyFish,
  },
  {
    id: 'yam-egg',
    name: 'Yam & Egg Stew',
    description:
      'Boiled yam served with a rich, savoury tomato egg stew.',
    price: 45,
    rating: 4.6,
    reviews: 88,
    category: 'sunday',
    featured: false,
    image: food.yamEgg,
  },

  // ---------- Sides ----------
  {
    id: 'kelewele',
    name: 'Kelewele',
    description:
      'Spicy fried plantain cubes seasoned with ginger, pepper and spices.',
    price: 30,
    rating: 4.8,
    reviews: 156,
    category: 'sides',
    featured: false,
    image: food.kelewele,
  },

  // ---------- Drinks ----------
  {
    id: 'sobolo',
    name: 'Sobolo',
    description:
      'Refreshing chilled hibiscus drink infused with ginger and natural spices.',
    price: 20,
    rating: 4.7,
    reviews: 92,
    category: 'drinks',
    featured: false,
    image: food.sobolo,
  },
]

export const featuredDishes = menu.filter((item) => item.featured)
