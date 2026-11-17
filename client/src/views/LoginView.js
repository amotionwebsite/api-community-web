"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GithubLogo,
  DiscordLogo,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

export default function LoginView() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMsg(
      isRegister
        ? "Pendaftaran diterima! Silakan hubungkan endpoint API auth."
        : "Sesi siap diverifikasi! Silakan hubungkan endpoint API auth."
    );
  };

  return (
    <div className="min-h-screen bg-[#09050f] text-[#f7f2fa] flex flex-col justify-between selection:bg-orange-500/35">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md mx-auto w-full px-4 py-14 flex-1 flex flex-col justify-center"
      >
        <div className="space-y-6">
          <div>
            <h1
              style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
              className="text-3xl font-normal tracking-wide text-[#faf5ff]"
            >
              {isRegister ? "Daftar Akun Baru" : "Masuk ke Akun"}
            </h1>
            <p className="text-xs sm:text-sm text-[#a894b8] mt-1">
              Akses forum diskusi, simpan snippet, dan rilis karya di Showcase.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-mono text-[#cbb6d9] mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="misal: jason_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-orange-400/70 outline-none text-sm text-white placeholder:text-[#6f5c80]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-[#cbb6d9] mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="nama@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-orange-400/70 outline-none text-sm text-white placeholder:text-[#6f5c80]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbb6d9] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-orange-400/70 outline-none text-sm text-white placeholder:text-[#6f5c80]"
              />
            </div>

            {statusMsg && (
              <p className="text-xs font-mono text-[#FFCF70] bg-orange-500/10 border border-orange-400/30 px-3 py-2 rounded-lg">
                {statusMsg}
              </p>
            )}

            <motion.button
              type="submit"
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundImage: isRegister
                  ? "linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%)"
                  : "linear-gradient(135deg, #F56A00 0%, #FA8B01 38%, #9D4EDD 78%, #72369D 100%)",
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold shadow-lg hover:brightness-110 transition"
            >
              <span>{isRegister ? "Buat Akun" : "Masuk Sekarang"}</span>
              <ArrowRight weight="bold" />
            </motion.button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/[0.08]" />
            <span className="shrink mx-3 text-[11px] font-mono text-[#7d698f]">
              ATAU LANJUT DENGAN
            </span>
            <div className="flex-grow border-t border-white/[0.08]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-semibold text-[#e9d8f5] transition"
            >
              <GithubLogo weight="fill" className="text-base" />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] hover:bg-[#5865F2]/20 border border-white/10 hover:border-[#5865F2]/50 text-xs font-semibold text-[#e9d8f5] transition"
            >
              <DiscordLogo weight="fill" className="text-base text-[#7289da]" />
              <span>Discord</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#9f8bb0] pt-2">
            {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setStatusMsg("");
              }}
              className="text-[#FFAD03] hover:underline font-semibold"
            >
              {isRegister ? "Masuk di sini" : "Daftar gratis"}
            </button>
          </p>
        </div>
      </motion.main>

      <footer className="border-t border-white/[0.08] py-6 px-4 text-center text-xs font-mono text-[#887499]">
        © 2026{" "}
        <span
          style={{ fontFamily: "var(--font-utendo), sans-serif" }}
          className="text-[#cbb6d9]"
        >
          Anak Programmer Indonesia
        </span>
      </footer>
    </div>
  );
}
