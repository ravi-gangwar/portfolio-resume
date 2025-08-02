import { SUMMARY } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        {SUMMARY.title}
      </h2>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        {SUMMARY.content}
      </p>
    </section>
  );
}