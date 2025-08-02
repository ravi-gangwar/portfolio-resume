import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { title, children, className, titleClassName, contentClassName, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn("bg-white dark:bg-gray-900 rounded-lg p-3", className)}
        {...props}
      >
        {title && (
          <h2
            className={cn(
              "text-sm font-bold text-gray-900 dark:text-gray-100 mb-2",
              titleClassName
            )}
          >
            {title}
          </h2>
        )}
        <div className={cn("", contentClassName)}>{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
