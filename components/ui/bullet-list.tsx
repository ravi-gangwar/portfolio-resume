import * as React from "react";
import { cn } from "@/lib/utils";

export interface BulletListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: string[];
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
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
);

BulletList.displayName = "BulletList";

export { BulletList };
