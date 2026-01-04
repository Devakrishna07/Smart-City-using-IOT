import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Camera,
  Bell,
  Key,
  Edit2,
  Save,
  X,
  Upload,
  Check,
  LogOut,
  Globe,
  Lock,
  Eye,
  EyeOff,
  TrendingUp
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [userData, setUserData] = useState({
    name: "John Due",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 15, 2024",
    role: "Administrator",
    avatar: "JD", // Initials for avatar
    status: "active",
    twoFactorEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    theme: "dark",
    language: "English",
    timezone: "Pacific Time (PT)",
    sessionTimeout: 30,
  });

  const [securityData, setSecurityData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activityLog, setActivityLog] = useState([
    { id: 1, action: "Logged in", time: "2 minutes ago", device: "Chrome on Windows", location: "San Francisco, CA" },
    { id: 2, action: "Viewed camera feed", time: "15 minutes ago", device: "Chrome on Windows", location: "San Francisco, CA" },
    { id: 3, action: "Downloaded recording", time: "1 hour ago", device: "Chrome on Windows", location: "San Francisco, CA" },
    { id: 4, action: "Changed settings", time: "3 hours ago", device: "Chrome on Windows", location: "San Francisco, CA" },
    { id: 5, action: "Logged in", time: "Yesterday", device: "Safari on iPhone", location: "San Francisco, CA" },
  ]);

  const [stats, setStats] = useState({
    camerasViewed: 156,
    alertsReceived: 42,
    recordingsDownloaded: 23,
    uptime: "99.8%",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save user data
    console.log("User data saved:", userData);
  };

  const handlePasswordChange = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Add password change logic
    console.log("Password changed");
    setSecurityData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleAvatarUpload = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    // In real app, upload to server
    setTimeout(() => {
      setUserData(prev => ({ ...prev, avatar: "JD" }));
      clearInterval(interval);
      setIsUploading(false);
    }, 1500);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // Add logout logic
      console.log("User logged out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-4 lg:p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-purple-300">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col items-center text-center mb-6">
                {/* Avatar */}
                <div className="relative mb-4 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/20 flex items-center justify-center text-4xl font-bold text-white">
                    {userData.avatar}
                  </div>
                  
                  {/* Upload Button */}
                  <label className="absolute bottom-2 right-2 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAvatarUpload(e.target.files[0])}
                    />
                    <div className="p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors duration-300">
                      <Upload className="w-4 h-4" />
                    </div>
                  </label>
                </div>

                {/* Progress Bar for Upload */}
                {isUploading && (
                  <div className="w-full mt-2">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-purple-300 mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}

                <h2 className="text-2xl font-bold mt-4">{userData.name}</h2>
                <p className="text-purple-300 mb-2">{userData.role}</p>
                
                {/* Status Badge */}
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400 capitalize">{userData.status}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatItem icon={<Camera />} label="Cameras" value={stats.camerasViewed} />
                <StatItem icon={<Bell />} label="Alerts" value={stats.alertsReceived} />
                <StatItem icon={<TrendingUp />} label="Uptime" value={stats.uptime} />
                <StatItem icon={<Shield />} label="Security" value="High" />
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Navigation */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                {[
                  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
                  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
                  { id: "preferences", label: "Preferences", icon: <Globe className="w-4 h-4" /> },
                  { id: "activity", label: "Activity Log", icon: <TrendingUp className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                      ${activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                        : "text-purple-200 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 min-h-[600px]">
              {/* Profile Info */}
              {activeTab === "profile" && (
                <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField
                      label="Full Name"
                      value={userData.name}
                      icon={<User className="w-5 h-5" />}
                      editable={isEditing}
                      onChange={(value) => setUserData(prev => ({ ...prev, name: value }))}
                    />
                    
                    <InfoField
                      label="Email Address"
                      value={userData.email}
                      icon={<Mail className="w-5 h-5" />}
                      editable={isEditing}
                      type="email"
                      onChange={(value) => setUserData(prev => ({ ...prev, email: value }))}
                    />
                    
                    <InfoField
                      label="Phone Number"
                      value={userData.phone}
                      icon={<Phone className="w-5 h-5" />}
                      editable={isEditing}
                      type="tel"
                      onChange={(value) => setUserData(prev => ({ ...prev, phone: value }))}
                    />
                    
                    <InfoField
                      label="Location"
                      value={userData.location}
                      icon={<MapPin className="w-5 h-5" />}
                      editable={isEditing}
                      onChange={(value) => setUserData(prev => ({ ...prev, location: value }))}
                    />
                    
                    <InfoField
                      label="Role"
                      value={userData.role}
                      icon={<Shield className="w-5 h-5" />}
                      editable={false}
                    />
                    
                    <InfoField
                      label="Member Since"
                      value={userData.joinDate}
                      icon={<Calendar className="w-5 h-5" />}
                      editable={false}
                    />
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  
                  {/* Two-Factor Authentication */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-purple-300">Add an extra layer of security to your account</p>
                      </div>
                      <Toggle
                        value={userData.twoFactorEnabled}
                        onChange={(value) => setUserData(prev => ({ ...prev, twoFactorEnabled: value }))}
                      />
                    </div>
                    {userData.twoFactorEnabled && (
                      <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                        <p className="text-sm text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          2FA is currently enabled for your account
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Change Password */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <PasswordField
                        label="Current Password"
                        value={securityData.oldPassword}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, oldPassword: value }))}
                        showPassword={showOldPassword}
                        toggleShowPassword={() => setShowOldPassword(!showOldPassword)}
                      />
                      
                      <PasswordField
                        label="New Password"
                        value={securityData.newPassword}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, newPassword: value }))}
                        showPassword={showNewPassword}
                        toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
                      />
                      
                      <PasswordField
                        label="Confirm New Password"
                        value={securityData.confirmPassword}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, confirmPassword: value }))}
                        showPassword={showPassword}
                        toggleShowPassword={() => setShowPassword(!showPassword)}
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Update Password
                    </button>
                  </div>

                  {/* Session Settings */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Session Settings</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Session Timeout</p>
                          <p className="text-sm text-purple-300">Automatically logout after inactivity</p>
                        </div>
                        <select
                          value={userData.sessionTimeout}
                          onChange={(e) => setUserData(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value={15} className="bg-slate-900">15 minutes</option>
                          <option value={30} className="bg-slate-900">30 minutes</option>
                          <option value={60} className="bg-slate-900">1 hour</option>
                          <option value={120} className="bg-slate-900">2 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                  
                  <ToggleSetting
                    label="Email Notifications"
                    description="Receive alerts and updates via email"
                    value={userData.emailNotifications}
                    onChange={(value) => setUserData(prev => ({ ...prev, emailNotifications: value }))}
                  />
                  
                  <ToggleSetting
                    label="Push Notifications"
                    description="Get push notifications on your devices"
                    value={userData.pushNotifications}
                    onChange={(value) => setUserData(prev => ({ ...prev, pushNotifications: value }))}
                  />
                  
                  <ToggleSetting
                    label="Motion Alert Notifications"
                    description="Get notified when motion is detected"
                    value={true}
                    onChange={() => {}}
                  />
                  
                  <ToggleSetting
                    label="System Update Notifications"
                    description="Receive notifications about system updates"
                    value={true}
                    onChange={() => {}}
                  />
                </div>
              )}

              {/* Preferences */}
              {activeTab === "preferences" && (
                <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                  
                  <SelectSetting
                    label="Theme"
                    description="Choose your preferred theme"
                    value={userData.theme}
                    onChange={(value) => setUserData(prev => ({ ...prev, theme: value }))}
                    options={[
                      { value: "dark", label: "Dark" },
                      { value: "light", label: "Light" },
                      { value: "auto", label: "Auto" },
                    ]}
                  />
                  
                  <SelectSetting
                    label="Language"
                    description="Select your preferred language"
                    value={userData.language}
                    onChange={(value) => setUserData(prev => ({ ...prev, language: value }))}
                    options={[
                      { value: "English", label: "English" },
                      { value: "Spanish", label: "Spanish" },
                      { value: "French", label: "French" },
                      { value: "German", label: "German" },
                    ]}
                  />
                  
                  <SelectSetting
                    label="Timezone"
                    description="Set your local timezone"
                    value={userData.timezone}
                    onChange={(value) => setUserData(prev => ({ ...prev, timezone: value }))}
                    options={[
                      { value: "Pacific Time (PT)", label: "Pacific Time (PT)" },
                      { value: "Eastern Time (ET)", label: "Eastern Time (ET)" },
                      { value: "Central Time (CT)", label: "Central Time (CT)" },
                      { value: "GMT", label: "Greenwich Mean Time (GMT)" },
                    ]}
                  />
                </div>
              )}

              {/* Activity Log */}
              {activeTab === "activity" && (
                <div className="animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                  
                  <div className="space-y-3">
                    {activityLog.map((activity) => (
                      <ActivityItem key={activity.id} {...activity} />
                    ))}
                  </div>
                  
                  <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20">
                    View All Activity
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              {(isEditing || activeTab === "profile") && (
                <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        <Save className="w-5 h-5" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl font-semibold transition-all duration-300 border border-red-500/30"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  )}
                </div>
              )}
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
   Helper Components
   =========================== */

function StatItem({ icon, label, value }) {
  return (
    <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
      <div className="text-purple-400 mb-2 flex justify-center">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-purple-300">{label}</div>
    </div>
  );
}

function InfoField({ label, value, icon, editable = false, type = "text", onChange }) {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange?.(editValue);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-purple-400">{icon}</div>
        <label className="text-sm text-purple-300">{label}</label>
      </div>
      {editable ? (
        <div className="flex items-center gap-2">
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 bg-transparent text-white text-lg font-medium focus:outline-none"
          />
          <button
            onClick={handleSave}
            className="p-1 text-green-400 hover:text-green-300"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <p className="text-lg font-medium text-white">{value}</p>
      )}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`
        relative w-12 h-6 rounded-full transition-colors duration-300
        ${value ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/20"}
      `}
    >
      <div
        className={`
          absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg
          transition-transform duration-300
          ${value ? "translate-x-7" : "translate-x-1"}
        `}
      />
    </button>
  );
}

function PasswordField({ label, value, onChange, showPassword, toggleShowPassword }) {
  return (
    <div>
      <label className="block text-sm font-medium text-purple-200 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

function ToggleSetting({ label, description, value, onChange }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
          <p className="text-sm text-purple-300">{description}</p>
        </div>
        <Toggle value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function SelectSetting({ label, description, value, onChange, options }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
        <p className="text-sm text-purple-300">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
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

function ActivityItem({ action, time, device, location }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <p className="font-medium text-white">{action}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-purple-300">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {time}
          </span>
          <span>{device}</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </span>
        </div>
      </div>
      <button className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        View
      </button>
    </div>
  );
}