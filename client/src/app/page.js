"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  CaretRight,
  TerminalWindow,
  Cube,
  Broadcast,
} from "@phosphor-icons/react";

const FULL_TEXT = "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#12081c", "#1f0e29", "#0e0617"]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.55, 0.3]);

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
        className="sticky top-3 z-50 px-3 sm:px-6"
      >
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(12,5,24,0.65)] flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-orange-500 via-amber-600 to-purple-900 border border-orange-300/40 shadow-[0_2px_12px_rgba(249,115,22,0.35)] flex items-center justify-center shrink-0">
              <Code weight="duotone" className="text-white text-lg" />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-[#fdf6ff] truncate">
              Anak Programmer ID
            </span>
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

        {/* Deskripsi */}
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

        {/* CTA Buttons Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-3.5 mb-14"
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
              href="#bento"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[#f2e6fa] text-sm font-medium backdrop-blur-xl transition-all"
            >
              Gabung Discord / WA
            </a>
          </motion.div>
        </motion.div>

        {/* Asymmetric Bento Grid Glass */}
        <motion.div
          id="bento"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.14, delayChildren: 0.65 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* Card 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -4 }}
            className="md:col-span-7 p-6 rounded-3xl bg-gradient-to-br from-orange-500/[0.08] via-purple-900/[0.22] to-[#130824]/80 border border-white/15 hover:border-orange-400/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(10,4,20,0.5)] transition-colors relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.07] border border-orange-300/25 text-orange-200 font-mono text-xs backdrop-blur-md">
                <TerminalWindow weight="duotone" className="text-base text-orange-300" />
                01 // DEBUG_ROOM
              </span>
              <span className="text-xs font-mono text-[#a78eb8] group-hover:text-orange-300 transition-colors">
                [active_threads]
              </span>
            </div>
            <h3 className="font-bold text-xl text-[#fdf6ff] mb-2">
              Bedah Error & Arsitektur Kode
            </h3>
            <p className="text-sm text-[#cbb6d9] leading-relaxed">
              Stuck di terminal atau kebingungan milih stack? Lempar potongan
              kode dan log error-nya di sini untuk dipecahkan bareng member
              lain.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -4 }}
            className="md:col-span-5 p-6 rounded-3xl bg-gradient-to-bl from-purple-700/[0.22] via-orange-500/[0.07] to-[#130824]/80 border border-white/15 hover:border-orange-400/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(10,4,20,0.5)] transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.07] border border-purple-300/25 text-purple-200 font-mono text-xs mb-4 backdrop-blur-md">
                <Cube weight="duotone" className="text-base text-orange-300" />
                02 // SHIP_IT
              </span>
              <h3 className="font-bold text-xl text-[#fdf6ff] mb-2">
                Pamer Side-Project
              </h3>
              <p className="text-sm text-[#cbb6d9] leading-relaxed">
                Rilis web, aplikasi mobile, atau CLI tools buatanmu buat dapet
                feedback jujur dan validasi.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -3 }}
            className="md:col-span-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-500/[0.08] via-white/[0.04] to-purple-800/[0.2] border border-white/15 hover:border-orange-400/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(10,4,20,0.5)] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-orange-300 font-mono text-xs mb-1.5">
                <Broadcast weight="duotone" className="text-base text-orange-300" />
                03 // SYNC_CHANNEL
              </div>
              <h3 className="font-bold text-lg text-[#fdf6ff]">
                Terhubung Langsung ke Discord & WhatsApp
              </h3>
              <p className="text-sm text-[#cbb6d9]">
                Ikuti live coding, bedah karya mingguan, dan obrolan santai
                seputar dunia IT Indonesia.
              </p>
            </div>
            <div className="shrink-0 font-mono text-xs px-4 py-2.5 rounded-xl bg-white/[0.06] border border-orange-300/25 text-orange-200 backdrop-blur-md">
              $ join --community=api
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs font-mono text-[#9d85b0]">
        © 2026 Anak Programmer Indonesia // Built with Next.js & Node.js
      </footer>
    </motion.div>
  );
}
