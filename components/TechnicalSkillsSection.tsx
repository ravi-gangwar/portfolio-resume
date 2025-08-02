import { SKILLS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentCard } from "@/components/ui/content-card";
import { TechStack } from "@/components/ui/tech-stack";
import { Code, Monitor, Server, Cloud, Brain, Users } from "lucide-react";

const skillCategories = [
  { key: "languages", title: "Languages", icon: Code, color: "text-blue-500" },
  {
    key: "frontend",
    title: "Frontend Technologies",
    icon: Monitor,
    color: "text-purple-500",
  },
  {
    key: "backend",
    title: "Backend Technologies",
    icon: Server,
    color: "text-green-500",
  },
  {
    key: "devops",
    title: "DevOps & Cloud",
    icon: Cloud,
    color: "text-orange-500",
  },
  {
    key: "ai",
    title: "AI & Machine Learning",
    icon: Brain,
    color: "text-pink-500",
  },
  {
    key: "softSkills",
    title: "Soft Skills",
    icon: Users,
    color: "text-indigo-500",
  },
];

export default function TechnicalSkillsSection() {
  return (
    <Section title="Technical Skills">
      <div className="space-y-2">
        {skillCategories.map((category) => (
          <ContentCard key={category.key} variant="gray">
            <div className="flex items-center gap-2 mb-2">
              {category.icon && (
                <category.icon className={`w-4 h-4 ${category.color}`} />
              )}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {category.title}
              </h3>
            </div>
            <TechStack
              technologies={
                SKILLS[category.key as keyof typeof SKILLS] as string[]
              }
              label=""
              className="mt-0"
            />
          </ContentCard>
        ))}
      </div>
    </Section>
  );
}
