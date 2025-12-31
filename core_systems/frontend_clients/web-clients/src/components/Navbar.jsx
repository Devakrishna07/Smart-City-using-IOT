import React from "react";
import { Bell, LogOut } from "lucide-react";

export default function Navbar() {
     return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
      {/* Brand */}
      <h1 className="text-2xl font-bold tracking-wide text-white">
        AetherVision
        <span className="text-purple-400 text-sm ml-2">
          Intelligent Vision Sentinel
        </span>
      </h1>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Bell className="text-purple-200 hover:text-white cursor-pointer" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-sm text-purple-200">Admin</span>
        </div>

        <LogOut className="text-red-400 hover:text-red-500 cursor-pointer" />
      </div>
    </nav>
  );
}