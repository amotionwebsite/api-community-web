"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsClockwise } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const POST_TAGS = [
  "Bug & Error",
  "Workflow",
  "Diskusi Tech",
  "Tips & Trik",
  "Karya API",
];

const TERMUX_LOGO_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="4" fill="#18181b" stroke="#e4e4e7" stroke-width="1.8"/><path d="M6.8 8.5L10.8 12L6.8 15.5" fill="none" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><line x1="12.5" y1="15.5" x2="17.2" y2="15.5" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round"/></svg>'
  );

const TECH_LOGOS = {
  html5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  "nuxt.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg",
  svelte: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  "tailwind css": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  sass: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  "framer motion": "https://cdn.simpleicons.org/framer/ffffff",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "express.js": "https://cdn.simpleicons.org/express/ffffff",
  nestjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  bun: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
  deno: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/denojs/denojs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  django: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
  flask: "https://cdn.simpleicons.org/flask/ffffff",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  rust: "https://cdn.simpleicons.org/rust/ffffff",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "spring boot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  sqlite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  prisma: "https://cdn.simpleicons.org/prisma/ffffff",
  supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  bash: "https://cdn.simpleicons.org/gnubash/ffffff",
  termux: TERMUX_LOGO_URI,
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
  vercel: "https://cdn.simpleicons.org/vercel/ffffff",
  railway: "https://cdn.simpleicons.org/railway/ffffff",
  cloudflare: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
  baileys: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  pm2: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
};

const getTechLogo = (name) =>
  TECH_LOGOS[(name || "").toLowerCase()] ||
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg";

const TOP_CARD_THEMES = {
  sogan: {
    bgColor: "#17120c",
    bgImage:
      "radial-gradient(circle at 88% 12%, rgba(212, 168, 83, 0.22) 0%, transparent 52%), repeating-linear-gradient(135deg, rgba(197, 160, 89, 0.06) 0px, rgba(197, 160, 89, 0.06) 1px, transparent 1px, transparent 10px)",
    border: "rgba(212, 168, 83, 0.45)",
    accent: "#e5be6b",
  },
  emerald: {
    bgColor: "#0f1914",
    bgImage:
      "radial-gradient(circle at 88% 12%, rgba(118, 168, 130, 0.2) 0%, transparent 52%), radial-gradient(rgba(143, 212, 164, 0.12) 1px, transparent 1px)",
    bgSize: "100% 100%, 10px 10px",
    border: "rgba(118, 168, 130, 0.45)",
    accent: "#9fd0aa",
  },
  blue: {
    bgColor: "#0e1520",
    bgImage:
      "radial-gradient(circle at 88% 12%, rgba(106, 165, 232, 0.2) 0%, transparent 52%), linear-gradient(rgba(126, 182, 245, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 182, 245, 0.06) 1px, transparent 1px)",
    bgSize: "100% 100%, 12px 12px, 12px 12px",
    border: "rgba(106, 165, 232, 0.45)",
    accent: "#8cc0fa",
  },
  obsidian: {
    bgColor: "#14101a",
    bgImage:
      "radial-gradient(circle at 88% 12%, rgba(176, 146, 224, 0.18) 0%, transparent 52%)",
    border: "rgba(176, 146, 224, 0.4)",
    accent: "#c8b2eb",
  },
};

