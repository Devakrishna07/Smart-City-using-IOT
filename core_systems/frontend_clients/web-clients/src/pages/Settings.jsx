import { useState } from "react";
import { 
  Monitor, 
  Bell, 
  Shield, 
  Video, 
  Users, 
  Database, 
  Wifi,
  Save,
  RotateCcw,
  Moon,
  Sun,
  Palette
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("display");
  const [theme, setTheme] = useState("dark");
  const [settings, setSettings] = useState({
    // Display Settings
    darkMode: true,
    brightness: 80,
    gridLayout: "2x2",
    autoRotate: true,
    refreshRate: "5s",
    
    // Notification Settings
    motionAlerts: true,
    soundAlerts: false,
    emailNotifications: true,
    pushNotifications: true,
    alertSensitivity: 70,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    autoLogout: true,
    passwordExpiry: 90,
    
    // Recording Settings
    autoRecord: true,
    recordQuality: "1080p",
    storageDays: 30,
    motionDetection: true,
    continuousRecording: false,
    
    // Network Settings
    bandwidth: "high",
    streamQuality: "1080p",
    adaptiveStreaming: true,
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // Add save logic here
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset logic here
      console.log("Settings reset");
    }
  };

  const tabs = [
    { id: "display", label: "Display", icon: <Monitor className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "recording", label: "Recording", icon: <Video className="w-5 h-5" /> },
    { id: "network", label: "Network", icon: <Wifi className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[slideDown_0.6s_ease-out]">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-purple-300">Configure your surveillance system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-purple-200 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme
            </h3>
            <div className="space-y-2">
              {[
                { id: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
                { id: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
                { id: "auto", label: "Auto", icon: <Monitor className="w-4 h-4" /> },
              ].map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
                    ${theme === themeOption.id
                      ? "bg-purple-500/30 text-white border border-purple-500"
                      : "text-purple-200 hover:bg-white/10"
                    }
                  `}
                >
                  {themeOption.icon}
                  <span className="text-sm">{themeOption.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 min-h-[600px]">
            {/* Display Settings */}
            {activeTab === "display" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold mb-6">Display Settings</h2>
                
                <ToggleSetting
                  label="Dark Mode"
                  description="Enable dark theme for better viewing in low light"
                  value={settings.darkMode}
                  onChange={(val) => updateSetting("darkMode", val)}
                />

                <SliderSetting
                  label="Brightness"
                  description="Adjust screen brightness"
                  value={settings.brightness}
                  onChange={(val) => updateSetting("brightness", val)}
                  min={0}
                  max={100}
                  unit="%"
                />

                <SelectSetting
                  label="Grid Layout"
                  description="Choose camera grid layout"
                  value={settings.gridLayout}
                  onChange={(val) => updateSetting("gridLayout", val)}
                  options={[
                    { value: "2x2", label: "2x2 Grid" },
                    { value: "3x3", label: "3x3 Grid" },
                    { value: "4x4", label: "4x4 Grid" },
                  ]}
                />

                <ToggleSetting
                  label="Auto-Rotate Cameras"
                  description="Automatically cycle through camera feeds"
                  value={settings.autoRotate}
                  onChange={(val) => updateSetting("autoRotate", val)}
                />

                <SelectSetting
                  label="Refresh Rate"
                  description="Camera feed refresh interval"
                  value={settings.refreshRate}
                  onChange={(val) => updateSetting("refreshRate", val)}
                  options={[
                    { value: "3s", label: "3 seconds" },
                    { value: "5s", label: "5 seconds" },
                    { value: "10s", label: "10 seconds" },
                  ]}
                />
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
                
                <ToggleSetting
                  label="Motion Alerts"
                  description="Get notified when motion is detected"
                  value={settings.motionAlerts}
                  onChange={(val) => updateSetting("motionAlerts", val)}
                />

                <ToggleSetting
                  label="Sound Alerts"
                  description="Play sound when alerts are triggered"
                  value={settings.soundAlerts}
                  onChange={(val) => updateSetting("soundAlerts", val)}
                />

                <ToggleSetting
                  label="Email Notifications"
                  description="Receive alerts via email"
                  value={settings.emailNotifications}
                  onChange={(val) => updateSetting("emailNotifications", val)}
                />

                <ToggleSetting
                  label="Push Notifications"
                  description="Receive push notifications on mobile devices"
                  value={settings.pushNotifications}
                  onChange={(val) => updateSetting("pushNotifications", val)}
                />

                <SliderSetting
                  label="Alert Sensitivity"
                  description="Adjust motion detection sensitivity"
                  value={settings.alertSensitivity}
                  onChange={(val) => updateSetting("alertSensitivity", val)}
                  min={0}
                  max={100}
                  unit="%"
                />
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                
                <ToggleSetting
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  value={settings.twoFactorAuth}
                  onChange={(val) => updateSetting("twoFactorAuth", val)}
                />

                <SelectSetting
                  label="Session Timeout"
                  description="Auto-logout after inactivity"
                  value={settings.sessionTimeout}
                  onChange={(val) => updateSetting("sessionTimeout", val)}
                  options={[
                    { value: 15, label: "15 minutes" },
                    { value: 30, label: "30 minutes" },
                    { value: 60, label: "1 hour" },
                    { value: 120, label: "2 hours" },
                  ]}
                />

                <ToggleSetting
                  label="Auto-Logout"
                  description="Automatically logout on session timeout"
                  value={settings.autoLogout}
                  onChange={(val) => updateSetting("autoLogout", val)}
                />

                <SelectSetting
                  label="Password Expiry"
                  description="Force password change after specified days"
                  value={settings.passwordExpiry}
                  onChange={(val) => updateSetting("passwordExpiry", val)}
                  options={[
                    { value: 30, label: "30 days" },
                    { value: 60, label: "60 days" },
                    { value: 90, label: "90 days" },
                    { value: 0, label: "Never" },
                  ]}
                />
              </div>
            )}

            {/* Recording Settings */}
            {activeTab === "recording" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold mb-6">Recording Settings</h2>
                
                <ToggleSetting
                  label="Auto-Record"
                  description="Automatically record when motion is detected"
                  value={settings.autoRecord}
                  onChange={(val) => updateSetting("autoRecord", val)}
                />

                <SelectSetting
                  label="Recording Quality"
                  description="Choose video recording quality"
                  value={settings.recordQuality}
                  onChange={(val) => updateSetting("recordQuality", val)}
                  options={[
                    { value: "720p", label: "720p HD" },
                    { value: "1080p", label: "1080p Full HD" },
                    { value: "4K", label: "4K Ultra HD" },
                  ]}
                />

                <SliderSetting
                  label="Storage Duration"
                  description="Keep recordings for specified days"
                  value={settings.storageDays}
                  onChange={(val) => updateSetting("storageDays", val)}
                  min={7}
                  max={90}
                  unit=" days"
                />

                <ToggleSetting
                  label="Motion Detection"
                  description="Only record when motion is detected"
                  value={settings.motionDetection}
                  onChange={(val) => updateSetting("motionDetection", val)}
                />

                <ToggleSetting
                  label="Continuous Recording"
                  description="Record 24/7 regardless of motion"
                  value={settings.continuousRecording}
                  onChange={(val) => updateSetting("continuousRecording", val)}
                />
              </div>
            )}

            {/* Network Settings */}
            {activeTab === "network" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold mb-6">Network Settings</h2>
                
                <SelectSetting
                  label="Bandwidth Usage"
                  description="Control network bandwidth consumption"
                  value={settings.bandwidth}
                  onChange={(val) => updateSetting("bandwidth", val)}
                  options={[
                    { value: "low", label: "Low (Save Data)" },
                    { value: "medium", label: "Medium (Balanced)" },
                    { value: "high", label: "High (Best Quality)" },
                  ]}
                />

                <SelectSetting
                  label="Stream Quality"
                  description="Live stream video quality"
                  value={settings.streamQuality}
                  onChange={(val) => updateSetting("streamQuality", val)}
                  options={[
                    { value: "480p", label: "480p" },
                    { value: "720p", label: "720p HD" },
                    { value: "1080p", label: "1080p Full HD" },
                  ]}
                />

                <ToggleSetting
                  label="Adaptive Streaming"
                  description="Automatically adjust quality based on connection"
                  value={settings.adaptiveStreaming}
                  onChange={(val) => updateSetting("adaptiveStreaming", val)}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 border border-white/20"
              >
                <RotateCcw className="w-5 h-5" />
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ===========================
   Setting Components
   =========================== */

function ToggleSetting({ label, description, value, onChange }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
          <p className="text-sm text-purple-300">{description}</p>
        </div>
        <button
          onClick={() => onChange(!value)}
          className={`
            relative w-14 h-7 rounded-full transition-colors duration-300 flex-shrink-0 ml-4
            ${value ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/20"}
          `}
        >
          <div
            className={`
              absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg
              transition-transform duration-300
              ${value ? "translate-x-8" : "translate-x-1"}
            `}
          />
        </button>
      </div>
    </div>
  );
}

function SliderSetting({ label, description, value, onChange, min, max, unit }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <span className="text-purple-300 font-semibold">{value}{unit}</span>
        </div>
        <p className="text-sm text-purple-300">{description}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />
    </div>
  );
}

function SelectSetting({ label, description, value, onChange, options }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
        <p className="text-sm text-purple-300">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 hover:border-white/30 transition-all duration-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}