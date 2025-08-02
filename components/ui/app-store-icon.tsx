import React from "react";
import { Apple } from "lucide-react";

interface AppStoreIconProps {
  className?: string;
}

export function AppStoreIcon({ className }: AppStoreIconProps) {
  return <Apple className={`${className} text-[#0D96F2]`} />;
}
