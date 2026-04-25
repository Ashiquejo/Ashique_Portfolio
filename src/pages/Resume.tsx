import { PageTransition } from "../components/layout/PageTransition";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../hooks/useTheme";

export default function Resume() {
  const { isLight } = useTheme();

  return (
    <PageTransition className="flex-1 w-full max-w-4xl mx-auto flex flex-col pt-4 relative">
      <div className="flex items-center justify-between pl-1 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Resume</h2>
        <div className="flex gap-4">
          <a
            href="/Resume.pdf"
            download="Ashique_P_Jo_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-g-blue text-white rounded-lg hover:bg-g-blue/90 font-medium transition-colors cursor-none print:hidden uppercase tracking-wider text-sm"
          >
            <Download className="w-4 h-4" /> Save as PDF
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn(
          "flex-1 bg-[#0E131A] border border-slate-800/80 rounded-xl p-8 sm:p-12 shadow-2xl overflow-hidden transition-all duration-300",
          isLight ? "bg-white text-gray-900 border-gray-200" : ""
        )}
      >
        {/* Header */}
        <div className="border-b border-border pb-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-2 uppercase">Ashique P Jo</h1>
          <p className={cn("text-xl mb-4 font-medium", isLight ? "text-g-blue" : "text-g-blue")}>AI & Systems Engineering Undergraduate</p>
          <div className={cn("flex flex-wrap gap-4 text-sm font-mono", isLight ? "text-gray-500" : "text-slate-400")}>
            <span>joashique@gmail.com</span>
            <span>•</span>
            <span>github.com/Ashiquejo</span>
            <span>•</span>
            <span>Research: Embodied AI & LLMs</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Education */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-g-blue" />
              Education
            </h3>
            <div className="relative pl-6 border-l border-slate-700">
              <div className="absolute w-3 h-3 bg-[#0E131A] border-2 border-g-blue rounded-full -left-[6.5px] top-1.5" />
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-lg font-bold">B.Tech in Computer Science & Engineering (AI)</h4>
                <span className={cn("text-sm font-mono", isLight ? "text-gray-500" : "text-slate-400")}>Expected 2028</span>
              </div>
              <p className={cn("text-sm font-medium", isLight ? "text-gray-500" : "text-g-blue")}>St. Joseph's College of Engineering and Technology</p>
            </div>
          </section>

          {/* Research & Projects */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-g-red" />
              Projects & Research
            </h3>

            <div className="space-y-6">
              <div className="relative pl-6 border-l border-slate-700">
                <div className="absolute w-3 h-3 bg-[#0E131A] border-2 border-g-red rounded-full -left-[6.5px] top-1.5" />
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-bold">Project Neo</h4>
                  <span className={cn("text-sm font-mono", isLight ? "text-gray-500" : "text-slate-400")}>Embodied AI</span>
                </div>
                <p className={cn("text-sm font-medium mb-2", isLight ? "text-gray-600" : "text-g-blue")}>LLM-Powered Voice-Responsive Robot</p>
                <ul className={cn("list-disc list-outside ml-4 space-y-1 text-sm", isLight ? "text-gray-600" : "text-slate-300")}>
                  <li>Architected an embodied AI system integrating Gemini API with Raspberry Pi for real-time voice interaction.</li>
                  <li>Designed a low-latency pipeline for speech input, LLM inference, and robotic actuation under hardware constraints.</li>
                  <li>Evaluated LLM-driven contextual understanding in physical agents, establishing the system as a research testbed.</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-700">
                <div className="absolute w-3 h-3 bg-[#0E131A] border-2 border-g-yellow rounded-full -left-[6.5px] top-1.5" />
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-bold">FarmGrid</h4>
                  <span className={cn("text-sm font-mono", isLight ? "text-gray-500" : "text-slate-400")}>Hackathon</span>
                </div>
                <p className={cn("text-sm font-medium mb-2", isLight ? "text-gray-600" : "text-g-blue")}>Agricultural Technology Hackathon Project</p>
                <ul className={cn("list-disc list-outside ml-4 space-y-1 text-sm", isLight ? "text-gray-600" : "text-slate-300")}>
                  <li>Spearheaded system design translating agricultural challenges into technical architectures under time constraints.</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-700">
                <div className="absolute w-3 h-3 bg-[#0E131A] border-2 border-g-green rounded-full -left-[6.5px] top-1.5" />
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-bold">Mini E-ATV</h4>
                  <span className={cn("text-sm font-mono", isLight ? "text-gray-500" : "text-slate-400")}>Hardware</span>
                </div>
                <ul className={cn("list-disc list-outside ml-4 space-y-1 text-sm pt-2", isLight ? "text-gray-600" : "text-slate-300")}>
                  <li>Engineered a mini electric All-Terrain Vehicle applying interdisciplinary system thinking across mechanical and control concepts.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Leadership & Activities */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-g-yellow" />
              Leadership & Activities
            </h3>
            <div className="relative pl-6 border-l border-slate-700 space-y-4">
              <div className="absolute w-3 h-3 bg-[#0E131A] border-2 border-g-yellow rounded-full -left-[6.5px] top-1.5" />

              <div>
                <h4 className="text-sm font-bold">Workshop Lead, ASTHRA 10.0</h4>
                <p className={cn("text-sm", isLight ? "text-gray-600" : "text-slate-400")}>Conducted technical workshops simplifying complex concepts into practical learning modules.</p>
              </div>

              <div>
                <h4 className="text-sm font-bold">Public Speaker, Sudo Learn Talks</h4>
                <p className={cn("text-sm", isLight ? "text-gray-600" : "text-slate-400")}>Delivered talks on emerging technologies and AI systems.</p>
              </div>

              <div>
                <h4 className="text-sm font-bold">Buildathon 2026, Assistive Origins</h4>
                <p className={cn("text-sm", isLight ? "text-gray-600" : "text-slate-400")}>Collaborated on assistive-technology ideation and prototyping aligned with inclusive AI.</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </PageTransition>
  );
}