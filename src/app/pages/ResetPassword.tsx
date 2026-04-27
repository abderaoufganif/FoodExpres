import { motion } from "motion/react";
import { Lock, ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Password reset successful");
    setErrors({});
    setIsSubmitted(true);

    setTimeout(() => {
      navigate("/signin");
    }, 3000);
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { strength: 2, label: "Medium", color: "bg-yellow-500" };
    return { strength: 3, label: "Strong", color: "bg-green-500" };
  };

  const strength = passwordStrength(newPassword);

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
                  Reset Password
                </h1>
                <p className="text-gray-600">
                  Enter your new password below
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrors({ ...errors, newPassword: undefined });
                      }}
                      placeholder="Enter new password"
                      required
                      className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 ${
                        errors.newPassword ? "border-red-500" : "border-gray-200"
                      } rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-500">{errors.newPassword}</p>
                  )}

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(strength.strength / 3) * 100}%` }}
                            className={`h-full ${strength.color} transition-all`}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{strength.label}</span>
                      </div>
                      <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      placeholder="Confirm new password"
                      required
                      className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-200"
                      } rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
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

              {/* Security Note */}
              <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  Make sure your new password is strong and unique. Don't reuse passwords from other accounts.
                </p>
              </div>
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
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Password Reset Successful!
                </h1>
                <p className="text-gray-600 mb-8">
                  Your password has been changed successfully. You can now sign in with your new password.
                </p>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-700">
                    Redirecting you to sign in page in a moment...
                  </p>
                </div>

                {/* Sign In Button */}
                <Link to="/signin">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Sign In Now
                    <ArrowRight className="w-5 h-5" />
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
          src="https://images.unsplash.com/photo-1703575572016-b82f05e6d4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
              Almost There!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-md">
              Just one more step and you'll be back to enjoying delicious food from your favorite restaurants.
            </p>

            {/* Security Tips */}
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Use a Strong Password</div>
                    <div className="text-sm text-white/80">Mix letters, numbers & symbols</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Keep It Secure</div>
                    <div className="text-sm text-white/80">Don't share with anyone</div>
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
