"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Quotes,
  Copy,
  Check,
  FlagBanner,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { MOTIVATIONAL_QUOTES } from "../data/quotes";

const HEADLINE_WORDS = [
  "Tempat",
  "Ngoding,",
  "Diskusi",
  "Error,",
  "dan",
  "Pamer",
  "Karya",
  "Bareng.",
];

export default function HomeView() {
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[randomIndex]);
  }, []);

  const handleCopyQuote = async () => {
    const textToCopy = `"${quote.text}" — ${quote.author}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09050f] text-[#f7f2fa] flex flex-col justify-between selection:bg-orange-500/35 selection:text-white relative overflow-x-hidden">
      {/* Ambient Mesh Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(245,106,0,0.18), transparent 45%), radial-gradient(circle at 80% 25%, rgba(157,78,221,0.22), transparent 50%), radial-gradient(circle at 50% 85%, rgba(70,30,92,0.28), transparent 55%)",
          }}
          className="absolute inset-0"
        />
      </div>

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-11 sm:pt-16 pb-20 flex-1"
      >
        {/* Hero Heading Smooth Word-by-Word + Animasi Gradasi Orange-Ungu */}
        <h1
          style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
          className="text-[34px] sm:text-5xl lg:text-[56px] font-normal tracking-wide leading-[1.15] mb-5 flex flex-wrap gap-x-2.5 sm:gap-x-3.5 gap-y-1 max-w-4xl"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                opacity: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.6, delay: i * 0.08 },
                backgroundPosition: { duration: 7, repeat: Infinity, ease: "linear" },
              }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #F56A00, #FFAD03, #FFCF70, #CEA7EE, #9D4EDD, #F56A00)",
                backgroundSize: "260% 260%",
              }}
              className="inline-block bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#b8a5c7] text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
        >
          Ruang kolaborasi bawah tanah untuk programmer pemula hingga sepuh di
          Indonesia. Bedah error bareng, rilis side-project, dan temukan partner
          ngoding satu frekuensi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center gap-3 pb-14 border-b border-white/[0.08]"
        >
          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/forum"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F56A00 0%, #FA8B01 40%, #9D4EDD 82%, #72369D 100%)",
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-[0_8px_26px_rgba(245,106,0,0.28)] hover:brightness-110 transition"
            >
              <span>Buka Forum Diskusi</span>
              <ArrowUpRight weight="bold" className="text-base" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <a
              href="https://discord.gg/7A5qtTpYT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-[#5865F2]/20 border border-white/[0.1] hover:border-[#5865F2]/50 text-[#f3e8fa] text-sm font-semibold backdrop-blur-xl transition"
            >
              <motion.img
                src="/discordlogo.png"
                alt="Discord"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-5 object-contain shrink-0"
              />
              <span>Gabung Discord Yuk!</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Section: Tentang Anak Programmer Indonesia (Ikon Huruf 'i' Modern Smooth) */}
        <section className="py-12 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2.5">
              <motion.span
                animate={{
                  scale: [1, 1.12, 1],
                  y: [0, -1.5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F56A00]/25 to-[#9D4EDD]/30 border border-[#FFAD03]/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,173,3,0.25)]"
              >
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#FFAD03]"
                >
                  <circle cx="5" cy="2.2" r="1.15" fill="currentColor" />
                  <path
                    d="M5 5V10.2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
              <span
                style={{ fontFamily: "var(--font-roboto), sans-serif" }}
                className="font-light tracking-wide text-xs sm:text-[13px] text-[#e6d5f2]"
              >
                Tentang Anak Programmer Indonesia
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#faf5ff] leading-snug">
              Tumbuh dari baris kode pertama, tanpa batas perangkat maupun latar belakang.
            </h2>

            <p className="text-sm sm:text-base text-[#b8a5c7] leading-relaxed">
              <span
                style={{ fontFamily: "var(--font-utendo), sans-serif" }}
                className="text-[#FFCF70]"
              >
                Anak Programmer Indonesia
              </span>{" "}
              lahir sebagai rumah singgah bagi para pegiat teknologi Tanah Air—mulai
              dari pelajar yang baru menyentuh HTML di layar ponsel, hingga
              engineer yang merancang sistem skala produksi. Di sini tidak ada
              pertanyaan yang dianggap terlalu dasar; setiap bug dibedah bersama,
              dan setiap karya kecil dirayakan sebagai langkah maju.
            </p>

            {/* Quotes dengan Animated Gradient & Tombol Salin */}
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(125deg, rgba(245,106,0,0.14), rgba(157,78,221,0.20), rgba(70,30,92,0.24), rgba(250,139,1,0.12))",
                backgroundSize: "230% 230%",
              }}
              className="mt-6 pl-4 sm:pl-5 pr-3.5 py-4 border-l-2 border-[#FA8B01] rounded-r-xl flex items-start justify-between gap-3 backdrop-blur-xl"
            >
              <div className="flex items-start gap-2.5">
                <Quotes
                  weight="fill"
                  className="text-lg text-[#FFAD03] shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs sm:text-sm italic text-[#efe3f7] leading-relaxed mb-1">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <span className="text-[11px] font-mono text-[#FFCF70]">
                    — {quote.author}
                  </span>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleCopyQuote}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.86, rotate: -10 }}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono border transition ${
                  copied
                    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-200"
                    : "bg-black/30 hover:bg-white/[0.08] border-white/10 text-orange-200"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="ok"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="inline-flex items-center gap-1"
                    >
                      <Check weight="bold" className="text-xs text-emerald-300" />
                      <span>Tersalin</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cp"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="inline-flex items-center gap-1"
                    >
                      <Copy weight="duotone" className="text-xs text-orange-300" />
                      <span>Salin</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Section: Visi & Misi Anak Programmer Indonesia (Ikon Bendera Smooth) */}
        <section className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2.5">
              <motion.span
                animate={{
                  rotate: [0, -8, 8, -4, 0],
                  y: [0, -1.5, 0],
                }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9D4EDD]/30 to-[#F56A00]/25 border border-[#CEA7EE]/40 flex items-center justify-center shrink-0 text-[#CEA7EE]"
              >
                <FlagBanner weight="duotone" className="text-xs" />
              </motion.span>
              <span
                style={{ fontFamily: "var(--font-roboto), sans-serif" }}
                className="font-light tracking-wide text-xs sm:text-[13px] text-[#e6d5f2]"
              >
                Visi &amp; Misi Anak Programmer Indonesia
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div>
              <span
                style={{ fontFamily: "var(--font-roboto), sans-serif" }}
                className="block font-light text-xs text-[#FFAD03] mb-2"
              >
                Visi Utama
              </span>
              <p className="text-lg sm:text-xl font-semibold text-[#faf5ff] leading-relaxed">
                Menjadi wadah kolaborasi programmer Indonesia yang terbuka bagi
                siapa saja—membuktikan bahwa keterbatasan perangkat bukanlah
                penghalang untuk melahirkan inovasi digital yang berdampak.
              </p>
            </div>

            <div className="border-t border-white/[0.08] pt-6">
              <span
                style={{ fontFamily: "var(--font-roboto), sans-serif" }}
                className="block font-light text-xs text-[#CEA7EE] mb-4"
              >
                Misi Ekosistem
              </span>

              <div className="divide-y divide-white/[0.07]">
                {[
                  {
                    num: "01",
                    text: "Membangun budaya saling bantu tanpa menghakimi dalam memecahkan bug, error, maupun arsitektur kode.",
                  },
                  {
                    num: "02",
                    text: "Mendorong anggota untuk berani merilis side-project sejak dini dan mendapatkan apresiasi maupun masukan konstruktif.",
                  },
                  {
                    num: "03",
                    text: "Menghubungkan sesama programmer lintas daerah di Indonesia melalui diskusi rutin, bedah kode, dan kolaborasi proyek terbuka.",
                  },
                ].map((misi) => (
                  <div
                    key={misi.num}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5"
                  >
                    <span className="font-mono text-xs text-[#FA8B01] pt-0.5 shrink-0">
                      {misi.num}.
                    </span>
                    <p className="text-xs sm:text-sm text-[#b8a5c7] leading-relaxed">
                      {misi.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <footer className="relative z-10 border-t border-white/[0.08] py-6 px-4 text-center text-xs font-mono text-[#887499]">
        © 2026{" "}
        <span
          style={{ fontFamily: "var(--font-utendo), sans-serif" }}
          className="text-[#cbb6d9]"
        >
          Anak Programmer Indonesia
        </span>{" "}
        // Built with Next.js &amp; Node.js
      </footer>
    </div>
  );
}
