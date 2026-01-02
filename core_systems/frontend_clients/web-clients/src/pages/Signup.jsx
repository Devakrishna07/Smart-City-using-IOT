import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-500";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 relative overflow-hidden py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-32 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400 rounded-full opacity-10 blur-3xl animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 animate-[slideUp_0.6s_ease-out]">
        {/* Logo with glow effect */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse" />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
              <span className="text-white text-2xl font-bold">▲</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 animate-[fadeIn_0.8s_ease-out]">
          <h2 className="text-2xl font-bold text-white mb-1">
            Create Account
          </h2>
          <p className="text-purple-200 text-sm">
            Join us and start your journey today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Full Name
            </label>
            <div
              className={`bg-white/5 rounded-xl px-4 border-2 transition-all duration-300
                          ${
                            focusedField === "name"
                              ? "border-pink-400 shadow-lg shadow-pink-500/20 scale-[1.02]"
                              : "border-white/10 hover:border-white/20"
                          }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 transition-colors duration-300 ${
                    focusedField === "name" ? "text-pink-400" : "text-purple-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="John Doe"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-2.5 text-white placeholder-purple-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Email Address
            </label>
            <div
              className={`bg-white/5 rounded-xl px-4 border-2 transition-all duration-300
                          ${
                            focusedField === "email"
                              ? "border-pink-400 shadow-lg shadow-pink-500/20 scale-[1.02]"
                              : "border-white/10 hover:border-white/20"
                          }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 transition-colors duration-300 ${
                    focusedField === "email" ? "text-pink-400" : "text-purple-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-2.5 text-white placeholder-purple-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Password
            </label>
            <div
              className={`bg-white/5 rounded-xl px-4 border-2 transition-all duration-300
                          ${
                            focusedField === "password"
                              ? "border-pink-400 shadow-lg shadow-pink-500/20 scale-[1.02]"
                              : "border-white/10 hover:border-white/20"
                          }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 transition-colors duration-300 ${
                    focusedField === "password" ? "text-pink-400" : "text-purple-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => calculatePasswordStrength(e.target.value)}
                  className="w-full bg-transparent py-2.5 text-white placeholder-purple-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-purple-400 hover:text-pink-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {passwordStrength > 0 && (
              <div className="mt-1.5 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex gap-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength ? getStrengthColor() : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs ${passwordStrength >= 3 ? "text-green-400" : "text-yellow-400"}`}>
                  Password strength: {getStrengthText()}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label className="block text-sm font-medium text-purple-200 mb-1.5">
              Confirm Password
            </label>
            <div
              className={`bg-white/5 rounded-xl px-4 border-2 transition-all duration-300
                          ${
                            focusedField === "confirmPassword"
                              ? "border-pink-400 shadow-lg shadow-pink-500/20 scale-[1.02]"
                              : "border-white/10 hover:border-white/20"
                          }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 transition-colors duration-300 ${
                    focusedField === "confirmPassword" ? "text-pink-400" : "text-purple-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-2.5 text-white placeholder-purple-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-purple-400 hover:text-pink-400 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2 text-sm pt-1">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 w-4 h-4 accent-pink-500 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
            <label htmlFor="terms" className="text-purple-200 cursor-pointer hover:text-white transition-colors duration-200 text-xs">
              I agree to the{" "}
              <a href="#" className="text-pink-400 hover:text-pink-300 font-medium hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-pink-400 hover:text-pink-300 font-medium hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="relative w-full py-3 rounded-xl font-semibold text-white overflow-hidden
                       group transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              Create Account
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-purple-200 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-pink-400 font-semibold hover:text-pink-300 transition-colors duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-purple-800/50 text-purple-300">Or sign up with</span>
          </div>
        </div>

        {/* Social Signup */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl
                     bg-white/5 border border-white/10 text-white font-medium
                     hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]
                     transition-all duration-300 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
            G
          </span>
          <span className="text-base">Continue with Google</span>
        </button>
      </div>

      {/* Custom animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}