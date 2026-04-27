import { motion } from "motion/react";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold"
            >
              Back to Menu
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

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
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link to="/products">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </motion.button>
        </Link>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{product.rating}</span>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                {product.price.toLocaleString()} DA
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={decrementQuantity}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </motion.button>
                <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                  {quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={incrementQuantity}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart - {(product.price * quantity).toLocaleString()} DA
                  </>
                )}
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🚚</div>
                <div className="text-xs text-gray-600">Free Delivery</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-xs text-gray-600">30 min</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xs text-gray-600">Fresh & Hot</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md transition-all cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{relatedProduct.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {relatedProduct.price.toLocaleString()} DA
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(relatedProduct);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-sm font-semibold"
                      >
                        Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
