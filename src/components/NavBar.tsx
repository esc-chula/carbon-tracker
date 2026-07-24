"use client";

import { useAuth } from "@/sections/login/context/auth-provider";
import { dashboardKeys } from "@/services/dashboard/query/dashboard-query";
import theme from "@/styles/theme/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControl,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// ---------------------------------------------------------------------------------

export default function NavBar() {
  // --------------------------- Hook ---------------------------

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOutAll } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dashboard = useQuery({
    ...dashboardKeys.overviewOptions({}),
    enabled: !!user,
  });

  // --------------------------- Function ---------------------------

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", year);
    router.push(`/dashboard?${params.toString()}`);
  };

  // --------------------------- Value ---------------------------

  const redColor = "#B71931";
  const currentYear = dashboard.data?.dashboard.current_year;
  const selectedAcademicYear =
    searchParams.get("year") ?? String(currentYear ?? "");
  const availableYears = dashboard.data?.dashboard.available_years ?? [];

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
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={selectedAcademicYear}
                    IconComponent={KeyboardArrowDownIcon}
                    disabled={!availableYears.length}
                    onChange={(event) => handleYearChange(event.target.value)}
                    MenuProps={{
                      slotProps: {
                        paper: {
                          sx: {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                    sx={{
                      minWidth: 180,
                      height: 40,
                      borderRadius: 2,
                      border: "2px solid #E5E8EB",
                      fontWeight: 400,
                      "& fieldset": {
                        border: "none",
                      },
                      "& .MuiSelect-icon": {
                        color: "#637381",
                      },
                    }}
                  >
                    {availableYears.map((year) => (
                      <MenuItem key={year} value={String(year)}>
                        ปีการศึกษา {year + 543}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  color="inherit"
                  startIcon={
                    <Box
                      component="img"
                      src="/assets/icons/ic-dashboard.svg"
                      sx={{ width: 20, height: 20 }}
                    />
                  }
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
