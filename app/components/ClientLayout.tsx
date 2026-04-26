"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Menu, X, Briefcase, Mail } from "lucide-react";
import Footer from "./Footer";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => mounted && pathname === href;

  return (
    <>
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            My Portfolio
          </div>

          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(c => !c)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${isActive(href) ? "active" : ""}`}
          >
            <span className="sidebar-link-icon">
              <Icon size={16} />
            </span>
            <span className="nav-label">{label}</span>
          </Link>
        ))}
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="topbar">
        <span className="topbar-logo">
          My Portfolio
        </span>

        <button className="burger" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        {navLinks.map(({ href, label, icon: Icon }) => (
          <div key={href} className="mobile-link-item">
            <Link
              href={href}
              className={`mobile-link ${isActive(href) ? "active" : ""}`}
            >
              <span className="mobile-link-icon">
                <Icon size={15} />
              </span>
              {label}
            </Link>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="desktop-main">
        {children}
        <Footer />
      </div>
    </>
  );
}