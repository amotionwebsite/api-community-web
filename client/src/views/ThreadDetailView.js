"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const BackArrowSvg = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M7.828 11H20a1 1 0 0 1 0 2H7.828l5.364 5.364a1 1 0 0 1-1.414 1.414l-7.071-7.071a1 1 0 0 1 0-1.414l7.071-7.071a1 1 0 1 1 1.414 1.414Z"
    />
  </svg>
);

const SendSvg = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m9.53 15.846.177-.139 5-5c.359-.409.405-1.009 0-1.414-.404-.405-1.004-.358-1.414 0l-5 5-.14.176-5.15-2.981c-.521-.34-.772-.956-.532-1.554.137-.342.401-.562.733-.703l15.611-5.647c.468-.144.954-.063 1.309.292s.435.841.291 1.309l-5.646 15.61c-.141.333-.361.597-.704.734-.597.24-1.213-.011-1.553-.532Z"
    />
  </svg>
);

const ReplySvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m21.319 19.142.39 1.326c.101.451-.046.913-.464 1.151a1 1 0 0 1-.513.131l-.264-.041-1.326-.39a5.55 5.55 0 0 1-2.582.679c-3.528.083-6.123-3.218-5.443-6.624a5.4 5.4 0 0 1 1.335-2.596c3.4-3.645 9.461-1.311 9.547 3.668a5.4 5.4 0 0 1-.68 2.696m-2.043.134c-.111-.735.257-.897.5-1.545.192-.513.261-1.07.202-1.614-.304-2.816-3.721-4.112-5.822-2.215-2.222 2.007-1.019 5.754 1.961 6.076a3.5 3.5 0 0 0 1.614-.202c.648-.243.81-.611 1.545-.5M4.921 18.079l1.34-.394.276-.041c.401-.002.687.263 1.018.451l.477.246q.491.23 1.012.381l.532.132c.569.118 1.12.095 1.36.732l.059.254c.026.263-.055.529-.222.733a1 1 0 0 1-.675.36c-.231.023-.762-.087-.887-.112a8.5 8.5 0 0 1-2.814-1.091l-2.67.785c-.803.179-1.421-.439-1.242-1.242l.786-2.671a8.6 8.6 0 0 1-1.144-3.091c-.668-4.12 1.501-8.123 5.334-9.787 3.862-1.677 8.382-.359 10.843 3.018.277.379.517.784.731 1.201.262.512.582 1.102.196 1.64a1 1 0 0 1-1.166.352c-.484-.182-.59-.639-.801-1.062l-.265-.48a7 7 0 0 0-1-1.292c-2.126-2.169-5.516-2.718-8.215-1.32-2.69 1.394-4.198 4.446-3.679 7.43a7 7 0 0 0 .519 1.68l.261.517c.191.341.474.642.471 1.056l-.041.275Z"
    />
  </svg>
);

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

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
      background: "rgba(118, 168, 130, 0.16)",
      border: "1px solid rgba(118, 168, 130, 0.34)",
      color: "#9fd0aa",
    };
  }
  return {
    background: "rgba(197, 160, 89, 0.16)",
    border: "1px solid rgba(197, 160, 89, 0.32)",
    color: "#e6cfa3",
  };
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

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    const clean = replyText.trim();
    if (!clean) {
      setInputErr(true);
      setShakeTick((n) => n + 1);
      return;
    }
    addThreadComment(thread.id, {
      id: `c-${Date.now()}`,
      author: user.username,
      time: "Baru saja",
      text: clean,
    });
    setReplyText("");
    setInputErr(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {/* Tombol Kembali */}
        <div className="mb-3">
          <motion.button
            type="button"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => router.back()}
            className="btn btn-sm btn-glass-subtle px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.75rem",
              color: "#e6cfa3",
            }}
          >
            <BackArrowSvg size={14} />
            <span>Kembali</span>
          </motion.button>
        </div>

        {!thread ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="smoked-glass p-4 text-center"
          >
            <h1
              className="h5 mb-1.5"
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
              }}
            >
              Utas Tidak Ditemukan
            </h1>
            <p className="mb-3" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
              Utas diskusi yang kamu cari mungkin sudah dihapus atau berpindah.
            </p>
            <Link
              href="/forum"
              className="btn btn-sm btn-sogan px-3.5 py-1.5 rounded-pill"
              style={{ fontFamily: "var(--font-tommy-medium), sans-serif" }}
            >
              Ke Forum Bedah Kode
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Kartu Utama Utas */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: SMOOTH_EASE }}
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
                    style={{
                      fontFamily: "var(--font-caviar), sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#e6cfa3",
                    }}
                  >
                    @{thread.author}
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#7d7367" }}>
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
                  color: "#cfc5b6",
                  lineHeight: 1.65,
                  whiteSpace: "pre-line",
                }}
              >
                {thread.content || thread.excerpt}
              </p>

              {thread.code && (
                <pre className="code-well p-2.5 mt-3 mb-0">{thread.code}</pre>
              )}
            </motion.article>

            {/* Daftar Balasan */}
            <div className="smoked-glass p-3.5 mb-3">
              <div className="d-flex align-items-center gap-1.5 mb-3">
                <ReplySvg size={16} />
                <span
                  style={{
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    fontSize: "0.78rem",
                    color: "#c5a059",
                  }}
                >
                  {thread.comments?.length || 0} Balasan Diskusi
                </span>
              </div>

              {!thread.comments || thread.comments.length === 0 ? (
                <p
                  className="mb-3"
                  style={{ fontSize: "0.8rem", color: "#8f8578" }}
                >
                  Belum ada balasan di utas ini. Jadilah yang pertama membantu!
                </p>
              ) : (
                <div className="d-flex flex-column gap-2 mb-3">
                  <AnimatePresence initial={false}>
                    {thread.comments.map((c) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: SMOOTH_EASE }}
                        className="p-2.5 rounded-3"
                        style={{
                          backgroundColor: "rgba(14, 12, 10, 0.58)",
                          border: "1px solid rgba(197, 160, 89, 0.14)",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span
                            style={{
                              fontFamily: "var(--font-caviar), sans-serif",
                              fontSize: "0.76rem",
                              fontWeight: 600,
                              color: "#e6cfa3",
                            }}
                          >
                            @{c.author}
                          </span>
                          <span style={{ fontSize: "0.68rem", color: "#7d7367" }}>
                            {c.time}
                          </span>
                        </div>
                        <p
                          className="mb-0"
                          style={{
                            fontSize: "0.82rem",
                            color: "#d8cfc2",
                            lineHeight: 1.55,
                          }}
                        >
                          {c.text}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Form Tulis Balasan (Dilindungi Login) */}
              {!user ? (
                <div
                  className="p-2.5 rounded-3 d-flex align-items-center justify-content-between gap-2"
                  style={{
                    backgroundColor: "rgba(14, 12, 10, 0.55)",
                    border: "1px solid rgba(197, 160, 89, 0.16)",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "#9a8f80" }}>
                    Masuk terlebih dahulu untuk menulis balasan.
                  </span>
                  <Link
                    href="/login"
                    className="btn btn-sm btn-sogan px-3 py-1 rounded-pill flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.74rem",
                    }}
                  >
                    Masuk
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSendComment} className="d-flex flex-column gap-2">
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
                      rows={2}
                      value={replyText}
                      onChange={(e) => {
                        setReplyText(e.target.value);
                        if (inputErr) setInputErr(false);
                      }}
                      placeholder="Tulis solusi atau tanggapanmu di sini..."
                      className="form-control form-control-sm"
                      style={{
                        backgroundColor: inputErr
                          ? "rgba(217, 83, 79, 0.16)"
                          : "rgba(14, 12, 10, 0.72)",
                        borderColor: inputErr
                          ? "#e05a54"
                          : "rgba(197, 160, 89, 0.24)",
                        color: "#f2ece1",
                      }}
                    />
                  </motion.div>

                  <div className="d-flex justify-content-end">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.94 }}
                      className="btn btn-sm btn-sogan px-3 py-1 d-inline-flex align-items-center gap-1.5"
                      style={{
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span>Kirim Balasan</span>
                      <SendSvg size={14} />
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
