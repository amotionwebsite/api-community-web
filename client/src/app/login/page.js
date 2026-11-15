"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoHomeOutline,
  IoChevronBack,
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoCodeSlash,
} from "react-icons/io5";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [shakeKey, setShakeKey] = useState(0);

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({ username: false, email: false, password: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameErr = mode === "register" && !username.trim();
    const emailErr = !email.trim();
    const passwordErr = !password.trim();

    if (usernameErr || emailErr || passwordErr) {
      setErrors({
        username: usernameErr,
        email: emailErr,
        password: passwordErr,
      });
      setShakeKey((prev) => prev + 1);
      return;
    }

    // Setelah berhasil masuk/daftar, arahkan ke halaman Forum
    router.push("/forum");
  };

  return (
    <div className="min-h-screen bg-[#11091c] text-[#f0e8fa] relative overflow-hidden flex flex-col justify-between selection:bg-[#7854a3] selection:text-white">
      {/* Ambient Background Nuansa Batik */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `radial-gradient(circle at 14px 14px, #c8a8ed 1.4px, transparent 1.4px), radial-gradient(circle at 0px 0px, #7854a3 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-36 -left-24 w-[440px] h-[440px] rounded-full bg-[#4c2b73]/50 blur-[130px]" />
        <div className="absolute bottom-0 -right-24 w-[420px] h-[420px] rounded-full bg-[#331a52]/65 blur-[140px]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 px-4 pt-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#1e1230]/75 hover:bg-[#2b1a45] backdrop-blur-xl border border-[#67468f]/55 text-[#e1cff7] text-xs font-medium transition active:scale-95"
          >
            <IoChevronBack className="text-sm" />
            <IoHomeOutline className="text-sm" />
            <span>Beranda</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#b48ee0]">
            <IoCodeSlash className="text-sm" />
            <span>API_AUTH_PORTAL</span>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#1f1230]/65 backdrop-blur-2xl border border-[#845eb3]/50 shadow-[0_24px_64px_rgba(8,3,16,0.85)]"
        >
          {/* Switcher Tab Masuk / Daftar */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#120a1f]/80 border border-[#4a3169]/60 mb-7">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === "login"
                  ? "bg-gradient-to-r from-[#6c4896] to-[#432666] text-white shadow-md border border-[#b48ee0]/40"
                  : "text-[#a58ebf] hover:text-[#e5d4f7]"
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === "register"
                  ? "bg-gradient-to-r from-[#6c4896] to-[#432666] text-white shadow-md border border-[#b48ee0]/40"
                  : "text-[#a58ebf] hover:text-[#e5d4f7]"
              }`}
            >
              Daftar Akun
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-[#f5effc] mb-1">
              {mode === "login"
                ? "Selamat Datang Kembali"
                : "Gabung Komunitas"}
            </h1>
            <p className="text-xs sm:text-sm text-[#b39ec9]">
              {mode === "login"
                ? "Masuk untuk mulai berdiskusi dan memamerkan karyamu."
                : "Buat akun developer Anak Programmer Indonesia sekarang."}
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            {/* Field Username (Hanya saat Daftar) */}
            <AnimatePresence initial={false}>
              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-[#d4bcf0]">
                      Username
                    </label>
                    {errors.username && (
                      <span className="text-[11px] font-mono text-rose-400">
                        * Wajib diisi
                      </span>
                    )}
                  </div>
                  <motion.div
                    key={`user-${shakeKey}`}
                    animate={
                      errors.username ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
                    }
                    transition={{ duration: 0.35 }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl backdrop-blur-md border transition-colors ${
                      errors.username
                        ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                        : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus-within:border-[#b48ee0]"
                    }`}
                  >
                    <IoPersonOutline className="text-[#b48ee0] text-base shrink-0" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username)
                          setErrors((prev) => ({ ...prev, username: false }));
                      }}
                      placeholder="contoh: jason_dev"
                      className="w-full bg-transparent text-sm text-[#f5effc] placeholder-[#786094] focus:outline-none"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Field Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-[#d4bcf0]">
                  Email
                </label>
                {errors.email && (
                  <span className="text-[11px] font-mono text-rose-400">
                    * Email wajib diisi
                  </span>
                )}
              </div>
              <motion.div
                key={`email-${shakeKey}`}
                animate={
                  errors.email ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
                }
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl backdrop-blur-md border transition-colors ${
                  errors.email
                    ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                    : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus-within:border-[#b48ee0]"
                }`}
              >
                <IoMailOutline className="text-[#b48ee0] text-base shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  placeholder="developer@email.com"
                  className="w-full bg-transparent text-sm text-[#f5effc] placeholder-[#786094] focus:outline-none"
                />
              </motion.div>
            </div>

            {/* Field Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-[#d4bcf0]">
                  Kata Sandi
                </label>
                {errors.password && (
                  <span className="text-[11px] font-mono text-rose-400">
                    * Sandi wajib diisi
                  </span>
                )}
              </div>
              <motion.div
                key={`pass-${shakeKey}`}
                animate={
                  errors.password ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
                }
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl backdrop-blur-md border transition-colors ${
                  errors.password
                    ? "bg-rose-950/30 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                    : "bg-[#120a1f]/75 border-[#5e3e85]/70 focus-within:border-[#b48ee0]"
                }`}
              >
                <IoLockClosedOutline className="text-[#b48ee0] text-base shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: false }));
                  }}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-[#f5effc] placeholder-[#786094] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9d75cb] hover:text-[#e1cff7] transition"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-base" />
                  ) : (
                    <IoEyeOutline className="text-base" />
                  )}
                </button>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#6c4896] via-[#503273] to-[#2e1947] border border-[#b48ee0]/45 text-[#faf6ff] text-sm font-semibold shadow-[0_8px_25px_rgba(46,25,71,0.7)] hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <span>{mode === "login" ? "Masuk Sekarang" : "Buat Akun"}</span>
              <IoArrowForward className="text-base" />
            </motion.button>
          </form>
        </motion.div>
      </main>

      <footer className="relative z-10 py-5 text-center text-xs font-mono text-[#7c6696]">
        © 2026 Anak Programmer Indonesia
      </footer>
    </div>
  );
}
