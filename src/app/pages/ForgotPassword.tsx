import { motion } from "motion/react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-8"
            >
              FoodExpress
            </motion.div>
          </Link>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">
                  No worries, we'll send you reset instructions
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Reset Password
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              {/* Back to Sign In */}
              <Link to="/signin">
                <motion.button
                  whileHover={{ x: -4 }}
                  className="mt-6 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </motion.button>
              </Link>
            </>
          ) : (
            <>
              {/* Success State */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Success Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h1>
                <p className="text-gray-600 mb-2">
                  We sent a password reset link to
                </p>
                <p className="text-orange-500 font-semibold mb-8">
                  {email}
                </p>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-700">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                    >
                      try another email address
                    </button>
                  </p>
                </div>

                {/* Back to Sign In */}
                <Link to="/signin">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Sign In
                  </motion.button>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 relative overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1761314015063-67eeda12a590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Delicious food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-yellow-600/80" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Don't Worry!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-md">
              It happens to the best of us. We'll get you back to ordering delicious food in no time.
            </p>

            {/* Security Features */}
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Secure Reset</div>
                    <div className="text-sm text-white/80">Encrypted password recovery</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Quick Process</div>
                    <div className="text-sm text-white/80">Reset in under 2 minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
