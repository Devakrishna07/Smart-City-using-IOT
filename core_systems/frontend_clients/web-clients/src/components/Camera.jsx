import { useState, useRef } from "react";
import { Eye, X } from "lucide-react";

/**
 * Reusable Camera Component
 */
export default function Camera({
  camera,
  onFullScreen,
  animationDelay = 0,
  size = "md",
  showControls = true,
  showBadges = true,
  showRecording = true,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  /* ================= SIZE CONFIG ================= */
  const sizeClasses = {
    sm: {
      container: "rounded-lg",
      badge: "text-[10px]",
      button: "py-1 text-xs",
      padding: "p-1.5",
    },
    md: {
      container: "rounded-lg sm:rounded-xl",
      badge: "text-[10px] sm:text-xs",
      button: "py-1.5 sm:py-2 text-xs sm:text-sm",
      padding: "p-2 sm:p-3",
    },
    lg: {
      container: "rounded-xl sm:rounded-2xl",
      badge: "text-xs sm:text-sm",
      button: "py-2 sm:py-3 text-sm",
      padding: "p-3 sm:p-4",
    },
  };

  const classes = sizeClasses[size] || sizeClasses.md;

  /* ================= HELPERS ================= */
  const getBorderColor = () => {
    if (camera.status !== "active") return "border-red-500/30";
    return camera.type === "Traffic"
      ? "border-blue-500/30"
      : "border-green-500/30";
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.play();
  };

  const handleFullScreen = (e) => {
    e.stopPropagation();
    onFullScreen && onFullScreen(camera);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group ${classes.container} border overflow-hidden
        bg-black transition-all duration-300 cursor-pointer
        ${getBorderColor()}
        ${isHovered ? "scale-105 shadow-lg shadow-purple-500/30" : ""}
        animate-[fadeIn_0.5s_ease-out]
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* ================= VIDEO ================= */}
      <div className="aspect-video bg-black relative">
        {camera.src ? (
          <video
            ref={videoRef}
            src={camera.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <Eye className="w-8 h-8 text-purple-400 animate-pulse" />
            <p className="text-xs sm:text-sm text-purple-200 mt-2">
              {camera.name}
            </p>
          </div>
        )}

        {/* Camera Name Overlay */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-xs text-white">
          {camera.name}
        </div>
      </div>

      {/* ================= STATUS ================= */}
      {showBadges && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60">
          <span
            className={`w-2 h-2 rounded-full ${
              camera.status === "active"
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
            }`}
          />
          <span className={`${classes.badge} text-white capitalize`}>
            {camera.status}
          </span>
        </div>
      )}

      {/* ================= REC ================= */}
      {showRecording && camera.status === "active" && (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className={`${classes.badge} text-red-400`}>REC</span>
        </div>
      )}

      {/* ================= CONTROLS ================= */}
      {showControls && (
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
            flex items-end justify-center ${classes.padding}
            transition-opacity duration-300
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
        >
          <button
            onClick={handleFullScreen}
            className={`w-full ${classes.button} bg-white/10 rounded-lg hover:bg-white/20`}
          >
            View Full Screen
          </button>
        </div>
      )}

      {/* ================= TYPE ================= */}
      {showBadges && (
        <div
          className={`
            absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs
            ${
              camera.type === "Traffic"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-green-500/20 text-green-400"
            }
          `}
        >
          {camera.type}
        </div>
      )}
    </div>
  );
}

/* ================= FULL SCREEN ================= */

export function CameraFullScreen({ camera, onClose }) {
  if (!camera) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-white/10 rounded-xl hover:bg-white/20"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden">
        {camera.src ? (
          <video
            src={camera.src}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Eye className="w-16 h-16 text-purple-400" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CAMERA GRID ================= */

export function CameraGrid({
  cameras,
  onCameraClick,
  columns = "4",
  size = "md",
}) {
  const gridCols = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {cameras.map((camera, idx) => (
        <Camera
          key={camera.id}
          camera={camera}
          onFullScreen={onCameraClick}
          animationDelay={idx * 100}
          size={size}
        />
      ))}
    </div>
  );
}

/* ================= ANIMATION ================= */

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}
