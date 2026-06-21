"use client";
import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; life: number };

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dots: Dot[] = [];
    const MAX = 22;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      dots.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (dots.length > MAX) dots.shift();
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= 0.045;
        if (d.life <= 0) {
          dots.splice(i, 1);
          continue;
        }

        const progress = i / dots.length;
        const radius = 2.5 * progress;
        const alpha = d.life * 0.38 * progress;

        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(radius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 170, ${alpha})`;
        ctx.fill();

        if (alpha > 0.08 && radius > 1) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(45, 212, 170, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99998,
      }}
    />
  );
}
