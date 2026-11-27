"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];
const NAV_SPRING = { type: "spring", stiffness: 430, damping: 28, mass: 0.85 };

const TAG_OPTIONS = [
  "Bug & Error",
  "Workflow",
  "Diskusi Tech",
  "Tips & Trik",
  "Karya API",
];

const getTagStyle = (tag) => {
  switch (tag) {
    case "Bug & Error":
      return {
        backgroundColor: "rgba(185, 62, 62, 0.24)",
        borderColor: "rgba(235, 95, 95, 0.45)",
        color: "#ff9b9b",
      };
    case "Workflow":
      return {
        backgroundColor: "rgba(56, 138, 92, 0.24)",
        borderColor: "rgba(95, 205, 142, 0.45)",
        color: "#9ef0be",
      };
    case "Diskusi Tech":
      return {
        backgroundColor: "rgba(197, 160, 89, 0.22)",
        borderColor: "rgba(197, 160, 89, 0.45)",
        color: "#ebd094",
      };
    case "Tips & Trik":
      return {
        backgroundColor: "rgba(62, 124, 185, 0.24)",
        borderColor: "rgba(105, 175, 245, 0.45)",
        color: "#9ed0ff",
      };
    default:
      return {
        backgroundColor: "rgba(138, 86, 196, 0.24)",
        borderColor: "rgba(176, 128, 238, 0.45)",
        color: "#cfaeff",
      };
  }
};

const AddTalkSvg = ({ size = 18, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#f0d08a"
        d="M12.746 2.027a10 10 0 0 1 4.699 1.584c5.563 3.618 6.124 11.579 1.116 15.936a10 10 0 0 1-2.998 1.8 10.1 10.1 0 0 1-4.309.626 10 10 0 0 1-4.699-1.584C.992 16.771.431 8.81 5.439 4.453a10 10 0 0 1 2.998-1.8 10.1 10.1 0 0 1 4.309-.626M11 11H8a1 1 0 0 0-.44.102c-.967.473-.599 1.838.44 1.898h3v3c.06 1.039 1.425 1.407 1.898.44A1 1 0 0 0 13 16v-3h3a1 1 0 0 0 .44-.102c.967-.473.599-1.838-.44-1.898h-3V8a1 1 0 0 0-.102-.44C12.425 6.593 11.06 6.961 11 8Z"
      />
    ) : (
      <path
        fill="#16120e"
        d="M13 13v3c-.05.755-.802 1.269-1.5.866a1 1 0 0 1-.366-.366c-.101-.175-.121-.302-.134-.5v-3H8c-.755-.05-1.269-.802-.866-1.5.088-.152.214-.278.366-.366.175-.101.302-.121.5-.134h3V8c.05-.755.802-1.269 1.5-.866.152.088.278.214.366.366.101.175.121.302.134.5v3h3c.755.05 1.269.802.866 1.5a1 1 0 0 1-.366.366c-.175.101-.302.121-.5.134Zm5.809 6.325a10 10 0 0 1-3.791 2.212 10.1 10.1 0 0 1-4.563.345 10 10 0 0 1-3.503-1.247C1.179 17.254.289 9.233 5.192 4.675a10 10 0 0 1 3.79-2.212 10.1 10.1 0 0 1 4.563-.345 10 10 0 0 1 3.503 1.247c5.773 3.381 6.663 11.402 1.761 15.96m-7.435-15.3a8 8 0 0 0-4.377 1.733C2.03 9.744 3.51 17.709 9.585 19.629a8 8 0 0 0 7.418-1.387c4.967-3.985 3.487-11.951-2.588-13.871a8.1 8.1 0 0 0-3.041-.346"
      />
    )}
  </svg>
);

const CopyLinkSvg = ({ size = 17, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#f0d08a"
        d="M15.324 7.026C16.308 7.186 16.961 8.031 17 9v11c-.022.535-.202 1.03-.586 1.414s-.879.564-1.414.586H4c-.535-.022-1.03-.202-1.414-.586S2.022 20.535 2 20V9c.046-1.146.854-1.954 2-2h11ZM20 15c0-.656-.167-1.543.56-1.898a1 1 0 0 1 1.065.118c.246.197.357.473.375.78v1c-.046 1.146-.854 1.954-2 2h-1l-.229-.026c-.797-.186-1.033-1.244-.396-1.754A1.04 1.04 0 0 1 19 15Zm1.229-6.974c.466.109.745.514.771.974v1c-.036.63-.584 1.124-1.229.974-.466-.109-.745-.514-.771-.974V9c.036-.63.584-1.124 1.229-.974M20 4c-.656 0-1.543.167-1.898-.56a1 1 0 0 1 .273-1.22A1.04 1.04 0 0 1 19 2h1c1.146.046 1.954.854 2 2v1l-.026.229c-.186.797-1.244 1.033-1.754.396A1.04 1.04 0 0 1 20 5ZM9 4v1a1.04 1.04 0 0 1-.22.625c-.51.637-1.568.401-1.754-.396L7 5V4c.046-1.146.854-1.954 2-2h1c.233.013.441.071.625.22a1 1 0 0 1 .155 1.405c-.197.246-.473.357-.78.375Zm6.229-1.974c.797.186 1.033 1.244.396 1.754A1.04 1.04 0 0 1 15 4h-1c-.307-.018-.583-.129-.78-.375a1 1 0 0 1-.194-.854c.109-.466.514-.745.974-.771h1Z"
      />
    ) : (
      <path
        fill="#e6cfa1"
        d="M3.886 21.993C2.798 21.894 2.04 21.092 2 20V9c.018-.494.18-.961.513-1.333C2.897 7.239 3.431 7.021 4 7h11c.494.018.961.18 1.333.513.428.384.646.918.667 1.487v11c-.042 1.135-.865 1.958-2 2H4Zm.12-12.987v10.988h10.988V9.006Zm15.988 5.988c.015-.396-.096-1.085.14-1.494.436-.755 1.606-.601 1.832.241L22 14v1c-.042 1.135-.865 1.958-2 2h-1c-.271-.018-.511-.096-.707-.293-.535-.534-.282-1.477.448-1.673.376-.101.903-.027 1.253-.04m.04-6.253c.196-.73 1.139-.983 1.673-.448.197.196.275.436.293.707v1c-.018.271-.096.511-.293.707-.25.25-.624.351-.966.259-.453-.122-.711-.515-.741-.966V9Zm-.04-4.735c-.35-.013-.877.061-1.253-.04-.73-.196-.983-1.139-.448-1.673.196-.197.436-.275.707-.293h1c1.135.042 1.958.865 2 2v1l-.034.259c-.226.842-1.396.996-1.832.241-.236-.409-.125-1.098-.14-1.494m-10.988 0c-.013.35.061.877-.04 1.253-.196.73-1.139.983-1.673.448C7.096 5.511 7.018 5.271 7 5V4c.042-1.135.865-1.958 2-2h1l.259.034c.842.226.996 1.396.241 1.832-.409.236-1.098.125-1.494.14m4.735-.04c-.73-.196-.983-1.139-.448-1.673.196-.197.436-.275.707-.293h1c.271.018.511.096.707.293.25.25.351.624.259.966-.122.453-.515.711-.966.741h-1Z"
      />
    )}
  </svg>
);

