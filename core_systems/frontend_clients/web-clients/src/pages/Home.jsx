import { useState, useEffect } from "react";
import SidePanel from "../components/SidePanel";
import Navbar from "../components/Navbar";
import { TrendingUp, TrendingDown, Activity, Eye } from "lucide-react";

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
  },
];

/* ===========================
   CAMERA LIST (DECLARE ONCE)
   =========================== */
const CAMERAS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Camera ${i + 1}`,
  status: Math.random() > 0.2 ? "active" : "offline",
  location: i % 2 === 0 ? "Zone A" : "Zone B",
}));

export default function Home() {
  /* ✅ Hooks ONLY inside component */
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [hoveredCamera, setHoveredCamera] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);

  /* ===========================
     AUTO-ROTATE CAMERA FEED
     =========================== */
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => {
        const totalPages = Math.ceil(CAMERAS.length / 4);
        return (prev + 1) % totalPages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ===========================
     ANIMATE STATS ON MODE CHANGE
     =========================== */
  useEffect(() => {
    setAnimateStats(true);
    const timer = setTimeout(() => setAnimateStats(false), 600);
    return () => clearTimeout(timer);
  }, [activeMode]);

  const totalPages = Math.ceil(CAMERAS.length / 4);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-[spin_20s_linear_infinite]" />
      </div>

      <SidePanel isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col relative z-10">
        <Navbar
          title={activeMode.title}
          subtitle={activeMode.subtitle}
          modes={MODES}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-6 lg:p-8 space-y-8">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <StatCard
              title="Active Cameras"
              value={activeMode.cameras}
              icon={<Eye className="w-6 h-6" />}
              animate={animateStats}
            />
            {activeMode.stats.map((stat, idx) => (
              <StatCard
                key={stat.key}
                title={stat.label}
                value={stat.value}
                trend={stat.trend}
                percentage={stat.percentage}
                icon={<Activity className="w-6 h-6" />}
                animate={animateStats}
                delay={idx * 100}
              />
            ))}
          </div>

          {/* MAIN SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LIVE FEED */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-white/10 shadow-2xl transform transition-all duration-300 hover:shadow-purple-500/20">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Feed
                  </h3>
                  <p className="text-sm text-purple-300 mt-1">
                    Showing {page * 4 + 1} – {Math.min(page * 4 + 4, CAMERAS.length)} of {CAMERAS.length}
                  </p>
                </div>

                {/* Pagination Dots */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPage(idx)}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${idx === page ? "bg-purple-500 w-6" : "bg-white/30 hover:bg-white/50"}
                      `}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {CAMERAS.slice(page * 4, page * 4 + 4).map((cam, idx) => (
                  <div
                    key={cam.id}
                    onMouseEnter={() => setHoveredCamera(cam.id)}
                    onMouseLeave={() => setHoveredCamera(null)}
                    className={`
                      relative group
                      rounded-xl border overflow-hidden
                      bg-gradient-to-br from-black/60 to-black/40
                      transition-all duration-300 cursor-pointer
                      ${cam.status === "active" ? "border-green-500/30" : "border-red-500/30"}
                      ${hoveredCamera === cam.id ? "scale-105 shadow-lg shadow-purple-500/30" : "scale-100"}
                      animate-[fadeIn_0.5s_ease-out]
                    `}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Camera Feed Placeholder */}
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="text-center">
                        <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <p className="text-sm font-semibold text-purple-200">{cam.name}</p>
                        <p className="text-xs text-purple-400 mt-1">{cam.location}</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          cam.status === "active" ? "bg-green-500 animate-pulse" : "bg-red-500"
                        }`}
                      />
                      <span className="text-xs text-white capitalize">{cam.status}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent
                        flex items-end justify-center p-3
                        transition-opacity duration-300
                        ${hoveredCamera === cam.id ? "opacity-100" : "opacity-0"}
                      `}
                    >
                      <button className="w-full py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                        View Full Screen
                      </button>
                    </div>

                    {/* Recording Indicator */}
                    {cam.status === "active" && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs text-red-400 font-medium">REC</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Auto-rotate progress bar */}
              <div className="mt-5 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-[progress_5s_linear_infinite]"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {/* ALERTS PANEL */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold">Recent Alerts</h3>
                <div className="px-3 py-1 bg-red-500/20 rounded-full text-xs font-semibold text-red-400 animate-pulse">
                  {activeMode.alerts.length} Active
                </div>
              </div>

              <ul className="space-y-3">
                {activeMode.alerts.map((alert, i) => (
                  <AlertItem key={i} {...alert} index={i} />
                ))}
              </ul>

              {/* View All Button */}
              <button className="w-full mt-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20">
                View All Alerts
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction icon="📊" label="Analytics" />
            <QuickAction icon="⚙️" label="Settings" />
            <QuickAction icon="📁" label="Recordings" />
            <QuickAction icon="🔔" label="Notifications" />
          </div>
        </main>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ===========================
   UI COMPONENTS
   =========================== */

function StatCard({ title, value, icon, trend, percentage, animate, delay = 0 }) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-white/10
        shadow-lg hover:shadow-purple-500/20 transition-all duration-300
        hover:scale-105 hover:bg-white/10
        ${animate ? "animate-[slideIn_0.6s_ease-out]" : ""}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-purple-300 mb-2">{title}</p>
          <h4 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {value}
          </h4>
        </div>
        <div className="p-3 bg-purple-500/20 rounded-xl text-purple-300">{icon}</div>
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
          {trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
          {trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
          {trend === "neutral" && <Activity className="w-4 h-4 text-blue-400" />}
          <span
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-blue-400"
            }`}
          >
            {percentage}
          </span>
          <span className="text-xs text-purple-400">vs last hour</span>
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
    <li
      className={`
        bg-black/20 rounded-xl p-4 border transition-all duration-300
        hover:scale-102 hover:bg-black/30 cursor-pointer
        animate-[slideIn_0.5s_ease-out]
        ${severityColors[severity] || severityColors.low}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-2">
        <p className={`font-semibold ${color} flex items-center gap-2`}>
          <span className={`w-2 h-2 rounded-full ${color.replace("text-", "bg-")} animate-pulse`} />
          {title}
        </p>
        <span className="text-xs text-purple-400">{time}</span>
      </div>
      <p className="text-sm text-purple-200">{desc}</p>
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
          View
        </button>
        <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors">
          Dismiss
        </button>
      </div>
    </li>
  );
}

function QuickAction({ icon, label }) {
  return (
    <button
      className="
        flex flex-col items-center justify-center gap-2 p-4
        bg-white/5 backdrop-blur-xl rounded-xl border border-white/10
        hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20
        transition-all duration-300 group
      "
    >
      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="text-sm font-medium text-purple-200 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}