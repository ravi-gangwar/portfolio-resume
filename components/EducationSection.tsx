import { EDUCATION } from '@/lib/constants';

export default function EducationSection() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        Education
      </h2>
      
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            {EDUCATION.institution}
          </h3>
          <div className="text-sm text-gray-500">
            {EDUCATION.duration}
          </div>
        </div>
        <p className="text-base font-medium text-gray-700 mb-3">
          {EDUCATION.degree}
        </p>
      </div>
      
      <ul className="space-y-2 text-sm md:text-base text-gray-700">
        {EDUCATION.details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}