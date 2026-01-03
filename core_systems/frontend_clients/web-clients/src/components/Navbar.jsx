// Navbar.jsx
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

export default function Navbar({
  title,
  subtitle,
  modes,
  activeMode,
  setActiveMode,
  onMenuClick,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Title Section */}
            <div className="animate-[slideRight_0.6s_ease-out]">
              <h1 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                {title}
                <div className="hidden lg:block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </h1>
              <p className="text-sm text-purple-300 mt-0.5">{subtitle}</p>
            </div>
          </div>

          {/* Center Section - Search & Modes */}
          <div className="flex-1 flex items-center justify-center gap-4 mx-8">
            {/* Search Bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group max-w-md w-full">
              <Search className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <input
                type="text"
                placeholder="Search cameras..."
                className="bg-transparent text-white placeholder-purple-400 focus:outline-none w-full text-sm"
              />
            </div>

            {/* Mode Buttons */}
            <div className="hidden lg:flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      activeMode.id === mode.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-purple-300 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition-all duration-300 hover:scale-110 group"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">
                          Notifications
                        </h3>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                          3 New
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <NotificationItem
                        title="Motion Detected"
                        desc="Front door camera detected movement"
                        time="2 min ago"
                        type="warning"
                      />
                      <NotificationItem
                        title="System Update"
                        desc="New security patch available"
                        time="1 hour ago"
                        type="info"
                      />
                      <NotificationItem
                        title="Storage Alert"
                        desc="Storage 85% full - cleanup recommended"
                        time="3 hours ago"
                        type="error"
                      />
                    </div>
                    <div className="px-4 py-3 border-t border-white/10">
                      <button className="w-full py-2 text-sm text-purple-300 hover:text-white font-medium transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                  JD
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowProfileDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white">John Doe</p>
                      <p className="text-xs text-purple-300">Administrator</p>
                    </div>
                    
                    <div className="py-1">
                      {/* Use Link for Profile */}
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      
                      {/* Use Link for Settings */}
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      
                      <div className="border-t border-white/10 my-1" />
                      
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          // Add logout logic here
                          console.log("Logout clicked");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}

/* ===========================
   Notification Item Component
   =========================== */
// ... (keep the existing NotificationItem component)
/* ===========================
   Notification Item Component
   =========================== */

function NotificationItem({ title, desc, time, type }) {
  const typeColors = {
    warning: "text-yellow-400",
    error: "text-red-400",
    info: "text-blue-400",
  };

  const typeBgColors = {
    warning: "bg-yellow-500/10",
    error: "bg-red-500/10",
    info: "bg-blue-500/10",
  };

  return (
    <div className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 w-2 h-2 rounded-full ${typeColors[type].replace(
            "text-",
            "bg-"
          )} animate-pulse`}
        />
        <div className="flex-1">
          <p className={`font-medium ${typeColors[type]} text-sm`}>{title}</p>
          <p className="text-purple-200 text-xs mt-1">{desc}</p>
          <p className="text-purple-400 text-xs mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}