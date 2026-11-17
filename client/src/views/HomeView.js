"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CaretRight,
  Quotes,
  Info,
  Copy,
  Check,
  Target,
  CheckCircle,
} from "@phosphor-icons/react";
import { MOTIVATIONAL_QUOTES } from "../data/quotes";

const FULL_TEXT = "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.";

export default function HomeView() {
  const [typedText, setTypedText] = useState("");
  const [showBrandText, setShowBrandText] = useState(true);
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#12081c", "#1f0e29", "#0e0617"]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.55, 0.3]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[randomIndex]);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) {
        clearInterval(interval);
      }
    }, 62);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowBrandText(false);
      setTimeout(() => {
        setShowBrandText(true);
      }, 900);
    }, 30000);

    return () => clearInterval(cycleInterval);
  }, []);

  const handleCopyQuote = async () => {
    const textToCopy = `"${quote.text}" — ${quote.author}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      className="min-h-screen text-[#f8f0fc] relative overflow-hidden flex flex-col justify-between selection:bg-orange-500/40 selection:text-white transition-colors duration-300"
    >
      {/* Ambient Background Gradasi Orange - Ungu Halus */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 14px 14px, #fdba74 1.3px, transparent 1.3px), radial-gradient(circle at 0px 0px, #a855f7 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          style={{ y: glowY, opacity: glowOpacity }}
          className="absolute -top-32 -left-24 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-orange-600/40 via-purple-800/45 to-transparent blur-[135px]"
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute bottom-0 -right-24 w-[440px] h-[440px] rounded-full bg-gradient-to-tl from-violet-900/60 via-orange-700/30 to-transparent blur-[140px]"
        />
      </div>

      {/* Floating Glass Navbar */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-50 px-2 sm:px-6"
      >
        <div className="max-w-5xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(12,5,24,0.65)] flex items-center justify-between gap-1.5">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 overflow-hidden">
            <motion.img
              src="/logoapi.png"
              alt="Logo Anak Programmer Indonesia"
              animate={{ scale: showBrandText ? 1 : 1.08 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 w-7 h-7 min-[380px]:w-8 min-[380px]:h-8 sm:w-9 sm:h-9 object-contain shrink-0"
            />

            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                {showBrandText && (
                  <motion.span
                    key="brand-text"
                    initial={{ x: -190, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -190, opacity: 0 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ fontFamily: "var(--font-utendo), sans-serif" }}
                    className="block text-[10.5px] min-[380px]:text-[11.5px] sm:text-base tracking-tight text-[#fdf6ff] whitespace-nowrap"
                  >
                    Anak Programmer Indonesia
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>

          <nav className="flex items-center gap-1.5 min-[380px]:gap-2.5 sm:gap-5 text-[10px] min-[380px]:text-[11px] sm:text-sm text-[#decce8] shrink-0">
            <Link
              href="/forum"
              className="hover:text-orange-300 transition-colors"
            >
              Forum
            </Link>
            <Link
              href="/showcase"
              className="hover:text-orange-300 transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-2 py-1 min-[380px]:px-2.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-orange-500/80 via-purple-700/80 to-violet-900/90 hover:brightness-110 border border-orange-300/30 text-white font-medium transition shadow-md shadow-purple-950/70 backdrop-blur-md"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-16 flex-1 flex flex-col justify-center">
        {/* Typing Heading dengan Font Coolvetica */}
        <div className="min-h-[135px] sm:min-h-[120px] mb-5 flex items-center">
          <motion.h1
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              fontFamily: "var(--font-coolvetica), sans-serif",
              backgroundImage:
                "linear-gradient(90deg, #fed7aa, #fb923c, #c084fc, #7e22ce, #fed7aa)",
              backgroundSize: "250% 250%",
            }}
            className="text-3xl sm:text-5xl font-normal tracking-wide leading-[1.2] bg-clip-text text-transparent"
          >
            {typedText}
          </motion.h1>
        </div>

        {/* Deskripsi Singkat */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-[#cbb6d9] text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
        >
          Ruang kolaborasi bawah tanah untuk programmer pemula hingga sepuh di
          Indonesia. Bedah error bareng, rilis side-project, dan temukan partner
          ngoding satu frekuensi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-3.5 mb-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/85 via-fuchsia-700/80 to-purple-900/90 border border-orange-300/35 text-white text-sm font-semibold shadow-[0_8px_28px_rgba(249,115,22,0.25)] hover:brightness-110 backdrop-blur-xl transition-all"
            >
              <span>Buka Forum Diskusi</span>
              <CaretRight weight="bold" className="text-orange-200 text-base" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <a
              href="https://discord.gg/7A5qtTpYT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-[#5865F2]/25 border border-white/15 hover:border-[#5865F2]/60 text-[#f2e6fa] text-sm font-semibold backdrop-blur-xl shadow-[0_8px_24px_rgba(88,101,242,0.15)] transition-all"
            >
              <motion.img
                src="/discordlogo.png"
                alt="Discord"
                animate={{
                  y: [0, -3, 0, 2, 0],
                  rotate: [0, -12, 12, -6, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-5 h-5 object-contain shrink-0"
              />
              <span>Gabung Discord Yuk!</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Section 1: Tentang Anak Programmer Indonesia */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="relative"
        >
          <div className="relative pl-5 sm:pl-8 pt-2 pb-10 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-orange-400 before:via-fuchsia-500 before:to-purple-800">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-300/90 mb-3">
              <motion.span
                animate={{
                  scale: [1, 1.18, 1],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center justify-center"
              >
                <Info weight="duotone" className="text-lg text-orange-400" />
              </motion.span>
              <span>Tentang Anak Programmer Indonesia</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#fdf6ff] leading-snug mb-4 max-w-2xl">
              Tumbuh dari baris kode pertama, tanpa batas perangkat maupun latar belakang.
            </h2>

            <p className="text-sm sm:text-base text-[#cbb6d9] leading-relaxed max-w-3xl mb-7">
              <span
                style={{ fontFamily: "var(--font-utendo), sans-serif" }}
                className="text-orange-200"
              >
                Anak Programmer Indonesia
              </span>{" "}
              lahir sebagai rumah singgah bagi para pegiat teknologi Tanah Air—mulai dari pelajar yang baru menyentuh HTML di layar ponsel, hingga engineer yang merancang sistem skala produksi. Di sini tidak ada pertanyaan yang dianggap terlalu dasar; setiap bug dibedah bersama, dan setiap karya kecil dirayakan sebagai langkah maju.
            </p>

            {/* Box Quotes dengan Background Animasi Bergerak & Tombol Salin */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(249,115,22,0.16), rgba(126,34,206,0.26), rgba(236,72,153,0.14), rgba(46,16,101,0.35), rgba(249,115,22,0.16))",
                backgroundSize: "240% 240%",
              }}
              className="relative p-4 sm:p-5 rounded-2xl border border-orange-300/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(12,5,24,0.5)] overflow-hidden"
            >
              {/* Aura Cahaya Halus Bergerak di Dalam Box */}
              <motion.div
                animate={{
                  x: ["-25%", "25%", "-25%"],
                  opacity: [0.25, 0.5, 0.25],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -top-10 -left-10 w-44 h-44 rounded-full bg-orange-500/25 blur-2xl"
              />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Quotes
                    weight="duotone"
                    className="text-2xl text-orange-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs sm:text-sm italic text-[#f3e8fa] leading-relaxed mb-1.5">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <span className="block text-[11px] font-mono text-orange-300">
                      — {quote.author}
                    </span>
                  </div>
                </div>

                {/* Tombol Salin Quotes dengan Animasi Klik */}
                <motion.button
                  type="button"
                  onClick={handleCopyQuote}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.85, rotate: -8 }}
                  title="Salin Quotes"
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-mono backdrop-blur-md transition-colors ${
                    copied
                      ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-200"
                      : "bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-orange-200"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        className="inline-flex items-center gap-1"
                      >
                        <Check weight="bold" className="text-sm text-emerald-300" />
                        <span>Tersalin</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex items-center gap-1"
                      >
                        <Copy weight="duotone" className="text-sm text-orange-300" />
                        <span>Salin</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Section 2: Visi & Misi Anak Programmer Indonesia */}
          <div className="relative pl-5 sm:pl-8 pt-2 pb-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-purple-800 before:via-orange-500 before:to-transparent">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-300/90 mb-3">
              <motion.span
                animate={{
                  scale: [1, 1.16, 1],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center justify-center"
              >
                <Target weight="duotone" className="text-lg text-orange-400" />
              </motion.span>
              <span>Visi &amp; Misi Anak Programmer Indonesia</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#fdf6ff] leading-snug mb-5 max-w-2xl">
              Mencetak ekosistem developer lokal yang inklusif, kolaboratif, dan siap berkarya.
            </h3>

            <div className="space-y-4 max-w-3xl">
              {/* Visi */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-orange-300 mb-1.5">
                  Visi Utama
                </span>
                <p className="text-sm sm:text-base text-[#e8d8f2] leading-relaxed">
                  Menjadi wadah kolaborasi programmer Indonesia yang terbuka bagi siapa saja—membuktikan bahwa keterbatasan perangkat bukanlah penghalang untuk melahirkan inovasi digital yang berdampak.
                </p>
              </div>

              {/* Misi */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3">
                <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Misi Kami
                </span>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#cbb6d9] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle
                      weight="duotone"
                      className="text-lg text-orange-400 shrink-0 mt-0.5"
                    />
                    <span>
                      Membangun budaya saling bantu tanpa menghakimi dalam memecahkan bug, error, maupun arsitektur kode.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle
                      weight="duotone"
                      className="text-lg text-orange-400 shrink-0 mt-0.5"
                    />
                    <span>
                      Mendorong anggota untuk berani merilis *side-project* sejak dini dan mendapatkan apresiasi maupun masukan konstruktif.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle
                      weight="duotone"
                      className="text-lg text-orange-400 shrink-0 mt-0.5"
                    />
                    <span>
                      Menghubungkan sesama programmer lintas daerah di Indonesia melalui diskusi rutin, bedah kode, dan kolaborasi proyek terbuka.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs font-mono text-[#9d85b0]">
        © 2026{" "}
        <span
          style={{ fontFamily: "var(--font-utendo), sans-serif" }}
          className="text-[#cbb6d9]"
        >
          Anak Programmer Indonesia
        </span>{" "}
        // Built with Next.js &amp; Node.js
      </footer>
    </motion.div>
  );
}
