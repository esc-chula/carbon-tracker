"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/styles/theme";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
