import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_THREADS } from "../data/threads";

export const INITIAL_SHOWCASE_PROJECTS = [
  {
    id: "p1",
    title: "aMotion / Loopin Project",
    author: "jason_franklin",
    desc: "Platform komunitas dan streaming terpadu dengan ruang Circle, Reels, dan pemutar musik tersinkronisasi.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 48,
    replies: [
      { id: "r1", author: "rizky_dev", text: "UI glassmorphism-nya halus banget bang!" },
    ],
    isNew: false,
  },
  {
    id: "p2",
    title: "Bot Guard WhatsApp API",
    author: "apigroup_official",
    desc: "Otomasi moderasi grup developer berbasis Baileys & PM2 yang ringan dijalankan langsung di Termux.",
    stack: ["Node.js", "Baileys", "Termux"],
    bannerUrl: "",
    demoUrl: "https://discord.gg/7A5qtTpYT",
    applause: 41,
    replies: [],
    isNew: false,
  },
  {
    id: "p3",
    title: "Termux Node Deploy CLI",
    author: "anak_termux",
    desc: "CLI ringan untuk auto-build, cek log PM2, dan push proyek Next.js langsung dari terminal Android.",
    stack: ["Node.js", "Bash", "Termux"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 36,
    replies: [],
    isNew: false,
  },
  {
    id: "p4",
    title: "Nusantara UI Kit Dark",
    author: "nadia.tsx",
    desc: "Komponen React & Tailwind CSS bertema dark-glass editorial dengan tipografi lokal Indonesia.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 33,
    replies: [],
    isNew: false,
  },
  {
    id: "p5",
    title: "CORS & JWT Debugger Web",
    author: "rizky_dev",
    desc: "Alat uji header CORS, preflight OPTIONS, dan inspeksi payload JWT secara instan di browser.",
    stack: ["Next.js", "TypeScript", "Express.js"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 29,
    replies: [],
    isNew: false,
  },
  {
    id: "p6",
    title: "IndoDev Markdown Notes",
    author: "fajar_code",
    desc: "Aplikasi catatan ngoding offline-first dengan syntax highlighter dan ekspor cepat ke Gist.",
    stack: ["Vue.js", "Vite", "SQLite"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 25,
    replies: [],
    isNew: false,
  },
  {
    id: "p7",
    title: "Webhook Relay Tunnel",
    author: "dimas_net",
    desc: "Penerus webhook lokal untuk testing bot WhatsApp dan payment gateway tanpa IP publik.",
    stack: ["Go", "Docker", "Cloudflare"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 22,
    replies: [],
    isNew: false,
  },
  {
    id: "p8",
    title: "Supabase Schema Visualizer",
    author: "salsa_db",
    desc: "Visualisasi relasi tabel PostgreSQL dan generator RLS policy otomatis untuk proyek fullstack.",
    stack: ["PostgreSQL", "Supabase", "React"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 19,
    replies: [],
    isNew: false,
  },
  {
    id: "p9",
    title: "Pixel Icon Forge",
    author: "rehan_ui",
    desc: "Editor ikon pixel-art 24x24 berbasis kanvas web yang langsung menghasilkan kode SVG bersih.",
    stack: ["JavaScript", "HTML5", "CSS3"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 16,
    replies: [],
    isNew: false,
  },
  {
    id: "p10",
    title: "API Rate-Limit Guard",
    author: "bagas_sec",
    desc: "Middleware ringan berbasis Redis untuk melindungi endpoint REST API dari spam request.",
    stack: ["Node.js", "Redis", "Nginx"],
    bannerUrl: "",
    demoUrl: "https://api-community-web.vercel.app",
    applause: 14,
    replies: [],
    isNew: false,
  },
];

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      projects: INITIAL_SHOWCASE_PROJECTS,
      likedProjectIds: [],
      feedPosts: INITIAL_THREADS,
      loginDemo: ({ username, email, bio, role }) =>
        set((state) => ({
          user: {
            username: username || email.split("@")[0],
            email,
            bio:
              bio !== undefined
                ? bio
                : state.user?.bio ||
                  "Full-stack web developer & pegiat komunitas Anak Programmer Indonesia.",
            role:
              role !== undefined
                ? role
                : state.user?.role || "Full-Stack Developer",
          },
          token: "demo-jwt-token",
        })),
      logout: () => set({ user: null, token: null }),
      setProjects: (updater) =>
        set((state) => ({
          projects:
            typeof updater === "function" ? updater(state.projects) : updater,
        })),
      toggleProjectLike: (id) =>
        set((state) => {
          const liked = state.likedProjectIds.includes(id);
          return {
            likedProjectIds: liked
              ? state.likedProjectIds.filter((x) => x !== id)
              : [...state.likedProjectIds, id],
            projects: state.projects.map((p) =>
              p.id === id
                ? { ...p, applause: p.applause + (liked ? -1 : 1) }
                : p
            ),
          };
        }),
      addFeedPost: (post) =>
        set((state) => ({
          feedPosts: [post, ...state.feedPosts],
        })),
    }),
    { name: "api-community-auth" }
  )
);
