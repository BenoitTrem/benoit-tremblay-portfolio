"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import {
  Smartphone,
  Contact,
  FolderClosed,
  Send,
  ArrowRight,
  Download,
  Monitor,
  Gamepad2,
  Globe,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
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

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  PHP: "#4F5D95",
  Kotlin: "#A97BFF",
  Java: "#b07219",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
};

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

function timeAgo(
  dateStr: string,
  labels: { justNow: string; m: string; h: string; d: string; mo: string },
): string {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 60) return labels.justNow;
  if (s < 3600) return `${Math.floor(s / 60)}${labels.m}`;
  if (s < 86400) return `${Math.floor(s / 3600)}${labels.h}`;
  if (s < 2592000) return `${Math.floor(s / 86400)}${labels.d}`;
  return `${Math.floor(s / 2592000)}${labels.mo}`;
}
type Service = {
  id: string;
  icon: React.ReactNode;
  color: string;
  stack: string;
  detail: string;
};
function Terminal({
  services,
  terminal,
}: {
  services: Service[];
  terminal: {
    scanning: string;
    loaded: string;
    expand: string;
    phrase: string;
  };
}) {
  const [step, setStep] = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && step === 0) setStep(1);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [step]);

  useEffect(() => {
    if (step === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    services.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(2 + i), 400 + i * 180));
    });
    timers.push(
      setTimeout(() => setStep(10), 400 + services.length * 180 + 300),
    );
    return () => timers.forEach(clearTimeout);
  }, [step === 1]);

  useEffect(() => {
    if (step < 10) return;
    setTyped("");
    const phrase = terminal.phrase;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(phrase.slice(0, i));
      if (i >= phrase.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, [step, terminal.phrase]);

  return (
    <div ref={ref} className={styles.termBox}>
      <div className={styles.termTopbar}>
        <span className={`${styles.termDot} ${styles.termDotR}`} />
        <span className={`${styles.termDot} ${styles.termDotY}`} />
        <span className={`${styles.termDot} ${styles.termDotG}`} />
        <span className={styles.termTitle}>ben@dev:~/portfolio</span>
      </div>

      <div className={styles.termBody}>
        {step >= 1 && (
          <div className={styles.termLine}>
            <ChevronRight
              size={14}
              className={styles.termPrompt}
              style={{ flexShrink: 0, marginTop: 5 }}
            />
            <span className={styles.termCmd}>ls -la ./services</span>
          </div>
        )}
        {step >= 1 && (
          <div className={styles.termLine}>
            <span className={styles.termComment}>{terminal.scanning}</span>
          </div>
        )}

        {services.map(
          (svc, i) =>
            step >= 2 + i && (
              <div
                key={svc.id}
                className={`${styles.termService} ${activeIdx === i ? styles.termServiceActive : ""}`}
                style={{ "--svc-color": svc.color } as React.CSSProperties}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                <span
                  className={styles.termSvcIcon}
                  style={{ color: svc.color }}
                >
                  {svc.icon}
                </span>
                <span className={styles.termSvcName}>{svc.id}</span>
                <span className={styles.termSvcStack}>{svc.stack}</span>
                <span
                  className={`${styles.termSvcDetail} ${activeIdx === i ? styles.termSvcDetailActive : ""}`}
                >
                  {svc.detail}
                </span>
              </div>
            ),
        )}

        {step >= 10 && (
          <>
            <div className={styles.termLine}>
              <CheckCircle2
                size={14}
                color="#639922"
                style={{ flexShrink: 0, marginTop: 5 }}
              />
              <span className={styles.termOk}>{terminal.loaded}</span>
              <span className={styles.termComment}>
                &nbsp;{terminal.expand}
              </span>
            </div>
            <div className={styles.termLine2}>
              <ChevronRight
                size={14}
                className={styles.termPrompt}
                style={{ flexShrink: 0, marginTop: 5 }}
              />
              <span className={styles.termCmd}>{typed}</span>
              <span className={styles.termCursor} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const GITHUB_USER = "BenoitTrem";

export default function Home() {
  const locale = useLocale();
  const t = getT(locale);
  const ROTATING_WORDS = t.rotatingWords;

  const SERVICES = [
    {
      id: t.services.items.web_apps.id,
      icon: <Globe size={14} />,
      color: "#3178c6",
      stack: t.services.items.web_apps.stack,
      detail: t.services.items.web_apps.detail,
    },
    {
      id: t.services.items.desktop_apps.id,
      icon: <Monitor size={14} />,
      color: "#7F77DD",
      stack: t.services.items.desktop_apps.stack,
      detail: t.services.items.desktop_apps.detail,
    },
    {
      id: t.services.items.apis.id,
      icon: <Smartphone size={14} />,
      color: "#1D9E75",
      stack: t.services.items.apis.stack,
      detail: t.services.items.apis.detail,
    },
    {
      id: t.services.items.game_dev.id,
      icon: <Gamepad2 size={14} />,
      color: "#D85A30",
      stack: t.services.items.game_dev.stack,
      detail: t.services.items.game_dev.detail,
    },
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
    )
      .then((r) => r.json())
      .then((data: Repo[]) => {
        setRepos(data.filter((r) => !r.fork).slice(0, 3));
      })
      .catch(() => {});
  }, []);

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
        <div className={styles.heroRow}>
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
            <p className={styles.heroSub}>{t.home.sub}</p>
            <div className={styles.ctaWrapper}>
              <div className={styles.ctaDiv}>
                <a href="/cv.pdf" download className={styles.ctaPrimary}>
                  <Download size={15} /> {t.home.download}
                </a>
                <div className={styles.divider_3} />
                <a href="/contact" className={styles.ctaPrimary}>
                  {t.home.ctaContact} <ArrowRight size={15} />
                </a>
              </div>
              <div className={styles.ctaSocials}>
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaGhost}
                >
                  <svg viewBox="0 0 24 24" width={22} height={22}>
                    <path d={simpleIcons.siGithub.path} fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/benoit-tremblay-635117417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaGhost}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={22}
                    height={22}
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.heroPhoto}>
            <div className={styles.heroImgWrapper}>
              <Image
                src="/images/ProfilIconTest.jpg"
                alt="Your Name"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className={styles.heroImg}
                priority
              />
            </div>
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

      {/* ── What I Build ── */}
      <section aria-labelledby="services-heading" className={styles.services}>
        <div data-reveal className={styles.servicesHeader}>
          <h2 id="services-heading" className={styles.sectionHeading}>
            {t.services.heading}
          </h2>
          <div className={styles.divider_1} />
        </div>

        <Terminal services={SERVICES} terminal={t.services.terminal} />
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
              <Contact size={22} strokeWidth={1.5} />
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
              <FolderClosed size={22} strokeWidth={1.5} />
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
              <Send size={22} strokeWidth={1.5} />
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

      {/* ── Recently Pushed ── */}
      <section aria-labelledby="github-heading" className={styles.github}>
        <div data-reveal className={styles.githubHeader}>
          <h2 id="github-heading" className={styles.sectionHeading}>
            {t.github.heading}
          </h2>
          <div className={styles.divider_1} />
          <span className={styles.githubLive}>
            <span className={styles.githubPulse} aria-hidden="true" />
            {t.github.live}
          </span>
        </div>

        <div data-reveal className={styles.repoTable}>
          {repos.length === 0
            ? [0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.repoSkeletonRow}>
                  <div className={`${styles.skEl} ${styles.skNum}`} />
                  <div className={styles.skMain}>
                    <div className={`${styles.skEl} ${styles.skTitle}`} />
                    <div className={`${styles.skEl} ${styles.skDesc}`} />
                  </div>
                  <div className={`${styles.skEl} ${styles.skMeta}`} />
                </div>
              ))
            : repos.map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoRow}
                >
                  <span className={styles.repoNum}>0{i + 1}</span>
                  <div className={styles.repoBody}>
                    <span className={styles.repoName}>{repo.name}</span>
                    <span className={styles.repoDesc}>
                      {repo.description || "No description"}
                    </span>
                  </div>
                  <div className={styles.repoRight}>
                    {repo.language && (
                      <span className={styles.repoLang}>
                        <span
                          className={styles.langDot}
                          style={{
                            background:
                              LANG_COLORS[repo.language] ?? "var(--text-muted)",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className={styles.repoUpdated}>
                      {timeAgo(repo.pushed_at, t.github.timeAgo)}
                    </span>
                  </div>
                  <span className={styles.repoArrow}>→</span>
                </a>
              ))}
        </div>

        <div data-reveal className={styles.githubFooter}>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <svg viewBox="0 0 24 24" width={16} height={16}>
              <path d={simpleIcons.siGithub.path} fill="currentColor" />
            </svg>
            {t.github.viewAll} <ArrowRight size={13} />
          </a>
        </div>
      </section>
    </main>
  );
}
