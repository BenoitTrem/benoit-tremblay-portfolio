"use client";
import styles from "./about.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";
import * as simpleIcons from "simple-icons";
import { siReact } from "simple-icons";

/* ─── Inline SVG icons per skill ────────────────────────── */
export const SkillIcons = {
  // ── Languages ──
  TypeScript: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siTypescript.path} fill="currentColor" />
    </svg>
  ),

  JavaScript: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siJavascript.path} fill="currentColor" />
    </svg>
  ),

  Python: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPython.path} fill="currentColor" />
    </svg>
  ),

  Java: (
    <svg viewBox="0 0 24 24">
      {/* flame */}
      <path
        fill="currentColor"
        d="M12 2c2 2.2-1.5 3.2-1.5 5.2S14 9.5 12 12C10 9.6 7.5 8.8 9 6.2 10.2 4 13 4 12 2z"
      />

      {/* top cup ring */}
      <path
        fill="currentColor"
        d="M5 11c2.5 1.5 11.5 1.5 14 0-1 2-13 2-14 0z"
      />

      {/* middle rings */}
      <path fill="currentColor" d="M4 14c3 2 13 2 16 0-1 2.5-15 2.5-16 0z" />

      <path
        fill="currentColor"
        d="M5 17c2.5 1.5 11.5 1.5 14 0-1 2-13 2-14 0z"
      />

      {/* bottom base */}
      <path fill="currentColor" d="M6 19c2 1 10 1 12 0-1.5 2-10.5 2-12 0z" />
    </svg>
  ),
  Kotlin: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siKotlin.path} fill="currentColor" />
    </svg>
  ),
  "C#": (
    <svg viewBox="0 0 256 256" fill="currentColor">
      {/* hex background */}
      <path
        d="M128 0l111 64v128l-111 64L17 192V64L128 0z"
        fill="currentColor"
      />

      {/* inner shading split (like official logo) */}
      <path d="M128 0l111 64v128L128 256V0z" fill="currentColor" />

      {/* C */}
      <path
        d="M150 88c-10-10-23-16-38-16-31 0-56 25-56 56s25 56 56 56c15 0 28-6 38-16l-18-14c-6 6-13 9-22 9-20 0-36-16-36-36s16-36 36-36c9 0 16 3 22 9l18-12z"
        fill="var(--csharp-c)"
      />

      {/* # */}
      <path
        d="M168 102h10l3-14h10l-3 14h10v10h-12l-2 10h12v10h-14l-3 14h-10l3-14h-10l-3 14h-10l3-14h-10v-10h12l2-10h-12v-10h14l3-14h10l-3 14zm0 20h10l2-10h-10l-2 10z"
        fill="var(--csharp-hash)"
      />
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPhp.path} fill="currentColor" />
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siHtml5.path} fill="currentColor" />
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siCss.path} fill="currentColor" />
    </svg>
  ),
  // ── Frontend ──
  React: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siReact.path} fill="currentColor" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" className="text-gray-900 dark:text-white">
      <path d={simpleIcons.siNextdotjs.path} fill="currentColor" />
    </svg>
  ),
  "Vue.js": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siVuedotjs.path} fill="currentColor" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" className={styles.skillSvg}>
      <path d={simpleIcons.siTailwindcss.path} fill="currentColor" />
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siBootstrap.path} fill="currentColor" />
    </svg>
  ),
  Blade: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.111 0L12.555 10.555 2 0H0v.948L11.027 11.97 0 23v.948h2L12.555 13.39 23.109 23.95H25V23l-11.027-11.03L25 .948V0z" />
    </svg>
  ),
  // ── Backend ──
  Laravel: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siLaravel.path} fill="currentColor" />
    </svg>
  ),
  Spring: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siSpring.path} fill="currentColor" />
    </svg>
  ),
  ".NET": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siDotnet.path} fill="currentColor" />
    </svg>
  ),
  "React Native": (
    <svg viewBox="0 0 24 24">
      <path d={siReact.path} fill="currentColor" />
    </svg>
  ),
  Android: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siAndroid.path} fill="currentColor" />
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 9l3 3-3 3M13 15h3" />
    </svg>
  ),
  // ── DB & Cloud ──
  MySQL: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siMysql.path} fill="currentColor" />
    </svg>
  ),
  SQLite: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siSqlite.path} fill="currentColor" />
    </svg>
  ),
  PhpMyAdmin: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPhpmyadmin.path} fill="currentColor" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.127a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.184-1.014-.454-1.277-.808a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.51.088.15.04.295.08.43.127.136.048.24.096.317.144a.653.653 0 0 1 .224.183.39.39 0 0 1 .064.224v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.224-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
    </svg>
  ),
  Azure: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 22h3.8l2-5.2h4.5L18.5 22H22L15.2 2H9.8L3 22h3zm5.8-8.2L14 7.8l2.2 6z" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siVercel.path} fill="currentColor" />
    </svg>
  ),
  Netlify: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siNetlify.path} fill="currentColor" />
    </svg>
  ),
  // ── Tools & DevOps ──
  Git: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGit.path} fill="currentColor" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGithub.path} fill="currentColor" />
    </svg>
  ),
  GitLab: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGitlab.path} fill="currentColor" />
    </svg>
  ),
  GitKraken: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGitkraken.path} fill="currentColor" />
    </svg>
  ),
  VMware: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siVmware.path} fill="currentColor" />
    </svg>
  ),
  "Raspberry Pi": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C9.366.02 7.093 1.67 7.093 1.67s-.43-.127-.97-.127c-.44 0-.79.098-1.01.189-.23-.23-.56-.42-.94-.42-.52 0-.87.315-.87.315s.09.44.45.758c-.2.3-.3.65-.3.975 0 .09.01.18.02.27-.37.55-.52 1.16-.42 1.77l.05.2c-.22.22-.35.51-.35.83 0 .17.04.34.1.48-.37.81-.1 1.79.74 2.27.69 1.68 2.2 2.81 2.2 2.81s-.53.67-.53 1.42c0 .32.07.64.25.93C5.02 16.33 3.9 18.72 3.9 19.5c0 2.25 2.3 3.56 5.51 3.87-.24-.49-.38-1.05-.38-1.64 0-1.09.46-2.07 1.21-2.78.21.07.43.11.66.11.23 0 .45-.04.66-.11.75.71 1.21 1.69 1.21 2.78 0 .59-.14 1.15-.38 1.64 3.21-.31 5.51-1.62 5.51-3.87 0-.78-1.12-3.17-1.62-5.09.18-.29.25-.61.25-.93 0-.75-.53-1.42-.53-1.42s1.51-1.13 2.2-2.81c.84-.48 1.11-1.46.74-2.27.06-.14.1-.31.1-.48 0-.32-.13-.61-.35-.83l.05-.2c.1-.61-.05-1.22-.42-1.77.01-.09.02-.18.02-.27 0-.325-.1-.675-.3-.975.36-.318.45-.758.45-.758s-.35-.315-.87-.315c-.38 0-.71.19-.94.42-.22-.091-.57-.189-1.01-.189-.54 0-.97.127-.97.127S14.668.02 12.017 0z" />
    </svg>
  ),
  // ── IDEs ──
  "VS Code": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.948V4.053a1.5 1.5 0 0 0-.85-1.466zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  ),
  "Visual Studio": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.583.063L9.945 6.875 4.196 2.142.21 3.988.014 18.63l4.182 1.846 5.75-4.734 7.637 6.813L24 20.168V2.475zm-1.074 14.99l-5.9-4.52 5.9-4.52v9.04zM1.324 17.284V5.364l3.474 5.96z" />
    </svg>
  ),
  "IntelliJ IDEA": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siIntellijidea.path} fill="currentColor" />
    </svg>
  ),
  PyCharm: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPycharm.path} fill="currentColor" />
    </svg>
  ),
  PhpStorm: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPhpstorm.path} fill="currentColor" />
    </svg>
  ),
  WebStorm: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siWebstorm.path} fill="currentColor" />
    </svg>
  ),
  "Android Studio": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siAndroidstudio.path} fill="currentColor" />
    </svg>
  ),
  // ── Games & 3D ──
  Unity: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siUnity.path} fill="currentColor" />
    </svg>
  ),
  "Unreal Engine": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siUnrealengine.path} fill="currentColor" />
    </svg>
  ),
  Blender: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siBlender.path} fill="currentColor" />
    </svg>
  ),
};

