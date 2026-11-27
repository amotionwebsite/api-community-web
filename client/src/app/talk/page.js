"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];
const NAV_SPRING = { type: "spring", stiffness: 430, damping: 28, mass: 0.85 };

const TAG_OPTIONS = [
  "Bug & Error",
  "Workflow",
  "Diskusi Tech",
  "Tips & Trik",
  "Karya API",
];

const getTagStyle = (tag) => {
  switch (tag) {
    case "Bug & Error":
      return {
        backgroundColor: "rgba(185, 62, 62, 0.24)",
        borderColor: "rgba(235, 95, 95, 0.45)",
        color: "#ff9b9b",
      };
    case "Workflow":
      return {
        backgroundColor: "rgba(56, 138, 92, 0.24)",
        borderColor: "rgba(95, 205, 142, 0.45)",
        color: "#9ef0be",
      };
    case "Diskusi Tech":
      return {
        backgroundColor: "rgba(197, 160, 89, 0.22)",
        borderColor: "rgba(197, 160, 89, 0.45)",
        color: "#ebd094",
      };
    case "Tips & Trik":
      return {
        backgroundColor: "rgba(62, 124, 185, 0.24)",
        borderColor: "rgba(105, 175, 245, 0.45)",
        color: "#9ed0ff",
      };
    default:
      return {
        backgroundColor: "rgba(138, 86, 196, 0.24)",
        borderColor: "rgba(176, 128, 238, 0.45)",
        color: "#cfaeff",
      };
  }
};

const AddTalkSvg = ({ size = 18, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#09244BFF"
        d="M12.746 2.027a10 10 0 0 1 4.699 1.584c5.563 3.618 6.124 11.579 1.116 15.936a10 10 0 0 1-2.998 1.8 10.1 10.1 0 0 1-4.309.626 10 10 0 0 1-4.699-1.584C.992 16.771.431 8.81 5.439 4.453a10 10 0 0 1 2.998-1.8 10.1 10.1 0 0 1 4.309-.626M11 11H8a1 1 0 0 0-.44.102c-.967.473-.599 1.838.44 1.898h3v3c.06 1.039 1.425 1.407 1.898.44A1 1 0 0 0 13 16v-3h3a1 1 0 0 0 .44-.102c.967-.473.599-1.838-.44-1.898h-3V8a1 1 0 0 0-.102-.44C12.425 6.593 11.06 6.961 11 8Z"
      />
    ) : (
      <path
        fill="#09244BFF"
        d="M13 13v3c-.05.755-.802 1.269-1.5.866a1 1 0 0 1-.366-.366c-.101-.175-.121-.302-.134-.5v-3H8c-.755-.05-1.269-.802-.866-1.5.088-.152.214-.278.366-.366.175-.101.302-.121.5-.134h3V8c.05-.755.802-1.269 1.5-.866.152.088.278.214.366.366.101.175.121.302.134.5v3h3c.755.05 1.269.802.866 1.5a1 1 0 0 1-.366.366c-.175.101-.302.121-.5.134Zm5.809 6.325a10 10 0 0 1-3.791 2.212 10.1 10.1 0 0 1-4.563.345 10 10 0 0 1-3.503-1.247C1.179 17.254.289 9.233 5.192 4.675a10 10 0 0 1 3.79-2.212 10.1 10.1 0 0 1 4.563-.345 10 10 0 0 1 3.503 1.247c5.773 3.381 6.663 11.402 1.761 15.96m-7.435-15.3a8 8 0 0 0-4.377 1.733C2.03 9.744 3.51 17.709 9.585 19.629a8 8 0 0 0 7.418-1.387c4.967-3.985 3.487-11.951-2.588-13.871a8.1 8.1 0 0 0-3.041-.346"
      />
    )}
  </svg>
);

