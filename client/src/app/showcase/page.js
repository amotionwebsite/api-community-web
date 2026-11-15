"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoTerminal, IoStar, IoArrowForward, IoAdd, IoClose } from "react-icons/io5";

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
    <div className="min-h-screen bg-[#0d0814] text-[#ede6f5] relative overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 12px 12px, #c4a6e8 1.5px, transparent 1.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-[#361d54]/50 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-3 z-50 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#160e24]/75 backdrop-blur-xl border border-[#4a3169]/60 shadow-[0_8px_32px_rgba(10,5,18,0.65)] flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-b from-[#6f499c] to-[#26143d] border border-[#a986d4]/40 flex items-center justify-center shrink-0">
              <IoTerminal className="text-[#f3ebfc] text-base" />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-[#f3ebfc] truncate">
              Anak Programmer ID
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-[#c7b5db] shrink-0">
            <Link href="/forum" className="hover:text-[#e5d4f7] transition">
              Forum
            </Link>
            <Link href="/showcase" className="text-[#c4a6e8] font-semibold">
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#57367d] to-[#2d1947] border border-[#9d75cb]/40 text-[#f3ebfc] font-medium"
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
            <div className="text-xs font-mono text-[#9d75cb] mb-1">
              ~/showcase/karya-member
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#e5d4f7] via-[#b58ee0] to-[#6f499c] bg-clip-text text-transparent">
              Pamer Side-Project & Portofolio
            </h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5e3b87] to-[#291642] border border-[#9d75cb]/45 text-[#f7f2fc] text-xs sm:text-sm font-semibold shadow-lg shadow-[#0a0512]/70 hover:brightness-110 transition w-fit"
          >
            {showForm ? (
              <>
                <IoClose className="text-base" />
                <span>Tutup Form</span>
              </>
            ) : (
              <>
                <IoAdd className="text-base" />
                <span>Pajang Karya</span>
              </>
            )}
          </button>
        </div>

        {/* Form Submit Project */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleAddProject}
              className="mb-8 p-5 rounded-2xl bg-[#180f26]/85 backdrop-blur-xl border border-[#5a3d7a]/70 shadow-2xl space-y-4"
            >
              <div>
                <label className="block text-xs font-mono text-[#c4a6e8] mb-1.5">
                  Nama Project
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Aplikasi Kasir UMKM Berbasis Web"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0817]/90 border border-[#4a3169]/70 text-sm text-[#f3ebfc] placeholder-[#6c5685] focus:outline-none focus:border-[#9d75cb]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#c4a6e8] mb-1.5">
                    Tech Stack (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={stackInput}
                    onChange={(e) => setStackInput(e.target.value)}
                    placeholder="Next.js, Tailwind, Express"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0817]/90 border border-[#4a3169]/70 text-sm text-[#f3ebfc] placeholder-[#6c5685] focus:outline-none focus:border-[#9d75cb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#c4a6e8] mb-1.5">
                    Link Demo / GitHub
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0817]/90 border border-[#4a3169]/70 text-sm text-[#f3ebfc] placeholder-[#6c5685] focus:outline-none focus:border-[#9d75cb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#c4a6e8] mb-1.5">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan fitur utama atau masalah yang diselesaikan project ini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0817]/90 border border-[#4a3169]/70 text-sm text-[#f3ebfc] placeholder-[#6c5685] focus:outline-none focus:border-[#9d75cb]"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5e3b87] to-[#341f52] border border-[#9d75cb]/40 hover:brightness-110 text-white text-xs sm:text-sm font-semibold transition"
              >
                Publish ke Showcase
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Grid Kartu Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-3xl bg-gradient-to-br from-[#1b112b]/90 to-[#110a1c]/95 border border-[#4a3169]/55 hover:border-[#8c64ba]/70 backdrop-blur-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#826b9c] mb-3">
                  <span>@{project.author}</span>
                  <span className="inline-flex items-center gap-1 text-[#c4a6e8]">
                    <IoStar className="text-xs" /> {project.likes} Apresiasi
                  </span>
                </div>

                <h2 className="font-bold text-lg text-[#f3ebfc] mb-2">
                  {project.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#b39ec9] leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#281940] border border-[#5a3d7a]/60 text-[#d4bcf0] text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c4a6e8] hover:text-[#f3ebfc] transition"
                >
                  <span>Lihat Source / Demo</span>
                  <IoArrowForward className="text-xs" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
