"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="error-page">
      <p className="error-code">404</p>
      <h1 className="error-title">Page not found</h1>
      <p className="error-sub">
        This page doesn&apos;t exist or was moved. Head back home.
      </p>
      <Link href="/" className="error-btn">
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </main>
  );
}