const getCategoryBadgeStyle = (cat, isSelected = true) => {
  const lower = (cat || "").toLowerCase();
  if (lower.includes("bug") || lower.includes("error")) {
    return isSelected
      ? {
          backgroundColor: "rgba(217, 83, 79, 0.22)",
          border: "1px solid rgba(217, 83, 79, 0.48)",
          color: "#f28b82",
        }
      : {
          backgroundColor: "rgba(217, 83, 79, 0.08)",
          border: "1px solid rgba(217, 83, 79, 0.22)",
          color: "#e07a74",
        };
  }
  if (lower.includes("workflow")) {
    return isSelected
      ? {
          backgroundColor: "rgba(118, 168, 130, 0.22)",
          border: "1px solid rgba(118, 168, 130, 0.46)",
          color: "#9fd0aa",
        }
      : {
          backgroundColor: "rgba(118, 168, 130, 0.08)",
          border: "1px solid rgba(118, 168, 130, 0.22)",
          color: "#8ab895",
        };
  }
  if (lower.includes("tips")) {
    return isSelected
      ? {
          backgroundColor: "rgba(106, 165, 232, 0.22)",
          border: "1px solid rgba(106, 165, 232, 0.46)",
          color: "#8cc0fa",
        }
      : {
          backgroundColor: "rgba(106, 165, 232, 0.08)",
          border: "1px solid rgba(106, 165, 232, 0.22)",
          color: "#7aa8de",
        };
  }
  if (lower.includes("karya") || lower.includes("rilis")) {
    return isSelected
      ? {
          backgroundColor: "rgba(184, 107, 67, 0.22)",
          border: "1px solid rgba(184, 107, 67, 0.46)",
          color: "#e8a882",
        }
      : {
          backgroundColor: "rgba(184, 107, 67, 0.08)",
          border: "1px solid rgba(184, 107, 67, 0.22)",
          color: "#d19370",
        };
  }
  return isSelected
    ? {
        backgroundColor: "rgba(197, 160, 89, 0.22)",
        border: "1px solid rgba(197, 160, 89, 0.48)",
        color: "#e6cfa3",
      }
    : {
        backgroundColor: "rgba(197, 160, 89, 0.08)",
        border: "1px solid rgba(197, 160, 89, 0.22)",
        color: "#bfa574",
      };
};

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
      d="M14.378 7.5H10c-.83-.047-1.5-.634-1.5-1.5a1.505 1.505 0 0 1 1.166-1.462L10 4.5h8c.347.019.659.107.935.327.37.295.539.712.565 1.173v8l-.038.334A1.505 1.505 0 0 1 18 15.5c-.866 0-1.454-.67-1.5-1.5V9.621l-9.097 9.097c-.619.553-1.509.612-2.121 0-.612-.613-.554-1.502 0-2.122Z"
    />
  </svg>
);

const UpvoteSvg = ({ size = 16, active = false }) => (
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
        d="M15.229 19.026c1.017.237 1.017 1.71 0 1.947L15 21H9c-.46-.027-.865-.305-.974-.771-.15-.646.344-1.193.974-1.229h6ZM16 12v3c-.017.43-.129.83-.386 1.181-.385.526-.973.793-1.614.819h-4c-1.147-.046-1.954-.854-2-2v-3H5.207c-1.349-.061-1.992-1.563-1.061-2.561l6.793-6.794c.3-.271.65-.439 1.061-.439s.761.169 1.06.439l6.793 6.794c.356.389.526.882.4 1.405-.167.696-.762 1.126-1.46 1.156Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M8.741 20.967c-.978-.262-.978-1.67 0-1.932L9 19.001h6c.451.03.844.288.966.741.176.656-.327 1.217-.966 1.259H9ZM8 12.001H5.207c-1.346-.054-1.975-1.571-1.061-2.561l6.793-6.793c.273-.252.61-.419.985-.434a1.56 1.56 0 0 1 1.137.434l6.793 6.793c.349.379.504.858.404 1.369-.139.709-.769 1.164-1.465 1.192H16v3c-.016.419-.13.819-.376 1.162-.38.531-.979.814-1.624.838h-4c-1.135-.042-1.958-.865-2-2Zm2.006 2.994h3.988l.006-.051v-3.943c.029-.451.287-.844.741-.966l.259-.034h2.586L12 4.414l-5.586 5.587H9l.259.034c.453.122.711.515.741.966v3.943Z"
      />
    )}
  </svg>
);

