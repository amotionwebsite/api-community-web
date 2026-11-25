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
        fill="#090807"
        stroke="#c5a059"
        strokeWidth="1.25"
        d="M13.209 3.026a9.5 9.5 0 0 1 4.464 1.505c6.242 4.059 5.583 13.444-1.168 16.586-1.264.588-2.616.857-4.005.883H6a3.2 3.2 0 0 1-1.168-.236C3.705 21.288 3.04 20.201 3 19v-6.5c.017-.933.132-1.848.402-2.744 1.279-4.249 5.386-7.056 9.807-6.73M10 14c-.923.053-1.385 1.171-.625 1.78.184.149.392.207.625.22h2c.383-.022.725-.206.898-.56a1 1 0 0 0 0-.88c-.173-.354-.515-.538-.898-.56Zm0-4c-1.205.069-1.363 1.709-.229 1.974L10 12h5c.46-.026.865-.305.974-.771.15-.645-.344-1.193-.974-1.229Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M9.741 15.966c-.842-.226-.996-1.396-.241-1.832.175-.101.302-.121.5-.134h2c.36.024.68.178.866.5.132.228.168.504.1.759-.122.453-.515.711-.966.741h-2Zm0-4c-.842-.226-.996-1.396-.241-1.832.175-.101.302-.121.5-.134h5c.451.03.844.288.966.741.176.656-.327 1.217-.966 1.259h-5ZM5.92 21.997C4.253 21.885 3.051 20.684 3 19v-6.5c.017-.987.146-1.962.453-2.903 1.359-4.17 5.432-6.945 9.827-6.565a9.5 9.5 0 0 1 4.634 1.661c5.681 3.984 5.369 12.434-.587 15.99-1.465.875-3.129 1.288-4.827 1.317H6Zm5.993-16.974c-3.01.233-5.655 2.334-6.565 5.213-.235.744-.333 1.505-.348 2.283v6.441c.016.389.184.741.542.926.159.082.321.107.498.114h6.441c1.155-.022 2.274-.252 3.317-.762a7.57 7.57 0 0 0 3.178-2.954c3.055-5.216-1.053-11.724-7.063-11.261"
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
  const isDashboard = pathname.startsWith("/dashboard");
  const isProfile = pathname.startsWith("/profile");

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

      {/* Top Glass Header: Muncul hanya saat di halaman /dashboard */}
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
              <Link
                href="/"
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
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
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
                        className="d-inline-flex align-items-center bg-transparent position-relative"
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
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }} transition={NAV_SPRING}>
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }} transition={NAV_SPRING}>
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
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
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
                    className="d-inline-flex align-items-center bg-transparent position-relative"
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
        className="d-md-none position-fixed bottom-0 start-50 mb-3 px-2.5 py-1.5 rounded-pill d-flex align-items-center gap-0.5"
        style={{
          ...GLASS_CAPSULE_STYLE,
          zIndex: 50,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="position-relative px-2 py-1 text-decoration-none d-flex flex-column align-items-center bg-transparent"
              style={{
                color: active ? "#f2ece1" : "#c7bdb0",
                fontSize: "0.61rem",
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
                className="d-inline-flex align-items-center bg-transparent position-relative"
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
// sync build