const PasteSvg = ({ size = 17, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#f0d08a"
        d="M19.324 10.026c.984.16 1.637 1.005 1.676 1.974v8c-.017.43-.129.83-.386 1.181-.385.526-.973.793-1.614.819h-7c-.43-.017-.83-.129-1.181-.386-.526-.385-.793-.973-.819-1.614v-8c.046-1.146.854-1.954 2-2h7ZM14.732 3c.531 0 1.069-.059 1.592.026.984.16 1.637 1.005 1.676 1.974v3h-6c-2.266.065-3.935 1.734-4 4v7H5c-1.146-.046-1.954-.854-2-2V5c.039-.969.692-1.814 1.676-1.974C5.199 2.941 5.737 3 6.268 3c.433-.636.949-.97 1.732-1h5c.783.03 1.299.364 1.732 1M8.5 4a.514.514 0 0 0-.5.5v1c.017.216.127.403.342.475L8.5 6h4c.216-.017.403-.127.475-.342L13 5.5v-1a.514.514 0 0 0-.5-.5Z"
      />
    ) : (
      <path
        fill="#e6cfa1"
        d="M18 9c.368 0 .923-.04 1.344.033.967.168 1.621 1.007 1.656 1.967v9c-.021.569-.239 1.103-.667 1.487-.372.333-.839.495-1.333.513h-8c-.96-.035-1.799-.689-1.967-1.656C8.96 19.923 9 19.368 9 19H5c-1.135-.042-1.958-.865-2-2V5c.035-.96.689-1.799 1.656-1.967C5.151 2.947 5.902 3 6.273 3c.392-.617.992-.973 1.727-1h5c.735.027 1.335.383 1.727 1 .508 0 1.279-.08 1.839.085C17.425 3.338 17.968 4.122 18 5Zm-6.994 2.006v8.988h7.988v-8.988ZM6 5l-.994.006v11.988L9 17v-6c.042-1.135.865-1.958 2-2h5l-.006-3.994L15 5c-.084 1.14-.827 1.957-2 2H8c-1.173-.043-1.916-.86-2-2m2.006-.994v.988h4.988v-.988Z"
      />
    )}
  </svg>
);

const SearchIconSvg = ({ size = 16, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#f0d08a"
        d="m17.174 15.76 3.654 3.654c.359.41.405 1.009 0 1.414s-1.004.359-1.414 0l-3.654-3.654c-1.408 1.022-2.767 1.643-4.523 1.794C5.216 19.486.57 13.705 2.394 7.934a8.52 8.52 0 0 1 5.54-5.54C13.705.57 19.486 5.216 18.968 11.237c-.151 1.756-.772 3.115-1.794 4.523m-6.903-9.734c-.704.164-1.002 1.037-.551 1.599.328.41.688.334 1.149.402a2.51 2.51 0 0 1 2.104 2.104l.053.598a.998.998 0 0 0 1.599.551c.402-.322.4-.799.349-1.27a4.6 4.6 0 0 0-.203-.932 4.54 4.54 0 0 0-3.781-3.052c-.189-.02-.505-.049-.719 0"
      />
    ) : (
      <path
        fill="#16120e"
        d="M13.865 7.51q.357.4.609.873c.334.627.527 1.343.524 2.055-.001.452-.235.861-.68 1.01-.25.084-.527.065-.763-.053-.543-.27-.512-.695-.576-1.21a2.51 2.51 0 0 0-1.863-2.107c-.587-.148-1.182.029-1.511-.633a1.005 1.005 0 0 1 .233-1.195c.64-.565 2.138-.065 2.779.276.47.251.894.586 1.248.984m3.311 8.252 3.652 3.652c.359.41.405 1.01 0 1.414-.404.405-1.004.359-1.414 0l-3.652-3.652c-1.145.85-2.399 1.459-3.814 1.702C5.871 19.921.72 14.327 2.272 8.355a8.5 8.5 0 0 1 1.979-3.618A8.55 8.55 0 0 1 7.68 2.478c6.112-2.146 12.292 3.095 11.198 9.47-.243 1.415-.852 2.669-1.702 3.814M9.938 4.025a6.5 6.5 0 0 0-3.844 1.697 6.5 6.5 0 0 0-1.727 2.622c-1.558 4.436 2.021 9.03 6.695 8.631a6.5 6.5 0 0 0 3.844-1.697 6.5 6.5 0 0 0 1.727-2.622c1.558-4.436-2.021-9.03-6.695-8.631"
      />
    )}
  </svg>
);

