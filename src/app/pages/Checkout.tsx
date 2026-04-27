import { motion } from "motion/react";
import { ShoppingCart, MapPin, CreditCard, Check, ArrowLeft, Package, Clock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    notes: ""
  });

  const deliveryFee = cartItems.length > 0 ? 299 : 0;
  const tax = getTotalPrice() * 0.1;
  const total = getTotalPrice() + deliveryFee + tax;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 5000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items before checking out</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Browse Menu
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. Your delicious food is being prepared!
          </p>

          <div className="bg-orange-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Order Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                {Math.round(total).toLocaleString()} DA
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <span>Order confirmed</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <span>Preparing your food</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <span>On the way</span>
            </div>
          </div>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
            <p className="text-lg text-white/90">Complete your order</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link to="/cart">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </motion.button>
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  Delivery Address
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => handleChange("zipCode", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      placeholder="10001"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors resize-none"
                      placeholder="E.g., Ring doorbell, leave at door"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-orange-500" />
                  Payment Method
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === "card"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-gray-700" />
                        <span className="font-semibold text-gray-900">Credit/Debit Card</span>
                      </div>
                      {paymentMethod === "card" && (
                        <Check className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === "cash"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💵</span>
                        <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      </div>
                      {paymentMethod === "cash" && (
                        <Check className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                  </motion.button>
                </div>

                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        required={paymentMethod === "card"}
                        value={formData.cardNumber}
                        onChange={(e) => handleChange("cardNumber", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        required={paymentMethod === "card"}
                        value={formData.cardExpiry}
                        onChange={(e) => handleChange("cardExpiry", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label htmlFor="cardCVV" className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        id="cardCVV"
                        type="text"
                        required={paymentMethod === "card"}
                        value={formData.cardCVV}
                        onChange={(e) => handleChange("cardCVV", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
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

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-orange-500">
                          {(item.price * item.quantity).toLocaleString()} DA
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
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
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {Math.round(total).toLocaleString()} DA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Place Order
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing this order, you agree to our Terms of Service
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
