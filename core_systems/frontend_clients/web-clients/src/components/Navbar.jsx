import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ title, subtitle, modes, activeMode, setActiveMode, onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            <button onClick={onMenuClick} className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition-all duration-300">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
                <span className="truncate">{title}</span>
                <div className="hidden md:block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-purple-300 mt-0.5 truncate">{subtitle}</p>
            </div>
          </div>

          {/* Center - Modes (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 bg-white/5 rounded-xl p-1 border border-white/10 flex-shrink-0">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode)}
                className={`px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeMode.id === mode.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-purple-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {mode.name}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
            {/* Search (Desktop Only) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group max-w-xs">
              <Search className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0" />
              <input type="text" placeholder="Search..." className="bg-transparent text-white placeholder-purple-400 focus:outline-none w-full text-sm" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition-all duration-300">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white text-sm sm:text-base">Notifications</h3>
                        <span className="px-1.5 sm:px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] sm:text-xs font-semibold rounded-full">3 New</span>
                      </div>
                    </div>
                    <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                      <NotificationItem title="Motion Detected" desc="Front door camera detected movement" time="2 min ago" type="warning" />
                      <NotificationItem title="System Update" desc="New security patch available" time="1 hour ago" type="info" />
                      <NotificationItem title="Storage Alert" desc="Storage 85% full" time="3 hours ago" type="error" />
                    </div>
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-white/10">
                      <button className="w-full py-2 text-xs sm:text-sm text-purple-300 hover:text-white font-medium transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                  JD
                </div>
                <ChevronDown className="hidden sm:block w-3 h-3 md:w-4 md:h-4 text-purple-300" />
              </button>

              {showProfileDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowProfileDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10">
                      <p className="text-xs sm:text-sm font-medium text-white">John Doe</p>
                      <p className="text-[10px] sm:text-xs text-purple-300">Administrator</p>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-200 hover:text-white hover:bg-white/10 transition-colors">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        Profile
                      </Link>
                      <Link to="/settings" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-200 hover:text-white hover:bg-white/10 transition-colors">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      <div className="border-t border-white/10 my-1" />
                      <button onClick={() => { setShowProfileDropdown(false); console.log("Logout"); }} className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Mobile Mode Switcher */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg sm:rounded-xl p-1 border border-white/10 mt-2.5 sm:mt-3">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode)}
              className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeMode.id === mode.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-purple-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}

function NotificationItem({ title, desc, time, type }) {
  const typeColors = { warning: "text-yellow-400", error: "text-red-400", info: "text-blue-400" };
  return (
    <div className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className={`mt-0.5 sm:mt-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${typeColors[type].replace("text-", "bg-")} animate-pulse flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${typeColors[type]} text-xs sm:text-sm truncate`}>{title}</p>
          <p className="text-purple-200 text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-2">{desc}</p>
          <p className="text-purple-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}