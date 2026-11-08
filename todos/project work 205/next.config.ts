import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // build เป็นเว็บ static (ไม่มี server function) — เว็บนี้เป็น client ทั้งหมดอยู่แล้ว
  // และเลี่ยงปัญหา Vercel ไม่รองรับชื่อโฟลเดอร์ที่มีเว้นวรรค ("project work 205")
  output: "export",
  images: { unoptimized: true },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
