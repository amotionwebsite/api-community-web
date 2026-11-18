"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Shuffle } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { MOTIVATIONAL_QUOTES } from "../data/quotes";

export default function QuotesView() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleShuffle = () => {
    const next = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setFeaturedIndex(next);
  };

  const handleCopy = async (q, key) => {
    const text = `"${q.text}" — ${q.author}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedIdx(key);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const featured = MOTIVATIONAL_QUOTES[featuredIndex];

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1" style={{ maxWidth: "740px" }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h1
              style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
              className="h3 mb-0"
            >
              Petuah &amp; Catatan Tokoh
            </h1>
            <p className="mb-0" style={{ fontSize: "0.8rem", color: "#9a8f80" }}>
              Pengingat singkat saat kode terasa buntu.
            </p>
          </div>
          <button
            type="button"
            onClick={handleShuffle}
            className="btn btn-sm btn-sogan px-3 py-1.5 d-inline-flex align-items-center gap-1"
          >
            <Shuffle weight="bold" />
            <span>Acak</span>
          </button>
        </div>

        {/* Featured Quote */}
        <motion.section
          key={featuredIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="smoked-glass p-4 mb-4"
          style={{ borderLeft: "3px solid #c5a059" }}
        >
          <p
            className="fst-italic mb-2"
            style={{ fontSize: "1.02rem", color: "#f2ece1", lineHeight: 1.6 }}
          >
            &ldquo;{featured.text}&rdquo;
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <span style={{ fontSize: "0.8rem", color: "#c5a059" }}>
              — {featured.author}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(featured, "featured")}
              className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
              style={{ fontSize: "0.74rem" }}
            >
              {copiedIdx === "featured" ? (
                <>
                  <Check weight="bold" color="#76a882" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy weight="duotone" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
        </motion.section>

        {/* Daftar Semua Quotes */}
        <div className="d-flex flex-column gap-2.5">
          {MOTIVATIONAL_QUOTES.map((q, idx) => (
            <div
              key={idx}
              className="smoked-glass p-3 d-flex align-items-start justify-content-between gap-2"
            >
              <div>
                <p
                  className="mb-1"
                  style={{ fontSize: "0.84rem", color: "#dfd6c7" }}
                >
                  &ldquo;{q.text}&rdquo;
                </p>
                <span style={{ fontSize: "0.72rem", color: "#c5a059" }}>
                  — {q.author}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(q, idx)}
                className="btn btn-sm btn-glass-subtle px-2 py-1 flex-shrink-0"
              >
                {copiedIdx === idx ? (
                  <Check weight="bold" color="#76a882" />
                ) : (
                  <Copy weight="duotone" />
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
