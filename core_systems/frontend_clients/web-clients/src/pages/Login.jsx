import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-32 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400 rounded-full opacity-10 blur-3xl animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      {/* Main Card */}
      <div
        className="relative z-10 w-full max-w-4xl mx-4 grid grid-cols-1 lg:grid-cols-2
                   bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden
                   border border-white/20
                   animate-[slideUp_0.6s_ease-out]"
      >
        {/* LEFT SECTION – BRANDING */}
        <div className="hidden lg:flex flex-col justify-center items-center text-center px-10 py-12
                        bg-gradient-to-br from-purple-900/40 to-purple-700/40 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/10 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-pink-400/20 rounded-full animate-[ping_4s_ease-in-out_infinite]" />

          {/* Logo with glow effect */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500
                            flex items-center justify-center shadow-2xl
                            transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
              <span className="text-white text-3xl font-bold">▲</span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-3 animate-[fadeIn_0.8s_ease-out]">
            Welcome Back
          </h2>
          <p className="text-purple-200 text-base leading-relaxed max-w-sm animate-[fadeIn_1s_ease-out]">
            Sign in to access your personalized dashboard and unlock powerful insights
          </p>

          {/* Decorative stats */}
          {/* <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
            {[
              { value: "10K+", label: "Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center animate-[fadeIn_1.2s_ease-out] hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-purple-300">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* RIGHT SECTION – LOGIN FORM */}
        <div className="p-6 lg:p-8 relative">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500
                              flex items-center justify-center shadow-xl">
                <span className="text-white text-2xl font-bold">▲</span>
              </div>
            </div>
          </div>

          <div className="animate-[slideRight_0.6s_ease-out]">
            <h3 className="text-2xl font-bold text-white text-center lg:text-left mb-1">
              Sign In
            </h3>
            <p className="text-purple-200 mb-6 text-center lg:text-left text-sm">
              Enter your credentials to continue
            </p>

            <form className="space-y-4">
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
                      placeholder="Enter your password"
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
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
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-purple-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-pink-500 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="group-hover:text-white transition-colors duration-200">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-pink-400 hover:text-pink-300 font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="relative w-full py-3 rounded-xl font-semibold text-white overflow-hidden
                           group transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Sign In
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
            <p className="text-center lg:text-left text-purple-200 text-sm mt-5">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-pink-400 font-semibold hover:text-pink-300 transition-colors duration-200 hover:underline"
              >
                Sign up for free
              </Link>
            </p>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-purple-800/50 text-purple-300">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
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
        </div>
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
          
          @keyframes slideRight {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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