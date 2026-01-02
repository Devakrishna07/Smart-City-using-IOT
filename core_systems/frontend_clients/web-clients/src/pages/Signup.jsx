import React from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
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

        <h2 className="text-center text-3xl font-bold text-white">
          Create Account
        </h2>
        <p className="text-center text-purple-200 mt-2">
          Sign up to access the system
        </p>

        <form className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">
              Full Name
            </label>
            <div className="flex items-center bg-purple-900/60 rounded-lg px-3">
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent py-3 text-white placeholder-purple-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">
              Email
            </label>
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
            <label className="block text-sm text-purple-200 mb-1">
              Password
            </label>
            <div className="flex items-center bg-purple-900/60 rounded-lg px-3">
              <input
                type="password"
                placeholder="Create a password"
                className="w-full bg-transparent py-3 text-white placeholder-purple-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">
              Confirm Password
            </label>
            <div className="flex items-center bg-purple-900/60 rounded-lg px-3">
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full bg-transparent py-3 text-white placeholder-purple-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-purple-200 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-pink-400 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
