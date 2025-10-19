import React from "react";

const LoadingAnimation = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-bl from-[#EEEEEE] to-[#91ADC8]">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-gray-300 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-t-[#3B82F6] rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default LoadingAnimation;
