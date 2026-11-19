import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
});

const coolvetica = localFont({
  src: "../fonts/Coolvetica.otf",
  variable: "--font-coolvetica",
  display: "swap",
});

const utendo = localFont({
  src: "../fonts/Utendo.ttf",
  variable: "--font-utendo",
  display: "swap",
});

export const metadata = {
  title: "Anak Programmer Indonesia",
  description: "Ruang kolaborasi, diskusi kode, dan etalase karya programmer Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} ${coolvetica.variable} ${utendo.variable}`}
    >
      <body style={{ fontFamily: "var(--font-body), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
