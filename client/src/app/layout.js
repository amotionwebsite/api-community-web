import "bootstrap/dist/css/bootstrap.min.css";
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
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Anak Programmer Indonesia",
  description: "Rumah kolaborasi programmer Indonesia. Bedah error bareng, rilis karya, dan satu frekuensi.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      data-bs-theme="dark"
      className={`${utendoFont.variable} ${coolveticaFont.variable} ${robotoFont.variable}`}
    >
      <body style={{ backgroundColor: "#0f0d0c", color: "#ede6dc" }}>
        {children}
      </body>
    </html>
  );
}
