"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { SignOut } from "@phosphor-icons/react";
import { useAuthStore } from "../store/useAuthStore";

const DashboardSvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#090807"
        stroke="#c5a059"
        strokeWidth="1.35"
        d="M20 11v8c-.046 1.147-.853 1.954-2 2h-4v-6a2.1 2.1 0 0 0-.223-.919 2.02 2.02 0 0 0-1.145-.979c-1.333-.443-2.577.545-2.632 1.898v6H6c-1.146-.046-1.954-.853-2-2v-8h-.997l-.227-.024c-.62-.136-.961-.867-.669-1.431.077-.15.154-.225.281-.336l8.384-6.521c.422-.296.892-.461 1.414-.412.392.036.723.188 1.042.412l8.384 6.521c.621.538.466 1.58-.388 1.767l-.227.024Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M4 11h-.997l-.246-.031a1.01 1.01 0 0 1-.67-1.374c.077-.174.161-.262.301-.386l8.384-6.521a2.13 2.13 0 0 1 1.098-.413c.494-.032.96.128 1.358.413l8.384 6.521c.14.124.224.211.3.385a1.01 1.01 0 0 1-.668 1.375l-.247.031H20v8a2.1 2.1 0 0 1-.376 1.162c-.38.531-.979.814-1.624.838H6c-1.135-.042-1.958-.865-2-2Zm1.622-1.772c.24.219.356.442.378.772v8.943l.006.051h11.988l.006-.051V10c.022-.33.138-.553.378-.772L12 4.277Z"
      />
    )}
  </svg>
);

const TalkSvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#09244BFF"
        d="M11.333 19 8 21.5a1.3 1.3 0 0 1-.434.212c-.82.217-1.528-.403-1.566-1.212V19c-.225 0-1.039.022-1.407-.027C3.069 18.767 2.05 17.502 2 16V6c.027-.801.305-1.548.879-2.121C3.452 3.305 4.199 3.027 5 3h14c.538.018 1.046.136 1.514.41.935.547 1.45 1.524 1.486 2.59v10c-.057 1.708-1.292 2.943-3 3Zm4.897-9.476a1.516 1.516 0 0 0-1.206 1.746 1.516 1.516 0 0 0 1.746 1.206 1.516 1.516 0 0 0 1.206-1.746 1.516 1.516 0 0 0-1.746-1.206m-4.5 0a1.516 1.516 0 0 0-1.206 1.746 1.516 1.516 0 0 0 1.746 1.206 1.516 1.516 0 0 0 1.206-1.746 1.516 1.516 0 0 0-1.746-1.206m-4.5 0a1.516 1.516 0 0 0-1.206 1.746 1.516 1.516 0 0 0 1.746 1.206 1.516 1.516 0 0 0 1.206-1.746A1.516 1.516 0 0 0 7.23 9.524"
      />
    ) : (
      <path
        fill="#09244BFF"
        d="m16.975 9.564.418.216c.985.72.742 2.274-.418 2.656l-.475.077-.475-.077-.418-.216c-.985-.72-.742-2.274.418-2.656l.475-.077Zm-4.5 0 .418.216c.985.72.742 2.274-.418 2.656l-.475.077-.475-.077-.418-.216c-.985-.72-.742-2.274.418-2.656L12 9.487Zm-4.5 0 .418.216c.985.72.742 2.274-.418 2.656l-.475.077-.475-.077-.418-.216c-.985-.72-.742-2.274.418-2.656l.475-.077ZM6 19c-.262 0-1.092.028-1.485-.036C3.046 18.726 2.059 17.498 2 16.04V5.96c.032-.788.314-1.52.877-2.083S4.172 3.032 4.96 3h14.08c.788.032 1.52.314 2.083.877s.845 1.295.877 2.083v10.08c-.038.946-.453 1.817-1.226 2.383-.513.376-1.103.552-1.734.577h-7.653c-.135.029.029-.025-.097.032l-3.366 2.525-.346.169a1.29 1.29 0 0 1-1.506-.753L6 20.595Zm2 0 2.176-1.632A2.1 2.1 0 0 1 11.28 17h7.68c.622-.025 1.015-.418 1.04-1.04V6.04c-.014-.336-.132-.641-.412-.845-.188-.138-.398-.186-.628-.195H5.04c-.336.014-.641.132-.845.412-.138.188-.186.398-.195.628v9.92c.058 1.433 1.651.966 2.58 1.04.331.027.533.075.813.28C8.02 17.738 8 18.304 8 19"
      />
    )}
  </svg>
);

const FeedSvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#090807"
        stroke="#c5a059"
        strokeWidth="1.25"
        d="M18 10h1.5c.535.024 1.019.272 1.295.743.139.237.193.486.205.757V19c-.031.933-.418 1.796-1.167 2.375-.535.413-1.163.603-1.833.625H5c-.641-.026-1.229-.293-1.614-.819C3.129 20.83 3.017 20.43 3 20V5c.017-.43.129-.83.386-1.181C3.771 3.293 4.359 3.026 5 3h11c1.146.046 1.954.854 2 2Zm0 2v8c.587-.068.965-.385 1-1v-7ZM8 13c-1.039.06-1.407 1.425-.44 1.898A1 1 0 0 0 8 15h3c.46-.026.865-.305.974-.771.15-.645-.344-1.193-.974-1.229Zm0-5c-1.205.069-1.363 1.709-.229 1.974L8 10h5c.46-.026.865-.305.974-.771.15-.645-.344-1.193-.974-1.229Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M7.741 14.966c-.842-.226-.996-1.396-.241-1.832.175-.101.302-.121.5-.134h3c.451.03.844.288.966.741.176.656-.327 1.217-.966 1.259H8Zm0-5C6.899 9.74 6.745 8.57 7.5 8.134c.175-.101.302-.121.5-.134h5c.451.03.844.288.966.741.176.656-.327 1.217-.966 1.259H8ZM18 10h1.58c.461.037.861.226 1.14.607.205.28.253.482.28.813v7.62c-.038.946-.453 1.817-1.226 2.383-.513.376-1.103.552-1.734.577H4.943c-.593-.034-1.131-.275-1.508-.745-.282-.352-.409-.753-.435-1.198V4.943c.026-.445.153-.846.435-1.198.377-.47.915-.711 1.508-.745h11.114c1.1.063 1.88.843 1.943 1.943Zm-2.006-4.994H5.006v14.988L16 20ZM18 12v7.997c.607-.049.975-.425 1-1.037V12Z"
      />
    )}
  </svg>
);

const ForumSvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#09244BFF"
        d="M16.732 3c.531 0 1.069-.059 1.592.026.984.16 1.637 1.005 1.676 1.974v12c-.025 1.002-.289 1.959-.854 2.796C18.205 21.188 16.662 21.958 15 22H6c-1.146-.046-1.954-.854-2-2V5c.039-.969.692-1.814 1.676-1.974C6.199 2.941 6.737 3 7.268 3c.433-.636.949-.97 1.732-1h6c.783.03 1.299.364 1.732 1m-6.151 10.621-1.414-1.414c-.337-.295-.795-.394-1.201-.163a1 1 0 0 0-.473.616c-.094.359.024.691.26.961l2.051 2.051c.378.337.91.435 1.357.158l.198-.158 4.879-4.879c.295-.338.395-.795.163-1.201-.339-.593-1.092-.637-1.577-.213ZM9.5 4a.514.514 0 0 0-.5.5v1c.017.216.127.403.342.475L9.5 6h5c.216-.017.403-.127.475-.342L15 5.5v-1a.514.514 0 0 0-.5-.5Z"
      />
    ) : (
      <path
        fill="#09244BFF"
        d="m10.582 13.621 4.242-4.242c.482-.423 1.234-.381 1.573.207.235.407.139.867-.159 1.207l-4.949 4.95-.207.159c-.407.235-.868.139-1.208-.159l-2.121-2.122c-.238-.271-.355-.606-.259-.966.092-.342.365-.615.707-.707.36-.096.695.021.966.259ZM7.273 3c.392-.617.992-.973 1.727-1h6c.735.027 1.335.383 1.727 1 .371 0 1.122-.053 1.617.033C19.311 3.201 19.965 4.04 20 5v12c-.023.968-.271 1.914-.81 2.727C18.246 21.152 16.699 21.96 15 22H6c-1.135-.042-1.958-.865-2-2V5c.035-.96.689-1.799 1.656-1.967C6.151 2.947 6.902 3 7.273 3M7 5l-.994.006v14.988l.051.006h8.914c1.736-.05 2.979-1.293 3.029-3.029V5.057l-.006-.051L17 5c-.084 1.14-.827 1.957-2 2H9c-1.173-.043-1.916-.86-2-2m2.006-.994v.988h5.988v-.988Z"
      />
    )}
  </svg>
);

const ShowcaseSvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#090807"
        stroke="#c5a059"
        strokeWidth="1.25"
        d="M16.779 3.03c.586.102 1.047.453 1.369.941l2.424 4.04c.273.49.409.982.428 1.543V19c-.022.535-.202 1.03-.586 1.414s-.879.564-1.414.586H5c-.43-.017-.83-.129-1.181-.386-.526-.385-.793-.973-.819-1.614V9.554a3.3 3.3 0 0 1 .428-1.543l2.424-4.04A2.08 2.08 0 0 1 7.566 3h8.868ZM7.566 5l-2.4 4H11V5ZM13 5v4h5.834l-2.4-4Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M16.78 3.03c.585.102 1.047.453 1.369.941l2.424 4.039c.272.491.408.983.427 1.544V19c-.022.535-.202 1.03-.586 1.414s-.879.564-1.414.586H5c-.43-.017-.83-.129-1.181-.386-.526-.385-.793-.973-.819-1.614V9.554a3.3 3.3 0 0 1 .428-1.544l2.423-4.039A2.08 2.08 0 0 1 7.566 3h8.868ZM5 19h14v-9H5Zm8-11h5.234l-1.8-3H13ZM5.766 8H11V5H7.566Z"
      />
    )}
  </svg>
);

const TopTrophySvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#090807"
        stroke="#c5a059"
        strokeWidth="1.25"
        d="M18.758 6c.455 0 .915-.034 1.356.104a2.31 2.31 0 0 1 1.601 2.284c-.016.34-.219 1.249-.244 1.357-.174.756-.506 1.443-1.047 2.007s-1.189.891-1.925 1.123c-.266.505-.316.64-.647 1.106a7.22 7.22 0 0 1-3.557 2.645c-.562.19-.712.196-1.295.305V19h3l.229.026c.616.144.946.847.669 1.414-.173.354-.515.538-.898.56H8c-1.039-.06-1.408-1.425-.44-1.898A1 1 0 0 1 8 19h3v-2.069c-.583-.109-.733-.115-1.295-.305a7.2 7.2 0 0 1-3.557-2.645c-.331-.466-.381-.601-.647-1.106-.736-.232-1.384-.559-1.925-1.123s-.873-1.251-1.047-2.007c-.025-.108-.228-1.017-.244-1.357a2.31 2.31 0 0 1 1.601-2.284C4.327 5.966 4.787 6 5.242 6c.066-.525.073-1.064.224-1.572C5.722 3.564 6.504 3.036 7.383 3h9.234c.878.036 1.661.564 1.917 1.428.15.508.158 1.047.224 1.572M4.826 10.133c0-.727.076-1.409.166-2.133-.308 0-.723-.089-.703.347l.201 1.005c.07.294.18.525.336.781M19.008 8c.09.724.166 1.406.166 2.133a2.6 2.6 0 0 0 .336-.781l.201-1.005c.02-.436-.396-.347-.703-.347"
      />
    ) : (
      <path
        fill="currentColor"
        d="M18.447 12.971c-1.063 2.128-3.082 3.625-5.447 3.953V19h3l.259.034c.625.168.931.906.607 1.466-.186.322-.506.476-.866.5H8c-.755-.05-1.269-.802-.866-1.5.088-.152.214-.278.366-.366.175-.101.302-.121.5-.134h3v-2.076c-2.365-.328-4.384-1.825-5.447-3.953-1.513-.272-2.56-1.185-2.919-2.702L2.318 8.69l-.04-.415a2.32 2.32 0 0 1 1.831-2.233C4.432 5.976 4.954 6 5.242 6c.126-1.007.074-1.986.973-2.63.335-.24.707-.349 1.115-.37h9.34c.408.021.78.13 1.115.37.899.644.847 1.623.973 2.63.288 0 .811-.024 1.133.042a2.32 2.32 0 0 1 1.831 2.233l-.04.415-.316 1.579c-.359 1.517-1.406 2.43-2.919 2.702M7.387 5.005l-.011.047-.513 4.103c-.081.798-.026 1.582.236 2.345 1.385 4.034 6.811 4.749 9.197 1.213.715-1.059.969-2.297.841-3.558l-.513-4.103-.011-.047ZM4.992 8c-.352 0-.748-.074-.693.396l.282 1.412c.056.233.138.41.267.609-.085-.812.044-1.613.144-2.417m14.016 0c.1.804.229 1.605.144 2.417.129-.199.211-.376.267-.609l.282-1.411c.055-.471-.341-.397-.693-.397"
      />
    )}
  </svg>
);

