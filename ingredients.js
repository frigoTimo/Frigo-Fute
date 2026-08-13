// Catégories d'ingrédients affichées dans la section "Mon frigo", et listes utilisées pour les filtres (régime, allergènes).
const CATEGORIES = {
  "Légumes": ["Tomate", "Oignon", "Ail", "Gingembre", "Carotte", "Poivron", "Courgette", "Pomme de terre", "Champignon", "Salade", "Concombre", "Citron", "Avocat", "Haricots rouges"],
  "Œufs & laitiers": ["Œufs", "Lait", "Beurre", "Fromage râpé", "Crème fraîche", "Yaourt", "Parmesan"],
  "Féculents": ["Pâtes", "Riz", "Pain", "Farine", "Tortillas de blé", "Semoule de couscous"],
  "Protéines": ["Poulet", "Jambon", "Thon en boîte", "Lardons", "Steak haché", "Saucisse"],
  "Épices & herbes": ["Sel", "Poivre", "Moutarde", "Vinaigre", "Sauce soja", "Basilic", "Paprika", "Cumin", "Herbes de Provence", "Persil", "Piment", "Curry"],
  "Congélateur": ["Petits pois", "Épinards surgelés", "Poisson pané", "Frites surgelées", "Crevettes surgelées"],
  "Fruits & sucré": ["Sucre", "Chocolat", "Miel", "Levure chimique", "Vanille", "Pomme", "Banane"],
  "Épicerie": ["Huile d'olive"],
};

const CUISINE_EMOJI = { "France": "🇫🇷", "Italie": "🇮🇹", "Chine": "🇨🇳", "Mexique": "🇲🇽", "Maroc": "🇲🇦", "Inde": "🇮🇳", "Espagne": "🇪🇸", "Japon": "🇯🇵" };
const CUISINES = ["France", "Italie", "Chine", "Mexique", "Maroc", "Inde", "Espagne", "Japon"];

const VIANDE_POISSON = ["Poulet", "Jambon", "Lardons", "Thon en boîte", "Steak haché", "Saucisse", "Poisson pané", "Crevettes surgelées"];
const PORC = ["Jambon", "Lardons", "Saucisse"];
const GLUTEN = ["Pâtes", "Pain", "Farine", "Tortillas de blé", "Semoule de couscous", "Sauce soja"];
const LACTOSE = ["Lait", "Beurre", "Fromage râpé", "Crème fraîche", "Yaourt", "Parmesan"];
const OEUFS = ["Œufs"];

export const ALL_INGREDIENTS = Object.values(CATEGORIES).flat();

export { CATEGORIES, CUISINE_EMOJI, CUISINES, VIANDE_POISSON, PORC, GLUTEN, LACTOSE, OEUFS };
