// Central food image library — AUTHENTIC Ghanaian cuisine.
//
// Dish photos are sourced from Wikimedia Commons (real, verified photos of the
// actual dishes) and resolved through the stable `Special:FilePath` endpoint,
// which supports on-the-fly width sizing. A couple of non-Ghanaian-specific
// items (e.g. shawarma) use a clean Unsplash photo where Commons quality is low.
//
// FUTURE PHASE: to use your own photography instead, drop files into
// src/assets/food/ and replace the value with an import, e.g.
//   import jollof from '../assets/food/jollof.jpg'
//   export const food = { jollofChicken: jollof, ... }
// The UI reads these values directly via img() — no other changes needed.

const COMMONS = 'https://commons.wikimedia.org/wiki/Special:FilePath/'

/**
 * Build a sized image URL.
 * - 'unsplash:<id>'      → Unsplash CDN, sized + optimized
 * - 'http...'            → returned as-is
 * - '<Commons File>.jpg' → Wikimedia Commons, sized via Special:FilePath
 */
export const img = (ref, w = 800) => {
  if (!ref) return ''
  if (ref.startsWith('http')) return ref
  if (ref.startsWith('unsplash:')) {
    return `https://images.unsplash.com/photo-${ref.slice(
      9
    )}?auto=format&fit=crop&w=${w}&q=80`
  }
  return `${COMMONS}${encodeURIComponent(ref)}?width=${w}`
}

// --- Dish photography (authentic Ghanaian, verified) ---
export const food = {
  jollofChicken: 'Ghana Jollof Rice with Chicken.jpg',
  friedRiceChicken: 'Ghanaian Fried Rice & Chicken.jpg',
  assortedJollof: 'Jollof rice with chicken and boiled eggs.jpg',
  shawarma: 'unsplash:1626700051175-6818013e1d4f',
  bankuTilapia: 'Banku and Grilled Tilapia.jpg',
  fufuLightSoup: 'Fufu and light soup with goat meat.jpg',
  waakye: 'Waakye with vegetables, fish and egg with ripe plantains.jpg',
  bankuOkro: 'Banku and okro stew in bowl.jpg',
  redRed: 'Red red and ripe plantain.jpg',
  kokonteGroundnut: 'Kokonte Dish.jpg',
  omotuoGroundnut: 'Omo Tuo at a Ghanaian restaurant in Colorado.jpg',
  riceGoat: 'Nigerian goat meat stew with jasmine rice.jpg',
  attiekeChicken: 'Attieke and chicken.jpg',
  kenkeyFish: 'Fanti Kenkey and fish.jpg',
  yamEgg: 'Boiled yam with egg stew.jpg',
  kelewele: 'Kelewele.jpg',
  sobolo: 'Sobolo.jpg',
}

// --- Feature imagery (hero / gallery / about) — authentic dishes ---
export const scene = {
  hero: food.waakye, // colourful, premium, warm
  aboutPreview: food.jollofChicken,
  aboutPage: food.friedRiceChicken,
}
