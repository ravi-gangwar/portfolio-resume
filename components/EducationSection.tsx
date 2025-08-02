import { EDUCATION } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { ContentHeader } from "@/components/ui/content-header";
import { BulletList } from "@/components/ui/bullet-list";

export default function EducationSection() {
  return (
    <Section title="Education">
      <div className="mb-2">
        <ContentHeader
          title={EDUCATION.institution}
          subtitle={EDUCATION.degree}
          duration={EDUCATION.duration}
        />
      </div>
      <BulletList items={EDUCATION.details} />
    </Section>
  );
}
