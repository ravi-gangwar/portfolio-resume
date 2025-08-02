import { SUMMARY } from "@/lib/constants";
import { Section } from "@/components/ui/section";

export default function AboutSection() {
  return (
    <Section title={SUMMARY.title}>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
        {SUMMARY.content}
      </p>
    </Section>
  );
}
