"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CaretRight,
  Quotes,
  Sparkle,
} from "@phosphor-icons/react";

const FULL_TEXT = "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [showBrandText, setShowBrandText] = useState(true);
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#12081c", "#1f0e29", "#0e0617"]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.55, 0.3]);

  // Efek mengetik heading utama
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

  // Siklus animasi teks "Anak Programmer ID" keluar-masuk dari logo setiap 30 detik
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowBrandText(false);
      setTimeout(() => {
        setShowBrandText(true);
      }, 900);
    }, 30000);

    return () => clearInterval(cycleInterval);
  }, []);

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

      {/* Floating Glass Navbar dengan /logoapi.png & Animasi Teks Keluar-Masuk */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-50 px-3 sm:px-6"
      >
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(12,5,24,0.65)] flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0 overflow-hidden">
            <motion.div
              animate={{ scale: showBrandText ? 1 : 1.08 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 w-8 h-8 rounded-[10px] overflow-hidden bg-gradient-to-br from-orange-500/20 to-purple-900/60 border border-orange-300/35 shadow-[0_2px_12px_rgba(249,115,22,0.3)] shrink-0"
            >
              <img
                src="/logoapi.png"
                alt="Logo Anak Programmer Indonesia"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                {showBrandText && (
                  <motion.span
                    key="brand-text"
                    initial={{ x: -110, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -110, opacity: 0 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block font-bold text-xs sm:text-sm tracking-tight text-[#fdf6ff] truncate"
                  >
                    Anak Programmer ID
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-[#decce8] shrink-0">
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
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500/80 via-purple-700/80 to-violet-900/90 hover:brightness-110 border border-orange-300/30 text-white font-medium transition shadow-md shadow-purple-950/70 backdrop-blur-md"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-16 flex-1 flex flex-col justify-center">
        {/* Typing Heading dengan Gradasi Bergerak Orange - Ungu */}
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
              backgroundImage:
                "linear-gradient(90deg, #fed7aa, #fb923c, #c084fc, #7e22ce, #fed7aa)",
              backgroundSize: "250% 250%",
            }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.18] bg-clip-text text-transparent"
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

        {/* CTA Buttons dengan Animasi /discordlogo.png */}
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

        {/* Section: Tentang Anak Programmer Indonesia */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="relative"
        >
          <div className="relative pl-5 sm:pl-8 py-2 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-orange-400 before:via-fuchsia-500 before:to-purple-800">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-300/90 mb-3">
              <Sparkle weight="duotone" className="text-base text-orange-400" />
              <span>Tentang Anak Programmer Indonesia</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#fdf6ff] leading-snug mb-4 max-w-2xl">
              Tumbuh dari baris kode pertama, tanpa batas perangkat maupun latar belakang.
            </h2>

            <p className="text-sm sm:text-base text-[#cbb6d9] leading-relaxed max-w-3xl mb-6">
              <strong className="text-orange-200 font-semibold">
                Anak Programmer Indonesia
              </strong>{" "}
              lahir sebagai rumah singgah bagi para pegiat teknologi Tanah Air—mulai dari pelajar yang baru menyentuh HTML di layar ponsel, hingga engineer yang merancang sistem skala produksi. Di sini tidak ada pertanyaan yang dianggap terlalu dasar; setiap bug dibedah bersama, dan setiap karya kecil dirayakan sebagai langkah maju.
            </p>

            {/* Kutipan & Highlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/[0.08] via-purple-900/[0.2] to-transparent border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Quotes
                  weight="duotone"
                  className="text-2xl text-orange-400 shrink-0 mt-0.5"
                />
                <p className="text-xs sm:text-sm italic text-[#e8d8f2] leading-relaxed">
                  &ldquo;Bukan seberapa mahal perangkat yang kamu pakai, tapi seberapa konsisten kamu mengeksekusi ide menjadi solusi nyata.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 font-mono">
                <div>
                  <div className="text-lg font-extrabold bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-[11px] text-[#a78eb8]">Open Sharing</div>
                </div>
                <div className="h-7 w-[1px] bg-white/10" />
                <div>
                  <div className="text-lg font-extrabold bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-[11px] text-[#a78eb8]">Diskusi Aktif</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs font-mono text-[#9d85b0]">
        © 2026 Anak Programmer Indonesia // Built with Next.js & Node.js
      </footer>
    </motion.div>
  );
}
