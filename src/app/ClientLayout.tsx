"use client";

import theme from "@/styles/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        {children}
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}
