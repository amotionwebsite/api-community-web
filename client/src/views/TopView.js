"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
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

const SendSvg = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m9.53 15.846.177-.139 5-5c.359-.409.405-1.009 0-1.414-.404-.405-1.004-.358-1.414 0l-5 5-.14.176-5.15-2.981c-.521-.34-.772-.956-.532-1.554.137-.342.401-.562.733-.703l15.611-5.647c.468-.144.954-.063 1.309.292s.435.841.291 1.309l-5.646 15.61c-.141.333-.361.597-.704.734-.597.24-1.213-.011-1.553-.532Z"
    />
  </svg>
);

const ApplauseSvg = ({ size = 16, active = false }) => (
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
        d="M9.401 3.599c1.129-.93 2.702-.905 3.645.286.363.458.607.999.898 1.505a3.8 3.8 0 0 1 1.185-1.015c.964-.514 2.277-.788 2.863.39l.233.644.393.921c.476 1.014.997 1.859 1.28 2.969.507 1.987.291 4.17-.735 5.961l-.367.576-.424.543-.167.629-.218.612a7.1 7.1 0 0 1-3.014 3.47c-2.704 1.568-6.233 1.114-8.457-1.081-.773-.763-1.326-1.727-1.856-2.667l-.318-.602-1.175-1.959c-.412-.748-.479-1.619-.09-2.395.301-.602.812-.998 1.426-1.241l-.775-1.34-.161-.334a2.52 2.52 0 0 1 .77-2.873c.261-.207.535-.327.844-.439-.154-.469-.238-.912-.146-1.407.319-1.722 2.294-2.592 3.781-1.661.295.184.342.262.585.508m5.937 3.57c.882.261.995.671 1.29 1.464l.392.922c.269.572.597 1.116.848 1.698l.268.711c.037-.849-.007-1.655-.259-2.473-.215-.699-.578-1.31-.899-1.961-.354-.717-.36-.772-.654-1.502-.577.263-.862.505-.986 1.141m-2.991 1.443c.226-.276.451-.5.728-.725l-1.552-2.695c-.16-.222-.428-.329-.684-.184-.251.143-.298.439-.182.684l.96 1.663ZM7.831 6.797c.272-.218.54-.373.865-.501l-.772-1.337a.5.5 0 0 0-.231-.207.505.505 0 0 0-.692.558l.057.149ZM20.65 3.512c.806.122 1.132 1.156.537 1.716l-.185.137-.841.488c-.342.173-.731.185-1.058-.035a1.01 1.01 0 0 1-.441-.761c-.027-.393.177-.724.497-.935l.84-.487c.208-.105.417-.159.651-.123m-2.017-2.423c.219.059.414.191.548.374.301.41.178.889.031 1.334-.171.517-.677.854-1.226.707a1 1 0 0 1-.547-.374c-.301-.411-.178-.888-.03-1.334.171-.517.675-.854 1.224-.707m-3.196-.016c.604.118.793.671.903 1.206.128.618-.272 1.237-.935 1.259-.748.024-.998-.606-1.126-1.224-.148-.715.402-1.388 1.158-1.241"
      />
    ) : (
      <path
        fill="currentColor"
        d="M4.504 11.149c-.178-.31-.847-1.318-1.01-1.9-.38-1.36.378-2.649 1.692-3.089-1.029-2.658 2.326-4.693 4.216-2.557 1.034-.896 2.516-.885 3.488.107.432.442.795 1.229 1.056 1.682a3.8 3.8 0 0 1 1.02-.923c.961-.587 2.373-.927 3.012.271.125.235.201.548.289.776l.242.576c.547 1.221 1.17 2.142 1.455 3.484.417 1.967.156 4.021-.854 5.771a6 6 0 0 1-.486.72l-.256.302-.064.289-.234.743a7.24 7.24 0 0 1-3.053 3.662c-2.862 1.718-6.56 1.08-8.788-1.356-.762-.833-1.307-1.936-1.849-2.894-.386-.681-.834-1.348-1.213-2.033-.474-.855-.466-1.871.087-2.69.306-.453.747-.747 1.25-.941M14.73 9.256c-.878.354-1.204 1.044-.853 1.945.134.345.402.638.402 1.026a1.01 1.01 0 0 1-1.259.966c-.391-.105-.571-.403-.76-.731l-2.069-3.584c-.198-.334-.524-1.032-1.03-.581-.203.181-.191.438-.077.663l2.224 3.853c.335.679-.06 1.5-.866 1.5-.372 0-.665-.2-.866-.5l-.786-1.362-.213-.249-2.225-3.854c-.138-.21-.354-.349-.613-.264-.343.114-.4.476-.253.764l1.962 3.4.006.009 1.256 2.176.1.241a1 1 0 0 1 0 .518c-.195.73-1.138.982-1.673.448l-.159-.207c-.37-.554-.665-1.155-1-1.731-.163-.282-.327-.732-.737-.681a.5.5 0 0 0-.328.191c-.138.183-.105.392-.005.583l1.2 2c.75 1.325 1.379 2.676 2.713 3.493 2.211 1.355 5.131.799 6.676-1.291.712-.962 1.062-2.167 1.067-3.356a6.5 6.5 0 0 0-.546-2.625c-.157-.36-.426-.837-.597-1.178a13 13 0 0 1-.691-1.582m1.598-3.225c-.558.225-.898.534-.985 1.144 1.132.301 1.143 1.192 1.568 2.142.398.888.898 1.708 1.22 2.63a6.4 6.4 0 0 0-.494-3.108c-.17-.397-.427-.844-.618-1.226a13 13 0 0 1-.691-1.582m-3.979 2.585c.22-.28.447-.508.727-.728l-1.529-2.654c-.157-.24-.432-.379-.705-.221-.273.157-.291.464-.161.721l.936 1.622ZM7.833 6.801c.272-.223.537-.376.866-.501L7.95 5.003a.6.6 0 0 0-.241-.239c-.394-.193-.808.194-.688.599l.062.14Zm12.924-3.267c.73.194.985 1.136.451 1.672l-.207.159-.84.487c-.323.161-.678.188-1 .002a1 1 0 0 1-.467-.606c-.122-.454.089-.874.464-1.126l.84-.487c.244-.121.491-.173.759-.101m-6.512-1.479c0-.872 1.09-1.324 1.707-.708.239.239.326.617.388.932.053.266.039.518-.099.758a1.01 1.01 0 0 1-.866.501c-.73 0-.975-.615-1.096-1.224Zm4.388-.966c.432.116.741.518.741.966 0 .197-.118.609-.163.741-.175.516-.673.856-1.225.708a1.01 1.01 0 0 1-.741-.966c0-.198.118-.61.163-.742.175-.516.673-.855 1.225-.707"
      />
    )}
  </svg>
);

