import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

// ─── Viewport (separate from Metadata in Next.js 14+) ────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  title: {
    default: "Benoit Tremblay | Gymnastics Athlete & Computer Science Developer",
    template: "%s | Benoit Tremblay",          
  },
  description:
    "Benoit Tremblay is a competitive gymnastics athlete and computer science developer " +
    "showcasing software projects, technical skills, and athletic achievements. " +
    "Explore work in full-stack development, algorithms, and high-performance sports.",

  applicationName: "Benoit Tremblay Portfolio",
  authors: [{ name: "Benoit Tremblay", url: "https://your-domain.com" }],
  creator: "Benoit Tremblay",
  publisher: "Benoit Tremblay",

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    "Benoit Tremblay",
    "portfolio",
    // — Athletics —
    "gymnastics",
    "gymnast",
    "competitive gymnastics",
    "artistic gymnastics",
    "vault",
    "floor exercise",
    "rings",
    "high bar",
    "pommel horse",
    "parallel bars",
    // — Tech —
    "computer science",
    "software developer",
    "software engineer",
    "full-stack developer",
    "web development",
    "react",
    "next.js",
    "typescript",
    "python",
    "algorithms",
    "data structures",
    // — Personal brand —
    "athlete developer",
    "student athlete",
    "coding athlete",
  ],

  // ── Canonical & alternates ─────────────────────────────────────────────────
  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: "/",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: "https://your-domain.com",
    title: "Name | Gymnastics Athlete & Developer Portfolio",
    description:
      "Explore Benoit Tremblay portfolio combining elite gymnastics performance with " +
      "computer science projects and software engineering skills.",
    siteName: "Benoit Tremblay Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benoit Tremblay — Gymnastics Athlete & Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Benoit Tremblay | Gymnastics Athlete & Developer",
    description:
      "Competitive gymnastics athlete & CS developer — projects, skills, and achievements.",
    images: ["/og-image.png"],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0a0a0a" },
    ],
  },

  // ── Manifest (PWA-ready, optional but recommended) ────────────────────────
  manifest: "/site.webmanifest",

  // ── Site verification (fill in tokens once you deploy) ────────────────────
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
    // yandex: "YOUR_YANDEX_TOKEN",
    // bing: "YOUR_BING_TOKEN",
  },

  // ── Miscellaneous ─────────────────────────────────────────────────────────
  category: "portfolio",
  classification: "Portfolio, Technology, Sports",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}