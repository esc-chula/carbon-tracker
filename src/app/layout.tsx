import "@/styles/globals.css";

import type { Metadata } from "next";
import { Manrope, Noto_Sans_Thai } from "next/font/google";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Carbon Tracker",
  description:
    "Carbon Tracker is a web application that helps you track your carbon footprint and make more sustainable choices.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-thai",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${notoSansThai.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
