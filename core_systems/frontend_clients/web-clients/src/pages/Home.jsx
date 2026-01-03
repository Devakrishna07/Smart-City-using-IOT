import { useState, useEffect } from "react";
import SidePanel from "../components/SidePanel";
import Navbar from "../components/Navbar";
import { TrendingUp, TrendingDown, Activity, Eye, X } from "lucide-react";

/* ===========================
   MODES CONFIG (DECLARE ONCE)
   =========================== */
const MODES = [
  {
    id: "traffic",
    name: "Traffic",
    title: "Traffic Monitoring Dashboard",
    subtitle: "Accident detection & traffic analytics",
    cameras: 24,
    stats: [
      { key: "trafficDensity", label: "Traffic Density", value: "Moderate", trend: "up", percentage: "+12%" },
      { key: "accidents", label: "Accidents Detected", value: "3", trend: "down", percentage: "-5%" },
    ],
    alerts: [
      { title: "Accident Detected", desc: "NH Junction – Camera 4", color: "text-red-400", time: "2 min ago", severity: "high" },
      { title: "High Traffic Density", desc: "City Center Signal", color: "text-yellow-400", time: "5 min ago", severity: "medium" },
    ],
    cameraList: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Traffic Cam ${i + 1}`,
      status: Math.random() > 0.15 ? "active" : "offline",
      location: [
        "Highway NH-44", "Main Junction", "City Center", "Ring Road", 
        "Metro Station", "Bus Stand", "Railway Crossing", "Toll Plaza",
        "Flyover Bridge", "Signal Point", "Bypass Road", "Airport Road",
        "Industrial Area", "Market Square", "College Gate", "Hospital Zone",
        "Stadium Circle", "Beach Road", "Hill Station", "Border Checkpoint",
        "Port Area", "Express Highway", "Service Lane", "Parking Zone"
      ][i],
      type: "Traffic"
    })),
  },
  {
    id: "home",
    name: "Home",
    title: "Home Surveillance Dashboard",
    subtitle: "Live monitoring & motion detection",
    cameras: 6,
    stats: [
      { key: "motion", label: "Motion Detected", value: "2 Events", trend: "up", percentage: "+2" },
      { key: "status", label: "System Status", value: "Secure", trend: "neutral", percentage: "100%" },
    ],
    alerts: [
      { title: "Motion Detected", desc: "Front Door Camera", color: "text-yellow-400", time: "1 min ago", severity: "medium" },
      { title: "Person Detected", desc: "Living Room Camera", color: "text-red-400", time: "3 min ago", severity: "high" },
    ],
    cameraList: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `Home Cam ${i + 1}`,
      status: Math.random() > 0.1 ? "active" : "offline",
      location: [
        "Front Door",
        "Living Room", 
        "Backyard",
        "Garage",
        "Hallway",
        "Kitchen"
      ][i],
      type: "Home"
    })),
  },
];

export default function Home() {
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [hoveredCamera, setHoveredCamera] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [fullScreenCamera, setFullScreenCamera] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => {
        const totalPages = Math.ceil(activeMode.cameraList.length / 4);
        return (prev + 1) % totalPages;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeMode]);

  useEffect(() => {
    setPage(0);
  }, [activeMode]);

  useEffect(() => {
    setAnimateStats(true);
    const timer = setTimeout(() => setAnimateStats(false), 600);
    return () => clearTimeout(timer);
  }, [activeMode]);

  const totalPages = Math.ceil(activeMode.cameraList.length / 4);
  const currentCameras = activeMode.cameraList.slice(page * 4, page * 4 + 4);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-600/10 rounded-full blur-3xl animate-[spin_20s_linear_infinite]" />
      </div>

      <SidePanel isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col relative z-10 w-full min-h-screen">
        <Navbar
          title={activeMode.title}
          subtitle={activeMode.subtitle}
          modes={MODES}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 overflow-y-auto">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <StatCard
              title="Active Cameras"
              value={activeMode.cameras}
              icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
              animate={animateStats}
            />
            {activeMode.stats.map((stat, idx) => (
              <StatCard
                key={stat.key}
                title={stat.label}
                value={stat.value}
                trend={stat.trend}
                percentage={stat.percentage}
                icon={<Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
                animate={animateStats}
                delay={idx * 100}
              />
            ))}
          </div>

          {/* MAIN SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* LIVE FEED */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-5">
                <div className="w-full sm:w-auto">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="truncate">Live Feed - {activeMode.name}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-300 mt-1">
                    Showing {page * 4 + 1} – {Math.min(page * 4 + 4, activeMode.cameraList.length)} of {activeMode.cameraList.length}
                  </p>
                </div>

                <div className="flex gap-1.5 sm:gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPage(idx)}
                      className={`
                        w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300
                        ${idx === page ? "bg-purple-500 w-3 sm:w-4 lg:w-6" : "bg-white/30 hover:bg-white/50"}
                      `}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {currentCameras.map((cam, idx) => (
                  <div
                    key={cam.id}
                    onMouseEnter={() => setHoveredCamera(cam.id)}
                    onMouseLeave={() => setHoveredCamera(null)}
                    className={`
                      relative group rounded-lg sm:rounded-xl border overflow-hidden
                      bg-gradient-to-br from-black/60 to-black/40
                      transition-all duration-300 cursor-pointer
                      ${cam.status === "active" 
                        ? cam.type === "Traffic" 
                          ? "border-blue-500/30" 
                          : "border-green-500/30"
                        : "border-red-500/30"
                      }
                      ${hoveredCamera === cam.id ? "scale-105 shadow-lg shadow-purple-500/30" : "scale-100"}
                      animate-[fadeIn_0.5s_ease-out]
                    `}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="text-center px-2">
                        <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{cam.name}</p>
                        <p className="text-xs text-purple-400 mt-1 truncate">{cam.location}</p>
                      </div>
                    </div>

                    <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-sm">
                      <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${cam.status === "active" ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                      <span className="text-[10px] sm:text-xs text-white capitalize">{cam.status}</span>
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent flex items-end justify-center p-2 sm:p-3 transition-opacity duration-300 ${hoveredCamera === cam.id ? "opacity-100" : "opacity-0"}`}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullScreenCamera(cam);
                        }}
                        className="w-full py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors"
                      >
                        View Full Screen
                      </button>
                    </div>

                    {cam.status === "active" && (
                      <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[10px] sm:text-xs text-red-400 font-medium">REC</span>
                      </div>
                    )}

                    <div className={`absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full backdrop-blur-sm text-[10px] sm:text-xs font-medium ${
                      cam.type === "Traffic" 
                        ? "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                        : "bg-green-500/20 border border-green-500/30 text-green-400"
                    }`}>
                      {cam.type}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-5 h-0.5 sm:h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-[progress_5s_linear_infinite]" style={{ width: "100%" }} />
              </div>
            </div>

            {/* ALERTS PANEL */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Recent Alerts</h3>
                <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500/20 rounded-full text-[10px] sm:text-xs font-semibold text-red-400 animate-pulse">
                  {activeMode.alerts.length} Active
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {activeMode.alerts.map((alert, i) => (
                  <AlertItem key={i} {...alert} index={i} />
                ))}
              </ul>

              <button className="w-full mt-4 sm:mt-5 py-2 sm:py-2.5 lg:py-3 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20">
                View All Alerts
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 pb-4">
            <QuickAction icon="📊" label="Analytics" onClick={() => console.log('Analytics clicked')} />
            <QuickAction icon="⚙️" label="Settings" onClick={() => setBottomPanelOpen(true)} />
            <QuickAction icon="📁" label="Recordings" onClick={() => console.log('Recordings clicked')} />
            <QuickAction icon="🔔" label="Notifications" onClick={() => console.log('Notifications clicked')} />
          </div>
        </main>
      </div>

      <BottomPanel isOpen={bottomPanelOpen} onClose={() => setBottomPanelOpen(false)} />

      {fullScreenCamera && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center animate-[fadeIn_0.3s_ease-out] p-4">
          <button
            onClick={() => setFullScreenCamera(null)}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{fullScreenCamera.name}</h2>
                  <p className="text-sm sm:text-base text-purple-300">{fullScreenCamera.location}</p>
                </div>
                <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-green-500/20 rounded-lg">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs sm:text-sm font-medium capitalize">{fullScreenCamera.status}</span>
                </div>
              </div>
              
              <div className="aspect-video bg-black rounded-lg sm:rounded-xl flex items-center justify-center">
                <Eye className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, icon, trend, percentage, animate, delay = 0 }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 xl:p-6 border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:bg-white/10 ${animate ? "animate-[slideIn_0.6s_ease-out]" : ""}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-purple-300 mb-1 sm:mb-2">{title}</p>
          <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent truncate">
            {value}
          </h4>
        </div>
        <div className="p-2 sm:p-2.5 lg:p-3 bg-purple-500/20 rounded-lg sm:rounded-xl text-purple-300 flex-shrink-0">{icon}</div>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
          {trend === "up" && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />}
          {trend === "down" && <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />}
          {trend === "neutral" && <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />}
          <span className={`text-xs sm:text-sm font-medium ${trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-blue-400"}`}>
            {percentage}
          </span>
          <span className="text-[10px] sm:text-xs text-purple-400 truncate">vs last hour</span>
        </div>
      )}
    </div>
  );
}

