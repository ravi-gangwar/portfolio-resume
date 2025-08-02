import { PROBLEM_SOLVING } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentCard } from "@/components/ui/content-card";
import { LeetCodeIcon } from "@/components/ui/leetcode-icon";
import { HackerRankIcon } from "@/components/ui/hackerrank-icon";

export default function ProblemSolvingSection() {
  return (
    <Section title={PROBLEM_SOLVING.title}>
      <div className="space-y-2">
        {PROBLEM_SOLVING.platforms.map((platform, index) => (
          <ContentCard key={index} variant="gray">
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {platform.name === "LeetCode" ? (
                    <LeetCodeIcon className="w-5 h-5" />
                  ) : platform.name === "HackerRank" ? (
                    <HackerRankIcon className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                  )}
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {platform.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                  {platform.stats}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {platform.details}
            </p>
          </ContentCard>
        ))}
      </div>
    </Section>
  );
}
