"use client";

import theme from "@/styles/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/sections/login/context/auth-provider";
import { LocalizationProvider, type AdapterFormats } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { usePathname } from "next/navigation";
import RequireAuth from "@/components/auth/require-auth";

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
    <AuthProvider>
      <RequireAuth>
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
      </RequireAuth>
    </AuthProvider>
  );
}
