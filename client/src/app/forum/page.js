"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  IoHomeOutline,
  IoChevronBack,
  IoAddOutline,
  IoCloseOutline,
  IoChevronUpOutline,
  IoChatbubbleOutline,
  IoChevronDownOutline,
  IoCheckmarkOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";

const INITIAL_THREADS = [
  {
    id: 1,
    title: "Cara mengatasi CORS error saat fetch API Express dari Next.js?",
    category: "Bug & Error",
    author: "jason_dev",
    upvotes: 28,
    time: "2 jam lalu",
    preview:
      "Udah pasang app.use(cors()) di backend Node.js tapi pas di-deploy ke Vercel masih kena block origin...",
    repliesList: [
      {
        id: 101,
        author: "rizky_code",
        time: "1 jam lalu",
        text: "Pastikan origin di cors({ origin: 'https://domain-vercel-kamu.vercel.app' }) ditulis tanpa garis miring di akhir bro.",
      },
      {
        id: 102,
        author: "anak_termux",
        time: "45 menit lalu",
        text: "Cek juga header preflight OPTIONS-nya, kadang browser nge-block kalau credentials: true tapi origin masih '*'.",
      },
    ],
  },
  {
    id: 2,
    title: "Rekomendasi struktur folder Next.js App Router untuk project skala menengah",
    category: "Diskusi",
    author: "rizky_code",
    upvotes: 19,
    time: "5 jam lalu",
    preview:
      "Mending pisah folder components per fitur atau digabung semua dalam satu folder src/components?",
    repliesList: [
      {
        id: 201,
        author: "jason_dev",
        time: "3 jam lalu",
        text: "Kalau udah di atas 15 halaman, mending kelompokkan per fitur biar gampang nyarinya pas ngoding di HP.",
      },
    ],
  },
  {
    id: 3,
    title: "Tips optimasi Termux biar ngoding React/Next.js di HP nggak cepat panas",
    category: "Tips & Trik",
    author: "anak_termux",
    upvotes: 45,
    time: "1 hari lalu",
    preview:
      "Sharing pengalaman ngoding fullstack dari Android pakai Acode + Termux tanpa lag...",
    repliesList: [
      {
        id: 301,
        author: "droid_coder",
        time: "18 jam lalu",
        text: "Pakai flag --webpack di next dev jauh lebih adem daripada turbopack di Termux!",
      },
    ],
  },
];

const FORM_CATEGORIES = ["Bug & Error", "Diskusi", "Tips & Trik"];

