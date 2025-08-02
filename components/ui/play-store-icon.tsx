import React from "react";
import { Play } from "lucide-react";

interface PlayStoreIconProps {
  className?: string;
}

export function PlayStoreIcon({ className }: PlayStoreIconProps) {
  return <Play className={`${className} text-[#00DC82]`} />;
}
