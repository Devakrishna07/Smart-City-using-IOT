import { Menu } from "lucide-react";

export default function Navbar({
  title,
  subtitle,
  modes,
  activeMode,
  setActiveMode,
  onMenuClick,
}) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Menu
          className="cursor-pointer text-white"
          onClick={onMenuClick}
        />
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-purple-300">{subtitle}</p>
        </div>
      </div>

      {/* Modes */}
      <div className="flex gap-2 bg-black/30 p-1 rounded-lg">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode)}
            className={`px-4 py-1.5 rounded-md text-sm transition
              ${
                activeMode.id === mode.id
                  ? "bg-purple-600 text-white"
                  : "text-purple-200 hover:bg-white/10"
              }`}
          >
            {mode.name}
          </button>
        ))}
      </div>
    </header>
  );
}
