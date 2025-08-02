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
      default: "bg-white dark:bg-gray-900",
      gray: "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      gradient:
        "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800",
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
