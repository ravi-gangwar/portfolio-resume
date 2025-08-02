import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "gray" | "gradient";
  className?: string;
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white dark:bg-zinc-800",
      gray: "bg-gray-50/50 dark:bg-zinc-700/50 border border-gray-200/50 dark:border-zinc-600/50",
      gradient:
        "bg-gradient-to-r from-green-50/30 to-emerald-50/30 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200/30 dark:border-green-800/30",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-2 md:p-3",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContentCard.displayName = "ContentCard";

export { ContentCard };
