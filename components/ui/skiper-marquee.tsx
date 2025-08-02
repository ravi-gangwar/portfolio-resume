"use client";

import { JSX, useEffect, useId, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Snowflake } from "lucide-react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

const tiles = [
  {
    icon: <Snowflake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 "></div>
    ),
  },
  {
    icon: <Snowflake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 "></div>
    ),
  },
  {
    icon: <Snowflake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 "></div>
    ),
  },
  {
    icon: <Snowflake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 "></div>
    ),
  },
  {
    icon: <Snowflake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 "></div>
    ),
  },
];

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function Card(card: { icon: JSX.Element; bg: JSX.Element }) {
  const id = useId();

  return (
    <div
      key={id}
      className={cn(
        "relative size-16 cursor-pointer overflow-hidden rounded-2xl border p-3 opacity-40",
        "bg-white/15 backdrop-blur-sm [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-white/5 dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      {card.icon}
      {card.bg}
    </div>
  );
}

export function SkiperMarquee() {
  const [randomTiles1, setRandomTiles1] = useState<typeof tiles>([]);
  const [randomTiles2, setRandomTiles2] = useState<typeof tiles>([]);
  const [randomTiles3, setRandomTiles3] = useState<typeof tiles>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensures this runs client-side
      setRandomTiles1(shuffleArray([...tiles]));
      setRandomTiles2(shuffleArray([...tiles]));
      setRandomTiles3(shuffleArray([...tiles]));
    }
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="relative flex w-full h-full flex-col items-center justify-center overflow-hidden">
      {/* Optimized marquee with reduced complexity */}
      <Marquee
        reverse
        className={`-delay-[200ms] [--duration:15s] ${
          isScrolling ? "[animation-play-state:paused]" : ""
        }`}
        repeat={3}
      >
        {randomTiles1.map((review, idx) => (
          <Card key={idx} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        className={`[--duration:20s] ${
          isScrolling ? "[animation-play-state:paused]" : ""
        }`}
        repeat={3}
      >
        {randomTiles2.map((review, idx) => (
          <Card key={idx} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        className={`-delay-[200ms] [--duration:25s] ${
          isScrolling ? "[animation-play-state:paused]" : ""
        }`}
        repeat={3}
      >
        {randomTiles3.map((review, idx) => (
          <Card key={idx} {...review} />
        ))}
      </Marquee>

      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/20 dark:to-background/30" />
    </div>
  );
}
