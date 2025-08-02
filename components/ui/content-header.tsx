import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContentHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  duration?: string;
  status?: string;
  links?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  metaClassName?: string;
}

const ContentHeader = React.forwardRef<HTMLDivElement, ContentHeaderProps>(
  (
    {
      title,
      subtitle,
      duration,
      status,
      links,
      className,
      titleClassName,
      subtitleClassName,
      metaClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("mb-1", className)} {...props}>
        {/* Title */}
        <div className="mb-1">
          <h3
            className={cn(
              "text-sm font-semibold text-gray-900 dark:text-gray-100",
              titleClassName
            )}
          >
            {title}
          </h3>
        </div>

        {/* Subtitle, Duration, and Status */}
        {(subtitle || duration || status || links) && (
          <div className="flex flex-col sm:flex-row gap-2 text-sm mb-1">
            {subtitle && (
              <span
                className={cn(
                  "font-medium text-gray-600 dark:text-gray-300",
                  subtitleClassName
                )}
              >
                {subtitle}
              </span>
            )}
            {duration && (
              <>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span
                  className={cn(
                    "text-gray-500 dark:text-gray-400",
                    metaClassName
                  )}
                >
                  {duration}
                </span>
              </>
            )}
            {status && (
              <>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {status}
                </span>
              </>
            )}
            {links && (
              <>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {links}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

ContentHeader.displayName = "ContentHeader";

export { ContentHeader };
