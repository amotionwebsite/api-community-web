"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Plus,
  ChatCircleText,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { INITIAL_THREADS } from "../data/threads";
import { useAuthStore } from "../store/useAuthStore";

const CATEGORIES = ["Semua", "Bug & Error", "Workflow", "Diskusi Tech"];

export default function ForumView() {
  const user = useAuthStore((s) => s.user);
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [newCat, setNewCat] = useState("Bug & Error");
  const [content, setContent] = useState("");

  const filtered = threads.filter((t) => {
    const matchCat = category === "Semua" || t.category === category;
    const matchQuery =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setThreads([
      {
        id: String(Date.now()),
        title: title.trim(),
        category: newCat,
        author: user?.username || "member_api",
        time: "Baru saja",
        solved: false,
        excerpt: content.trim().slice(0, 130),
        content: content.trim(),
        comments: [],
      },
      ...threads,
    ]);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1" style={{ maxWidth: "740px" }}>
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <div>
            <h1
              style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
              className="h3 mb-0"
            >
              Forum Bedah Kode
            </h1>
            <p className="mb-0" style={{ fontSize: "0.8rem", color: "#9a8f80" }}>
              Diskusi error, arsitektur aplikasi, dan catatan belajar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn btn-sm btn-sogan px-3 py-1.5 d-inline-flex align-items-center gap-1"
          >
            <Plus weight="bold" />
            <span>Buat Utas</span>
          </button>
        </div>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAdd}
            className="smoked-glass p-3 mb-3 d-flex flex-column gap-2.5"
          >
            <input
              type="text"
              required
              placeholder="Judul pertanyaan atau topik..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control bg-transparent border-secondary-subtle text-light"
              style={{ fontSize: "0.85rem" }}
            />
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="form-select bg-dark border-secondary-subtle text-light"
              style={{ fontSize: "0.82rem" }}
            >
              <option value="Bug & Error">Bug &amp; Error</option>
              <option value="Workflow">Workflow</option>
              <option value="Diskusi Tech">Diskusi Tech</option>
            </select>
            <textarea
              rows={3}
              required
              placeholder="Jelaskan kronologi error atau detail diskusi..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control bg-transparent border-secondary-subtle text-light"
              style={{ fontSize: "0.84rem" }}
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
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

        {/* Search + Category Pills */}
        <div className="smoked-glass p-2.5 mb-3">
          <div className="input-group input-group-sm mb-2">
            <span className="input-group-text bg-transparent border-0 text-secondary">
              <MagnifyingGlass size={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari error, framework, atau topik..."
              className="form-control bg-transparent border-0 shadow-none text-light"
            />
          </div>
          <div className="d-flex gap-1.5 overflow-auto pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className="btn btn-sm rounded-pill px-2.5 py-0.5 flex-shrink-0"
                style={{
                  fontSize: "0.74rem",
                  backgroundColor:
                    category === cat ? "#c5a059" : "rgba(255,255,255,0.04)",
                  color: category === cat ? "#120f0c" : "#b8ad9e",
                  fontWeight: category === cat ? 600 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thread List */}
        <div className="d-flex flex-column gap-2.5">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/forum/${item.id}`}
              className="text-decoration-none"
            >
              <article className="smoked-glass smoked-glass-interactive p-3">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span style={{ fontSize: "0.72rem", color: "#c5a059" }}>
                    [{item.category}] • @{item.author}
                  </span>
                  {item.solved ? (
                    <span
                      className="d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.7rem", color: "#76a882" }}
                    >
                      <CheckCircle weight="fill" /> Terpecahkan
                    </span>
                  ) : (
                    <span
                      className="d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.7rem", color: "#9a8f80" }}
                    >
                      <Clock /> Terbuka
                    </span>
                  )}
                </div>
                <h2 className="h6 mb-1" style={{ color: "#f2ece1" }}>
                  {item.title}
                </h2>
                <p
                  className="mb-2"
                  style={{ fontSize: "0.82rem", color: "#a89d8e" }}
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
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
