"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FULL_TEXT = "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.";

export default function Home() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) {
        clearInterval(interval);
      }
    }, 38);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05030a] text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-violet-800 selection:text-white">
      {/* Ambient Background Glow & Grid Tekstur */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#2e1065_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.22, 0.35, 0.22],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-violet-900/50 blur-[110px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 -right-24 w-96 h-96 rounded-full bg-purple-950/60 blur-[120px]"
        />
      </div>

      {/* Floating Island Navbar (Anti-Potong di HP) */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-50 px-3 sm:px-6"
      >
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#0c0718]/80 backdrop-blur-xl border border-violet-900/40 shadow-[0_8px_32px_rgba(46,16,101,0.35)] flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 px-2 py-1 rounded-lg bg-gradient-to-br from-violet-700 to-purple-950 border border-violet-500/30 text-violet-200 text-xs font-mono font-bold shadow-inner">
              &lt;/&gt;
            </span>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-100 truncate">
              Anak Programmer ID
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-300 shrink-0">
            <Link
              href="/forum"
              className="hover:text-violet-300 transition-colors"
            >
              Forum
            </Link>
            <Link
              href="/showcase"
              className="hover:text-violet-300 transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-800 to-purple-950 hover:from-violet-700 hover:to-purple-900 border border-violet-500/30 text-violet-100 font-medium transition shadow-md shadow-violet-950/60"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-16 flex-1 flex flex-col justify-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-800/40 text-violet-300 text-xs font-mono w-fit mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          ~/komunitas/indonesia — active
        </motion.div>

        {/* Typing Heading (Tanpa Icon | & Gradasi Ungu Gelap) */}
        <div className="min-h-[135px] sm:min-h-[120px] mb-5 flex items-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.18] bg-gradient-to-br from-violet-300 via-violet-500 to-purple-950 bg-clip-text text-transparent">
            {typedText}
          </h1>
        </div>

        {/* Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-slate-400 text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
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
          className="flex flex-wrap items-center gap-3.5 mb-14"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-700 via-violet-800 to-purple-950 border border-violet-500/40 text-white text-sm font-semibold shadow-[0_0_25px_rgba(109,40,217,0.4)] hover:shadow-[0_0_35px_rgba(109,40,217,0.65)] transition-all"
            >
              <span>Buka Forum Diskusi</span>
              <span className="font-mono text-violet-300">-&gt;</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <a
              href="#bento"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0d081a]/90 hover:bg-violet-950/40 border border-violet-900/50 text-violet-200 text-sm font-medium backdrop-blur-md transition-all"
            >
              Gabung Discord / WA
            </a>
          </motion.div>
        </motion.div>

        {/* Asymmetric Bento Grid (Unik & Anti-Template) */}
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
          {/* Card 1 - Lebar 7 Kolom */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -4 }}
            className="md:col-span-7 p-6 rounded-3xl bg-gradient-to-br from-[#100921] to-[#080412] border border-violet-900/40 hover:border-violet-600/50 transition-colors relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-violet-950/80 border border-violet-800/40 text-violet-300 font-mono text-xs">
                01 // DEBUG_ROOM
              </span>
              <span className="text-xs font-mono text-slate-500 group-hover:text-violet-400 transition-colors">
                [active_threads]
              </span>
            </div>
            <h3 className="font-bold text-xl text-slate-100 mb-2">
              Bedah Error & Arsitektur Kode
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stuck di terminal atau kebingungan milih stack? Lempar potongan
              kode dan log error-nya di sini untuk dipecahkan bareng member
              lain.
            </p>
          </motion.div>

          {/* Card 2 - Lebar 5 Kolom */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -4 }}
            className="md:col-span-5 p-6 rounded-3xl bg-gradient-to-bl from-[#130a29] to-[#070410] border border-violet-900/40 hover:border-violet-600/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-800/40 text-purple-300 font-mono text-xs mb-4">
                02 // SHIP_IT
              </span>
              <h3 className="font-bold text-xl text-slate-100 mb-2">
                Pamer Side-Project
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rilis web, aplikasi mobile, atau CLI tools buatanmu buat dapet
                feedback jujur dan validasi.
              </p>
            </div>
          </motion.div>

          {/* Card 3 - Lebar Penuh 12 Kolom (Terminal Bar Style) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -3 }}
            className="md:col-span-12 p-5 sm:p-6 rounded-3xl bg-[#0b0617]/90 border border-violet-900/40 hover:border-violet-600/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="text-violet-400 font-mono text-xs mb-1">
                03 // SYNC_CHANNEL
              </div>
              <h3 className="font-bold text-lg text-slate-100">
                Terhubung Langsung ke Discord & WhatsApp
              </h3>
              <p className="text-sm text-slate-400">
                Ikuti live coding, bedah karya mingguan, dan obrolan santai
                seputar dunia IT Indonesia.
              </p>
            </div>
            <div className="shrink-0 font-mono text-xs px-4 py-2.5 rounded-xl bg-violet-950/60 border border-violet-800/40 text-violet-300">
              $ join --community=api
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-violet-950/60 py-6 text-center text-xs font-mono text-slate-500">
        © 2026 Anak Programmer Indonesia // Built with Next.js & Node.js
      </footer>
    </div>
  );
}
