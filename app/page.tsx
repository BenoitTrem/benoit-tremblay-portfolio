"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center animate-fadein">
        <h1 className="my-title">
          My Portfolio
        </h1>
        <p className="mt-4 text-gray-400">
          My animated portfolio is working
        </p>
        <Link href="/about" className="btn-primary mt-5 inline-block">
          About Me
        </Link>
      </div>
    </main>
  );
}