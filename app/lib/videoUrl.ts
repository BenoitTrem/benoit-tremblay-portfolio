// lib/videoUrl.ts
const BLOB_BASE = "https://jvq3pnkbt8r7bf90.public.blob.vercel-storage.com";
const LOCAL_BASE = "/videos";

export function videoUrl(filename: string) {
  if (process.env.NODE_ENV === "development") {
    return `${LOCAL_BASE}/${filename}`;
  }
  return `${BLOB_BASE}/${filename}`;
}
