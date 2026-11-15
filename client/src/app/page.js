"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoTerminal, IoArrowForward } from "react-icons/io5";

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
    }, 62); // Kecepatan ketik pas (tidak cepat & tidak lambat)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0814] text-[#ede6f5] relative overflow-hidden flex flex-col justify-between selection:bg-[#6b4694] selection:text-white">
      {/* Ambient Background & Nuansa Batik Ungu Pekat */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 12px 12px, #c4a6e8 1.5px, transparent 1.5px), radial-gradient(circle at 0px 0px, #7b52ab 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.38, 0.25],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-36 -left-24 w-[420px] h-[420px] rounded-full bg-[#361d54]/60 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.08, 0.96, 1.08],
            opacity: [0.2, 0.32, 0.2],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-28 w-[420px] h-[420px] rounded-full bg-[#24123b]/80 blur-[130px]"
        />
      </div>

      {/* Floating Glass Navbar */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-50 px-3 sm:px-6"
      >
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#160e24]/75 backdrop-blur-xl border border-[#4a3169]/60 shadow-[0_8px_32px_rgba(10,5,18,0.65)] flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-b from-[#6f499c] to-[#26143d] border border-[#a986d4]/40 shadow-[0_2px_10px_rgba(38,20,61,0.7)] flex items-center justify-center shrink-0">
              <IoTerminal className="text-[#f3ebfc] text-base" />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-[#f3ebfc] truncate">
              Anak Programmer ID
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-[#c7b5db] shrink-0">
            <Link
              href="/forum"
              className="hover:text-[#e5d4f7] transition-colors"
            >
              Forum
            </Link>
            <Link
              href="/showcase"
              className="hover:text-[#e5d4f7] transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#57367d] to-[#2d1947] hover:from-[#674194] hover:to-[#392059] border border-[#9d75cb]/40 text-[#f3ebfc] font-medium transition shadow-md shadow-[#0d0814]/80"
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
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1c112e]/70 border border-[#523675]/60 text-[#c4a6e8] text-xs font-mono w-fit mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b995e3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9d75cb]" />
          </span>
          ~/komunitas/indonesia — active
        </motion.div>

        {/* Typing Heading dengan Warna Gradasi Bergerak */}
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
                "linear-gradient(90deg, #e5d4f7, #9d75cb, #593880, #c4a6e8, #e5d4f7)",
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
          className="text-[#b39ec9] text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5e3b87] via-[#452966] to-[#26143d] border border-[#9d75cb]/45 text-[#f7f2fc] text-sm font-semibold shadow-[0_8px_25px_rgba(38,20,61,0.65)] hover:border-[#c4a6e8]/70 transition-all"
            >
              <span>Buka Forum Diskusi</span>
              <IoArrowForward className="text-[#d4bcf0] text-base" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <a
              href="#bento"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#180f26]/70 hover:bg-[#231638]/80 border border-[#4a3169]/60 text-[#d8c5ed] text-sm font-medium backdrop-blur-md transition-all"
            >
              Gabung Discord / WA
            </a>
          </motion.div>
        </motion.div>

        {/* Asymmetric Bento Grid */}
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
            className="md:col-span-7 p-6 rounded-3xl bg-gradient-to-br from-[#1b112b]/90 to-[#110a1c]/95 border border-[#4a3169]/55 hover:border-[#8c64ba]/70 backdrop-blur-md transition-colors relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[#281940] border border-[#5a3d7a]/60 text-[#c4a6e8] font-mono text-xs">
                01 // DEBUG_ROOM
              </span>
              <span className="text-xs font-mono text-[#826b9c] group-hover:text-[#c4a6e8] transition-colors">
                [active_threads]
              </span>
            </div>
            <h3 className="font-bold text-xl text-[#f3ebfc] mb-2">
              Bedah Error & Arsitektur Kode
            </h3>
            <p className="text-sm text-[#b39ec9] leading-relaxed">
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
            className="md:col-span-5 p-6 rounded-3xl bg-gradient-to-bl from-[#1f1333]/90 to-[#10091a]/95 border border-[#4a3169]/55 hover:border-[#8c64ba]/70 backdrop-blur-md transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#281940] border border-[#5a3d7a]/60 text-[#c4a6e8] font-mono text-xs mb-4">
                02 // SHIP_IT
              </span>
              <h3 className="font-bold text-xl text-[#f3ebfc] mb-2">
                Pamer Side-Project
              </h3>
              <p className="text-sm text-[#b39ec9] leading-relaxed">
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
            className="md:col-span-12 p-5 sm:p-6 rounded-3xl bg-[#160e24]/85 border border-[#4a3169]/55 hover:border-[#8c64ba]/70 backdrop-blur-md transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="text-[#9d75cb] font-mono text-xs mb-1">
                03 // SYNC_CHANNEL
              </div>
              <h3 className="font-bold text-lg text-[#f3ebfc]">
                Terhubung Langsung ke Discord & WhatsApp
              </h3>
              <p className="text-sm text-[#b39ec9]">
                Ikuti live coding, bedah karya mingguan, dan obrolan santai
                seputar dunia IT Indonesia.
              </p>
            </div>
            <div className="shrink-0 font-mono text-xs px-4 py-2.5 rounded-xl bg-[#24163b] border border-[#5a3d7a]/60 text-[#d4bcf0]">
              $ join --community=api
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2f1d45] py-6 text-center text-xs font-mono text-[#7c6696]">
        © 2026 Anak Programmer Indonesia // Built with Next.js & Node.js
      </footer>
    </div>
  );
}
