import { motion } from "motion/react";
import { Star, MapPin, Clock, Phone, Mail, Facebook, Instagram, Twitter, ChevronDown, Truck, CreditCard, MapPinned, Tag, Gift, Shield, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cartItems } = useCart();
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState<string[]>([]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            >
              FoodExpress
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</Link>
            <a href="#restaurants" className="text-gray-700 hover:text-orange-500 transition-colors">Restaurants</a>
            <a href="#reviews" className="text-gray-700 hover:text-orange-500 transition-colors">Reviews</a>
            <a href="#app" className="text-gray-700 hover:text-orange-500 transition-colors">Mobile App</a>
            <a href="#faq" className="text-gray-700 hover:text-orange-500 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </motion.button>
            </Link>
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

      {/* Hero Section - Full Bleed */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1703575572016-b82f05e6d4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGJ1cmdlciUyMGZhc3QlMjBmb29kJTIwZGVsaXZlcnl8ZW58MXx8fHwxNzc1OTE0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your Favorite Food
              <span className="block bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Delivered Fast
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-200 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Order from your favorite restaurants and get it delivered to your doorstep in minutes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  Order Now
                </motion.button>
              </Link>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Explore Menu
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy customers
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                rating: 5,
                review: "The fastest delivery I've ever experienced! Food arrived hot and fresh. Highly recommend!"
              },
              {
                name: "Michael Chen",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                rating: 5,
                review: "Amazing selection of restaurants and the app is so easy to use. My go-to food delivery service!"
              },
              {
                name: "Emma Davis",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
                rating: 5,
                review: "Great customer service and quality food. The subscription deals are fantastic value!"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl p-8 shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.review}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Restaurants Near You */}
      <section id="restaurants" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top Restaurants Near You
            </h2>
            <p className="text-xl text-gray-600">
              Discover local favorites
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPinned className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Interactive Map View</p>
                  <p className="text-gray-500 text-sm">Showing restaurants in your area</p>
                </div>
              </div>
              {/* Map pins */}
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-orange-500 rounded-full shadow-lg animate-pulse" />
              <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-orange-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-orange-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: "1s" }} />
            </motion.div>

            {/* Restaurant List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                {
                  name: "Bella Italia",
                  image: "https://images.unsplash.com/photo-1703575572016-b82f05e6d4f9?w=300&h=200&fit=crop",
                  rating: 4.8,
                  time: "20-30 min",
                  cuisine: "Italian"
                },
                {
                  name: "Tokyo Sushi Bar",
                  image: "https://images.unsplash.com/photo-1761314015063-67eeda12a590?w=300&h=200&fit=crop",
                  rating: 4.9,
                  time: "25-35 min",
                  cuisine: "Japanese"
                },
                {
                  name: "Burger House",
                  image: "https://images.unsplash.com/photo-1603614550145-c7bb90bbfddf?w=300&h=200&fit=crop",
                  rating: 4.7,
                  time: "15-25 min",
                  cuisine: "American"
                },
                {
                  name: "Thai Spice Kitchen",
                  image: "https://images.unsplash.com/photo-1774921676942-90c6cfe9d541?w=300&h=200&fit=crop",
                  rating: 4.6,
                  time: "30-40 min",
                  cuisine: "Thai"
                }
              ].map((restaurant, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  className="flex gap-4 bg-white rounded-2xl p-4 shadow-md border border-gray-100 transition-all cursor-pointer"
                >
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-28 h-28 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">{restaurant.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.time}</span>
                      </div>
                    </div>
                    <Link to="/products">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-sm font-medium"
                      >
                        Order Now
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription / Offers Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

        <div className="max-w-5xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get Exclusive Deals & Offers
              </h2>
              <p className="text-xl text-gray-600">
                Subscribe to receive special discounts and promotions
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Tag, title: "Special Discounts", desc: "Up to 50% off" },
                { icon: Truck, title: "Free Delivery", desc: "On orders over 3000 DA" },
                { icon: Gift, title: "Loyalty Rewards", desc: "Earn points on every order" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Features */}
      <section id="app" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Download Our Mobile App
            </h2>
            <p className="text-xl text-gray-600">
              Order on the go with our feature-packed app
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Get your food delivered in 30 minutes or less"
              },
              {
                icon: MapPinned,
                title: "Real-time Tracking",
                desc: "Track your order from restaurant to doorstep"
              },
              {
                icon: CreditCard,
                title: "Easy Payments",
                desc: "Multiple payment options for your convenience"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.15)" }}
                className="text-center p-8 rounded-2xl bg-gray-50 transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black text-white rounded-xl font-medium flex items-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              App Store
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black text-white rounded-xl font-medium flex items-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Google Play
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know
            </p>
          </motion.div>

          <Accordion.Root
            type="multiple"
            value={openFaq}
            onValueChange={setOpenFaq}
            className="space-y-4"
          >
            {[
              {
                question: "What is the average delivery time?",
                answer: "Most orders are delivered within 30-45 minutes. Delivery time may vary based on your location, restaurant preparation time, and current order volume."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery."
              },
              {
                question: "What is your refund policy?",
                answer: "If you're not satisfied with your order, contact us within 24 hours and we'll provide a full refund or replacement. Your satisfaction is our priority."
              },
              {
                question: "Do you have a minimum order amount?",
                answer: "Minimum order amount varies by restaurant, typically ranging from 1000-1500 DA. Free delivery is available on orders over 3000 DA."
              },
              {
                question: "Can I track my order in real-time?",
                answer: "Yes! Our mobile app and website provide real-time tracking so you can see exactly where your order is at all times."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Accordion.Item
                  value={`item-${index}`}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors group">
                      <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552846573-47e482355fa7?w=1920&h=600&fit=crop"
            alt="People enjoying food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-yellow-600/90" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center px-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hungry? Order Your
            <br />
            Favorite Meal Now!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Thousands of restaurants at your fingertips
          </p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-orange-600 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
            >
              Start Ordering
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company */}
            <div>
              <h3 className="text-white font-bold text-xl mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                FoodExpress
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your favorite food delivered fast, fresh, and with a smile.
              </p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, color: "#fb923c" }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, color: "#fb923c" }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, color: "#fb923c" }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Careers", "Blog", "Press Kit"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "FAQs", "Partner With Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Licenses"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-12 mb-12">
            <div className="max-w-2xl">
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get the latest deals and updates delivered to your inbox</p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-full border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 FoodExpress. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-FOOD-EXP</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@foodexpress.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
