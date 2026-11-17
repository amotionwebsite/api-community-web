"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [showBrandText, setShowBrandText] = useState(true);

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
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#09050f]/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-3 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 overflow-hidden">
          <motion.img
            src="/logoapi.png"
            alt="Logo Anak Programmer Indonesia"
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="w-7 h-7 min-[380px]:w-8 min-[380px]:h-8 object-contain shrink-0"
          />
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              {showBrandText && (
                <motion.span
                  key="brand-text"
                  initial={{ x: -180, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -180, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: "var(--font-utendo), sans-serif" }}
                  className="block text-[10.5px] min-[380px]:text-[11.5px] sm:text-[15px] tracking-tight text-[#faf5ff] whitespace-nowrap"
                >
                  Anak Programmer Indonesia
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2.5 py-1.5 text-[11px] min-[380px]:text-xs sm:text-sm font-medium transition-colors ${
                  isActive ? "text-orange-300" : "text-[#b8a5c7] hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute left-2.5 right-2.5 -bottom-[13px] sm:-bottom-[17px] h-[2px] bg-gradient-to-r from-orange-400 to-purple-500"
                  />
                )}
              </Link>
            );
          })}

          <Link
            href="/login"
            className={`ml-1 px-3 py-1.5 rounded-lg text-[11px] min-[380px]:text-xs sm:text-sm font-semibold transition-all ${
              pathname === "/login"
                ? "bg-orange-500 text-white"
                : "bg-white/[0.07] hover:bg-orange-500/90 text-[#faf5ff] hover:text-white border border-white/10 hover:border-orange-400/50"
            }`}
          >
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  );
}
