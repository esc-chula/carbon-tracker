"use client";

import theme from "@/styles/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { LocalizationProvider, type AdapterFormats } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const configDatePicker: Partial<AdapterFormats> = {
    year: "BBBB",
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="th"
      dateFormats={configDatePicker}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        {children}
        <Footer />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