const ReplySvg = ({ size = 16, active = false }) => (
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
        d="m21.321 19.148.386 1.311.04.226c.018.285-.093.567-.294.768-.27.27-.631.339-.994.254l-1.311-.386c-.669.327-1.332.573-2.08.65-3.445.353-6.371-2.554-6.043-6.001a5.52 5.52 0 0 1 1.414-3.18 5.53 5.53 0 0 1 3.016-1.691c3.374-.648 6.551 1.959 6.545 5.401-.002.952-.266 1.802-.679 2.648m-1.613-9.429c-.821-.346-1.633-.608-2.527-.688-3.871-.348-7.414 2.353-8.072 6.19a7.55 7.55 0 0 0 .401 4.004c.25.64.594 1.195.979 1.761-1.636-.159-2.656-.468-4.098-1.255l-2.65.78c-.802.188-1.44-.451-1.252-1.252l.78-2.649c-.681-1.244-1.129-2.471-1.241-3.896-.502-6.395 5.685-11.273 11.79-9.264a9 9 0 0 1 3.497 2.137c1.212 1.194 1.904 2.519 2.393 4.132"
      />
    ) : (
      <path
        fill="currentColor"
        d="m21.319 19.142.39 1.326c.101.451-.046.913-.464 1.151a1 1 0 0 1-.513.131l-.264-.041-1.326-.39a5.55 5.55 0 0 1-2.582.679c-3.528.083-6.123-3.218-5.443-6.624a5.4 5.4 0 0 1 1.335-2.596c3.4-3.645 9.461-1.311 9.547 3.668a5.4 5.4 0 0 1-.68 2.696m-2.043.134c-.111-.735.257-.897.5-1.545.192-.513.261-1.07.202-1.614-.304-2.816-3.721-4.112-5.822-2.215-2.222 2.007-1.019 5.754 1.961 6.076a3.5 3.5 0 0 0 1.614-.202c.648-.243.81-.611 1.545-.5M4.921 18.079l1.34-.394.276-.041c.401-.002.687.263 1.018.451l.477.246q.491.23 1.012.381l.532.132c.569.118 1.12.095 1.36.732l.059.254c.026.263-.055.529-.222.733a1 1 0 0 1-.675.36c-.231.023-.762-.087-.887-.112a8.5 8.5 0 0 1-2.814-1.091l-2.67.785c-.803.179-1.421-.439-1.242-1.242l.786-2.671a8.6 8.6 0 0 1-1.144-3.091c-.668-4.12 1.501-8.123 5.334-9.787 3.862-1.677 8.382-.359 10.843 3.018.277.379.517.784.731 1.201.262.512.582 1.102.196 1.64a1 1 0 0 1-1.166.352c-.484-.182-.59-.639-.801-1.062l-.265-.48a7 7 0 0 0-1-1.292c-2.126-2.169-5.516-2.718-8.215-1.32-2.69 1.394-4.198 4.446-3.679 7.43a7 7 0 0 0 .519 1.68l.261.517c.191.341.474.642.471 1.056l-.041.275Z"
      />
    )}
  </svg>
);

