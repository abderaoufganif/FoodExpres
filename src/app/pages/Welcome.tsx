import { motion } from "motion/react";
import { Check, Truck, Gift, Star, MapPin, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    location: "",
    favoriteCategory: ""
  });

  const categories = [
    { name: "Pizza", emoji: "🍕" },
    { name: "Burgers", emoji: "🍔" },
    { name: "Sushi", emoji: "🍣" },
    { name: "Salads", emoji: "🥗" },
    { name: "Desserts", emoji: "🍰" },
    { name: "Drinks", emoji: "🥤" }
  ];

  const handleFinish = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            >
              Welcome to <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">FoodExpress!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Your account has been successfully created. Get ready to enjoy delicious food delivered right to your doorstep!
            </motion.p>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">50% Off First Order</h3>
                <p className="text-gray-600">New customers get an exclusive discount on their first order</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-gray-600">Free delivery on all orders over $30 for the first month</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Rewards</h3>
                <p className="text-gray-600">Get points on every order and redeem for free meals</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(2)}
              className="px-12 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Set Your Preferences
              </h2>
              <p className="text-gray-600">Help us personalize your experience</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">Step 1 of 2</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Where are you located?
              </label>
              <input
                type="text"
                value={preferences.location}
                onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
                placeholder="Enter your city or ZIP code"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll show you restaurants and delivery options in your area
              </p>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(3)}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                What's Your Favorite?
              </h2>
              <p className="text-gray-600">Choose your favorite food category</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">Step 2 of 2</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "50%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                />
              </div>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences({ ...preferences, favoriteCategory: category.name })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    preferences.favoriteCategory === category.name
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-4xl mb-2">{category.emoji}</div>
                  <div className="font-semibold text-gray-900">{category.name}</div>
                  {preferences.favoriteCategory === category.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2"
                    >
                      <Check className="w-5 h-5 text-orange-500 mx-auto" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFinish}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Start Ordering
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              You can always change these preferences in your account settings
            </p>
          </motion.div>
        )}

        {/* Skip Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link
            to="/products"
            className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
          >
            Skip for now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
