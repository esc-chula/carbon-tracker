import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

// import font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "@/styles/theme";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Carbon Tracker",
  description:
    "Carbon Tracker is a web application that helps you track your carbon footprint and make more sustainable choices.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