const YouUserSvg = ({ size = 19, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="#090807"
        stroke="#c5a059"
        strokeWidth="1.25"
        d="M12.79 13.025a12.3 12.3 0 0 1 3.606.779c1.904.726 4.977 2.658 4.571 5.104-.131.79-.664 1.414-1.326 1.83-.949.597-2.11.836-3.2.997-1.156.171-2.327.232-3.494.256-1.793.036-3.611.007-5.388-.256-1.381-.204-3.192-.585-4.079-1.787-1.005-1.362-.278-2.97.769-4.046 2.098-2.155 5.616-3.062 8.541-2.877m-.279-10.999a5 5 0 0 1 2.669 1.116 5 5 0 0 1 1.595 2.371c1.06 3.412-1.737 6.821-5.286 6.461a5 5 0 0 1-2.669-1.116 5 5 0 0 1-1.595-2.371c-1.06-3.412 1.737-6.821 5.286-6.461"
      />
    ) : (
      <path
        fill="currentColor"
        d="M12.75 13.022c2.566.154 5.641 1.2 7.328 3.241.893 1.081 1.347 2.552.391 3.761-.914 1.154-2.707 1.521-4.081 1.719-1.451.209-2.924.257-4.388.257-1.675 0-3.373-.054-5.023-.361-1.215-.225-2.64-.597-3.446-1.615-1.094-1.384-.345-3.044.741-4.146 2.097-2.129 5.57-3.031 8.478-2.856m-1.38 1.998a10.4 10.4 0 0 0-2.88.588 8.7 8.7 0 0 0-1.823.896c-.584.382-1.193.87-1.519 1.504-.088.17-.18.394-.131.591.159.634 1.816.979 2.325 1.073 1.284.239 2.601.301 3.904.322 1.418.023 2.845-.001 4.256-.156.715-.078 3.092-.383 3.451-1.156.286-.615-.857-1.624-1.254-1.922-1.773-1.333-4.142-1.872-6.329-1.74m1.212-12.988a5.03 5.03 0 0 1 2.955 1.431 5.03 5.03 0 0 1 1.333 2.391c.787 3.362-2.024 6.511-5.452 6.114a5.03 5.03 0 0 1-2.955-1.431A5.03 5.03 0 0 1 7.13 8.146c-.787-3.362 2.024-6.511 5.452-6.114m-.933 1.99a3 3 0 0 0-1.524.638c-2.339 1.876-.751 5.663 2.226 5.318a3 3 0 0 0 1.524-.638c2.339-1.876.751-5.663-2.226-5.318"
      />
    )}
  </svg>
);

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: DashboardSvg },
  { href: "/talk", label: "Talk", icon: TalkSvg },
  { href: "/", label: "Feed", icon: FeedSvg },
  { href: "/forum", label: "Forum", icon: ForumSvg },
  { href: "/showcase", label: "Karya", icon: ShowcaseSvg },
  { href: "/top", label: "Top", icon: TopTrophySvg },
  { href: "/profile", label: "You", icon: YouUserSvg },
];

const GLASS_CAPSULE_STYLE = {
  background:
    "linear-gradient(180deg, rgba(34, 29, 24, 0.56) 0%, rgba(16, 13, 11, 0.46) 100%)",
  backdropFilter: "blur(28px) saturate(185%)",
  WebkitBackdropFilter: "blur(28px) saturate(185%)",
  border: "1px solid rgba(197, 160, 89, 0.28)",
  boxShadow:
    "0 12px 32px rgba(0, 0, 0, 0.62), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  fontFamily: "var(--font-tommy-personal), sans-serif",
};