const JoinRoomSvg = ({ size = 17, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#f0d08a"
        d="M18 11.716V19h1c.233.013.441.071.625.22.76.609.298 1.727-.625 1.78H3l-.229-.026c-.797-.186-1.033-1.244-.396-1.754A1.04 1.04 0 0 1 3 19h1V5c.046-1.146.854-1.954 2-2h8.137l-1.878 1.877c-.497.535-.82 1.174-.872 1.911-.062.884.275 1.689.87 2.33l2.12 2.123c1.096 1.018 2.308 1.112 3.623.475m-4.77 1.308a1.516 1.516 0 0 0-1.206 1.746 1.516 1.516 0 0 0 1.746 1.206 1.516 1.516 0 0 0 1.206-1.746 1.516 1.516 0 0 0-1.746-1.206m3.564-7.026H20a1 1 0 0 1 .44.102c.967.473.599 1.838-.44 1.898h-3.208c.254.255.579.502.675.871.19.726-.496 1.411-1.222 1.22-.197-.052-.301-.128-.453-.261l-2.12-2.123c-.179-.205-.292-.429-.292-.707s.114-.502.293-.707l2.12-2.119c.152-.133.256-.209.453-.26.727-.191 1.412.495 1.221 1.221-.096.367-.419.611-.673.865"
      />
    ) : (
      <path
        fill="#16120e"
        d="M6 5v14h10v-6.5c.031-.544.431-1 1-1s.969.456 1 1V19h1c.233.013.441.071.625.22.76.609.298 1.727-.625 1.78H3l-.229-.026c-.797-.186-1.033-1.244-.396-1.754A1.04 1.04 0 0 1 3 19h1V5l.026-.324C4.186 3.692 5.031 3.039 6 3h5.5c.46.026.865.305.974.771.15.645-.344 1.193-.974 1.229Zm7.77 6.024a1.516 1.516 0 0 1 1.206 1.746 1.516 1.516 0 0 1-1.746 1.206 1.516 1.516 0 0 1-1.206-1.746 1.516 1.516 0 0 1 1.746-1.206m3.024-5.025H20c.173.01.282.024.44.101.967.473.599 1.839-.44 1.899h-3.208c.254.254.579.501.675.869.191.727-.495 1.412-1.222 1.221-.197-.052-.301-.128-.453-.261l-2.12-2.123c-.179-.205-.292-.428-.292-.707s.113-.502.293-.706l2.12-2.12c.152-.133.256-.209.453-.261.726-.19 1.412.495 1.221 1.221-.096.368-.419.613-.673.867"
      />
    )}
  </svg>
);

const BackArrowSvg = ({ size = 17, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill={active ? "#f0d08a" : "#e6cfa1"}
      d="m6.414 7 1.793 1.793c.499.569.33 1.464-.448 1.673a1 1 0 0 1-.518 0c-.194-.052-.299-.128-.448-.259l-3.5-3.5c-.422-.481-.381-1.233.207-1.573.175-.101.302-.121.5-.134h10c4.148.084 7.31 3.453 6.971 7.625a6.86 6.86 0 0 1-1.062 3.128C18.584 17.806 16.43 18.951 14 19H5c-.639-.042-1.142-.603-.966-1.259.122-.453.515-.711.966-.741h8.976c2.248-.053 4.183-1.4 4.823-3.596.178-.61.237-1.254.177-1.887-.252-2.638-2.401-4.455-5-4.517Z"
    />
  </svg>
);

const SendPlaneSvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16120e"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
  </svg>
);

const UserAvatar = ({ username = "member_api", avatarUrl = "", isSelf = false }) => {
  const initial = String(username || "U").charAt(0).toUpperCase();
  return (
    <span
      className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 overflow-hidden"
      style={{
        width: "22px",
        height: "22px",
        backgroundColor: isSelf
          ? "rgba(197, 160, 89, 0.28)"
          : "rgba(95, 135, 185, 0.24)",
        border: isSelf
          ? "1px solid rgba(235, 198, 118, 0.6)"
          : "1px solid rgba(150, 185, 225, 0.35)",
        color: isSelf ? "#f0d08a" : "#cfe2f7",
        fontFamily: "var(--font-tommy-extra), sans-serif",
        fontSize: "0.66rem",
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username}
          className="w-100 h-100 object-fit-cover"
        />
      ) : (
        initial
      )}
    </span>
  );
};

