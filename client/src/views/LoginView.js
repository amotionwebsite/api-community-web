"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, GithubLogo, DiscordLogo } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginView() {
  const router = useRouter();
  const loginDemo = useAuthStore((s) => s.loginDemo);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginDemo({ username, email });
    router.push("/");
  };

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main
        className="container py-5 flex-grow-1 d-flex flex-column justify-content-center"
        style={{ maxWidth: "440px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="smoked-glass p-4"
        >
          <h1
            style={{ fontFamily: "var(--font-coolvetica), sans-serif" }}
            className="h3 mb-1"
          >
            {isRegister ? "Daftar Anggota Baru" : "Masuk ke Ruang Anggota"}
          </h1>
          <p className="mb-4" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
            Ikut berdiskusi, simpan catatan kode, dan rilis karya di etalase.
          </p>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {isRegister && (
              <div>
                <label className="form-label" style={{ fontSize: "0.76rem", color: "#c5a059" }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="misal: jason_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control bg-transparent border-secondary-subtle text-light"
                />
              </div>
            )}

            <div>
              <label className="form-label" style={{ fontSize: "0.76rem", color: "#c5a059" }}>
                Email
              </label>
              <input
                type="email"
                required
                placeholder="nama@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control bg-transparent border-secondary-subtle text-light"
              />
            </div>

            <div>
              <label className="form-label" style={{ fontSize: "0.76rem", color: "#c5a059" }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-transparent border-secondary-subtle text-light"
              />
            </div>

            <button
              type="submit"
              className="btn btn-sogan py-2 d-inline-flex align-items-center justify-content-center gap-2 mt-1"
            >
              <span>{isRegister ? "Buat Akun" : "Masuk Sekarang"}</span>
              <ArrowRight weight="bold" />
            </button>
          </form>

          <div className="d-grid gap-2 mt-3 pt-3 border-top border-secondary-subtle">
            <button
              type="button"
              onClick={() => {
                loginDemo({ username: "github_builder", email: "dev@github.com" });
                router.push("/");
              }}
              className="btn btn-sm btn-glass-subtle py-2 d-inline-flex align-items-center justify-content-center gap-2"
            >
              <GithubLogo weight="fill" size={16} />
              <span>Lanjut dengan GitHub</span>
            </button>
            <button
              type="button"
              onClick={() => {
                loginDemo({ username: "discord_member", email: "dev@discord.gg" });
                router.push("/");
              }}
              className="btn btn-sm btn-glass-subtle py-2 d-inline-flex align-items-center justify-content-center gap-2"
            >
              <DiscordLogo weight="fill" size={16} />
              <span>Lanjut dengan Discord</span>
            </button>
          </div>

          <p className="text-center mt-3 mb-0" style={{ fontSize: "0.78rem", color: "#9a8f80" }}>
            {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="btn btn-link p-0 text-decoration-none fw-semibold"
              style={{ color: "#c5a059", fontSize: "0.78rem" }}
            >
              {isRegister ? "Masuk di sini" : "Daftar gratis"}
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
