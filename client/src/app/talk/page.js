"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function TalkPage() {
  const { user, feedPosts } = useAuthStore();
  const [groupName, setGroupName] = useState("");
  const [topic, setTopic] = useState("");
  const [groups, setGroups] = useState([
    {
      id: "grp-1",
      name: "Bedah CORS & Next.js",
      topic: "Grup komunikasi cepat bahas error deploy & API.",
      code: "talk-cors-nextjs",
    },
  ]);
  const [shareStatus, setShareStatus] = useState({});

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const cleanName = groupName.trim();
    if (!cleanName) return;
    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const created = {
      id: `grp-${Date.now()}`,
      name: cleanName,
      topic:
        topic.trim() ||
        "Grup komunikasi diskusi teknis anggota Anak Programmer Indonesia.",
      code: `${slug || "grup"}-${Math.floor(100 + Math.random() * 900)}`,
    };
    setGroups((prev) => [created, ...prev]);
    setGroupName("");
    setTopic("");
  };

  const getGroupLink = (code) => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return `${window.location.origin}/talk?room=${code}`;
    }
    return `/talk?room=${code}`;
  };

  const handleShareToTarget = (grp, targetLabel) => {
    const link = getGroupLink(grp.code);
    const shareText = `Gabung grup komunikasi "${grp.name}": ${link}`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }

    if (Array.isArray(feedPosts)) {
      feedPosts.unshift({
        id: `talk-share-${Date.now()}`,
        author: user?.username || "member_api",
        category: targetLabel === "Forum" ? "Diskusi Tech" : "Workflow",
        time: "Baru saja",
        title: `Grup Komunikasi: ${grp.name}`,
        excerpt: `${grp.topic} — Link komunikasi: ${link}`,
        content: `${grp.topic}\n\nLink Komunikasi: ${link}`,
        comments: [],
      });
    }

    setShareStatus((prev) => ({
      ...prev,
      [grp.id]: `Link disalin & dibagikan ke ${targetLabel}`,
    }));
  };

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
        <div className="smoked-glass p-3.5 mb-3">
          <h1
            className="h5 mb-1"
            style={{
              fontFamily: "var(--font-tommy-extra), sans-serif",
              color: "#f2ece1",
            }}
          >
            Talk — Grup Komunikasi
          </h1>
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-tommy-regular), sans-serif",
              fontSize: "0.8rem",
              color: "#9d958b",
            }}
          >
            Buat grup komunikasi khusus topik tertentu dan bagikan link-nya ke
            Forum maupun Feed.
          </p>

          <form
            onSubmit={handleCreateGroup}
            className="d-flex flex-column gap-2"
          >
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nama grup komunikasi (misal: Debugging Termux & Node.js)..."
              className="form-control form-control-sm"
              style={{
                backgroundColor: "rgba(14, 12, 10, 0.72)",
                borderColor: "rgba(197, 160, 89, 0.24)",
                color: "#f2ece1",
              }}
            />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Deskripsi singkat grup komunikasi..."
              className="form-control form-control-sm"
              style={{
                backgroundColor: "rgba(14, 12, 10, 0.72)",
                borderColor: "rgba(197, 160, 89, 0.24)",
                color: "#f2ece1",
              }}
            />
            <div className="d-flex justify-content-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                className="btn btn-sm px-3.5 py-1.5 rounded-pill"
                style={{
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.76rem",
                  background:
                    "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                  color: "#16120e",
                  border: "1px solid rgba(255, 236, 188, 0.45)",
                }}
              >
                Buat Grup Komunikasi
              </motion.button>
            </div>
          </form>
        </div>

        <div className="d-flex flex-column gap-2.5">
          {groups.map((grp) => (
            <motion.div
              key={grp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
              className="smoked-glass p-3.5"
            >
              <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                <span
                  style={{
                    fontFamily: "var(--font-tommy-extra), sans-serif",
                    fontSize: "0.9rem",
                    color: "#f2ece1",
                  }}
                >
                  {grp.name}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#c5a059" }}>
                  #{grp.code}
                </span>
              </div>
              <p
                className="mb-2"
                style={{ fontSize: "0.8rem", color: "#cfc5b7" }}
              >
                {grp.topic}
              </p>
              <div
                className="p-2 rounded-3 mb-2"
                style={{
                  fontSize: "0.72rem",
                  color: "#9fd6e0",
                  backgroundColor: "rgba(14, 12, 10, 0.65)",
                  border: "1px solid rgba(197, 160, 89, 0.16)",
                  wordBreak: "break-all",
                }}
              >
                {getGroupLink(grp.code)}
              </div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleShareToTarget(grp, "Forum")}
                  className="btn btn-sm px-3 py-1 rounded-pill"
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    background: "rgba(197, 160, 89, 0.18)",
                    border: "1px solid rgba(197, 160, 89, 0.36)",
                    color: "#e6cfa1",
                  }}
                >
                  Share ke Forum
                </button>
                <button
                  type="button"
                  onClick={() => handleShareToTarget(grp, "Feed")}
                  className="btn btn-sm px-3 py-1 rounded-pill"
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    background: "rgba(197, 160, 89, 0.18)",
                    border: "1px solid rgba(197, 160, 89, 0.36)",
                    color: "#e6cfa1",
                  }}
                >
                  Share ke Feed
                </button>
                {shareStatus[grp.id] && (
                  <span style={{ fontSize: "0.72rem", color: "#8ce0a8" }}>
                    {shareStatus[grp.id]}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
