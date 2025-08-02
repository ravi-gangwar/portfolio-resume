import { SKILLS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentCard } from "@/components/ui/content-card";
import { TechStack } from "@/components/ui/tech-stack";

const skillCategories = [
  { key: "languages", title: "Languages" },
  { key: "frontend", title: "Frontend Technologies" },
  { key: "backend", title: "Backend Technologies" },
  { key: "devops", title: "DevOps & Cloud" },
  { key: "ai", title: "AI & Machine Learning" },
  { key: "softSkills", title: "Soft Skills" },
];

export default function TechnicalSkillsSection() {
  return (
    <Section title="Technical Skills">
      <div className="space-y-2">
        {skillCategories.map((category) => (
          <ContentCard key={category.key} variant="gray">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {category.title}
            </h3>
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
