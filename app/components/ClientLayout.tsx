"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Menu, X, Briefcase, Mail, Sun, Moon } from "lucide-react";
import Footer from "./Footer";
import { getT } from "../lib/translations";
import { LocaleContext } from "../lib/LocaleContext";
import type { Locale } from "../lib/translations";
import ParticleMesh from "./WaveBackground";
import Intro from "./Intro";

const navLinks = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/about", labelKey: "about", icon: User },
  { href: "/projects", labelKey: "projects", icon: Briefcase },
  { href: "/contact", labelKey: "contact", icon: Mail },
];

const getInitialIntroDone = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("introDone") === "true";
};
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introDone, setIntroDone] = useState(getInitialIntroDone);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);
  const [locale, setLocale] = useState("en");
  const pathname = usePathname();
  const t = getT(locale as Locale);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
  }, [introDone]);

  const handleIntroDone = () => {
    localStorage.setItem("introDone", "true");
    setIntroDone(true);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDark(savedTheme === "dark");
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) setLocale(savedLocale);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
  }, [dark]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLang = () => {
    const newLocale = locale === "en" ? "fr" : "en";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const isActive = (href: string) => mounted && pathname === href;
  if (!mounted) return null;
  return (
    <>
      {!introDone && <Intro onDone={handleIntroDone} />}

      <ParticleMesh />

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${introDone ? "revealed" : ""}`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">My Portfolio</div>
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {navLinks.map(({ href, labelKey, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${isActive(href) ? "active" : ""}`}
          >
            <span className="sidebar-link-icon">
              <Icon size={16} />
            </span>
            <span className="nav-label">
              {t.nav[labelKey as keyof typeof t.nav]}
            </span>
          </Link>
        ))}

        <div className="sidebar-bottom">
          <button className="sidebar-theme-toggle" onClick={toggleLang}>
            <span className="sidebar-link-icon sidebar-lang-label">
              {locale === "fr" ? "EN" : "FR"}
            </span>
            <span className="nav-label">
              {locale === "fr" ? "English" : "Français"}
            </span>
          </button>

          <button
            className="sidebar-theme-toggle"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
          >
            <span className="sidebar-link-icon">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </span>
            <span className="nav-label">
              {dark ? t.nav.lightMode : t.nav.darkMode}
            </span>
          </button>
        </div>
      </aside>

      <div className={`topbar ${introDone ? "revealed" : ""}`}>
        <Link href="/" className="topbar-logo">
          My Portfolio
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            className="burger"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            <span style={{ fontSize: "14px", fontWeight: 700 }}>
              {locale === "fr" ? "EN" : "FR"}
            </span>
          </button>
          <button
            className="burger"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button className="burger" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`mobile-backdrop ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />

      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        {navLinks.map(({ href, labelKey, icon: Icon }) => (
          <div key={href} className="mobile-link-item">
            <Link
              href={href}
              className={`mobile-link ${isActive(href) ? "active" : ""}`}
            >
              <span className="mobile-link-icon">
                <Icon size={15} />
              </span>
              {t.nav[labelKey as keyof typeof t.nav]}
            </Link>
          </div>
        ))}
      </div>

      <div
        className={`desktop-main ${collapsed ? "collapsed" : ""} ${introDone ? "revealed" : ""}`}
      >
        <LocaleContext.Provider value={locale as Locale}>
          {children}
          <Footer />
        </LocaleContext.Provider>
      </div>
    </>
  );
}
