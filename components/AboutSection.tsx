import { SUMMARY } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { KeywordText } from "@/components/ui/keyword-text";

export default function AboutSection() {
  return (
    <Section title={SUMMARY.title}>
      <KeywordText
        text={SUMMARY.content}
        className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm"
      />
    </Section>
  );
}
