import {
  Bell,
  AlertTriangle,
  Settings,
  User,
  X,
} from "lucide-react";

export default function SidePanel({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900
          backdrop-blur-xl border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h1 className="text-xl font-bold text-white">AetherVision</h1>
            <p className="text-xs text-purple-300">
              Intelligent Vision Sentinel
            </p>
          </div>

          <X
            className="cursor-pointer text-purple-200 hover:text-white"
            onClick={onClose}
          />
        </div>

        {/* Menu */}
        <nav className="px-4 py-6 space-y-3">
          <SidebarItem icon={<Bell />} label="Notifications" />
          <SidebarItem icon={<AlertTriangle />} label="Alerts" />
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<User />} label="Profile" />
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 w-full text-center text-xs text-purple-300">
          © 2025 AetherVision
        </div>
      </aside>
    </>
  );
}

/* ===========================
   Sidebar Item
   =========================== */

function SidebarItem({ icon, label }) {
  return (
    <div
      className="
        flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
        text-purple-200 hover:bg-white/10 transition
      "
    >
      <span className="text-purple-300">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
