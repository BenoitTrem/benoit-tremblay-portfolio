"use client";
import { useEffect, useRef } from "react";

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const GAP = 28,
      RADIUS = 1.2,
      GLOW_RADIUS = 180;
    const isDark =
      document.documentElement.getAttribute("data-theme") !== "light";
    const DOT = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
    let W: number,
      H: number,
      dots: any[] = [],
      glows: any[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;
      dots = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({
            x: c * GAP,
            y: r * GAP,
            alpha: 0.12 + Math.random() * 0.08,
          });
    };

    const spawnGlow = () =>
      glows.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: GLOW_RADIUS + Math.random() * 80,
        alpha: 0,
        phase: "in",
        speed: 0.008 + Math.random() * 0.006,
        maxAlpha: 0.3 + Math.random() * 0.2,
      });

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      glows.forEach((g) => {
        g.phase === "in"
          ? ((g.alpha += g.speed), g.alpha >= g.maxAlpha && (g.phase = "out"))
          : (g.alpha -= g.speed * 0.6);
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, DOT + g.alpha + ")");
        grad.addColorStop(1, DOT + "0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
      });
      glows = glows.filter((g) => g.alpha > 0);
      dots.forEach((d) => {
        let boost = 0;
        glows.forEach((g) => {
          const dist = Math.hypot(d.x - g.x, d.y - g.y);
          if (dist < g.r) boost += g.alpha * (1 - dist / g.r) * 3.5;
        });
        ctx.beginPath();
        ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = DOT + Math.min(1, d.alpha + boost) + ")";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    const interval = setInterval(spawnGlow, 1200);
    spawnGlow();
    spawnGlow();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      window.removeEventListener("resize", resize);
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
        opacity: 0.6,
      }}
    />
  );
}
