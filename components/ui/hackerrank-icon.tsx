import React from "react";

interface HackerRankIconProps {
  className?: string;
}

export function HackerRankIcon({ className }: HackerRankIconProps) {
  return (
    <div
      className={`${className} flex items-center justify-center font-bold text-[#00EA64]`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      H
    </div>
  );
}
