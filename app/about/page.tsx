"use client";
import styles from "./about.module.css";
import { ArrowRight, GraduationCap, Code2, Layers } from "lucide-react";
import Link from "next/link";

const skills = [
  {
    name: "React",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="2" opacity="0.15" />
        <text
          x="4"
          y="17"
          fontSize="11"
          fontWeight="900"
          fontFamily="monospace"
          fill="currentColor"
        >
          TS
        </text>
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Language",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C9 2 7 3.5 7 5.5V9h5v1H5.5C3.5 10 2 11.5 2 14s1.5 4 3.5 4H7v-2.5c0-2 2-3.5 5-3.5s5 1.5 5 3.5V18h1.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H17V9h-5V8h5V5.5C17 3.5 15 2 12 2z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="5.5" r="1" fill="currentColor" />
        <circle cx="14.5" cy="18.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L3 7v10l9 5 9-5V7L12 2z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M12 2v20M3 7l9 5 9-5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse
          cx="12"
          cy="7"
          rx="8"
          ry="3"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M6 9c.5-2 2-3 4-2.5C11.5 7 11 9 13 9.5c2 .5 3.5-.5 4-2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2 15c.5-2 2-3 4-2.5C7.5 13 7 15 9 15.5c2 .5 3.5-.5 4-2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Git",
    category: "Tools",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M6 8v8M8 6h8M8 6l4 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12h16M12 4l8 8-8 8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Algorithms",
    category: "CS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17l4-8 4 5 3-3 4 6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "Tools",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="11"
          width="18"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="5"
          y="8"
          width="3"
          height="3"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="9"
          y="8"
          width="3"
          height="3"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="13"
          y="8"
          width="3"
          height="3"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="9"
          y="5"
          width="3"
          height="3"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
      </svg>
    ),
  },
  {
    name: "Java",
    category: "Language",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M9 3c0 5-4 6-4 10a5 5 0 0010 0c0-4-4-5-4-10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M7 20s1 1 5 1 5-1 5-1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const categoryColors: Record<string, string> = {
  Frontend: "var(--cat-frontend)",
  Backend: "var(--cat-backend)",
  Language: "var(--cat-language)",
  Tools: "var(--cat-tools)",
  CS: "var(--cat-cs)",
};

const stats = [
  { number: "8+", label: "Years Training" },
  { number: "12", label: "Projects Built" },
  { number: "6", label: "Events Competed" },
  { number: "3", label: "Languages" },
];

export default function About() {
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

        {/* ── Stats ── */}
        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statNumber}>{s.number}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
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

        {/* ── What I do ── */}
        <p className={styles.sectionHeading}>What I do</p>
        <div className={styles.grid}>
          {[
            {
              icon: <GraduationCap size={22} strokeWidth={1.5} />,
              label: "Education",
              title: "Computer Science",
              text: "Student athlete balancing academic excellence with elite sport performance.",
            },
            {
              icon: <Code2 size={22} strokeWidth={1.5} />,
              label: "Engineering",
              title: "Full-Stack Dev",
              text: "Building web apps with React, Next.js, TypeScript, and Python.",
            },
            {
              icon: <Layers size={22} strokeWidth={1.5} />,
              label: "Athletics",
              title: "Artistic Gymnastics",
              text: "Competing at the national level across vault, floor, rings, and high bar.",
            },
          ].map((c) => (
            <div key={c.label} className={styles.card}>
              <span className={styles.cardIcon}>{c.icon}</span>
              <p className={styles.cardLabel}>{c.label}</p>
              <p className={styles.cardTitle}>{c.title}</p>
              <p className={styles.cardText}>{c.text}</p>
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <section className={styles.skillsSection}>
          <p className={styles.sectionHeading}>Technical skills</p>
          <div className={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className={styles.skillCard}
                style={
                  {
                    "--skill-delay": `${i * 35}ms`,
                    "--cat-color": categoryColors[skill.category],
                  } as React.CSSProperties
                }
              >
                <div className={styles.skillIcon}>{skill.icon}</div>
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillCat}>{skill.category}</span>
                </div>
                <div className={styles.skillCardGlow} />
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
