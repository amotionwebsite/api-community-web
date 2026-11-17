"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  CodeBlock,
  GithubLogo,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

const PROJECTS = [
  {
    id: 1,
    name: "aMotion / Loopin Project",
    author: "jason_franklin",
    tagline: "Super-app komunitas dengan Circle, Reels, dan pemutar musik tersinkronisasi.",
    stack: ["Next.js", "Tailwind", "Node.js", "Socket.io"],
    votes: 42,
    demoUrl: "#",
    repoUrl: "https://github.com/amotionwebsite",
  },
  {
    id: 2,
    name: "Bot Guard WhatsApp API",
    author: "apigroup_official",
    tagline: "Bot moderasi otomatis berbasis Baileys & PM2 untuk proteksi grup developer.",
    stack: ["Node.js", "Baileys", "Termux"],
    votes: 31,
    demoUrl: "#",
    repoUrl: "https://github.com/amotionwebsite",
  },
  {
    id: 3,
    name: "ProMotion Web",
    author: "amotion_team",
    tagline: "Platform manajemen slot banner dinamis dengan integrasi media player.",
    stack: ["React", "Express", "MongoDB"],
    votes: 27,
    demoUrl: "https://promotion-web-nine.vercel.app/",
    repoUrl: "https://github.com/amotionwebsite/promotion-backend",
  },
];

export default function ShowcaseView() {
  const [likedIds, setLikedIds] = useState([]);

  const toggleVote = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#09050f] text-[#f7f2fa] flex flex-col justify-between selection:bg-orange-500/35">
      <Navbar />

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-5 pt-10 pb-20 flex-1">
        {/* Header */}
        <div className="pb-8 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
            <CodeBlock weight="duotone" className="text-base" />
            <span>SHOWCASE // RILIS KARYA</span>
          </div>
          <h1
            style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
            className="text-3xl sm:text-4xl font-normal tracking-wide text-[#faf5ff] mb-2"
          >
            Pamer Side-Project Komunitas
          </h1>
          <p className="text-xs sm:text-sm text-[#a894b8] max-w-xl">
            Dari eksperimen malam minggu sampai aplikasi produksi—rilis karyamu
            dan dapatkan masukan langsung dari sesama builder.
          </p>
        </div>

        {/* Project List - Hairline Grid */}
        <div className="divide-y divide-white/[0.08]">
          {PROJECTS.map((project, idx) => {
            const isLiked = likedIds.includes(project.id);
            const totalVotes = project.votes + (isLiked ? 1 : 0);

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#887499]">
                    <span className="text-orange-400">0{idx + 1}</span>
                    <span>//</span>
                    <span>by @{project.author}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ff]">
                    {project.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#b8a5c7] leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-[#cbb6d9]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleVote(project.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono transition ${
                      isLiked
                        ? "bg-orange-500/20 border-orange-400/50 text-orange-200"
                        : "bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-[#cbb6d9]"
                    }`}
                  >
                    <Heart
                      weight={isLiked ? "fill" : "duotone"}
                      className={`text-base ${
                        isLiked ? "text-orange-400" : "text-[#a894b8]"
                      }`}
                    />
                    <span>{totalVotes}</span>
                  </motion.button>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Source Code"
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#cbb6d9] hover:text-white transition"
                  >
                    <GithubLogo weight="duotone" className="text-lg" />
                  </a>

                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white/[0.07] hover:bg-orange-500 text-xs font-semibold text-white transition"
                  >
                    <span>Kunjungi</span>
                    <ArrowUpRight weight="bold" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-6 px-4 text-center text-xs font-mono text-[#887499]">
        © 2026{" "}
        <span
          style={{ fontFamily: "var(--font-utendo), sans-serif" }}
          className="text-[#cbb6d9]"
        >
          Anak Programmer Indonesia
        </span>
      </footer>
    </div>
  );
}
