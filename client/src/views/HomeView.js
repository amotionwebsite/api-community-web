"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatCircleText,
  ArrowFatUp,
  Code,
  PaperPlaneTilt,
  ImageSquare,
  X,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { INITIAL_THREADS } from "../data/threads";
import { useAuthStore } from "../store/useAuthStore";

const POST_TAGS = [
  "Bug & Error",
  "Workflow",
  "Diskusi Tech",
  "Tips & Trik",
  "Rilis Karya",
];

export default function HomeView() {
  const user = useAuthStore((s) => s.user);
  const [copiedId, setCopiedId] = useState(null);
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [postText, setPostText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Diskusi Tech");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [filter, setFilter] = useState("semua");
  const fileInputRef = useRef(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPostImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim() && !postImage) return;
    const contentClean =
      postText.trim() || "Melampirkan gambar error / tangkapan layar.";
    const newItem = {
      id: String(Date.now()),
      title: contentClean.slice(0, 72),
      category: selectedTag,
      author: user?.username || "pegiat_kode",
      time: "Baru saja",
      solved: false,
      excerpt: contentClean,
      content: contentClean,
      code: codeSnippet.trim() || null,
      image: postImage || null,
      comments: [],
    };
    setThreads([newItem, ...threads]);
    setPostText("");
    setCodeSnippet("");
    setPostImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowCodeInput(false);
  };

  const toggleUpvote = (id) => {
    setUpvotedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const visibleThreads = threads.filter((t) => {
    if (filter === "solved") return t.solved;
    if (filter === "code") return Boolean(t.code || t.id === "1");
    return true;
  });

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas overflow-x-hidden">
      <Navbar />

      <main className="container pt-4 flex-grow-1" style={{ maxWidth: "740px" }}>
        {/* Filter Feed */}
        <div className="d-flex align-items-center gap-2 mb-3 overflow-x-auto pb-1">
          {[
            { id: "semua", label: "Semua Feed" },
            { id: "code", label: "Dengan Kode" },
            { id: "solved", label: "Terpecahkan" },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className="btn btn-sm rounded-pill px-3 py-1 flex-shrink-0"
                style={{
                  fontSize: "0.75rem",
                  backgroundColor: active
                    ? "#c5a059"
                    : "rgba(255, 255, 255, 0.04)",
                  color: active ? "#120f0c" : "#b8ad9e",
                  border: active
                    ? "1px solid #c5a059"
                    : "1px solid rgba(197, 160, 89, 0.14)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Stream Utas Komunitas */}
        <div className="d-flex flex-column gap-3">
          {visibleThreads.map((item, index) => {
            const upvoted = upvotedIds.includes(item.id);
            const snippet =
              item.code ||
              (item.id === "1"
                ? `app.use(cors({ origin: "https://api-community-web.vercel.app" }));`
                : null);

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="smoked-glass smoked-glass-interactive p-3 overflow-hidden"
              >
                <div className="d-flex gap-2.5">
                  {/* Avatar + Garis Alur */}
                  <div className="d-flex flex-column align-items-center flex-shrink-0">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "rgba(184, 107, 67, 0.16)",
                        border: "1px solid rgba(197, 160, 89, 0.28)",
                        color: "#e6cfa3",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.author[0].toUpperCase()}
                    </div>
                    <div className="thread-spine flex-grow-1 my-1.5" />
                  </div>

                  {/* Isi Postingan */}
                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                      <div className="d-flex align-items-center gap-1.5 flex-wrap">
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#e6cfa3",
                          }}
                        >
                          @{item.author}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-pill"
                          style={{
                            fontSize: "0.68rem",
                            background: "rgba(197, 160, 89, 0.1)",
                            color: "#c5a059",
                          }}
                        >
                          {item.category}
                        </span>
                        {item.solved && (
                          <span
                            className="px-2 py-0.5 rounded-pill"
                            style={{
                              fontSize: "0.68rem",
                              background: "rgba(118, 168, 130, 0.14)",
                              color: "#8fc29b",
                            }}
                          >
                            Terpecahkan
                          </span>
                        )}
                      </div>
                      <span
                        className="flex-shrink-0"
                        style={{ fontSize: "0.7rem", color: "#7d7367" }}
                      >
                        {item.time}
                      </span>
                    </div>

                    <Link
                      href={`/forum/${item.id}`}
                      className="text-decoration-none"
                    >
                      <h2
                        className="h6 mb-1 text-break"
                        style={{ color: "#f2ece1", lineHeight: 1.4 }}
                      >
                        {item.title}
                      </h2>
                    </Link>

                    <p
                      className="mb-2 text-break"
                      style={{ fontSize: "0.83rem", color: "#b8ad9e" }}
                    >
                      {item.excerpt}
                    </p>

                    {item.image && (
                      <div
                        className="mb-2.5 rounded-3 overflow-hidden"
                        style={{
                          border: "1px solid rgba(197, 160, 89, 0.2)",
                          backgroundColor: "#110e0c",
                        }}
                      >
                        <img
                          src={item.image}
                          alt="Lampiran postingan"
                          className="w-100 object-fit-cover"
                          style={{ maxHeight: "240px" }}
                        />
                      </div>
                    )}

                    {snippet && (
                      <div className="position-relative mb-2 w-100 overflow-hidden">
                        <pre className="code-well p-2.5 pe-5 mb-0">
                          {snippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopy(snippet, `code-${item.id}`)}
                          className="btn btn-sm btn-glass-subtle position-absolute top-0 end-0 m-1.5 px-2 py-0.5"
                          style={{ fontSize: "0.68rem" }}
                        >
                          {copiedId === `code-${item.id}` ? "Disalin" : "Salin"}
                        </button>
                      </div>
                    )}

                    <div className="d-flex align-items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => toggleUpvote(item.id)}
                        className="btn btn-sm p-0 border-0 d-inline-flex align-items-center gap-1"
                        style={{
                          fontSize: "0.76rem",
                          color: upvoted ? "#c5a059" : "#8f8578",
                        }}
                      >
                        <ArrowFatUp
                          weight={upvoted ? "fill" : "regular"}
                          size={16}
                        />
                        <span>{upvoted ? "Terbantu" : "Bantu Naik"}</span>
                      </button>

                      <Link
                        href={`/forum/${item.id}`}
                        className="text-decoration-none d-inline-flex align-items-center gap-1"
                        style={{ fontSize: "0.76rem", color: "#8f8578" }}
                      >
                        <ChatCircleText weight="regular" size={16} />
                        <span>{item.comments?.length || 0} Balasan</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Spacer aman agar postingan paling bawah tidak tertutup composer & dock nav */}
        <div style={{ height: "235px" }} />
      </main>

      {/* Composer Postingan Baru di Bawah (Tepat di atas dock navigasi bawah) */}
      <div
        className="position-fixed start-0 w-100 px-3"
        style={{ bottom: "76px", zIndex: 42 }}
      >
        <div className="container px-0" style={{ maxWidth: "740px" }}>
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleCreatePost}
            className="p-2.5 rounded-4"
            style={{
              backgroundColor: "rgba(18, 15, 12, 0.88)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(197, 160, 89, 0.24)",
              boxShadow: "0 10px 28px rgba(0, 0, 0, 0.65)",
            }}
          >
            {/* Pratinjau Gambar Error / Lampiran jika diunggah */}
            {postImage && (
              <div
                className="position-relative mb-2 rounded-3 overflow-hidden d-inline-block"
                style={{ border: "1px solid rgba(197, 160, 89, 0.3)" }}
              >
                <img
                  src={postImage}
                  alt="Pratinjau gambar"
                  className="object-fit-cover"
                  style={{ maxHeight: "96px", maxWidth: "180px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPostImage("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="btn btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-0.5 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "rgba(12, 10, 9, 0.85)",
                    color: "#f2ece1",
                    border: "1px solid rgba(197, 160, 89, 0.35)",
                  }}
                  title="Hapus gambar"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="d-flex gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "34px",
                  height: "34px",
                  background: "rgba(197, 160, 89, 0.14)",
                  border: "1px solid rgba(197, 160, 89, 0.3)",
                  color: "#c5a059",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                }}
              >
                {(user?.username?.[0] || "A").toUpperCase()}
              </div>

              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <textarea
                  rows={1}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Tulis postingan baru, bagikan catatan ngoding, atau tanyakan error..."
                  className="form-control border-0 bg-transparent p-0 shadow-none"
                  style={{
                    color: "#f2ece1",
                    fontSize: "0.84rem",
                    resize: "none",
                  }}
                />

                <AnimatePresence>
                  {showCodeInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden"
                    >
                      <textarea
                        rows={2}
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        placeholder="// Tempel potongan kode atau log error di sini..."
                        className="form-control code-well p-2"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pilihan Tag Ringkas & Clean di Atas Tombol Sisipkan Kode */}
                <div className="d-flex align-items-center gap-1 overflow-x-auto pt-2 pb-1">
                  {POST_TAGS.map((tag) => {
                    const active = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(tag)}
                        className="btn btn-sm rounded-pill px-2 py-0 flex-shrink-0"
                        style={{
                          fontSize: "0.67rem",
                          lineHeight: 1.55,
                          backgroundColor: active
                            ? "rgba(197, 160, 89, 0.18)"
                            : "rgba(255, 255, 255, 0.03)",
                          color: active ? "#e6cfa3" : "#8f8578",
                          border: active
                            ? "1px solid rgba(197, 160, 89, 0.45)"
                            : "1px solid rgba(255, 255, 255, 0.06)",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                {/* Baris Aksi: Sisipkan Kode, Gambar, dan Terbitkan */}
                <div
                  className="d-flex align-items-center justify-content-between pt-1.5 mt-1 border-top"
                  style={{ borderColor: "rgba(197, 160, 89, 0.12)" }}
                >
                  <div className="d-flex align-items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      <Code size={14} />
                      <span>Sisipkan Kode</span>
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      <ImageSquare size={14} style={{ color: "#c5a059" }} />
                      <span>Gambar</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sm btn-sogan px-3 py-1 d-inline-flex align-items-center gap-1"
                    style={{ fontSize: "0.73rem" }}
                  >
                    <span>Terbitkan</span>
                    <PaperPlaneTilt weight="fill" size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
