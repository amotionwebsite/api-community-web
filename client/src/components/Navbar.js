"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  SquaresFour,
  Compass,
  ChatsTeardrop,
  Cube,
  Quotes,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { useAuthStore } from "../store/useAuthStore";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: SquaresFour },
  { href: "/", label: "Utas", icon: Compass },
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
                <span>Ruang Kolaborasi &amp; Utas Kode</span>
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
