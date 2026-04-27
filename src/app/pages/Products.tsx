import { motion } from "motion/react";
import { Star, ShoppingCart, SlidersHorizontal, X, User } from "lucide-react";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import * as Slider from "@radix-ui/react-slider";
import { useCart } from "../context/CartContext";
import { products, allIngredients } from "../data/products";

export default function Products() {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const ingredientMatch = selectedIngredients.length === 0 ||
        selectedIngredients.some(ing => product.ingredients.includes(ing));
      return priceMatch && ingredientMatch;
    });
  }, [priceRange, selectedIngredients]);

  const clearFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedIngredients([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            >
              FoodExpress
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/products" className="text-orange-500 font-semibold">Menu</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-6 h-6 text-gray-700" />
              </motion.button>
            </Link>
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-white/90">
              Explore our delicious selection of dishes
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full shadow-lg flex items-center justify-center"
            >
              {showFilters ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`
              lg:sticky lg:top-24 lg:h-fit w-80 bg-white rounded-2xl p-6 shadow-md
              ${showFilters ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden lg:block'}
            `}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                Filters
              </h2>
              {(selectedIngredients.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 3000) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="px-2">
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={3000}
                  step={100}
                  minStepsBetweenThumbs={1}
                >
                  <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                    <Slider.Range className="absolute bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label="Minimum price"
                  />
                  <Slider.Thumb
                    className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label="Maximum price"
                  />
                </Slider.Root>
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span className="font-semibold">{priceRange[0]} DA</span>
                  <span className="font-semibold">{priceRange[1]} DA</span>
                </div>
              </div>
            </div>

            {/* Ingredients Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Ingredients</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allIngredients.map((ingredient) => (
                  <label
                    key={ingredient}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient)}
                      onChange={() => toggleIngredient(ingredient)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Selected</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient) => (
                    <motion.button
                      key={ingredient}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleIngredient(ingredient)}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-orange-200 transition-colors"
                    >
                      {ingredient}
                      <X className="w-3 h-3" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{" "}
                <span className="font-semibold text-gray-900">{products.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white rounded-2xl shadow-md"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-md transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.ingredients.slice(0, 3).map((ingredient) => (
                          <span
                            key={ingredient}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {ingredient}
                          </span>
                        ))}
                        {product.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{product.ingredients.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                          {product.price.toLocaleString()} DA
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
