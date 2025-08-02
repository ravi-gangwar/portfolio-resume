import * as React from "react";
import { cn } from "@/lib/utils";

export interface BulletListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: (string | React.ReactNode)[];
  className?: string;
  itemClassName?: string;
  bulletClassName?: string;
  bulletColor?: string;
}

const BulletList = React.forwardRef<HTMLUListElement, BulletListProps>(
  (
    {
      items,
      className,
      itemClassName,
      bulletClassName,
      bulletColor = "bg-blue-600",
      ...props
    },
    ref
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "space-y-0.5 text-sm text-gray-700 dark:text-gray-300",
          className
        )}
        {...props}
      >
        {items.map((item, idx) => (
          <li key={idx} className={cn("flex items-start gap-3", itemClassName)}>
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                bulletColor,
                bulletClassName
              )}
            />
            {typeof item === "string" ? (
              <span
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: item.replace(
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
                  ),
                }}
              />
            ) : (
              <span className="leading-relaxed">{item}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }
);

BulletList.displayName = "BulletList";

export { BulletList };
