import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  title,
  subtitle,
  modes,
  activeMode,
  setActiveMode,
  onMenuClick,
}) {
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <Search className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <input
                type="text"
                placeholder="Search cameras..."
                className="bg-transparent text-white placeholder-purple-400 focus:outline-none w-40 lg:w-48 text-sm"
              />
            </div>

            {/* Mode Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group"
              >
                <span className="text-sm font-medium text-white">
                  {activeMode.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-300 transition-transform duration-300 ${
                    showModeDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {showModeDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowModeDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                    {modes.map((mode, idx) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setActiveMode(mode);
                          setShowModeDropdown(false);
                        }}
                        className={`
                          w-full px-4 py-3 text-left transition-all duration-200
                          ${
                            activeMode.id === mode.id
                              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-l-2 border-purple-500"
                              : "text-purple-200 hover:bg-white/10 hover:text-white"
                          }
                        `}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{mode.name}</p>
                            <p className="text-xs text-purple-400 mt-0.5">
                              {mode.cameras} cameras
                            </p>
                          </div>
                          {activeMode.id === mode.id && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

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

            {/* User Profile */}
            <button className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <ChevronDown className="hidden lg:block w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
            </button>
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