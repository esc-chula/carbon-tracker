"use client";

import React from "react";
import { Box } from "@mui/material";

export default function CreateProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        paddingX: 5,
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
}
