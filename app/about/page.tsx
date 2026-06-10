"use client";
import styles from "./about.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocale } from "../lib/LocaleContext";
import { getT } from "../lib/translations";
import * as simpleIcons from "simple-icons";
import { siReact } from "simple-icons";

export const SkillIcons = {
  TypeScript: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siTypescript.path} fill="currentColor" />
    </svg>
  ),

  JavaScript: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siJavascript.path} fill="currentColor" />
    </svg>
  ),

  Python: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPython.path} fill="currentColor" />
    </svg>
  ),

  Java: (
    <svg viewBox="0 0 128 128" fill="currentColor">
      <path d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
      <path d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
      <path d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM81.698 74.148s4.08 3.361-4.507 5.969c-16.35 4.953-68.081 6.449-82.443.198-5.164-2.248 4.52-5.374 7.555-6.031 3.139-.688 4.931-.559 4.931-.559-5.68-3.999-36.707 7.851-15.753 11.243 57.044 9.255 104.013-4.171 90.217-10.82zM50.912 34.966s-10.39 2.47-3.679 3.363c2.829.378 8.443.292 13.685-.146 4.281-.359 8.578-1.125 8.578-1.125s-1.506.646-2.598 1.39c-10.488 2.759-30.751 1.475-24.929-1.345 4.928-2.388 8.943-2.137 8.943-2.137zm18.624 10.403c10.657-5.534 5.729-10.853 2.289-10.137-.845.176-1.221.328-1.221.328s.313-.491.911-.703c6.808-2.392 12.04 7.058-2.195 10.798 0-.001.164-.148.216-.286z" />
      <path d="M76.491 1s11.875 11.876-11.264 30.142c-18.565 14.663-4.234 23.026-.007 32.571-10.831-9.768-18.78-18.389-13.45-26.398C59.604 24.466 81.807 18.887 76.491 1z" />
      <path d="M52.214 126.021c10.228.655 25.94-.364 26.333-5.227 0 0-.715 1.836-8.463 3.296-8.745 1.647-19.539 1.456-25.927.399 0 .001 1.31 1.083 8.057 1.532z" />
    </svg>
  ),
  Kotlin: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siKotlin.path} fill="currentColor" />
    </svg>
  ),
  "C#": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <path
        fill="currentColor"
        d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"
      />
      <path
        fill="currentColor"
        opacity="0.7"
        d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
      />
      <path
        fill="var(--csharp-c)"
        d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"
      />
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPhp.path} fill="currentColor" />
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siHtml5.path} fill="currentColor" />
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siCss.path} fill="currentColor" />
    </svg>
  ),
  // ── Frontend ──
  React: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siReact.path} fill="currentColor" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" className="text-gray-900 dark:text-white">
      <path d={simpleIcons.siNextdotjs.path} fill="currentColor" />
    </svg>
  ),
  JQuery: (
    <svg viewBox="0 0 24 24" className="text-gray-900 dark:text-white">
      <path d={simpleIcons.siJquery.path} fill="currentColor" />
    </svg>
  ),
  "Vue.js": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siVuedotjs.path} fill="currentColor" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" className={styles.skillSvg}>
      <path d={simpleIcons.siTailwindcss.path} fill="currentColor" />
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siBootstrap.path} fill="currentColor" />
    </svg>
  ),
  Blade: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siLaravel.path} fill="currentColor" />
    </svg>
  ),
  Razor: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siDotnet.path} fill="currentColor" />
    </svg>
  ),
  // ── Backend ──
  ".NET / Razor": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siDotnet.path} fill="currentColor" />
    </svg>
  ),
  "Laravel / Blade": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siLaravel.path} fill="currentColor" />
    </svg>
  ),
  Laravel: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siLaravel.path} fill="currentColor" />
    </svg>
  ),
  Spring: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siSpring.path} fill="currentColor" />
    </svg>
  ),
  ".NET": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siDotnet.path} fill="currentColor" />
    </svg>
  ),
  "React Native": (
    <svg viewBox="0 0 24 24">
      <path d={siReact.path} fill="currentColor" />
    </svg>
  ),
  Electron: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siElectron.path} fill="currentColor" />
    </svg>
  ),
  Android: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siAndroid.path} fill="currentColor" />
    </svg>
  ),
  "REST APIs": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 9l3 3-3 3M13 15h3" />
    </svg>
  ),
  // ── DB & Cloud ──
  PostgreSQL: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPostgresql.path} fill="currentColor" />
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siMysql.path} fill="currentColor" />
    </svg>
  ),
  SQLite: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siSqlite.path} fill="currentColor" />
    </svg>
  ),
  PhpMyAdmin: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPhpmyadmin.path} fill="currentColor" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.127a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.184-1.014-.454-1.277-.808a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.51.088.15.04.295.08.43.127.136.048.24.096.317.144a.653.653 0 0 1 .224.183.39.39 0 0 1 .064.224v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.224-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.25 16.75c-2.938 1.689-6.677 2.579-10.083 2.579-4.769 0-9.092-1.766-12.352-4.708-.256-.23-.027-.543.28-.364 3.522 2.049 7.875 3.285 12.374 3.285 3.034 0 6.375-.63 9.45-1.933.463-.196.853.304.331.141z" />
      <path d="M22.047 15.868c-.348-.447-2.303-.211-3.183-.106-.267.031-.308-.2-.067-.369 1.558-1.095 4.116-.779 4.415-.412.299.367-.079 2.927-1.541 4.149-.224.188-.438.088-.338-.161.329-.822 1.062-2.654.714-3.101z" />
    </svg>
  ),
  Azure: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siVercel.path} fill="currentColor" />
    </svg>
  ),
  Netlify: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siNetlify.path} fill="currentColor" />
    </svg>
  ),
  // ── Tools & DevOps ──
  Git: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGit.path} fill="currentColor" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGithub.path} fill="currentColor" />
    </svg>
  ),
  GitLab: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGitlab.path} fill="currentColor" />
    </svg>
  ),
  GitKraken: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siGitkraken.path} fill="currentColor" />
    </svg>
  ),
  VMware: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siVmware.path} fill="currentColor" />
    </svg>
  ),
  "Raspberry Pi": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C9.366.02 7.093 1.67 7.093 1.67s-.43-.127-.97-.127c-.44 0-.79.098-1.01.189-.23-.23-.56-.42-.94-.42-.52 0-.87.315-.87.315s.09.44.45.758c-.2.3-.3.65-.3.975 0 .09.01.18.02.27-.37.55-.52 1.16-.42 1.77l.05.2c-.22.22-.35.51-.35.83 0 .17.04.34.1.48-.37.81-.1 1.79.74 2.27.69 1.68 2.2 2.81 2.2 2.81s-.53.67-.53 1.42c0 .32.07.64.25.93C5.02 16.33 3.9 18.72 3.9 19.5c0 2.25 2.3 3.56 5.51 3.87-.24-.49-.38-1.05-.38-1.64 0-1.09.46-2.07 1.21-2.78.21.07.43.11.66.11.23 0 .45-.04.66-.11.75.71 1.21 1.69 1.21 2.78 0 .59-.14 1.15-.38 1.64 3.21-.31 5.51-1.62 5.51-3.87 0-.78-1.12-3.17-1.62-5.09.18-.29.25-.61.25-.93 0-.75-.53-1.42-.53-1.42s1.51-1.13 2.2-2.81c.84-.48 1.11-1.46.74-2.27.06-.14.1-.31.1-.48 0-.32-.13-.61-.35-.83l.05-.2c.1-.61-.05-1.22-.42-1.77.01-.09.02-.18.02-.27 0-.325-.1-.675-.3-.975.36-.318.45-.758.45-.758s-.35-.315-.87-.315c-.38 0-.71.19-.94.42-.22-.091-.57-.189-1.01-.189-.54 0-.97.127-.97.127S14.668.02 12.017 0z" />
    </svg>
  ),
  // ── IDEs ──
  "VS Code": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.948V4.053a1.5 1.5 0 0 0-.85-1.466zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  ),
  "Visual Studio": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.583.063L9.945 6.875 4.196 2.142.21 3.988.014 18.63l4.182 1.846 5.75-4.734 7.637 6.813L24 20.168V2.475zm-1.074 14.99l-5.9-4.52 5.9-4.52v9.04zM1.324 17.284V5.364l3.474 5.96z" />
    </svg>
  ),
  "IntelliJ IDEA": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siIntellijidea.path} fill="currentColor" />
    </svg>
  ),
  PyCharm: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPycharm.path} fill="currentColor" />
    </svg>
  ),
  PhpStorm: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siPhpstorm.path} fill="currentColor" />
    </svg>
  ),
  WebStorm: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siWebstorm.path} fill="currentColor" />
    </svg>
  ),
  "Android Studio": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siAndroidstudio.path} fill="currentColor" />
    </svg>
  ),
  // ── Games & 3D ──
  Unity: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siUnity.path} fill="currentColor" />
    </svg>
  ),
  "Unreal Engine": (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siUnrealengine.path} fill="currentColor" />
    </svg>
  ),
  Blender: (
    <svg viewBox="0 0 24 24">
      <path d={simpleIcons.siBlender.path} fill="currentColor" />
    </svg>
  ),
};

