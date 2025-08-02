import React from "react";
import { Github } from "lucide-react";

interface GithubIconProps {
  className?: string;
}

export function GithubIcon({ className }: GithubIconProps) {
  return <Github className={`${className} text-gray-600 dark:text-gray-400`} />;
}
