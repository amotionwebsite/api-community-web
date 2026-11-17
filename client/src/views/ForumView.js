"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatTeardropText,
  Plus,
  CheckCircle,
  Clock,
  X,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

const INITIAL_THREADS = [
  {
    id: 1,
    title: "Error CORS saat fetch API Express dari Next.js di Vercel",
    category: "Bug & Error",
    author: "rizky_dev",
    time: "12 menit lalu",
    replies: 8,
    solved: true,
    excerpt:
      "Sudah pasang cors() di server.js tapi pas deploy ke Railway masih kena blokir origin dari domain Vercel...",
  },
  {
    id: 2,
    title: "Setup Termux + Acode paling ringan buat ngoding fullstack di HP",
    category: "Workflow",
    author: "anak_termux",
    time: "1 jam lalu",
    replies: 19,
    solved: false,
    excerpt:
      "Sharing konfigurasi storage link, git credential helper, dan shortcut keyboard Acode biar ngoding di Android sat-set.",
  },
  {
    id: 3,
    title: "Mending pakai Zustand atau Context API untuk state auth JWT?",
    category: "Diskusi Tech",
    author: "nadia.tsx",
    time: "3 jam lalu",
    replies: 14,
    solved: true,
    excerpt:
      "Lagi bikin dashboard multi-role, ragu antara simpan token + profile user di Zustand persist atau cukup React Context.",
  },
];

const CATEGORIES = ["Semua", "Bug & Error", "Diskusi Tech", "Workflow"];

export default function ForumView() {
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bug & Error");
  const [excerpt, setExcerpt] = useState("");

  const filteredThreads =
    activeCategory === "Semua"
      ? threads
      : threads.filter((t) => t.category === activeCategory);

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      category,
      author: "kamu_dev",
      time: "Baru saja",
      replies: 0,
      solved: false,
      excerpt: excerpt.trim(),
    };
    setThreads([newItem, ...threads]);
    setTitle("");
    setExcerpt("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#09050f] text-[#f7f2fa] flex flex-col justify-between selection:bg-orange-500/35">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto w-full px-4 sm:px-5 pt-10 pb-20 flex-1"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/[0.08]">
          <h1
            style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
            className="text-3xl sm:text-4xl font-normal tracking-wide text-[#faf5ff]"
          >
            Diskusi &amp; Tanya Error
          </h1>

          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundImage:
                "linear-gradient(135deg, #F56A00 0%, #FA8B01 40%, #9D4EDD 82%, #72369D 100%)",
            }}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold shadow-[0_6px_20px_rgba(245,106,0,0.25)]"
          >
            {showForm ? <X weight="bold" /> : <Plus weight="bold" />}
            <span>{showForm ? "Tutup Form" : "Buat Thread Baru"}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleCreateThread}
              className="overflow-hidden border-b border-white/[0.08]"
            >
              <div className="py-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Judul pertanyaan atau topik diskusi..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-orange-400/60 outline-none text-sm text-white placeholder:text-[#7d698f]"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#130b1f] border border-white/10 focus:border-orange-400/60 outline-none text-sm text-[#e9d8f5]"
                  >
                    <option value="Bug & Error">Bug &amp; Error</option>
                    <option value="Diskusi Tech">Diskusi Tech</option>
                    <option value="Workflow">Workflow</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Jelaskan detail error, potongan kode, atau konteks diskusi..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-orange-400/60 outline-none text-sm text-white placeholder:text-[#7d698f]"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F56A00] hover:bg-[#FA8B01] text-white text-xs sm:text-sm font-semibold transition"
                  >
                    Posting Diskusi
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 overflow-x-auto py-5 border-b border-white/[0.08]">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                  active
                    ? "bg-orange-500/20 text-[#FFCF70] border border-orange-400/40"
                    : "text-[#9f8bb0] hover:text-white border border-transparent"
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        <div className="divide-y divide-white/[0.08]">
          {filteredThreads.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="text-[#FA8B01]">[{item.category}]</span>
                  {item.solved ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <CheckCircle weight="fill" /> Terpecahkan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[#CEA7EE]">
                      <Clock weight="duotone" /> Terbuka
                    </span>
                  )}
                  <span className="text-[#7d698f]">
                    • @{item.author} • {item.time}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#faf5ff] group-hover:text-[#FFAD03] transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#a894b8] leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-[#cbb6d9]">
                <ChatTeardropText weight="duotone" className="text-base text-[#FA8B01]" />
                <span>{item.replies} Balasan</span>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.main>

      <footer className="border-t border-white/[0.08] py-6 px-4 text-center text-xs font-mono text-[#887499]">
        © 2026{" "}
        <span
          style={{ fontFamily: "var(--font-utendo), sans-serif" }}
          className="text-[#cbb6d9]"
        >
          Anak Programmer Indonesia
        </span>
      </footer>
    </div>
  );
}
