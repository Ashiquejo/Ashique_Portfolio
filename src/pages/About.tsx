import { PageTransition } from "../components/layout/PageTransition";
import { motion } from "motion/react";

const skills = [
  { category: "Languages", items: ["Python", "Java", "C", "TypeScript"] },
  { category: "AI & Tech", items: ["Gemini API", "LLMs", "Conversational AI", "Human-AI Interaction"] },
  { category: "Systems & Hardware", items: ["Raspberry Pi 4B", "Embedded AI", "Hardware Co-design", "Prototyping"] },
  { category: "Tools", items: ["GitHub", "Rapid Prototyping", "Cross-disciplinary Collab"] },
];

export default function About() {
  return (
    <PageTransition className="flex-1 flex flex-col pt-12 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-16">
        {/* Narrative */}
        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-text-muted text-lg leading-relaxed max-w-2xl"
          >
            <p>
              I am an AI-focused Computer Science undergraduate specializing in LLM-driven embodied systems,
              human-AI interaction, and hardware-software co-design. My research focuses on bridging the gap
              between emerging AI capabilities and physical, real-world applications.
            </p>
            <p>
              I have experience building intelligent prototypes using the Gemini API and embedded platforms
              like the Raspberry Pi. Beyond prototyping, I actively lead technical communities and
              participate in innovation-driven programs aligned with applied AI research.
            </p>
          </motion.div>
        </section>

        {/* Skills Bento */}
        <section>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mb-6"
          >
            Technical Arsenal
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-[#0E131A] border border-slate-800/80 rounded-xl p-6 hover:bg-[#141B24] transition-colors shadow-2xl"
              >
                <div className="text-sm font-mono text-g-blue mb-4">{skillGroup.category}</div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}