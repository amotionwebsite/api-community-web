"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const BackArrowSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="#09244BFF"
      d="M4.838 9.894c3.936-5.355 12.007-5.141 15.631.433a9.5 9.5 0 0 1 1.505 4.464c.01.143.059.683-.001.938-.208.895-1.469 1.035-1.872.211-.159-.325-.1-.751-.129-1.087a7.5 7.5 0 0 0-.213-1.246 7.55 7.55 0 0 0-3.129-4.368c-3.525-2.33-8.468-1.245-10.586 2.45l4.061-.716.231-.014a1.01 1.01 0 0 1 .904 1.276c-.109.379-.414.62-.787.708l-5.909 1.042a1.1 1.1 0 0 1-.515-.045c-.339-.119-.566-.423-.644-.766L2.343 7.265a1 1 0 0 1 .024-.451c.298-1.035 1.707-.909 1.946.104Z"
    />
  </svg>
);

const SendSvg = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReplySvg = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 17L4 12L9 7M4 12H14C17.3137 12 20 14.6863 20 18V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

const GOLD_ACTION_BTN_STYLE = {
  fontFamily: "var(--font-tommy-medium), sans-serif",
  fontSize: "0.78rem",
  background: "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
  color: "#16120e",
  border: "1px solid rgba(255, 236, 188, 0.45)",
  boxShadow:
    "0 4px 14px rgba(197, 160, 89, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
};

const getCategoryBadgeStyle = (cat) => {
  const lower = (cat || "").toLowerCase();
  if (lower.includes("bug") || lower.includes("error")) {
    return {
      background: "rgba(217, 83, 79, 0.18)",
      border: "1px solid rgba(217, 83, 79, 0.38)",
      color: "#f28b82",
    };
  }
  if (lower.includes("workflow")) {
    return {
      background: "rgba(110, 168, 180, 0.16)",
      border: "1px solid rgba(110, 168, 180, 0.34)",
      color: "#9fd6e0",
    };
  }
  return {
    background: "rgba(197, 160, 89, 0.16)",
    border: "1px solid rgba(197, 160, 89, 0.32)",
    color: "#e6cfa1",
  };
};

const renderFormattedReplyText = (text, copiedId, setCopiedId, replyKey) => {
  const raw = String(text || "");
  if (!raw.includes("```")) {
    return (
      <p
        className="mb-0"
        style={{
          fontFamily: "var(--font-tommy-regular), sans-serif",
          fontSize: "0.84rem",
          color: "#dfd5c7",
          lineHeight: 1.58,
          whiteSpace: "pre-line",
        }}
      >
        {raw}
      </p>
    );
  }

  const parts = raw.split(/(```[\s\S]*?```)/g);
  return (
    <div className="d-flex flex-column gap-2">
      {parts.map((part, idx) => {
        if (!part) return null;
        if (part.startsWith("```") && part.endsWith("```")) {
          const inner = part.slice(3, -3).replace(/^\n/, "");
          const token = `${replyKey}-${idx}`;
          const isCopied = copiedId === token;
          return (
            <div
              key={token}
              className="rounded-3 overflow-hidden"
              style={{
                background: "rgba(10, 10, 12, 0.72)",
                border: "1px solid rgba(197, 160, 89, 0.24)",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-between px-2 py-1"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.66rem",
                    color: "#9d958b",
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                  }}
                >
                  Kode
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(inner).catch(() => {});
                    }
                    setCopiedId(token);
                    setTimeout(() => {
                      setCopiedId((prev) => (prev === token ? null : prev));
                    }, 1600);
                  }}
                  className="btn btn-sm py-0 px-2 rounded-pill"
                  style={{
                    fontSize: "0.66rem",
                    color: isCopied ? "#8ce0a8" : "#e6cfa1",
                    background: "rgba(197, 160, 89, 0.14)",
                    border: "1px solid rgba(197, 160, 89, 0.28)",
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                  }}
                >
                  {isCopied ? "Tersalin" : "Salin"}
                </button>
              </div>
              <pre
                className="code-wall p-2 mb-0"
                style={{
                  fontSize: "0.75rem",
                  color: "#f2ece1",
                  overflowX: "auto",
                }}
              >
                {inner}
              </pre>
            </div>
          );
        }

        return (
          <p
            key={`${replyKey}-txt-${idx}`}
            className="mb-0"
            style={{
              fontFamily: "var(--font-tommy-regular), sans-serif",
              fontSize: "0.84rem",
              color: "#dfd5c7",
              lineHeight: 1.58,
              whiteSpace: "pre-line",
            }}
          >
            {part}
          </p>
        );
      })}
    </div>
  );
};

