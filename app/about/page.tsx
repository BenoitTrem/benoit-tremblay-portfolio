"use client";
import styles from "./about.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";

/* ─── Inline SVG icons per skill ────────────────────────── */
const SkillIcons: Record<string, React.ReactNode> = {
  React: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 14.25L8.5 7.5H7v9h1.75v-6.75l6.5 8.5H17v-9h-1.75v6.75z" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.669 1.715 1.219C13.248 10.39 14.205 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.669-1.715-1.219C15.252 7.01 14.295 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.669 1.715 1.219C8.748 15.79 9.705 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.669-1.715-1.219C10.752 12.41 9.795 11.4 7.5 11.4z" />
    </svg>
  ),
  "CSS / HTML": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm13.1 5H8.9l.2 2h7.8l-.6 6.5L12 17.9l-4.3-1.4-.3-3.1h2l.1 1.6 2.5.7 2.5-.7.3-3H8.6L8 7h8.3l-.2 1z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm10.5 13.5v-2.25h-1.5V18H9.75v-3.75H8.25V18H6.75v-5.25h6v3.75zm4.5-3.75h-1.5V18h-1.5v-5.25H13.5V11.25H18v1.5z" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm9.75 13.5c0 1.5-1.5 2.25-3 1.5l.75-1.125c.375.375.75.375.75 0v-5.625h1.5V16.5zm3.75.375c0 1.5-1.125 2.25-2.625 1.875l.375-1.125c.375.375.75.375.75 0 .375 0 .75-.375.75-.75V11.25h1.5v5.625z" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-2.1 0-3.9.4-5.1 1.1C5.5 3.9 5 5 5 6.4V8h7v1H5c-1.5 0-2.8 1-3.2 2.5-.5 1.7-.5 2.8 0 4.5.4 1.3 1.4 2.5 3.2 2.5H7v-2c0-1.7 1.5-3 3.2-3h5.5c1.5 0 2.8-1.2 2.8-2.8V6.4C18.5 4 15.5 2 12 2zm-2 2.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm9.2 7c1.5 0 2.8.9 3.2 2.2.5 1.7.5 3.5 0 5.1-.4 1.3-1.4 2.2-3.2 2.2H17v-1.8c0-1.7-1.5-3.2-3.2-3.2H8.3c-1.5 0-2.8-1.2-2.8-2.8v-1.7H7v1.5c0 .8.7 1.5 1.5 1.5H17v-3h2.2zM14 19c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.19 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.631" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.85c-.27 0-.55.07-.76.22L3.34 6.35c-.43.25-.7.7-.7 1.19v9.01c0 .49.27.94.7 1.19l7.9 4.28c.42.23.93.23 1.35 0l7.9-4.28c.43-.25.7-.7.7-1.19V7.54c0-.49-.27-.94-.7-1.19l-7.9-4.28c-.21-.15-.49-.22-.59-.22zm-.1 3.71l4.52 2.61c.15.09.24.26.24.43v5.22c0 .17-.09.34-.24.43l-4.52 2.61c-.15.09-.33.09-.48 0L6.9 13.25c-.15-.09-.24-.26-.24-.43V8.6c0-.17.09-.34.24-.43l4.52-2.61c.08-.04.16-.07.24-.07s.16.02.24.07z" />
    </svg>
  ),
  "REST APIs": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 9l3 3-3 3M13 15h3" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.58.845 7.519.786 6.5.836 4.97.91 3.35 1.29 2.18 2.226 1.45 2.94 1.053 3.9 1.012 4.9c-.13 2.974 1.987 5.127 3.73 6.466a12.06 12.06 0 0 0 1.56.973c-.069.067-.139.15-.207.253-.468.694-.567 1.555-.543 2.176.024.644.158 1.29.29 1.94.13.63.264 1.27.285 1.95.02.75-.097 1.43-.535 2.015l-.024.033-.019.036c-.137.258-.15.506-.069.742.082.236.278.45.57.63.58.35 1.452.51 2.557.47 1.088-.04 2.137-.26 2.924-.87a3.68 3.68 0 0 0 .835-.97 4.657 4.657 0 0 0 1.574.254c.592 0 1.243-.111 1.927-.35a5.234 5.234 0 0 0 .57-.25c.55.336 1.255.594 2.198.594.89 0 1.97-.23 3.25-.972l.03-.018.027-.021c.42-.336.63-.81.636-1.314.007-.45-.142-.903-.356-1.314-.215-.412-.487-.78-.694-1.059a3.562 3.562 0 0 1-.162-.25c.537-.623.876-1.454.876-2.498 0-1.055-.23-1.99-.61-2.77a5.59 5.59 0 0 0-.13-.24c-.012-.37.013-.74.04-1.12.04-.56.082-1.14.03-1.74-.1-1.15-.573-2.08-1.42-2.61A5.072 5.072 0 0 0 17.128 0z" />
    </svg>
  ),
  "Algorithms & DS": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M3 12h12M3 18h6" />
      <circle cx="19" cy="18" r="2" />
      <path d="M17 12l2 2 4-4" />
    </svg>
  ),
  "Git / GitHub": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  "VS Code": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.948V4.053a1.5 1.5 0 0 0-.85-1.466zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  ),
  "Linux / CLI": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232C15.551 7.05 14.184 6 12.054 6 9.219 6 7.049 7.9 5.835 10.29 4.62 12.682 4.41 15.568 5.774 17.1c-.489.42-.975 1.263-1.415 1.877-.514.724-.292 1.554.356 1.261.653-.3 1.015-1.033 1.678-1.408 1.255 1.148 3.067 1.752 5.52 1.688 2.454-.065 4.317-.75 5.528-1.908.634.423.988 1.258 1.67 1.546.64.277.856-.472.47-1.107z" />
    </svg>
  ),
};

