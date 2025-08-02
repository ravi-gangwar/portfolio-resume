import { EXPERIENCE } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentHeader } from "@/components/ui/content-header";
import { BulletList } from "@/components/ui/bullet-list";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { KeywordText } from "@/components/ui/keyword-text";
import { AppStoreIcon } from "@/components/ui/app-store-icon";
import { PlayStoreIcon } from "@/components/ui/play-store-icon";

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
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
              {job.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
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
