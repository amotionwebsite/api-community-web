"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function FeedPage() {
  const router = useRouter();
  const { user, feedPosts } = useAuthStore();
  const posts = Array.isArray(feedPosts) ? feedPosts : [];

  const [filter, setFilter] = useState("semua");
  const [copiedId, setCopiedId] = useState(null);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [zoomSrc, setZoomSrc] = useState("");
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef(null);
  const pinchDistRef = useRef(null);

  const openZoom = (src) => {
    setZoomSrc(src);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const closeZoom = () => {
    setZoomSrc("");
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchDistRef.current = Math.hypot(dx, dy);
    } else if (e.touches.length === 1 && zoomScale > 1) {
      dragStartRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinchDistRef.current;
      pinchDistRef.current = dist;
      setZoomScale((prev) => Math.min(4, Math.max(1, prev * ratio)));
    } else if (e.touches.length === 1 && dragStartRef.current && zoomScale > 1) {
      setPan({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    pinchDistRef.current = null;
    dragStartRef.current = null;
  };

  const handleCopy = async (text, id) => {
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
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const toggleUpvote = (id) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setUpvotedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredPosts =
    filter === "kode" ? posts.filter((item) => Boolean(item.code)) : posts;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />
      <main
        className="container py-4 flex-grow-1 mb-4"
        style={{ maxWidth: "740px" }}
      >
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3 flex-wrap">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("semua")}
              className="btn btn-sm px-3 py-1 rounded-pill"
              style={{
                fontFamily: "var(--font-tommy-medium), sans-serif",
                fontSize: "0.75rem",
                background:
                  filter === "semua"
                    ? "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)"
                    : "rgba(38, 35, 31, 0.65)",
                color: filter === "semua" ? "#16120e" : "#dfd5c7",
                border: "1px solid rgba(197, 160, 89, 0.28)",
              }}
            >
              Semua Feed
            </button>
            <button
              type="button"
              onClick={() => setFilter("kode")}
              className="btn btn-sm px-3 py-1 rounded-pill"
              style={{
                fontFamily: "var(--font-tommy-medium), sans-serif",
                fontSize: "0.75rem",
                background:
                  filter === "kode"
                    ? "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)"
                    : "rgba(38, 35, 31, 0.65)",
                color: filter === "kode" ? "#16120e" : "#dfd5c7",
                border: "1px solid rgba(197, 160, 89, 0.28)",
              }}
            >
              Dengan Kode
            </button>
          </div>

          <Link
            href="/"
            className="btn btn-sm btn-glass-subtle px-3 py-1 rounded-pill text-decoration-none"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.75rem",
              color: "#e6cfa3",
            }}
          >
            Home
          </Link>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="smoked-glass p-4 text-center">
            <p
              className="mb-0"
              style={{ fontSize: "0.82rem", color: "#9d958b" }}
            >
              Belum ada postingan feed yang cocok.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredPosts.map((post) => {
              const isUpvoted = upvotedIds.includes(post.id);
              const baseVotes = Number(post.upvotes || 0);
              const totalVotes = isUpvoted ? baseVotes + 1 : baseVotes;
              const commentCount = Array.isArray(post.comments)
                ? post.comments.length
                : 0;

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: SMOOTH_EASE }}
                  className="smoked-glass p-3.5"
                >
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "28px",
                          height: "28px",
                          background: "rgba(197, 160, 89, 0.16)",
                          border: "1px solid rgba(197, 160, 89, 0.32)",
                          color: "#e6cfa3",
                          fontFamily: "var(--font-tommy-extra), sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        {String(post.author || "A")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-caviar), sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#e6cfa3",
                        }}
                      >
                        @{post.author}
                      </span>
                      {post.category && (
                        <span
                          className="px-2.5 py-0.5 rounded-pill"
                          style={{
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                            fontSize: "0.68rem",
                            background: "rgba(197, 160, 89, 0.16)",
                            border: "1px solid rgba(197, 160, 89, 0.32)",
                            color: "#e6cfa3",
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "#7d756b" }}>
                      {post.time}
                    </span>
                  </div>

                  {post.title && (
                    <h2
                      className="h6 mb-1.5"
                      style={{
                        fontFamily: "var(--font-tommy-extra), sans-serif",
                        color: "#f2ece1",
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </h2>
                  )}

                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "var(--font-tommy-regular), sans-serif",
                      fontSize: "0.84rem",
                      color: "#dfd5c7",
                      lineHeight: 1.62,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {post.content || post.excerpt}
                  </p>

                  {post.image && (
                    <div className="mt-2.5">
                      <img
                        src={post.image}
                        alt={post.title || "Lampiran feed"}
                        onClick={() => openZoom(post.image)}
                        className="img-fluid rounded-3"
                        style={{
                          maxHeight: "280px",
                          objectFit: "cover",
                          cursor: "zoom-in",
                          border: "1px solid rgba(197, 160, 89, 0.2)",
                        }}
                      />
                    </div>
                  )}

                  {post.code && (
                    <div className="position-relative mt-2.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(post.code, post.id)}
                        className="btn btn-sm py-0.5 px-2 rounded-pill position-absolute top-0 end-0 m-2"
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          background: "rgba(24, 22, 19, 0.88)",
                          border: "1px solid rgba(197, 160, 89, 0.35)",
                          color: copiedId === post.id ? "#8ce0a8" : "#e6cfa3",
                        }}
                      >
                        {copiedId === post.id ? "Tersalin" : "Salin"}
                      </button>
                      <pre className="code-wall p-2.5 mb-0">{post.code}</pre>
                    </div>
                  )}

                  <div
                    className="d-flex align-items-center gap-3 mt-3 pt-2 border-top"
                    style={{ borderColor: "rgba(197, 160, 89, 0.14)" }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleUpvote(post.id)}
                      className="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-1"
                      style={{
                        fontSize: "0.76rem",
                        color: isUpvoted ? "#e6cfa3" : "#b8ad9e",
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                      }}
                    >
                      <span>Bantu Naik</span>
                      <span>{totalVotes}</span>
                    </button>

                    <Link
                      href={`/forum/${post.id}`}
                      className="text-decoration-none d-inline-flex align-items-center gap-1"
                      style={{
                        fontSize: "0.76rem",
                        color: "#b8ad9e",
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                      }}
                    >
                      <span>{commentCount} Balasan</span>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </main>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
            style={{
              backgroundColor: "rgba(8, 7, 6, 0.92)",
              zIndex: 1060,
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.max(1, s - 0.5))}
                className="btn btn-sm btn-glass-subtle p-2 rounded-circle"
                aria-label="Perkecil gambar"
              >
                <MagnifyingGlassMinus size={18} />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.min(4, s + 0.5))}
                className="btn btn-sm btn-glass-subtle p-2 rounded-circle"
                aria-label="Perbesar gambar"
              >
                <MagnifyingGlassPlus size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomScale(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="btn btn-sm btn-glass-subtle p-2 rounded-circle"
                aria-label="Reset zoom"
              >
                <ArrowsClockwise size={18} />
              </button>
              <button
                type="button"
                onClick={closeZoom}
                className="btn btn-sm btn-glass-subtle p-2 rounded-circle"
                aria-label="Tutup pratinjau"
              >
                <X size={18} />
              </button>
            </div>

            <img
              src={zoomSrc}
              alt="Pratinjau gambar"
              className="img-fluid rounded-3"
              style={{
                maxHeight: "78vh",
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
                transition: dragStartRef.current ? "none" : "transform 0.2s ease",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
