import { PageTransition } from "../components/layout/PageTransition";
import { Copy, Terminal, Activity, Cpu, Moon, Sun, Network } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "../hooks/useTheme";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { isLight, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Dynamic telemetry simulator
  const [latency, setLatency] = useState(14);
  const [compute, setCompute] = useState(87);
  const [nodes, setNodes] = useState(342);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => prev > 12 && prev < 30 ? prev + (Math.random() > 0.5 ? 2 : -2) : 14);
      setCompute(prev => prev > 60 && prev < 98 ? prev + (Math.random() > 0.5 ? 3 : -3) : 87);
      setNodes(prev => prev + (Math.random() > 0.5 ? 1 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate dashboard elements
      gsap.from(".dash-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      // Continuous rotation
      gsap.to(".spin-slow", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 w-full h-full">
      {/* Left side */}
      <div className="flex-1 space-y-4 lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-g-green/30 bg-g-green/10 text-g-green text-xs font-mono mb-2 shadow-[0_0_15px_rgba(52,168,83,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-g-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-g-green"></span>
          </span>
          System Online
        </motion.div>

        <div className="overflow-hidden pt-4 mt-0 pb-2 -mb-2">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold flex items-center gap-2 cursor-default"
          >
            <div className="flex">
              {"Ashique".split("").map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  whileHover={{ y: -8, color: '#4285F4' }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex text-transparent bg-clip-text bg-gradient-to-r from-g-blue to-g-green">
              {"P Jo".split("").map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold tracking-tighter leading-tight flex flex-col pt-4 pb-2">
          <div className="overflow-hidden py-1">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-slate-100">AI &</span>
            </motion.div>
          </div>
          <div className="overflow-hidden py-1">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200">
                Systems
              </span>
            </motion.div>
          </div>
          <div className="overflow-hidden py-1 flex items-end">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex items-end">
              <span className="text-slate-100">Engineer</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                className="inline-block w-4 h-[6px] sm:h-2 lg:h-3 bg-g-blue ml-2 mb-2 lg:mb-4"
              />
            </motion.div>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 text-[17px] max-w-md leading-relaxed font-light mt-6"
        >
          Building <span className="text-white font-medium">intelligent systems</span> and <span className="text-white font-medium">high-performance applications</span> with a focus on <span className="text-g-blue">architecture</span>, <span className="text-g-green">efficiency</span>, and <span className="text-g-red">execution</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-6 w-full"
        >
          <button
            onClick={() => navigate('/projects')}
            className="w-full sm:w-auto justify-center px-8 py-3 bg-white text-black font-bold rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-slate-200 transition-all cursor-none flex items-center gap-2"
          >
            View Projects <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto justify-center px-8 py-3 border border-slate-700 text-white font-bold rounded hover:border-slate-500 transition-all cursor-none"
          >
            Contact
          </button>
          <button
            onClick={toggleTheme}
            className="w-full sm:w-[50px] flex justify-center p-3 bg-[#0E131A] border border-slate-800/80 rounded-lg hover:bg-[#141B24] transition-colors cursor-none text-slate-300"
            title="Toggle Light Mode"
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Right side animated dashboard */}
      <motion.div
        ref={panelRef}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="flex-1 w-full max-w-2xl bg-[#0E131A] rounded-xl border border-slate-800/80 p-6 shadow-[0_0_50px_rgba(0,100,255,0.05)] relative overflow-hidden flex flex-col gap-4 group"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-g-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between dash-card">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-g-red/80 shadow-[0_0_10px_rgba(234,67,53,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-g-yellow/80 shadow-[0_0_10px_rgba(251,188,4,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-g-green/80 shadow-[0_0_10px_rgba(52,168,83,0.5)]" />
          </div>
          <div className="text-xs font-mono text-text-muted flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-g-green animate-pulse" />
            system_monitor.sh
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 relative z-10 flex-1">
          <div className="dash-card bg-[#141B24]/80 backdrop-blur-sm rounded-lg p-5 border border-slate-800 hover:border-g-blue/50 transition-colors flex flex-col justify-between group/card">
            <div className="flex items-start justify-between">
              <Activity className="text-g-blue w-5 h-5 group-hover/card:scale-110 transition-transform" />
              <span className="text-xs text-g-blue bg-g-blue/10 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-g-blue animate-pulse"></span> Live
              </span>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest">Network Latency</div>
              <div className="text-3xl font-mono text-white flex items-end gap-1">
                {latency}<span className="text-sm text-slate-500 mb-1">ms</span>
              </div>
            </div>
          </div>

          <div className="dash-card bg-[#141B24]/80 backdrop-blur-sm rounded-lg p-5 border border-slate-800 hover:border-g-red/50 transition-colors flex flex-col justify-between group/card">
            <div className="flex items-start justify-between">
              <Cpu className="text-g-red w-5 h-5 group-hover/card:scale-110 transition-transform" />
              <div className="w-5 h-5 spin-slow opacity-80">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" strokeDasharray="60 40" className="text-g-red" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest">Compute Load</div>
              <div className="text-3xl font-mono text-white flex items-end gap-1">
                {compute}<span className="text-sm text-slate-500 mb-1">%</span>
              </div>
            </div>
          </div>

          <div className="dash-card col-span-2 bg-[#141B24]/80 backdrop-blur-sm rounded-lg p-5 border border-slate-800 hover:border-g-yellow/50 transition-colors flex flex-col justify-between group/card">
            <div className="flex items-start justify-between mb-4">
              <Network className="text-g-yellow w-5 h-5 group-hover/card:scale-110 transition-transform" />
              <span className="text-xs text-g-yellow bg-g-yellow/10 px-2 py-0.5 rounded font-mono tracking-widest uppercase">Nodes</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-widest">Active Distributed Nodes</div>
                <div className="text-3xl font-mono text-white flex items-end gap-1">
                  {nodes}<span className="text-sm text-slate-500 mb-1">units</span>
                </div>
              </div>
              {/* Mini visual chart representation */}
              <div className="flex items-end gap-1 h-8 opacity-70">
                {[40, 65, 80, 45, 90, 60, 85, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${Math.max(20, h - 20)}%`, `${h}%`, `${Math.max(20, h - 20)}%`] }}
                    transition={{ duration: 1.5 + (i * 0.1), repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 bg-g-yellow rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="dash-card col-span-2 flex-1 bg-[#0A0D12] overflow-hidden rounded-lg p-4 border border-slate-800 flex flex-col gap-3 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0A0D12] z-10 pointer-events-none" />
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest sticky top-0 bg-[#0A0D12] z-20 pb-2">Terminal / Event Log</div>
            <div className="flex flex-col gap-2 z-0 font-mono text-[11px] sm:text-xs">
              {[
                { time: "02:44:11", msg: "Agent Neo: LLM core securely initialized.", status: "success" },
                { time: "02:44:15", msg: "Establishing socket channel targeting Edge Nodes...", status: "pending" },
                { time: "02:45:00", msg: "Connection stable. Robotic actuation metrics streaming.", status: "success" },
                { time: "02:45:04", msg: "Awaiting next command cycle...", status: "idle" }
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start sm:items-center">
                  <span className="text-slate-600 shrink-0">[{log.time}]</span>
                  <span className={
                    log.status === "success" ? "text-g-green" :
                      log.status === "pending" ? "text-g-yellow" :
                        "text-slate-400"
                  }>
                    {log.msg}
                    {log.status === "idle" && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-3.5 bg-slate-400 ml-1 translate-y-[2px]" />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </PageTransition>
  );
}