const NAV_SPRING = { type: "spring", stiffness: 430, damping: 28, mass: 0.85 };

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const isDashboard = pathname === "/" || pathname.startsWith("/dashboard");
  const isProfile = pathname.startsWith("/profile");
  const isTalkActive = pathname.startsWith("/talk");

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isNavItemActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname.startsWith("/dashboard");
    }
    if (href === "/") {
      return pathname === "/feed";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Indikator Progress Scroll Tipis di Atas Layar */}
      <motion.div
        style={{
          scaleX: smoothProgress,
          transformOrigin: "0% 50%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, rgba(197,160,89,0.2) 0%, #c5a059 60%, #f0d08a 100%)",
          zIndex: 70,
          pointerEvents: "none",
        }}
      />

      {/* Top Glass Header: Muncul saat di halaman /dashboard atau default "/" */}
      {isDashboard ? (
        <>
          <motion.header
            initial={{ opacity: 0, y: -14 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: isScrolled
                ? "rgba(12, 10, 8, 0.92)"
                : "rgba(14, 12, 10, 0.76)",
              boxShadow: isScrolled
                ? "0 10px 28px rgba(0, 0, 0, 0.6)"
                : "0 0 0 rgba(0, 0, 0, 0)",
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="position-fixed top-0 start-0 w-100 border-bottom"
            style={{
              backdropFilter: "blur(22px) saturate(165%)",
              WebkitBackdropFilter: "blur(22px) saturate(165%)",
              borderColor: "rgba(197, 160, 89, 0.16)",
              zIndex: 50,
            }}
          >
            <div
              className="container py-2 d-flex align-items-center justify-content-between gap-2"
              style={{ maxWidth: "740px" }}
            >
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Link
                  href="/dashboard"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <motion.img
                    whileHover={{ rotate: -6, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={NAV_SPRING}
                    src="/logoapi.png"
                    alt="Anak Programmer Indonesia"
                    width={42}
                    height={42}
                    className="object-fit-contain flex-shrink-0"
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-utendo), sans-serif",
                      fontWeight: 700,
                      color: "#f2ece1",
                      fontSize: "0.92rem",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      marginLeft: "-6px",
                    }}
                  >
                    Anak Programmer Indonesia
                  </span>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.93 }}
                  transition={NAV_SPRING}
                >
                  <Link
                    href="/talk"
                    className="px-2.5 py-1 rounded-pill text-decoration-none d-inline-flex align-items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.74rem",
                      backgroundColor: isTalkActive
                        ? "#0b0b0c"
                        : "rgba(38, 35, 31, 0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: isTalkActive
                        ? "1px solid rgba(197, 160, 89, 0.65)"
                        : "1px solid rgba(197, 160, 89, 0.28)",
                      color: isTalkActive ? "#f2ece1" : "#e6cfa3",
                      boxShadow: isTalkActive
                        ? "0 6px 18px rgba(0, 0, 0, 0.55)"
                        : "none",
                    }}
                  >
                    <motion.span
                      animate={
                        isTalkActive
                          ? { scale: [1, 1.2, 1.05] }
                          : { scale: 1 }
                      }
                      transition={NAV_SPRING}
                      className="d-inline-flex align-items-center justify-content-center rounded-2"
                      style={
                        isTalkActive
                          ? { backgroundColor: "#0b0b0c", padding: "2px" }
                          : undefined
                      }
                    >
                      <TalkSvg size={16} active={isTalkActive} />
                    </motion.span>
                    <span>Talk</span>
                  </Link>
                </motion.div>
              </div>

              {/* Desktop Center Glass Nav Capsule */}
              <motion.nav
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="d-none d-md-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill"
                style={GLASS_CAPSULE_STYLE}
              >
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = isNavItemActive(item.href);
                  const isBlackBgItem =
                    item.href === "/forum" || item.href === "/talk";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="position-relative px-2.5 py-1 text-decoration-none d-inline-flex align-items-center gap-1.5 bg-transparent"
                      style={{
                        fontSize: "0.78rem",
                        color: active ? "#f2ece1" : "#b8ad9e",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {active && (
                        <motion.span
                          layoutId="desktop-nav-frame"
                          transition={NAV_SPRING}
                          className="position-absolute rounded-pill"
                          style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            border: "1px solid rgba(197, 160, 89, 0.34)",
                            backgroundColor: "rgba(197, 160, 89, 0.1)",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                      <motion.span
                        whileHover={{ y: -1.5, scale: 1.12 }}
                        whileTap={{ scale: 0.86 }}
                        animate={
                          active
                            ? { scale: [1, 1.22, 1.06], rotate: [0, -6, 0] }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={NAV_SPRING}
                        className="d-inline-flex align-items-center justify-content-center bg-transparent position-relative rounded-2"
                        style={
                          active && isBlackBgItem
                            ? { backgroundColor: "#0b0b0c", padding: "2px" }
                            : undefined
                        }
                      >
                        <Icon size={17} active={active} />
                      </motion.span>
                      <span className="position-relative">{item.label}</span>
                      {active && (
                        <motion.span
                          layoutId="desktop-nav-dot"
                          transition={NAV_SPRING}
                          className="position-absolute bottom-0 start-50 translate-middle-x rounded-circle"
                          style={{
                            width: "4px",
                            height: "4px",
                            backgroundColor: "#c5a059",
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </motion.nav>

              {/* Auth Action & Tombol Header You */}
              <div className="d-flex align-items-center gap-2">
                {user ? (
                  <div className="d-flex align-items-center gap-1.5">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      transition={NAV_SPRING}
                    >
                      <Link
                        href="/profile"
                        className="px-2.5 py-1 rounded-pill text-decoration-none d-inline-flex align-items-center gap-1.5"
                        style={{
                          background: isProfile
                            ? "rgba(197, 160, 89, 0.24)"
                            : "rgba(197, 160, 89, 0.14)",
                          backdropFilter: "blur(18px)",
                          WebkitBackdropFilter: "blur(18px)",
                          border: "1px solid rgba(197, 160, 89, 0.32)",
                          color: "#e6cfa3",
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        <YouUserSvg size={15} active={isProfile} />
                        <span>{user.username}</span>
                      </Link>
                    </motion.div>
                    <button
                      type="button"
                      onClick={logout}
                      className="btn btn-sm btn-glass-subtle px-2 py-1"
                      title="Keluar"
                    >
                      <SignOut weight="regular" size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-1.5">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      transition={NAV_SPRING}
                    >
                      <Link
                        href="/profile"
                        className="px-2.5 py-1 rounded-pill text-decoration-none d-inline-flex align-items-center gap-1"
                        style={{
                          backgroundColor: "rgba(38, 35, 31, 0.65)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid rgba(197, 160, 89, 0.28)",
                          color: "#e6cfa3",
                          fontFamily: "var(--font-tommy-medium), sans-serif",
                          fontSize: "0.73rem",
                        }}
                      >
                        <YouUserSvg size={14} active={isProfile} />
                        <span>You</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      transition={NAV_SPRING}
                      className="d-inline-flex align-items-center rounded-pill overflow-hidden flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(38, 35, 31, 0.65)",
                        backdropFilter: "blur(20px) saturate(150%)",
                        WebkitBackdropFilter: "blur(20px) saturate(150%)",
                        border: "1px solid rgba(197, 160, 89, 0.34)",
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.45)",
                        fontFamily: "var(--font-tommy-medium), sans-serif",
                        fontSize: "0.74rem",
                      }}
                    >
                      <Link
                        href="/register"
                        className="px-2.5 py-1 text-decoration-none"
                        style={{
                          backgroundColor: "rgba(52, 48, 43, 0.55)",
                          color: "#e8e2d9",
                        }}
                      >
                        Daftar
                      </Link>
                      <Link
                        href="/login"
                        className="px-2.5 py-1 text-decoration-none"
                        style={{
                          background:
                            "linear-gradient(180deg, #cfa960 0%, #b38d46 100%)",
                          color: "#120f0c",
                        }}
                      >
                        Masuk
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.header>

          {/* Spacer khusus ketika header dashboard tampil */}
          <div style={{ height: "58px" }} />
        </>
      ) : (
        /* Desktop Center Glass Nav Capsule saat di Feed, Forum, Karya, Top, You */
        <div
          className="d-none d-md-flex justify-content-center pt-3 position-sticky top-0"
          style={{ zIndex: 45 }}
        >
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isScrolled ? 0.96 : 1,
            }}
            transition={NAV_SPRING}
            className="d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill"
            style={GLASS_CAPSULE_STYLE}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isNavItemActive(item.href);
              const isBlackBgItem =
                item.href === "/forum" || item.href === "/talk";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="position-relative px-2.5 py-1 text-decoration-none d-inline-flex align-items-center gap-1.5 bg-transparent"
                  style={{
                    fontSize: "0.78rem",
                    color: active ? "#f2ece1" : "#b8ad9e",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-nav-frame"
                      transition={NAV_SPRING}
                      className="position-absolute rounded-pill"
                      style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: "1px solid rgba(197, 160, 89, 0.34)",
                        backgroundColor: "rgba(197, 160, 89, 0.1)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <motion.span
                    whileHover={{ y: -1.5, scale: 1.12 }}
                    whileTap={{ scale: 0.86 }}
                    animate={
                      active
                        ? { scale: [1, 1.22, 1.06], rotate: [0, -6, 0] }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={NAV_SPRING}
                    className="d-inline-flex align-items-center justify-content-center bg-transparent position-relative rounded-2"
                    style={
                      active && isBlackBgItem
                        ? { backgroundColor: "#0b0b0c", padding: "2px" }
                        : undefined
                    }
                  >
                    <Icon size={17} active={active} />
                  </motion.span>
                  <span className="position-relative">{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="desktop-nav-dot"
                      transition={NAV_SPRING}
                      className="position-absolute bottom-0 start-50 translate-middle-x rounded-circle"
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#c5a059",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </motion.nav>
        </div>
      )}

      {/* Mobile Floating Glassmorphism Capsule Dock dengan Motion & Scroll Animation */}
      <motion.nav
        initial={{ opacity: 0, y: 26, x: "-50%", scale: 0.94 }}
        animate={{
          opacity: 1,
          y: isScrolled ? 2 : 0,
          x: "-50%",
          scale: isScrolled ? 0.97 : 1,
        }}
        transition={NAV_SPRING}
        className="d-md-none position-fixed bottom-0 start-50 mb-3 px-2 py-1.5 rounded-pill d-flex align-items-center gap-0.5"
        style={{
          ...GLASS_CAPSULE_STYLE,
          zIndex: 50,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isNavItemActive(item.href);
          const isBlackBgItem =
            item.href === "/forum" || item.href === "/talk";
          return (
            <Link
              key={item.href}
              href={item.href}
              className="position-relative px-1.5 py-1 text-decoration-none d-flex flex-column align-items-center bg-transparent"
              style={{
                color: active ? "#f2ece1" : "#c7bdb0",
                fontSize: "0.59rem",
                fontWeight: active ? 600 : 400,
              }}
            >
              {active && (
                <motion.span
                  layoutId="mobile-nav-frame"
                  transition={NAV_SPRING}
                  className="position-absolute rounded-pill"
                  style={{
                    top: "1px",
                    left: "2px",
                    right: "2px",
                    bottom: "1px",
                    border: "1px solid rgba(197, 160, 89, 0.34)",
                    backgroundColor: "rgba(197, 160, 89, 0.08)",
                    pointerEvents: "none",
                  }}
                />
              )}
              <motion.span
                whileTap={{ scale: 0.8 }}
                animate={
                  active
                    ? { scale: [1, 1.26, 1.08], y: [0, -2.5, 0] }
                    : { scale: 1, y: 0 }
                }
                transition={NAV_SPRING}
                className="d-inline-flex align-items-center justify-content-center bg-transparent position-relative rounded-2"
                style={
                  active && isBlackBgItem
                    ? { backgroundColor: "#0b0b0c", padding: "2px" }
                    : undefined
                }
              >
                <Icon size={18} active={active} />
              </motion.span>
              <span className="mt-0.5 position-relative">{item.label}</span>
              {active && (
                <motion.span
                  layoutId="mobile-dock-dot"
                  transition={NAV_SPRING}
                  className="rounded-circle mt-0.5 position-relative"
                  style={{
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#c5a059",
                  }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
}
