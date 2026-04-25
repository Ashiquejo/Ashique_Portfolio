import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between border-b border-slate-800/50 bg-[#0B0F14]/90 backdrop-blur print:hidden"
    >
      <div className="text-xl font-mono font-bold tracking-tighter cursor-none">
        <span className="text-g-blue">/</span>ashique
      </div>

      <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 sm:gap-8 text-[11px] sm:text-xs font-mono tracking-widest uppercase mt-4 sm:mt-0">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "relative pb-1 transition-colors hover:text-white cursor-none",
                isActive ? "text-white" : "text-text-muted"
              )
            }
          >
            {({ isActive }) => (
              <>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-g-blue"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  );
}