export const skillCategories = [
  {
    label: "Languages",
    colorVar: "--cat-language",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "Kotlin" },
      { name: "C#" },
      { name: "PHP" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    label: "Frontend",
    colorVar: "--cat-frontend",
    skills: [
      { name: "React" },
      { name: "Electron" },
      { name: "Next.js" },
      { name: "Vue.js" },
      { name: "JQuery" },
      { name: "Blade" },
      { name: "Razor" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
    ],
  },
  {
    label: "Backend & APIs",
    colorVar: "--cat-backend",
    skills: [
      { name: "Laravel" },
      { name: "Spring" },
      { name: ".NET" },
      { name: "REST APIs" },
    ],
  },
  {
    label: "Mobile Development",
    colorVar: "--cat-mobile",
    skills: [{ name: "React Native" }, { name: "Android" }],
  },
  {
    label: "Databases",
    colorVar: "--cat-db",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "PhpMyAdmin" },
    ],
  },
  {
    label: "Cloud & Deployment",
    colorVar: "--cat-cloud",
    skills: [
      { name: "AWS" },
      { name: "Azure" },
      { name: "Vercel" },
      { name: "Netlify" },
    ],
  },
  {
    label: "Versioning & Collaboration",
    colorVar: "--cat-tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab" },
      { name: "GitKraken" },
    ],
  },
  {
    label: "IDEs & Editors",
    colorVar: "--cat-ides",
    skills: [
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "IntelliJ IDEA" },
      { name: "PyCharm" },
      { name: "PhpStorm" },
      { name: "WebStorm" },
      { name: "Android Studio" },
    ],
  },
  {
    label: "Game Development",
    colorVar: "--cat-games",
    skills: [{ name: "Unity" }, { name: "Unreal Engine" }, { name: "Blender" }],
  },
  /** 
  {
    label: "Systems & Hardware",
    colorVar: "--cat-systems",
    skills: [{ name: "VMware" }, { name: "Raspberry Pi" }],
  },
  */
];

