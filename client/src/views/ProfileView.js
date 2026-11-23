"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function ProfileView() {
  const { user, loginDemo, logout, projects, feedPosts } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState(
    "Full-stack web developer & pegiat komunitas Anak Programmer Indonesia."
  );
  const [role, setRole] = useState("Full-Stack Developer");

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
    if (user?.bio) {
      setBio(user.bio);
    }
    if (user?.role) {
      setRole(user.role);
    }
  }, [user]);

  const myProjectsCount = user
    ? projects.filter(
        (p) => (p.author || "").toLowerCase() === user.username.toLowerCase()
      ).length
    : 0;

  const myPostsCount = user
    ? feedPosts.filter(
        (f) => (f.author || "").toLowerCase() === user.username.toLowerCase()
      ).length
    : 0;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const cleanName = username.trim() || user?.username || "member_api";
    loginDemo({
      username: cleanName,
      email: user?.email || `${cleanName}@apicommunity.id`,
      bio: bio.trim(),
      role: role.trim(),
    });
    setEditing(false);
  };

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {!user ? (
          /* Filter: User belum masuk -> diarahkan untuk Masuk / Daftar */
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.48, ease: SMOOTH_EASE }}
            className="smoked-glass p-4 text-center"
          >
            <h1
              className="h4 mb-1.5"
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
              }}
            >
              Masuk ke Akun API
            </h1>
            <p
              className="mb-3.5 mx-auto"
              style={{
                fontFamily: "var(--font-tommy-personal), sans-serif",
                fontSize: "0.86rem",
                color: "#b8ad9e",
                maxWidth: "420px",
                lineHeight: 1.6,
              }}
            >
              Kamu belum masuk ke akun komunitas. Silakan masuk atau daftar terlebih
              dahulu untuk mengakses profil, mengedit identitas developer, dan
              mengelola karyamu.
            </p>

            <div className="d-inline-flex align-items-center gap-2">
              <Link
                href="/login"
                className="btn btn-sm btn-sogan px-4 py-1.5 rounded-pill"
                style={{
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.8rem",
                }}
              >
                Masuk Sekarang
              </Link>
              <Link
                href="/register"
                className="btn btn-sm btn-glass-subtle px-4 py-1.5 rounded-pill"
                style={{
                  fontFamily: "var(--font-tommy-medium), sans-serif",
                  fontSize: "0.8rem",
                }}
              >
                Daftar Akun
              </Link>
            </div>
          </motion.section>
        ) : (
          /* User sudah masuk -> Tampilkan Profil & Tombol Edit Profil */
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: SMOOTH_EASE }}
            className="smoked-glass p-4"
          >
            <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "54px",
                    height: "54px",
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(197, 160, 89, 0.32), rgba(184, 107, 67, 0.16))",
                    border: "1px solid rgba(197, 160, 89, 0.42)",
                    color: "#f2ece1",
                    fontFamily: "var(--font-tommy-extra), sans-serif",
                    fontSize: "1.2rem",
                  }}
                >
                  {(user.username?.[0] || "A").toUpperCase()}
                </div>

                <div>
                  <span
                    className="d-block"
                    style={{
                      fontFamily: "var(--font-caviar), sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#e6cfa3",
                    }}
                  >
                    @{user.username}
                  </span>
                  <span
                    className="d-inline-block mt-0.5 px-2.5 py-0.5 rounded-pill"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.68rem",
                      backgroundColor: "rgba(197, 160, 89, 0.14)",
                      border: "1px solid rgba(197, 160, 89, 0.3)",
                      color: "#c5a059",
                    }}
                  >
                    {user.role || role}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-1.5 flex-shrink-0">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditing(!editing)}
                  className="btn btn-sm btn-sogan px-3 py-1 rounded-pill"
                  style={{
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  {editing ? "Tutup Edit" : "Edit Profil"}
                </motion.button>

                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-sm btn-glass-subtle px-2.5 py-1 rounded-pill"
                  style={{
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  Keluar
                </button>
              </div>
            </div>

            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-tommy-regular), sans-serif",
                fontSize: "0.85rem",
                color: "#cfc5b6",
                lineHeight: 1.6,
              }}
            >
              {user.bio || bio}
            </p>

            {/* Statistik Ringkas */}
            <div className="row g-2 mb-2">
              <div className="col-6">
                <div
                  className="p-2.5 rounded-3 text-center"
                  style={{
                    backgroundColor: "rgba(14, 12, 10, 0.55)",
                    border: "1px solid rgba(197, 160, 89, 0.14)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-tommy-extra), sans-serif",
                      fontSize: "1.05rem",
                      color: "#f2ece1",
                    }}
                  >
                    {myProjectsCount}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#9a8f80" }}>
                    Karya Dirilis
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div
                  className="p-2.5 rounded-3 text-center"
                  style={{
                    backgroundColor: "rgba(14, 12, 10, 0.55)",
                    border: "1px solid rgba(197, 160, 89, 0.14)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-tommy-extra), sans-serif",
                      fontSize: "1.05rem",
                      color: "#f2ece1",
                    }}
                  >
                    {myPostsCount}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#9a8f80" }}>
                    Postingan Feed
                  </div>
                </div>
              </div>
            </div>

            {/* Form Edit Profil */}
            <AnimatePresence initial={false}>
              {editing && (
                <motion.form
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.32, ease: SMOOTH_EASE }}
                  onSubmit={handleSaveProfile}
                  className="mt-3 pt-3 border-top d-flex flex-column gap-2.5 overflow-hidden"
                  style={{ borderColor: "rgba(197, 160, 89, 0.16)" }}
                >
                  <div>
                    <label
                      className="form-label mb-1"
                      style={{ fontSize: "0.74rem", color: "#c5a059" }}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control form-control-sm"
                      style={{
                        background: "rgba(14, 12, 10, 0.72)",
                        borderColor: "rgba(197, 160, 89, 0.24)",
                        color: "#f2ece1",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="form-label mb-1"
                      style={{ fontSize: "0.74rem", color: "#c5a059" }}
                    >
                      Role / Spesialisasi
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control form-control-sm"
                      style={{
                        background: "rgba(14, 12, 10, 0.72)",
                        borderColor: "rgba(197, 160, 89, 0.24)",
                        color: "#f2ece1",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="form-label mb-1"
                      style={{ fontSize: "0.74rem", color: "#c5a059" }}
                    >
                      Bio Singkat
                    </label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="form-control form-control-sm"
                      style={{
                        background: "rgba(14, 12, 10, 0.72)",
                        borderColor: "rgba(197, 160, 89, 0.24)",
                        color: "#f2ece1",
                      }}
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn btn-sm btn-glass-subtle px-3"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-sogan px-3"
                      style={{ fontFamily: "var(--font-tommy-medium), sans-serif" }}
                    >
                      Simpan Profil
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </main>
    </div>
  );
}
