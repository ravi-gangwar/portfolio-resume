import ResumeHeader from "@/components/ResumeHeader";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProblemSolvingSection from "@/components/ProblemSolvingSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import AchievementsSection from "@/components/AchievementsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-200">
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 lg:p-10">
          <ResumeHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              <AboutSection />
              <ExperienceSection />
              <EducationSection />
              <ProjectsSection />
            </div>

            {/* Right Column - Skills & Achievements */}
            <div className="lg:col-span-1 space-y-8">
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
