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
              "text-xs text-gray-700 dark:text-gray-300 mr-1 mt-1",
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
