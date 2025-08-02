import React from "react";

interface LeetCodeIconProps {
  className?: string;
}

export function LeetCodeIcon({ className }: LeetCodeIconProps) {
  return (
    <div
      className={`${className} flex items-center justify-center font-bold text-[#FFA116]`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      L
    </div>
  );
}
