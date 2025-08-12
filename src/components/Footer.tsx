import theme from "@/styles/theme/theme";
import { Box, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        flexGrow: 1,
        p: "80px",
        pb: "40px",
        backgroundColor: theme.palette.background.default,
        marginTop: 3,
      }}
    >
      <Stack direction="row">
        <Stack direction="column" spacing={3} sx={{ width: "40%" }}>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
            }}
            src="/esc-logo.svg"
          />
          <Typography>
            วิศวกรรมศาสตร์
            <br />
            จุฬาลงกรณ์มหาวิทยาลัย
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", flexGrow: 1 }}
        >
          <Stack spacing={3}>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "36px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              ฝ่ายจัดทำเว็ปไซต์
            </Typography>
            <Stack spacing={2}>
              <Typography>ฝ่ายเทคโนโลยี (TECH)</Typography>
              <Typography>ฝ่ายความยั่งยืน (SUSTAIN)</Typography>
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "36px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              เพิ่มเติม
            </Typography>
            <Typography>รูปแบบไฟล์ CSV</Typography>
          </Stack>
          <Stack spacing={3}>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "36px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              ติดต่อเรา
            </Typography>
            <Typography>IG: escchula</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography mt={10}>Copyright © 2025 | esc chula</Typography>
    </Box>
  );
}
