import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

// ─── Viewport ────────────────────────────────────────────────────────────────
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
    default:
      "Benoit Tremblay | Full-Stack Developer & Computer Science Student",
    template: "%s | Benoit Tremblay",
  },
  description:
    "Benoit Tremblay is a computer science developer showcasing software projects " +
    "and technical skills in full-stack development, algorithms, and modern web technologies. " +
    "Explore work built with React, Next.js, TypeScript, Python, and more.",

  applicationName: "Benoit Tremblay Portfolio",
  authors: [{ name: "Benoit Tremblay", url: "https://your-domain.com" }],
  creator: "Benoit Tremblay",
  publisher: "Benoit Tremblay",

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    "Benoit Tremblay",
    "portfolio",
    "computer science",
    "software developer",
    "software engineer",
    "full-stack developer",
    "frontend developer",
    "backend developer",
    "web development",
    "react",
    "next.js",
    "typescript",
    "python",
    "algorithms",
    "data structures",
    "open source",
    "student developer",
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
    title: "Benoit Tremblay | Full-Stack Developer Portfolio",
    description:
      "Explore Benoit Tremblay's developer portfolio — software projects, technical skills, " +
      "and computer science work in full-stack web development.",
    siteName: "Benoit Tremblay Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benoit Tremblay — Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Benoit Tremblay | Full-Stack Developer",
    description:
      "CS developer & software engineer — projects, skills, and open source work.",
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

  // ── Manifest ──────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Site verification ─────────────────────────────────────────────────────
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  },

  // ── Miscellaneous ─────────────────────────────────────────────────────────
  category: "portfolio",
  classification: "Portfolio, Technology, Software Development",
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