/* ─── Skill categories ───────────────────────────────────── */
export const skillCategories = [
  {
    label: "Languages",
    colorVar: "--cat-language",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "Kotlin" },
      { name: "C#" },
      { name: "PHP" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    label: "Frontend",
    colorVar: "--cat-frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
    ],
  },
  {
    label: "Backend & APIs",
    colorVar: "--cat-backend",
    skills: [
      { name: "Laravel" },
      { name: "Spring" },
      { name: ".NET" },
      { name: "REST APIs" },
    ],
  },
  {
    label: "Mobile Development",
    colorVar: "--cat-mobile",
    skills: [{ name: "React Native" }, { name: "Android" }],
  },
  {
    label: "Databases",
    colorVar: "--cat-db",
    skills: [{ name: "MySQL" }, { name: "SQLite" }, { name: "PhpMyAdmin" }],
  },
  {
    label: "Cloud & Deployment",
    colorVar: "--cat-cloud",
    skills: [
      { name: "AWS" },
      { name: "Azure" },
      { name: "Vercel" },
      { name: "Netlify" },
    ],
  },
  {
    label: "Versioning & Collaboration",
    colorVar: "--cat-tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab" },
      { name: "GitKraken" },
    ],
  },
  {
    label: "IDEs & Editors",
    colorVar: "--cat-ides",
    skills: [
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "IntelliJ IDEA" },
      { name: "PyCharm" },
      { name: "PhpStorm" },
      { name: "WebStorm" },
      { name: "Android Studio" },
    ],
  },
  {
    label: "Game Development",
    colorVar: "--cat-games",
    skills: [{ name: "Unity" }, { name: "Unreal Engine" }, { name: "Blender" }],
  },
  /** 
  {
    label: "Systems & Hardware",
    colorVar: "--cat-systems",
    skills: [{ name: "VMware" }, { name: "Raspberry Pi" }],
  },
  */
];

