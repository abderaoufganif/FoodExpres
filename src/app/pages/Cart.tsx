import { motion } from "motion/react";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, ArrowRight, User } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const deliveryFee = cartItems.length > 0 ? 299 : 0;
  const tax = getTotalPrice() * 0.1;
  const total = getTotalPrice() + deliveryFee + tax;

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
            <Link to="/products" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</Link>
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
            <Link to="/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full hover:shadow-lg transition-shadow"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Cart</h1>
            <p className="text-lg text-white/90">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link to="/products">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </motion.button>
        </Link>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-3xl shadow-md"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Browse Menu
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          /* Cart with Items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-md"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link to={`/products/${item.id}`}>
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Link to={`/products/${item.id}`}>
                            <h3 className="text-lg font-bold text-gray-900 hover:text-orange-500 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.ingredients.slice(0, 3).map((ingredient) => (
                          <span
                            key={ingredient}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </motion.button>
                          <span className="text-lg font-bold text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </motion.button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            {(item.price * item.quantity).toLocaleString()} DA
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.price.toLocaleString()} DA each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="w-full py-3 text-red-500 hover:text-red-600 font-semibold transition-colors"
                >
                  Clear Cart
                </motion.button>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-md sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{getTotalPrice().toLocaleString()} DA</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">{deliveryFee.toLocaleString()} DA</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">{Math.round(tax).toLocaleString()} DA</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {Math.round(total).toLocaleString()} DA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Checkout Button */}
                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center mb-3">We accept</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                      VISA
                    </div>
                    <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                      MC
                    </div>
                    <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                      AMEX
                    </div>
                    <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                      PayPal
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
