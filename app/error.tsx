"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error() {
  return (
    <main className="error-page">
      <p className="error-code">500</p>
      <h1 className="error-title">Something went wrong</h1>
      <p className="error-sub">
        An unexpected error occurred. Try going back home.
      </p>
      <Link href="/" className="error-btn">
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </main>
  );
}
