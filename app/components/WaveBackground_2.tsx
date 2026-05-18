"use client";
import { useEffect, useRef } from "react";

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const isDark =
      document.documentElement.getAttribute("data-theme") !== "light";
    const FG = isDark ? "255,255,255" : "20,20,20";

    let W: number,
      H: number,
      t = 0,
      raf: number;

    const waves = [
      {
        amp: 38,
        freq: 0.0016,
        speed: 0.00055,
        yRatio: 0.25,
        alpha: 0.07,
        width: 1.5,
        offset: 0,
      },
      {
        amp: 28,
        freq: 0.002,
        speed: 0.0004,
        yRatio: 0.38,
        alpha: 0.09,
        width: 1.2,
        offset: 2.1,
      },
      {
        amp: 44,
        freq: 0.0013,
        speed: 0.0003,
        yRatio: 0.52,
        alpha: 0.11,
        width: 1.0,
        offset: 4.3,
      },
      {
        amp: 22,
        freq: 0.0024,
        speed: 0.0005,
        yRatio: 0.63,
        alpha: 0.08,
        width: 0.8,
        offset: 1.1,
      },
      {
        amp: 50,
        freq: 0.0011,
        speed: 0.00022,
        yRatio: 0.75,
        alpha: 0.06,
        width: 1.4,
        offset: 3.7,
      },
      {
        amp: 18,
        freq: 0.0028,
        speed: 0.00035,
        yRatio: 0.86,
        alpha: 0.05,
        width: 0.7,
        offset: 5.5,
      },
    ];

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }

    function buildPath(w: (typeof waves)[0]) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const y =
          w.yRatio * H +
          Math.sin(x * w.freq + t * w.speed + w.offset) * w.amp +
          Math.sin(x * w.freq * 1.7 + t * w.speed * 0.6 + w.offset + 1) *
            (w.amp * 0.35) +
          Math.sin(x * w.freq * 0.5 + t * w.speed * 0.3 + w.offset + 3) *
            (w.amp * 0.2);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      t++;
      for (const w of waves) {
        buildPath(w);
        ctx.strokeStyle = `rgba(${FG},${w.alpha})`;
        ctx.lineWidth = w.width;
        ctx.lineJoin = "round";
        ctx.stroke();
      }
      raf = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
