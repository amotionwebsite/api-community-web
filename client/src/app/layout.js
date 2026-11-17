import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";

const utendoFont = localFont({
  src: "../fonts/Utendo-Bold.ttf",
  variable: "--font-utendo",
  display: "swap",
});

const coolveticaFont = localFont({
  src: "../fonts/Coolvetica Rg.otf",
  variable: "--font-coolvetica",
  display: "swap",
});

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Anak Programmer Indonesia",
  description: "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${utendoFont.variable} ${coolveticaFont.variable} ${robotoFont.variable}`}
    >
      <body className="antialiased bg-[#09050f] text-[#f7f2fa]">
        {children}
      </body>
    </html>
  );
}
