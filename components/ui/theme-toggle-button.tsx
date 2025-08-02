"use client";

import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from "./theme-animations";

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  showLabel?: boolean;
  url?: string;
}

export function ThemeToggleButton({
  variant = "gif",
  start = "center",
  showLabel = false,
  url = "https://media.giphy.com/media/ArfrRmFCzYXsC6etQX/giphy.gif",
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const styleId = "theme-transition-styles";

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url);

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!("startViewTransition" in document)) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  }, [theme, setTheme]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-2 left-2 z-[9999]">
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        className="w-10 h-10 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-gray-200 dark:border-zinc-700 shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all"
        name="Theme Toggle Button"
      >
        <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Theme Toggle </span>
        {showLabel && (
          <>
            <span className="hidden group-hover:block border rounded-full px-2 absolute -top-10">
              {" "}
              variant = {variant}
            </span>
            <span className="hidden group-hover:block border rounded-full px-2 absolute -bottom-10">
              {" "}
              start = {start}
            </span>
          </>
        )}
      </Button>
    </div>
  );
}

export default ThemeToggleButton;