const CopyLinkSvg = ({ size = 17, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#09244BFF"
        d="M15.324 7.026C16.308 7.186 16.961 8.031 17 9v11c-.022.535-.202 1.03-.586 1.414s-.879.564-1.414.586H4c-.535-.022-1.03-.202-1.414-.586S2.022 20.535 2 20V9c.046-1.146.854-1.954 2-2h11ZM20 15c0-.656-.167-1.543.56-1.898a1 1 0 0 1 1.065.118c.246.197.357.473.375.78v1c-.046 1.146-.854 1.954-2 2h-1l-.229-.026c-.797-.186-1.033-1.244-.396-1.754A1.04 1.04 0 0 1 19 15Zm1.229-6.974c.466.109.745.514.771.974v1c-.036.63-.584 1.124-1.229.974-.466-.109-.745-.514-.771-.974V9c.036-.63.584-1.124 1.229-.974M20 4c-.656 0-1.543.167-1.898-.56a1 1 0 0 1 .273-1.22A1.04 1.04 0 0 1 19 2h1c1.146.046 1.954.854 2 2v1l-.026.229c-.186.797-1.244 1.033-1.754.396A1.04 1.04 0 0 1 20 5ZM9 4v1a1.04 1.04 0 0 1-.22.625c-.51.637-1.568.401-1.754-.396L7 5V4c.046-1.146.854-1.954 2-2h1c.233.013.441.071.625.22a1 1 0 0 1 .155 1.405c-.197.246-.473.357-.78.375Zm6.229-1.974c.797.186 1.033 1.244.396 1.754A1.04 1.04 0 0 1 15 4h-1c-.307-.018-.583-.129-.78-.375a1 1 0 0 1-.194-.854c.109-.466.514-.745.974-.771h1Z"
      />
    ) : (
      <path
        fill="#09244BFF"
        d="M3.886 21.993C2.798 21.894 2.04 21.092 2 20V9c.018-.494.18-.961.513-1.333C2.897 7.239 3.431 7.021 4 7h11c.494.018.961.18 1.333.513.428.384.646.918.667 1.487v11c-.042 1.135-.865 1.958-2 2H4Zm.12-12.987v10.988h10.988V9.006Zm15.988 5.988c.015-.396-.096-1.085.14-1.494.436-.755 1.606-.601 1.832.241L22 14v1c-.042 1.135-.865 1.958-2 2h-1c-.271-.018-.511-.096-.707-.293-.535-.534-.282-1.477.448-1.673.376-.101.903-.027 1.253-.04m.04-6.253c.196-.73 1.139-.983 1.673-.448.197.196.275.436.293.707v1c-.018.271-.096.511-.293.707-.25.25-.624.351-.966.259-.453-.122-.711-.515-.741-.966V9Zm-.04-4.735c-.35-.013-.877.061-1.253-.04-.73-.196-.983-1.139-.448-1.673.196-.197.436-.275.707-.293h1c1.135.042 1.958.865 2 2v1l-.034.259c-.226.842-1.396.996-1.832.241-.236-.409-.125-1.098-.14-1.494m-10.988 0c-.013.35.061.877-.04 1.253-.196.73-1.139.983-1.673.448C7.096 5.511 7.018 5.271 7 5V4c.042-1.135.865-1.958 2-2h1l.259.034c.842.226.996 1.396.241 1.832-.409.236-1.098.125-1.494.14m4.735-.04c-.73-.196-.983-1.139-.448-1.673.196-.197.436-.275.707-.293h1c.271.018.511.096.707.293.25.25.351.624.259.966-.122.453-.515.711-.966.741h-1Z"
      />
    )}
  </svg>
);

