import { PROBLEM_SOLVING } from "@/lib/constants";
import { Code } from "lucide-react";

export default function ProblemSolvingSection() {
  return (
    <section className="bg-white rounded-lg p-6 mb-8">
      <h2 className="text-sm md:text-xs lg:text-lg font-bold text-gray-900 mb-4 md:mb-6">
        {PROBLEM_SOLVING.title}
      </h2>

      <div className="space-y-4 md:space-y-6">
        {PROBLEM_SOLVING.platforms.map((platform, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200  rounded-lg p-4 md:p-6"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {platform.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-blue-600 mb-2">
                  {platform.stats}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {platform.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
