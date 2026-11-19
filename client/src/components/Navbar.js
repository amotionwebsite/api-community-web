"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SignOut, UserCircle } from "@phosphor-icons/react";
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

const PetuahSvg = ({ size = 19, active = false }) => (
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
        d="M18.324 2.026C19.308 2.186 19.961 3.031 20 4v12.99c-.038.663-.59 1.154-.738 1.782-.234.996 1.296 1.884.518 2.853-.197.246-.473.357-.78.375H7c-.538-.018-1.046-.136-1.514-.41C4.551 21.043 4.036 20.066 4 19V5c.057-1.708 1.292-2.943 3-3h11ZM17.408 20c-.207-.742-.207-1.258 0-2H7c-.544.031-1 .431-1 1s.456.969 1 1ZM10 7c-1.039.06-1.407 1.425-.44 1.898A1 1 0 0 0 10 9h4c.46-.026.865-.305.974-.771.15-.645-.344-1.193-.974-1.229Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M9.741 8.966C8.899 8.74 8.745 7.57 9.5 7.134c.175-.101.302-.121.5-.134h4c.451.03.844.288.966.741.176.656-.327 1.217-.966 1.259h-4ZM6.92 21.997C5.253 21.885 4.051 20.684 4 19V5a3.16 3.16 0 0 1 .536-1.709C5.092 2.471 6.025 2.029 7 2h11c.343.013.675.089.976.258.639.358.997 1.021 1.024 1.742v13c-.037.64-.55 1.124-.722 1.729-.282.992 1.371 2.045.429 2.978-.194.192-.439.276-.707.293H7ZM17.416 20a3 3 0 0 1 0-2H7.05c-.557.022-1.037.411-1.037 1s.48.978 1.037 1ZM6 16.177A3.5 3.5 0 0 1 7.01 16H18l-.006-11.994L17.943 4H7.04c-.622.025-1.015.418-1.04 1.04Z"
      />
    )}
  </svg>
);

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: DashboardSvg },
  { href: "/", label: "Feed", icon: FeedSvg },
  { href: "/forum", label: "Forum", icon: ForumSvg },
  { href: "/showcase", label: "Karya", icon: ShowcaseSvg },
  { href: "/quotes", label: "Petuah", icon: PetuahSvg },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {/* Top Glass Header: Muncul hanya saat di halaman /dashboard */}
      {isDashboard ? (
        <>
          <header
            className="position-fixed top-0 start-0 w-100 border-bottom"
            style={{
              backgroundColor: "rgba(14, 12, 10, 0.88)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderColor: "rgba(197, 160, 89, 0.14)",
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
                <img
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

              {/* Desktop Center Nav */}
              <nav
                className="d-none d-md-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                style={{
                  backgroundColor: "rgba(16, 14, 11, 0.72)",
                  backdropFilter: "blur(24px) saturate(160%)",
                  WebkitBackdropFilter: "blur(24px) saturate(160%)",
                  border: "1px solid rgba(197, 160, 89, 0.22)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
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
                      className="position-relative px-2 py-1 text-decoration-none d-inline-flex align-items-center gap-1.5"
                      style={{
                        fontSize: "0.78rem",
                        color: active ? "#f2ece1" : "#b8ad9e",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      <motion.span
                        animate={
                          active
                            ? { scale: [1, 1.2, 1.08], y: [0, -2, 0] }
                            : { scale: 1, y: 0 }
                        }
                        transition={{ type: "spring", stiffness: 450, damping: 24 }}
                        className="d-inline-flex align-items-center"
                      >
                        <Icon size={17} active={active} />
                      </motion.span>
                      <span>{item.label}</span>
                      {active && (
                        <motion.span
                          layoutId="desktop-nav-dot"
                          transition={{ type: "spring", stiffness: 420, damping: 28 }}
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
              </nav>

              {/* Auth Action: Kapsul Gabungan Daftar (Blur Abu-abu) / Masuk (Emas Sogan) */}
              <div className="d-flex align-items-center gap-2">
                {user ? (
                  <div className="d-flex align-items-center gap-1.5">
                    <span
                      className="px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1"
                      style={{
                        background: "rgba(197, 160, 89, 0.14)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        border: "1px solid rgba(197, 160, 89, 0.25)",
                        color: "#e6cfa3",
                        fontSize: "0.75rem",
                      }}
                    >
                      <UserCircle weight="duotone" size={15} />
                      <span>{user.username}</span>
                    </span>
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
                  <div
                    className="d-inline-flex align-items-center rounded-pill overflow-hidden flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(38, 35, 31, 0.65)",
                      backdropFilter: "blur(20px) saturate(150%)",
                      WebkitBackdropFilter: "blur(20px) saturate(150%)",
                      border: "1px solid rgba(197, 160, 89, 0.34)",
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.45)",
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.74rem",
                    }}
                  >
                    <Link
                      href="/register"
                      className="px-2.5 py-1 text-decoration-none"
                      style={{
                        backgroundColor: "rgba(52, 48, 43, 0.55)",
                        color: "#e8e2d9",
                        fontWeight: 500,
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
                        fontWeight: 600,
                      }}
                    >
                      Masuk
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Spacer khusus ketika header dashboard tampil */}
          <div style={{ height: "58px" }} />
        </>
      ) : (
        /* Desktop Center Nav mengambang saat di Feed, Forum, Karya, Petuah */
        <div
          className="d-none d-md-flex justify-content-center pt-3"
          style={{ zIndex: 45 }}
        >
          <nav
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
            style={{
              backgroundColor: "rgba(16, 14, 11, 0.72)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(197, 160, 89, 0.22)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
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
                  className="position-relative px-2 py-1 text-decoration-none d-inline-flex align-items-center gap-1.5"
                  style={{
                    fontSize: "0.78rem",
                    color: active ? "#f2ece1" : "#b8ad9e",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <motion.span
                    animate={
                      active
                        ? { scale: [1, 1.2, 1.08], y: [0, -2, 0] }
                        : { scale: 1, y: 0 }
                    }
                    transition={{ type: "spring", stiffness: 450, damping: 24 }}
                    className="d-inline-flex align-items-center"
                  >
                    <Icon size={17} active={active} />
                  </motion.span>
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="desktop-nav-dot"
                      transition={{ type: "spring", stiffness: 420, damping: 28 }}
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
          </nav>
        </div>
      )}

      {/* Mobile Floating Glass Dock */}
      <nav
        className="d-md-none position-fixed bottom-0 start-50 translate-middle-x mb-3 px-3 py-1.5 rounded-4 d-flex align-items-center gap-1"
        style={{
          backgroundColor: "rgba(18, 15, 12, 0.76)",
          backdropFilter: "blur(26px) saturate(170%)",
          WebkitBackdropFilter: "blur(26px) saturate(170%)",
          border: "1px solid rgba(197, 160, 89, 0.24)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.68)",
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
              className="position-relative px-2 py-1 text-decoration-none d-flex flex-column align-items-center"
              style={{
                color: active ? "#f2ece1" : "#c7bdb0",
                fontSize: "0.63rem",
                fontWeight: active ? 600 : 400,
              }}
            >
              <motion.span
                animate={
                  active
                    ? { scale: [1, 1.24, 1.1], y: [0, -2, 0] }
                    : { scale: 1, y: 0 }
                }
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className="d-inline-flex align-items-center"
              >
                <Icon size={19} active={active} />
              </motion.span>
              <span className="mt-0.5">{item.label}</span>
              {active && (
                <motion.span
                  layoutId="mobile-dock-dot"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="rounded-circle mt-0.5"
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
      </nav>
    </>
  );
}