export default function TalkPage() {
  const { user } = useAuthStore();
  const [groupName, setGroupName] = useState("");
  const [topic, setTopic] = useState("");
  const [selectedTag, setSelectedTag] = useState("Bug & Error");
  const [nameError, setNameError] = useState(false);
  const [shakeTick, setShakeTick] = useState(0);
  const [addClicked, setAddClicked] = useState(false);

  const [groups, setGroups] = useState([
    {
      id: "grp-1",
      name: "Bedah CORS & Next.js",
      topic: "Grup komunikasi cepat bahas error deploy & API.",
      tag: "Bug & Error",
      code: "cors-nextjs-101",
      membersJoined: 4,
      messages: [
        {
          id: "m-1",
          sender: "rizky_dev",
          text: "Halo, siapa saja yang masuk lewat link talk ini? Bahas CORS Railway + Vercel yuk.",
          time: "12:04",
        },
        {
          id: "m-2",
          sender: "anak_termux",
          text: "Hadir brok, udah masuk dari link komunikasi.",
          time: "12:05",
        },
      ],
    },
  ]);

  const [activeRoomId, setActiveRoomId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" | "room"
  const [chatInput, setChatInput] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    if (!roomParam) return;
    const matched = groups.find((g) => g.code === roomParam);
    if (matched) {
      setActiveRoomId(matched.id);
      setViewMode("room");
      const currentUser = user?.username || "member_api";
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== matched.id) return g;
          const alreadyJoined = g.messages.some(
            (msg) => msg.systemJoin && msg.sender === currentUser
          );
          if (alreadyJoined) return g;
          return {
            ...g,
            membersJoined: (g.membersJoined || 1) + 1,
            messages: [
              ...g.messages,
              {
                id: `join-${Date.now()}`,
                sender: currentUser,
                systemJoin: true,
                text: `${currentUser} bergabung melalui link komunikasi`,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          };
        })
      );
    }
  }, [user?.username]);

  const activeGroup = groups.find((g) => g.id === activeRoomId) || null;

  const getGroupLink = (code) => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return `${window.location.origin}/talk?room=${code}`;
    }
    return `/talk?room=${code}`;
  };

  const handleCreateTalk = (e) => {
    e.preventDefault();
    setAddClicked(true);
    setTimeout(() => setAddClicked(false), 320);

    const cleanName = groupName.trim();
    if (!cleanName) {
      setNameError(true);
      setShakeTick((n) => n + 1);
      return;
    }

    setNameError(false);
    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const creator = user?.username || "member_api";
    const newGroup = {
      id: `grp-${Date.now()}`,
      name: cleanName,
      topic: topic.trim(),
      tag: selectedTag,
      code: `${slug || "talk"}-${Math.floor(100 + Math.random() * 900)}`,
      membersJoined: 1,
      messages: [
        {
          id: `sys-${Date.now()}`,
          sender: creator,
          systemJoin: true,
          text: `${creator} membuka ruang Talk "${cleanName}"`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setGroups((prev) => [newGroup, ...prev]);
    setGroupName("");
    setTopic("");
  };

  const handleOpenRoom = (grp) => {
    setActiveRoomId(grp.id);
    setViewMode("room");
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  const handleCopyLink = async (grp) => {
    const link = getGroupLink(grp.code);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(link);
      } else {
        throw new Error("no clipboard");
      }
    } catch {
      if (typeof document !== "undefined") {
        const ta = document.createElement("textarea");
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    }
    setCopiedId(grp.id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const cleanMsg = chatInput.trim();
    if (!cleanMsg || !activeGroup) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: user?.username || "member_api",
      text: cleanMsg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id
          ? { ...g, messages: [...g.messages, newMsg] }
          : g
      )
    );
    setChatInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />

      <main
        className="container py-4 flex-grow-1 mb-4"
        style={{ maxWidth: "740px" }}
      >
        {/* Navigasi Mode ala Telegram (Daftar Talk / Ruang Komunikasi) */}
        <div
          className="d-flex align-items-center justify-content-between gap-2 mb-3 p-1.5 rounded-pill"
          style={{
            background: "rgba(24, 21, 18, 0.72)",
            border: "1px solid rgba(197, 160, 89, 0.24)",
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="btn btn-sm flex-grow-1 py-1.5 rounded-pill position-relative border-0"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
              background:
                viewMode === "list"
                  ? "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)"
                  : "transparent",
              color: viewMode === "list" ? "#16120e" : "#cfc5b7",
              transition: "all 0.25s ease",
            }}
          >
            Daftar Talk ({groups.length})
          </button>

          <button
            type="button"
            onClick={() => {
              if (!activeRoomId && groups[0]) {
                setActiveRoomId(groups[0].id);
              }
              setViewMode("room");
            }}
            className="btn btn-sm flex-grow-1 py-1.5 rounded-pill position-relative border-0"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
              background:
                viewMode === "room"
                  ? "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)"
                  : "transparent",
              color: viewMode === "room" ? "#16120e" : "#cfc5b7",
              transition: "all 0.25s ease",
            }}
          >
            Ruang Komunikasi
          </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="talk-list-view"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
            >
              {/* Form Buat Talk */}
              <motion.form
                key={shakeTick}
                onSubmit={handleCreateTalk}
                animate={
                  nameError
                    ? {
                        x: [0, -9, 9, -7, 7, -4, 4, 0],
                      }
                    : { x: 0 }
                }
                transition={{ duration: 0.38, ease: SMOOTH_EASE }}
                className="smoked-glass p-3.5 mb-3"
                style={{
                  borderColor: nameError
                    ? "rgba(235, 85, 85, 0.85)"
                    : "rgba(197, 160, 89, 0.2)",
                  backgroundColor: nameError
                    ? "rgba(92, 22, 22, 0.42)"
                    : undefined,
                }}
              >
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
                    color: nameError ? "#ff9e9e" : "#9d958b",
                  }}
                >
                  {nameError
                    ? "Nama grup komunikasi wajib diisi dulu ya!"
                    : "Buat grup komunikasi khusus topik tertentu (deskripsi opsional)."}
                </p>

                <div className="d-flex flex-column gap-2">
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => {
                      setGroupName(e.target.value);
                      if (nameError && e.target.value.trim()) {
                        setNameError(false);
                      }
                    }}
                    placeholder="Nama grup komunikasi (wajib)..."
                    className="form-control form-control-sm"
                    style={{
                      backgroundColor: nameError
                        ? "rgba(120, 24, 24, 0.45)"
                        : "rgba(14, 12, 10, 0.72)",
                      borderColor: nameError
                        ? "rgba(245, 85, 85, 0.9)"
                        : "rgba(197, 160, 89, 0.24)",
                      color: "#f2ece1",
                    }}
                  />

                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Deskripsi grup komunikasi (opsional)..."
                    className="form-control form-control-sm"
                    style={{
                      backgroundColor: "rgba(14, 12, 10, 0.72)",
                      borderColor: "rgba(197, 160, 89, 0.24)",
                      color: "#f2ece1",
                    }}
                  />

                  {/* Pilihan Tag dengan Warna */}
                  <div className="d-flex align-items-center gap-1.5 flex-wrap pt-1">
                    {TAG_OPTIONS.map((tag) => {
                      const activeTag = selectedTag === tag;
                      const style = getTagStyle(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(tag)}
                          className="btn btn-sm px-2.5 py-0.5 rounded-pill"
                          style={{
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                            fontSize: "0.7rem",
                            backgroundColor: style.backgroundColor,
                            border: `1px solid ${style.borderColor}`,
                            color: style.color,
                            opacity: activeTag ? 1 : 0.72,
                            transform: activeTag ? "scale(1.03)" : "scale(1)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  <div className="d-flex justify-content-end pt-1">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.94 }}
                      transition={NAV_SPRING}
                      className="btn btn-sm px-3.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5"
                      style={{
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.76rem",
                        background:
                          "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                        color: "#16120e",
                        border: "1px solid rgba(255, 236, 188, 0.45)",
                      }}
                    >
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-2"
                        style={
                          addClicked
                            ? { backgroundColor: "#0b0b0c", padding: "2px" }
                            : undefined
                        }
                      >
                        <AddTalkSvg size={18} active={addClicked} />
                      </span>
                      <span>Buat Talk</span>
                    </motion.button>
                  </div>
                </div>
              </motion.form>

              {/* Daftar Grup Komunikasi */}
              <div className="d-flex flex-column gap-2.5">
                <AnimatePresence initial={false}>
                  {groups.map((grp) => {
                    const tagStyle = getTagStyle(grp.tag || "Diskusi Tech");
                    const isCopied = copiedId === grp.id;
                    return (
                      <motion.div
                        key={grp.id}
                        layout
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.34, ease: SMOOTH_EASE }}
                        className="smoked-glass p-3.5"
                      >
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-1.5 flex-wrap">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span
                              style={{
                                fontFamily: "var(--font-tommy-extra), sans-serif",
                                fontSize: "0.92rem",
                                color: "#f2ece1",
                              }}
                            >
                              {grp.name}
                            </span>
                            <span
                              className="px-2.5 py-0.5 rounded-pill"
                              style={{
                                fontFamily: "var(--font-tommy-medium), sans-serif",
                                fontSize: "0.68rem",
                                backgroundColor: tagStyle.backgroundColor,
                                border: `1px solid ${tagStyle.borderColor}`,
                                color: tagStyle.color,
                              }}
                            >
                              {grp.tag || "Diskusi Tech"}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.7rem", color: "#9d958b" }}>
                            {grp.membersJoined || 1} anggota
                          </span>
                        </div>

                        {grp.topic && (
                          <p
                            className="mb-2"
                            style={{ fontSize: "0.8rem", color: "#cfc5b7" }}
                          >
                            {grp.topic}
                          </p>
                        )}

                        <div
                          className="p-2 rounded-3 mb-2.5"
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

                        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.94 }}
                            transition={NAV_SPRING}
                            onClick={() => handleCopyLink(grp)}
                            className="btn btn-sm px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
                            style={{
                              fontSize: "0.73rem",
                              fontFamily: "var(--font-tommy-medium), sans-serif",
                              background: "rgba(197, 160, 89, 0.16)",
                              border: "1px solid rgba(197, 160, 89, 0.34)",
                              color: "#e6cfa1",
                            }}
                          >
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-2"
                              style={
                                isCopied
                                  ? {
                                      backgroundColor: "#0b0b0c",
                                      padding: "2px",
                                    }
                                  : undefined
                              }
                            >
                              <CopyLinkSvg size={16} active={isCopied} />
                            </span>
                            <span>
                              {isCopied ? "Link Tersalin" : "Salin Link"}
                            </span>
                          </motion.button>

                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.94 }}
                            transition={NAV_SPRING}
                            onClick={() => handleOpenRoom(grp)}
                            className="btn btn-sm px-3 py-1 rounded-pill"
                            style={{
                              fontSize: "0.73rem",
                              fontFamily: "var(--font-tommy-medium), sans-serif",
                              background:
                                "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                              color: "#16120e",
                              border: "1px solid rgba(255, 236, 188, 0.45)",
                            }}
                          >
                            Masuk Ruang
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Ruang Komunikasi Mirip Telegram untuk User yang Klik Link */
            <motion.div
              key="talk-room-view"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
              className="smoked-glass p-3.5"
            >
              {activeGroup ? (
                <>
                  <div className="d-flex align-items-center justify-content-between gap-2 pb-2.5 mb-3 border-bottom flex-wrap" style={{ borderColor: "rgba(197, 160, 89, 0.16)" }}>
                    <div>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span
                          style={{
                            fontFamily: "var(--font-tommy-extra), sans-serif",
                            fontSize: "0.94rem",
                            color: "#f2ece1",
                          }}
                        >
                          {activeGroup.name}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-pill"
                          style={{
                            fontSize: "0.66rem",
                            backgroundColor: getTagStyle(
                              activeGroup.tag || "Diskusi Tech"
                            ).backgroundColor,
                            border: `1px solid ${
                              getTagStyle(activeGroup.tag || "Diskusi Tech")
                                .borderColor
                            }`,
                            color: getTagStyle(
                              activeGroup.tag || "Diskusi Tech"
                            ).color,
                          }}
                        >
                          {activeGroup.tag || "Diskusi Tech"}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#9d958b" }}>
                        {activeGroup.membersJoined || 1} anggota terhubung via
                        link
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleBackToList}
                      className="btn btn-sm btn-glass-subtle px-2.5 py-1 rounded-pill"
                      style={{ fontSize: "0.72rem", color: "#e6cfa3" }}
                    >
                      Kembali
                    </button>
                  </div>

                  {/* Daftar Grup Cepat di Atas Chat ala Telegram */}
                  <div className="d-flex align-items-center gap-1.5 overflow-auto pb-2 mb-3">
                    {groups.map((item) => {
                      const selected = item.id === activeGroup.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveRoomId(item.id)}
                          className="btn btn-sm px-2.5 py-1 rounded-pill flex-shrink-0"
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                            backgroundColor: selected
                              ? "rgba(197, 160, 89, 0.24)"
                              : "rgba(28, 25, 21, 0.65)",
                            border: "1px solid rgba(197, 160, 89, 0.3)",
                            color: selected ? "#f2ece1" : "#b8ad9e",
                          }}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feed Pesan */}
                  <div
                    className="d-flex flex-column gap-2 mb-3 p-2.5 rounded-3"
                    style={{
                      minHeight: "240px",
                      maxHeight: "360px",
                      overflowY: "auto",
                      backgroundColor: "rgba(12, 10, 8, 0.55)",
                      border: "1px solid rgba(197, 160, 89, 0.14)",
                    }}
                  >
                    {activeGroup.messages.map((msg) =>
                      msg.systemJoin ? (
                        <div
                          key={msg.id}
                          className="text-center my-1"
                          style={{ fontSize: "0.7rem", color: "#c5a059" }}
                        >
                          {msg.text} • {msg.time}
                        </div>
                      ) : (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                          className="p-2.5 rounded-3"
                          style={{
                            backgroundColor: "rgba(38, 33, 27, 0.75)",
                            border: "1px solid rgba(197, 160, 89, 0.2)",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                            <span
                              style={{
                                fontSize: "0.74rem",
                                fontWeight: 600,
                                color: "#e6cfa3",
                              }}
                            >
                              @{msg.sender}
                            </span>
                            <span
                              style={{ fontSize: "0.66rem", color: "#8c8378" }}
                            >
                              {msg.time}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.82rem",
                              color: "#f2ece1",
                              lineHeight: 1.5,
                            }}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Input Kirim Pesan */}
                  <form
                    onSubmit={handleSendMessage}
                    className="d-flex align-items-center gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Tulis pesan komunikasi..."
                      className="form-control form-control-sm"
                      style={{
                        backgroundColor: "rgba(14, 12, 10, 0.78)",
                        borderColor: "rgba(197, 160, 89, 0.28)",
                        color: "#f2ece1",
                      }}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.94 }}
                      transition={NAV_SPRING}
                      className="btn btn-sm px-3 py-1.5 rounded-pill flex-shrink-0"
                      style={{
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.75rem",
                        background:
                          "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                        color: "#16120e",
                        border: "1px solid rgba(255, 236, 188, 0.45)",
                      }}
                    >
                      Kirim
                    </motion.button>
                  </form>
                </>
              ) : (
                <p className="mb-0" style={{ fontSize: "0.8rem", color: "#9d958b" }}>
                  Belum ada grup Talk. Buat grup dulu di tab Daftar Talk.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
