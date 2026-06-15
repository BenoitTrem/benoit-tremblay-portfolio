"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "./lib/LocaleContext";
import { getT } from "./lib/translations";

export default function Error() {
  const locale = useLocale();
  const t = getT(locale);

  return (
    <main className="error-page">
      <p className="error-code">{t.error[500].code}</p>
      <h1 className="error-title">{t.error[500].title}</h1>
      <p className="error-sub">{t.error[500].sub}</p>
      <Link href="/" className="error-btn">
        <ArrowLeft size={16} />
        {t.error[500].back}
      </Link>
    </main>
  );
}
