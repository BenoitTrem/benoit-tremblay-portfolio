"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Code2, Trophy } from "lucide-react";
import { useLocale } from "./lib/LocaleContext";
import { getT } from "./lib/translations";

export default function Home() {
  const locale = useLocale();
  const t = getT(locale);

  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % t.home.slides.length);
        setTextVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.home.slides.length]);

  const goTo = (i: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrent(i);
      setTextVisible(true);
    }, 500);
  };

  return (
    <main className={styles.home}>
      {/* ── Carousel ── */}
      <section aria-label="Portfolio highlights" className={styles.carousel}>
        <div className={styles.carouselImageArea} data-reveal="carousel">
          {t.home.slides.map((_, i) => (
            <div
              key={i}
              className={`${styles.carouselSlide} ${i === current ? styles.active : ""}`}
            >
              <div className={styles.carouselPlaceholder} />
            </div>
          ))}

          <div
            className={`${styles.carouselOverlay} ${textVisible ? styles.textVisible : ""}`}
          >
            <p className={styles.carouselLabel}>
              {t.home.slides[current].label}
            </p>
            <p className={styles.carouselHeadline}>
              {t.home.slides[current].headline}
            </p>
            <p className={styles.carouselSub}>{t.home.slides[current].sub}</p>
          </div>

          <div
            className={styles.carouselDots}
            role="tablist"
            aria-label="Carousel navigation"
          >
            {t.home.slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                className={`${styles.carouselDot} ${i === current ? styles.active : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section
        aria-labelledby="intro-heading"
        className={styles.homeIntro}
        data-reveal="intro"
      >
        <div className={styles.divider_1} />
        <h1 id="intro-heading" className={styles.homeName}>
          {t.home.name}
        </h1>
        <h2 className={styles.homeHeading}>{t.home.heading}</h2>
        <p className={styles.homeSub}>{t.home.sub}</p>
      </section>

      {/* ── Two cards ── */}
      <section
        aria-labelledby="explore-heading"
        className={styles.homeSplit}
        data-reveal="split"
      >
        <h2 id="explore-heading" className={styles.sectionHeading}>
          {t.home.explore}
        </h2>
        <div className={styles.divider_2} />
        <div className={styles.cardDiv}>
          <Link
            href="/projects"
            className={`${styles.splitCard} ${styles.splitCardTech}`}
          >
            <div className={styles.splitCardIcon}>
              <Code2 size={24} strokeWidth={1.5} />
            </div>
            <div className={styles.splitCardBody}>
              <p className={styles.splitCardTag}>{t.home.techTag}</p>
              <h3 className={styles.splitCardTitle}>{t.home.techTitle}</h3>
              <p className={styles.splitCardDesc}>{t.home.techDesc}</p>
            </div>
            <span className={styles.splitCardArrow}>→</span>
          </Link>

          <Link
            href="/about"
            className={`${styles.splitCard} ${styles.splitCardGym}`}
          >
            <div className={styles.splitCardIcon}>
              <Trophy size={24} strokeWidth={1.5} />
            </div>
            <div className={styles.splitCardBody}>
              <p className={styles.splitCardTag}>{t.home.gymTag}</p>
              <h3 className={styles.splitCardTitle}>{t.home.gymTitle}</h3>
              <p className={styles.splitCardDesc}>{t.home.gymDesc}</p>
            </div>
            <span className={styles.splitCardArrow}>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
