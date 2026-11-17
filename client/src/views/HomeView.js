"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Quotes,
  Copy,
  Check,
  TerminalWindow,
  CompassTool,
  Sparkle,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { MOTIVATIONAL_QUOTES } from "../data/quotes";

const FULL_TEXT = "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.";

export default function HomeView() {
  const [typedText, setTypedText] = useState("");
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[randomIndex]);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) clearInterval(interval);
    }, 58);
    return () => clearInterval(interval);
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
      {/* Subtle Ambient Accent */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[340px] rounded-full bg-gradient-to-r from-orange-600/20 via-purple-700/25 to-fuchsia-800/20 blur-[130px]" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-5 pt-10 sm:pt-16 pb-20 flex-1">
        {/* Live Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.09] bg-white/[0.02] text-[11px] font-mono text-[#cbb6d9] mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          <span>COMMUNITY_HUB // INDONESIA</span>
        </motion.div>

        {/* Hero Heading - Coolvetica */}
        <div className="min-h-[125px] sm:min-h-[115px] mb-5 flex items-center">
          <h1
            style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
            className="text-[32px] sm:text-[54px] font-normal tracking-wide leading-[1.14] text-[#faf5ff]"
          >
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="inline-block w-[3px] h-7 sm:h-11 bg-orange-500 ml-1 align-middle"
            />
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-[#a894b8] text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
        >
          Ruang kolaborasi bawah tanah untuk programmer pemula hingga sepuh di
          Indonesia. Bedah error bareng, rilis side-project, dan temukan partner
          ngoding satu frekuensi.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center gap-3 pb-14 border-b border-white/[0.08]"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-purple-700 text-white text-sm font-semibold shadow-[0_6px_24px_rgba(249,115,22,0.28)] hover:brightness-110 transition"
            >
              <span>Buka Forum Diskusi</span>
              <ArrowUpRight weight="bold" className="text-base" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <a
              href="https://discord.gg/7A5qtTpYT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-[#5865F2]/15 border border-white/[0.1] hover:border-[#5865F2]/50 text-[#f3e8fa] text-sm font-semibold transition"
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

        {/* Editorial Section 01: Tentang */}
        <section className="py-12 border-b border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <TerminalWindow weight="duotone" className="text-lg" />
              </motion.span>
              <span>01 // Tentang Kami</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#faf5ff] leading-snug">
              Tumbuh dari baris kode pertama, tanpa batas perangkat maupun latar belakang.
            </h2>

            <p className="text-sm sm:text-base text-[#b8a5c7] leading-relaxed">
              <span
                style={{ fontFamily: "var(--font-utendo), sans-serif" }}
                className="text-orange-300"
              >
                Anak Programmer Indonesia
              </span>{" "}
              lahir sebagai rumah singgah bagi para pegiat teknologi Tanah Air—mulai
              dari pelajar yang baru menyentuh HTML di layar ponsel, hingga
              engineer yang merancang sistem skala produksi. Di sini tidak ada
              pertanyaan yang dianggap terlalu dasar; setiap bug dibedah bersama,
              dan setiap karya kecil dirayakan sebagai langkah maju.
            </p>

            {/* Editorial Blockquote dengan Animated Gradient Bar & Copy Button */}
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(125deg, rgba(249,115,22,0.12), rgba(147,51,234,0.18), rgba(249,115,22,0.08))",
                backgroundSize: "220% 220%",
              }}
              className="mt-6 pl-4 sm:pl-5 pr-3.5 py-4 border-l-2 border-orange-500 rounded-r-xl flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-2.5">
                <Quotes
                  weight="fill"
                  className="text-lg text-orange-400/80 shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs sm:text-sm italic text-[#efe3f7] leading-relaxed mb-1">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <span className="text-[11px] font-mono text-orange-300/90">
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

        {/* Editorial Section 02: Visi & Misi */}
        <section className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300">
              <motion.span
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <CompassTool weight="duotone" className="text-lg text-orange-400" />
              </motion.span>
              <span>02 // Visi &amp; Misi</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-8">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-orange-400 mb-2">
                Visi Utama
              </span>
              <p className="text-lg sm:text-xl font-semibold text-[#faf5ff] leading-relaxed">
                Menjadi wadah kolaborasi programmer Indonesia yang terbuka bagi
                siapa saja—membuktikan bahwa keterbatasan perangkat bukanlah
                penghalang untuk melahirkan inovasi digital yang berdampak.
              </p>
            </div>

            <div className="border-t border-white/[0.08] pt-6">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-purple-300 mb-4">
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
                    <span className="font-mono text-xs text-orange-400/90 pt-0.5 shrink-0">
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
      </main>

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
