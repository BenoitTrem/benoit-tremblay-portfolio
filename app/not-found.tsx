"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "./lib/LocaleContext";
import { getT } from "./lib/translations";

export default function NotFound() {
  const locale = useLocale();
  const t = getT(locale);

  return (
    <main className="error-page">
      <p className="error-code">{t.notFound.code}</p>
      <h1 className="error-title">{t.notFound.title}</h1>
      <p className="error-sub">{t.notFound.sub}</p>
      <Link href="/" className="error-btn">
        <ArrowLeft size={16} />
        {t.notFound.back}
      </Link>
    </main>
  );
}
