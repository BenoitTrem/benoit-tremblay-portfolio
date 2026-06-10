"use client";
import styles from "./projects.module.css";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";
import * as simpleIcons from "simple-icons";
import { SkillIcons } from "../about/page";

const BRAND_COLOR: Record<string, string> = {
  // Languages
  TypeScript: "#" + simpleIcons.siTypescript.hex,
  JavaScript: "#" + simpleIcons.siJavascript.hex,
  Python: "#" + simpleIcons.siPython.hex,
  Java: "#007396",
  Kotlin: "#" + simpleIcons.siKotlin.hex,
  "C#": "#239120",
  PHP: "#" + simpleIcons.siPhp.hex,
  HTML5: "#" + simpleIcons.siHtml5.hex,
  CSS3: "#" + simpleIcons.siCss.hex,
  // Frontend
  React: "#" + simpleIcons.siReact.hex,
  "Next.js": "#" + simpleIcons.siNextdotjs.hex,
  "Vue.js": "#" + simpleIcons.siVuedotjs.hex,
  JQuery: "#" + simpleIcons.siJquery.hex,
  "Tailwind CSS": "#" + simpleIcons.siTailwindcss.hex,
  Bootstrap: "#" + simpleIcons.siBootstrap.hex,
  Blade: "#" + simpleIcons.siLaravel.hex,
  ".NET / Razor": "#" + simpleIcons.siDotnet.hex,
  "Laravel / Blade": "#" + simpleIcons.siLaravel.hex,
  // Backend
  Laravel: "#" + simpleIcons.siLaravel.hex,
  Spring: "#" + simpleIcons.siSpring.hex,
  ".NET": "#" + simpleIcons.siDotnet.hex,
  "REST APIs": "#6366f1",
  // Mobile
  "React Native": "#" + simpleIcons.siReact.hex,
  Android: "#" + simpleIcons.siAndroid.hex,
  // Databases
  PostgreSQL: "#" + simpleIcons.siPostgresql.hex,
  MySQL: "#" + simpleIcons.siMysql.hex,
  SQLite: "#" + simpleIcons.siSqlite.hex,
  PhpMyAdmin: "#" + simpleIcons.siPhpmyadmin.hex,
  // Cloud
  AWS: "#FF9900",
  Azure: "#0078D4",
  Vercel: "#" + simpleIcons.siVercel.hex,
  Netlify: "#" + simpleIcons.siNetlify.hex,
  // Tools
  Git: "#" + simpleIcons.siGit.hex,
  GitHub: "#" + simpleIcons.siGithub.hex,
  GitLab: "#" + simpleIcons.siGitlab.hex,
  GitKraken: "#" + simpleIcons.siGitkraken.hex,
  // IDEs
  "VS Code": "#007ACC",
  "Visual Studio": "#5C2D91",
  "IntelliJ IDEA": "#" + simpleIcons.siIntellijidea.hex,
  PyCharm: "#" + simpleIcons.siPycharm.hex,
  PhpStorm: "#" + simpleIcons.siPhpstorm.hex,
  WebStorm: "#" + simpleIcons.siWebstorm.hex,
  "Android Studio": "#" + simpleIcons.siAndroidstudio.hex,
  Docker: "#" + simpleIcons.siDocker.hex,
  // Games
  Unity: "#" + simpleIcons.siUnity.hex,
  "Unreal Engine": "#" + simpleIcons.siUnrealengine.hex,
  Blender: "#" + simpleIcons.siBlender.hex,
};

function TechBadge({ name }: { name: string }) {
  const icon = SkillIcons[name as keyof typeof SkillIcons];
  return (
    <span className={styles.techBadge} title={name}>
      <span className={styles.techBadgeIcon}>{icon}</span>
      <span className={styles.techBadgeLabel}>{name}</span>
    </span>
  );
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github?: string;
  steam?: string;
  itchio?: string;
  live?: string;
  tag: string;
  download?: string;
}

