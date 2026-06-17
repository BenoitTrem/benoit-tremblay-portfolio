import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects by Benoit Tremblay, including full-stack " +
    "websites, desktop apps, mobile apps, and games. Built with React, " +
    "Next.js, TypeScript, Java, C#, and more.",

  alternates: {
    canonical: "/projects",
  },

  openGraph: {
    type: "website",
    url: "https://your-domain.com/projects",
    title: "Projects | Benoit Tremblay",
    description:
      "Full-stack websites, desktop apps, mobile apps, and games built " +
      "with modern technologies — browse Benoit Tremblay's project portfolio.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benoit Tremblay — Projects",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Projects | Benoit Tremblay",
    description:
      "Full-stack websites, desktop apps, mobile apps, and games built " +
      "with modern technologies.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
