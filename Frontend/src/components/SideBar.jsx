import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logos/logo1.png";
import toggleIcon from "../assets/icons/minimize.png";
import toggleIconExpand from "../assets/icons/expand.png";
import { useNavigate } from "react-router-dom";

/**
 * Sidebar with:
 * - Desktop: collapsible (expanded/compressed)
 * - Mobile: hidden by default, open on edge swipe right, close on swipe left or backdrop tap
 */
function SideBar({ items }) {
  const [expanded, setExpanded] = useState(true); // desktop expanded/collapsed
  const [visible, setVisible] = useState(false); // mobile drawer visible
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchCurrentX = useRef(null);
  const edgeSwipeThreshold = 30; // pixels from left edge to allow opening swipe
  const swipeDistanceThreshold = 80; // min horizontal distance to count as swipe
  const navigate = useNavigate();

  // detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // desktop toggle
  const toggleSideBar = () => setExpanded((v) => !v);

  // -----------------------------
  // Global document touch handlers (for edge swipe to open on mobile)
  // -----------------------------
  useEffect(() => {
    if (!isMobile) return; // only attach for mobile

    const onDocTouchStart = (e) => {
      // only start tracking when touch starts near the left edge
      const x = e.touches?.[0]?.clientX ?? null;
      if (x === null) return;
      touchStartX.current = x;
      touchCurrentX.current = x;
    };

    const onDocTouchMove = (e) => {
      if (touchStartX.current === null) return;
      touchCurrentX.current = e.touches?.[0]?.clientX ?? touchCurrentX.current;
    };

    const onDocTouchEnd = () => {
      if (touchStartX.current === null || touchCurrentX.current === null) {
        touchStartX.current = null;
        touchCurrentX.current = null;
        return;
      }
      const start = touchStartX.current;
      const end = touchCurrentX.current;
      const distance = end - start;

      // only allow opening if started within edge threshold
      if (!visible && start <= edgeSwipeThreshold && distance > swipeDistanceThreshold) {
        setVisible(true); // edge swipe right -> open
      }

      touchStartX.current = null;
      touchCurrentX.current = null;
    };

    document.addEventListener("touchstart", onDocTouchStart, { passive: true });
    document.addEventListener("touchmove", onDocTouchMove, { passive: true });
    document.addEventListener("touchend", onDocTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onDocTouchStart);
      document.removeEventListener("touchmove", onDocTouchMove);
      document.removeEventListener("touchend", onDocTouchEnd);
    };
  }, [isMobile, visible]);

  // -----------------------------
  // Sidebar-internal touch handlers (for closing via swipe left when drawer is visible)
  // -----------------------------
  const sidebarTouchStart = (e) => {
    if (!isMobile || !visible) return;
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
    touchCurrentX.current = touchStartX.current;
  };

  const sidebarTouchMove = (e) => {
    if (!isMobile || !visible || touchStartX.current === null) return;
    touchCurrentX.current = e.touches?.[0]?.clientX ?? touchCurrentX.current;
  };

  const sidebarTouchEnd = () => {
    if (!isMobile || !visible || touchStartX.current === null || touchCurrentX.current === null) {
      touchStartX.current = null;
      touchCurrentX.current = null;
      return;
    }
    const distance = touchCurrentX.current - touchStartX.current;
    if (distance < -swipeDistanceThreshold) {
      // swipe left -> close
      setVisible(false);
    }
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  // Auto-close on mobile after navigation
  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setVisible(false);
  };

  return (
    <>
      {/* Backdrop (mobile only when visible) */}
      {isMobile && visible && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setVisible(false)}
        />
      )}

      <div
        // main sidebar container
        className={`fixed top-0 left-0 h-screen bg-white flex flex-col items-center justify-start p-2 z-50 transition-all duration-300 ease-in-out shadow-xl transform
          ${isMobile
            ? `w-64 ${visible ? "translate-x-0" : "-translate-x-full"}`
            : `${expanded ? "w-64" : "w-20"}`
          }`}
        // sidebar touch handlers (used when visible on mobile)
        onTouchStart={sidebarTouchStart}
        onTouchMove={sidebarTouchMove}
        onTouchEnd={sidebarTouchEnd}
      >
        {/* Toggle icon for desktop */}
        {!isMobile && (
          <img
            src={expanded ? toggleIcon : toggleIconExpand}
            alt="Toggle Sidebar"
            onClick={toggleSideBar}
            className="absolute top-2 right-2 w-6 h-6 cursor-pointer hover:opacity-80 transition"
          />
        )}

        {/* Logo section */}
        <div className="w-full h-[10%] flex bg-gray-200 flex-row items-center justify-start shadow-xl rounded-xl p-2 mb-4">
          <img src={logo} alt="logo" className="w-[40px]" />
          {((!isMobile && expanded) || (isMobile && visible)) && (
            <div className="flex flex-col items-start justify-center pl-2">
              <h1 className="font-azonix text-lg">Admin</h1>
              <span className="font-montsterat font-bold text-xs">Iot Dashboard</span>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="w-full flex flex-col items-start justify-start pt-2 space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.path)}
              className="w-full shadow-lg h-[6vh] rounded-xl border border-gray-200 hover:bg-blue-100 flex items-center p-1 transition"
            >
              <img src={item.icon} alt={item.name} className="h-[3vh] px-2" />
              {((!isMobile && expanded) || (isMobile && visible)) && (
                <h2 className="font-azonix text-gray-600 px-2">{item.name}</h2>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBar;
