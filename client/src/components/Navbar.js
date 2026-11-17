"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HouseLine } from "@phosphor-icons/react";

export default function Navbar() {
  const pathname = usePathname();
  const [showBrandText, setShowBrandText] = useState(true);
  const isSubPage = pathname !== "/";

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowBrandText(false);
      setTimeout(() => setShowBrandText(true), 900);
    }, 30000);
    return () => clearInterval(cycleInterval);
  }, []);

  const navLinks = [
    { href: "/forum", label: "Forum" },
    { href: "/showcase", label: "Showcase" },
  ];

  return (
    <header className="sticky top-2.5 z-50 px-2 sm:px-5">
      {/* Kapsul Navbar Utama */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(245,106,0,0.16) 0%, rgba(250,139,1,0.10) 24%, rgba(157,78,221,0.18) 58%, rgba(114,54,157,0.22) 80%, rgba(70,30,92,0.34) 100%)",
        }}
        className="max-w-5xl mx-auto px-2.5 sm:px-4 h-12 sm:h-14 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(12,5,24,0.65)] flex items-center justify-between gap-1.5"
      >
        {/* Brand Logo + Nama Lengkap */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink-0"
        >
          <motion.img
            src="/logoapi.png"
            alt="Logo Anak Programmer Indonesia"
            whileHover={{ rotate: -8, scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 360, damping: 18 }}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain shrink-0"
          />
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              {showBrandText && (
                <motion.span
                  key="brand-text"
                  initial={{ x: -160, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -160, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: "var(--font-utendo), sans-serif" }}
                  className="block text-[9.5px] min-[390px]:text-[10.5px] sm:text-xs md:text-sm tracking-tight text-[#faf5ff] whitespace-nowrap"
                >
                  Anak Programmer Indonesia
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Menu Rapat & Tombol Daftar Login di Dalam Kapsul */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-1.5 sm:px-2.5 py-1 text-[10.5px] sm:text-xs md:text-sm font-medium transition-colors"
                >
                  <motion.span
                    whileTap={{ scale: 0.92 }}
                    className={`inline-block ${
                      isActive
                        ? "text-[#FFAD03]"
                        : "text-[#e4d5ef] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.09] border border-orange-300/25"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Tombol Daftar (Abu-abu Gradasi) & Login (Orange-Ungu Gradasi) Tanpa Tanda / */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.94 }}>
            <Link
              href="/login"
              className="inline-flex items-center rounded-xl overflow-hidden border border-white/15 text-[10px] sm:text-xs font-semibold shadow-md"
            >
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #4b5563 0%, #374151 55%, #1f2937 100%)",
                }}
                className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-zinc-100 whitespace-nowrap"
              >
                Daftar
              </span>
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #F56A00 0%, #FA8B01 38%, #9D4EDD 78%, #72369D 100%)",
                }}
                className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-white whitespace-nowrap"
              >
                Login
              </span>
            </Link>
          </motion.div>
        </nav>
      </div>

      {/* Sub-Kapsul Melayang di Bawah Navbar Khusus Sub-Halaman untuk Kembali ke Home */}
      <AnimatePresence>
        {isSubPage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="max-w-5xl mx-auto mt-1.5 flex justify-start"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#160b24]/85 hover:bg-orange-500/20 border border-white/15 backdrop-blur-xl text-[11px] font-medium text-[#e9d8f5] hover:text-white shadow-md transition"
            >
              <motion.span
                whileHover={{ y: -1, scale: 1.1 }}
                whileTap={{ scale: 0.88 }}
                className="inline-flex text-[#FFAD03]"
              >
                <HouseLine weight="duotone" className="text-sm" />
              </motion.span>
              <span>Kembali ke Home</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
