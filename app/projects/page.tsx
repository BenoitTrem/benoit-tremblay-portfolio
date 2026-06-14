"use client";
import styles from "./projects.module.css";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  "QT Designer": "#" + simpleIcons.siQt.hex,
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
  images?: string[];
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
    id: "The Last Wait",
    title: "The Last Wait",
    description:
      "A solo-developed psychological horror game with a deep, narrative-driven story. Built in Unreal Engine with immersive audio design.",
    images: [
      "/images/TheLastWait/the-last-wait-spash-screen.png",
      "/images/TheLastWait/the-last-wait-gameplay.png",
      "/images/TheLastWait/the-last-wait-gameplay-security-office.png",
      "/images/TheLastWait/the-last-wait-gameplay-tv-open.png",
      "/images/TheLastWait/the-last-wait-gameplay-in-water.png",
      "/images/TheLastWait/the-last-wait-gameplay-jumpscare.png",
      "/images/TheLastWait/the-last-wait-gameplay-outside.png",
    ],
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
    images: [
      "/images/TheLastWait/TheLastWait_1.png",
      "/images/TheLastWait/Screenshot (123).png",
    ],
    tech: ["Next.js", "TypeScript", "CSS3", "Vercel", "VS Code"],
    github: "https://github.com/BenoitTrem/benoit-tremblay-portfolio.git",
    tag: "Web",
  },
  {
    id: "OlympicWave Site",
    title: "Olympic Wave",
    description: "",
    images: [
      "/images/OlympicWave/olympic-wave-home-screen.png",
      "/images/OlympicWave/olympic-wave-services-page.png",
    ],
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
    images: [
      "/images/LanRadar/lan-radar-splash-screen.png",
      "/images/LanRadar/lan-radar-speed-test.png",
      "/images/LanRadar/lan-radar-ping.png",
      "/images/LanRadar/lan-radar-about.png",
    ],
    tech: ["Electron", "Next.js", "JavaScript", "VS Code"],
    github: "https://github.com/BenoitTrem/lan-radar.git",
    tag: "Software",
    download:
      "https://github.com/BenoitTrem/lan-radar/releases/download/V1.0.0/LAN.Radar.Setup.1.0.0.exe",
  },
  {
    id: "Student Residence",
    title: "Student Residence",
    description: "",
    images: [
      "/images/StudentResidence/student-residence-home-page.png",
      "/images/StudentResidence/student-residence-connexion-page.png",
      "/images/StudentResidence/student-residence-residence-page.png",
      "/images/StudentResidence/student-residence-details.png",
      "/images/StudentResidence/student-residence-add-unite.png",
      "/images/StudentResidence/student-residence-account-page.png",
    ],
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
    images: [
      "/images/LolClient/lol-client-home-page.png",
      "/images/LolClient/lol-client-guide.png",
    ],
    tech: ["Electron", "Next.js", "TypeScript", "VS Code"],
    github: "https://github.com/BenoitTrem/lol-client-dashboard.git",
    tag: "Software",
    download:
      "https://github.com/BenoitTrem/lol-client-dashboard/releases/download/V1.1.0/LoL.Dashboard.Setup.1.1.0.exe",
  },

  {
    id: "PHP Project",
    title: "Conference Manager",
    description: "",
    images: [
      "/images/ConferenceManager/conference-manager-home-page.png",
      "/images/ConferenceManager/conference-manager-home-page-connected.png",
      "/images/ConferenceManager/conference-manager-calendar.png",
      "/images/ConferenceManager/conference-manager-locals.png",
      "/images/ConferenceManager/conference-manager-connexion-page.png",
      "/images/ConferenceManager/conference-manager-local-modif.png",
    ],
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
    images: [
      "/images/FileManager/file-manager-shared-file.png",
      "/images/FileManager/file-manager-connexion.png",
      "/images/FileManager/file-manager.png",
      "/images/FileManager/file-manager-account.png",
      "/images/FileManager/file-manager-file-comments.png",
      "/images/FileManager/file-manager-users-page.png",
    ],
    tech: ["Java", "Spring", "SQLite", "PostgreSQL", "AWS", "IntelliJ IDEA"],
    github: "https://github.com/BenoitTrem/gestionnaire-de-fichiers.git",
    tag: "Full-Stack",
  },
  {
    id: "Client/Server Project",
    title: "Client/Server Task Manager",
    description: "",
    images: [
      "/images/ClientServerTaskManager/client-vue.png",
      "/images/ClientServerTaskManager/server-vue.png",
    ],
    tech: ["Java", "IntelliJ IDEA"],
    github:
      "https://github.com/BenoitTrem/gestionnaire-taches-client-serveur.git",
    tag: "Systems",
  },
  {
    id: "Mobile app #1",
    title: "Team Manager For A Store",
    description: "",
    images: [
      "/images/TeamManagerStore/team-manager-home-page.png",
      "/images/TeamManagerStore/team-manager-employe-edit.png",
      "/images/TeamManagerStore/team-manager-department-page.png",
      "/images/TeamManagerStore/team-manager-department-employe.png",
    ],
    tech: ["Kotlin", "Android", "Android Studio"],
    github: "https://github.com/BenoitTrem/gestionnaire-equipes-magasin.git",
    tag: "Mobile",
  },
  {
    id: "Mobile app #2",
    title: "Reminders Planner",
    description: "",
    images: [
      "/images/RemindersPlanner/reminder-planner-reminders-list.png",
      "/images/RemindersPlanner/reminder-planner-create-reminder-page.png",
      "/images/RemindersPlanner/reminder-planner-notif.png",
      "/images/RemindersPlanner/reminder-planner-edit-page.png",
    ],
    tech: ["React Native", "TypeScript", "VS Code"],
    github: "https://github.com/BenoitTrem/planificateur-rappels-mobile.git",
    tag: "Mobile",
  },
  {
    id: "PHP Game",
    title: "Magician Adventure (Browser)",
    description: "",
    images: [
      "/images/MagicianAdventureBrowser/magician-adventure-home-page.png",
      "/images/MagicianAdventureBrowser/magician-adventure-game-page.png",
    ],
    tech: ["PHP", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/BenoitTrem/aventure-du-mage.git",
    tag: "Game",
  },
  {
    id: "C# Game",
    title: "Magician Adventure (Console)",
    description: "",
    images: [
      "/images/MagicianAdventureConsole/magician-adventure-menu.png",
      "/images/MagicianAdventureConsole/magician-adventure-battle.png",
      "/images/MagicianAdventureConsole/magician-adventure-game-over.png",
    ],
    tech: ["C#", ".NET", "Visual Studio"],
    github: "https://github.com/BenoitTrem/aventure-du-magicien-console.git",
    tag: "Game",
    download:
      "https://github.com/BenoitTrem/aventure-du-magicien-console/releases/download/V.1.0.0/AventureDuMagicien.exe",
  },
  {
    id: "Vehicule Location",
    title: "Vehicule Location",
    description: "",
    images: [
      "/images/VehiculeLocation/vehicule-location-client.png",
      "/images/VehiculeLocation/vehicule-location-employe.png",
    ],
    tech: ["C#", "QT Designer", "Visual Studio"],
    github: "https://github.com/BenoitTrem/location-de-vehicule.git",
    tag: "Software",
    download:
      "https://github.com/BenoitTrem/aventure-du-magicien-console/releases/download/V.1.0.0/AventureDuMagicien.exe",
  },
];

function Carousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.carousel}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`${styles.carouselImg} ${i === current ? styles.carouselImgActive : ""}`}
        />
      ))}
      {images.length > 1 && (
        <div className={styles.carouselDots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.carouselDot} ${i === current ? styles.carouselDotActive : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrent(i);
              }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      {/* Image / placeholder */}
      <div className={styles.cardImage}>
        {project.images && project.images.length > 0 ? (
          <Carousel images={project.images} />
        ) : (
          <div className={styles.cardImgPlaceholder}>
            <span className={styles.cardImgLabel}>Preview coming soon</span>
          </div>
        )}
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
