import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Benoit Tremblay for collaboration, job opportunities, " +
    "or questions about his development projects.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    url: "https://your-domain.com/contact",
    title: "Contact Benoit Tremblay",
    description:
      "Get in touch for collaboration, job opportunities, or questions about " +
      "development projects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Benoit Tremblay — Contact",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Benoit Tremblay",
    description:
      "Get in touch for collaboration, job opportunities, or questions about " +
      "development projects.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
