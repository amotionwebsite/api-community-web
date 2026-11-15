"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoTerminal,
  IoAdd,
  IoClose,
  IoCheckmarkCircle,
  IoCaretUp,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";

const INITIAL_THREADS = [
  {
    id: 1,
    title: "Cara mengatasi CORS error saat fetch API Express dari Next.js?",
    category: "Bug & Error",
    author: "jason_dev",
    replies: 12,
    upvotes: 28,
    time: "2 jam lalu",
    solved: true,
    preview:
      "Udah pasang app.use(cors()) di backend Node.js tapi pas di-deploy ke Vercel masih kena block origin...",
  },
  {
    id: 2,
    title: "Rekomendasi struktur folder Next.js App Router untuk project skala menengah",
    category: "Diskusi",
    author: "rizky_code",
    replies: 8,
    upvotes: 19,
    time: "5 jam lalu",
    solved: false,
    preview:
      "Mending pisah folder components per fitur atau digabung semua dalam satu folder src/components?",
  },
  {
    id: 3,
    title: "Tips optimasi Termux biar ngoding React/Next.js di HP nggak cepat panas",
    category: "Tips & Trik",
    author: "anak_termux",
    replies: 21,
    upvotes: 45,
    time: "1 hari lalu",
    solved: true,
    preview:
      "Sharing pengalaman ngoding fullstack dari Android pakai Acode + Termux tanpa lag...",
  },
];

export default function ForumPage() {
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bug & Error");
  const [content, setContent] = useState("");

  const categories = ["Semua", "Bug & Error", "Diskusi", "Tips & Trik"];

  const filteredThreads =
    selectedCategory === "Semua"
      ? threads
      : threads.filter((t) => t.category === selectedCategory);

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newThread = {
      id: Date.now(),
      title,
      category,
      author: "member_baru",
      replies: 0,
      upvotes: 1,
      time: "Baru saja",
      solved: false,
      preview: content,
    };

    setThreads([newThread, ...threads]);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#05030a] text-slate-100 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#2e1065_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-violet-900/35 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-3 z-50 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#0c0718]/80 backdrop-blur-xl border border-violet-900/40 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-b from-violet-600 to-purple-950 border border-violet-400/30 shadow-[0_2px_10px_rgba(109,40,217,0.45)] flex items-center justify-center shrink-0">
              <IoTerminal className="text-white text-base" />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-100 truncate">
              Anak Programmer ID
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-300 shrink-0">
            <Link href="/forum" className="text-violet-400 font-semibold">
              Forum
            </Link>
            <Link href="/showcase" className="hover:text-violet-300 transition">
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

      {/* Main Forum Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-20">
        {/* Header & Tombol Buat Thread */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-violet-400 mb-1">
              ~/forum/diskusi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-200 via-violet-400 to-purple-700 bg-clip-text text-transparent">
              Forum Diskusi & Tanya Error
            </h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-700 to-purple-950 border border-violet-500/40 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-violet-950/50 hover:brightness-110 transition w-fit"
          >
            {showForm ? (
              <>
                <IoClose className="text-base" />
                <span>Tutup Form</span>
              </>
            ) : (
              <>
                <IoAdd className="text-base" />
                <span>Buat Diskusi Baru</span>
              </>
            )}
          </button>
        </div>

        {/* Form Buat Diskusi Baru */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreateThread}
            className="mb-8 p-5 rounded-2xl bg-[#0e081c] border border-violet-700/50 space-y-4"
          >
            <div>
              <label className="block text-xs font-mono text-violet-300 mb-1.5">
                Judul Pertanyaan / Topik
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Error saat connect MongoDB Atlas di Node.js..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-violet-300 mb-1.5">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Bug & Error">Bug & Error</option>
                <option value="Diskusi">Diskusi</option>
                <option value="Tips & Trik">Tips & Trik</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-violet-300 mb-1.5">
                Detail Masalah / Kode
              </label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Jelaskan detail error atau paste potongan kode di sini..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07040f] border border-violet-900/60 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-600 text-white text-xs sm:text-sm font-semibold transition"
            >
              Posting Diskusi
            </button>
          </motion.form>
        )}

        {/* Filter Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap border transition ${
                selectedCategory === cat
                  ? "bg-violet-800/70 border-violet-500 text-white"
                  : "bg-[#0d071a] border-violet-900/40 text-slate-400 hover:text-violet-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List Thread Diskusi */}
        <div className="space-y-3.5">
          {filteredThreads.map((thread, idx) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#0f0820] to-[#080412] border border-violet-900/40 hover:border-violet-600/50 transition"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-violet-950 border border-violet-800/50 text-violet-300 font-mono">
                  {thread.category}
                </span>
                {thread.solved && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-700/40 text-emerald-400 font-mono">
                    <IoCheckmarkCircle className="text-xs" /> Solved
                  </span>
                )}
                <span className="text-slate-500 font-mono ml-auto">
                  @{thread.author} • {thread.time}
                </span>
              </div>

              <h2 className="font-bold text-base sm:text-lg text-slate-100 mb-1.5">
                {thread.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4">
                {thread.preview}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="inline-flex items-center gap-1 text-violet-400">
                  <IoCaretUp className="text-sm" /> {thread.upvotes} Upvote
                </span>
                <span className="inline-flex items-center gap-1">
                  <IoChatbubbleEllipsesOutline className="text-sm" /> {thread.replies} Balasan
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
