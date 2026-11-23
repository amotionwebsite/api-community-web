"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const EyeOpenSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M15.446 12.237c-.837 1.246-1.389 2.48-2.978 2.73-2.391.375-4.237-2.131-3.158-4.302.198-.399.486-.751.836-1.026l1.616-1.087.287 1.881a2.01 2.01 0 0 0 1.517 1.516ZM12.752 4.03c3.401.273 6.907 2.548 8.539 5.554.4.737.711 1.567.711 2.416 0 1.224-.616 2.403-1.315 3.37-2.12 2.935-5.783 4.895-9.439 4.6-3.401-.273-6.907-2.548-8.539-5.554-.4-.737-.711-1.567-.711-2.416 0-1.224.616-2.403 1.315-3.37 2.12-2.935 5.783-4.895 9.439-4.6m-1.343 1.995c-1.155.093-2.276.461-3.291 1.012-1.547.839-3.09 2.223-3.825 3.852-.155.345-.291.727-.291 1.111 0 .791.488 1.582.933 2.199 1.834 2.538 5.085 4.209 8.237 3.706 1.137-.181 2.225-.621 3.2-1.227 1.366-.85 2.664-2.08 3.335-3.567.155-.345.291-.727.291-1.111 0-.791-.488-1.582-.933-2.199-1.714-2.372-4.693-4.015-7.656-3.776"
    />
  </svg>
);

const EyeClosedSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m15.528 15.302.414 1.547.034.259c.001.872-1.09 1.324-1.707.707-.142-.142-.195-.26-.258-.448l-.41-1.528a10 10 0 0 1-3.202 0l-.41 1.528c-.063.188-.116.306-.258.448-.617.617-1.708.165-1.708-.707l.035-.259.414-1.547c-1.009-.376-1.884-.97-2.704-1.657l-1.193 1.194c-.149.13-.254.206-.448.258-.843.226-1.561-.71-1.125-1.466l.159-.207 1.272-1.272c-.595-.865-1.1-1.806-1.379-2.826l-.052-.256c-.052-.754.757-1.3 1.436-.969.514.251.569.822.758 1.301l.284.635q.296.592.696 1.12c1.368 1.809 3.572 2.816 5.824 2.816s4.456-1.007 5.824-2.816q.399-.528.696-1.12l.284-.635c.189-.479.244-1.05.757-1.301.68-.331 1.489.215 1.436.969-.018.265-.296.972-.317 1.025-.281.739-.667 1.409-1.113 2.057l1.272 1.272.159.207c.436.756-.282 1.692-1.125 1.466-.194-.052-.299-.128-.448-.258l-1.193-1.194c-.82.687-1.696 1.281-2.704 1.657"
    />
  </svg>
);

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function LoginView() {
  const router = useRouter();
  const loginDemo = useAuthStore((s) => s.loginDemo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [shakeTick, setShakeTick] = useState(0);

  const passChecks = [
    { label: "Minimal 8 Karakter", ok: password.length >= 8 },
    { label: "Huruf Besar (A-Z)", ok: /[A-Z]/.test(password) },
    { label: "Angka (0-9)", ok: /[0-9]/.test(password) },
    { label: "Simbol (!@#$%^&*)", ok: /[^A-Za-z0-9]/.test(password) },
  ];

  const isPasswordStrong = passChecks.every((c) => c.ok);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const validGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(cleanEmail);

    let hasErr = false;
    if (!cleanEmail || !validGmail) {
      setEmailError("Gunakan format email namakamu@gmail.com");
      hasErr = true;
    } else {
      setEmailError("");
    }

    if (!isPasswordStrong) {
      setPassError("Penuhi semua syarat keamanan password di bawah");
      hasErr = true;
    } else {
      setPassError("");
    }

    if (hasErr) {
      setShakeTick((n) => n + 1);
      return;
    }

    loginDemo({
      username: cleanEmail.split("@")[0],
      email: cleanEmail,
    });
    router.push("/");
  };

  const handleGoogleLogin = () => {
    loginDemo({
      username: "developer_api",
      email: "developer.api@gmail.com",
    });
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />

      <main
        className="container py-4 flex-grow-1 d-flex flex-column justify-content-center mb-4"
        style={{ maxWidth: "460px" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: SMOOTH_EASE }}
          className="smoked-glass p-4"
        >
          <h1
            className="h4 mb-1"
            style={{
              fontFamily: "var(--font-coolvetica), sans-serif",
              color: "#f2ece1",
            }}
          >
            Masuk ke Ruang Anggota
          </h1>
          <p className="mb-3" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
            Ikut berdiskusi, simpan catatan kode, dan rilis karya di etalase.
          </p>

          <form noValidate onSubmit={handleSubmit} className="d-flex flex-column gap-2.5">
            {/* Input Email dengan Validasi namakamu@gmail.com + Getar & Merah */}
            <div>
              <label
                className="form-label mb-1"
                style={{ fontSize: "0.76rem", color: "#c5a059" }}
              >
                Email
              </label>
              <motion.div
                key={`email-${shakeTick}`}
                animate={
                  emailError
                    ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="namakamu@gmail.com"
                  className="form-control form-control-sm"
                  style={{
                    backgroundColor: emailError
                      ? "rgba(217, 83, 79, 0.16)"
                      : "rgba(14, 12, 10, 0.72)",
                    borderColor: emailError
                      ? "#e05a54"
                      : "rgba(197, 160, 89, 0.24)",
                    color: "#f2ece1",
                    transition: "background-color 0.22s ease, border-color 0.22s ease",
                  }}
                />
              </motion.div>
              {emailError && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="d-block mt-1"
                  style={{ fontSize: "0.72rem", color: "#f28b82" }}
                >
                  {emailError}
                </motion.span>
              )}
            </div>

            {/* Input Password dengan Ikon Mata Buka/Tutup SVG */}
            <div>
              <label
                className="form-label mb-1"
                style={{ fontSize: "0.76rem", color: "#c5a059" }}
              >
                Password
              </label>
              <motion.div
                key={`pass-${shakeTick}`}
                animate={
                  passError
                    ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
                className="position-relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passError) setPassError("");
                  }}
                  placeholder="Masukkan password kuat..."
                  className="form-control form-control-sm pe-5"
                  style={{
                    backgroundColor: passError
                      ? "rgba(217, 83, 79, 0.16)"
                      : "rgba(14, 12, 10, 0.72)",
                    borderColor: passError
                      ? "#e05a54"
                      : "rgba(197, 160, 89, 0.24)",
                    color: "#f2ece1",
                    transition: "background-color 0.22s ease, border-color 0.22s ease",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Sembunyikan password" : "Lihat password"}
                  className="btn btn-sm border-0 p-1 position-absolute top-50 end-0 translate-middle-y me-1.5 d-inline-flex align-items-center justify-content-center"
                  style={{ color: showPassword ? "#c5a059" : "#9a8f80" }}
                >
                  {showPassword ? (
                    <EyeOpenSvg size={18} />
                  ) : (
                    <EyeClosedSvg size={18} />
                  )}
                </button>
              </motion.div>

              {passError && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="d-block mt-1"
                  style={{ fontSize: "0.72rem", color: "#f28b82" }}
                >
                  {passError}
                </motion.span>
              )}

              {/* Checklist Keamanan Password (Berubah Hijau Saat Terpenuhi) */}
              <div className="d-flex flex-wrap gap-1.5 mt-2">
                {passChecks.map((rule) => (
                  <span
                    key={rule.label}
                    className="px-2 py-0.5 rounded-pill"
                    style={{
                      fontSize: "0.67rem",
                      backgroundColor: rule.ok
                        ? "rgba(118, 168, 130, 0.18)"
                        : "rgba(255, 255, 255, 0.04)",
                      border: rule.ok
                        ? "1px solid rgba(118, 168, 130, 0.45)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      color: rule.ok ? "#8fd9a1" : "#8f8578",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {rule.ok ? "✓ " : "• "}
                    {rule.label}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="btn btn-sm btn-sogan w-100 py-2 mt-1"
              style={{
                fontFamily: "var(--font-tommy-medium), sans-serif",
                fontSize: "0.82rem",
              }}
            >
              Masuk Sekarang &rarr;
            </motion.button>
          </form>

          {/* Pemisah */}
          <div className="d-flex align-items-center gap-2 my-3">
            <div
              className="flex-grow-1"
              style={{ height: "1px", backgroundColor: "rgba(197, 160, 89, 0.14)" }}
            />
            <span style={{ fontSize: "0.7rem", color: "#7d7367" }}>atau</span>
            <div
              className="flex-grow-1"
              style={{ height: "1px", backgroundColor: "rgba(197, 160, 89, 0.14)" }}
            />
          </div>

          {/* Login dengan Google */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleGoogleLogin}
            className="btn btn-sm btn-glass-subtle w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.8rem",
              color: "#f2ece1",
            }}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              alt="Google"
              width={16}
              height={16}
            />
            <span>Lanjut dengan Google</span>
          </motion.button>

          <p
            className="text-center mb-0 mt-3"
            style={{ fontSize: "0.76rem", color: "#9a8f80" }}
          >
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-decoration-none"
              style={{ color: "#c5a059", fontWeight: 600 }}
            >
              Daftar gratis
            </Link>
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}
