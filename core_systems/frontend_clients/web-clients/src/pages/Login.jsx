import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-purple-600 rounded-full opacity-20" />
      <div className="absolute bottom-20 right-32 w-56 h-56 bg-pink-500 rounded-full opacity-20" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-purple-800/70 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">▲</span>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold text-white">Welcome Back</h2>
        <p className="text-center text-purple-200 mt-2">
          Sign in to continue to your account
        </p>

        <form className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">Email</label>
            <div className="flex items-center bg-purple-900/60 rounded-lg px-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent py-3 text-white placeholder-purple-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">Password</label>
            <div className="flex items-center bg-purple-900/60 rounded-lg px-3">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent py-3 text-white placeholder-purple-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-purple-200">
              <input type="checkbox" className="accent-pink-500" />
              Remember me
            </label>
            <a href="#" className="text-pink-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-purple-200 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-pink-400 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
