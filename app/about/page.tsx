import type { Metadata } from "next";
import styles from "./about.module.css";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Benoit Tremblay — competitive gymnastics athlete and computer science developer.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const cards = [
  {
    icon: "🤸",
    label: "Athletics",
    title: "Artistic Gymnastics",
    text: "Competing at the national level across vault, floor, rings, and high bar.",
  },
  {
    icon: "💻",
    label: "Engineering",
    title: "Full-Stack Dev",
    text: "Building web apps with React, Next.js, TypeScript, and Python.",
  },
  {
    icon: "🎓",
    label: "Education",
    title: "Computer Science",
    text: "Student athlete balancing academic excellence with elite sport performance.",
  },
];

const stats = [
  { number: "8+", label: "Years Training" },
  { number: "12", label: "Projects Built" },
  { number: "6", label: "Events Competed" },
  { number: "3", label: "Languages" },
];

const skills = [
  { name: "React / Next.js", level: "Advanced" },
  { name: "TypeScript", level: "Advanced" },
  { name: "Python", level: "Intermediate" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Algorithms & DSA", level: "Intermediate" },
  { name: "SQL / Databases", level: "Intermediate" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>About me</span>

            <h1 className={styles.title}>
              Athlete.
              <br />
              <span className={styles.titleAccent}>Developer.</span>
            </h1>

            <p className={styles.subtitle}>
              I compete at the highest level in artistic gymnastics while
              building software that solves real problems. Discipline from
              sport, creativity from code — both in the same mind.
            </p>

            <div className={styles.tags}>
              {["Gymnastics", "Full-Stack", "CS Student", "Montréal"].map(
                (t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Black placeholder image */}
          <div className={styles.imageCard}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageLabel}>Photo coming soon</span>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

        {/* ── Cards ── */}
        <p className={styles.sectionHeading}>What I do</p>
        <div className={styles.grid}>
          {cards.map((c) => (
            <div key={c.label} className={styles.card}>
              <span className={styles.cardIcon}>{c.icon}</span>
              <p className={styles.cardLabel}>{c.label}</p>
              <p className={styles.cardTitle}>{c.title}</p>
              <p className={styles.cardText}>{c.text}</p>
            </div>
          ))}
        </div>

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

        {/* ── Skills ── */}
        <section className={styles.skills}>
          <p className={styles.sectionHeading}>Technical skills</p>
          <div className={styles.skillsGrid}>
            {skills.map((s) => (
              <div key={s.name} className={styles.skillItem}>
                <span className={styles.skillDot} />
                <span className={styles.skillName}>{s.name}</span>
                <span className={styles.skillLevel}>{s.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Want to <span>work together</span>?
          </p>
          <a href="mailto:benoit@example.com" className={styles.ctaButton}>
            Get in touch →
          </a>
        </div>
      </div>
    </main>
  );
}
