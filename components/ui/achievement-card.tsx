import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AchievementBadge {
  text: string;
  variant?: 'default' | 'secondary' | 'outline';
}

export interface AchievementCardProps {
  logo?: React.ReactNode;
  title: string;
  stats?: string;
  badges?: AchievementBadge[];
  summary?: string;
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
  statsClassName?: string;
  badgesClassName?: string;
  summaryClassName?: string;
}

const AchievementCard = React.forwardRef<HTMLDivElement, AchievementCardProps>(
  (
    {
      logo,
      title,
      stats,
      badges = [],
      summary,
      className,
      logoClassName,
      titleClassName,
      statsClassName,
      badgesClassName,
      summaryClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]',
          className
        )}
        {...props}
      >
        {/* Header with Logo and Title */}
        <div className="flex items-center gap-3 mb-4">
          {logo && (
            <div className={cn('flex-shrink-0', logoClassName)}>
              {logo}
            </div>
          )}
          <div className="flex flex-col">
            <h3
              className={cn(
                'text-lg font-bold text-gray-900 leading-tight',
                titleClassName
              )}
            >
              {title}
            </h3>
            {stats && (
              <p
                className={cn(
                  'text-sm text-gray-500 mt-1',
                  statsClassName
                )}
              >
                {stats}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className={cn('flex flex-wrap gap-2 mb-4', badgesClassName)}>
            {badges.map((badge, index) => (
              <span
                key={index}
                className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  {
                    'bg-gray-100 text-gray-700': badge.variant === 'default' || !badge.variant,
                    'bg-blue-100 text-blue-700': badge.variant === 'secondary',
                    'bg-transparent border border-gray-300 text-gray-700': badge.variant === 'outline',
                  }
                )}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {summary && (
          <p
            className={cn(
              'text-sm text-gray-500 leading-relaxed',
              summaryClassName
            )}
          >
            {summary}
          </p>
        )}
      </div>
    );
  }
);

AchievementCard.displayName = 'AchievementCard';

export { AchievementCard }; 