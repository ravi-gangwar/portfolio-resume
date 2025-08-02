import { ACHIEVEMENTS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentCard } from "@/components/ui/content-card";
import { Award, Star } from "lucide-react";

export default function AchievementsSection() {
  return (
    <Section title="Achievements & Certificates">
      <div className="space-y-2">
        {ACHIEVEMENTS.map((achievement, index) => (
          <ContentCard key={index} variant="gradient">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100/50 dark:bg-green-900/30 rounded-lg">
                <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {achievement.description}
                  </p>
                )}
                {achievement.items && (
                  <div className="flex flex-wrap gap-2">
                    {achievement.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100/50 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium"
                      >
                        <Star className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ContentCard>
        ))}
      </div>
    </Section>
  );
}
