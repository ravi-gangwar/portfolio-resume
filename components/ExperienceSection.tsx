import { EXPERIENCE } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentHeader } from "@/components/ui/content-header";
import { BulletList } from "@/components/ui/bullet-list";

export default function ExperienceSection() {
  return (
    <Section title="Experience">
      {EXPERIENCE.map((job, index) => (
        <div key={index} className="mb-3">
          <ContentHeader
            title={job.company}
            subtitle={`${job.position} • ${job.location}`}
            duration={job.duration}
            status={job.type}
          />
          <BulletList items={job.achievements} />
        </div>
      ))}
    </Section>
  );
}
