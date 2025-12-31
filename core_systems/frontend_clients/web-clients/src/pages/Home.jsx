import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import Navbar from "../components/Navbar";
import {
  Camera,
  Car,
  AlertTriangle,
  Activity,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState("traffic"); // traffic | home

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      <SidePanel mode={mode} setMode={setMode} />

      <div className="flex-1 flex flex-col">
        <Navbar
          title={
            mode === "traffic"
              ? "Traffic Monitoring Dashboard"
              : "Home Surveillance Dashboard"
          }
          subtitle={
            mode === "traffic"
              ? "Accident detection & traffic analytics"
              : "Live monitoring & motion detection"
          }
        />

        {/* MAIN CONTENT */}
        <main className="p-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              icon={<Camera />}
              title="Active Cameras"
              value={mode === "traffic" ? "24" : "6"}
              color="from-indigo-500 to-purple-500"
            />

            {mode === "traffic" ? (
              <>
                <StatCard
                  icon={<Car />}
                  title="Traffic Density"
                  value="Moderate"
                  color="from-green-500 to-emerald-500"
                />
                <StatCard
                  icon={<AlertTriangle />}
                  title="Accidents Detected"
                  value="3"
                  color="from-red-500 to-pink-500"
                />
              </>
            ) : (
              <>
                <StatCard
                  icon={<Activity />}
                  title="Motion Detected"
                  value="2 Events"
                  color="from-yellow-500 to-orange-500"
                />
                <StatCard
                  icon={<ShieldCheck />}
                  title="System Status"
                  value="Secure"
                  color="from-cyan-500 to-blue-500"
                />
              </>
            )}
          </div>

          {/* SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Feed */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Live Feed</h3>
              <div className="h-72 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 text-purple-300">
                {mode === "traffic"
                  ? "Traffic Camera Stream"
                  : "Home Surveillance Camera Stream"}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">
                Recent Alerts
              </h3>

              <ul className="space-y-4">
                {mode === "traffic" ? (
                  <>
                    <AlertItem
                      title="Accident Detected"
                      desc="NH Junction – Camera 4"
                      color="text-red-400"
                    />
                    <AlertItem
                      title="High Traffic Density"
                      desc="City Center Signal"
                      color="text-yellow-400"
                    />
                  </>
                ) : (
                  <>
                    <AlertItem
                      title="Motion Detected"
                      desc="Front Door Camera"
                      color="text-yellow-400"
                    />
                    <AlertItem
                      title="Person Detected"
                      desc="Living Room Camera"
                      color="text-red-400"
                    />
                  </>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
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