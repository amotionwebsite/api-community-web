"use client";

import { motion } from "framer-motion";
import {
  Info,
  FlagBanner,
  CheckCircle,
  Heart,
  DiscordLogo,
  GithubLogo,
  ShareNetwork,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

export default function DashboardView() {
  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {/* 1. Hero Sambutan + Logo + Deskripsi Roboto Regular */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="smoked-glass p-4 mb-3"
        >
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="p-2 rounded-4 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                background: "rgba(197, 160, 89, 0.12)",
                border: "1px solid rgba(197, 160, 89, 0.28)",
              }}
            >
              <img
                src="/logoapi.png"
                alt="Logo Anak Programmer Indonesia"
                width={46}
                height={46}
                className="object-fit-contain"
              />
            </div>

            <h1
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
                lineHeight: 1.25,
              }}
              className="h4 mb-0"
            >
              Selamat Datang di Website Anak Programmer Indonesia
            </h1>
          </div>

          <p
            className="mb-0"
            style={{
              fontFamily: "var(--font-roboto), sans-serif",
              fontWeight: 400,
              fontSize: "0.88rem",
              color: "#cfc5b6",
              lineHeight: 1.65,
            }}
          >
            Ruang singgah digital bagi developer Indonesia untuk saling bantu
            bedah error, berbagi catatan ngoding lintas perangkat, dan merilis
            karya teknologi bersama-sama tanpa batasan latar belakang.
          </p>
        </motion.section>

        {/* 2. Tentang Anak Programmer Indonesia */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="smoked-glass p-4 mb-3"
        >
          <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#c5a059",
            }}
          >
            <Info weight="duotone" size={17} />
            <span>Tentang Anak Programmer Indonesia</span>
          </div>

          <p
            className="mb-0"
            style={{
              fontFamily: "var(--font-roboto), sans-serif",
              fontWeight: 400,
              fontSize: "0.86rem",
              color: "#b8ad9e",
              lineHeight: 1.7,
            }}
          >
            Anak Programmer Indonesia (API) lahir dari semangat kolaborasi
            akar rumput—mulai dari pelajar yang baru menulis baris HTML pertama
            di layar ponsel hingga engineer yang membangun sistem skala
            produksi. Di sini setiap pertanyaan dihargai, setiap bug dibedah
            bareng, dan setiap karya kecil dirayakan sebagai langkah maju.
          </p>
        </motion.section>

        {/* 3. Visi & Misi Komunitas API */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="smoked-glass p-4 mb-3"
        >
          <div
            className="d-flex align-items-center gap-2 mb-3"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#c5a059",
            }}
          >
            <FlagBanner weight="duotone" size={17} />
            <span>Visi &amp; Misi Komunitas API</span>
          </div>

          <div
            className="p-3 mb-3 rounded-3"
            style={{
              background: "rgba(14, 12, 10, 0.55)",
              borderLeft: "2.5px solid #c5a059",
            }}
          >
            <span
              className="d-block mb-1"
              style={{ fontSize: "0.72rem", color: "#c5a059", fontWeight: 600 }}
            >
              VISI UTAMA
            </span>
            <p
              className="mb-0"
              style={{ fontSize: "0.86rem", color: "#f2ece1", lineHeight: 1.6 }}
            >
              Menjadi wadah kolaborasi programmer Indonesia yang inklusif dan
              terbuka bagi siapa saja—membuktikan bahwa keterbatasan perangkat
              bukanlah penghalang untuk melahirkan inovasi digital.
            </p>
          </div>

          <span
            className="d-block mb-2"
            style={{ fontSize: "0.72rem", color: "#c5a059", fontWeight: 600 }}
          >
            MISI KOMUNITAS
          </span>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            {[
              "Membangun budaya saling bantu tanpa menghakimi dalam memecahkan bug, error, dan arsitektur kode.",
              "Mendorong anggota berani merilis side-project sejak dini serta memberi masukan yang membangun.",
              "Menghubungkan developer lintas daerah Indonesia dalam diskusi rutin dan kolaborasi proyek terbuka.",
            ].map((misi, i) => (
              <li
                key={i}
                className="d-flex align-items-start gap-2"
                style={{ fontSize: "0.84rem", color: "#b8ad9e", lineHeight: 1.6 }}
              >
                <CheckCircle
                  weight="duotone"
                  size={18}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#76a882" }}
                />
                <span>{misi}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* 4. Support API */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="smoked-glass p-4"
        >
          <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#c5a059",
            }}
          >
            <Heart weight="duotone" size={17} />
            <span>Support Anak Programmer Indonesia</span>
          </div>

          <p
            className="mb-3"
            style={{ fontSize: "0.84rem", color: "#b8ad9e", lineHeight: 1.6 }}
          >
            Dukung keberlangsungan server, bot komunitas, dan event belajar
            bareng API dengan bergabung ke kanal resmi atau ikut berkontribusi
            di repositori terbuka kami.
          </p>

          <div className="d-flex flex-wrap gap-2">
            <a
              href="https://discord.gg/7A5qtTpYT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-sogan px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
            >
              <DiscordLogo weight="fill" size={16} />
              <span>Gabung Discord API</span>
              <ArrowUpRight weight="bold" size={14} />
            </a>

            <a
              href="https://github.com/amotionwebsite"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-glass-subtle px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
            >
              <GithubLogo weight="fill" size={16} />
              <span>Kontribusi GitHub</span>
            </a>

            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Anak Programmer Indonesia",
                    url: window.location.origin,
                  });
                }
              }}
              className="btn btn-sm btn-glass-subtle px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
            >
              <ShareNetwork weight="duotone" size={16} />
              <span>Bagikan Komunitas</span>
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
