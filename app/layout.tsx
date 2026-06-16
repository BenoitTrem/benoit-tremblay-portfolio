import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2dd4aa" },
    { media: "(prefers-color-scheme: dark)", color: "#070f0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Benoit Tremblay | Developer & CS Student",
    template: "%s | Benoit Tremblay",
  },
  description:
    "Benoit Tremblay is a computer science student showcasing software projects " +
    "in full-stack development, desktop applications, and game development. " +
    "Explore work built with React, Next.js, TypeScript, Java, C# and more.",

  applicationName: "Benoit Tremblay Portfolio",
  authors: [{ name: "Benoit Tremblay", url: "https://your-domain.com" }],
  creator: "Benoit Tremblay",
  publisher: "Benoit Tremblay",

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
    "desktop application",
    "electron",
    "game development",
    "react",
    "next.js",
    "typescript",
    "python",
    "java",
    "c#",
    "spring boot",
    "open source",
    "student developer",
    "québec",
    "canada",
  ],

  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: "/",
  },

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

  openGraph: {
    type: "website",
    url: "https://your-domain.com",
    title: "Benoit Tremblay | Full-Stack Developer Portfolio",
    description:
      "Explore Benoit Tremblay's developer portfolio — full-stack apps, desktop software, " +
      "games, and more built with modern technologies.",
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

  twitter: {
    card: "summary_large_image",
    title: "Benoit Tremblay | Full-Stack Developer",
    description:
      "Full-stack apps, desktop software, and games — built with modern technologies.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  },

  category: "portfolio",
  classification:
    "Portfolio, Technology, Software Development, Full-Stack Development, Web Development, Game Development, Desktop Applications, Mobile Development",
};

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