const skillCategories = [
  {
    label: "Frontend",
    colorVar: "--cat-frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "CSS / HTML", level: 92 },
    ],
  },
  {
    label: "Languages",
    colorVar: "--cat-language",
    skills: [
      { name: "TypeScript", level: 82 },
      { name: "JavaScript", level: 88 },
      { name: "Python", level: 78 },
      { name: "Java", level: 70 },
    ],
  },
  {
    label: "Backend",
    colorVar: "--cat-backend",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "PostgreSQL", level: 72 },
      { name: "Algorithms & DS", level: 75 },
    ],
  },
  {
    label: "Tools & DevOps",
    colorVar: "--cat-tools",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 65 },
      { name: "Linux / CLI", level: 70 },
    ],
  },
];

export default function About() {
  const locale = useLocale();
  const t = getT(locale);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<HTMLDivElement | null>(null);

  type StatKey = keyof typeof statPanelContent;

  const [activeStat, setActiveStat] = useState<StatKey | null>(null);
  const [visibleStat, setVisibleStat] = useState<StatKey | null>(null);
  const [switching, setSwitching] = useState(false);
  const stats: {
    key: StatKey;
    number: string;
    label: string;
  }[] = [
    {
      key: "yearsCoding",
      number: "8+",
      label: t.about.stats.yearsCoding,
    },
    {
      key: "projectsBuilt",
      number: "12",
      label: t.about.stats.projectsBuilt,
    },
  ];
  const statPanelContent = {
    yearsCoding: {
      title: t.about.statPanels.yearsCoding.title,
      body: (
        <p className={styles.statPanelText}>
          {t.about.statPanels.yearsCoding.body}
        </p>
      ),
    },

    projectsBuilt: {
      title: t.about.statPanels.projectsBuilt.title,
      body: (
        <>
          <p className={styles.statPanelText}>
            {t.about.statPanels.projectsBuilt.body}
          </p>

          <Link href="/projects" className={styles.statPanelLink}>
            {t.about.statPanels.projectsBuilt.cta}
            <ArrowRight size={13} />
          </Link>
        </>
      ),
    },
  };
  /* ─── Skill bar intersection animation ──────────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    blockRefs.current.forEach((block) => {
      if (!block) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const fills = entry.target.querySelectorAll<HTMLElement>(
                `.${styles.skillRowFill}`,
              );

              fills.forEach((fill, i) => {
                setTimeout(() => {
                  fill.classList.add(styles.skillRowFillAnimated);
                }, i * 120);
              });

              const lines = entry.target.querySelectorAll<HTMLElement>(
                `.${styles.skillCatLine}`,
              );

              lines.forEach((line) => {
                line.classList.add(styles.skillCatLineActive);
              });

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      observer.observe(block);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleStatClick = useCallback(
    (label: StatKey) => {
      // Clicking the same stat → close
      if (activeStat === label) {
        setVisibleStat(null); // triggers panel close (grid-rows → 0fr)
        setSwitching(false);
        // After the close transition, clear activeStat so content unmounts cleanly
        setTimeout(() => setActiveStat(null), 650);
        return;
      }

      if (activeStat === null) {
        // Panel is closed → open fresh
        setActiveStat(label);
        setVisibleStat(label);
        setSwitching(false);
      } else {
        // Panel is already open → cross-fade to new content
        // 1. Fade out current content
        setSwitching(true);
        setTimeout(() => {
          // 2. Swap content while invisible
          setActiveStat(label);
          setVisibleStat(label);
          setSwitching(false);
        }, 180); // matches .statPanelInnerSwitching transition duration
      }
    },
    [activeStat],
  );

  const panel = activeStat ? statPanelContent[activeStat] : null;
  const isOpen = visibleStat !== null;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div>
            <h1 className={styles.eyebrow}>About me</h1>
            <p className={styles.title}>Student Developer</p>
            <p className={styles.subtitle}>
              building software that solves real problems.
            </p>
          </div>

          <div className={styles.imageCard}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageLabel}>Photo coming soon</span>
            </div>
          </div>
        </section>

        {/* ── Stats + inline panel ── */}
        <div className={styles.statsWrapper}>
          <div className={`${styles.stats} ${isOpen ? styles.statsOpen : ""}`}>
            {stats.map((s) => (
              <a
                key={s.label}
                className={`${styles.stat} ${activeStat === s.key ? styles.statActive : ""}`}
                onClick={() => handleStatClick(s.key)}
                aria-expanded={activeStat === s.key}
              >
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Inline expanding panel */}
          <div
            className={`${styles.statPanel} ${isOpen ? styles.statPanelOpen : ""}`}
            aria-hidden={!isOpen}
          >
            <div className={styles.statPanelClip}>
              <div
                ref={innerRef}
                className={[
                  styles.statPanelInner,
                  isOpen && !switching ? styles.statPanelInnerVisible : "",
                  switching ? styles.statPanelInnerSwitching : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.statPanelContent}>
                  <p className={styles.statPanelTitle}>{panel?.title ?? ""}</p>
                  {panel?.body}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bio ── */}
        <div className={styles.bio}>
          <div className={styles.bioSidebar}>
            <div className={styles.bioSidebarLine} />
            <span className={styles.bioSidebarLabel}>My Story</span>
          </div>
          <div className={styles.bioText}>
            <p>
              I started gymnastics at age{" "}
              <span className={styles.bioHighlight}>7</span>, drawn to the
              combination of strength, precision, and artistry the sport
              demands. Over the years I&apos;ve competed across six events and
              learned that the mental discipline required in the gym translates
              directly to every other area of life.
            </p>
            <p>
              When I&apos;m not training, I&apos;m building. My interest in
              <span className={styles.bioHighlight}>
                {" "}
                computer science
              </span>{" "}
              grew from a curiosity about how things work under the hood. I
              started with small scripts, moved into web development, and now
              build full-stack applications with real users in mind.
            </p>
            <p>
              The overlap between both worlds is what drives me —
              <span className={styles.bioHighlight}>
                {" "}
                iteration, feedback, and mastery
              </span>
              . Whether it&apos;s perfecting a vault or refactoring an API, the
              process is the same.
            </p>
          </div>
        </div>

        {/* ── Skills ── */}
        <section className={styles.skillsSection}>
          <div className={styles.skillsHeader}>
            <p className={styles.sectionHeading}>Technical skills</p>
          </div>

          <div className={styles.skillCategoriesWrap}>
            {skillCategories.map((cat, catIdx) => (
              <div
                key={cat.label}
                className={styles.skillCatBlock}
                ref={(el) => {
                  blockRefs.current[catIdx] = el;
                }}
              >
                <div
                  className={styles.skillCatHeader}
                  style={
                    {
                      "--bar-color": `var(${cat.colorVar})`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={styles.skillCatDot}
                    style={{ background: `var(${cat.colorVar})` }}
                  />

                  <span className={styles.skillCatLabel}>{cat.label}</span>

                  <span className={styles.skillCatLine} />
                </div>

                <div className={styles.skillBarsGrid}>
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={styles.skillBarRow}
                      style={
                        {
                          "--bar-color": `var(${cat.colorVar})`,
                        } as React.CSSProperties
                      }
                    >
                      <div className={styles.skillBarMeta}>
                        <div className={styles.skillBarLeft}>
                          <span
                            className={styles.skillBarIcon}
                            style={
                              {
                                "--bar-color": `var(${cat.colorVar})`,
                              } as React.CSSProperties
                            }
                          >
                            {SkillIcons[skill.name]}
                          </span>

                          <span className={styles.skillBarName}>
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Want to <span>work together</span>?
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
