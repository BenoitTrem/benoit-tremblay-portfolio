"use client";
import { useEffect, useRef } from "react";

export default function RainStreaks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const COUNT = 80;
    let W: number, H: number, raf: number;

    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    type Drop = {
      x: number;
      y: number;
      speed: number;
      length: number; // streak length in px
      alpha: number;
    };

    const mkDrop = (fromTop = false): Drop => ({
      x: Math.random() * (W || window.innerWidth),
      y: fromTop
        ? -Math.random() * (H || window.innerHeight)
        : Math.random() * (H || window.innerHeight),
      speed: 2 + Math.random() * 5,
      length: 12 + Math.random() * 60,
      alpha: 0.08 + Math.random() * 0.35,
    });

    const drops: Drop[] = Array.from({ length: COUNT }, () => mkDrop(false));

    const draw = () => {
      const isLight = getTheme();
      const COLOR = isLight ? "0,0,0" : "255,255,255";

      ctx.clearRect(0, 0, W, H);

      drops.forEach((d) => {
        d.y += d.speed;

        // Respawn above the top when it exits the bottom
        if (d.y - d.length > H)
          Object.assign(d, mkDrop(true), { y: -d.length });

        // Gradient streak: bright head, fading tail
        const grad = ctx.createLinearGradient(d.x, d.y - d.length, d.x, d.y);
        grad.addColorStop(0, `rgba(${COLOR},0)`);
        grad.addColorStop(1, `rgba(${COLOR},${d.alpha})`);

        ctx.beginPath();
        ctx.moveTo(d.x, d.y - d.length);
        ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
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
        opacity: 1,
      }}
    />
  );
}
