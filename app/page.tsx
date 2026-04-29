"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    label: "Computer Science",
    headline: "Engineering & Dev",
    sub: "Building software that matters.",
  },
  {
    label: "Professional Gymnastics",
    headline: "Athlete & Competitor",
    sub: "Competing at the highest level.",
  },
  {
    label: "Benoit Tremblay",
    headline: "Two passions. One person.",
    sub: "Computer scientist & professional gymnast.",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const t = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTextVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrent(i);
      setTextVisible(true);
    }, 500);
  };

  return (
    <main className="home">
      {/* ── Carousel ── */}
      <section aria-label="Portfolio highlights" className="carousel">
        <div className="carousel-image-area">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`carousel-slide ${i === current ? "active" : ""}`}
            >
              <div className="carousel-placeholder" />
            </div>
          ))}

          <div
            className={`carousel-overlay ${textVisible ? "text-visible" : ""}`}
          >
            <p className="carousel-label">{slides[current].label}</p>
            <p className="carousel-headline">{slides[current].headline}</p>
            <p className="carousel-sub">{slides[current].sub}</p>
          </div>

          <div
            className="carousel-dots"
            role="tablist"
            aria-label="Carousel navigation"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                className={`carousel-dot ${i === current ? "active" : ""}`}
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
        className={`home-intro ${mounted ? "visible" : ""}`}
      >
        <h1 id="intro-heading" className="home-name">
          Benoit Tremblay
        </h1>
        <h2 className="home-heading">Two passions. One person.</h2>
        <p className="home-sub">
          Computer science engineer &amp; professional gymnast — explore
          whichever side brings you here.
        </p>
      </section>

      {/* ── Two cards ── */}
      <section
        aria-labelledby="explore-heading"
        className={`home-split ${mounted ? "visible" : ""}`}
      >
        <h2 id="explore-heading" className="sr-only">
          Explore my work
        </h2>

        <Link
          href="/projects"
          className={`split-card split-card--tech ${mounted ? "visible" : ""}`}
        >
          <p className="split-card__tag">Computer Science</p>
          <h3 className="split-card__title">Engineering &amp; Dev</h3>
          <p className="split-card__desc">
            Full-stack projects, algorithms, and software craftsmanship.
          </p>
          <span className="split-card__cta" aria-hidden="true">
            View projects →
          </span>
        </Link>

        <Link
          href="/about"
          className={`split-card split-card--gym ${mounted ? "visible" : ""}`}
        >
          <p className="split-card__tag">Athletics</p>
          <h3 className="split-card__title">Professional Gymnastics</h3>
          <p className="split-card__desc">
            Competitive achievements, training philosophy, and the athlete's
            mindset.
          </p>
          <span className="split-card__cta" aria-hidden="true">
            My journey →
          </span>
        </Link>
      </section>
    </main>
  );
}
