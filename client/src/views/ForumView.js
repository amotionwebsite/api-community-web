"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  ChatCircleText,
  CheckCircle,
  CaretDown,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { INITIAL_THREADS } from "../data/threads";
import { useAuthStore } from "../store/useAuthStore";

const PlusSvg = ({ size = 21 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M13 13v6c-.036.543-.428 1-1 1s-.964-.457-1-1v-6H5c-.543-.036-1-.428-1-1s.457-.964 1-1h6V5c.036-.543.428-1 1-1s.964.457 1 1v6h6c.543.036 1 .428 1 1s-.457.964-1 1Z"
    />
  </svg>
);

const CATEGORIES = ["Bug & Error", "Workflow", "Diskusi Tech"];

export default function ForumView() {
  const user = useAuthStore((s) => s.user);
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bug & Error");
  const [content, setContent] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [errors, setErrors] = useState({ title: false, content: false });
  const [shakeTick, setShakeTick] = useState(0);

  const handleCreate = (e) => {
    e.preventDefault();
    const titleEmpty = !title.trim();
    const contentEmpty = !content.trim();

    if (titleEmpty || contentEmpty) {
      setErrors({ title: titleEmpty, content: contentEmpty });
      setShakeTick((n) => n + 1);
      return;
    }

    const created = {
      id: String(Date.now()),
      title: title.trim(),
      category,
      author: user?.username || "anggota_api",
      time: "Baru saja",
      solved: false,
      excerpt: content.trim().slice(0, 120),
      content: content.trim(),
      comments: [],
    };
    setThreads([created, ...threads]);
    setTitle("");
    setContent("");
    setErrors({ title: false, content: false });
    setCatOpen(false);
    setShowForm(false);
  };

  const filtered = threads.filter((t) => {
    const matchCat = activeCat === "Semua" || t.category === activeCat;
    const matchQ =
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <div>
            <h1
              className="h4 mb-0"
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
              }}
            >
              Forum Bedah Kode
            </h1>
            <p className="mb-0" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
              Diskusi error, arsitektur aplikasi, dan catatan belajar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setCatOpen(false);
              setErrors({ title: false, content: false });
            }}
            title="Buat Utas"
            className="btn btn-sm btn-sogan rounded-pill d-inline-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "38px", height: "38px", padding: 0 }}
          >
            <PlusSvg size={21} />
          </button>
        </div>

        {/* Form Tambah Utas */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              noValidate
              onSubmit={handleCreate}
              className="smoked-glass p-3.5 mb-3 d-flex flex-column gap-2.5"
            >
              {/* Input Judul dengan Efek Merah & Getar jika kosong */}
              <motion.div
                key={`title-${shakeTick}`}
                animate={
                  errors.title
                    ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.38 }}
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors({ ...errors, title: false });
                  }}
                  placeholder="Judul pertanyaan atau topik..."
                  className="form-control form-control-sm"
                  style={{
                    background: errors.title
                      ? "rgba(185, 56, 56, 0.16)"
                      : "rgba(14, 12, 10, 0.7)",
                    borderColor: errors.title
                      ? "#d9534f"
                      : "rgba(197, 160, 89, 0.22)",
                    color: "#f2ece1",
                    transition: "border-color 0.2s ease, background-color 0.2s ease",
                  }}
                />
              </motion.div>

              {/* Custom Dropdown Kategori Buatan Website Sendiri */}
              <div className="position-relative">
                <button
                  type="button"
                  onClick={() => setCatOpen(!catOpen)}
                  className="form-control form-control-sm d-flex align-items-center justify-content-between text-start"
                  style={{
                    background: "rgba(14, 12, 10, 0.7)",
                    borderColor: catOpen
                      ? "#c5a059"
                      : "rgba(197, 160, 89, 0.22)",
                    color: "#f2ece1",
                    cursor: "pointer",
                  }}
                >
                  <span>{category}</span>
                  <CaretDown
                    size={14}
                    style={{
                      color: "#c5a059",
                      transform: catOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="position-absolute start-0 w-100 mt-1 p-1 rounded-3"
                      style={{
                        backgroundColor: "#171411",
                        border: "1px solid rgba(197, 160, 89, 0.32)",
                        boxShadow: "0 14px 28px rgba(0, 0, 0, 0.75)",
                        zIndex: 30,
                      }}
                    >
                      {CATEGORIES.map((cat) => {
                        const selected = category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setCategory(cat);
                              setCatOpen(false);
                            }}
                            className="w-100 btn btn-sm text-start d-flex align-items-center justify-content-between px-2.5 py-1.5 rounded-2 border-0"
                            style={{
                              fontSize: "0.82rem",
                              backgroundColor: selected
                                ? "rgba(197, 160, 89, 0.16)"
                                : "transparent",
                              color: selected ? "#c5a059" : "#d8cfc2",
                              fontWeight: selected ? 600 : 400,
                            }}
                          >
                            <span>{cat}</span>
                            {selected && (
                              <span
                                className="rounded-circle"
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  backgroundColor: "#c5a059",
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Kronologi/Detail dengan Efek Merah & Getar jika kosong */}
              <motion.div
                key={`content-${shakeTick}`}
                animate={
                  errors.content
                    ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.38 }}
              >
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content)
                      setErrors({ ...errors, content: false });
                  }}
                  placeholder="Jelaskan kronologi error atau detail diskusi..."
                  className="form-control form-control-sm"
                  style={{
                    background: errors.content
                      ? "rgba(185, 56, 56, 0.16)"
                      : "rgba(14, 12, 10, 0.7)",
                    borderColor: errors.content
                      ? "#d9534f"
                      : "rgba(197, 160, 89, 0.22)",
                    color: "#f2ece1",
                    transition: "border-color 0.2s ease, background-color 0.2s ease",
                  }}
                />
              </motion.div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setCatOpen(false);
                    setErrors({ title: false, content: false });
                  }}
                  className="btn btn-sm btn-glass-subtle px-3"
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-sm btn-sogan px-3">
                  Terbitkan Utas
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Pencarian & Filter */}
        <div className="smoked-glass p-2.5 mb-3 d-flex flex-column gap-2">
          <div className="input-group input-group-sm">
            <span
              className="input-group-text border-0 bg-transparent"
              style={{ color: "#9a8f80" }}
            >
              <MagnifyingGlass size={16} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari error, framework, atau topik..."
              className="form-control border-0 bg-transparent shadow-none"
              style={{ color: "#f2ece1" }}
            />
          </div>

          <div className="d-flex flex-wrap gap-1.5">
            {["Semua", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className="btn btn-sm rounded-pill px-2.5 py-0.5"
                style={{
                  fontSize: "0.73rem",
                  backgroundColor:
                    activeCat === cat ? "#c5a059" : "rgba(255,255,255,0.03)",
                  color: activeCat === cat ? "#120f0c" : "#b8ad9e",
                  fontWeight: activeCat === cat ? 600 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Utas */}
        <div className="d-flex flex-column gap-2.5 mb-4">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <Link
                href={`/forum/${item.id}`}
                className="text-decoration-none d-block smoked-glass smoked-glass-interactive p-3"
              >
                <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                  <span style={{ fontSize: "0.74rem", color: "#c5a059" }}>
                    [{item.category}] &bull; @{item.author}
                  </span>
                  <span
                    className="d-inline-flex align-items-center gap-1"
                    style={{
                      fontSize: "0.7rem",
                      color: item.solved ? "#8fc29b" : "#8f8578",
                    }}
                  >
                    <CheckCircle
                      weight={item.solved ? "fill" : "regular"}
                      size={14}
                    />
                    {item.solved ? "Terpecahkan" : "Terbuka"}
                  </span>
                </div>
                <h2 className="h6 mb-1" style={{ color: "#f2ece1" }}>
                  {item.title}
                </h2>
                <p
                  className="mb-2"
                  style={{ fontSize: "0.82rem", color: "#b8ad9e" }}
                >
                  {item.excerpt}
                </p>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontSize: "0.72rem", color: "#7d7367" }}
                >
                  <span>{item.time}</span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <ChatCircleText size={14} />
                    {item.comments?.length || 0} balasan
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
