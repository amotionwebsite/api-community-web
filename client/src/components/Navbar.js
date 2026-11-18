"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseLine, SignOut, UserCircle } from "@phosphor-icons/react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const isSubPage = pathname !== "/";

  return (
    <header
      className="sticky-top border-bottom"
      style={{
        backgroundColor: "rgba(15, 13, 12, 0.88)",
        backdropFilter: "blur(12px)",
        borderColor: "#2b231b",
      }}
    >
      <div className="container py-2.5" style={{ maxWidth: "680px" }}>
        <div className="d-flex align-items-center justify-content-between gap-2">
          {/* Brand */}
          <Link
            href="/"
            className="d-flex align-items-center gap-2 text-decoration-none"
          >
            <img
              src="/logoapi.png"
              alt="Logo Anak Programmer Indonesia"
              width={30}
              height={30}
              className="object-fit-contain"
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-utendo), sans-serif",
                  color: "#f3ece1",
                  fontSize: "0.85rem",
                  lineHeight: 1.15,
                }}
              >
                Anak Programmer Indonesia
              </div>
              <div
                className="d-flex align-items-center gap-1"
                style={{ fontSize: "0.68rem", color: "#9c8f80" }}
              >
                <span
                  className="rounded-circle d-inline-block"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#4ade80",
                  }}
                />
                <span>512 programmer aktif</span>
              </div>
            </div>
          </Link>

          {/* Right Action */}
          <div className="d-flex align-items-center gap-2">
            {isSubPage && (
              <Link
                href="/"
                className="btn btn-sm btn-batik-outline d-inline-flex align-items-center gap-1 rounded-pill px-2.5"
                title="Kembali ke Beranda"
              >
                <HouseLine weight="duotone" />
                <span className="d-none d-sm-inline">Home</span>
              </Link>
            )}

            {user ? (
              <div className="d-flex align-items-center gap-1.5">
                <span
                  className="badge rounded-pill d-inline-flex align-items-center gap-1 px-2.5 py-1.5"
                  style={{
                    backgroundColor: "#1d1814",
                    border: "1px solid #382d22",
                    color: "#e2c285",
                    fontWeight: 500,
                  }}
                >
                  <UserCircle weight="duotone" size={15} />
                  <span>{user.username}</span>
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-sm btn-batik-outline rounded-pill px-2"
                  title="Keluar"
                >
                  <SignOut weight="duotone" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn btn-sm btn-batik-outline rounded-pill px-3 py-1.5"
                style={{ fontSize: "0.78rem" }}
              >
                Daftar / Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
