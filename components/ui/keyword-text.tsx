import React from "react";
import { KEYWORDS } from "@/lib/constants";

interface KeywordTextProps {
  text: string;
  className?: string;
}

export function KeywordText({ text, className }: KeywordTextProps) {
  const highlightKeywords = (content: string) => {
    let highlightedContent = content;

    KEYWORDS.forEach(({ word, variant }) => {
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedWord}\\b`, "gi");
      highlightedContent = highlightedContent.replace(regex, (match) => {
        return `<keyword data-variant="${variant}">${match}</keyword>`;
      });
    });

    return highlightedContent.replace(
      /<keyword data-variant="(\w+)">(.*?)<\/keyword>/g,
      (match, variant, text) => {
        return `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border transition-all duration-200 hover:scale-105 hover:shadow-sm ${
          variant === "primary"
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700"
            : variant === "secondary"
            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700"
            : variant === "accent"
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
            : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700"
        }">${text}</span>`;
      }
    );
  };

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: highlightKeywords(text),
      }}
    />
  );
}
