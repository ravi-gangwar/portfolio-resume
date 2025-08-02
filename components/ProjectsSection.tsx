import { PROJECTS } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentHeader } from "@/components/ui/content-header";
import { BulletList } from "@/components/ui/bullet-list";
import { TechStack } from "@/components/ui/tech-stack";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { KeywordText } from "@/components/ui/keyword-text";
import { AppStoreIcon } from "@/components/ui/app-store-icon";
import { PlayStoreIcon } from "@/components/ui/play-store-icon";
import { GithubIcon } from "@/components/ui/github-icon";

export default function ProjectsSection() {
  return (
    <Section title="Projects">
      <div className="space-y-3">
        {PROJECTS.map((project, index) => (
          <div key={index}>
            <ContentHeader
              title={project.name}
              subtitle={`${project.status}${
                project.duration ? ` • ${project.duration}` : ""
              }`}
            />

            {/* Live Links and GitHub Links */}
            {(project.liveLinks?.length > 0 ||
              project.githubLinks?.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
                {/* Live Links */}
                {project.liveLinks && project.liveLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.liveLinks.map((link, linkIndex) => (
                      <a
                        key={`live-${linkIndex}`}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-xs md:text-sm"
                      >
                        <LiveIndicator />
                        {link.name === "Play Store" && (
                          <PlayStoreIcon className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                        {link.name === "App Store" && (
                          <AppStoreIcon className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                        <span className="font-medium whitespace-nowrap">
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {/* GitHub Links */}
                {project.githubLinks && project.githubLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.githubLinks.map((link, linkIndex) => (
                      <a
                        key={`github-${linkIndex}`}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors text-xs md:text-sm"
                      >
                        <GithubIcon className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-medium whitespace-nowrap">
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <KeywordText
              text={project.description}
              className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed"
            />

            {project.features && (
              <BulletList
                items={project.features.map((feature) => (
                  <KeywordText key={feature} text={feature} />
                ))}
                className="mb-2"
              />
            )}

            <TechStack technologies={project.techStack} />
          </div>
        ))}
      </div>
    </Section>
  );
}
