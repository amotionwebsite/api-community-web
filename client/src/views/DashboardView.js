"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Heart,
  DiscordLogo,
  GithubLogo,
  ShareNetwork,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

const InfoSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M11 12c-.466-.061-.834-.25-.966-.741a1 1 0 0 1 .1-.759c.186-.322.506-.476.866-.5h1c.571.037.963.429 1 1v5.134c.182.14.248.162.366.366A1.01 1.01 0 0 1 13 17.866c-.292.169-.679.155-1 .134-.271-.018-.511-.096-.707-.293-.197-.196-.275-.436-.293-.707Zm.741-3.034a1 1 0 0 1-.607-.466c-.439-.76.29-1.69 1.127-1.466.254.068.475.238.607.466.439.76-.29 1.69-1.127 1.466m-.483 13.006c-1.75-.119-3.446-.731-4.895-1.712C1.054 16.668.538 9.075 5.166 4.701a9.8 9.8 0 0 1 3.148-1.999 10.2 10.2 0 0 1 4.428-.674c1.75.119 3.446.731 4.895 1.712 5.309 3.592 5.825 11.185 1.197 15.559a9.8 9.8 0 0 1-3.148 1.999 10.2 10.2 0 0 1-4.428.674m.116-17.947a8 8 0 0 0-4.377 1.733C2.03 9.744 3.51 17.709 9.585 19.629a8 8 0 0 0 7.418-1.387c4.967-3.985 3.487-11.951-2.588-13.871a8.1 8.1 0 0 0-3.041-.346"
    />
  </svg>
);

const FlagSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M6 15.618V21c-.013.198-.033.325-.134.5a1 1 0 0 1-.607.466C4.603 22.142 4.042 21.639 4 21V5.236c.025-.82.331-1.618.943-2.181.416-.383.901-.61 1.424-.813 1.653-.643 3.522-.544 5.138.154.411.178.784.433 1.191.62.466.215.967.354 1.477.41.704.077 1.384-.019 2.058-.224l3.453-1.151c.827-.213 1.478.438 1.265 1.265l-1.885 5.653 1.864 4.66.066.262c.053.487-.244.879-.678 1.058l-3.478 1.159c-1.418.437-2.94.479-4.351-.023-.625-.222-1.159-.572-1.76-.846a4.8 4.8 0 0 0-3.62-.139c-.371.136-.757.343-1.107.518M18.419 4.581c-1.851.617-3.268 1.173-5.232.704a6.8 6.8 0 0 1-1.378-.475l-1.082-.571a4.8 4.8 0 0 0-3.62-.139c-.625.229-1.078.464-1.107 1.176V13.4c1.779-.767 3.842-.804 5.607.043.37.177.716.402 1.089.573.466.215.967.354 1.477.41.704.077 1.384-.019 2.058-.224l2.447-.815-1.538-3.846a1.65 1.65 0 0 1-.031-1.031Z"
    />
  </svg>
);

export default function DashboardView() {
  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {/* 1. Hero Sambutan + Logo Polos + Deskripsi Roboto Regular */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="smoked-glass p-4 mb-3"
        >
          <div className="d-flex align-items-center gap-3 mb-3">
            <img
              src="/logoapi.png"
              alt="Logo Anak Programmer Indonesia"
              width={58}
              height={58}
              className="object-fit-contain flex-shrink-0"
            />

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
            <InfoSvg size={18} />
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
            <FlagSvg size={18} />
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
