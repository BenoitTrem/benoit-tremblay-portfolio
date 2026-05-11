"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Intro.module.css";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fadeout">("loading");
  const [progress, setProgress] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];
    let globalAlpha = 0;
    let fading = false;

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

    const handleBeforeUnload = () => {
      fading = true;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const draw = () => {
      const cfg = getConfig();

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
        ctx.fillStyle = "rgba(255,255,255,0.5)";
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
            ctx.strokeStyle = `rgba(255,255,255,${((1 - dist / cfg.maxDist) * 0.18).toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setNameVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const DURATION = 2800;
    const start = performance.now();
    const ease = (t: number) =>
      t < 0.7 ? (t / 0.7) * 0.85 : 0.85 + ((t - 0.7) / 0.3) * 0.15;

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("fadeout"), 600);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase !== "fadeout") return;
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <div
      className={`${styles.intro} ${phase === "fadeout" ? styles.fadeout : ""}`}
    >
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        <div
          className={`${styles.namePhase} ${nameVisible ? styles.nameVisible : ""}`}
        >
          <p className={styles.welcome}>Welcome&nbsp;·&nbsp;Bienvenue</p>
          <div className={styles.divider} />
          <h1 className={styles.name} aria-label="Benoit Tremblay">
            {"Benoit Tremblay".split("").map((char, i) => (
              <span
                key={i}
                className={styles.nameLetter}
                style={{
                  animationDelay: `${i * 60}ms`,
                  display: char === " " ? "inline-block" : undefined,
                  width: char === " " ? "0.35em" : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.loading}>Loading · Chargement</p>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.percent}>{progress}%</p>
      </div>
    </div>
  );
}
