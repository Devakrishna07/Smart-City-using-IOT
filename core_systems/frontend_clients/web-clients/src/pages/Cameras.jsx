import { useState, useEffect } from "react";
import { Search, Grid3x3, List, Filter, SlidersHorizontal, X, Eye, Camera as CameraIcon } from "lucide-react";
import Camera, { CameraFullScreen, CameraGrid, CameraList } from "../components/Camera";

// All cameras data (combining Traffic and Home)
const ALL_CAMERAS = [
  // Traffic Cameras
  ...Array.from({ length: 24 }, (_, i) => ({
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
  // Home Cameras
  ...Array.from({ length: 6 }, (_, i) => ({
    id: i + 25,
    name: `Home Cam ${i + 1}`,
    status: Math.random() > 0.1 ? "active" : "offline",
    location: ["Front Door", "Living Room", "Backyard", "Garage", "Hallway", "Kitchen"][i],
    type: "Home"
  }))
];

export default function Cameras() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'traffic', 'home'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'offline'
  const [showFilters, setShowFilters] = useState(false);
  const [fullScreenCamera, setFullScreenCamera] = useState(null);
  const [gridColumns, setGridColumns] = useState('3');

  // Filter cameras based on search and filters
  const filteredCameras = ALL_CAMERAS.filter(camera => {
    const matchesSearch = camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         camera.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || camera.type.toLowerCase() === filterType;
    const matchesStatus = filterStatus === 'all' || camera.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Stats
  const stats = {
    total: ALL_CAMERAS.length,
    active: ALL_CAMERAS.filter(c => c.status === 'active').length,
    offline: ALL_CAMERAS.filter(c => c.status === 'offline').length,
    traffic: ALL_CAMERAS.filter(c => c.type === 'Traffic').length,
    home: ALL_CAMERAS.filter(c => c.type === 'Home').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-[slideDown_0.6s_ease-out]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
                <CameraIcon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-purple-400" />
                All Cameras
              </h1>
              <p className="text-sm sm:text-base text-purple-300">
                Monitor and manage all surveillance cameras
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/5 rounded-lg sm:rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-purple-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-purple-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-6">
            <StatCard label="Total Cameras" value={stats.total} color="text-purple-400" />
            <StatCard label="Active" value={stats.active} color="text-green-400" />
            <StatCard label="Offline" value={stats.offline} color="text-red-400" />
            <StatCard label="Traffic" value={stats.traffic} color="text-blue-400" />
            <StatCard label="Home" value={stats.home} color="text-emerald-400" />
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0" />
            <input
              type="text"
              placeholder="Search cameras by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-purple-400 focus:outline-none w-full text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-purple-400" />
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 sm:p-5 bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/10 animate-[slideDown_0.3s_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Filter by Type */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-2 sm:mb-3">
                    Camera Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'traffic', 'home'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          filterType === type
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 text-purple-300 hover:bg-white/20'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter by Status */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-2 sm:mb-3">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'active', 'offline'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          filterStatus === status
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 text-purple-300 hover:bg-white/20'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(filterType !== 'all' || filterStatus !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setFilterType('all');
                    setFilterStatus('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-purple-300">
            Showing <span className="font-semibold text-white">{filteredCameras.length}</span> of{' '}
            <span className="font-semibold text-white">{stats.total}</span> cameras
          </p>
        </div>

        {/* Camera Display */}
        {filteredCameras.length > 0 ? (
          viewMode === 'grid' ? (
            <CameraGrid
              cameras={filteredCameras}
              onCameraClick={setFullScreenCamera}
              columns={gridColumns}
              size="md"
            />
          ) : (
            <CameraList
              cameras={filteredCameras}
              onCameraClick={setFullScreenCamera}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <Eye className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400/50 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No cameras found</h3>
            <p className="text-sm sm:text-base text-purple-300 text-center mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {fullScreenCamera && (
        <CameraFullScreen
          camera={fullScreenCamera}
          onClose={() => setFullScreenCamera(null)}
        />
      )}

      {/* Animations */}
      <style jsx>{`
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

// Stat Card Component
function StatCard({ label, value, color }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <p className="text-[10px] sm:text-xs text-purple-300 mb-1">{label}</p>
      <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}