function AlertItem({ title, desc, color, time, severity, index }) {
  const severityColors = {
    high: "border-red-500/30 bg-red-500/5",
    medium: "border-yellow-500/30 bg-yellow-500/5",
    low: "border-blue-500/30 bg-blue-500/5",
  };

  return (
    <li className={`bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border transition-all duration-300 hover:scale-102 hover:bg-black/30 cursor-pointer animate-[slideIn_0.5s_ease-out] ${severityColors[severity] || severityColors.low}`} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start justify-between mb-2 gap-2">
        <p className={`font-semibold text-xs sm:text-sm lg:text-base ${color} flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0`}>
          <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${color.replace("text-", "bg-")} animate-pulse flex-shrink-0`} />
          <span className="truncate">{title}</span>
        </p>
        <span className="text-[10px] sm:text-xs text-purple-400 flex-shrink-0">{time}</span>
      </div>
      <p className="text-xs sm:text-sm text-purple-200 line-clamp-2">{desc}</p>
      <div className="flex gap-2 mt-2 sm:mt-3">
        <button className="px-2 sm:px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] sm:text-xs font-medium transition-colors">
          View
        </button>
        <button className="px-2 sm:px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] sm:text-xs font-medium transition-colors">
          Dismiss
        </button>
      </div>
    </li>
  );
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group">
      <span className="text-xl sm:text-2xl lg:text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-purple-200 group-hover:text-white transition-colors text-center">{label}</span>
    </button>
  );
}

function BottomPanel({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-[fadeIn_0.3s_ease-out]" onClick={onClose} />}
      <div className={`fixed bottom-0 left-0 right-0 max-h-[85vh] z-50 bg-gradient-to-t from-slate-900 via-purple-900 to-indigo-900 backdrop-blur-xl border-t border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">Quick Settings</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-all duration-200">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <div className="px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 4rem)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-3">Display</h3>
              <SettingItem label="Dark Mode" type="toggle" defaultValue={true} />
              <SettingItem label="Brightness" type="slider" defaultValue={80} />
              <SettingItem label="Grid Layout" type="select" options={["2x2", "3x3", "4x4"]} />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-3">Notifications</h3>
              <SettingItem label="Motion Alerts" type="toggle" defaultValue={true} />
              <SettingItem label="Sound Alerts" type="toggle" defaultValue={false} />
              <SettingItem label="Email Notifications" type="toggle" defaultValue={true} />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-3">Recording</h3>
              <SettingItem label="Auto-Record" type="toggle" defaultValue={true} />
              <SettingItem label="Quality" type="select" options={["720p", "1080p", "4K"]} />
              <SettingItem label="Storage Days" type="slider" defaultValue={30} max={90} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SettingItem({ label, type, defaultValue, options, max = 100 }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm text-purple-200">{label}</span>
        {type === "toggle" && (
          <button onClick={() => setValue(!value)} className={`relative w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-300 ${value ? "bg-purple-500" : "bg-white/20"}`}>
            <div className={`absolute top-0.5 sm:top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${value ? "translate-x-5 sm:translate-x-7" : "translate-x-1"}`} />
          </button>
        )}
      </div>
      {type === "slider" && (
        <div>
          <input type="range" min="0" max={max} value={value} onChange={(e) => setValue(e.target.value)} className="w-full h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500" />
          <span className="text-xs text-purple-400 mt-1">{value}</span>
        </div>
      )}
      {type === "select" && (
        <select value={value} onChange={(e) => setValue(e.target.value)} className="w-full mt-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500">
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-900">{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}