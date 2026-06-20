"use client";
import styles from "./projects.module.css";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  imageOrigin?: "center" | "top-left" | "top" | "left";
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
    tag: "Desktop",
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
    tag: "Desktop",
    download:
      "https://github.com/BenoitTrem/lol-client-dashboard/releases/download/V1.1.0/LoL.Dashboard.Setup.1.1.0.exe",
  },
  {
    id: "The Last Wait",
    tKey: "theLastWait",
    images: [
      "https://youtu.be/xLgsGyKM2Ds",
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
    id: "Zombie Game",
    tKey: "zombieGame",
    images: [
      "https://youtu.be/oFLs_LDTJBE",
      "/images/ZombieGame/zombie-game-lab.png",
      "/images/ZombieGame/zombie-game-shooting.png",
      "/images/ZombieGame/zombie-game-maps.png",
      "/images/ZombieGame/zombie-game-zombie-gang.png",
      "/images/ZombieGame/zombie-game-hallway.png",
      "/images/ZombieGame/zombie-game-toilet.png",
      "/images/ZombieGame/zombie-game-upgrade.png",
      "/images/ZombieGame/zombie-game-warehouse.png",
      "/images/ZombieGame/zombie-game-shooting-warehouse.png",
      "/images/ZombieGame/zombie-game-outside.png",
    ],
    tech: ["Unreal Engine", "Blender"],
    tag: "Game",
    download:
      "https://drive.google.com/drive/folders/1ocmIc-1fCEjOtcoluvhzHZDd-2_cJCQQ?usp=sharing",
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
    imageScale: 1.5,
    imageOrigin: "left",
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
    tag: "Desktop",
  },
];

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function isYouTubeSrc(src: string) {
  return src.includes("youtube.com") || src.includes("youtu.be");
}

function getYouTubeEmbedUrl(src: string) {
  const match = src.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  if (!match) return src;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&enablejsapi=1&rel=0&origin=${origin}&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1`;
}

function getYouTubeEmbedUrlModal(src: string) {
  const match = src.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  if (!match) return src;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `https://www.youtube.com/embed/${match[1]}?autoplay=1&enablejsapi=1&rel=0&origin=${origin}`;
}

