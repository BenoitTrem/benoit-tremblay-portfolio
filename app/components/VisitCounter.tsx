"use client";
import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";

const STORAGE_KEY = "site_visited";

export default function VisitCounter() {
  const locale = useLocale();
  const t = getT(locale);
  const [count, setCount] = useState<number | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const alreadyVisited = localStorage.getItem(STORAGE_KEY);
    const endpoint = alreadyVisited ? "/api/visit/count" : "/api/visit";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        if (!alreadyVisited) {
          localStorage.setItem(STORAGE_KEY, "true");
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="visit-badge">
      <Eye size={14} /> {count.toLocaleString()} {t.visitCounter.label}
    </span>
  );
}
