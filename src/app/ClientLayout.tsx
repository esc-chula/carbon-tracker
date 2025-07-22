"use client";

import theme from "@/styles/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

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
