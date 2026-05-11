"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Intro.module.css";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"bar" | "name" | "fadeout">("bar");
  const [progress, setProgress] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);

  // Canvas background — same style as ParticleMesh but always white on dark
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

    const draw = () => {
      const cfg = getConfig();

      // Fade in gently
      globalAlpha = Math.min(1, globalAlpha + 0.02);

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
        ctx.fillStyle = `rgba(255,255,255,0.5)`;
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
    };
  }, []);

  // Phase 1 — smooth counter
  useEffect(() => {
    if (phase !== "bar") return;

    const DURATION = 2800;
    const start = performance.now();

    const ease = (t: number) =>
      t < 0.7 ? (t / 0.7) * 0.85 : 0.85 + ((t - 0.7) / 0.3) * 0.15;

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const value = Math.round(ease(t) * 100);
      progressRef.current = value;
      setProgress(value);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("name"), 300);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Phase 2 — name reveal
  useEffect(() => {
    if (phase !== "name") return;
    const t1 = setTimeout(() => setNameVisible(true), 50);
    const t2 = setTimeout(() => setPhase("fadeout"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  // Phase 3 — fade out
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
        {phase === "bar" && (
          <div className={styles.barPhase}>
            <p className={styles.loading}>Loading</p>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.percent}>{progress}%</p>
          </div>
        )}

        {(phase === "name" || phase === "fadeout") && (
          <div
            className={`${styles.namePhase} ${nameVisible ? styles.nameVisible : ""}`}
          >
            {/* welcome + divider fade in together */}
            <p className={styles.welcome}>welcome to my portfolio</p>
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
        )}
      </div>
    </div>
  );
}
