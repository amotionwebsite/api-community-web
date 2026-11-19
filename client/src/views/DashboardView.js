"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowUpRight } from "@phosphor-icons/react";
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

const LoveSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M12 4.347c4.146-3.374 9.327.044 9.931 4.814.537 4.244-2.433 7.339-5.649 9.606-.713.503-1.453.969-2.207 1.407-.398.231-.797.494-1.229.657a2.5 2.5 0 0 1-.997.144c-.798-.041-1.518-.552-2.183-.953a31 31 0 0 1-1.914-1.231C4.135 16.27.954 12.663 2.324 7.962 3.555 3.738 8.311 1.345 12 4.347m-1.44 1.407c-2.08-1.532-4.577-.53-5.793 1.558a5.7 5.7 0 0 0-.756 2.551c-.181 3.179 2.493 5.611 4.872 7.279.18.126 2.729 1.878 3.165 1.833.266-.027.539-.253.76-.379.79-.453 1.564-.932 2.309-1.454 2.952-2.07 6.007-5.161 4.489-9.057-.392-1.008-1.086-1.914-2.01-2.489-1.172-.729-2.604-.79-3.8-.079a4.6 4.6 0 0 0-.712.527c-.34.303-.586.661-1.084.661-.628 0-.984-.616-1.44-.951"
    />
  </svg>
);

const DiscordSvg = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m17.347 17.716-.581-.609c-.652.241-.788.31-1.467.485a13.3 13.3 0 0 1-6.598 0c-.679-.175-.815-.244-1.467-.485l-.58.608c.362.178.886.345 1.141.678.495.648.011 1.614-.804 1.607-.417-.003-.91-.338-1.223-.495l-.783-.394c-.944-.49-2.609-1.236-2.946-2.337-.201-.654-.152-1.402-.101-2.074.16-2.106.682-4.348 1.447-6.315.388-1 .858-2.041 1.632-2.808.231-.228.478-.424.758-.589.548-.323 1.195-.552 1.801-.738.644-.197 1.657-.504 2.177.102.203.236.246.495.236.795 1.377-.17 2.648-.17 4.025 0-.017-.524.218-.995.769-1.122.581-.133 1.555.182 2.105.382.451.164.924.337 1.339.581.28.164.528.361.758.589.973.963 1.501 2.357 1.927 3.623.596 1.768 1.012 3.638 1.153 5.5.051.672.1 1.42-.1 2.074-.337 1.097-1.985 1.84-2.939 2.334l-1.059.532c-.231.114-.48.273-.734.333a1 1 0 0 1-.44.005c-.798-.172-1.059-1.224-.43-1.746.275-.229.667-.36.984-.516m-2.381-7.193a1.75 1.75 0 0 0-.954.49c-1.193 1.193-.142 3.234 1.521 2.964.36-.058.697-.232.954-.49 1.193-1.193.142-3.234-1.521-2.964m-6.5 0a1.75 1.75 0 0 0-.954.49c-1.193 1.193-.141 3.234 1.521 2.964.36-.058.697-.232.954-.49 1.193-1.193.142-3.234-1.521-2.964"
    />
  </svg>
);

const SupportHandSvg = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M6.561 20.241c-.704.828-1.535.797-2.561.759-.799-.029-1.524-.474-1.84-1.224A2.2 2.2 0 0 1 2 19v-4c.013-.343.089-.675.258-.976C2.616 13.385 3.279 13.027 4 13c1.022-.038 1.822-.07 2.538.73l2.358-.884.439-.135c.532-.138 1.081-.141 1.623-.065l3.979.663c1.041.213 1.702 1.047 1.662 2.108.457-.203 1.11-.537 1.66-.7 1.017-.302 2.201.013 2.937.777.46.478 1.059 1.346.666 2.014-.098.165-.192.242-.348.349l-4.744 2.847a3.6 3.6 0 0 1-.816.338l-2.581.646a5.33 5.33 0 0 1-2.794-.108Zm8.039-4.955-.048-.014-3.891-.648a2.3 2.3 0 0 0-1.094.106L7 15.693v2.586l4.184 1.395a3.3 3.3 0 0 0 1.731.066l2.518-.629.339-.141 3.75-2.249a1.1 1.1 0 0 0-.902-.013l-2.326 1.033a3.2 3.2 0 0 1-.871.237c-.692.076-2.357.026-2.423.022-.45-.029-.843-.287-.965-.739a1 1 0 0 1 .097-.758c.61-1.065 1.887.131 2.468-1.217m-10.594-.28v3.988h.988v-3.988ZM16 3.471c2.115-1.239 4.473.195 4.918 2.475.448 2.301-1.134 4.034-2.919 5.224-.512.342-1.341.941-1.999.941s-1.487-.599-1.999-.941c-1.785-1.19-3.367-2.923-2.919-5.224.445-2.28 2.803-3.714 4.918-2.475m0 6.583c1.343-.765 3.707-2.297 2.802-4.173-.167-.347-.449-.658-.812-.801-.966-.383-1.172.678-1.99.678-.769 0-.977-.93-1.839-.727-.432.103-.775.46-.963.85-.905 1.876 1.459 3.408 2.802 4.173"
    />
  </svg>
);

