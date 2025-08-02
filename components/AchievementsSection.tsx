import { ACHIEVEMENTS } from "@/lib/constants";
import { Award, Star } from "lucide-react";
import LeetCodeCard from "@/components/LeetCodeCard";

export default function AchievementsSection() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        Achievements & Certificates
      </h2>

      <div className="space-y-4 md:space-y-6">
        {/* LeetCode Card */}
        <LeetCodeCard />

        {/* Other Achievements */}
        {ACHIEVEMENTS.map((achievement, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 md:p-6 border border-green-200"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="text-sm md:text-base text-gray-700 mb-3">
                    {achievement.description}
                  </p>
                )}
                {achievement.items && (
                  <div className="flex flex-wrap gap-2">
                    {achievement.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        <Star className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
