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
        {/* Title and Duration */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
          <h3
            className={cn(
              "text-sm font-semibold text-gray-900 dark:text-gray-100",
              titleClassName
            )}
          >
            {title}
          </h3>
          {duration && (
            <div
              className={cn(
                "text-sm text-gray-500 dark:text-gray-400",
                metaClassName
              )}
            >
              {duration}
            </div>
          )}
        </div>

        {/* Subtitle and Status */}
        {(subtitle || status || links) && (
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
            {status && (
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {status}
              </span>
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
