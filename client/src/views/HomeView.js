"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatCircleText,
  ArrowFatUp,
  CodeSimple,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { INITIAL_THREADS } from "../data/threads";
import { useAuthStore } from "../store/useAuthStore";

export default function HomeView() {
  const user = useAuthStore((s) => s.user);
  const [copiedId, setCopiedId] = useState(null);
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [postText, setPostText] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [filter, setFilter] = useState("semua");

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

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;
    const newItem = {
      id: String(Date.now()),
      title: postText.trim(),
      category: codeSnippet.trim() ? "Bug & Error" : "Diskusi Tech",
      author: user?.username || "pegiat_kode",
      time: "Baru saja",
      solved: false,
      excerpt: postText.trim(),
      content: postText.trim(),
      code: codeSnippet.trim() || null,
      comments: [],
    };
    setThreads([newItem, ...threads]);
    setPostText("");
    setCodeSnippet("");
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
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {/* Composer Postingan Baru */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleCreatePost}
          className="smoked-glass p-3 mb-3"
        >
          <div className="d-flex gap-2.5">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "36px",
                height: "36px",
                background: "rgba(197, 160, 89, 0.14)",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                color: "#c5a059",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              {(user?.username?.[0] || "A").toUpperCase()}
            </div>

            <div className="flex-grow-1">
              <textarea
                rows={2}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Tulis postingan baru, bagikan catatan ngoding, atau tanyakan error..."
                className="form-control border-0 bg-transparent p-0 shadow-none"
                style={{
                  color: "#f2ece1",
                  fontSize: "0.88rem",
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
                      rows={3}
                      value={codeSnippet}
                      onChange={(e) => setCodeSnippet(e.target.value)}
                      placeholder="// Tempel potongan kode atau log error di sini..."
                      className="form-control code-well p-2.5"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="d-flex align-items-center justify-content-between pt-2 mt-2 border-top"
                style={{ borderColor: "rgba(197, 160, 89, 0.12)" }}
              >
                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
                  style={{
                    fontSize: "0.74rem",
                    color: showCodeInput ? "#c5a059" : "#b8ad9e",
                  }}
                >
                  <CodeSimple weight="bold" size={15} />
                  <span>{showCodeInput ? "Tutup Kode" : "Sisipkan Kode"}</span>
                </button>

                <button
                  type="submit"
                  className="btn btn-sm btn-sogan px-3 py-1 d-inline-flex align-items-center gap-1"
                  style={{ fontSize: "0.76rem" }}
                >
                  <span>Terbitkan</span>
                  <PaperPlaneTilt weight="fill" size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.form>

        {/* Filter Pill */}
        <div className="d-flex align-items-center gap-2 mb-3">
          {[
            { id: "semua", label: "Semua Feed" },
            { id: "code", label: "Dengan Kode" },
            { id: "solved", label: "Terpecahkan" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className="btn btn-sm rounded-pill px-3 py-1"
              style={{
                fontSize: "0.76rem",
                backgroundColor:
                  filter === tab.id ? "#c5a059" : "rgba(25, 21, 18, 0.7)",
                color: filter === tab.id ? "#120f0c" : "#b8ad9e",
                border: "1px solid rgba(197, 160, 89, 0.2)",
                fontWeight: filter === tab.id ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed Diskusi */}
        <div className="d-flex flex-column gap-2.5 mb-4">
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
                className="smoked-glass smoked-glass-interactive p-3"
              >
                <div className="d-flex gap-2.5">
                  {/* Avatar + Garis Alur */}
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
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
                  <div className="flex-grow-1 min-w-0">
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
                            fontSize: "0.66rem",
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
                              fontSize: "0.66rem",
                              background: "rgba(118, 168, 130, 0.14)",
                              color: "#8fc29b",
                            }}
                          >
                            Terpecahkan
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "#7d7367" }}>
                        {item.time}
                      </span>
                    </div>

                    <Link
                      href={`/forum/${item.id}`}
                      className="text-decoration-none"
                    >
                      <h2
                        className="h6 mb-1"
                        style={{ color: "#f2ece1", lineHeight: 1.4 }}
                      >
                        {item.title}
                      </h2>
                    </Link>

                    <p
                      className="mb-2"
                      style={{ fontSize: "0.83rem", color: "#b8ad9e" }}
                    >
                      {item.excerpt}
                    </p>

                    {snippet && (
                      <div className="position-relative mb-2">
                        <pre className="code-well p-2.5 mb-0 overflow-auto">
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
      </main>
    </div>
  );
}
