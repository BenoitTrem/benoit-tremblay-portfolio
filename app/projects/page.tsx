"use client";
import styles from "./projects.module.css";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "../lib/LocaleContext";
import { getT, Translations } from "../lib/translations";
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
  "Vite.js": "#" + simpleIcons.siVite.hex,
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
  tKey: string;
  images?: string[];
  imageFit?: "cover" | "contain";
  imageScale?: number;
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
    id: "Student Residence",
    tKey: "studentResidence",
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
    id: "PHP Project",
    tKey: "conferenceManager",
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
      "Vite.js",
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
    tKey: "fileManagers",
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
    id: "Portfolio",
    tKey: "portfolio",
    images: ["/images/OlympicWave/olympic-wave-home-screen.png"],
    tech: ["Next.js", "TypeScript", "CSS3", "Vercel", "VS Code"],
    github: "https://github.com/BenoitTrem/benoit-tremblay-portfolio.git",
    tag: "Web",
  },
  {
    id: "OlympicWave Site",
    tKey: "olympicWave",
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
    tKey: "lanRadar",
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
    id: "Lcu Dashboard",
    tKey: "lolDashboard",
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
    id: "The Last Wait",
    tKey: "theLastWait",
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
    id: "PHP Game",
    tKey: "magicianBrowser",
    images: [
      "/images/MagicianAdventureBrowser/magician-adventure-home-page.png",
      "/images/MagicianAdventureBrowser/magician-adventure-game-page.png",
    ],
    tech: ["PHP", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/BenoitTrem/aventure-du-mage.git",
    tag: "Game",
  },
  {
    id: "Mobile app #1",
    tKey: "teamManager",
    imageFit: "contain",
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
    tKey: "remindersPlanner",
    imageFit: "contain",
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
    id: "Client/Server Project",
    tKey: "taskManager",
    imageFit: "contain",
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
    id: "C# Game",
    tKey: "magicianConsole",
    imageFit: "contain",
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
    tKey: "vehiculeLocation",
    images: [
      "/images/VehiculeLocation/vehicule-location-client.png",
      "/images/VehiculeLocation/vehicule-location-employe.png",
    ],
    tech: ["C#", "QT Designer", "Visual Studio"],
    github: "https://github.com/BenoitTrem/location-de-vehicule.git",
    tag: "Software",
  },
];

function isDesktop() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1024;
}

function Modal({
  images,
  startIndex,
  imageFit = "cover",
  imageScale = 1,
  onClose,
}: {
  images: string[];
  startIndex: number;
  imageFit?: "cover" | "contain";
  imageScale?: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((i) => (i - 1 + images.length) % images.length);
    };

    const handleResize = () => {
      if (window.innerWidth < 1024) onClose();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <X size={22} />
        </button>

        <div className={styles.modalImgWrapper}>
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`${styles.modalImg} ${i === current ? styles.modalImgActive : ""}`}
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className={`${styles.modalNav} ${styles.modalNavPrev} ${styles.modalNavDesktop}`}
              onClick={() =>
                setCurrent((i) => (i - 1 + images.length) % images.length)
              }
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              className={`${styles.modalNav} ${styles.modalNavNext} ${styles.modalNavDesktop}`}
              onClick={() => setCurrent((i) => (i + 1) % images.length)}
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>

            <div className={styles.modalDots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.carouselDot} ${i === current ? styles.carouselDotActive : ""}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>

            <div className={styles.modalNavRow}>
              <button
                className={`${styles.modalNav} ${styles.modalNavPrev}`}
                onClick={() =>
                  setCurrent((i) => (i - 1 + images.length) % images.length)
                }
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <button
                className={`${styles.modalNav} ${styles.modalNavNext}`}
                onClick={() => setCurrent((i) => (i + 1) % images.length)}
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Carousel({
  images,
  imageFit = "cover",
  imageScale = 1,
  onImageClick,
}: {
  images: string[];
  imageFit?: "cover" | "contain";
  imageScale?: number;
  onImageClick: (index: number) => void;
}) {
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
          style={{
            objectFit: imageFit,
            transform:
              imageFit === "contain" ? `scale(${imageScale})` : undefined,
          }}
          onClick={() => onImageClick(i)}
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

function ProjectCard({ project, t }: { project: Project; t: Translations }) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const item = t.projects.items[project.tKey as keyof typeof t.projects.items];
  const title = item.title;
  const description = item.description;
  const tagLabel = t.projects.tags[project.tag as keyof typeof t.projects.tags];

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        {project.images && project.images.length > 0 ? (
          <Carousel
            images={project.images}
            imageFit={project.imageFit}
            imageScale={project.imageScale}
            onImageClick={(i) => {
              if (isDesktop()) setModalIndex(i);
            }}
          />
        ) : (
          <div className={styles.cardImgPlaceholder}>
            <span className={styles.cardImgLabel}>
              {t.projects.previewComingSoon}
            </span>
          </div>
        )}
        <span className={styles.cardTag}>{tagLabel}</span>
      </div>

      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardTech}>
          {project.tech.map((name) => (
            <TechBadge key={name} name={name} />
          ))}
        </div>
      </div>

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
            {t.projects.links.github}
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
            {t.projects.links.steam}
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
            {t.projects.links.live}
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
            {t.projects.links.download}
          </a>
        )}
      </div>

      <div className={styles.cardHoverArrow} aria-hidden>
        <ArrowRight size={18} />
      </div>

      {modalIndex !== null && project.images && (
        <Modal
          images={project.images}
          startIndex={modalIndex}
          imageFit={project.imageFit}
          imageScale={project.imageScale}
          onClose={() => setModalIndex(null)}
        />
      )}
    </article>
  );
}

const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];

export default function Projects() {
  const locale = useLocale();
  const t = getT(locale);
  const [activeTag, setActiveTag] = useState("All");

  const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];
  const filtered =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeTag);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{t.projects.pageTitle}</h1>
          <p className={styles.subtitle}>{t.projects.pageSubtitle}</p>
        </section>

        <div className={styles.filters}>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {t.projects.tags[tag as keyof typeof t.projects.tags] ?? tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} t={t} />
          ))}
        </div>
      </div>
    </main>
  );
}
