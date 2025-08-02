import { PROJECTS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentHeader } from "@/components/ui/content-header";
import { BulletList } from "@/components/ui/bullet-list";
import { TechStack } from "@/components/ui/tech-stack";

export default function ProjectsSection() {
  return (
    <Section title="Projects" className="bg-white p-6">
      <div className="space-y-3">
        {PROJECTS.map((project, index) => (
          <div key={index} className="pl-4 md:pl-6">
            <ContentHeader
              title={project.name}
              status={project.status}
              duration={project.duration}
              links={project.links}
            />

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
              {project.description}
            </p>

            {project.features && (
              <BulletList items={project.features} className="mb-2" />
            )}

            <TechStack technologies={project.techStack} />
          </div>
        ))}
      </div>
    </Section>
  );
}
