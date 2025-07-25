import theme from "@/styles/theme/theme";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.background.default, px: 5 }}
      >
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
            }}
            src="esc-logo.svg"
          />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderStyle: "dashed", height: 28, alignSelf: "center" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            startIcon={
              <Box
                component="img"
                sx={{
                  height: 24,
                  width: 24,
                }}
                src="listview.svg"
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
              กรอกแบบฟอร์ม
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
                src="questionmark.svg"
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