const CARD_THEMES = [
  {
    id: "sogan",
    label: "Top #1 Emas",
    bg: "linear-gradient(135deg, #241c13 0%, #130f0c 55%, #1d160e 100%)",
    border: "rgba(197, 160, 89, 0.48)",
    accent: "#c5a059",
  },
  {
    id: "emerald",
    label: "Top #2 Emerald",
    bg: "linear-gradient(135deg, #13231a 0%, #0d1410 55%, #14261c 100%)",
    border: "rgba(118, 168, 130, 0.48)",
    accent: "#8fc29b",
  },
  {
    id: "blue",
    label: "Top #3 Biru",
    bg: "linear-gradient(135deg, #131e2c 0%, #0d1117 55%, #142130 100%)",
    border: "rgba(106, 165, 232, 0.48)",
    accent: "#7eb6f5",
  },
  {
    id: "obsidian",
    label: "Top #4 Violet",
    bg: "linear-gradient(135deg, #1d1526 0%, #100d14 55%, #1a1322 100%)",
    border: "rgba(176, 146, 224, 0.42)",
    accent: "#c8b2eb",
  },
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function TopView() {
  const router = useRouter();
  const {
    user,
    projects,
    likedProjectIds,
    toggleProjectLike,
    addFeedPost,
  } = useAuthStore();

  const top10Projects = useMemo(() => {
    return [...projects]
      .sort((a, b) => (b.applause || 0) - (a.applause || 0))
      .slice(0, 10);
  }, [projects]);

  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(
    top10Projects[0]?.id || ""
  );
  const [customTitle, setCustomTitle] = useState(
    top10Projects[0]?.title || "Karya Pilihan API"
  );
  const [customRank, setCustomRank] = useState("#1 Top Karya");
  const [customNote, setCustomNote] = useState(
    "Bangga tembus jajaran Top 10 Karya Member Anak Programmer Indonesia!"
  );
  const [themeId, setThemeId] = useState("sogan");
  const [errors, setErrors] = useState({ title: false });
  const [shakeTick, setShakeTick] = useState(0);

  const selectedTheme =
    CARD_THEMES.find((t) => t.id === themeId) || CARD_THEMES[0];

  const handleSelectPreset = (proj, rankNumber) => {
    setSelectedProjectId(proj.id);
    setCustomTitle(proj.title);
    setCustomRank(`#${rankNumber} Top Karya`);
    setCustomNote(
      `${proj.title} meraih ${proj.applause} Apresiasi di Etalase Karya Member API!`
    );
    if (rankNumber === 1) setThemeId("sogan");
    else if (rankNumber === 2) setThemeId("emerald");
    else if (rankNumber === 3) setThemeId("blue");
    else setThemeId("obsidian");
    setErrors({ title: false });
  };

  const handleShareCardToFeed = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) {
      setErrors({ title: true });
      setShakeTick((n) => n + 1);
      return;
    }

    const refProj = top10Projects.find((p) => p.id === selectedProjectId);
    const authorName =
      user?.username || refProj?.author || "builder_api";

    addFeedPost({
      id: String(Date.now()),
      title: `${customRank.trim() || "Top Karya"} — ${customTitle.trim()}`,
      category: "Karya API",
      author: authorName,
      time: "Baru saja",
      excerpt:
        customNote.trim() ||
        "Membagikan kartu pencapaian Top 10 Apresiasi Karya Member.",
      content:
        customNote.trim() ||
        "Membagikan kartu pencapaian Top 10 Apresiasi Karya Member.",
      demoUrl: refProj?.demoUrl || "https://api-community-web.vercel.app",
      topCard: {
        rank: customRank.trim() || "#1 Top Karya",
        projectTitle: customTitle.trim(),
        author: refProj?.author || authorName,
        applause: refProj?.applause || 1,
        stack: refProj?.stack || ["Next.js"],
        note: customNote.trim(),
        demoUrl: refProj?.demoUrl || "https://api-community-web.vercel.app",
        themeId,
      },
      comments: [],
    });

    setShowBuilder(false);
    router.push("/");
  };

  const getRankBadgeStyle = (rankIdx) => {
    if (rankIdx === 0) {
      // Top 1: Emas
      return {
        background: "linear-gradient(180deg, #e5be6b 0%, #b58c3e 100%)",
        color: "#120f0c",
        boxShadow: "0 4px 12px rgba(197, 160, 89, 0.28)",
      };
    }
    if (rankIdx === 1) {
      // Top 2: Hijau Emerald
      return {
        background: "rgba(118, 168, 130, 0.24)",
        border: "1px solid rgba(118, 168, 130, 0.55)",
        color: "#9fd0aa",
      };
    }
    if (rankIdx === 2) {
      // Top 3: Biru
      return {
        background: "rgba(106, 165, 232, 0.22)",
        border: "1px solid rgba(106, 165, 232, 0.52)",
        color: "#8cc0fa",
      };
    }
    if (rankIdx === 3) {
      // Top 4: Ungu Violet lembut
      return {
        background: "rgba(176, 146, 224, 0.18)",
        border: "1px solid rgba(176, 146, 224, 0.42)",
        color: "#cbb5ed",
      };
    }
    if (rankIdx === 4) {
      // Top 5: Terakota hangat
      return {
        background: "rgba(184, 107, 67, 0.2)",
        border: "1px solid rgba(184, 107, 67, 0.45)",
        color: "#e8a882",
      };
    }
    return {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(197, 160, 89, 0.16)",
      color: "#b8ad9e",
    };
  };

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5">
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        {/* Header Top 10 + Tombol (+) Buat Card Sendiri */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <div>
            <h1
              className="h4 mb-0"
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
              }}
            >
              Top 10 Karya Member
            </h1>
            <p className="mb-0" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
              Peringkat apresiasi tertinggi &amp; buat card pencapaianmu untuk diposting ke Feed.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowBuilder(!showBuilder)}
            title="Buat Card Top Karya"
            className="btn btn-sm btn-sogan rounded-pill d-inline-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "38px", height: "38px", padding: 0 }}
          >
            <motion.span
              animate={{ rotate: showBuilder ? 45 : 0 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
              className="d-inline-flex align-items-center justify-content-center"
            >
              <PlusSvg size={21} />
            </motion.span>
          </motion.button>
        </div>

        {/* Form Buat Card Sendiri & Posting ke Feed */}
        <AnimatePresence initial={false}>
          {showBuilder && (
            <motion.div
              key="top-card-builder"
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
                onSubmit={handleShareCardToFeed}
                className="smoked-glass p-3.5 mb-3 d-flex flex-column gap-2.5"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.75rem",
                      color: "#c5a059",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Buat Card Peringkat &amp; Posting ke Feed
                  </span>
                </div>

                {/* Pilih Cepat dari Karya Top 10 */}
                <div className="d-flex align-items-center gap-1.5 overflow-x-auto pb-1">
                  {top10Projects.slice(0, 5).map((proj, i) => {
                    const active = selectedProjectId === proj.id;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => handleSelectPreset(proj, i + 1)}
                        className="btn btn-sm rounded-pill px-2.5 py-0.5 flex-shrink-0"
                        style={{
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.69rem",
                          backgroundColor: active
                            ? "rgba(197, 160, 89, 0.22)"
                            : "rgba(255, 255, 255, 0.04)",
                          border: active
                            ? "1px solid #c5a059"
                            : "1px solid rgba(255, 255, 255, 0.08)",
                          color: active ? "#f2ece1" : "#9a8f80",
                        }}
                      >
                        #{i + 1} {proj.title}
                      </button>
                    );
                  })}
                </div>

                <div className="row g-2">
                  <div className="col-5">
                    <input
                      type="text"
                      value={customRank}
                      onChange={(e) => setCustomRank(e.target.value)}
                      placeholder="Label peringkat..."
                      className="form-control form-control-sm"
                      style={{
                        background: "rgba(14,12,10,0.7)",
                        borderColor: "rgba(197,160,89,0.22)",
                        color: "#f2ece1",
                      }}
                    />
                  </div>
                  <div className="col-7">
                    <motion.div
                      key={`card-title-${shakeTick}`}
                      animate={
                        errors.title
                          ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.38 }}
                    >
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => {
                          setCustomTitle(e.target.value);
                          if (errors.title) setErrors({ title: false });
                        }}
                        placeholder="Nama karya..."
                        className="form-control form-control-sm"
                        style={{
                          background: errors.title
                            ? "rgba(185, 56, 56, 0.16)"
                            : "rgba(14,12,10,0.7)",
                          borderColor: errors.title
                            ? "#d9534f"
                            : "rgba(197,160,89,0.22)",
                          color: "#f2ece1",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Catatan singkat di dalam card..."
                  className="form-control form-control-sm"
                  style={{
                    background: "rgba(14,12,10,0.7)",
                    borderColor: "rgba(197,160,89,0.22)",
                    color: "#f2ece1",
                  }}
                />

                {/* Pilihan Warna Card */}
                <div className="d-flex align-items-center gap-1.5 flex-wrap">
                  {CARD_THEMES.map((t) => {
                    const active = themeId === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setThemeId(t.id)}
                        className="btn btn-sm rounded-pill px-2.5 py-0.5"
                        style={{
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.7rem",
                          background: t.bg,
                          border: active
                            ? `1.5px solid ${t.accent}`
                            : "1px solid rgba(255,255,255,0.12)",
                          color: t.accent,
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                {/* Live Preview Card */}
                <div
                  className="p-3 rounded-4 position-relative overflow-hidden"
                  style={{
                    background: selectedTheme.bg,
                    border: `1px solid ${selectedTheme.border}`,
                    boxShadow: "0 10px 26px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1.5">
                    <span
                      className="px-2.5 py-0.5 rounded-pill"
                      style={{
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.68rem",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        color: selectedTheme.accent,
                      }}
                    >
                      {customRank || "#1 Top Karya"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-caviar), sans-serif",
                        fontSize: "0.74rem",
                        color: selectedTheme.accent,
                        fontWeight: 600,
                      }}
                    >
                      @
                      {user?.username ||
                        top10Projects.find((p) => p.id === selectedProjectId)
                          ?.author ||
                        "builder_api"}
                    </span>
                  </div>

                  <h3
                    className="h5 mb-1"
                    style={{
                      fontFamily: "var(--font-tommy-extra), sans-serif",
                      color: "#f2ece1",
                      lineHeight: 1.35,
                    }}
                  >
                    {customTitle || "Nama Karya Member"}
                  </h3>

                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "var(--font-tommy-regular), sans-serif",
                      fontSize: "0.8rem",
                      color: "#cfc5b6",
                    }}
                  >
                    {customNote}
                  </p>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowBuilder(false)}
                    className="btn btn-sm btn-glass-subtle px-3"
                  >
                    Batal
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-sm btn-sogan px-3 d-inline-flex align-items-center gap-1.5"
                    style={{ fontFamily: "var(--font-tommy-medium), sans-serif" }}
                  >
                    <span>Posting ke Feed</span>
                    <SendSvg size={14} />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Daftar Leaderboard Top 10 Apresiasi Karya Member */}
        <div className="d-flex flex-column gap-2.5 mb-4">
          {top10Projects.map((proj, idx) => {
            const liked = likedProjectIds.includes(proj.id);
            const rankStyle = getRankBadgeStyle(idx);

            return (
              <motion.article
                key={proj.id}
                layout="position"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: SMOOTH_EASE }}
                className="smoked-glass smoked-glass-interactive p-3 d-flex align-items-center justify-content-between gap-2.5"
              >
                {/* Nomor Peringkat */}
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    fontFamily: "var(--font-tommy-extra), sans-serif",
                    fontSize: "0.85rem",
                    ...rankStyle,
                  }}
                >
                  #{idx + 1}
                </div>

                {/* Info Karya & Author */}
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                  <div className="d-flex align-items-center gap-1.5 flex-wrap mb-0.5">
                    <span
                      style={{
                        fontFamily: "var(--font-caviar), sans-serif",
                        fontSize: "0.76rem",
                        color: "#c5a059",
                        fontWeight: 600,
                      }}
                    >
                      @{proj.author}
                    </span>
                    {proj.stack?.[0] && (
                      <span
                        className="px-2 py-0 rounded-pill"
                        style={{
                          fontSize: "0.65rem",
                          background: "rgba(118, 168, 130, 0.12)",
                          border: "1px solid rgba(118, 168, 130, 0.25)",
                          color: "#9fd0aa",
                        }}
                      >
                        {proj.stack[0]}
                      </span>
                    )}
                  </div>

                  <h2
                    className="h6 mb-0.5 text-truncate"
                    style={{
                      fontFamily: "var(--font-tommy-extra), sans-serif",
                      color: "#f2ece1",
                    }}
                  >
                    {proj.title}
                  </h2>

                  <p
                    className="mb-0 text-truncate"
                    style={{
                      fontFamily: "var(--font-tommy-regular), sans-serif",
                      fontSize: "0.78rem",
                      color: "#9a8f80",
                    }}
                  >
                    {proj.desc}
                  </p>
                </div>

                {/* Tombol Apresiasi + Buat Card */}
                <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleProjectLike(proj.id)}
                    className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
                    style={{
                      fontSize: "0.73rem",
                      color: liked ? "#c5a059" : "#b8ad9e",
                      borderColor: liked
                        ? "rgba(197, 160, 89, 0.45)"
                        : undefined,
                    }}
                  >
                    <ApplauseSvg size={15} active={liked} />
                    <span>{proj.applause}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleSelectPreset(proj, idx + 1);
                      setShowBuilder(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="btn btn-sm p-0 border-0"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.67rem",
                      color: "#c5a059",
                    }}
                  >
                    Buat Card
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
