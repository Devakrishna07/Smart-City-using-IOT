import {
  Home,
  Car,
  Bell,
  AlertTriangle,
  Settings,
  User,
} from "lucide-react";

export default function SidePanel({ mode, setMode }) {
  return (
    <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-white">
        AetherVision
        <p className="text-sm text-purple-300">
          Intelligent Vision Sentinel
        </p>
      </h1>

      {/* Menu */}
      <nav className="space-y-3 flex-1">
        <SidebarItem
          icon={<Home />}
          label="Home Surveillance"
          active={mode === "home"}
          onClick={() => setMode("home")}
        />

        <SidebarItem
          icon={<Car />}
          label="Traffic Monitoring"
          active={mode === "traffic"}
          onClick={() => setMode("traffic")}
        />

        <SidebarItem icon={<Bell />} label="Notifications" />
        <SidebarItem icon={<AlertTriangle />} label="Alerts" />
        <SidebarItem icon={<Settings />} label="Settings" />
        <SidebarItem icon={<User />} label="Profile" />
      </nav>

      <p className="text-xs text-purple-300 text-center">
        © 2025 AetherVision
      </p>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${
          active
            ? "bg-purple-600/40 text-white"
            : "text-purple-200 hover:bg-white/10"
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}