"use client";
import ProjectTable from "@/components/ProjectTable";
import theme from "@/styles/theme/theme";
import { AddCircleOutline, Search } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const options = [
  "ส่งแล้ว",
  "กำลังตรวจ",
  "ผ่านการตรวจ",
  "ไม่ผ่านการตรวจ",
  "แบบร่าง",
];

export default function Projects() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            py: 4,
            fontSize: "40px",
            lineHeight: "56px",
          }}
        >
          รายการโครงการ
        </Typography>
        <Button
          size="medium"
          variant="contained"
          startIcon={<AddCircleOutline />}
          sx={{
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          เพิ่มโครงการ
        </Button>
      </Box>

      <Paper sx={{ p: 2, borderRadius: 1.5 }}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              size="medium"
              label="ค้นหาด้วยรหัสโครงการหรือชื่อโครงการ"
              slotProps={{
                input: {
                  endAdornment: <Search fontSize="medium" />,
                },
              }}
              fullWidth
            />
            <Autocomplete
              options={options}
              value={status}
              onChange={(_, newValue) => setStatus(newValue ?? null)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="สถานะ" />}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={"12px"}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                lineHeight: "36px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              โครงการทั้งหมด
            </Typography>
            <Chip
              size="small"
              label="27 โครงการ"
              sx={{
                backgroundColor: "#E6F1ED",
                color: "#013020",
              }}
            />
          </Stack>
          <ProjectTable />
        </Stack>
      </Paper>
    </Container>
  );
}
