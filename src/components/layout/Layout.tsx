import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { ZoroAssistant } from "../ZoroAssistant";
import { InteractiveBackground } from "../InteractiveBackground";

export function Layout() {
  const location = useLocation();
  const segment = location.pathname.split("/")[1] || "/";

  return (
    <div className="min-h-screen flex flex-col selection:bg-g-blue/30 selection:text-white relative">
      {/* Google Color Accents Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] flex z-50 pointer-events-none">
        <div className="h-full flex-1 bg-g-blue"></div>
        <div className="h-full flex-1 bg-g-red"></div>
        <div className="h-full flex-1 bg-g-yellow"></div>
        <div className="h-full flex-1 bg-g-green"></div>
      </div>
      <CustomCursor />
      <Navbar />
      <ZoroAssistant />
      <InteractiveBackground />
      <main className="flex-1 w-full pt-32 sm:pt-28 print:pt-4 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <div key={segment} className="flex-1 flex flex-col h-full w-full">
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}
