"use client";

import theme from "@/styles/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = ["/login"];

  const shouldHideLayout = hideLayout.includes(pathname);

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!shouldHideLayout && <NavBar />}
        {children}
        {!shouldHideLayout && <Footer />}
      </ThemeProvider>
    </SessionProvider>
  );
}
