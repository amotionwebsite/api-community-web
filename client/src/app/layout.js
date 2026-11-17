import localFont from "next/font/local";
import "./globals.css";

const utendoFont = localFont({
  src: "../fonts/Utendo-Bold.ttf",
  variable: "--font-utendo",
  display: "swap",
});

export const metadata = {
  title: "Anak Programmer Indonesia",
  description: "Tempat Ngoding, Diskusi Error, dan Pamer Karya Bareng.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={utendoFont.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
