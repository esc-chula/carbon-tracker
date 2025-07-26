"use client";

import theme from "@/styles/theme/theme";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter();

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        p: 5,
      }}
    >
      <Card sx={{ display: "flex", width: 740, height: 188, p: 4, gap: 5 }}>
        <CardMedia
          component="img"
          sx={{
            width: 100,
            height: "100%",
            objectFit: "contain",
          }}
          image="/submit-mark.svg"
        />
        <Box>
          <CardContent sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: "64px",
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: "80px",
              }}
            >
              ส่งแบบฟอร์มสำเร็จ
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                lineHeight: "36px",
                color: theme.palette.grayOpa[90],
              }}
            >
              กรุณารอการตรวจสอบข้อมูลโดยฝ่ายความยั่งยืน
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Button
        size="medium"
        variant="contained"
        sx={{
          fontSize: "16px",
          lineHeight: "24px",
        }}
        onClick={() => router.push("/")}
      >
        กลับสู่หน้าหลัก
      </Button>
      <Typography
        sx={{
          fontSize: "40px",
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: "56px",
        }}
      >
        โครงการ ค่ายวิศนุกรรมบุตร ครั้งที่ 60
      </Typography>
      <Stack direction="row">
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: "36px",
            }}
          >
            ปล่อยก๊าซเรือนกระจกรวมทั้งสิ้น...
          </Typography>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: "64px",
            }}
          >
            48 tonsCO₂
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            height: 500,
            width: 750,
          }}
          src="/submit.svg"
        />
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: "36px",
            }}
          >
            เปรียบได้เท่ากับ...
          </Typography>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: "64px",
            }}
          >
            ขับรถรอบโลก 18 รอบ
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
