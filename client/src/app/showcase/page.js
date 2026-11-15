"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "aMotion — Bio-Link & Digital Card Platform",
    author: "jason_dev",
    stack: ["Next.js", "Tailwind", "Node.js", "MongoDB"],
    likes: 42,
    demoUrl: "https://github.com/amotionwebsite",
    description:
      "Platform bio-link kustom dengan tema glassmorphism dark mode, slot grid interaktif, dan preview media.",
  },
  {
    id: 2,
    title: "WA-Guard Bot — Anti-Spam & Moderasi Grup",
    author: "api_moderator",
    stack: ["Node.js", "Baileys", "PM2"],
    likes: 31,
    demoUrl: "https://github.com/amotionwebsite",
    description:
      "Bot otomatis untuk filter link promosi liar dan welcome message di grup WhatsApp komunitas.",
  },
  {
    id: 3,
    title: "Termux-Mon — Pantau RAM & CPU Server dari HP",
    author: "droid_coder",
    stack: ["React", "Express", "Socket.io"],
    likes: 27,
    demoUrl: "https://github.com/amotionwebsite",
    description:
      "Dashboard ringan real-time buat mantau proses PM2 dan penggunaan memori HP saat nge-host script.",
  },
];

export default function ShowcasePage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [stackInput, setStackInput] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const stackArray = stackInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newProject = {
      id: Date.now(),
      title,
      author: "member_api",
      stack: stackArray.length > 0 ? stackArray : ["Web App"],
      likes: 1,
      demoUrl: demoUrl.trim() || "#",
      description,
    };

    setProjects([newProject, ...projects]);
    setTitle("");
    setStackInput("");
    setDemoUrl("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#05030a] text-slate-100 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#2e1065_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-purple-950/50 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-3 z-50 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#0c0718]/80 backdrop-blur-xl border border-violet-900/40 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-7 h-7 rounded-lg object-cover border border-violet-500/30 shrink-0"
            />
            <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-100 truncate">
              Anak Programmer ID
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-300 shrink-0">
            <Link href="/forum" className="hover:text-violet-300 transition">
              Forum
            </Link>
            <Link href="/showcase" className="text-violet-400 font-semibold">
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-800 to-purple-950 border border-violet-500/30 text-violet-100 font-medium"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-20">
        {/* Header & Tombol Submit Karya */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-violet-400 mb-1">
              ~/showcase/karya-member
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-200 via-violet-400 to-purple-700 bg-clip-text text-transparent">
              Pamer Side-Project & Portofolio
            </h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-700 to-purple-950 border border-violet-500/40 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-violet-950/50 hover:brightness-110 transition w-fit"
          >
            {showForm ? "Tutup Form" : "+ Pajang Karya"}
          </button>
        </div>

        {/* Form Submit Project */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddProject}
            className="mb-8 p-5 rounded-2xl bg-[#0e081c] border border-violet-700/50 space-y-4"
          >
            <div>
              <label className="block text-xs font-mono text-violet-300 mb-1.5">
                Nama Project
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Aplikasi Kasir UMKM Berbasis Web"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-violet-300 mb-1.5">
                  Tech Stack (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="Next.js, Tailwind, Express"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-violet-300 mb-1.5">
                  Link Demo / GitHub
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-violet-300 mb-1.5">
                Deskripsi Singkat
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan fitur utama atau masalah yang diselesaikan project ini..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-600 text-white text-xs sm:text-sm font-semibold transition"
            >
              Publish ke Showcase
            </button>
          </motion.form>
        )}

        {/* Grid Kartu Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-3xl bg-gradient-to-br from-[#100921] to-[#080412] border border-violet-900/40 hover:border-violet-600/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                  <span>@{project.author}</span>
                  <span className="text-violet-400">★ {project.likes} Apresiasi</span>
                </div>

                <h2 className="font-bold text-lg text-slate-100 mb-2">
                  {project.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-violet-950/80 border border-violet-800/40 text-violet-300 text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 hover:text-violet-200 transition"
                >
                  <span>Lihat Source / Demo</span>
                  <span>-&gt;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
