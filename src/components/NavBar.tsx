"use client";

import theme from "@/styles/theme/theme";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.default,
          px: 5,
          boxShadow: "none",
        }}
      >
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
            }}
            src="/esc-logo.svg"
          />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderStyle: "dashed", height: 28, alignSelf: "center" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            <Box sx={{ padding: "14px" }}>
              <Button
                color="inherit"
                startIcon={
                  <Box
                    component="img"
                    sx={{
                      height: 24,
                      width: 24,
                    }}
                    src="/listview.svg"
                  />
                }
                onClick={() => router.push("/create-project")}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.body1.fontSize,
                    lineHeight: theme.typography.body1.lineHeight,
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  }}
                >
                  กรอกแบบฟอร์ม
                </Typography>
              </Button>
            </Box>
            <Box sx={{ padding: "14px" }}>
              <Button
                color="inherit"
                startIcon={
                  <Box
                    component="img"
                    sx={{
                      height: 24,
                      width: 24,
                    }}
                    src="/questionmark.svg"
                  />
                }
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.body1.fontSize,
                    lineHeight: theme.typography.body1.lineHeight,
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  }}
                >
                  ความช่วยเหลือ
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
