import { PROJECTS } from '@/lib/constants';

export default function ProjectsSection() {
  return (
    <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
        Projects
      </h2>
      
      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((project, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4 md:pl-6">
            <div className="mb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {project.name}
                </h3>
                <div className="text-sm text-gray-500">
                  {project.duration}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-sm mb-2">
                <span className="text-blue-600 font-medium">{project.status}</span>
                {project.links && (
                  <>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="text-gray-600">{project.links}</span>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
              {project.description}
            </p>
            
            {project.features && (
              <ul className="space-y-2 mb-3 text-sm md:text-base text-gray-700">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-600">Tech Stack: </span>
              <span className="text-sm text-gray-700">{project.techStack}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}