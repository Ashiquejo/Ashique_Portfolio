import { PageTransition } from "../components/layout/PageTransition";
import { Terminal, ArrowRight, Sparkles, Code2, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TITLES = [
  { text: "Ashique P", highlight: "Jo." },
  { text: "AI", highlight: "Researcher." },
  { text: "AI Systems Eng.", highlight: "Undergrad." },
  { text: "Aspiring", highlight: "Polymath." }
];

export default function Home() {
  const navigate = useNavigate();
  const [logoFailed, setLogoFailed] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition className="flex-1 w-full flex flex-col justify-center items-center h-full sm:pt-6 pb-20">
      
      <div className="w-full max-w-6xl flex flex-col items-start space-y-10 z-10 px-4">
        
        {/* Top minimal status & small logo row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new Event("toggleZoroAssistant"))}
            title="Toggle Zoro AI"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-[#141B24] to-[#0A0D12] border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 relative group cursor-none hover:border-g-green/50 hover:shadow-[0_0_30px_rgba(52,168,83,0.2)] transition-all"
          >
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-g-green/30 rounded-2xl transition-colors duration-500" />
            
            {/* Tooltip for Zoro AI */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-g-green text-[#0A0D12] text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
              Toggle Zoro
            </div>

            {!logoFailed ? (
              <img 
                src="/logo.png" 
                alt="AJ Logo" 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                AJ
              </span>
            )}
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full border border-g-blue/30 bg-g-blue/5 text-g-blue text-sm font-mono shadow-[0_0_20px_rgba(66,133,244,0.1)] backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI & System Architecture</span>
          </motion.div>
        </div>

        {/* Animated Titles */}
        <div className="flex items-center min-h-[160px] sm:min-h-[220px] lg:min-h-[260px] w-full">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={titleIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.05] text-white"
            >
              <span className="block">{TITLES[titleIndex].text}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-g-blue via-indigo-400 to-g-red block pb-4">
                {TITLES[titleIndex].highlight}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed"
        >
          Engineering intelligent systems and high-performance applications. Specializing in <span className="text-white font-medium">Embodied AI</span>, LLM deployment, and scalable web architectures.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full pt-4"
        >
          <button 
            onClick={() => navigate('/projects')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 transition-all cursor-none group"
          >
            View Projects 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#141B24] border border-slate-700 text-white font-semibold rounded-xl hover:border-g-blue/50 hover:bg-[#1A232D] transition-all cursor-none"
          >
            Contact Me
          </button>
        </motion.div>
        
        {/* Miniature status markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex items-center gap-6 pt-10 text-sm font-mono text-slate-500"
        >
          <div className="flex items-center gap-2">
             <Code2 className="w-4 h-4 text-g-green" /> Backend & APIs
          </div>
          <div className="flex items-center gap-2">
             <Cpu className="w-4 h-4 text-g-yellow" /> Hardware Edge
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