export default function DashboardView() {
  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {/* 1. Hero Sambutan dengan Banner Memanjang & Blur Halus di Bawahnya */}
        <motion.section
          initial={{ opacity: 0, x: -18, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="smoked-glass overflow-hidden mb-3 text-start"
        >
          {/* Banner Memanjang Full-bleed di Dalam Kapsul */}
          <div
            className="position-relative w-100 overflow-hidden"
            style={{
              height: "172px",
              backgroundColor: "#15120f",
            }}
          >
            <img
              src="/banner.png"
              alt="Banner Anak Programmer Indonesia"
              className="w-100 h-100 object-fit-cover"
            />

            {/* Lapisan Blur Halus Bertahap di Bawah Banner */}
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: "74px",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage:
                  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Lapisan Fade Warna Menyatu ke Dasar Kapsul */}
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: "82px",
                background:
                  "linear-gradient(to top, #15120f 0%, rgba(21, 18, 15, 0.82) 28%, rgba(21, 18, 15, 0.35) 62%, rgba(21, 18, 15, 0) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div className="px-4 pb-4 pt-1 position-relative" style={{ zIndex: 2 }}>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
                lineHeight: 1.25,
              }}
              className="h3 mb-2"
            >
              Selamat Datang di Website Anak Programmer Indonesia
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mb-0"
              style={{
                fontFamily: "var(--font-tommy-personal), sans-serif",
                fontWeight: 400,
                fontSize: "0.88rem",
                color: "#cfc5b6",
                lineHeight: 1.68,
              }}
            >
              Ruang singgah digital bagi developer Indonesia untuk saling bantu
              bedah error, berbagi catatan ngoding lintas perangkat, dan merilis
              karya teknologi bersama-sama tanpa batasan latar belakang.
            </motion.p>
          </div>
        </motion.section>

        {/* 2. Tentang Anak Programmer Indonesia */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="smoked-glass p-4 mb-3 text-start"
        >
          <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
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
              fontFamily: "var(--font-tommy-personal), sans-serif",
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
          transition={{ duration: 0.5, delay: 0.26 }}
          className="smoked-glass p-4 mb-3 text-start"
        >
          <div
            className="d-flex align-items-center gap-2 mb-3"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
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
              style={{
                fontFamily: "var(--font-tommy-medium), sans-serif",
                fontSize: "0.73rem",
                color: "#c5a059",
              }}
            >
              VISI UTAMA
            </span>
            <p
              className="mb-0"
              style={{
                fontFamily: "var(--font-tommy-personal), sans-serif",
                fontSize: "0.86rem",
                color: "#f2ece1",
                lineHeight: 1.6,
              }}
            >
              Menjadi wadah kolaborasi programmer Indonesia yang inklusif dan
              terbuka bagi siapa saja—membuktikan bahwa keterbatasan perangkat
              bukanlah penghalang untuk melahirkan inovasi digital.
            </p>
          </div>

          <span
            className="d-block mb-2"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.73rem",
              color: "#c5a059",
            }}
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
                style={{
                  fontFamily: "var(--font-tommy-personal), sans-serif",
                  fontSize: "0.84rem",
                  color: "#b8ad9e",
                  lineHeight: 1.6,
                }}
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
          transition={{ duration: 0.5, delay: 0.34 }}
          className="smoked-glass p-4 text-start"
        >
          <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#c5a059",
            }}
          >
            <LoveSvg size={18} />
            <span>Support Anak Programmer Indonesia</span>
          </div>

          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-tommy-personal), sans-serif",
              fontSize: "0.84rem",
              color: "#b8ad9e",
              lineHeight: 1.6,
            }}
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
              <span>Gabung Komunitas</span>
              <DiscordSvg size={17} />
              <ArrowUpRight weight="bold" size={14} />
            </a>

            <a
              href="https://saweria.co/apicommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-glass-subtle px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
            >
              <SupportHandSvg size={17} />
              <span>Support Komunitas</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