export default function ThreadDetailView() {
  const params = useParams();
  const router = useRouter();
  const threadId = String(params?.id || "");
  const { user, feedPosts, addThreadComment } = useAuthStore();

  const thread = feedPosts.find((t) => String(t.id) === threadId);
  const [replyText, setReplyText] = useState("");
  const [shakeTick, setShakeTick] = useState(0);
  const [inputErr, setInputErr] = useState(false);
  const [sortOrder, setSortOrder] = useState("oldest");
  const [solvedCommentId, setSolvedCommentId] = useState(
    thread?.solvedCommentId || null
  );
  const [copiedId, setCopiedId] = useState(null);
  const [replyTarget, setReplyTarget] = useState(null);
  const [submittedComments, setSubmittedComments] = useState([]);
  const [sendAnimTick, setSendAnimTick] = useState(0);
  const [isLeavingToForum, setIsLeavingToForum] = useState(false);

  const handleBackToForum = (e) => {
    if (e) e.preventDefault();
    if (isLeavingToForum) return;
    setIsLeavingToForum(true);
    setTimeout(() => {
      router.push("/forum");
    }, 180);
  };

  const handleQuoteComment = (commentItem) => {
    const cleanSnippet = String(commentItem?.text || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 110);
    const quoteBlock = `> @${commentItem?.author || "member"}: "${cleanSnippet}${
      cleanSnippet.length >= 110 ? "..." : ""
    }"\n\n`;
    setReplyText((prev) =>
      prev.trim() ? `${prev.trim()}\n\n${quoteBlock}` : quoteBlock
    );
    setInputErr(false);
  };

  const handleReplyToComment = (commentItem) => {
    setReplyTarget(commentItem);
    setInputErr(false);
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    const clear = replyText.trim();
    if (!clear) {
      setInputErr(true);
      setShakeTick((n) => n + 1);
      return;
    }

    const authorName =
      user?.username ||
      user?.name ||
      (typeof user?.email === "string" ? user.email.split("@")[0] : "member");

    const newComment = {
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      parentId: replyTarget ? String(replyTarget.id) : null,
      author: authorName,
      time: "Baru saja",
      text: clear,
    };

    if (typeof addThreadComment === "function" && thread?.id !== undefined) {
      try {
        addThreadComment(thread.id, newComment);
      } catch (_) {}
    }

    setSubmittedComments((prev) => [...prev, newComment]);
    setSendAnimTick((n) => n + 1);
    setReplyText("");
    setReplyTarget(null);
    setInputErr(false);
  };

  const baseComments = Array.isArray(thread?.comments) ? thread.comments : [];
  const existingIds = new Set(baseComments.map((item) => String(item.id)));
  const mergedComments = [
    ...baseComments,
    ...submittedComments.filter((item) => !existingIds.has(String(item.id))),
  ];
  const activeSolvedId = solvedCommentId || thread?.solvedCommentId || null;

  const topLevelComments = mergedComments.filter((c) => !c.parentId);
  const childrenByParent = mergedComments.reduce((acc, c) => {
    if (c.parentId) {
      const pid = String(c.parentId);
      if (!acc[pid]) acc[pid] = [];
      acc[pid].push(c);
    }
    return acc;
  }, {});

  const orderedTopLevel = [...topLevelComments].sort((a, b) => {
    if (activeSolvedId) {
      if (String(a.id) === String(activeSolvedId)) return -1;
      if (String(b.id) === String(activeSolvedId)) return 1;
    }
    return sortOrder === "newest" ? 1 : 0;
  });

  const displayTopLevel =
    sortOrder === "newest" && !activeSolvedId
      ? [...topLevelComments].reverse()
      : orderedTopLevel;

  const renderCommentCard = (c, depth = 0) => {
    const isSolved = String(c.id) === String(activeSolvedId);
    const nestedReplies = childrenByParent[String(c.id)] || [];

    return (
      <div
        key={c.id}
        className={depth > 0 ? "mt-2 ps-3" : ""}
        style={
          depth > 0
            ? {
                borderLeft: "2px solid rgba(197, 160, 89, 0.35)",
              }
            : undefined
        }
      >
        <motion.div
          layout
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.34, ease: SMOOTH_EASE }}
          className="p-2.5 rounded-3"
          style={{
            backgroundColor: isSolved
              ? "rgba(76, 175, 80, 0.08)"
              : depth > 0
              ? "rgba(22, 19, 16, 0.72)"
              : "rgba(14, 12, 10, 0.58)",
            border: isSolved
              ? "1px solid rgba(116, 214, 128, 0.34)"
              : "1px solid rgba(197, 160, 89, 0.16)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between gap-2 mb-1 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.78rem",
                  color: "#e6cfa1",
                }}
              >
                @{c.author}
              </span>
              {isSolved && (
                <span
                  className="px-2 py-0 rounded-pill"
                  style={{
                    fontSize: "0.64rem",
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    background: "rgba(76, 175, 80, 0.18)",
                    border: "1px solid rgba(116, 214, 128, 0.4)",
                    color: "#8ce0a8",
                  }}
                >
                  Solusi Terbaik
                </span>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={() => handleReplyToComment(c)}
                className="btn btn-link p-0 text-decoration-none"
                style={{
                  fontSize: "0.68rem",
                  color: "#e6cfa1",
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                }}
              >
                Balas
              </button>
              <button
                type="button"
                onClick={() => handleQuoteComment(c)}
                className="btn btn-link p-0 text-decoration-none"
                style={{
                  fontSize: "0.68rem",
                  color: "#c5a059",
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                }}
              >
                Quote
              </button>
              <button
                type="button"
                onClick={() =>
                  setSolvedCommentId((prev) =>
                    String(prev) === String(c.id) ? null : c.id
                  )
                }
                className="btn btn-link p-0 text-decoration-none"
                style={{
                  fontSize: "0.68rem",
                  color: isSolved ? "#8ce0a8" : "#9d958b",
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                }}
              >
                {isSolved ? "Batal Solved" : "Tandai Solved"}
              </button>
              <span
                style={{
                  fontFamily: "var(--font-tommy-regular), sans-serif",
                  fontSize: "0.68rem",
                  color: "#7d756b",
                }}
              >
                {c.time}
              </span>
            </div>
          </div>

          {renderFormattedReplyText(c.text, copiedId, setCopiedId, String(c.id))}
        </motion.div>

        {nestedReplies.length > 0 && (
          <div className="d-flex flex-column">
            {nestedReplies.map((child) => renderCommentCard(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={
        isLeavingToForum
          ? { opacity: 0, x: -16, scale: 0.985 }
          : { opacity: 1, x: 0, y: 0, scale: 1 }
      }
      transition={{ duration: 0.24, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />
      <main
        className="container py-4 flex-grow-1 mb-4"
        style={{ maxWidth: "740px" }}
      >
        <div className="mb-3">
          <motion.a
            href="/forum"
            onClick={handleBackToForum}
            whileHover={{ x: -3, scale: 1.02 }}
            whileTap={{ x: -7, scale: 0.93 }}
            transition={{ duration: 0.18, ease: SMOOTH_EASE }}
            className="btn btn-sm px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5 text-decoration-none"
            style={GOLD_ACTION_BTN_STYLE}
          >
            <motion.span
              animate={isLeavingToForum ? { x: -4 } : { x: 0 }}
              transition={{ duration: 0.16, ease: SMOOTH_EASE }}
              className="d-inline-flex align-items-center"
            >
              <BackArrowSvg size={18} />
            </motion.span>
            <span>Forum</span>
          </motion.a>
        </div>

        {!thread ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="smoked-glass p-4 text-center"
          >
            <div
              className="h5 mb-1.5"
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
              }}
            >
              Utas Tidak Ditemukan
            </div>
            <p className="mb-3" style={{ fontSize: "0.82rem", color: "#9d958b" }}>
              Utas diskusi yang kamu cari mungkin sudah dihapus atau berpindah.
            </p>
            <Link
              href="/forum"
              className="btn btn-sm btr-sogan px-3 py-1.5 rounded-pill"
              style={{ fontFamily: "var(--font-tommy-medium), sans-serif" }}
            >
              Ke Forum Bedah Kode
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: SMOOTH_EASE }}
              className="smoked-glass p-3.5 mb-3"
            >
              <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span
                    className="px-2.5 py-0.5 rounded-pill"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.68rem",
                      ...getCategoryBadgeStyle(thread.category),
                    }}
                  >
                    {thread.category}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-pill"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.66rem",
                      background: activeSolvedId
                        ? "rgba(76, 175, 80, 0.16)"
                        : "rgba(255, 255, 255, 0.05)",
                      border: activeSolvedId
                        ? "1px solid rgba(116, 214, 128, 0.36)"
                        : "1px solid rgba(255, 255, 255, 0.12)",
                      color: activeSolvedId ? "#8ce0a8" : "#a89f94",
                    }}
                  >
                    {activeSolvedId ? "Solved" : "Open"}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-caviar), sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#e6cfa1",
                    }}
                  >
                    @{thread.author}
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#7d756b" }}>
                  {thread.time}
                </span>
              </div>

              <h1
                className="h5 mb-2"
                style={{
                  fontFamily: "var(--font-tommy-extra), sans-serif",
                  color: "#f2ece1",
                  lineHeight: 1.4,
                }}
              >
                {thread.title}
              </h1>

              <p
                className="mb-0"
                style={{
                  fontFamily: "var(--font-tommy-regular), sans-serif",
                  fontSize: "0.86rem",
                  color: "#dfd5c7",
                  lineHeight: 1.68,
                  whiteSpace: "pre-line",
                }}
              >
                {thread.content || thread.excerpt}
              </p>

              {thread.code && (
                <pre className="code-wall p-2.5 mt-3 mb-0">{thread.code}</pre>
              )}
            </motion.article>

            <div className="smoked-glass p-3.5 mb-3">
              <div className="d-flex align-items-center justify-content-between gap-2 mb-3 flex-wrap">
                <div className="d-flex align-items-center gap-1.5">
                  <ReplySvg size={16} />
                  <span
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.78rem",
                      color: "#c5a059",
                    }}
                  >
                    {mergedComments.length || 0} Balasan Diskusi
                  </span>
                </div>

                {topLevelComments.length > 1 && (
                  <div className="d-flex align-items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSortOrder("oldest")}
                      className="btn btn-sm py-0.5 px-2.5 rounded-pill"
                      style={{
                        fontSize: "0.68rem",
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        background:
                          sortOrder === "oldest"
                            ? "rgba(197, 160, 89, 0.22)"
                            : "rgba(255, 255, 255, 0.04)",
                        border:
                          sortOrder === "oldest"
                            ? "1px solid rgba(197, 160, 89, 0.45)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        color: sortOrder === "oldest" ? "#f2ece1" : "#9d958b",
                      }}
                    >
                      Terlama
                    </button>
                    <button
                      type="button"
                      onClick={() => setSortOrder("newest")}
                      className="btn btn-sm py-0.5 px-2.5 rounded-pill"
                      style={{
                        fontSize: "0.68rem",
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        background:
                          sortOrder === "newest"
                            ? "rgba(197, 160, 89, 0.22)"
                            : "rgba(255, 255, 255, 0.04)",
                        border:
                          sortOrder === "newest"
                            ? "1px solid rgba(197, 160, 89, 0.45)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        color: sortOrder === "newest" ? "#f2ece1" : "#9d958b",
                      }}
                    >
                      Terbaru
                    </button>
                  </div>
                )}
              </div>

              {mergedComments.length === 0 ? (
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-tommy-regular), sans-serif",
                    fontSize: "0.82rem",
                    color: "#8f857b",
                  }}
                >
                  Belum ada balasan di utas ini. Jadilah yang pertama membantu!
                </p>
              ) : (
                <div className="d-flex flex-column gap-2 mb-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {displayTopLevel.map((c) => renderCommentCard(c, 0))}
                  </AnimatePresence>
                </div>
              )}

              {!user ? (
                <div
                  className="p-2.5 rounded-3 d-flex align-items-center justify-content-between gap-2"
                  style={{
                    backgroundColor: "rgba(14, 12, 10, 0.65)",
                    border: "1px solid rgba(197, 160, 89, 0.16)",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "#9a8f82" }}>
                    Masuk terlebih dahulu untuk menulis balasan.
                  </span>
                  <Link
                    href="/login"
                    className="btn btn-sm btr-sogan px-3 py-1 rounded-pill flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.74rem",
                    }}
                  >
                    Masuk
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSendComment}
                  className="d-flex flex-column gap-2"
                >
                  <AnimatePresence>
                    {replyTarget && (
                      <motion.div
                        key={`target-${replyTarget.id}`}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                        className="px-2.5 py-1.5 rounded-3 d-flex align-items-center justify-content-between gap-2"
                        style={{
                          backgroundColor: "rgba(197, 160, 89, 0.12)",
                          border: "1px solid rgba(197, 160, 89, 0.3)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "#e6cfa1",
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                          }}
                        >
                          Membalas @{replyTarget.author}
                        </span>
                        <button
                          type="button"
                          onClick={() => setReplyTarget(null)}
                          className="btn btn-link p-0 text-decoration-none"
                          style={{ fontSize: "0.7rem", color: "#9d958b" }}
                        >
                          Batal
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    key={`reply-${shakeTick}`}
                    animate={
                      inputErr
                        ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.36 }}
                  >
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => {
                        setReplyText(e.target.value);
                        if (inputErr) setInputErr(false);
                      }}
                      placeholder={
                        replyTarget
                          ? `Tulis balasan untuk @${replyTarget.author}...`
                          : "Tulis solusi atau tanggapanmu di sini..."
                      }
                      className="form-control form-control-sm"
                      style={{
                        fontFamily: "var(--font-tommy-regular), sans-serif",
                        backgroundColor: inputErr
                          ? "rgba(217, 83, 79, 0.16)"
                          : "rgba(14, 12, 10, 0.72)",
                        borderColor: inputErr
                          ? "#d9534f"
                          : "rgba(197, 160, 89, 0.24)",
                        color: "#f2ece1",
                      }}
                    />
                  </motion.div>
                  <div className="d-flex justify-content-end">
                    <motion.button
                      type="submit"
                      key={`send-btn-${sendAnimTick}`}
                      initial={
                        sendAnimTick > 0 ? { scale: 0.92 } : { scale: 1 }
                      }
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ duration: 0.24, ease: SMOOTH_EASE }}
                      className="btn btn-sm px-3.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5"
                      style={GOLD_ACTION_BTN_STYLE}
                    >
                      <span>Kirim Balasan</span>
                      <motion.span
                        key={`plane-${sendAnimTick}`}
                        initial={
                          sendAnimTick > 0
                            ? { x: -4, y: 4, rotate: -18, opacity: 0.7 }
                            : false
                        }
                        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.32, ease: SMOOTH_EASE }}
                        className="d-inline-flex align-items-center"
                      >
                        <SendSvg size={14} />
                      </motion.span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </main>
    </motion.div>
  );
}
