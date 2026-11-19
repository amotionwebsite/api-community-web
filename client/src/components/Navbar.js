"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  ChatsTeardrop,
  Cube,
  Quotes,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { useAuthStore } from "../store/useAuthStore";

const DashboardSvg = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M4 11h-.997l-.246-.031a1.01 1.01 0 0 1-.67-1.374c.077-.174.161-.262.301-.386l8.384-6.521a2.13 2.13 0 0 1 1.098-.413c.494-.032.96.128 1.358.413l8.384 6.521c.14.124.224.211.3.385a1.01 1.01 0 0 1-.668 1.375l-.247.031H20v8a2.1 2.1 0 0 1-.376 1.162c-.38.531-.979.814-1.624.838H6c-1.135-.042-1.958-.865-2-2Zm1.622-1.772c.24.219.356.442.378.772v8.943l.006.051h11.988l.006-.051V10c.022-.33.138-.553.378-.772L12 4.277Z"
    />
  </svg>
);

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardSvg },
  { href: "/", label: "Feed", icon: Compass },
  { href: "/forum", label: "Forum", icon: ChatsTeardrop },
  { href: "/showcase", label: "Karya", icon: Cube },
  { href: "/quotes", label: "Petuah", icon: Quotes },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Top Glass Header */}
      <header
        className="sticky-top border-bottom"
        style={{
          backgroundColor: "rgba(14, 12, 10, 0.78)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderColor: "rgba(197, 160, 89, 0.14)",
          zIndex: 40,
        }}
      >
        <div
          className="container py-2.5 d-flex align-items-center justify-content-between gap-2"
          style={{ maxWidth: "740px" }}
        >
          <Link
            href="/"
            className="d-flex align-items-center gap-2 text-decoration-none"
          >
            <img
              src="/logoapi.png"
              alt="Anak Programmer Indonesia"
              width={28}
              height={28}
              className="object-fit-contain"
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-utendo), sans-serif",
                  color: "#f2ece1",
                  fontSize: "0.86rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                Anak Programmer Indonesia
              </div>
              <div
                className="d-flex align-items-center gap-1"
                style={{ fontSize: "0.68rem", color: "#9a8f80" }}
              >
                <span
                  className="rounded-circle d-inline-block"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#76a882",
                  }}
                />
                <span>Ruang Kolaborasi &amp; Feed Kode</span>
              </div>
            </div>
          </Link>

          {/* Desktop Center Nav */}
          <nav className="d-none d-md-flex align-items-center gap-1 p-1 rounded-pill smoked-glass">
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
                  className="position-relative px-2.5 py-1 text-decoration-none d-inline-flex align-items-center gap-1.5"
                  style={{
                    fontSize: "0.76rem",
                    color: active ? "#120f0c" : "#c7bdb0",
                    fontWeight: active ? 600 : 400,
                    zIndex: 1,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="position-absolute top-0 start-0 w-100 h-100 rounded-pill"
                      style={{
                        backgroundColor: "#c5a059",
                        zIndex: -1,
                      }}
                    />
                  )}
                  <Icon weight={active ? "fill" : "regular"} size={15} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Action */}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="d-flex align-items-center gap-1.5">
                <span
                  className="px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1"
                  style={{
                    background: "rgba(197, 160, 89, 0.1)",
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
              <Link
                href="/login"
                className="btn btn-sm btn-sogan px-3 py-1"
                style={{ fontSize: "0.76rem" }}
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Floating Glass Dock */}
      <nav
        className="d-md-none position-fixed bottom-0 start-50 translate-middle-x mb-3 px-1.5 py-1.5 smoked-glass d-flex align-items-center gap-0.5"
        style={{ zIndex: 50 }}
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
              className="position-relative px-2 py-1.5 text-decoration-none d-flex flex-column align-items-center"
              style={{
                color: active ? "#120f0c" : "#b8ad9e",
                fontSize: "0.63rem",
                fontWeight: active ? 600 : 400,
                zIndex: 1,
              }}
            >
              {active && (
                <motion.span
                  layoutId="mobile-dock-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                  style={{ backgroundColor: "#c5a059", zIndex: -1 }}
                />
              )}
              <Icon weight={active ? "fill" : "regular"} size={17} />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
