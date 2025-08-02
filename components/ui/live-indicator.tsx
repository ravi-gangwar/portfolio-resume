import React from "react";

interface LiveIndicatorProps {
  className?: string;
}

export function LiveIndicator({ className }: LiveIndicatorProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Animated red dot */}
      <div className="relative">
        {/* Main red dot */}
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>

        {/* Outward waves */}
        <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
        <div
          className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-25"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* "LIVE" text */}
      <span className="ml-1 text-xs font-medium text-red-500 animate-pulse">
        LIVE
      </span>
    </div>
  );
}
