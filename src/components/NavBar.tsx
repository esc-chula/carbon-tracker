"use client";

import { useAuth } from "@/sections/login/context/auth-provider";
import theme from "@/styles/theme/theme";
import { Dashboard } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ---------------------------------------------------------------------------------

export default function NavBar() {
  // --------------------------- Hook ---------------------------

  const router = useRouter();
  const { user, signOutAll } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // --------------------------- Function ---------------------------

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --------------------------- Value ---------------------------

  const redColor = "#B71931";

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
          <Stack direction="row" spacing={3} alignItems="center">
            {!user && (
              <Button
                color="inherit"
                startIcon={
                  <Box
                    component="img"
                    src="/questionmark.svg"
                    sx={{ width: 24, height: 24 }}
                  />
                }
                // onClick={() => router.replace("/")}
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
            )}

            {user && (
              <>
                <Button
                  color="inherit"
                  startIcon={<Dashboard sx={{ color: "#000000" }} />}
                  onClick={() => router.replace("/dashboard")}
                >
                  <Typography
                    sx={{
                      fontSize: theme.typography.body1.fontSize,
                      lineHeight: theme.typography.body1.lineHeight,
                      fontWeight: theme.typography.fontWeightBold,
                      color: theme.palette.common.black,
                    }}
                  >
                    แดชบอร์ด
                  </Typography>
                </Button>

                <Button
                  color="inherit"
                  startIcon={
                    <Box
                      component="img"
                      src="/assets/icons/ic-list.svg"
                      sx={{ width: 20, height: 20 }}
                    />
                  }
                  onClick={() => router.replace("/")}
                >
                  <Typography
                    sx={{
                      fontSize: theme.typography.body1.fontSize,
                      lineHeight: theme.typography.body1.lineHeight,
                      fontWeight: theme.typography.fontWeightBold,
                      color: theme.palette.common.black,
                    }}
                  >
                    รายการโครงการ
                  </Typography>
                </Button>

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
                  onClick={() => router.push("/project/create")}
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

                <Button
                  color="inherit"
                  startIcon={
                    <Box
                      component="img"
                      src="/assets/icons/ic-setting.svg"
                      sx={{ width: 20, height: 20 }}
                    />
                  }
                  onClick={handleClick}
                >
                  <Typography
                    sx={{
                      fontSize: theme.typography.body1.fontSize,
                      lineHeight: theme.typography.body1.lineHeight,
                      fontWeight: theme.typography.fontWeightBold,
                      color: theme.palette.common.black,
                    }}
                  >
                    ตั้งค่า
                  </Typography>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                        borderRadius: 2,
                        minWidth: 180,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose} sx={{ py: 0.75 }}>
                    <ListItemIcon>
                      <Box
                        component="img"
                        src="/questionmark.svg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="ความช่วยเหลือ"
                      slotProps={{ primary: { fontSize: "14px" } }}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      void signOutAll();
                    }}
                    sx={{ py: 0.75 }}
                  >
                    <ListItemIcon>
                      <Box
                        component="img"
                        src="/assets/icons/ic-logout.svg"
                        sx={{
                          width: 22,
                          height: 22,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="ออกจากระบบ"
                      slotProps={{
                        primary: { fontSize: "14px", color: redColor },
                      }}
                    />
                  </MenuItem>
                </Menu>
              </>
            )}

            {!user && (
              <Button
                color="inherit"
                startIcon={
                  <Box
                    component="img"
                    sx={{
                      height: 24,
                      width: 24,
                    }}
                    src="/assets/icons/ic-login.svg"
                  />
                }
                onClick={() => router.replace("/login")}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.body1.fontSize,
                    lineHeight: theme.typography.body1.lineHeight,
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  }}
                >
                  เข้าสู่ระบบ
                </Typography>
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