const SwipeableOtherBubble = ({
  msg,
  onReply,
  disabled,
  children,
}) => {
  const controls = useAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={controls}
      drag={!disabled ? "x" : false}
      dragConstraints={{ left: 0, right: 72 }}
      dragElastic={0.25}
      onDragEnd={async (_, info) => {
        if (info.offset.x > 34) {
          onReply({ sender: msg.sender, text: msg.text });
        }
        await controls.start({
          x: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.45, ease: SMOOTH_EASE },
        });
      }}
      className="px-3 py-2 rounded-3"
      style={{
        width: "fit-content",
        maxWidth: "82%",
        cursor: !disabled ? "grab" : "default",
        backgroundColor: "rgba(34, 31, 28, 0.86)",
        border: "1px solid rgba(145, 165, 195, 0.24)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default function TalkPage() {
  const { user } = useAuthStore();
  const currentUsername = user?.username || "member_api";
  const currentAvatar = user?.avatar || user?.avatarUrl || "";

  const [groupName, setGroupName] = useState("");
  const [topic, setTopic] = useState("");
  const [selectedTag, setSelectedTag] = useState("Bug & Error");
  const [nameError, setNameError] = useState(false);
  const [shakeTick, setShakeTick] = useState(0);
  const [addClicked, setAddClicked] = useState(false);
  const [backClicked, setBackClicked] = useState(false);
  const errorTimerRef = useRef(null);

  const [groups, setGroups] = useState([
    {
      id: "grp-1",
      name: "Bedah CORS & Next.js",
      topic: "Grup komunikasi cepat bahas error deploy & API.",
      tag: "Bug & Error",
      code: "cors-nextjs-101",
      membersJoined: 4,
      messages: [
        {
          id: "m-1",
          sender: "rizky_dev",
          text: "Halo, siapa saja yang masuk lewat link talk ini? Bahas CORS Railway + Vercel yuk.",
          time: "12:04",
        },
        {
          id: "m-2",
          sender: "anak_termux",
          text: "Hadir brok, udah masuk dari link komunikasi.",
          time: "12:05",
        },
      ],
    },
  ]);

  const [linkInput, setLinkInput] = useState("");
  const [pasteActive, setPasteActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [foundGroup, setFoundGroup] = useState(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [joiningRoomId, setJoiningRoomId] = useState(null);

  const [activeRoomId, setActiveRoomId] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [chatInput, setChatInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const joinRoomById = (targetId) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== targetId) return g;
        const alreadyJoined = g.messages.some(
          (msg) => msg.systemJoin && msg.sender === currentUsername
        );
        if (alreadyJoined) return g;
        return {
          ...g,
          membersJoined: (g.membersJoined || 1) + 1,
          messages: [
            ...g.messages,
            {
              id: `join-${Date.now()}`,
              sender: currentUsername,
              systemJoin: true,
              text: `${currentUsername} bergabung melalui link komunikasi`,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      })
    );
    setActiveRoomId(targetId);
    setReplyTo(null);
    setViewMode("room");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    if (!roomParam) return;
    const matched = groups.find((g) => g.code === roomParam);
    if (matched) {
      joinRoomById(matched.id);
    }
  }, [currentUsername]);

  const activeGroup = groups.find((g) => g.id === activeRoomId) || null;

  const getGroupLink = (code) => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return `${window.location.origin}/talk?room=${code}`;
    }
    return `/talk?room=${code}`;
  };

  const triggerNameError = () => {
    setNameError(true);
    setShakeTick((n) => n + 1);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => {
      setNameError(false);
    }, 5000);
  };

  const handleCreateTalk = (e) => {
    e.preventDefault();
    if (!user) return;
    setAddClicked(true);
    setTimeout(() => setAddClicked(false), 320);

    const cleanName = groupName.trim();
    if (!cleanName) {
      triggerNameError();
      return;
    }

    setNameError(false);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const groupId = `grp-${Date.now()}`;
    const newGroup = {
      id: groupId,
      name: cleanName,
      topic: topic.trim(),
      tag: selectedTag,
      code: `${slug || "talk"}-${Math.floor(100 + Math.random() * 900)}`,
      membersJoined: 1,
      messages: [
        {
          id: `sys-${Date.now()}`,
          sender: currentUsername,
          systemJoin: true,
          text: `${currentUsername} membuka ruang Talk "${cleanName}"`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setGroups((prev) => [newGroup, ...prev]);
    setGroupName("");
    setTopic("");
    setActiveRoomId(groupId);
    setReplyTo(null);
    setViewMode("room");
  };

  const handlePasteClick = async () => {
    setPasteActive(true);
    let pasted = "";
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.readText) {
        pasted = (await navigator.clipboard.readText()) || "";
      }
    } catch {
      pasted = "";
    }
    if (pasted.trim()) {
      setLinkInput(pasted.trim());
      setSearchNotFound(false);
    }
    setTimeout(() => {
      setPasteActive(false);
    }, 350);
  };

  const handleSearchRoom = (e) => {
    e.preventDefault();
    setSearchActive(true);
    setTimeout(() => setSearchActive(false), 350);

    const raw = linkInput.trim();
    if (!raw) {
      setFoundGroup(null);
      setSearchNotFound(false);
      return;
    }

    let extractedRoom = raw;
    try {
      const parsed = new URL(raw);
      const qRoom = parsed.searchParams.get("room");
      if (qRoom) extractedRoom = qRoom;
    } catch {
      const match = raw.match(/[?&]room=([^&\s]+)/);
      if (match?.[1]) extractedRoom = decodeURIComponent(match[1]);
    }

    const needle = extractedRoom.toLowerCase();
    const matched = groups.find(
      (g) =>
        g.code.toLowerCase() === needle ||
        getGroupLink(g.code).toLowerCase() === raw.toLowerCase() ||
        g.name.toLowerCase().includes(needle)
    );

    if (matched) {
      setFoundGroup(matched);
      setSearchNotFound(false);
    } else {
      setFoundGroup(null);
      setSearchNotFound(true);
    }
  };

  const handleJoinFoundRoom = (grp) => {
    setJoiningRoomId(grp.id);
    setTimeout(() => {
      setJoiningRoomId(null);
      joinRoomById(grp.id);
    }, 280);
  };

  const handleBackToList = () => {
    setBackClicked(true);
    setTimeout(() => {
      setBackClicked(false);
      setReplyTo(null);
      setViewMode("list");
    }, 180);
  };

  const handleCopyLink = async (grp) => {
    const link = getGroupLink(grp.code);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(link);
      } else {
        throw new Error("no clipboard");
      }
    } catch {
      if (typeof document !== "undefined") {
        const ta = document.createElement("textarea");
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    }
    setCopiedId(grp.id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!user) return;
    const cleanMsg = chatInput.trim();
    if (!cleanMsg || !activeGroup) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUsername,
      avatar: currentAvatar,
      replyTo: replyTo
        ? { sender: replyTo.sender, text: replyTo.text }
        : null,
      text: cleanMsg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id
          ? { ...g, messages: [...g.messages, newMsg] }
          : g
      )
    );
    setChatInput("");
    setReplyTo(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />

      <main
        className="container py-4 flex-grow-1 mb-4"
        style={{ maxWidth: "740px" }}
      >
        {!user && (
          <div
            className="smoked-glass p-3 mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap"
            style={{ borderColor: "rgba(197, 160, 89, 0.32)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-tommy-regular), sans-serif",
                fontSize: "0.8rem",
                color: "#e6cfa3",
              }}
            >
              Masuk jika ingin talk
            </span>
            <Link
              href="/login"
              className="px-3 py-1 rounded-pill text-decoration-none"
              style={{
                background:
                  "linear-gradient(180deg, #cfa960 0%, #b38d46 100%)",
                color: "#120f0c",
                fontFamily: "var(--font-tommy-medium), sans-serif",
                fontSize: "0.74rem",
              }}
            >
              Masuk
            </Link>
          </div>
        )}

        {/* Navigasi Mode ala Telegram */}
        <div
          className="d-flex align-items-center justify-content-between gap-2 mb-3 p-1.5 rounded-pill"
          style={{
            background: "rgba(24, 21, 18, 0.72)",
            border: "1px solid rgba(197, 160, 89, 0.24)",
          }}
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={NAV_SPRING}
            onClick={() => setViewMode("list")}
            className="btn btn-sm flex-grow-1 py-1.5 rounded-pill border-0"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
              background:
                viewMode === "list"
                  ? "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)"
                  : "transparent",
              color: viewMode === "list" ? "#16120e" : "#cfc5b7",
              transition: "all 0.25s ease",
            }}
          >
            Daftar Talk ({groups.length})
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={NAV_SPRING}
            onClick={() => {
              if (!activeRoomId && groups[0]) {
                setActiveRoomId(groups[0].id);
              }
              setViewMode("room");
            }}
            className="btn btn-sm flex-grow-1 py-1.5 rounded-pill border-0"
            style={{
              fontFamily: "var(--font-tommy-medium), sans-serif",
              fontSize: "0.76rem",
              background:
                viewMode === "room"
                  ? "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)"
                  : "transparent",
              color: viewMode === "room" ? "#16120e" : "#cfc5b7",
              transition: "all 0.25s ease",
            }}
          >
            Ruang Komunikasi
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="talk-list-view"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
            >
              {/* Form Masuk via Link Komunikasi + Paste + Search */}
              <form
                onSubmit={handleSearchRoom}
                className="smoked-glass p-3.5 mb-3"
              >
                <div
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-tommy-extra), sans-serif",
                    fontSize: "0.88rem",
                    color: "#f2ece1",
                  }}
                >
                  Masuk Ruang via Link
                </div>

                <div className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={linkInput}
                    onChange={(e) => {
                      setLinkInput(e.target.value);
                      if (searchNotFound) setSearchNotFound(false);
                    }}
                    placeholder="Tempel link komunikasi yang dibagikan..."
                    className="form-control form-control-sm"
                    style={{
                      backgroundColor: "rgba(14, 12, 10, 0.72)",
                      borderColor: "rgba(197, 160, 89, 0.24)",
                      color: "#f2ece1",
                    }}
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.93 }}
                    transition={NAV_SPRING}
                    onClick={handlePasteClick}
                    className="btn btn-sm px-2.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1 flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.72rem",
                      backgroundColor: "rgba(38, 34, 29, 0.85)",
                      border: "1px solid rgba(197, 160, 89, 0.34)",
                      color: pasteActive ? "#f0d08a" : "#e6cfa1",
                    }}
                  >
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-2"
                      style={
                        pasteActive
                          ? {
                              backgroundColor: "#0b0b0c",
                              border: "1px solid rgba(197, 160, 89, 0.45)",
                              padding: "2px",
                            }
                          : undefined
                      }
                    >
                      <PasteSvg size={15} active={pasteActive} />
                    </span>
                    <span>Paste</span>
                  </motion.button>
                </div>

                <div className="d-flex justify-content-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.94 }}
                    transition={NAV_SPRING}
                    className="btn btn-sm px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.74rem",
                      background:
                        "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                      color: "#16120e",
                      border: "1px solid rgba(255, 236, 188, 0.45)",
                    }}
                  >
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-2"
                      style={
                        searchActive
                          ? { backgroundColor: "#0b0b0c", padding: "2px" }
                          : undefined
                      }
                    >
                      <SearchIconSvg size={15} active={searchActive} />
                    </span>
                    <span>Search</span>
                  </motion.button>
                </div>

                {searchNotFound && (
                  <div
                    className="mt-2"
                    style={{
                      fontFamily: "var(--font-tommy-regular), sans-serif",
                      fontSize: "0.74rem",
                      color: "#ff9e9e",
                    }}
                  >
                    Ruang komunikasi tidak ditemukan.
                  </div>
                )}

                {foundGroup && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: SMOOTH_EASE }}
                    className="mt-2.5 p-2.5 rounded-3 d-flex align-items-center justify-content-between gap-2 flex-wrap"
                    style={{
                      backgroundColor: "rgba(26, 23, 19, 0.85)",
                      border: "1px solid rgba(197, 160, 89, 0.34)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-tommy-extra), sans-serif",
                          fontSize: "0.84rem",
                          color: "#f2ece1",
                        }}
                      >
                        {foundGroup.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-tommy-regular), sans-serif",
                          fontSize: "0.72rem",
                          color: "#9d958b",
                        }}
                      >
                        {foundGroup.membersJoined || 1} anggota
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.94 }}
                      transition={NAV_SPRING}
                      onClick={() => handleJoinFoundRoom(foundGroup)}
                      className="btn btn-sm px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
                      style={{
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.73rem",
                        background:
                          "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                        color: "#16120e",
                        border: "1px solid rgba(255, 236, 188, 0.45)",
                      }}
                    >
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-2"
                        style={
                          joiningRoomId === foundGroup.id
                            ? { backgroundColor: "#0b0b0c", padding: "2px" }
                            : undefined
                        }
                      >
                        <JoinRoomSvg
                          size={16}
                          active={joiningRoomId === foundGroup.id}
                        />
                      </span>
                      <span>Gabung keruang</span>
                    </motion.button>
                  </motion.div>
                )}
              </form>

              {/* Form Buat Talk */}
              <motion.form
                key={shakeTick}
                onSubmit={handleCreateTalk}
                animate={
                  nameError
                    ? {
                        x: [0, -8, 8, -6, 6, -3, 3, 0],
                      }
                    : { x: 0 }
                }
                transition={{ duration: 0.36, ease: SMOOTH_EASE }}
                className="smoked-glass p-3.5 mb-3"
                style={{
                  borderColor: nameError
                    ? "rgba(235, 85, 85, 0.85)"
                    : "rgba(197, 160, 89, 0.2)",
                  backgroundColor: nameError
                    ? "rgba(92, 22, 22, 0.42)"
                    : undefined,
                  transition:
                    "background-color 0.35s ease, border-color 0.35s ease",
                }}
              >
                <h1
                  className="h5 mb-1"
                  style={{
                    fontFamily: "var(--font-tommy-extra), sans-serif",
                    color: "#f2ece1",
                  }}
                >
                  Talk — Grup Komunikasi
                </h1>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-tommy-regular), sans-serif",
                    fontSize: "0.8rem",
                    color: nameError ? "#ff9e9e" : "#9d958b",
                  }}
                >
                  {nameError
                    ? "Isi Nama Talk Kamu dulu ya (notifikasi hilang dalam 5 detik)."
                    : "Buat grup komunikasi khusus topik tertentu."}
                </p>

                <div className="d-flex flex-column gap-2">
                  <input
                    type="text"
                    value={groupName}
                    disabled={!user}
                    onChange={(e) => {
                      setGroupName(e.target.value);
                      if (nameError && e.target.value.trim()) {
                        setNameError(false);
                        if (errorTimerRef.current) {
                          clearTimeout(errorTimerRef.current);
                        }
                      }
                    }}
                    placeholder="Nama Talk Kamu"
                    className="form-control form-control-sm"
                    style={{
                      backgroundColor: nameError
                        ? "rgba(120, 24, 24, 0.45)"
                        : "rgba(14, 12, 10, 0.72)",
                      borderColor: nameError
                        ? "rgba(245, 85, 85, 0.9)"
                        : "rgba(197, 160, 89, 0.24)",
                      color: "#f2ece1",
                    }}
                  />

                  <input
                    type="text"
                    value={topic}
                    disabled={!user}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Deskripsi Talk Kamu"
                    className="form-control form-control-sm"
                    style={{
                      backgroundColor: "rgba(14, 12, 10, 0.72)",
                      borderColor: "rgba(197, 160, 89, 0.24)",
                      color: "#f2ece1",
                    }}
                  />

                  {/* Pilihan Tag dengan Background Warna */}
                  <div className="d-flex align-items-center gap-1.5 flex-wrap pt-1">
                    {TAG_OPTIONS.map((tag) => {
                      const activeTag = selectedTag === tag;
                      const style = getTagStyle(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          disabled={!user}
                          onClick={() => setSelectedTag(tag)}
                          className="btn btn-sm px-2.5 py-0.5 rounded-pill"
                          style={{
                            fontFamily: "var(--font-tommy-medium), sans-serif",
                            fontSize: "0.7rem",
                            backgroundColor: style.backgroundColor,
                            border: `1px solid ${style.borderColor}`,
                            color: style.color,
                            opacity: activeTag ? 1 : 0.72,
                            transform: activeTag ? "scale(1.03)" : "scale(1)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  <div className="d-flex justify-content-end pt-1">
                    <motion.button
                      type="submit"
                      disabled={!user}
                      whileHover={user ? { scale: 1.03, y: -1 } : undefined}
                      whileTap={user ? { scale: 0.94 } : undefined}
                      transition={NAV_SPRING}
                      className="btn btn-sm px-3.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5"
                      style={{
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.76rem",
                        background:
                          "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                        color: "#16120e",
                        border: "1px solid rgba(255, 236, 188, 0.45)",
                        opacity: user ? 1 : 0.65,
                      }}
                    >
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-2"
                        style={
                          addClicked
                            ? { backgroundColor: "#0b0b0c", padding: "2px" }
                            : undefined
                        }
                      >
                        <AddTalkSvg size={18} active={addClicked} />
                      </span>
                      <span>Buat Talk</span>
                    </motion.button>
                  </div>
                </div>
              </motion.form>

              {/* Daftar Grup Komunikasi */}
              <div className="d-flex flex-column gap-2.5">
                <AnimatePresence initial={false}>
                  {groups.map((grp) => {
                    const tagStyle = getTagStyle(grp.tag || "Diskusi Tech");
                    const isCopied = copiedId === grp.id;
                    return (
                      <motion.div
                        key={grp.id}
                        layout
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.36, ease: SMOOTH_EASE }}
                        className="smoked-glass p-3.5"
                      >
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-1.5 flex-wrap">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span
                              style={{
                                fontFamily: "var(--font-tommy-extra), sans-serif",
                                fontSize: "0.92rem",
                                color: "#f2ece1",
                              }}
                            >
                              {grp.name}
                            </span>
                            <span
                              className="px-2.5 py-0.5 rounded-pill"
                              style={{
                                fontFamily: "var(--font-tommy-medium), sans-serif",
                                fontSize: "0.68rem",
                                backgroundColor: tagStyle.backgroundColor,
                                border: `1px solid ${tagStyle.borderColor}`,
                                color: tagStyle.color,
                              }}
                            >
                              {grp.tag || "Diskusi Tech"}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.7rem", color: "#9d958b" }}>
                            {grp.membersJoined || 1} anggota
                          </span>
                        </div>

                        {grp.topic && (
                          <p
                            className="mb-2"
                            style={{ fontSize: "0.8rem", color: "#cfc5b7" }}
                          >
                            {grp.topic}
                          </p>
                        )}

                        <div
                          className="p-2 rounded-3 mb-2.5"
                          style={{
                            fontSize: "0.72rem",
                            color: "#9fd6e0",
                            backgroundColor: "rgba(14, 12, 10, 0.65)",
                            border: "1px solid rgba(197, 160, 89, 0.16)",
                            wordBreak: "break-all",
                          }}
                        >
                          {getGroupLink(grp.code)}
                        </div>

                        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.94 }}
                            transition={NAV_SPRING}
                            onClick={() => handleCopyLink(grp)}
                            className="btn btn-sm px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
                            style={{
                              fontSize: "0.73rem",
                              fontFamily: "var(--font-tommy-medium), sans-serif",
                              backgroundColor: "rgba(38, 34, 29, 0.85)",
                              border: "1px solid rgba(197, 160, 89, 0.34)",
                              color: isCopied ? "#f0d08a" : "#e6cfa1",
                            }}
                          >
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-2"
                              style={
                                isCopied
                                  ? {
                                      backgroundColor: "#0b0b0c",
                                      border: "1px solid rgba(197, 160, 89, 0.45)",
                                      padding: "2px",
                                    }
                                  : undefined
                              }
                            >
                              <CopyLinkSvg size={16} active={isCopied} />
                            </span>
                            <span>
                              {isCopied ? "Link Tersalin" : "Salin Link"}
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Ruang Komunikasi Mirip Telegram */
            <motion.div
              key="talk-room-view"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
            >
              <div className="mb-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, x: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={NAV_SPRING}
                  onClick={handleBackToList}
                  className="btn btn-sm px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-tommy-medium), sans-serif",
                    fontSize: "0.74rem",
                    backgroundColor: backClicked
                      ? "#0b0b0c"
                      : "rgba(38, 34, 29, 0.85)",
                    border: "1px solid rgba(197, 160, 89, 0.34)",
                    color: backClicked ? "#f0d08a" : "#e6cfa1",
                  }}
                >
                  <BackArrowSvg size={16} active={backClicked} />
                  <span>Kembali</span>
                </motion.button>
              </div>

              <div className="smoked-glass p-3.5">
                {activeGroup ? (
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between gap-2 pb-2.5 mb-3 border-bottom flex-wrap"
                      style={{ borderColor: "rgba(197, 160, 89, 0.16)" }}
                    >
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span
                            style={{
                              fontFamily: "var(--font-tommy-extra), sans-serif",
                              fontSize: "0.94rem",
                              color: "#f2ece1",
                            }}
                          >
                            {activeGroup.name}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-pill"
                            style={{
                              fontSize: "0.66rem",
                              backgroundColor: getTagStyle(
                                activeGroup.tag || "Diskusi Tech"
                              ).backgroundColor,
                              border: `1px solid ${
                                getTagStyle(activeGroup.tag || "Diskusi Tech")
                                  .borderColor
                              }`,
                              color: getTagStyle(
                                activeGroup.tag || "Diskusi Tech"
                              ).color,
                            }}
                          >
                            {activeGroup.tag || "Diskusi Tech"}
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-tommy-regular), sans-serif",
                            fontSize: "0.72rem",
                            color: "#9d958b",
                          }}
                        >
                          {activeGroup.membersJoined || 1} anggota terhubung via
                          link • geser chat orang lain ke kanan untuk membalas
                        </div>
                      </div>
                    </div>

                    {/* Daftar Grup Cepat */}
                    <div className="d-flex align-items-center gap-1.5 overflow-auto pb-2 mb-3">
                      {groups.map((item) => {
                        const selected = item.id === activeGroup.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setActiveRoomId(item.id);
                              setReplyTo(null);
                            }}
                            className="btn btn-sm px-2.5 py-1 rounded-pill flex-shrink-0"
                            style={{
                              fontSize: "0.7rem",
                              fontFamily: "var(--font-tommy-medium), sans-serif",
                              backgroundColor: selected
                                ? "rgba(197, 160, 89, 0.24)"
                                : "rgba(28, 25, 21, 0.65)",
                              border: "1px solid rgba(197, 160, 89, 0.3)",
                              color: selected ? "#f2ece1" : "#b8ad9e",
                            }}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>

                    {/* Area Balon Chat */}
                    <div
                      className="d-flex flex-column gap-2.5 mb-3 p-2.5 rounded-3"
                      style={{
                        minHeight: "250px",
                        maxHeight: "380px",
                        overflowY: "auto",
                        backgroundColor: "rgba(12, 10, 8, 0.55)",
                        border: "1px solid rgba(197, 160, 89, 0.14)",
                      }}
                    >
                      {activeGroup.messages.map((msg) => {
                        if (msg.systemJoin) {
                          return (
                            <div
                              key={msg.id}
                              className="text-center my-1"
                              style={{
                                fontFamily:
                                  "var(--font-tommy-regular), sans-serif",
                                fontSize: "0.7rem",
                                color: "#c5a059",
                              }}
                            >
                              {msg.text} • {msg.time}
                            </div>
                          );
                        }

                        const isSelf = msg.sender === currentUsername;

                        if (!isSelf) {
                          return (
                            <div
                              key={msg.id}
                              className="d-flex justify-content-start"
                            >
                              <SwipeableOtherBubble
                                msg={msg}
                                onReply={setReplyTo}
                                disabled={!user}
                              >
                                <div className="d-flex align-items-center gap-1.5 mb-1 justify-content-start">
                                  <UserAvatar
                                    username={msg.sender}
                                    avatarUrl={msg.avatar}
                                    isSelf={false}
                                  />
                                  <span
                                    style={{
                                      fontFamily:
                                        "var(--font-tommy-medium), sans-serif",
                                      fontSize: "0.73rem",
                                      color: "#cfe2f7",
                                    }}
                                  >
                                    @{msg.sender}
                                  </span>
                                </div>

                                {msg.replyTo && (
                                  <div
                                    className="px-2 py-1 mb-1.5 rounded-2"
                                    style={{
                                      fontFamily:
                                        "var(--font-tommy-regular), sans-serif",
                                      fontSize: "0.7rem",
                                      color: "#d6cbb9",
                                      backgroundColor: "rgba(12, 10, 8, 0.48)",
                                      borderLeft: "2px solid #c5a059",
                                    }}
                                  >
                                    <div style={{ fontWeight: 600 }}>
                                      @{msg.replyTo.sender}
                                    </div>
                                    <div className="text-truncate">
                                      {msg.replyTo.text}
                                    </div>
                                  </div>
                                )}

                                <div
                                  className="d-flex align-items-end justify-content-between gap-2.5 flex-wrap"
                                  style={{
                                    fontFamily:
                                      "var(--font-tommy-regular), sans-serif",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "0.82rem",
                                      color: "#f2ece1",
                                      lineHeight: 1.48,
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {msg.text}
                                  </span>
                                  <span
                                    className="ms-auto"
                                    style={{
                                      fontSize: "0.66rem",
                                      color: "#9d958b",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {msg.time}
                                  </span>
                                </div>
                              </SwipeableOtherBubble>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={msg.id}
                            className="d-flex justify-content-end"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.35, ease: SMOOTH_EASE }}
                              className="px-3 py-2 rounded-3"
                              style={{
                                width: "fit-content",
                                maxWidth: "82%",
                                backgroundColor: "rgba(197, 160, 89, 0.2)",
                                border: "1px solid rgba(226, 194, 125, 0.42)",
                              }}
                            >
                              <div className="d-flex align-items-center gap-1.5 mb-1 justify-content-end">
                                <span
                                  style={{
                                    fontFamily:
                                      "var(--font-tommy-medium), sans-serif",
                                    fontSize: "0.73rem",
                                    color: "#f0d08a",
                                  }}
                                >
                                  @{msg.sender}
                                </span>
                                <UserAvatar
                                  username={msg.sender}
                                  avatarUrl={msg.avatar || currentAvatar}
                                  isSelf={true}
                                />
                              </div>

                              {msg.replyTo && (
                                <div
                                  className="px-2 py-1 mb-1.5 rounded-2"
                                  style={{
                                    fontFamily:
                                      "var(--font-tommy-regular), sans-serif",
                                    fontSize: "0.7rem",
                                    color: "#d6cbb9",
                                    backgroundColor: "rgba(12, 10, 8, 0.48)",
                                    borderLeft: "2px solid #c5a059",
                                  }}
                                >
                                  <div style={{ fontWeight: 600 }}>
                                    @{msg.replyTo.sender}
                                  </div>
                                  <div className="text-truncate">
                                    {msg.replyTo.text}
                                  </div>
                                </div>
                              )}

                              <div
                                className="d-flex align-items-end justify-content-between gap-2.5 flex-wrap"
                                style={{
                                  fontFamily:
                                    "var(--font-tommy-regular), sans-serif",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "0.82rem",
                                    color: "#f2ece1",
                                    lineHeight: 1.48,
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {msg.text}
                                </span>
                                <span
                                  className="ms-auto"
                                  style={{
                                    fontSize: "0.66rem",
                                    color: "#e6cfa1",
                                    lineHeight: 1,
                                  }}
                                >
                                  {msg.time}
                                </span>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Preview Balas Chat */}
                    <AnimatePresence>
                      {replyTo && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                          className="d-flex align-items-center justify-content-between gap-2 px-2.5 py-1.5 mb-2 rounded-3"
                          style={{
                            fontFamily: "var(--font-tommy-regular), sans-serif",
                            fontSize: "0.72rem",
                            color: "#e6cfa1",
                            backgroundColor: "rgba(38, 33, 27, 0.78)",
                            borderLeft: "3px solid #c5a059",
                          }}
                        >
                          <div className="text-truncate">
                            Membalas <strong>@{replyTo.sender}</strong>:{" "}
                            {replyTo.text}
                          </div>
                          <button
                            type="button"
                            onClick={() => setReplyTo(null)}
                            className="btn btn-sm p-0 px-1.5 text-decoration-none"
                            style={{ fontSize: "0.7rem", color: "#f2ece1" }}
                          >
                            Batal
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Input Kirim Pesan */}
                    <form
                      onSubmit={handleSendMessage}
                      className="d-flex align-items-center gap-2"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        disabled={!user}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={
                          user
                            ? "Tulis pesan komunikasi..."
                            : "Masuk jika ingin talk"
                        }
                        className="form-control form-control-sm"
                        style={{
                          backgroundColor: "rgba(14, 12, 10, 0.78)",
                          borderColor: "rgba(197, 160, 89, 0.28)",
                          color: "#f2ece1",
                        }}
                      />
                      <motion.button
                        type="submit"
                        disabled={!user}
                        whileHover={user ? { scale: 1.03 } : undefined}
                        whileTap={user ? { scale: 0.94 } : undefined}
                        transition={NAV_SPRING}
                        className="btn btn-sm px-3 py-1.5 rounded-pill flex-shrink-0 d-inline-flex align-items-center gap-1.5"
                        style={{
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.75rem",
                          background:
                            "linear-gradient(180deg, #e2c27d 0%, #c5a059 100%)",
                          color: "#16120e",
                          border: "1px solid rgba(255, 236, 188, 0.45)",
                          opacity: user ? 1 : 0.65,
                        }}
                      >
                        <span>Kirim</span>
                        <SendPlaneSvg size={14} />
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <p
                    className="mb-0"
                    style={{ fontSize: "0.8rem", color: "#9d958b" }}
                  >
                    Belum ada grup Talk. Buat grup dulu di tab Daftar Talk.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
