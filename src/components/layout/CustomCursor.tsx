import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for following
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="print:hidden">
      {/* Outer Glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-g-blue/30 bg-g-blue/5 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
        style={{
          x: springX,
          y: springY,
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-g-red pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </div>
  );
}
