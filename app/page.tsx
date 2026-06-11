"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import { Code2, Layers, Mail, ArrowRight, Download } from "lucide-react";
import { useLocale } from "./lib/LocaleContext";
import { getT } from "./lib/translations";
import Image from "next/image";
import * as simpleIcons from "simple-icons";

const TICKER_ITEMS = [
  "Next.js",
  "TypeScript",
  "JavaScript",
  "React",
  "Python",
  "Tailwind",
  "Git",
  "REST API",
  "Laravel",
  "PHP",
  "Vue.js",
  "Bootstrap",
  "ASP.NET",
  "C#",
  "Java",
  "Kotlin",
  "Android",
  "Spring",
  "SQL",
  "Entity Framework",
  "MVC",
  "Unreal Engine",
  "HTML",
  "CSS",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "React",
  "Python",
  "Tailwind",
  "Git",
  "REST API",
  "Laravel",
  "PHP",
  "Vue.js",
  "Bootstrap",
  "ASP.NET",
  "C#",
  "Java",
  "Kotlin",
  "Android",
  "Spring",
  "SQL",
  "Entity Framework",
  "MVC",
  "Unreal Engine",
  "HTML",
  "CSS",
];
const GITHUB_USER = "BenoitTrem";
export default function Home() {
  const locale = useLocale();
  const t = getT(locale);
  const ROTATING_WORDS = t.rotatingWords;

  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(
        () => setDisplayed(target.slice(0, displayed.length + 1)),
        60,
      );
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.home}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        aria-labelledby="hero-heading"
        className={styles.hero}
      >
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{t.home.eyebrow}</p>
          <h1 id="hero-heading" className={styles.heroName}>
            {t.home.name}
          </h1>
          <div className={styles.typewriterRow} aria-live="polite">
            <span className={styles.typewriterText}>{displayed}</span>
            <span className={styles.typewriterCursor} aria-hidden="true">
              |
            </span>
          </div>
        </div>

        {/* ── Photo outside heroContent so it centers against full section width ── */}
        <div className={styles.heroPhoto}>
          <div className={styles.heroImgWrapper}>
            <Image
              src="/images/ProfilIconTest.jpg"
              alt="Your Name"
              fill
              className={styles.heroImg}
              priority
            />
          </div>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroSub}>{t.home.sub}</p>
          <div className={styles.ctaDiv}>
            <a href="/cv.pdf" download className={styles.ctaPrimary}>
              <Download size={15} /> Download CV
            </a>

            <div className={styles.divider_3} />
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              <svg viewBox="0 0 24 24">
                <path d={simpleIcons.siGithub.path} fill="currentColor" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Ticker */}
        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className={styles.tickerItem}>
                {item} <span className={styles.tickerDot}>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section aria-labelledby="explore-heading" className={styles.explore}>
        <div data-reveal className={styles.exploreHeader}>
          <h2 id="explore-heading" className={styles.sectionHeading}>
            {t.home.highlightsTitle}
          </h2>
          <div className={styles.divider_1} />
        </div>

        <div className={styles.cardDiv}>
          <Link
            href="/about"
            className={`${styles.splitCard} ${styles.splitCardAbout}`}
            data-reveal
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            <div className={styles.splitCardIcon}>
              <Layers size={22} strokeWidth={1.5} />
            </div>
            <div className={styles.splitCardBody}>
              <p className={styles.splitCardTag}>{t.home.aboutTag}</p>
              <h3 className={styles.splitCardTitle}>{t.home.aboutTitle}</h3>
              <p className={styles.splitCardDesc}>{t.home.aboutDesc}</p>
            </div>
            <span className={styles.splitCardArrow}>→</span>
          </Link>

          <Link
            href="/projects"
            className={`${styles.splitCard} ${styles.splitCardTech}`}
            data-reveal
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            <div className={styles.splitCardIcon}>
              <Code2 size={22} strokeWidth={1.5} />
            </div>
            <div className={styles.splitCardBody}>
              <p className={styles.splitCardTag}>{t.home.techTag}</p>
              <h3 className={styles.splitCardTitle}>{t.home.techTitle}</h3>
              <p className={styles.splitCardDesc}>{t.home.techDesc}</p>
            </div>
            <span className={styles.splitCardArrow}>→</span>
          </Link>

          <Link
            href="/contact"
            className={`${styles.splitCard} ${styles.splitCardContact}`}
            data-reveal
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <div className={styles.splitCardIcon}>
              <Mail size={22} strokeWidth={1.5} />
            </div>
            <div className={styles.splitCardBody}>
              <p className={styles.splitCardTag}>{t.home.contactTag}</p>
              <h3 className={styles.splitCardTitle}>{t.home.contactTitle}</h3>
              <p className={styles.splitCardDesc}>{t.home.contactDesc}</p>
            </div>
            <span className={styles.splitCardArrow}>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