const CopySvg = ({ size = 14, copied = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {copied ? (
      <path
        fill="currentColor"
        d="M15.324 7.026C16.308 7.186 16.961 8.031 17 9v11c-.022.535-.202 1.03-.586 1.414s-.879.564-1.414.586H4c-.535-.022-1.03-.202-1.414-.586S2.022 20.535 2 20V9c.046-1.146.854-1.954 2-2h11ZM18 17v-2h2V4H9v2H7V4c.026-.641.293-1.229.819-1.614C8.17 2.129 8.57 2.017 9 2h11c.535.022 1.03.202 1.414.586S21.978 3.465 22 4v11c-.022.535-.202 1.03-.586 1.414s-.879.564-1.414.586Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M17 20.057c-.063 1.1-.843 1.88-1.943 1.943H3.943c-.445-.026-.846-.153-1.198-.435-.47-.377-.711-.915-.745-1.508V8.943c.026-.445.153-.846.435-1.198.377-.47.915-.711 1.508-.745h11.114c1.1.063 1.88.843 1.943 1.943ZM4.006 9.006v10.988h10.988V9.006ZM18 17v-2l1.994-.006V4.006H9.006L9 6H7V3.943c.034-.593.275-1.131.745-1.508.352-.282.753-.409 1.198-.435h11.114c.445.026.846.153 1.198.435.47.377.711.915.745 1.508v11.114c-.026.445-.153.846-.435 1.198-.377.47-.915.711-1.508.745Z"
      />
    )}
  </svg>
);

const AddImageSvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M19 17h2a1 1 0 0 1 .44.102c.824.402.684 1.663-.211 1.872L21 19h-2v2l-.026.229c-.209.895-1.47 1.035-1.872.211A1 1 0 0 1 17 21v-2h-2a1 1 0 0 1-.44-.102c-.824-.402-.684-1.663.211-1.872L15 17h2v-2l.026-.229c.209-.895 1.47-1.035 1.872-.211A1 1 0 0 1 19 15Zm3-2.352-.532-.116c-.214-1.088-.598-1.715-1.468-2.401V5H4v11.101l5.172-5.172c.432-.378.982-.378 1.414 0l3.655 3.656c-.424.122-.808.255-1.179.502-1.672 1.112-2.069 3.432-.845 5.032.279.365.612.623.987.881H4c-1.146-.046-1.954-.854-2-2V5c.022-.535.202-1.03.586-1.414S3.465 3.022 4 3h16c1.146.046 1.954.854 2 2Zm-6.23-7.624a1.516 1.516 0 0 1 1.206 1.746 1.516 1.516 0 0 1-1.746 1.206 1.516 1.516 0 0 1-1.206-1.746 1.516 1.516 0 0 1 1.746-1.206"
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

const CodeSvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M14.621 2.662c.834.234 1.219 1.038 1.039 1.85l-4.431 15.787c-.269.786-1.016 1.273-1.849 1.039-.834-.234-1.219-1.038-1.039-1.85l4.431-15.787c.269-.786 1.016-1.273 1.849-1.039M4.379 12l3.182 3.182c.17.19.27.321.355.565.359 1.025-.504 2.108-1.583 1.986-.352-.039-.634-.198-.893-.43l-4.243-4.242c-.231-.259-.39-.542-.43-.893-.053-.47.122-.884.43-1.229L5.44 6.697c.519-.464 1.248-.593 1.858-.21.851.535.901 1.617.263 2.331Zm15.243 0L16.44 8.818c-.638-.714-.588-1.796.262-2.331.611-.383 1.34-.254 1.859.21l4.243 4.242c.308.345.483.759.43 1.229-.04.351-.199.634-.43.893l-4.243 4.242c-.259.232-.541.391-.893.43-1.079.122-1.942-.961-1.583-1.986.085-.244.185-.375.355-.565Z"
    />
  </svg>
);

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function HomeView() {
  const { user, feedPosts, addFeedPost } = useAuthStore();
  const [copiedId, setCopiedId] = useState(null);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [postText, setPostText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Diskusi Tech");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [filter, setFilter] = useState("semua");
  const fileInputRef = useRef(null);

  // Deteksi arah scroll untuk animasi halus panel tulis catatan
  const [composerCollapsed, setComposerCollapsed] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollYRef.current;
      if (!composerFocused && !postText.trim() && !postImage && !showCodeInput) {
        if (diff > 14 && currentY > 90) {
          setComposerCollapsed(true);
        } else if (diff < -10 || currentY <= 40) {
          setComposerCollapsed(false);
        }
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [composerFocused, postText, postImage, showCodeInput]);

  // State Lightbox Zoom Gambar
  const [zoomSrc, setZoomSrc] = useState("");
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef(null);
  const pinchDistRef = useRef(null);

  const openZoom = (src) => {
    setZoomSrc(src);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const closeZoom = () => {
    setZoomSrc("");
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchDistRef.current = Math.hypot(dx, dy);
    } else if (e.touches.length === 1 && zoomScale > 1) {
      dragStartRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinchDistRef.current;
      pinchDistRef.current = dist;
      setZoomScale((prev) => Math.min(4, Math.max(1, prev * ratio)));
    } else if (e.touches.length === 1 && dragStartRef.current && zoomScale > 1) {
      setPan({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    pinchDistRef.current = null;
    dragStartRef.current = null;
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPostImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim() && !postImage) return;
    const contentClean =
      postText.trim() || "Melampirkan gambar error / tangkapan layar.";
    addFeedPost({
      id: String(Date.now()),
      title: contentClean.slice(0, 72),
      category: selectedTag,
      author: user?.username || "pegiat_kode",
      time: "Baru saja",
      excerpt: contentClean,
      content: contentClean,
      demoUrl:
        selectedTag === "Karya API"
          ? "https://api-community-web.vercel.app"
          : undefined,
      code: codeSnippet.trim() || null,
      image: postImage || null,
      comments: [],
    });
    setPostText("");
    setCodeSnippet("");
    setPostImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowCodeInput(false);
    setComposerCollapsed(false);
  };

  const toggleUpvote = (id) => {
    setUpvotedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const visibleThreads = feedPosts.filter((t) => {
    if (filter === "code") return Boolean(t.code || t.id === "1");
    return true;
  });

  return (
    <div className="min-vh-100 d-flex flex-column handcrafted-canvas overflow-x-hidden">
      <Navbar />

      <main className="container pt-4 flex-grow-1" style={{ maxWidth: "740px" }}>
        {/* Filter Feed */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: SMOOTH_EASE }}
          className="d-flex align-items-center gap-2 mb-3 overflow-x-auto pb-1"
        >
          {[
            { id: "semua", label: "Semua Feed" },
            { id: "code", label: "Dengan Kode" },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className="btn btn-sm rounded-pill px-3 py-1 flex-shrink-0"
                style={{
                  fontSize: "0.75rem",
                  backgroundColor: active
                    ? "#c5a059"
                    : "rgba(255, 255, 255, 0.04)",
                  color: active ? "#120f0c" : "#b8ad9e",
                  border: active
                    ? "1px solid #c5a059"
                    : "1px solid rgba(197, 160, 89, 0.14)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Stream Utas Komunitas dengan Animasi Scroll Keluar-Masuk Dua Arah */}
        <div className="d-flex flex-column gap-3">
          {visibleThreads.map((item) => {
            const upvoted = upvotedIds.includes(item.id);
            const replyActive = activeReplyId === item.id;
            const isCopied = copiedId === `code-${item.id}`;
            const displayCategory =
              item.category === "Rilis Karya" ? "Karya API" : item.category;
            const isKaryaPost =
              Boolean(item.topCard) || displayCategory === "Karya API";
            const badgeStyle = getCategoryBadgeStyle(displayCategory, true);
            const snippet =
              item.code ||
              (item.id === "1"
                ? `app.use(cors({ origin: "https://api-community-web.vercel.app" }));`
                : null);

            const cardTheme = item.topCard
              ? TOP_CARD_THEMES[item.topCard.themeId] || TOP_CARD_THEMES.sogan
              : null;

            const visitHref =
              item.topCard?.demoUrl ||
              item.demoUrl ||
              "https://api-community-web.vercel.app";

            return (
              <motion.article
                key={item.id}
                layout="position"
                initial={{ opacity: 0, y: 22, scale: 0.975 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.14 }}
                transition={{ duration: 0.48, ease: SMOOTH_EASE }}
                className="smoked-glass smoked-glass-interactive p-3 overflow-hidden"
              >
                <div className="d-flex gap-2.5">
                  {/* Avatar + Garis Alur */}
                  <div className="d-flex flex-column align-items-center flex-shrink-0">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "rgba(184, 107, 67, 0.16)",
                        border: "1px solid rgba(197, 160, 89, 0.28)",
                        color: "#e6cfa3",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.author[0].toUpperCase()}
                    </div>
                    <div className="thread-spine flex-grow-1 my-1.5" />
                  </div>

                  {/* Isi Postingan */}
                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                      <div className="d-flex align-items-center gap-1.5 flex-wrap">
                        <span
                          style={{
                            fontFamily: "var(--font-caviar), sans-serif",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "#e6cfa3",
                          }}
                        >
                          @{item.author}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-pill"
                          style={{
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                            fontSize: "0.68rem",
                            ...badgeStyle,
                          }}
                        >
                          {displayCategory}
                        </span>
                      </div>

                      {isKaryaPost ? (
                        <a
                          href={visitHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-sogan px-2.5 py-0.5 d-inline-flex align-items-center gap-1 flex-shrink-0"
                          style={{
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                            fontSize: "0.72rem",
                          }}
                        >
                          <span>Kunjungi</span>
                          <VisitArrowSvg size={14} />
                        </a>
                      ) : (
                        <span
                          className="flex-shrink-0"
                          style={{ fontSize: "0.7rem", color: "#7d7367" }}
                        >
                          {item.time}
                        </span>
                      )}
                    </div>

                    {item.topCard && cardTheme ? (
                      <Link
                        href="/top"
                        className="text-decoration-none d-block my-2"
                      >
                        <div
                          className="rounded-4 overflow-hidden"
                          style={{
                            backgroundColor: cardTheme.bgColor,
                            backgroundImage: cardTheme.bgImage,
                            backgroundSize: cardTheme.bgSize || "100% 100%",
                            border: `1px solid ${cardTheme.border}`,
                            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.45)",
                          }}
                        >
                          <div
                            className="position-relative w-100 overflow-hidden"
                            style={{ height: "132px", backgroundColor: "#14110e" }}
                          >
                            {item.topCard.bannerUrl ? (
                              <img
                                src={item.topCard.bannerUrl}
                                alt={item.topCard.projectTitle}
                                className="w-100 h-100 object-fit-cover"
                              />
                            ) : (
                              <div
                                className="w-100 h-100 d-flex align-items-center justify-content-center px-3 text-center"
                                style={{
                                  background:
                                    "radial-gradient(circle at 25% 25%, rgba(197, 160, 89, 0.16), transparent 60%), linear-gradient(135deg, #1b1713 0%, #0e0c0a 100%)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--font-tommy-extra), sans-serif",
                                    fontSize: "0.95rem",
                                    color: "rgba(242, 236, 225, 0.2)",
                                  }}
                                >
                                  {item.topCard.projectTitle}
                                </span>
                              </div>
                            )}

                            <div
                              className="position-absolute bottom-0 start-0 w-100"
                              style={{
                                height: "42px",
                                backdropFilter: "blur(5px)",
                                WebkitBackdropFilter: "blur(5px)",
                                maskImage:
                                  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0) 100%)",
                                WebkitMaskImage:
                                  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0) 100%)",
                                pointerEvents: "none",
                              }}
                            />

                            <div
                              className="position-absolute bottom-0 start-0 w-100"
                              style={{
                                height: "48px",
                                background:
                                  "linear-gradient(to top, rgba(19, 15, 12, 0.96) 0%, rgba(19, 15, 12, 0.55) 45%, rgba(19, 15, 12, 0) 100%)",
                                pointerEvents: "none",
                              }}
                            />
                          </div>

                          <div className="p-3 pt-1.5">
                            <div className="d-flex align-items-center justify-content-between gap-2 mb-1.5">
                              <span
                                className="px-2.5 py-0.5 rounded-pill"
                                style={{
                                  fontFamily: "var(--font-tommy-medium), sans-serif",
                                  fontSize: "0.68rem",
                                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                                  color: cardTheme.accent,
                                }}
                              >
                                {item.topCard.rank}
                              </span>
                              <span
                                style={{
                                  fontFamily: "var(--font-caviar), sans-serif",
                                  fontSize: "0.74rem",
                                  color: cardTheme.accent,
                                  fontWeight: 600,
                                }}
                              >
                                Karya @{item.topCard.author}
                              </span>
                            </div>

                            <h2
                              className="h5 mb-1 text-break"
                              style={{
                                fontFamily: "var(--font-tommy-extra), sans-serif",
                                color: "#f2ece1",
                                lineHeight: 1.35,
                              }}
                            >
                              {item.topCard.projectTitle}
                            </h2>

                            <p
                              className="mb-2 text-break"
                              style={{
                                fontFamily: "var(--font-tommy-regular), sans-serif",
                                fontSize: "0.82rem",
                                color: "#cfc5b6",
                              }}
                            >
                              {item.topCard.note}
                            </p>

                            <div className="d-flex flex-wrap gap-1.5">
                              {(item.topCard.stack || []).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 rounded-pill d-inline-flex align-items-center gap-1.5"
                                  style={{
                                    fontSize: "0.68rem",
                                    background: "rgba(118, 168, 130, 0.12)",
                                    border: "1px solid rgba(118, 168, 130, 0.25)",
                                    color: "#9fd0aa",
                                  }}
                                >
                                  <img
                                    src={getTechLogo(tag)}
                                    alt=""
                                    width={12}
                                    height={12}
                                    className="object-fit-contain flex-shrink-0"
                                  />
                                  <span>{tag}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Link
                          href={`/forum/${item.id}`}
                          className="text-decoration-none"
                        >
                          <h2
                            className="h6 mb-1 text-break"
                            style={{
                              fontFamily: "var(--font-tommy-extra), sans-serif",
                              color: "#f2ece1",
                              lineHeight: 1.4,
                            }}
                          >
                            {item.title}
                          </h2>
                        </Link>

                        <p
                          className="mb-2 text-break"
                          style={{
                            fontFamily: "var(--font-tommy-regular), sans-serif",
                            fontSize: "0.83rem",
                            color: "#b8ad9e",
                          }}
                        >
                          {item.excerpt}
                        </p>
                      </>
                    )}

                    {item.image && (
                      <div
                        onClick={() => openZoom(item.image)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") openZoom(item.image);
                        }}
                        title="Ketuk untuk memperbesar gambar"
                        className="position-relative mb-2.5 rounded-3 overflow-hidden"
                        style={{
                          border: "1px solid rgba(197, 160, 89, 0.22)",
                          backgroundColor: "#110e0c",
                          cursor: "zoom-in",
                        }}
                      >
                        <img
                          src={item.image}
                          alt="Lampiran postingan"
                          className="w-100 object-fit-cover"
                          style={{ maxHeight: "240px" }}
                        />
                        <span
                          className="position-absolute bottom-0 end-0 m-2 px-2 py-0.5 rounded-pill d-inline-flex align-items-center gap-1"
                          style={{
                            fontSize: "0.65rem",
                            backgroundColor: "rgba(14, 12, 10, 0.78)",
                            backdropFilter: "blur(8px)",
                            color: "#e6cfa3",
                            border: "1px solid rgba(197, 160, 89, 0.25)",
                          }}
                        >
                          <MagnifyingGlassPlus size={12} />
                          <span>Zoom</span>
                        </span>
                      </div>
                    )}

                    {snippet && (
                      <div className="position-relative mb-2 w-100 overflow-hidden">
                        <pre className="code-well p-2.5 pe-5 mb-0">
                          {snippet}
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopy(snippet, `code-${item.id}`)}
                          title={isCopied ? "Tersalin" : "Salin kode"}
                          className="btn btn-sm btn-glass-subtle position-absolute top-0 end-0 m-1.5 p-1.5 d-inline-flex align-items-center justify-content-center"
                          style={{
                            color: isCopied ? "#c5a059" : "#d8cfc2",
                            borderColor: isCopied
                              ? "rgba(197, 160, 89, 0.45)"
                              : undefined,
                          }}
                        >
                          <CopySvg size={14} copied={isCopied} />
                        </button>
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between pt-1">
                      <div className="d-flex align-items-center gap-3">
                        {!isKaryaPost && (
                          <button
                            type="button"
                            onClick={() => toggleUpvote(item.id)}
                            className="btn btn-sm p-0 border-0 d-inline-flex align-items-center gap-1"
                            style={{
                              fontSize: "0.76rem",
                              color: upvoted ? "#c5a059" : "#8f8578",
                            }}
                          >
                            <UpvoteSvg size={16} active={upvoted} />
                            <span>{upvoted ? "Terbantu" : "Bantu Naik"}</span>
                          </button>
                        )}

                        <Link
                          href={item.topCard ? "/top" : `/forum/${item.id}`}
                          onClick={() => setActiveReplyId(item.id)}
                          className="text-decoration-none d-inline-flex align-items-center gap-1"
                          style={{
                            fontSize: "0.76rem",
                            color: replyActive ? "#c5a059" : "#8f8578",
                          }}
                        >
                          <ReplySvg size={16} active={replyActive} />
                          <span>{item.comments?.length || 0} Balasan</span>
                        </Link>
                      </div>

                      {isKaryaPost && (
                        <span
                          className="flex-shrink-0"
                          style={{ fontSize: "0.7rem", color: "#7d7367" }}
                        >
                          {item.time}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Spacer aman agar postingan paling bawah tidak tertutup composer & dock nav */}
        <div style={{ height: "235px" }} />
      </main>

      {/* Lightbox Zoom Gambar Bebas */}
      <AnimatePresence>
        {zoomSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeZoom}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(8, 7, 6, 0.92)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              zIndex: 100,
              touchAction: "none",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="position-fixed top-0 start-0 w-100 px-3 py-3 d-flex align-items-center justify-content-between"
              style={{ zIndex: 102 }}
            >
              <div
                className="d-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill"
                style={{
                  backgroundColor: "rgba(22, 19, 15, 0.85)",
                  border: "1px solid rgba(197, 160, 89, 0.28)",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.max(1, Number((zoomScale - 0.5).toFixed(1)));
                    setZoomScale(next);
                    if (next === 1) setPan({ x: 0, y: 0 });
                  }}
                  className="btn btn-sm p-1 border-0 text-light"
                  title="Perkecil"
                >
                  <MagnifyingGlassMinus size={17} />
                </button>
                <span
                  style={{
                    fontSize: "0.74rem",
                    color: "#e6cfa3",
                    minWidth: "42px",
                    textAlign: "center",
                  }}
                >
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoomScale((prev) => Math.min(4, Number((prev + 0.5).toFixed(1))))
                  }
                  className="btn btn-sm p-1 border-0 text-light"
                  title="Perbesar"
                >
                  <MagnifyingGlassPlus size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoomScale(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className="btn btn-sm p-1 border-0 text-secondary"
                  title="Reset"
                >
                  <ArrowsClockwise size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={closeZoom}
                className="btn btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "rgba(22, 19, 15, 0.85)",
                  border: "1px solid rgba(197, 160, 89, 0.3)",
                  color: "#f2ece1",
                }}
                title="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => {
                if (zoomScale > 1) {
                  setZoomScale(1);
                  setPan({ x: 0, y: 0 });
                } else {
                  setZoomScale(2.2);
                }
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="d-flex align-items-center justify-content-center w-100 h-100 p-3"
            >
              <img
                src={zoomSrc}
                alt="Zoom gambar"
                draggable={false}
                style={{
                  maxWidth: "94vw",
                  maxHeight: "82vh",
                  objectFit: "contain",
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
                  transition: dragStartRef.current ? "none" : "transform 0.16s ease-out",
                  cursor: zoomScale > 1 ? "grab" : "zoom-in",
                  userSelect: "none",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Composer Postingan Baru di Bawah dengan Animasi Scroll Keluar-Masuk Halus */}
      <div
        className="position-fixed start-0 w-100 px-3"
        style={{ bottom: "76px", zIndex: 42, pointerEvents: "none" }}
      >
        <div className="container px-0" style={{ maxWidth: "740px" }}>
          <motion.form
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{
              opacity: composerCollapsed ? 0 : 1,
              y: composerCollapsed ? 38 : 0,
              scale: composerCollapsed ? 0.96 : 1,
            }}
            transition={{ duration: 0.42, ease: SMOOTH_EASE }}
            onSubmit={handleCreatePost}
            onFocus={() => {
              setComposerFocused(true);
              setComposerCollapsed(false);
            }}
            onBlur={() => setComposerFocused(false)}
            className="p-2.5 rounded-4"
            style={{
              pointerEvents: composerCollapsed ? "none" : "auto",
              backgroundColor: "rgba(18, 15, 12, 0.88)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(197, 160, 89, 0.24)",
              boxShadow: "0 10px 28px rgba(0, 0, 0, 0.65)",
            }}
          >
            {postImage && (
              <div
                className="position-relative mb-2 rounded-3 overflow-hidden d-inline-block"
                style={{ border: "1px solid rgba(197, 160, 89, 0.3)" }}
              >
                <img
                  src={postImage}
                  alt="Pratinjau gambar"
                  onClick={() => openZoom(postImage)}
                  className="object-fit-cover"
                  style={{ maxHeight: "96px", maxWidth: "180px", cursor: "zoom-in" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPostImage("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="btn btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-0.5 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "rgba(12, 10, 9, 0.85)",
                    color: "#f2ece1",
                    border: "1px solid rgba(197, 160, 89, 0.35)",
                  }}
                  title="Hapus gambar"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="d-flex gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "34px",
                  height: "34px",
                  background: "rgba(197, 160, 89, 0.14)",
                  border: "1px solid rgba(197, 160, 89, 0.3)",
                  color: "#c5a059",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                }}
              >
                {(user?.username?.[0] || "A").toUpperCase()}
              </div>

              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <textarea
                  rows={1}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Tulis catatan ngoding atau error..."
                  className="form-control border-0 bg-transparent p-0 shadow-none"
                  style={{
                    color: "#f2ece1",
                    fontSize: "0.84rem",
                    resize: "none",
                  }}
                />

                <AnimatePresence>
                  {showCodeInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden"
                    >
                      <textarea
                        rows={2}
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        placeholder="// Tempel potongan kode atau log error di sini..."
                        className="form-control code-well p-2"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="d-flex align-items-center gap-1 overflow-x-auto pt-2 pb-1">
                  {POST_TAGS.map((tag) => {
                    const active = selectedTag === tag;
                    const tagStyle = getCategoryBadgeStyle(tag, active);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(tag)}
                        className="btn btn-sm rounded-pill px-2 py-0 flex-shrink-0"
                        style={{
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.67rem",
                          lineHeight: 1.55,
                          ...tagStyle,
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <div
                  className="d-flex align-items-center justify-content-between pt-1.5 mt-1 border-top"
                  style={{ borderColor: "rgba(197, 160, 89, 0.12)" }}
                >
                  <div className="d-flex align-items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      <CodeSvg size={15} />
                      <span>Sisipkan Kode</span>
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      <AddImageSvg size={15} />
                      <span>Gambar</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sm btn-sogan px-3 py-1 d-inline-flex align-items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.74rem",
                    }}
                  >
                    <span>Send</span>
                    <SendSvg size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
