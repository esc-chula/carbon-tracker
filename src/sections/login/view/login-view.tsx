"use client";

import { Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import LoginButton from "../login-button";

// ---------------------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{ minHeight: "100vh", background: theme.palette.common.white }}
    >
      <Grid
        size={{ xs: false, md: 6 }}
        sx={{
          p: 8,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.lightGrey,
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
        }}
      >
        <Stack width={1} maxWidth={500} spacing={5}>
          <Stack>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontSize: "32px", lineHeight: "48px" }}
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
          </Stack>

          {/* <Stack spacing={2}>
            <LoginForm
              onSubmit={() => {
                
              }}
            />
          </Stack> */}

          <LoginButton />

          <Divider sx={{ height: "1px", marginY: "40px" }} />

          <Typography
            variant="caption"
            display="block"
            align="center"
            color={theme.palette.primary[800]}
            fontSize={24}
            fontWeight={700}
            sx={{ mt: 3 }}
          >
            INTANIA CARBON TRACKER
          </Typography>
        </Stack>
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
