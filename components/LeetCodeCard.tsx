import React from "react";
import {
  AchievementCard,
  AchievementBadge,
} from "@/components/ui/achievement-card";

const LeetCodeLogo = () => (
  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
    <span className="text-white font-bold text-lg">L</span>
  </div>
);

const StarIcon = () => (
  <svg
    className="w-4 h-4 text-yellow-500 inline-block ml-1"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface LeetCodeCardProps {
  className?: string;
  rank?: string;
  problemsSolved?: number;
  rating?: number;
  badges?: AchievementBadge[];
}

const LeetCodeCard: React.FC<LeetCodeCardProps> = ({
  className,
  rank = "1879+ (Top 5% Worldwide)",
  problemsSolved = 1200,
  rating = 3.5,
  badges = [
    { text: "Knight", variant: "default" },
    { text: "1200DaysOfCode+", variant: "default" },
    { text: "Annual Awards 2022/2023", variant: "default" },
  ],
}) => {
  const summary = `${problemsSolved}+ problems solved | ${rating} ⭐ | Knight Badge`;

  return (
    <AchievementCard
      logo={<LeetCodeLogo />}
      title="LeetCode"
      stats={rank}
      badges={badges}
      summary={summary}
      className={className}
      summaryClassName="flex items-center"
    />
  );
};

export default LeetCodeCard;
