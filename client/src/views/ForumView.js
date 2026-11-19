"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
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

const SearchSvg = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m17.176 15.762 3.652 3.652c.359.41.405 1.01 0 1.414-.404.405-1.004.359-1.414 0l-3.652-3.652c-1.145.85-2.399 1.459-3.814 1.702C5.871 19.921.72 14.327 2.272 8.355a8.5 8.5 0 0 1 1.979-3.618A8.55 8.55 0 0 1 7.68 2.478c6.112-2.146 12.292 3.095 11.198 9.47-.243 1.415-.852 2.669-1.702 3.814M9.938 4.025a6.5 6.5 0 0 0-3.844 1.697 6.5 6.5 0 0 0-1.727 2.622c-1.558 4.436 2.021 9.03 6.695 8.631a6.5 6.5 0 0 0 3.844-1.697 6.5 6.5 0 0 0 1.727-2.622c1.558-4.436-2.021-9.03-6.695-8.631"
    />
  </svg>
);

const ReplySvg = ({ size = 15, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="currentColor"
        d="m21.321 19.148.386 1.311.04.226c.018.285-.093.567-.294.768-.27.27-.631.339-.994.254l-1.311-.386c-.669.327-1.332.573-2.08.65-3.445.353-6.371-2.554-6.043-6.001a5.52 5.52 0 0 1 1.414-3.18 5.53 5.53 0 0 1 3.016-1.691c3.374-.648 6.551 1.959 6.545 5.401-.002.952-.266 1.802-.679 2.648m-1.613-9.429c-.821-.346-1.633-.608-2.527-.688-3.871-.348-7.414 2.353-8.072 6.19a7.55 7.55 0 0 0 .401 4.004c.25.64.594 1.195.979 1.761-1.636-.159-2.656-.468-4.098-1.255l-2.65.78c-.802.188-1.44-.451-1.252-1.252l.78-2.649c-.681-1.244-1.129-2.471-1.241-3.896-.502-6.395 5.685-11.273 11.79-9.264a9 9 0 0 1 3.497 2.137c1.212 1.194 1.904 2.519 2.393 4.132"
      />
    ) : (
      <path
        fill="currentColor"
        d="m21.319 19.142.39 1.326c.101.451-.046.913-.464 1.151a1 1 0 0 1-.513.131l-.264-.041-1.326-.39a5.55 5.55 0 0 1-2.582.679c-3.528.083-6.123-3.218-5.443-6.624a5.4 5.4 0 0 1 1.335-2.596c3.4-3.645 9.461-1.311 9.547 3.668a5.4 5.4 0 0 1-.68 2.696m-2.043.134c-.111-.735.257-.897.5-1.545.192-.513.261-1.07.202-1.614-.304-2.816-3.721-4.112-5.822-2.215-2.222 2.007-1.019 5.754 1.961 6.076a3.5 3.5 0 0 0 1.614-.202c.648-.243.81-.611 1.545-.5M4.921 18.079l1.34-.394.276-.041c.401-.002.687.263 1.018.451l.477.246q.491.23 1.012.381l.532.132c.569.118 1.12.095 1.36.732l.059.254c.026.263-.055.529-.222.733a1 1 0 0 1-.675.36c-.231.023-.762-.087-.887-.112a8.5 8.5 0 0 1-2.814-1.091l-2.67.785c-.803.179-1.421-.439-1.242-1.242l.786-2.671a8.6 8.6 0 0 1-1.144-3.091c-.668-4.12 1.501-8.123 5.334-9.787 3.862-1.677 8.382-.359 10.843 3.018.277.379.517.784.731 1.201.262.512.582 1.102.196 1.64a1 1 0 0 1-1.166.352c-.484-.182-.59-.639-.801-1.062l-.265-.48a7 7 0 0 0-1-1.292c-2.126-2.169-5.516-2.718-8.215-1.32-2.69 1.394-4.198 4.446-3.679 7.43a7 7 0 0 0 .519 1.68l.261.517c.191.341.474.642.471 1.056l-.041.275Z"
      />
    )}
  </svg>
);

const CATEGORIES = ["Bug & Error", "Workflow", "Diskusi Tech"];
const SMOOTH_EASE = [0.22, 1, 0.36, 1];

const getCategoryBadgeStyle = (cat) => {
  const lower = (cat || "").toLowerCase();
  if (lower.includes("bug") || lower.includes("error")) {
    return {
      background: "rgba(217, 83, 79, 0.16)",
      border: "1px solid rgba(217, 83, 79, 0.36)",
      color: "#f28b82",
    };
  }
  if (lower.includes("workflow")) {
    return {
      background: "rgba(118, 168, 130, 0.15)",
      border: "1px solid rgba(118, 168, 130, 0.32)",
      color: "#9fd0aa",
    };
  }
  return {
    background: "rgba(197, 160, 89, 0.14)",
    border: "1px solid rgba(197, 160, 89, 0.3)",
    color: "#e6cfa3",
  };
};

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
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setShowForm(!showForm);
              setCatOpen(false);
              setErrors({ title: false, content: false });
            }}
            title="Buat Utas"
            className="btn btn-sm btn-sogan rounded-pill d-inline-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "38px", height: "38px", padding: 0 }}
          >
            <motion.span
              animate={{ rotate: showForm ? 45 : 0 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
              className="d-inline-flex align-items-center justify-content-center"
            >
              <PlusSvg size={21} />
            </motion.span>
          </motion.button>
        </div>

        {/* Form Tambah Utas dengan Animasi Buka-Tutup Smooth */}
        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div
              key="forum-form-wrapper"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
                transitionEnd: { overflow: "visible" },
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -8,
                overflow: "hidden",
              }}
              transition={{ duration: 0.36, ease: SMOOTH_EASE }}
              style={{ overflow: "hidden" }}
            >
              <form
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
                      fontFamily: "var(--font-tommy-medium), sans-serif",
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
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: SMOOTH_EASE }}
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
                                fontFamily: "var(--font-tommy-medium), sans-serif",
                                fontSize: "0.8rem",
                                backgroundColor: selected
                                  ? "rgba(197, 160, 89, 0.16)"
                                  : "transparent",
                                color: selected ? "#c5a059" : "#d8cfc2",
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
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pencarian & Filter */}
        <div className="smoked-glass p-2.5 mb-3 d-flex flex-column gap-2">
          <div className="input-group input-group-sm">
            <span
              className="input-group-text border-0 bg-transparent"
              style={{ color: "#9a8f80" }}
            >
              <SearchSvg size={16} />
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
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.72rem",
                  backgroundColor:
                    activeCat === cat ? "#c5a059" : "rgba(255,255,255,0.03)",
                  color: activeCat === cat ? "#120f0c" : "#b8ad9e",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Utas */}
        <div className="d-flex flex-column gap-2.5 mb-4">
          {filtered.map((item, idx) => {
            const badgeStyle = getCategoryBadgeStyle(item.category);
            return (
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
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1.5">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-pill"
                        style={{
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.68rem",
                          ...badgeStyle,
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-caviar), sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#e6cfa3",
                        }}
                      >
                        @{item.author}
                      </span>
                    </div>
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
                      <ReplySvg size={15} />
                      {item.comments?.length || 0} balasan
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
