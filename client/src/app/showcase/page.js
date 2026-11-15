"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  IoHomeOutline,
  IoChevronBack,
  IoStarOutline,
  IoChevronForward,
  IoAddOutline,
  IoCloseOutline,
} from "react-icons/io5";

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
  const [errors, setErrors] = useState({ title: false, description: false });
  const [shakeKey, setShakeKey] = useState(0);

  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#11091c", "#1d1030", "#0d0617"]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleAddProject = (e) => {
    e.preventDefault();
    const titleEmpty = !title.trim();
    const descEmpty = !description.trim();

    if (titleEmpty || descEmpty) {
      setErrors({ title: titleEmpty, description: descEmpty });
      setShakeKey((prev) => prev + 1);
      return;
    }

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
    setErrors({ title: false, description: false });
    setShowForm(false);
  };

  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      className="min-h-screen text-[#f0e8fa] relative overflow-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `radial-gradient(circle at 14px 14px, #c8a8ed 1.4px, transparent 1.4px), radial-gradient(circle at 0px 0px, #7854a3 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          style={{ y: glowY }}
          className="absolute top-16 -left-24 w-[420px] h-[420px] rounded-full bg-[#4c2b73]/45 blur-[130px]"
        />
        <div className="absolute bottom-0 -right-24 w-[400px] h-[400px] rounded-full bg-[#331a52]/55 blur-[130px]" />
      </div>

      <header className="sticky top-3 z-50 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#1b102b]/75 backdrop-blur-xl border border-[#67468f]/55 shadow-[0_8px_32px_rgba(12,6,23,0.65)] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              title="Kembali ke Beranda"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#2a1942]/80 hover:bg-[#392259] border border-[#7854a3]/50 text-[#e1cff7] text-xs font-medium transition-all active:scale-95 shrink-0"
            >
              <IoChevronBack className="text-sm" />
              <IoHomeOutline className="text-sm" />
            </Link>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-[#f5effc] truncate">
              Anak Programmer ID
            </span>
          </div>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-[#d2bfe8] shrink-0">
            <Link href="/forum" className="hover:text-[#f5effc] transition">
              Forum
            </Link>
            <Link href="/showcase" className="text-[#d4bcf0] font-semibold">
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#66438f] to-[#361e54] border border-[#b48ee0]/40 text-[#f5effc] font-medium"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      {/* Backdrop Blur saat Form Terbuka */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            className="fixed inset-0 z-20 bg-[#090412]/55 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <main className="relative z-30 max-w-5xl mx-auto px-4 pt-10 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-[#b48ee0] mb-1">
              ~/showcase/karya-member
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#f2e8fc] via-[#c8a8ed] to-[#7d56ab] bg-clip-text text-transparent">
              Pamer Side-Project & Portofolio
            </h1>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setErrors({ title: false, description: false });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6c4896] to-[#341c52] border border-[#b48ee0]/45 text-[#faf6ff] text-xs sm:text-sm font-semibold shadow-lg shadow-[#11091c]/70 hover:brightness-110 transition w-fit"
          >
            {showForm ? (
              <>
                <IoCloseOutline className="text-lg" />
                <span>Tutup Form</span>
              </>
            ) : (
              <>
                <IoAddOutline className="text-lg" />
                <span>Pajang Karya</span>
              </>
            )}
          </button>
        </div>

        {/* Form Glassmorphism dengan Validasi Merah Getar */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              noValidate
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleAddProject}
              className="mb-8 p-5 sm:p-6 rounded-3xl bg-[#221336]/65 backdrop-blur-2xl border border-[#9d75cb]/45 shadow-[0_20px_50px_rgba(8,3,16,0.85)] space-y-4 relative z-30"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#d4bcf0]">
                    Nama Project
                  </label>
                  {errors.title && (
                    <span className="text-[11px] font-mono text-rose-400">
                      * Nama project wajib diisi
                    </span>
                  )}
                </div>
                <motion.input
                  key={`proj-title-${shakeKey}`}
                  animate={
                    errors.title ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
                  }
                  transition={{ duration: 0.35 }}
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title)
                      setErrors((prev) => ({ ...prev, title: false }));
                  }}
                  placeholder="Contoh: Aplikasi Kasir UMKM Berbasis Web"
                  className={`w-full px-3.5 py-2.5 rounded-xl backdrop-blur-md text-sm text-[#f5effc] placeholder-[#82689e] focus:outline-none transition-colors border ${
                    errors.title
                      ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus:border-[#b48ee0]"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#d4bcf0] mb-1.5">
                    Tech Stack (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={stackInput}
                    onChange={(e) => setStackInput(e.target.value)}
                    placeholder="Next.js, Tailwind, Express"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120a1f]/75 backdrop-blur-md border border-[#5e3e85]/70 text-sm text-[#f5effc] placeholder-[#82689e] focus:outline-none focus:border-[#b48ee0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#d4bcf0] mb-1.5">
                    Link Demo / GitHub
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120a1f]/75 backdrop-blur-md border border-[#5e3e85]/70 text-sm text-[#f5effc] placeholder-[#82689e] focus:outline-none focus:border-[#b48ee0]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#d4bcf0]">
                    Deskripsi Singkat
                  </label>
                  {errors.description && (
                    <span className="text-[11px] font-mono text-rose-400">
                      * Deskripsi wajib diisi
                    </span>
                  )}
                </div>
                <motion.textarea
                  key={`proj-desc-${shakeKey}`}
                  animate={
                    errors.description ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
                  }
                  transition={{ duration: 0.35 }}
                  rows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description)
                      setErrors((prev) => ({ ...prev, description: false }));
                  }}
                  placeholder="Ceritakan fitur utama atau masalah yang diselesaikan project ini..."
                  className={`w-full px-3.5 py-2.5 rounded-xl backdrop-blur-md text-sm text-[#f5effc] placeholder-[#82689e] focus:outline-none transition-colors border ${
                    errors.description
                      ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus:border-[#b48ee0]"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6c4896] to-[#3d235e] border border-[#b48ee0]/45 hover:brightness-110 text-white text-xs sm:text-sm font-semibold transition"
              >
                Publish ke Showcase
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-3xl bg-gradient-to-br from-[#231438]/90 to-[#140b21]/95 border border-[#67468f]/50 hover:border-[#a982d6]/75 backdrop-blur-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#967db5] mb-3">
                  <span>@{project.author}</span>
                  <span className="inline-flex items-center gap-1 text-[#d4bcf0]">
                    <IoStarOutline className="text-sm" /> {project.likes} Apresiasi
                  </span>
                </div>

                <h2 className="font-bold text-lg text-[#f5effc] mb-2">
                  {project.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#c1abd9] leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#311d4d] border border-[#7854a3]/55 text-[#e1cff7] text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d4bcf0] hover:text-[#f5effc] transition"
                >
                  <span>Lihat Source / Demo</span>
                  <IoChevronForward className="text-sm" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
