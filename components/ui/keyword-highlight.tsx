import React from "react";
import { cn } from "@/lib/utils";

interface KeywordHighlightProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "success" | "warning";
}

export function KeywordHighlight({
  children,
  className,
  variant = "primary",
}: KeywordHighlightProps) {
  const variantStyles = {
    primary: "font-bold text-blue-600 dark:text-blue-400",
    secondary: "font-bold text-purple-600 dark:text-purple-400",
    accent: "font-bold text-emerald-600 dark:text-emerald-400",
    success: "font-bold text-green-600 dark:text-green-400",
    warning: "font-bold text-orange-600 dark:text-orange-400",
  };

  return (
    <span className={cn("font-bold", variantStyles[variant], className)}>
      {children}
    </span>
  );
}

// Helper function to highlight keywords in text
export function highlightKeywords(text: string) {
  const keywords = [
    // Technologies
    { word: "React Native", variant: "primary" as const },
    { word: "Next.js", variant: "primary" as const },
    { word: "Node.js", variant: "primary" as const },
    { word: "TypeScript", variant: "primary" as const },
    { word: "JavaScript", variant: "primary" as const },
    { word: "React.js", variant: "primary" as const },
    { word: "Redux Toolkit", variant: "primary" as const },
    { word: "Tailwind CSS", variant: "primary" as const },
    { word: "PostgreSQL", variant: "primary" as const },
    { word: "MongoDB", variant: "primary" as const },
    { word: "Docker", variant: "primary" as const },
    { word: "AWS", variant: "primary" as const },
    { word: "Firebase", variant: "primary" as const },
    { word: "Stripe", variant: "primary" as const },
    { word: "WebSockets", variant: "primary" as const },
    { word: "Jest", variant: "primary" as const },

    // Skills & Concepts
    { word: "Full-Stack", variant: "secondary" as const },
    { word: "DevOps", variant: "secondary" as const },
    { word: "SaaS", variant: "secondary" as const },
    { word: "API", variant: "secondary" as const },
    { word: "REST", variant: "secondary" as const },
    { word: "GraphQL", variant: "secondary" as const },
    { word: "Microservices", variant: "secondary" as const },
    { word: "CI/CD", variant: "secondary" as const },
    { word: "Performance Optimization", variant: "secondary" as const },
    { word: "Scalable", variant: "secondary" as const },
    { word: "Real-time", variant: "secondary" as const },

    // AI & ML
    { word: "AI", variant: "accent" as const },
    { word: "LLM", variant: "accent" as const },
    { word: "OpenAI", variant: "accent" as const },
    { word: "Machine Learning", variant: "accent" as const },
    { word: "Chatbot", variant: "accent" as const },

    // Experience & Achievements
    { word: "1+ year", variant: "success" as const },
    { word: "500+ Downloads", variant: "success" as const },
    { word: "20%", variant: "success" as const },
    { word: "Live", variant: "success" as const },
    { word: "Published", variant: "success" as const },

    // Education
    { word: "B.Tech", variant: "warning" as const },
    { word: "Information Technology", variant: "warning" as const },
    { word: "CGPA: 7.2", variant: "warning" as const },
    { word: "Data Structure & Algorithms", variant: "warning" as const },
    { word: "OOPs", variant: "warning" as const },
  ];

  let highlightedText = text;

  keywords.forEach(({ word, variant }) => {
    const regex = new RegExp(
      `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );
    highlightedText = highlightedText.replace(regex, (match) => {
      return `<keyword data-variant="${variant}">${match}</keyword>`;
    });
  });

  return highlightedText;
}
