import { SKILLS } from "@/lib/constants";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const skillCategories = [
  { key: "languages", title: "Languages", color: "bg-blue-100 text-blue-800" },
  {
    key: "frontend",
    title: "Frontend Technologies",
    color: "bg-green-100 text-green-800",
  },
  {
    key: "backend",
    title: "Backend Technologies",
    color: "bg-purple-100 text-purple-800",
  },
  {
    key: "devops",
    title: "DevOps & Cloud",
    color: "bg-orange-100 text-orange-800",
  },
  {
    key: "ai",
    title: "AI & Machine Learning",
    color: "bg-pink-100 text-pink-800",
  },
  {
    key: "softSkills",
    title: "Soft Skills",
    color: "bg-gray-100 text-gray-800",
  },
];

export default function TechnicalSkillsSection() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8">
      <h2 className="text-sm md:text-xs lg:text-lg font-bold text-gray-900 mb-4 md:mb-6">
        Technical Skills
      </h2>

      <div className="space-y-4 md:space-y-6">
        {skillCategories.map((category) => (
          <div
            key={category.key}
            className="bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-6"
          >
            <h3 className="text-sm md:text-xs lg:text-lg font-semibold text-gray-900 mb-3">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(SKILLS[category.key as keyof typeof SKILLS] as string[]).map(
                (skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
