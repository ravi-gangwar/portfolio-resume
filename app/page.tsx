import ResumeHeader from "@/components/ResumeHeader";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProblemSolvingSection from "@/components/ProblemSolvingSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black md:bg-zinc-100/60 md:dark:bg-black/60 md:backdrop-blur-sm">
      <ThemeToggleButton />

      <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12 relative z-10">
        <div className="bg-white dark:bg-gray-900 md:bg-white/80 md:dark:bg-gray-900/80 md:backdrop-blur-md rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 md:p-6 lg:p-8">
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
    </div>
  );
}
