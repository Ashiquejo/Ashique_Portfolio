import { PageTransition } from "../components/layout/PageTransition";
import { motion, AnimatePresence } from "motion/react";
import projectsData from "../data/projects.json";
import { useState } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const selectedProject = projectId ? projectsData.find(p => p.id === projectId) : null;

  return (
    <PageTransition className="flex-1 w-full max-w-6xl mx-auto flex flex-col pt-12 relative">
      <h2 className="text-4xl font-bold tracking-tight mb-8">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-[#0E131A] border border-slate-800/80 rounded-xl p-8 cursor-pointer hover:border-g-blue/50 transition-all group relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-g-blue to-g-green transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

            <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold mb-3">{project.title}</motion.h3>
            <motion.p layoutId={`desc-${project.id}`} className="text-text-muted mb-6">{project.description}</motion.p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="px-2 py-1 bg-white/5 rounded text-xs font-mono text-g-blue">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-1 bg-white/5 rounded text-xs font-mono text-text-muted">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => navigate('/projects')}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="bg-[#0E131A] border border-slate-800/80 w-full max-w-3xl rounded-2xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.4)] relative z-10 pointer-events-auto overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => navigate('/projects')}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl sm:text-4xl font-bold mb-4 pr-12">
                {selectedProject.title}
              </motion.h3>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-g-blue/10 text-g-blue border border-g-blue/20 rounded-full text-sm font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <motion.p layoutId={`desc-${selectedProject.id}`} className="text-text-muted text-lg leading-relaxed mb-8">
                {selectedProject.description}
                <br /><br />
                This project showcases advanced architectural patterns and highlights my capability to deliver production-grade applications that scale seamlessly. The intersection of these technologies allows for a highly performant and resilient system.
              </motion.p>

              <div className="flex items-center gap-4">
                {(selectedProject as any).demo && (
                  <a href={(selectedProject as any).demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-slate-200 transition-all cursor-none">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {(selectedProject as any).github && (
                  <a href={(selectedProject as any).github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 border border-slate-700 text-white font-bold rounded hover:border-slate-500 transition-all cursor-none">
                    GitHub <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}