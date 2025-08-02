import { EXPERIENCE } from '@/lib/constants';

export default function ExperienceSection() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        Experience
      </h2>
      
      {EXPERIENCE.map((job, index) => (
        <div key={index} className="mb-6 md:mb-8">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {job.company}
              </h3>
              <div className="text-sm text-gray-500">
                {job.duration}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-1">
              <span className="font-medium">{job.position}</span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span>{job.location}</span>
            </div>
            <p className="text-sm text-blue-600 font-medium">
              {job.type}
            </p>
          </div>
          
          <ul className="space-y-2 text-sm md:text-base text-gray-700">
            {job.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span className="leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}