const GITHUB_USER = "BenoitTrem";

type StatKey = "projectsBuilt" | "repos" | "topLang";

export default function About() {
  const locale = useLocale();
  const t = getT(locale);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const [activeStat, setActiveStat] = useState<StatKey | null>(null);
  const [visibleStat, setVisibleStat] = useState<StatKey | null>(null);
  const [switching, setSwitching] = useState(false);

  const [githubStats, setGithubStats] = useState<{
    repos: number;
    topLang: string;
    topLangs: { name: string; count: number }[];
  } | null>(null);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${GITHUB_USER}`,
        );
        const user = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
        );
        const repos = await reposRes.json();

        const langCount: Record<string, number> = {};
        for (const repo of repos) {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        }

        const sortedLangs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));

        const topLang = sortedLangs[0]?.name ?? "N/A";

        setGithubStats({
          repos: user.public_repos,
          topLang,
          topLangs: sortedLangs,
        });
      } catch (err) {
        console.error("GitHub fetch failed", err);
      }
    }
    fetchGitHub();
  }, []);

  const stats: { key: StatKey; number: string; label: string }[] = [
    {
      key: "projectsBuilt",
      number: "12",
      label: t.about.stats.projectsBuilt,
    },
    {
      key: "repos",
      number: githubStats ? `${githubStats.repos}` : "—",
      label: "Public Repos",
    },
    {
      key: "topLang",
      number: githubStats ? githubStats.topLang : "—",
      label: "Top Language",
    },
  ];

  const statPanelContent: Record<
    StatKey,
    { title: string; body: React.ReactNode }
  > = {
    projectsBuilt: {
      title: t.about.statPanels.projectsBuilt.title,
      body: (
        <>
          <p className={styles.statPanelText}>
            {t.about.statPanels.projectsBuilt.body}
          </p>
          <Link href="/projects" className={styles.statPanelLink}>
            {t.about.statPanels.projectsBuilt.cta}
            <ArrowRight size={13} />
          </Link>
        </>
      ),
    },
    repos: {
      title: "Projects & Repositories",
      body: (
        <>
          <p className={styles.statPanelText}>
            {githubStats?.repos} public repositories on GitHub — ranging from
            full-stack web apps to algorithms and personal experiments. Each one
            is a snapshot of something I was learning or building at the time.
          </p>
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.statPanelLink}
          >
            Browse repos <ArrowRight size={13} />
          </a>
        </>
      ),
    },
    topLang: {
      title: "Top Languages",
      body: (
        <>
          <p className={styles.statPanelText}>
            Languages I use most across my public repositories.
          </p>
          <div className={styles.statPanelLangRow}>
            {githubStats?.topLangs?.map((lang, i) => (
              <div key={lang.name} className={styles.statPanelLangItem}>
                <span className={styles.statPanelLangRank}>#{i + 1}</span>
                <span className={styles.statPanelLangName}>{lang.name}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    blockRefs.current.forEach((block) => {
      if (!block) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const fills = entry.target.querySelectorAll<HTMLElement>(
                `.${styles.skillRowFill}`,
              );
              fills.forEach((fill, i) => {
                setTimeout(() => {
                  fill.classList.add(styles.skillRowFillAnimated);
                }, i * 120);
              });
              const lines = entry.target.querySelectorAll<HTMLElement>(
                `.${styles.skillCatLine}`,
              );
              lines.forEach((line) => {
                line.classList.add(styles.skillCatLineActive);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      observer.observe(block);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleStatClick = useCallback(
    (key: StatKey) => {
      if (activeStat === key) {
        setVisibleStat(null);
        setSwitching(false);
        setTimeout(() => setActiveStat(null), 650);
        return;
      }
      if (activeStat === null) {
        setActiveStat(key);
        setVisibleStat(key);
        setSwitching(false);
      } else {
        setSwitching(true);
        setTimeout(() => {
          setActiveStat(key);
          setVisibleStat(key);
          setSwitching(false);
        }, 180);
      }
    },
    [activeStat],
  );

  const panel = activeStat ? statPanelContent[activeStat] : null;
  const isOpen = visibleStat !== null;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.eyebrow}>About me</h1>
          </div>
        </section>

        {/* ── Bio ── */}
        <div className={styles.bio}>
          <div className={styles.bioSidebar}>
            <div className={styles.bioSidebarLine} />
            <span className={styles.bioSidebarLabel}>My Story</span>
          </div>
          <div className={styles.bioText}>
            <p>
              I started gymnastics at age{" "}
              <span className={styles.bioHighlight}>7</span>, drawn to the
              combination of strength, precision, and artistry the sport
              demands. Over the years I&apos;ve competed across six events and
              learned that the mental discipline required in the gym translates
              directly to every other area of life.
            </p>
            <p>
              When I&apos;m not training, I&apos;m building. My interest in
              <span className={styles.bioHighlight}>
                {" "}
                computer science
              </span>{" "}
              grew from a curiosity about how things work under the hood. I
              started with small scripts, moved into web development, and now
              build full-stack applications with real users in mind.
            </p>
            <p>
              The overlap between both worlds is what drives me —
              <span className={styles.bioHighlight}>
                {" "}
                iteration, feedback, and mastery
              </span>
              . Whether it&apos;s perfecting a vault or refactoring an API, the
              process is the same.
            </p>
          </div>
          <div className={styles.bioImageCard}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageLabel}>Photo coming soon</span>
            </div>
          </div>
        </div>

        {/* ── Stats + inline panel ── */}
        <div className={styles.statsWrapper}>
          <div className={`${styles.stats} ${isOpen ? styles.statsOpen : ""}`}>
            {stats.map((s) => (
              <div
                key={s.key}
                className={`${styles.stat} ${activeStat === s.key ? styles.statActive : ""}`}
                onClick={() => handleStatClick(s.key)}
                aria-expanded={activeStat === s.key}
              >
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div
            className={`${styles.statPanel} ${isOpen ? styles.statPanelOpen : ""}`}
            aria-hidden={!isOpen}
          >
            <div className={styles.statPanelClip}>
              <div
                ref={innerRef}
                className={[
                  styles.statPanelInner,
                  isOpen && !switching ? styles.statPanelInnerVisible : "",
                  switching ? styles.statPanelInnerSwitching : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.statPanelContent}>
                  <p className={styles.statPanelTitle}>{panel?.title ?? ""}</p>
                  {panel?.body}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills ── */}
        <section className={styles.skillsSection}>
          <div className={styles.skillsHeader}>
            <div className={styles.skillsTitleRow}>
              <p className={styles.sectionHeading}>Technical skills</p>
              <div className={styles.skillsLine} />
            </div>
            <p className={styles.skillsLegend}>
              Technologies, frameworks and tools I&apos;ve learned, worked with
              and use in projects.
            </p>
          </div>

          <div className={styles.skillCategoriesWrap}>
            {skillCategories.map((cat, catIdx) => (
              <div
                key={cat.label}
                className={styles.skillCatBlock}
                ref={(el) => {
                  blockRefs.current[catIdx] = el;
                }}
              >
                <div
                  className={styles.skillCatHeader}
                  style={
                    {
                      "--bar-color": `var(${cat.colorVar})`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={styles.skillCatDot}
                    style={{ background: `var(${cat.colorVar})` }}
                  />
                  <span className={styles.skillCatLabel}>{cat.label}</span>
                  <span className={styles.skillCatLine} />
                </div>

                <div className={styles.skillChipsGrid}>
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={styles.skillChip}
                      style={
                        {
                          "--bar-color": `var(${cat.colorVar})`,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        className={styles.skillBarIcon}
                        style={
                          {
                            "--bar-color": `var(${cat.colorVar})`,
                          } as React.CSSProperties
                        }
                      >
                        {SkillIcons[skill.name as keyof typeof SkillIcons]}
                      </span>
                      <span className={styles.skillBarName}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>Want to work together?</p>
          <Link href="/contact" className={styles.ctaButton}>
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
