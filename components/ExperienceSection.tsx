import { EXPERIENCE } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentHeader } from "@/components/ui/content-header";
import { BulletList } from "@/components/ui/bullet-list";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { KeywordText } from "@/components/ui/keyword-text";

export default function ExperienceSection() {
  return (
    <Section title="Experience">
      {EXPERIENCE.map((job, index) => (
        <div key={index} className="mb-3">
          <ContentHeader
            title={`${job.company} - ${job.position} • ${job.location} • ${job.duration}`}
          />

          {/* Live Links */}
          {job.links && job.links.length > 0 && (
            <div className="flex items-center gap-2 md:gap-4 mb-2 flex-wrap">
              {job.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                >
                  <LiveIndicator />
                  <span className="text-xs sm:text-sm font-medium">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          )}

          <BulletList
            items={job.achievements.map((achievement) => (
              <KeywordText text={achievement} />
            ))}
          />
        </div>
      ))}
    </Section>
  );
}
