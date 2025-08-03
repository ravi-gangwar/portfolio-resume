import ResumeHeader from "@/components/ResumeHeader";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProblemSolvingSection from "@/components/ProblemSolvingSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { PERSONAL_INFO } from "@/lib/constants";
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 md:bg-zinc-100/60 md:dark:bg-zinc-900/60 md:backdrop-blur-sm">
      <ThemeToggleButton />

      {/* Last Updated - Top Right */}
      <div className="fixed top-2 right-2 z-50">
        <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
          {PERSONAL_INFO.lastUpdated}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12 relative z-10">
        <div className="bg-white dark:bg-zinc-800 md:bg-white/80 md:dark:bg-zinc-800/80 md:backdrop-blur-md rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-4 md:p-6 lg:p-8">
          <ResumeHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-3">
              <AboutSection />
              <ExperienceSection />
              <EducationSection />
              <ProjectsSection />
            </div>

            {/* Right Column - Skills & Achievements */}
            <div className="lg:col-span-1 space-y-3">
              <ProblemSolvingSection />
              <TechnicalSkillsSection />
              <AchievementsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Powered by Ravi Gangwar 2025 */}
      <div className="text-center py-6">
        <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
          Powered by{" "}
          <span className="text-gray-600 dark:text-gray-400 font-semibold">
            Ravi Gangwar
          </span>{" "}
          <span className="text-gray-500 dark:text-gray-600">2025</span>
        </div>
      </div>
    </div>
  );
}
