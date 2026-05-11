"use client";
import { useEffect, useRef } from "react";

export default function WaveBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const isDark =
      document.documentElement.getAttribute("data-theme") !== "light";
    const STROKE = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
    const WAVE_COUNT = 6;
    let W: number,
      H: number,
      t = 0,
      raf: number;

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
    const paths = waves.map((w, i) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", STROKE + w.alpha + ")");
      path.setAttribute("stroke-width", String(w.width));
      svg.appendChild(path);
      return path;
    });

    const animate = () => {
      t++;
      waves.forEach((w, i) => paths[i].setAttribute("d", buildPath(w)));
      raf = requestAnimationFrame(animate);
    };

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
        opacity: 0.5,
        overflow: "hidden",
      }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
