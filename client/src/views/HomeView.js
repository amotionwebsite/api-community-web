"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  ChatCircle,
  Heart,
  ArrowUpRight,
  PaperPlaneRight,
  Info,
  FlagBanner,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { MOTIVATIONAL_QUOTES } from "../data/quotes";
import { INITIAL_THREADS } from "../data/threads";

const SHOWCASE_ITEMS = [
  {
    id: "s1",
    author: "jason_franklin",
    title: "aMotion / Loopin Project",
    desc: "Super-app komunitas dengan Circle, Reels, dan pemutar musik tersinkronisasi.",
    tags: ["Next.js", "Tailwind", "Node.js"],
    url: "https://github.com/amotionwebsite",
  },
  {
    id: "s2",
    author: "apigroup_official",
    title: "Bot Guard WhatsApp API",
    desc: "Bot moderasi otomatis berbasis Baileys & PM2 untuk proteksi grup developer.",
    tags: ["Node.js", "Baileys", "Termux"],
    url: "https://github.com/amotionwebsite",
  },
];

export default function HomeView() {
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("diskusi");
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [likedIds, setLikedIds] = useState([]);
  const [quickInput, setQuickInput] = useState("");

  useEffect(() => {
    const idx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[idx]);
  }, []);

  const handleCopyQuote = async () => {
    const text = `"${quote.text}" — ${quote.author}`;
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleQuickPost = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    const newThread = {
      id: String(Date.now()),
      title: quickInput.trim(),
      category: "Diskusi Umum",
      author: "member_baru",
      time: "Baru saja",
      solved: false,
      excerpt: quickInput.trim(),
      content: quickInput.trim(),
      comments: [],
    };
    setThreads([newThread, ...threads]);
    setQuickInput("");
    setActiveTab("diskusi");
  };

  return (
    <div className="min-vh-100 d-flex flex-column batik-canvas">
      <Navbar />

      <main className="container py-4 flex-grow-1" style={{ maxWidth: "680px" }}>
        {/* Kartu Intro Komunitas + Quote */}
        <section className="api-card p-3 p-sm-4 mb-3">
          <h1
            style={{
              fontFamily: "var(--font-coolvetica), sans-serif",
              color: "#f5efe6",
              letterSpacing: "0.3px",
            }}
            className="h3 mb-2"
          >
            Tumbuh dari baris kode pertama, tanpa batas perangkat maupun latar
            belakang.
          </h1>
          <p
            className="mb-3"
            style={{ fontSize: "0.86rem", color: "#b5a898", lineHeight: 1.6 }}
          >
            Rumah kolaborasi programmer Indonesia. Bedah error bareng, rilis
            karya, dan temukan partner satu frekuensi.
          </p>

          {/* Quote Box dengan Border Kiri Emas Batik */}
          <div
            className="p-2 px-3 d-flex align-items-start justify-content-between gap-2"
            style={{
              backgroundColor: "#110e0c",
              borderLeft: "3px solid #c5a059",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div>
              <p
                className="fst-italic mb-1"
                style={{ fontSize: "0.8rem", color: "#e5dcd0" }}
              >
                &ldquo;{quote.text}&rdquo;
              </p>
              <span style={{ fontSize: "0.72rem", color: "#c5a059" }}>
                — {quote.author}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyQuote}
              className="btn btn-sm btn-batik-outline d-inline-flex align-items-center gap-1 flex-shrink-0"
              style={{ fontSize: "0.72rem" }}
            >
              {copied ? (
                <>
                  <Check weight="bold" color="#4ade80" />
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

          <div
            className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top"
            style={{ borderColor: "#261f18" }}
          >
            <Link
              href="/forum"
              className="btn btn-sm btn-batik-gold rounded-pill px-3 d-inline-flex align-items-center gap-1"
            >
              <span>Buka Semua Forum</span>
              <ArrowUpRight weight="bold" />
            </Link>
            <a
              href="https://discord.gg/7A5qtTpYT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-batik-outline rounded-pill px-3 d-inline-flex align-items-center gap-1"
            >
              <img
                src="/discordlogo.png"
                alt="Discord"
                width={16}
                height={16}
              />
              <span>Gabung Discord</span>
            </a>
          </div>
        </section>

        {/* Tab Filter Simpel ala Feed */}
        <div className="d-flex align-items-center gap-2 mb-3 overflow-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("diskusi")}
            className={`btn nav-pill-batik ${
              activeTab === "diskusi" ? "active" : ""
            }`}
          >
            #diskusi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pamer-karya")}
            className={`btn nav-pill-batik ${
              activeTab === "pamer-karya" ? "active" : ""
            }`}
          >
            #pamer-karya
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tentang")}
            className={`btn nav-pill-batik ${
              activeTab === "tentang" ? "active" : ""
            }`}
          >
            #tentang
          </button>
        </div>

        {/* Konten Berdasarkan Tab */}
        {activeTab === "diskusi" && (
          <div className="d-flex flex-column gap-2">
            {threads.map((item) => {
              const liked = likedIds.includes(item.id);
              return (
                <article key={item.id} className="api-card p-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "#e2c285",
                        fontWeight: 500,
                      }}
                    >
                      @{item.author}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#8c7f70" }}>
                      {item.time}
                    </span>
                  </div>

                  <Link
                    href={`/forum/${item.id}`}
                    className="text-decoration-none"
                  >
                    <h2
                      className="h6 mb-1"
                      style={{ color: "#f5efe6", lineHeight: 1.4 }}
                    >
                      {item.title}
                    </h2>
                  </Link>

                  <p
                    className="mb-2"
                    style={{ fontSize: "0.82rem", color: "#aba092" }}
                  >
                    {item.excerpt}
                  </p>

                  {item.id === "1" && (
                    <pre className="code-snippet-box p-2 mb-2 overflow-auto">
                      {`app.use(cors({ origin: "https://api-community-web.vercel.app" }));`}
                    </pre>
                  )}

                  <div
                    className="d-flex align-items-center justify-content-between pt-2 border-top"
                    style={{ borderColor: "#241d16", fontSize: "0.76rem" }}
                  >
                    <Link
                      href={`/forum/${item.id}`}
                      className="text-decoration-none d-inline-flex align-items-center gap-1"
                      style={{ color: "#9c8f80" }}
                    >
                      <ChatCircle weight="duotone" size={16} />
                      <span>{item.comments?.length || 0} Balasan</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleLike(item.id)}
                      className="btn btn-sm p-0 border-0 d-inline-flex align-items-center gap-1"
                      style={{ color: liked ? "#c5a059" : "#9c8f80" }}
                    >
                      <Heart weight={liked ? "fill" : "duotone"} size={16} />
                      <span>{liked ? "Disukai" : "Suka"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {activeTab === "pamer-karya" && (
          <div className="d-flex flex-column gap-2">
            {SHOWCASE_ITEMS.map((proj) => (
              <article key={proj.id} className="api-card p-3">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span style={{ fontSize: "0.76rem", color: "#c5a059" }}>
                    @{proj.author}
                  </span>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-batik-outline py-0 px-2"
                    style={{ fontSize: "0.72rem" }}
                  >
                    Lihat <ArrowUpRight weight="bold" />
                  </a>
                </div>
                <h2 className="h6 mb-1" style={{ color: "#f5efe6" }}>
                  {proj.title}
                </h2>
                <p
                  className="mb-2"
                  style={{ fontSize: "0.82rem", color: "#aba092" }}
                >
                  {proj.desc}
                </p>
                <div className="d-flex flex-wrap gap-1">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="badge"
                      style={{
                        backgroundColor: "#1f1914",
                        color: "#4ade80",
                        border: "1px solid #2e251d",
                        fontWeight: 400,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "tentang" && (
          <div className="d-flex flex-column gap-3">
            <section className="api-card p-3 p-sm-4">
              <div
                className="d-flex align-items-center gap-2 mb-2"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  color: "#e2c285",
                }}
              >
                <Info weight="duotone" size={16} />
                <span>Tentang Anak Programmer Indonesia</span>
              </div>
              <p
                className="mb-0"
                style={{
                  fontSize: "0.85rem",
                  color: "#c2b6a7",
                  lineHeight: 1.65,
                }}
              >
                Anak Programmer Indonesia hadir sebagai ruang singgah bagi pegiat
                teknologi Tanah Air—mulai dari pelajar yang baru menulis HTML
                lewat ponsel, hingga engineer yang membangun aplikasi skala
                produksi. Tidak ada pertanyaan yang terlalu dasar; setiap bug
                dibedah bersama.
              </p>
            </section>

            <section className="api-card p-3 p-sm-4">
              <div
                className="d-flex align-items-center gap-2 mb-2"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  color: "#e2c285",
                }}
              >
                <FlagBanner weight="duotone" size={16} />
                <span>Visi &amp; Misi Anak Programmer Indonesia</span>
              </div>
              <p
                className="mb-3"
                style={{
                  fontSize: "0.86rem",
                  color: "#f3ece1",
                  fontWeight: 500,
                }}
              >
                Visi: Menjadi wadah kolaborasi programmer Indonesia yang terbuka
                bagi siapa saja tanpa batasan perangkat.
              </p>
              <ul
                className="ps-3 mb-0 d-flex flex-column gap-2"
                style={{ fontSize: "0.82rem", color: "#b5a898" }}
              >
                <li>Membangun budaya saling bantu memecahkan bug dan error.</li>
                <li>Mendorong anggota berani merilis side-project sejak dini.</li>
                <li>
                  Menghubungkan programmer lintas daerah dalam kolaborasi nyata.
                </li>
              </ul>
            </section>
          </div>
        )}

        {/* Input Cepat Tulis Diskusi di Bawah Feed */}
        <form onSubmit={handleQuickPost} className="mt-4">
          <div className="input-group">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Tulis diskusi singkat atau tanya error..."
              className="form-control"
              style={{
                backgroundColor: "#161311",
                borderColor: "#2b231b",
                color: "#f5efe6",
                fontSize: "0.84rem",
              }}
            />
            <button
              type="submit"
              className="btn btn-batik-gold d-inline-flex align-items-center gap-1 px-3"
            >
              <PaperPlaneRight weight="bold" />
              <span>Kirim</span>
            </button>
          </div>
        </form>
      </main>

      <footer
        className="border-top py-3 text-center"
        style={{
          borderColor: "#2b231b",
          fontSize: "0.74rem",
          color: "#8c7f70",
        }}
      >
        © 2026{" "}
        <span
          style={{
            fontFamily: "var(--font-utendo), sans-serif",
            color: "#c5a059",
          }}
        >
          Anak Programmer Indonesia
        </span>{" "}
        // Built with Bootstrap 5 &amp; Next.js
      </footer>
    </div>
  );
}
