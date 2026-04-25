import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { motion } from "motion/react";
import { GiCentaur } from "react-icons/gi";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLight } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    let mouse = { x: -1000, y: -1000 };
    let smoothMouse = { x: 0, y: 0 };
    let actualMouse = { x: 0, y: 0 };

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      actualMouse.x = e.clientX - canvas.width / 2;
      actualMouse.y = e.clientY - canvas.height / 2;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      actualMouse.x = 0;
      actualMouse.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        
        if (distance < maxDist) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDist - distance) / maxDist;
          this.x -= forceDirectionX * force * 1.5;
          this.y -= forceDirectionY * force * 1.5;
        }
      }

      draw() {
        const drawX = this.x - smoothMouse.x * 0.01;
        const drawY = this.y - smoothMouse.y * 0.01;
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min((canvas.width * canvas.height) / 10000, 120);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      smoothMouse.x += (actualMouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (actualMouse.y - smoothMouse.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const p1x = p1.x - smoothMouse.x * 0.01;
          const p1y = p1.y - smoothMouse.y * 0.01;
          const p2x = p2.x - smoothMouse.x * 0.01;
          const p2y = p2.y - smoothMouse.y * 0.01;

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            const opacity = 1 - (dist / 100);
            ctx.strokeStyle = isLight 
              ? `rgba(0, 0, 0, ${opacity * 0.1})` 
              : `rgba(255, 255, 255, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] flex items-center justify-center">
        <motion.div
          animate={{ 
            y: ["-30vh", "30vh", "10vh", "-20vh", "-30vh"], 
            x: ["-30vw", "30vw", "-10vw", "20vw", "-30vw"],
            rotate: [-10, 10, -5, 5, -10], 
            scale: [0.9, 1.1, 0.95, 1.05, 0.9] 
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] blur-[1px]"
          style={{ opacity: 0.01 }}
        >
          <GiCentaur className="w-full h-full text-current drop-shadow-2xl" style={{ color: isLight ? "#000" : "#FFF" }} />
        </motion.div>
      </div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      />
    </>
  );
}
