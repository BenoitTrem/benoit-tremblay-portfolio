import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Benoit Tremblay, a computer science student and developer " +
    "specializing in full-stack web development, desktop applications, and game " +
    "development with React, Next.js, TypeScript, Java, and C#.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "profile",
    url: "https://your-domain.com/about",
    title: "About Benoit Tremblay | Developer & CS Student",
    description:
      "Computer science student and developer building full-stack websites, desktop " +
      "apps, and games with modern technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benoit Tremblay — About",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Benoit Tremblay | Developer & CS Student",
    description:
      "Computer science student and developer building full-stack websites, desktop " +
      "apps, and games.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