/* ─── GitHub username ────────────────────────────────────── */
const GITHUB_USER = "BenoitTrem";

/* ─── Types ──────────────────────────────────────────────── */
type StatKey = "projectsBuilt" | "repos" | "topLang";

/* ─── Component ──────────────────────────────────────────── */
export default function About() {
  const locale = useLocale();
  const t = getT(locale);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const [activeStat, setActiveStat] = useState<StatKey | null>(null);
  const [visibleStat, setVisibleStat] = useState<StatKey | null>(null);
  const [switching, setSwitching] = useState(false);

  const [githubStats, setGithubStats] = useState<{
    repos: number;
    topLang: string;
    topLangs: { name: string; count: number }[];
  } | null>(null);

  /* ─── GitHub fetch ───────────────────────────────────────── */
  useEffect(() => {
    async function fetchGitHub() {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${GITHUB_USER}`,
        );
        const user = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
        );
        const repos = await reposRes.json();

        const langCount: Record<string, number> = {};
        for (const repo of repos) {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        }

        const sortedLangs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));

        const topLang = sortedLangs[0]?.name ?? "N/A";

        setGithubStats({
          repos: user.public_repos,
          topLang,
          topLangs: sortedLangs,
        });
      } catch (err) {
        console.error("GitHub fetch failed", err);
      }
    }
    fetchGitHub();
  }, []);

  /* ─── Stats config ───────────────────────────────────────── */
  const stats: { key: StatKey; number: string; label: string }[] = [
    {
      key: "projectsBuilt",
      number: "12",
      label: t.about.stats.projectsBuilt,
    },
    {
      key: "repos",
      number: githubStats ? `${githubStats.repos}` : "—",
      label: "Public Repos",
    },
    {
      key: "topLang",
      number: githubStats ? githubStats.topLang : "—",
      label: "Top Language",
    },
  ];

  /* ─── Stat panel content ─────────────────────────────────── */
  const statPanelContent: Record<
    StatKey,
    { title: string; body: React.ReactNode }
  > = {
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
    repos: {
      title: "Projects & Repositories",
      body: (
        <>
          <p className={styles.statPanelText}>
            {githubStats?.repos} public repositories on GitHub — ranging from
            full-stack web apps to algorithms and personal experiments. Each one
            is a snapshot of something I was learning or building at the time.
          </p>
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.statPanelLink}
          >
            Browse repos <ArrowRight size={13} />
          </a>
        </>
      ),
    },
    topLang: {
      title: "Top Languages",
      body: (
        <>
          <p className={styles.statPanelText}>
            Languages I use most across my public repositories.
          </p>
          <div className={styles.statPanelLangRow}>
            {githubStats?.topLangs?.map((lang, i) => (
              <div key={lang.name} className={styles.statPanelLangItem}>
                <span className={styles.statPanelLangRank}>#{i + 1}</span>
                <span className={styles.statPanelLangName}>{lang.name}</span>
              </div>
            ))}
          </div>
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

  /* ─── Stat click handler ─────────────────────────────────── */
  const handleStatClick = useCallback(
    (key: StatKey) => {
      if (activeStat === key) {
        setVisibleStat(null);
        setSwitching(false);
        setTimeout(() => setActiveStat(null), 650);
        return;
      }
      if (activeStat === null) {
        setActiveStat(key);
        setVisibleStat(key);
        setSwitching(false);
      } else {
        setSwitching(true);
        setTimeout(() => {
          setActiveStat(key);
          setVisibleStat(key);
          setSwitching(false);
        }, 180);
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
          <div className={styles.heroText}>
            <h1 className={styles.eyebrow}>About me</h1>
          </div>
        </section>

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
          <div className={styles.bioImageCard}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageLabel}>Photo coming soon</span>
            </div>
          </div>
        </div>

        {/* ── Stats + inline panel ── */}
        <div className={styles.statsWrapper}>
          <div className={`${styles.stats} ${isOpen ? styles.statsOpen : ""}`}>
            {stats.map((s) => (
              <div
                key={s.key}
                className={`${styles.stat} ${activeStat === s.key ? styles.statActive : ""}`}
                onClick={() => handleStatClick(s.key)}
                aria-expanded={activeStat === s.key}
              >
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

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

        {/* ── Skills ── */}
        <section className={styles.skillsSection}>
          <div className={styles.skillsHeader}>
            <div className={styles.skillsTitleRow}>
              <p className={styles.sectionHeading}>Technical skills</p>
              <div className={styles.skillsLine} />
            </div>
            <p className={styles.skillsLegend}>
              Technologies, frameworks and tools I&apos;ve learned, worked with
              and use in projects.
            </p>
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

                <div className={styles.skillChipsGrid}>
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={styles.skillChip}
                      style={
                        {
                          "--bar-color": `var(${cat.colorVar})`,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        className={styles.skillBarIcon}
                        style={
                          {
                            "--bar-color": `var(${cat.colorVar})`,
                          } as React.CSSProperties
                        }
                      >
                        {SkillIcons[skill.name as keyof typeof SkillIcons]}
                      </span>
                      <span className={styles.skillBarName}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>Want to work together?</p>
          <Link href="/contact" className={styles.ctaButton}>
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
