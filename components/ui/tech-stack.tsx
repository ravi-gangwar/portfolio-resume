import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface TechStackProps extends React.HTMLAttributes<HTMLDivElement> {
  technologies: string | string[];
  label?: string;
  className?: string;
  badgeClassName?: string;
  labelClassName?: string;
}

const TechStack = React.forwardRef<HTMLDivElement, TechStackProps>(
  (
    {
      technologies,
      label = "Tech Stack:",
      className,
      badgeClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const techArray =
      typeof technologies === "string"
        ? technologies.split(",").map((tech) => tech.trim())
        : technologies;

    return (
      <div ref={ref} className={cn("mt-1", className)} {...props}>
        <span
          className={cn(
            "text-xs font-medium text-gray-600 dark:text-gray-400",
            labelClassName
          )}
        >
          {label}{" "}
        </span>
        {techArray.map((tech, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className={cn(
              "text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full border-0 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md",
              "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600",
              "text-gray-800 dark:text-gray-200",
              "hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20",
              badgeClassName
            )}
          >
            {tech}
          </Badge>
        ))}
      </div>
    );
  }
);

TechStack.displayName = "TechStack";

export { TechStack };
