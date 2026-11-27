"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HomeView from "@/views/HomeView";
import { useAuthStore } from "@/store/useAuthStore";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function FeedPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: SMOOTH_EASE }}
        className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
      >
        <Navbar />
        <main
          className="container py-4 flex-grow-1 mb-4 d-flex flex-column justify-content-center"
          style={{ maxWidth: "740px" }}
        >
          <div
            className="smoked-glass p-4 text-center"
            style={{ borderColor: "rgba(197, 160, 89, 0.32)" }}
          >
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-tommy-medium), sans-serif",
                fontSize: "0.92rem",
                color: "#f2ece1",
                lineHeight: 1.5,
              }}
            >
              Masuk dulu yuk, biar jadi bagian dari Anak Programmer Indonesia
            </p>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-pill text-decoration-none"
                style={{
                  background:
                    "linear-gradient(180deg, #cfa960 0%, #b38d46 100%)",
                  color: "#120f0c",
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.78rem",
                }}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-pill text-decoration-none"
                style={{
                  backgroundColor: "rgba(38, 35, 31, 0.72)",
                  border: "1px solid rgba(197, 160, 89, 0.32)",
                  color: "#e6cfa3",
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.78rem",
                }}
              >
                Daftar
              </Link>
            </div>
          </div>
        </main>
      </motion.div>
    );
  }

  return <HomeView />;
}