function Modal({
  images,
  startIndex,
  imageFit = "cover",
  imageScale = 1,
  onClose,
  t,
}: {
  images: string[];
  startIndex: number;
  imageFit?: "cover" | "contain";
  imageScale?: number;
  onClose: () => void;
  t: Translations;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [modalVideoLoading, setModalVideoLoading] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrent(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (isVideoSrc(images[current]) && modalVideoRef.current) {
      setModalVideoLoading(true);
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {});
    }

    return () => {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
      }
    };
  }, [current, images]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") {
        if (modalVideoRef.current) modalVideoRef.current.pause();
        setCurrent((i) => (i + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        if (modalVideoRef.current) modalVideoRef.current.pause();
        setCurrent((i) => (i - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    return () => {
      if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
    };
  }, [current]);

  useEffect(() => {
    if (!isVideoSrc(images[current])) return;
    const timeout = setTimeout(() => setModalVideoLoading(false), 6000);
    return () => clearTimeout(timeout);
  }, [current, images]);

  const handleClose = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    onClose();
  };

  const waitingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goPrev = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setCurrent((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setCurrent((i) => (i + 1) % images.length);
  };

  return createPortal(
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={handleClose}>
          <X size={22} />
        </button>

        <div className={styles.modalImgWrapper}>
          {images.map((src, i) =>
            isYouTubeSrc(src) ? (
              <div
                key={src}
                className={`${styles.modalYouTube} ${i === current ? styles.modalImgActive : ""}`}
              >
                <iframe
                  src={i === current ? getYouTubeEmbedUrlModal(src) : undefined}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className={styles.carouselYouTubeIframe}
                />
              </div>
            ) : isVideoSrc(src) ? (
              <div
                key={src}
                className={`${styles.modalImg} ${i === current ? styles.modalImgActive : ""}`}
                style={{ position: "relative" }}
              >
                <video
                  ref={i === current ? modalVideoRef : undefined}
                  src={src}
                  controls
                  loop
                  playsInline
                  onCanPlay={() => i === current && setModalVideoLoading(false)}
                  onWaiting={() => {
                    if (i !== current) return;
                    waitingTimeoutRef.current = setTimeout(
                      () => setModalVideoLoading(true),
                      300,
                    );
                  }}
                  onPlaying={() => {
                    if (i !== current) return;
                    if (waitingTimeoutRef.current)
                      clearTimeout(waitingTimeoutRef.current);
                    setModalVideoLoading(false);
                  }}
                  className={styles.modalVideo}
                />
                {i === current && modalVideoLoading && (
                  <div className={styles.videoLoadingOverlay}>
                    <div className={styles.videoSpinner} />
                    <span>{t.projects.loadingVideo}</span>
                  </div>
                )}
              </div>
            ) : (
              <img
                key={src}
                src={src}
                alt=""
                className={`${styles.modalImg} ${i === current ? styles.modalImgActive : ""}`}
              />
            ),
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              className={`${styles.modalNav} ${styles.modalNavPrev} ${styles.modalNavDesktop}`}
              onClick={goPrev}
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              className={`${styles.modalNav} ${styles.modalNavNext} ${styles.modalNavDesktop}`}
              onClick={goNext}
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>

            <div className={styles.modalDots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.carouselDot} ${i === current ? styles.carouselDotActive : ""}`}
                  onClick={() => {
                    if (modalVideoRef.current) modalVideoRef.current.pause();
                    setCurrent(i);
                  }}
                />
              ))}
            </div>

            <div className={styles.modalNavRow}>
              <button
                className={`${styles.modalNav} ${styles.modalNavPrev}`}
                onClick={goPrev}
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <button
                className={`${styles.modalNav} ${styles.modalNavNext}`}
                onClick={goNext}
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
  imageOrigin = "center",
  onImageClick,
  isModalOpen,
  t,
}: {
  images: string[];
  imageFit?: "cover" | "contain";
  imageScale?: number;
  imageOrigin?: "center" | "top-left" | "top" | "left";
  onImageClick: (index: number) => void;
  isModalOpen: boolean;
  t: Translations;
}) {
  const [current, setCurrent] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const waitingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const advance = () => {
    setCurrent((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1) return;
    if (isVideoSrc(images[current])) return;
    if (isYouTubeSrc(images[current])) return;

    const timer = setTimeout(advance, 3000);
    return () => clearTimeout(timer);
  }, [current, images]);

  useEffect(() => {
    if (isVideoSrc(images[current]) && videoRef.current) {
      setVideoLoading(true);
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {
          setVideoLoading(false);
          advance();
        });
      }
    }
  }, [current, images]);

  useEffect(() => {
    if (!isVideoSrc(images[current])) return;
    const timeout = setTimeout(() => setVideoLoading(false), 6000);
    return () => clearTimeout(timeout);
  }, [current, images]);

  useEffect(() => {
    return () => {
      if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
    };
  }, [current]);

  useEffect(() => {
    if (!isVideoSrc(images[current]) || !videoRef.current) return;

    if (isModalOpen) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isModalOpen, current, images]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!isYouTubeSrc(images[current])) return;

    const handleMessage = (e: MessageEvent) => {
      // Only handle messages from our specific iframe
      if (e.source !== iframeRef.current?.contentWindow) return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "infoDelivery" && data.info?.playerState === 0) {
          setCurrent((i) => (i + 1) % images.length);
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);

    const timer = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening" }),
        "*",
      );
    }, 1000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timer);
    };
  }, [current, images]);

  return (
    <div className={styles.carousel}>
      {images.map((src, i) =>
        isYouTubeSrc(src) ? (
          <div
            key={src}
            className={`${styles.carouselYouTubeWrapper} ${styles.carouselImg} ${i === current ? styles.carouselImgActive : ""}`}
          >
            <iframe
              ref={i === current ? iframeRef : undefined}
              src={i === current ? getYouTubeEmbedUrl(src) : undefined}
              allow="autoplay; fullscreen"
              allowFullScreen
              className={styles.carouselYouTubeIframe}
            />
            <div
              className={styles.carouselYouTubeOverlay}
              onClick={i === current ? () => onImageClick(i) : undefined}
            />
          </div>
        ) : isVideoSrc(src) ? (
          <div
            key={src}
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <video
              ref={i === current ? videoRef : undefined}
              src={src}
              autoPlay
              muted
              playsInline
              onCanPlay={() => i === current && setVideoLoading(false)}
              onWaiting={() => {
                if (i !== current) return;
                waitingTimeoutRef.current = setTimeout(
                  () => setVideoLoading(true),
                  300,
                );
              }}
              onPlaying={() => {
                if (i !== current) return;
                if (waitingTimeoutRef.current)
                  clearTimeout(waitingTimeoutRef.current);
                setVideoLoading(false);
              }}
              onEnded={i === current ? advance : undefined}
              className={`${styles.carouselImg} ${i === current ? styles.carouselImgActive : ""}`}
              style={{
                objectFit: imageFit,
                transform:
                  imageFit === "contain" ? `scale(${imageScale})` : undefined,
                transformOrigin: imageOrigin ?? "center",
                pointerEvents: i === current ? "auto" : "none",
              }}
              onClick={i === current ? () => onImageClick(i) : undefined}
            />
            {i === current && videoLoading && (
              <div className={styles.videoLoadingOverlay}>
                <div className={styles.videoSpinner} />
                <span>{t.projects.loadingPreview}</span>
              </div>
            )}
          </div>
        ) : (
          <img
            key={src}
            src={src}
            alt=""
            className={`${styles.carouselImg} ${i === current ? styles.carouselImgActive : ""}`}
            style={{
              objectFit: imageFit,
              transform:
                imageFit === "contain" ? `scale(${imageScale})` : undefined,
              transformOrigin: imageOrigin ?? "center",
              pointerEvents: i === current ? "auto" : "none",
            }}
            onClick={i === current ? () => onImageClick(i) : undefined}
          />
        ),
      )}
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
            imageOrigin={project.imageOrigin}
            onImageClick={(i) => setModalIndex(i)}
            isModalOpen={modalIndex !== null}
            t={t}
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
            target="_blank"
            rel="noopener noreferrer"
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
          key={modalIndex}
          images={project.images}
          startIndex={modalIndex}
          imageFit={project.imageFit}
          imageScale={project.imageScale}
          onClose={() => setModalIndex(null)}
          t={t}
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
