// SidePanel.jsx
import {
  Bell,
  AlertTriangle,
  Settings,
  User,
  X,
  Home,
  BarChart3,
  Shield,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

export default function SidePanel({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay with animation */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-[fadeIn_0.3s_ease-out]"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900
          backdrop-blur-xl border-r border-white/10
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-600/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-indigo-600/20 to-transparent" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Animated Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500/50 rounded-lg blur-md group-hover:blur-lg transition-all duration-300 animate-pulse" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">AetherVision</h1>
              <p className="text-xs text-purple-300">Intelligent Vision Sentinel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-all duration-200 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="relative z-10 px-4 py-6 space-y-2">
          {/* Use Link for Dashboard */}
          <Link to="/" onClick={onClose}>
            <SidebarItem icon={<Home />} label="Dashboard" active={false} />
          </Link>
          
          <SidebarItem icon={<Camera />} label="Cameras" badge="24" />
          <SidebarItem icon={<Bell />} label="Notifications" badge="5" />
          <SidebarItem icon={<AlertTriangle />} label="Alerts" badge="2" />
          <SidebarItem icon={<BarChart3 />} label="Analytics" />
          <SidebarItem icon={<Shield />} label="Security" />
          
          {/* Use Link for Settings */}
          <Link to="/settings" onClick={onClose}>
            <SidebarItem icon={<Settings />} label="Settings" />
          </Link>
          
          {/* Use Link for Profile */}
          <Link to="/profile" onClick={onClose}>
            <SidebarItem icon={<User />} label="Profile" />
          </Link>
        </nav>

        {/* Status Section */}
        <div className="relative z-10 mx-4 mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-300">System Status</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Online</span>
            </div>
          </div>
          <div className="space-y-2">
            <StatusBar label="CPU" value={45} color="bg-blue-500" />
            <StatusBar label="Memory" value={62} color="bg-purple-500" />
            <StatusBar label="Storage" value={78} color="bg-pink-500" />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-6 py-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-purple-300">Administrator</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <Settings className="w-4 h-4 text-purple-300" />
              </button>
            </div>
          </div>
          
          <div className="px-6 py-3 text-center text-xs text-purple-400 bg-black/30">
            © 2025 AetherVision
          </div>
        </div>
      </aside>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

/* ===========================
   Sidebar Item Component
   =========================== */

function SidebarItem({ icon, label, active, badge }) {
  return (
    <div
      className={`
        flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer
        transition-all duration-300 group
        ${
          active
            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
            : "text-purple-200 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            transition-all duration-300
            ${active ? "text-purple-300 scale-110" : "text-purple-400 group-hover:scale-110 group-hover:text-purple-300"}
          `}
        >
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>

      {badge && (
        <span
          className={`
            px-2 py-0.5 rounded-full text-xs font-semibold
            ${
              active
                ? "bg-purple-500/30 text-purple-200"
                : "bg-white/10 text-purple-300 group-hover:bg-white/20"
            }
            animate-pulse
          `}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

/* ===========================
   Status Bar Component
   =========================== */
// ... (keep the existing StatusBar component)

/* ===========================
   Status Bar Component
   =========================== */

function StatusBar({ label, value, color }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-purple-300 mb-1">
        <span>{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}