export default function ForumPage() {
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showForm, setShowForm] = useState(false);

  // Form states & validasi getar merah
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bug & Error");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: false, content: false });
  const [shakeKey, setShakeKey] = useState(0);

  // State untuk membuka balasan per thread
  const [openRepliesId, setOpenRepliesId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});
  const [replyErrors, setReplyErrors] = useState({});
  const [replyShakeKey, setReplyShakeKey] = useState(0);

  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#11091c", "#1d1030", "#0d0617"]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const categories = ["Semua", "Bug & Error", "Diskusi", "Tips & Trik"];

  const filteredThreads =
    selectedCategory === "Semua"
      ? threads
      : threads.filter((t) => t.category === selectedCategory);

  const handleCreateThread = (e) => {
    e.preventDefault();
    const titleEmpty = !title.trim();
    const contentEmpty = !content.trim();

    if (titleEmpty || contentEmpty) {
      setErrors({ title: titleEmpty, content: contentEmpty });
      setShakeKey((prev) => prev + 1);
      return;
    }

    const newThread = {
      id: Date.now(),
      title,
      category,
      author: "member_baru",
      upvotes: 1,
      time: "Baru saja",
      preview: content,
      repliesList: [],
    };

    setThreads([newThread, ...threads]);
    setTitle("");
    setContent("");
    setErrors({ title: false, content: false });
    setShowForm(false);
    setIsDropdownOpen(false);
  };

  const handleSendReply = (e, threadId) => {
    e.preventDefault();
    const text = (replyInputs[threadId] || "").trim();

    if (!text) {
      setReplyErrors((prev) => ({ ...prev, [threadId]: true }));
      setReplyShakeKey((prev) => prev + 1);
      return;
    }

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              repliesList: [
                ...t.repliesList,
                {
                  id: Date.now(),
                  author: "kamu",
                  time: "Baru saja",
                  text,
                },
              ],
            }
          : t
      )
    );

    setReplyInputs((prev) => ({ ...prev, [threadId]: "" }));
    setReplyErrors((prev) => ({ ...prev, [threadId]: false }));
  };

  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      className="min-h-screen text-[#f0e8fa] relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Background Nuansa Batik */}
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
          className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-[#4c2b73]/45 blur-[130px]"
        />
        <div className="absolute bottom-10 -left-20 w-[380px] h-[380px] rounded-full bg-[#331a52]/55 blur-[130px]" />
      </div>

      {/* Navbar */}
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
            <Link href="/forum" className="text-[#d4bcf0] font-semibold">
              Forum
            </Link>
            <Link href="/showcase" className="hover:text-[#f5effc] transition">
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

      {/* Main Forum Content */}
      <main className="relative z-30 max-w-5xl mx-auto px-4 pt-10 pb-20">
        {/* Header & Tombol Buat Thread */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-[#b48ee0] mb-1">
              ~/forum/diskusi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#f2e8fc] via-[#c8a8ed] to-[#7d56ab] bg-clip-text text-transparent">
              Forum Diskusi & Tanya Error
            </h1>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setErrors({ title: false, content: false });
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
                <span>Buat Diskusi Baru</span>
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
              onSubmit={handleCreateThread}
              className="mb-8 p-5 sm:p-6 rounded-3xl bg-[#221336]/65 backdrop-blur-2xl border border-[#9d75cb]/45 shadow-[0_20px_50px_rgba(8,3,16,0.85)] space-y-4 relative z-30"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#d4bcf0]">
                    Judul Pertanyaan / Topik
                  </label>
                  {errors.title && (
                    <span className="text-[11px] font-mono text-rose-400">
                      * Judul wajib diisi
                    </span>
                  )}
                </div>
                <motion.input
                  key={`title-${shakeKey}`}
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
                  placeholder="Contoh: Error saat connect MongoDB Atlas di Node.js..."
                  className={`w-full px-3.5 py-2.5 rounded-xl backdrop-blur-md text-sm text-[#f5effc] placeholder-[#82689e] focus:outline-none transition-colors border ${
                    errors.title
                      ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus:border-[#b48ee0]"
                  }`}
                />
              </div>

              {/* Custom Glassmorphism Dropdown */}
              <div className="relative">
                <label className="block text-xs font-mono text-[#d4bcf0] mb-1.5">
                  Kategori
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#180d29]/80 backdrop-blur-md border border-[#7854a3]/65 hover:border-[#b48ee0] text-sm text-[#f5effc] flex items-center justify-between transition"
                >
                  <span>{category}</span>
                  <motion.span
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoChevronDownOutline className="text-[#d4bcf0]" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 right-0 mt-2 z-40 rounded-2xl bg-[#25163b]/90 backdrop-blur-2xl border border-[#8e67bd]/65 shadow-[0_12px_36px_rgba(10,5,18,0.85)] overflow-hidden p-1.5 space-y-1"
                    >
                      {FORM_CATEGORIES.map((item) => {
                        const active = category === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setCategory(item);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-sm flex items-center justify-between transition ${
                              active
                                ? "bg-[#5a3b82]/75 text-white font-semibold border border-[#b48ee0]/45"
                                : "text-[#d2bfe8] hover:bg-[#352052]/75 hover:text-white"
                            }`}
                          >
                            <span>{item}</span>
                            {active && (
                              <IoCheckmarkOutline className="text-[#e1cff7] text-base" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#d4bcf0]">
                    Detail Masalah / Kode
                  </label>
                  {errors.content && (
                    <span className="text-[11px] font-mono text-rose-400">
                      * Detail wajib diisi
                    </span>
                  )}
                </div>
                <motion.textarea
                  key={`content-${shakeKey}`}
                  animate={
                    errors.content ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
                  }
                  transition={{ duration: 0.35 }}
                  rows={4}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content)
                      setErrors((prev) => ({ ...prev, content: false }));
                  }}
                  placeholder="Jelaskan detail error atau paste potongan kode di sini..."
                  className={`w-full px-3.5 py-2.5 rounded-xl backdrop-blur-md text-sm text-[#f5effc] placeholder-[#82689e] focus:outline-none transition-colors border ${
                    errors.content
                      ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus:border-[#b48ee0]"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6c4896] to-[#3d235e] border border-[#b48ee0]/45 hover:brightness-110 text-white text-xs sm:text-sm font-semibold transition"
              >
                Posting Diskusi
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Filter Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap backdrop-blur-md border transition ${
                selectedCategory === cat
                  ? "bg-[#5a3b82]/85 border-[#b48ee0] text-[#faf6ff] shadow-md shadow-[#140a24]"
                  : "bg-[#1f1230]/70 border-[#57397a]/55 text-[#b8a2d1] hover:text-[#f5effc]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List Thread Diskusi (Tanpa Solved & Balasan Interaktif Smooth) */}
        <div className="space-y-3.5">
          {filteredThreads.map((thread, idx) => {
            const isRepliesOpen = openRepliesId === thread.id;
            const hasReplyError = replyErrors[thread.id];

            return (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#231438]/90 to-[#140b21]/95 border border-[#67468f]/50 hover:border-[#a982d6]/75 backdrop-blur-md transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#311d4d] border border-[#7854a3]/55 text-[#d4bcf0] font-mono">
                    {thread.category}
                  </span>
                  <span className="text-[#967db5] font-mono">
                    @{thread.author} • {thread.time}
                  </span>
                </div>

                <h2 className="font-bold text-base sm:text-lg text-[#f5effc] mb-1.5">
                  {thread.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#c1abd9] leading-relaxed mb-4">
                  {thread.preview}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-[#ab94c7]">
                  <span className="inline-flex items-center gap-1 text-[#d4bcf0]">
                    <IoChevronUpOutline className="text-sm" /> {thread.upvotes} Upvote
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenRepliesId(isRepliesOpen ? null : thread.id)
                    }
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                      isRepliesOpen
                        ? "bg-[#4a2f6e]/70 border-[#b48ee0]/60 text-[#faf6ff]"
                        : "bg-[#241538]/70 border-[#5a3d7a]/50 text-[#d4bcf0] hover:border-[#9d75cb]"
                    }`}
                  >
                    <IoChatbubbleOutline className="text-sm" />
                    <span>{thread.repliesList.length} Balasan</span>
                    <motion.span
                      animate={{ rotate: isRepliesOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <IoChevronDownOutline className="text-xs" />
                    </motion.span>
                  </button>
                </div>

                {/* Accordion Balasan Smooth */}
                <AnimatePresence initial={false}>
                  {isRepliesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-[#4a3169]/60 space-y-3">
                        {thread.repliesList.length === 0 ? (
                          <p className="text-xs font-mono text-[#8e76ab]">
                            Belum ada balasan. Jadilah yang pertama membantu!
                          </p>
                        ) : (
                          thread.repliesList.map((rep) => (
                            <div
                              key={rep.id}
                              className="p-3.5 rounded-xl bg-[#160d24]/80 border border-[#4a3169]/55"
                            >
                              <div className="flex items-center justify-between text-[11px] font-mono text-[#9d75cb] mb-1">
                                <span>@{rep.author}</span>
                                <span>{rep.time}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-[#e1cff7] leading-relaxed">
                                {rep.text}
                              </p>
                            </div>
                          ))
                        )}

                        {/* Input Kirim Balasan Baru */}
                        <form
                          noValidate
                          onSubmit={(e) => handleSendReply(e, thread.id)}
                          className="flex items-center gap-2 pt-1"
                        >
                          <motion.input
                            key={`reply-${thread.id}-${replyShakeKey}`}
                            animate={
                              hasReplyError
                                ? { x: [0, -6, 6, -4, 4, 0] }
                                : { x: 0 }
                            }
                            transition={{ duration: 0.35 }}
                            type="text"
                            value={replyInputs[thread.id] || ""}
                            onChange={(e) => {
                              setReplyInputs((prev) => ({
                                ...prev,
                                [thread.id]: e.target.value,
                              }));
                              if (hasReplyError) {
                                setReplyErrors((prev) => ({
                                  ...prev,
                                  [thread.id]: false,
                                }));
                              }
                            }}
                            placeholder="Tulis balasan atau solusi..."
                            className={`flex-1 px-3.5 py-2 rounded-xl backdrop-blur-md text-xs sm:text-sm text-[#f5effc] placeholder-[#7f669c] focus:outline-none border transition-colors ${
                              hasReplyError
                                ? "bg-rose-950/30 border-rose-500/80"
                                : "bg-[#120a1f]/80 border-[#5e3e85]/70 focus:border-[#b48ee0]"
                            }`}
                          />
                          <button
                            type="submit"
                            className="p-2.5 rounded-xl bg-gradient-to-r from-[#6c4896] to-[#3d235e] border border-[#b48ee0]/45 text-white hover:brightness-110 transition active:scale-95 shrink-0"
                            title="Kirim Balasan"
                          >
                            <IoPaperPlaneOutline className="text-base" />
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>
    </motion.div>
  );
}
