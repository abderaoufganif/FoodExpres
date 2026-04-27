import { Product } from "../context/CartContext";

export const products: Product[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    price: 1299,
    image: "https://images.unsplash.com/photo-1703575572016-b82f05e6d4f9?w=400&h=300&fit=crop",
    rating: 4.8,
    category: "Pizza",
    ingredients: ["cheese", "tomato", "basil"]
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Crispy chicken with spicy mayo and lettuce",
    price: 999,
    image: "https://images.unsplash.com/photo-1603614550145-c7bb90bbfddf?w=400&h=300&fit=crop",
    rating: 4.7,
    category: "Burgers",
    ingredients: ["chicken", "lettuce", "mayo"]
  },
  {
    id: 3,
    name: "Grilled Fish Platter",
    description: "Fresh grilled fish with rice and vegetables",
    price: 1899,
    image: "https://images.unsplash.com/photo-1761314015063-67eeda12a590?w=400&h=300&fit=crop",
    rating: 4.9,
    category: "Seafood",
    ingredients: ["fish", "rice", "vegetables"]
  },
  {
    id: 4,
    name: "Chicken Caesar Salad",
    description: "Crisp romaine with chicken, parmesan and croutons",
    price: 899,
    image: "https://images.unsplash.com/photo-1761315631508-eb81f826e6c3?w=400&h=300&fit=crop",
    rating: 4.5,
    category: "Salads",
    ingredients: ["lettuce", "cheese", "chicken"]
  },
  {
    id: 5,
    name: "Beef Pizza",
    description: "Loaded with beef and extra cheese",
    price: 1499,
    image: "https://images.unsplash.com/photo-1645087523667-52752c15ad25?w=400&h=300&fit=crop",
    rating: 4.8,
    category: "Pizza",
    ingredients: ["beef", "cheese", "tomato"]
  },
  {
    id: 6,
    name: "Beef Steak",
    description: "Premium beef grilled to perfection with garlic butter",
    price: 2499,
    image: "https://images.unsplash.com/photo-1774921676942-90c6cfe9d541?w=400&h=300&fit=crop",
    rating: 4.9,
    category: "Steaks",
    ingredients: ["beef", "garlic", "butter"]
  },
  {
    id: 7,
    name: "Vegetarian Bowl",
    description: "Healthy mix of vegetables and quinoa",
    price: 1199,
    image: "https://images.unsplash.com/photo-1759277513342-f23e8a422d67?w=400&h=300&fit=crop",
    rating: 4.6,
    category: "Bowls",
    ingredients: ["vegetables", "quinoa", "avocado"]
  },
  {
    id: 8,
    name: "Chicken Pasta",
    description: "Creamy pasta with chicken and parmesan",
    price: 1399,
    image: "https://images.unsplash.com/photo-1763376360111-3597e5877517?w=400&h=300&fit=crop",
    rating: 4.7,
    category: "Pasta",
    ingredients: ["pasta", "chicken", "cheese"]
  },
  {
    id: 9,
    name: "Fish & Chips",
    description: "Crispy fried fish with golden fries",
    price: 1599,
    image: "https://images.unsplash.com/photo-1761314015063-67eeda12a590?w=400&h=300&fit=crop",
    rating: 4.5,
    category: "Seafood",
    ingredients: ["fish", "potato", "lemon"]
  },
  {
    id: 10,
    name: "Beef Kebab",
    description: "Tender beef kebab with smoky BBQ sauce",
    price: 1999,
    image: "https://images.unsplash.com/photo-1774921677519-e2aeb343e9b9?w=400&h=300&fit=crop",
    rating: 4.8,
    category: "Kebabs",
    ingredients: ["beef", "bbq sauce", "spices"]
  },
  {
    id: 11,
    name: "Chicken Tacos",
    description: "Three soft tacos with grilled chicken",
    price: 1099,
    image: "https://images.unsplash.com/photo-1703575570737-6ad4b967f4e6?w=400&h=300&fit=crop",
    rating: 4.6,
    category: "Mexican",
    ingredients: ["chicken", "tomato", "lettuce"]
  },
  {
    id: 12,
    name: "Chocolate Dessert",
    description: "Rich chocolate mousse with berries",
    price: 799,
    image: "https://images.unsplash.com/photo-1759277513348-11e7141921b8?w=400&h=300&fit=crop",
    rating: 4.9,
    category: "Desserts",
    ingredients: ["chocolate", "cream", "berries"]
  }
];

export const allIngredients = [
  "cheese", "tomato", "basil", "chicken", "lettuce", "mayo", "fish", "rice",
  "avocado", "beef", "garlic", "butter", "vegetables", "quinoa",
  "pasta", "potato", "lemon", "bbq sauce", "spices", "chocolate",
  "cream", "berries"
];
