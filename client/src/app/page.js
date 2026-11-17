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
    ["#11091c", "#1d1030", "#0d0617"]
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
      className="min-h-screen text-[#f0e8fa] relative overflow-hidden flex flex-col justify-between selection:bg-[#7854a3] selection:text-white transition-colors duration-300"
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
          style={{ y: glowY, opacity: glowOpacity }}
          className="absolute -top-32 -left-24 w-[440px] h-[440px] rounded-full bg-[#4c2b73] blur-[130px]"
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute bottom-0 -right-24 w-[420px] h-[420px] rounded-full bg-[#331a52] blur-[140px]"
        />
      </div>

      {/* Floating Glass Navbar */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-50 px-3 sm:px-6"
      >
        <div className="max-w-5xl mx-auto px-3.5 py-2.5 rounded-2xl bg-[#1b102b]/75 backdrop-blur-xl border border-[#67468f]/55 shadow-[0_8px_32px_rgba(12,6,23,0.65)] flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#7d56ab] to-[#2e184a] border border-[#c8a8ed]/40 shadow-[0_2px_10px_rgba(46,24,74,0.7)] flex items-center justify-center shrink-0">
              <Code weight="duotone" className="text-[#f5effc] text-lg" />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-[#f5effc] truncate">
              Anak Programmer ID
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-[#d2bfe8] shrink-0">
            <Link
              href="/forum"
              className="hover:text-[#f5effc] transition-colors"
            >
              Forum
            </Link>
            <Link
              href="/showcase"
              className="hover:text-[#f5effc] transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#66438f] to-[#361e54] hover:from-[#754ea3] hover:to-[#432666] border border-[#b48ee0]/40 text-[#f5effc] font-medium transition shadow-md shadow-[#11091c]/70"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-16 flex-1 flex flex-col justify-center">
        {/* Typing Heading dengan Gradasi Bergerak */}
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
                "linear-gradient(90deg, #f2e8fc, #b48ee0, #6f499c, #d4bcf0, #f2e8fc)",
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
          className="text-[#c1abd9] text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6c4896] via-[#503273] to-[#2e1947] border border-[#b48ee0]/45 text-[#faf6ff] text-sm font-semibold shadow-[0_8px_25px_rgba(46,25,71,0.65)] hover:border-[#d4bcf0]/75 transition-all"
            >
              <span>Buka Forum Diskusi</span>
              <CaretRight weight="bold" className="text-[#e1cff7] text-base" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <a
              href="#bento"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1f1230]/75 hover:bg-[#2b1942]/85 border border-[#67468f]/55 text-[#e1cff7] text-sm font-medium backdrop-blur-md transition-all"
            >
              Gabung Discord / WA
            </a>
          </motion.div>
        </motion.div>

        {/* Asymmetric Bento Grid dengan Phosphor Duotone Icons */}
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
            className="md:col-span-7 p-6 rounded-3xl bg-gradient-to-br from-[#231438]/90 to-[#140b21]/95 border border-[#67468f]/50 hover:border-[#a982d6]/75 backdrop-blur-md transition-colors relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#2e1b4a] border border-[#7854a3]/55 text-[#d4bcf0] font-mono text-xs">
                <TerminalWindow weight="duotone" className="text-base text-[#e1cff7]" />
                01 // DEBUG_ROOM
              </span>
              <span className="text-xs font-mono text-[#967db5] group-hover:text-[#d4bcf0] transition-colors">
                [active_threads]
              </span>
            </div>
            <h3 className="font-bold text-xl text-[#f5effc] mb-2">
              Bedah Error & Arsitektur Kode
            </h3>
            <p className="text-sm text-[#c1abd9] leading-relaxed">
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
            className="md:col-span-5 p-6 rounded-3xl bg-gradient-to-bl from-[#27163d]/90 to-[#130a1f]/95 border border-[#67468f]/50 hover:border-[#a982d6]/75 backdrop-blur-md transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#2e1b4a] border border-[#7854a3]/55 text-[#d4bcf0] font-mono text-xs mb-4">
                <Cube weight="duotone" className="text-base text-[#e1cff7]" />
                02 // SHIP_IT
              </span>
              <h3 className="font-bold text-xl text-[#f5effc] mb-2">
                Pamer Side-Project
              </h3>
              <p className="text-sm text-[#c1abd9] leading-relaxed">
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
            className="md:col-span-12 p-5 sm:p-6 rounded-3xl bg-[#1d112e]/85 border border-[#67468f]/50 hover:border-[#a982d6]/75 backdrop-blur-md transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[#c4a6e8] font-mono text-xs mb-1.5">
                <Broadcast weight="duotone" className="text-base text-[#e1cff7]" />
                03 // SYNC_CHANNEL
              </div>
              <h3 className="font-bold text-lg text-[#f5effc]">
                Terhubung Langsung ke Discord & WhatsApp
              </h3>
              <p className="text-sm text-[#c1abd9]">
                Ikuti live coding, bedah karya mingguan, dan obrolan santai
                seputar dunia IT Indonesia.
              </p>
            </div>
            <div className="shrink-0 font-mono text-xs px-4 py-2.5 rounded-xl bg-[#2c1a47] border border-[#7854a3]/55 text-[#e1cff7]">
              $ join --community=api
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#3b2359] py-6 text-center text-xs font-mono text-[#967db5]">
        © 2026 Anak Programmer Indonesia // Built with Next.js & Node.js
      </footer>
    </motion.div>
  );
}