const PROJECTS: Project[] = [
  {
    id: "Video Game",
    title: "The Last Wait",
    description:
      "A solo-developed psychological horror game with a deep, narrative-driven story. Built in Unreal Engine with immersive audio design.",
    image: undefined,
    tech: ["Unreal Engine", "Blender"],
    steam: "https://store.steampowered.com/app/4165280/The_Last_Wait/",
    itchio: "https://beanutts.itch.io/the-last-wait",
    tag: "Game",
  },
  {
    id: "Portfolio",
    title: "My Portfolio",
    description:
      "This portfolio — built with Next.js, TypeScript, and CSS Modules. Multi-language support via next-intl, dark and light mode.",
    image: undefined,
    tech: ["Next.js", "TypeScript", "CSS3", "Vercel", "VS Code"],
    github: "https://github.com/BenoitTrem/benoit-tremblay-portfolio.git",
    tag: "Web",
  },
  {
    id: "OlympicWave Project",
    title: "Olympic Wave",
    description: "",
    image: undefined,
    tech: ["React", "JavaScript", "CSS3", "Netlify", "VS Code"],
    github: "https://github.com/BenoitTrem/olympic-wave.git",
    live: "https://olympicwave.ca/",
    tag: "Web",
  },
  {
    id: "Lan Radar",
    title: "Lan Radar",
    description:
      "Local network scanner with ping monitor, speed test, and app browser — built with Electron.",
    image: undefined,
    tech: ["Electron", "Next.js", "JavaScript", "VS Code"],
    github: "https://github.com/BenoitTrem/lan-radar.git",
    tag: "Tool",
    download:
      "https://github.com/BenoitTrem/lan-radar/releases/download/V1.0.0/LAN.Radar.Setup.1.0.0.exe",
  },
  {
    id: "Residence Etudiante",
    title: "Student Residence",
    description: "",
    image: undefined,
    tech: [
      ".NET / Razor",
      "C#",
      "JavaScript",
      "CSS3",
      "Bootstrap",
      "MySQL",
      "Azure",
      "Visual Studio",
    ],
    github: "https://github.com/BenoitTrem/residence-etudiante.git",
    tag: "Full-Stack",
  },
  {
    id: "Lcu Dashboard",
    title: "LoL Client Dashboard",
    description:
      "A fan-made desktop app for interacting with the League of Legends client. Auto-accept, auto ban/pick, lobby management, and more.",
    image: undefined,
    tech: ["Electron", "Next.js", "TypeScript", "VS Code"],
    github: "https://github.com/BenoitTrem/lol-client-dashboard.git",
    tag: "Tool",
    download:
      "https://github.com/BenoitTrem/lol-client-dashboard/releases/download/V1.1.0/LoL.Dashboard.Setup.1.1.0.exe",
  },

  {
    id: "PHP Project",
    title: "Conference Manager",
    description: "",
    image: undefined,
    tech: [
      "Laravel / Blade",
      "PHP",
      "JavaScript",
      "Tailwind CSS",
      "SQLite",
      "PhpMyAdmin",
      "PhpStorm",
    ],
    github: "https://github.com/BenoitTrem/gestionnaire-ateliers.git",
    tag: "Full-Stack",
  },
  {
    id: "JSP Project",
    title: "File Managers",
    description: "",
    image: undefined,
    tech: ["Java", "Spring", "SQLite", "PostgreSQL", "AWS", "IntelliJ IDEA"],
    github: "https://github.com/BenoitTrem/gestionnaire-de-fichiers.git",
    tag: "Backend",
  },
  {
    id: "Client/Server Project",
    title: "Client/Server Task Manager",
    description: "",
    image: undefined,
    tech: ["Java", "IntelliJ IDEA"],
    github:
      "https://github.com/BenoitTrem/gestionnaire-taches-client-serveur.git",
    tag: "Systems",
  },
  {
    id: "Mobile app #1",
    title: "Team Manager For A Store",
    description: "",
    image: undefined,
    tech: ["Kotlin", "Android", "Android Studio"],
    github: "https://github.com/BenoitTrem/gestionnaire-equipes-magasin.git",
    tag: "Mobile",
  },
  {
    id: "Mobile app #2",
    title: "Reminders Planner",
    description: "",
    image: undefined,
    tech: ["React Native", "TypeScript", "VS Code"],
    github: "https://github.com/BenoitTrem/planificateur-rappels-mobile.git",
    tag: "Mobile",
  },
  {
    id: "PHP Game",
    title: "Magician Adventure (Browser)",
    description: "",
    image: undefined,
    tech: ["PHP", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/BenoitTrem/aventure-du-mage.git",
    tag: "Game",
  },
  {
    id: "C# Game",
    title: "Magician Adventure (Console)",
    description: "",
    image: undefined,
    tech: ["C#", ".NET", "Visual Studio"],
    github: "https://github.com/BenoitTrem/aventure-du-magicien-console.git",
    tag: "Game",
    download:
      "https://github.com/BenoitTrem/aventure-du-magicien-console/releases/download/V.1.0.0/AventureDuMagicien.exe",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      {/* Image / placeholder */}
      <div className={styles.cardImage}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={styles.cardImg}
          />
        ) : (
          <div className={styles.cardImgPlaceholder}>
            <span className={styles.cardImgLabel}>Preview coming soon</span>
          </div>
        )}
        {/* Tag pill */}
        <span className={styles.cardTag}>{project.tag}</span>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{project.title}</h2>
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Tech badges */}
        <div className={styles.cardTech}>
          {project.tech.map((name) => (
            <TechBadge key={name} name={name} />
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className={styles.cardFooter}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d={simpleIcons.siGithub.path} />
            </svg>
            GitHub
          </a>
        )}
        {project.steam && (
          <a
            href={project.steam}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d={simpleIcons.siSteam.path} />
            </svg>
            Steam
          </a>
        )}
        {project.itchio && (
          <a
            href={project.itchio}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d={simpleIcons.siItchdotio.path} />
            </svg>
            itch.io
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cardLink} ${styles.cardLinkPrimary}`}
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
        {project.download && (
          <a
            href={project.download}
            download
            className={`${styles.cardLink} ${styles.cardLinkPrimary}`}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z" />
            </svg>
            Download
          </a>
        )}
      </div>

      {/* Hover arrow overlay */}
      <div className={styles.cardHoverArrow} aria-hidden>
        <ArrowRight size={18} />
      </div>
    </article>
  );
}

const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const filtered =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeTag);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            A selection of things I&apos;ve built — full-stack apps, games,
            website, and experiments.
          </p>
        </section>

        {/* ── Filter ── */}
        <div className={styles.filters}>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
