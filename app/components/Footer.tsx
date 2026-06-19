import Link from "next/link";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { GitBranch, Link2 } from "lucide-react";
import VisitCounter from "./VisitCounter";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";

export default function Footer() {
  const year = new Date().getFullYear();

  const locale = useLocale();
  const t = getT(locale);

  return (
    <footer className="footer">
      <div className="visit-badge-wrap">
        <VisitCounter />
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">{t.footer.navigation}</h4>
          <ul className="footer-list">
            <li>
              <Link href="/" className="footer-link">
                <Home size={14} /> {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                <User size={14} /> {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="footer-link">
                <Briefcase size={14} /> {t.nav.projects}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                <Mail size={14} /> {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">{t.footer.getInTouch}</h4>
          <ul className="footer-list">
            <li>
              <a href="mailto:bentrem2003@gmail.com" className="footer-link">
                <Mail size={14} /> bentrem2003@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                className="footer-link"
              >
                <GitBranch size={14} /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/benoit-tremblay-635117417"
                target="_blank"
                className="footer-link"
              >
                <Link2 size={14} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="divider_2" />
        <p>
          © {year} Benoit Tremblay. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
