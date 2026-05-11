"use client";
import { useEffect, useRef } from "react";

export default function ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number, raf: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];
    let globalAlpha = 0; // fade in on mount
    let fading = false; // true when unloading

    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const getConfig = () => {
      const mobile = W <= 768;
      return {
        count: mobile ? 20 : 60,
        maxDist: mobile ? 70 : 130,
        speed: mobile ? 0.2 : 0.4,
        minR: mobile ? 0.8 : 1.5,
        maxR: mobile ? 0.4 : 1,
      };
    };

    const buildParticles = () => {
      const cfg = getConfig();
      particles = Array.from({ length: cfg.count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * cfg.speed,
        vy: (Math.random() - 0.5) * cfg.speed,
        r: cfg.minR + Math.random() * cfg.maxR,
      }));
    };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildParticles();
    };

    // Fade out before unload (pull-to-refresh, navigation, tab close)
    const handleBeforeUnload = () => {
      fading = true;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const draw = () => {
      const cfg = getConfig();
      const isLight = getTheme();
      const COLOR = isLight ? "0,0,0" : "255,255,255";
      const dotAlpha = isLight ? 0.35 : 0.5;
      const lineAlpha = isLight ? 0.25 : 0.18;
      const lineWidth = isLight ? (W <= 768 ? 0.8 : 1.2) : 0.8;

      // Smooth fade in on mount, fade out on unload
      if (fading) {
        globalAlpha = Math.max(0, globalAlpha - 0.04);
      } else {
        globalAlpha = Math.min(1, globalAlpha + 0.02);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.globalAlpha = globalAlpha;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${dotAlpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < cfg.maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${COLOR},${((1 - dist / cfg.maxDist) * lineAlpha).toFixed(3)})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
