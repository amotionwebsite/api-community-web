"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  HandsClapping,
  Plus,
  GithubLogo,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const INITIAL_PROJECTS = [
  {
    id: "p1",
    title: "aMotion / Loopin Project",
    author: "jason_franklin",
    tagline:
      "Platform komunitas dan streaming terpadu dengan ruang Circle, Reels, dan pemutar musik tersinkronisasi.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    demoUrl: "https://github.com/amotionwebsite",
    repoUrl: "https://github.com/amotionwebsite",
    claps: 24,
  },
  {
    id: "p2",
    title: "Bot Guard WhatsApp API",
    author: "apigroup_official",
    tagline:
      "Otomasi moderasi grup developer berbasis Baileys & PM2 yang ringan dijalankan langsung di Termux.",
    stack: ["Node.js", "Baileys", "Termux"],
    demoUrl: "https://github.com/amotionwebsite",
    repoUrl: "https://github.com/amotionwebsite",
    claps: 19,
  },
];

export default function ShowcaseView() {
  const user = useAuthStore((s) => s.user);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [clapped, setClapped] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [stack, setStack] = useState("");
  const [url, setUrl] = useState("");

  const handleClap = (id) => {
    if (clapped.includes(id)) return;
    setClapped([...clapped, id]);
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, claps: p.claps + 1 } : p))
    );
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim()) return;
    setProjects([
      {
        id: String(Date.now()),
        title: title.trim(),
        author: user?.username || "builder_api",
        tagline: tagline.trim(),
        stack: stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        demoUrl: url.trim() || "https://github.com",
        repoUrl: url.trim() || "https://github.com",
        claps: 1,
      },
      ...projects,
    ]);
    setTitle("");
    setTagline("");
    setStack("");
    setUrl("");
    setOpenForm(false);
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
              Etalase Karya Member
            </h1>
            <p className="mb-0" style={{ fontSize: "0.8rem", color: "#9a8f80" }}>
              Pamerkan web app, bot, CLI, atau eksperimen buatanmu sendiri.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpenForm(!openForm)}
            className="btn btn-sm btn-sogan px-3 py-1.5 d-inline-flex align-items-center gap-1"
          >
            <Plus weight="bold" />
            <span>Rilis Karya</span>
          </button>
        </div>

        {openForm && (
          <motion.form
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddProject}
            className="smoked-glass p-3 mb-3 d-flex flex-column gap-2.5"
          >
            <input
              type="text"
              required
              placeholder="Nama project..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control bg-transparent border-secondary-subtle text-light"
              style={{ fontSize: "0.85rem" }}
            />
            <textarea
              rows={2}
              required
              placeholder="Deskripsi singkat fungsi project..."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="form-control bg-transparent border-secondary-subtle text-light"
              style={{ fontSize: "0.84rem" }}
            />
            <input
              type="text"
              placeholder="Tech stack (pisahkan koma: React, Express, MongoDB)"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              className="form-control bg-transparent border-secondary-subtle text-light"
              style={{ fontSize: "0.82rem" }}
            />
            <input
              type="url"
              placeholder="Link Demo atau GitHub (https://...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-control bg-transparent border-secondary-subtle text-light"
              style={{ fontSize: "0.82rem" }}
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setOpenForm(false)}
                className="btn btn-sm btn-glass-subtle px-3"
              >
                Batal
              </button>
              <button type="submit" className="btn btn-sm btn-sogan px-3">
                Publikasikan
              </button>
            </div>
          </motion.form>
        )}

        <div className="d-flex flex-column gap-3">
          {projects.map((proj) => {
            const hasClapped = clapped.includes(proj.id);
            return (
              <article
                key={proj.id}
                className="smoked-glass smoked-glass-interactive p-3 p-sm-4"
              >
                <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "#c5a059" }}>
                      Karya @{proj.author}
                    </span>
                    <h2 className="h5 mb-0 mt-0.5" style={{ color: "#f2ece1" }}>
                      {proj.title}
                    </h2>
                  </div>
                  <div className="d-flex gap-1.5">
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-glass-subtle px-2 py-1"
                      title="Repository"
                    >
                      <GithubLogo size={16} />
                    </a>
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-sogan px-2.5 py-1 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <span>Kunjungi</span>
                      <ArrowUpRight weight="bold" size={14} />
                    </a>
                  </div>
                </div>

                <p
                  className="mb-3"
                  style={{ fontSize: "0.85rem", color: "#b8ad9e" }}
                >
                  {proj.tagline}
                </p>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex flex-wrap gap-1.5">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-pill"
                        style={{
                          fontSize: "0.7rem",
                          background: "rgba(118, 168, 130, 0.12)",
                          color: "#96c7a1",
                          border: "1px solid rgba(118, 168, 130, 0.22)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClap(proj.id)}
                    className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1.5"
                    style={{
                      fontSize: "0.75rem",
                      color: hasClapped ? "#c5a059" : "#b8ad9e",
                    }}
                  >
                    <HandsClapping
                      weight={hasClapped ? "fill" : "duotone"}
                      size={16}
                    />
                    <span>{proj.claps} Apresiasi</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
