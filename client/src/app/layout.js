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

const coolveticaFont = localFont({
  src: "../fonts/Coolvetica Rg.otf",
  variable: "--font-coolvetica",
  display: "swap",
});

const utendoFont = localFont({
  src: [
    {
      path: "../fonts/Utendo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Utendo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-utendo",
  display: "swap",
});

const caviarFont = localFont({
  src: "../fonts/CaviarDreams.ttf",
  variable: "--font-caviar",
  display: "swap",
});

const tommyPersonalFont = localFont({
  src: "../fonts/Tommy_Personal.otf",
  variable: "--font-tommy-personal",
  display: "swap",
});

const tommyRegularFont = localFont({
  src: "../fonts/Tommy_Regular.otf",
  variable: "--font-tommy-regular",
  display: "swap",
});

const tommyMediumFont = localFont({
  src: "../fonts/Tommy_Medium.otf",
  variable: "--font-tommy-medium",
  display: "swap",
});

const tommyExtraFont = localFont({
  src: "../fonts/Tommy_Extra.otf",
  variable: "--font-tommy-extra",
  display: "swap",
});

export const metadata = {
  title: "Anak Programmer Indonesia",
  description:
    "Rumah kolaborasi programmer Indonesia. Bedah error bareng, rilis karya, dan satu frekuensi.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      data-bs-theme="dark"
      className={`${utendoFont.variable} ${coolveticaFont.variable} ${caviarFont.variable} ${tommyPersonalFont.variable} ${tommyRegularFont.variable} ${tommyMediumFont.variable} ${tommyExtraFont.variable} ${jakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{
          backgroundColor: "#0f0d0c",
          color: "#ede6dc",
          fontFamily: "var(--font-body), sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
