import Link from "next/link";
import { Home, User, Briefcase, Mail} from "lucide-react";
import { GitBranch, Link2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-list">
            <li>
              <Link href="/" className="footer-link">
                <Home size={14} /> Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                <User size={14} /> About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="footer-link">
                <Briefcase size={14} /> Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                <Mail size={14} /> Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Get in Touch</h4>
          <ul className="footer-list">
            <li>
              <a href="mailto:benoit@email.com" className="footer-link">
                <Mail size={14} /> benoit@email.com
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank" className="footer-link">
                <GitBranch size={14} /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/" target="_blank" className="footer-link">
                <Link2 size={14} /> LinkedIn
              </a>
            </li>
          </ul> 
        </div>
   
      </div>
      <div className="footer-bottom">
        © {year} Benoit Tremblay. All rights reserved.  
      </div>
    </footer>
  );
}