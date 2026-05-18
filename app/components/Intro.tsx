"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Intro.module.css";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fadeout">("loading");
  const [progress, setProgress] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const waveRafRef = useRef<number>(0);

  // — Wave background —
  useEffect(() => {
    const svg = svgRef.current!;
    const WAVE_COUNT = 6;
    let W: number,
      H: number,
      t = 0;

    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      amp: 30 + i * 12,
      freq: 0.003 - i * 0.0003,
      speed: 0.004 + i * 0.0008,
      yBase: 0,
      alpha: 0.06 + i * 0.04,
      width: 1 - i * 0.1,
      offset: (i / WAVE_COUNT) * Math.PI * 2,
    }));

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      waves.forEach((w, i) => {
        w.yBase = H * (0.2 + (i / WAVE_COUNT) * 0.65);
      });
    };

    const buildPath = (w: (typeof waves)[0]) => {
      const pts: string[] = [];
      for (let x = 0; x <= W + 8; x += 8) {
        const y =
          w.yBase +
          Math.sin(x * w.freq + t * w.speed + w.offset) * w.amp +
          Math.sin(x * w.freq * 2.1 + t * w.speed * 1.3 + w.offset) *
            (w.amp * 0.4);
        pts.push(x === 0 ? `M${x},${y}` : `L${x},${y}`);
      }
      return pts.join(" ");
    };

    svg.innerHTML = "";
    const paths = waves.map((w) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("fill", "none");
      svg.appendChild(path);
      return path;
    });

    const animate = () => {
      t++;
      waves.forEach((w, i) => {
        paths[i].setAttribute("stroke", `rgba(255,255,255,${w.alpha})`);
        paths[i].setAttribute("stroke-width", String(w.width));
        paths[i].setAttribute("d", buildPath(w));
      });
      waveRafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(waveRafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // — Progress bar —
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
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setPhase("fadeout"), 600);
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

      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.5,
          zIndex: 1,
        }}
      />

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
