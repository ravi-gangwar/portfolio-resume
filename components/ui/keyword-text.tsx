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
        return `<span class="font-bold ${
          variant === "primary"
            ? "text-blue-600 dark:text-blue-400"
            : variant === "secondary"
            ? "text-purple-600 dark:text-purple-400"
            : variant === "accent"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-green-600 dark:text-green-400"
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
