"use client";

import theme from "@/styles/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { LocalizationProvider, type AdapterFormats } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const configDatePicker: Partial<AdapterFormats> = {
    year: "BBBB",
  };

  const pathname = usePathname();

  const hideLayout = ["/login"];

  const shouldHideLayout = hideLayout.includes(pathname);

  return (
    <SessionProvider>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="th"
        dateFormats={configDatePicker}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!shouldHideLayout && <NavBar />}
          {children}
          {!shouldHideLayout && <Footer />}
        </ThemeProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
}
