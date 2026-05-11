"use client";
import { useEffect, useRef } from "react";

export default function FloatingBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const COUNT = 6;
    let W: number,
      H: number,
      raf: number,
      tick = 0;

    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    type Blob = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseR: number;
      points: { angle: number; r: number; speed: number; offset: number }[];
      hue: number;
    };

    const mkBlob = (): Blob => ({
      x: Math.random() * (W || window.innerWidth),
      y: Math.random() * (H || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      baseR: 80 + Math.random() * 120,
      // Each blob has 8 perimeter points that wobble independently
      points: Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        r: 0.8 + Math.random() * 0.4, // radius multiplier
        speed: 0.003 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
      })),
      hue: Math.floor(Math.random() * 360),
    });

    const blobs: Blob[] = Array.from({ length: COUNT }, mkBlob);

    const draw = () => {
      const isLight = getTheme();

      // Soft clear for ghostly trails
      ctx.fillStyle = isLight ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, W, H);

      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        // Soft bounce
        if (b.x < -b.baseR) b.x = W + b.baseR;
        if (b.x > W + b.baseR) b.x = -b.baseR;
        if (b.y < -b.baseR) b.y = H + b.baseR;
        if (b.y > H + b.baseR) b.y = -b.baseR;

        // Build the morphing blob path
        ctx.beginPath();
        b.points.forEach((pt, i) => {
          const wobble = Math.sin(tick * pt.speed + pt.offset) * 0.2;
          const r = b.baseR * (pt.r + wobble);
          const x = b.x + Math.cos(pt.angle) * r;
          const y = b.y + Math.sin(pt.angle) * r;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();

        // Radial gradient fill for lava-lamp glow
        const grad = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.baseR * 1.2,
        );
        if (isLight) {
          grad.addColorStop(0, `hsla(${b.hue},60%,55%,0.18)`);
          grad.addColorStop(1, `hsla(${b.hue},60%,55%,0)`);
        } else {
          grad.addColorStop(0, `hsla(${b.hue},70%,65%,0.15)`);
          grad.addColorStop(1, `hsla(${b.hue},70%,65%,0)`);
        }

        ctx.fillStyle = grad;
        ctx.filter = "blur(18px)";
        ctx.fill();
        ctx.filter = "none";
      });

      tick++;
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
