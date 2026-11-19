"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GithubLogo } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";

const PlusSvg = ({ size = 16 }) => (
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

const VisitArrowSvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M15.586 7H10c-.639-.042-1.142-.603-.966-1.259.122-.453.515-.711.966-.741h8c.198.013.325.033.5.134.322.186.476.506.5.866v8c-.03.451-.288.844-.741.966-.656.176-1.217-.327-1.259-.966V8.414l-9.95 9.95c-.41.359-1.01.404-1.414 0-.405-.404-.359-1.005 0-1.414Z"
    />
  </svg>
);

const ApplauseSvg = ({ size = 17, active = false }) => (
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

const INITIAL_PROJECTS = [
  {
    id: "p1",
    title: "aMotion / Loopin Project",
    author: "jason_franklin",
    desc: "Platform komunitas dan streaming terpadu dengan ruang Circle, Reels, dan pemutar musik tersinkronisasi.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    demoUrl: "https://api-community-web.vercel.app",
    repoUrl: "https://github.com/amotionwebsite",
    applause: 24,
  },
  {
    id: "p2",
    title: "Bot Guard WhatsApp API",
    author: "apigroup_official",
    desc: "Otomasi moderasi grup developer berbasis Baileys & PM2 yang ringan dijalankan langsung di Termux.",
    stack: ["Node.js", "Baileys", "Termux"],
    demoUrl: "https://discord.gg/7A5qtTpYT",
    repoUrl: "https://github.com/amotionwebsite",
    applause: 19,
  },
];

export default function ShowcaseView() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [likedIds, setLikedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stack, setStack] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  const toggleApplause = (id) => {
    const liked = likedIds.includes(id);
    setLikedIds(liked ? likedIds.filter((x) => x !== id) : [...likedIds, id]);
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, applause: p.applause + (liked ? -1 : 1) } : p
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    setProjects([
      {
        id: String(Date.now()),
        title: title.trim(),
        author: "builder_api",
        desc: desc.trim(),
        stack: stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        demoUrl: demoUrl.trim() || "https://github.com/amotionwebsite",
        repoUrl: "https://github.com/amotionwebsite",
        applause: 1,
      },
      ...projects,
    ]);
    setTitle("");
    setDesc("");
    setStack("");
    setDemoUrl("");
    setShowForm(false);
  };

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
              Etalase Karya Member
            </h1>
            <p className="mb-0" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
              Pamerkan web app, bot, CLI, atau eksperimen buatanmu sendiri.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn btn-sm btn-sogan px-3 py-1.5 d-inline-flex align-items-center gap-1"
          >
            <PlusSvg size={16} />
            <span>Rilis Karya</span>
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="smoked-glass p-3.5 mb-3 d-flex flex-column gap-2"
          >
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nama proyek..."
              className="form-control form-control-sm"
              style={{
                background: "rgba(14,12,10,0.7)",
                borderColor: "rgba(197,160,89,0.22)",
                color: "#f2ece1",
              }}
            />
            <textarea
              rows={2}
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Deskripsi singkat fungsi aplikasi..."
              className="form-control form-control-sm"
              style={{
                background: "rgba(14,12,10,0.7)",
                borderColor: "rgba(197,160,89,0.22)",
                color: "#f2ece1",
              }}
            />
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  placeholder="Tech stack (misal: Next.js, Express)"
                  className="form-control form-control-sm"
                  style={{
                    background: "rgba(14,12,10,0.7)",
                    borderColor: "rgba(197,160,89,0.22)",
                    color: "#f2ece1",
                  }}
                />
              </div>
              <div className="col-6">
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="Link demo / GitHub..."
                  className="form-control form-control-sm"
                  style={{
                    background: "rgba(14,12,10,0.7)",
                    borderColor: "rgba(197,160,89,0.22)",
                    color: "#f2ece1",
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-sm btn-glass-subtle px-3"
              >
                Batal
              </button>
              <button type="submit" className="btn btn-sm btn-sogan px-3">
                Tayangkan
              </button>
            </div>
          </form>
        )}

        <div className="d-flex flex-column gap-3 mb-4">
          {projects.map((p, idx) => {
            const liked = likedIds.includes(p.id);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="smoked-glass smoked-glass-interactive p-3.5"
              >
                <div className="d-flex align-items-start justify-content-between gap-2 mb-1.5">
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "#c5a059" }}>
                      Karya @{p.author}
                    </span>
                    <h2 className="h5 mb-0" style={{ color: "#f2ece1" }}>
                      {p.title}
                    </h2>
                  </div>
                  <div className="d-flex gap-1.5">
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-glass-subtle px-2 py-1"
                    >
                      <GithubLogo size={16} />
                    </a>
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-sogan px-2.5 py-1 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <span>Kunjungi</span>
                      <VisitArrowSvg size={15} />
                    </a>
                  </div>
                </div>

                <p
                  className="mb-2.5"
                  style={{ fontSize: "0.85rem", color: "#b8ad9e" }}
                >
                  {p.desc}
                </p>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex flex-wrap gap-1.5">
                    {p.stack.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-pill"
                        style={{
                          fontSize: "0.7rem",
                          background: "rgba(118, 168, 130, 0.12)",
                          border: "1px solid rgba(118, 168, 130, 0.25)",
                          color: "#9fd0aa",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleApplause(p.id)}
                    className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1.5"
                    style={{
                      fontSize: "0.76rem",
                      color: liked ? "#c5a059" : "#b8ad9e",
                      borderColor: liked
                        ? "rgba(197, 160, 89, 0.45)"
                        : undefined,
                    }}
                  >
                    <ApplauseSvg size={17} active={liked} />
                    <span>{p.applause} Apresiasi</span>
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
