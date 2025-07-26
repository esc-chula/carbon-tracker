"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/login/LoginButton";

export default function LoginPage() {
  const theme = useTheme();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "AccessDenied") {
      setShowError(true);

      const params = new URLSearchParams(window.location.search);
      params.delete("error");
      const newUrl =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Section */}
      <Grid
        size={{ xs: false, md: 6 }}
        sx={{
          backgroundColor: theme.palette.background.lightGrey,
          p: 8,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          ยินดีต้อนรับกลับมา!
        </Typography>
        <Typography variant="h4" color="textSecondary" sx={{ fontWeight: 500 }}>
          ติดตาม วิเคราะห์ และลดคาร์บอนฟุตพริ้นต์ในทุกวัน
        </Typography>
        <Image
          width={500}
          height={339}
          style={{ marginTop: "80px" }}
          src="/login/image.svg"
          alt="Carbon footprint image"
        />
      </Grid>

      {/* Right Section */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          marginX: "auto",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontSize: "32px", lineHeight: "48px" }}
            gutterBottom
          >
            เข้าสู่ระบบ
          </Typography>
          <Typography
            variant="h4"
            color="textSecondary"
            sx={{ fontWeight: 500 }}
          >
            เข้าสู่ระบบด้วย Chula Google Account
          </Typography>

          <LoginButton />
          {showError && (
            <Typography
              color="error"
              variant="subtitle2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              ต้องใช้ email @student.chula.ac.th เท่านั้น
            </Typography>
          )}
          <Divider sx={{ height: "1px", marginY: "40px" }} />
          <Typography
            variant="caption"
            display="block"
            align="center"
            color={theme.palette.primary[800]}
            sx={{ mt: 6 }}
          >
            INTANIA CARBON TRACKER
          </Typography>
        </Box>
      </Grid>
      <Image
        width={90}
        height={126}
        src="/login/esc.svg"
        alt="esc logo"
        style={{ position: "fixed", top: "20px", left: "20px" }}
      />
    </Grid>
  );
}
