import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import Navbar from "../components/Navbar";
import {
  Camera,
} from "lucide-react";

/* ===========================
   MODES CONFIG (BACKEND READY)
   =========================== */
const MODES = [
  {
    id: "traffic",
    name: "Traffic",
    title: "Traffic Monitoring Dashboard",
    subtitle: "Accident detection & traffic analytics",
    cameras: 24,
    stats: [
      { key: "trafficDensity", label: "Traffic Density", value: "Moderate" },
      { key: "accidents", label: "Accidents Detected", value: "3" },
    ],
    alerts: [
      { title: "Accident Detected", desc: "NH Junction – Camera 4", color: "text-red-400" },
      { title: "High Traffic Density", desc: "City Center Signal", color: "text-yellow-400" },
    ],
    feedLabel: "Traffic Camera Stream",
  },
  {
    id: "home",
    name: "Home",
    title: "Home Surveillance Dashboard",
    subtitle: "Live monitoring & motion detection",
    cameras: 6,
    stats: [
      { key: "motion", label: "Motion Detected", value: "2 Events" },
      { key: "status", label: "System Status", value: "Secure" },
    ],
    alerts: [
      { title: "Motion Detected", desc: "Front Door Camera", color: "text-yellow-400" },
      { title: "Person Detected", desc: "Living Room Camera", color: "text-red-400" },
    ],
    feedLabel: "Home Surveillance Camera Stream",
  },
];

export default function Home() {
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      <SidePanel isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          title={activeMode.title}
          subtitle={activeMode.subtitle}
          modes={MODES}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              title="Active Cameras"
              value={activeMode.cameras}
            />

            {activeMode.stats.map((stat) => (
              <StatCard
                key={stat.key}
                title={stat.label}
                value={stat.value}
              />
            ))}
          </div>

          {/* MAIN SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LIVE FEED */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Live Feed</h3>
              <div className="h-72 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 text-purple-300">
                {activeMode.feedLabel}
              </div>
            </div>

            {/* ALERTS */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Recent Alerts</h3>
              <ul className="space-y-4">
                {activeMode.alerts.map((alert, i) => (
                  <AlertItem key={i} {...alert} />
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ===========================
   UI COMPONENTS
   =========================== */

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <p className="text-sm text-purple-200">{title}</p>
      <h4 className="text-2xl font-bold mt-1">{value}</h4>
    </div>
  );
}

function AlertItem({ title, desc, color }) {
  return (
    <li className="bg-black/30 rounded-xl p-4 border border-white/10">
      <p className={`font-semibold ${color}`}>{title}</p>
      <p className="text-sm text-purple-200">{desc}</p>
    </li>
  );
}
