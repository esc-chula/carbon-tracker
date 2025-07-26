"use client";
import ProjectTable from "@/components/ProjectTable";
import theme from "@/styles/theme/theme";
import { AddCircleOutline, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import StatusChips, { type ChipVariant } from "./StatusChips";

const options: ChipVariant[] = ["approved", "pending", "drafted", "rejected"];

function createData(
  id: string,
  name: string,
  status: ChipVariant,
  updatedDate: string,
  updatedBy: string,
) {
  return { id, name, status, updatedDate, updatedBy };
}

const rows = [
  createData(
    "0002",
    "ระบบจัดการการเข้าเรียน",
    "pending",
    "21/07/2568",
    "นางสาวจิราภรณ์ ใจดี",
  ),
  createData(
    "0003",
    "แอปพลิเคชันซ่อมบำรุงอาคาร",
    "approved",
    "18/07/2568",
    "นายธนพล ศรีสุข",
  ),
  createData(
    "0004",
    "ระบบจองห้องปฏิบัติการ",
    "rejected",
    "19/07/2568",
    "นางสาววริศรา กล้าหาญ",
  ),
  createData(
    "0005",
    "แอปติดตามการใช้พลังงาน",
    "drafted",
    "22/07/2568",
    "นายภูวดล แสงทอง",
  ),
  createData(
    "0007",
    "โครงการวัดคุณภาพอากาศในคณะ",
    "pending",
    "21/07/2568",
    "นางสาวจิราภรณ์ ใจดี",
  ),
  createData(
    "0008",
    "ระบบตรวจสอบความปลอดภัยห้องแลป",
    "approved",
    "18/07/2568",
    "นายธนพล ศรีสุข",
  ),
  createData(
    "0009",
    "แอปแจ้งเตือนเวลารถรับส่ง",
    "rejected",
    "19/07/2568",
    "นางสาววริศรา กล้าหาญ",
  ),
  createData(
    "0010",
    "ระบบยืมอุปกรณ์แลปออนไลน์",
    "drafted",
    "22/07/2568",
    "นายภูวดล แสงทอง",
  ),
  createData(
    "0012",
    "ระบบช่วยเหลือด้านวิชาการ",
    "pending",
    "21/07/2568",
    "นางสาวจิราภรณ์ ใจดี",
  ),
  createData(
    "0013",
    "แอปติดตามความคืบหน้างานโปรเจกต์",
    "approved",
    "18/07/2568",
    "นายธนพล ศรีสุข",
  ),
  createData(
    "0014",
    "ระบบแนะนำวิชาเลือก",
    "rejected",
    "19/07/2568",
    "นางสาววริศรา กล้าหาญ",
  ),
  createData(
    "0015",
    "แอปพลิเคชันบริหารเวลาสำหรับนิสิต",
    "drafted",
    "22/07/2568",
    "นายภูวดล แสงทอง",
  ),
  createData(
    "0017",
    "ระบบลงทะเบียนกิจกรรมเสริมหลักสูตร",
    "pending",
    "21/07/2568",
    "นางสาวจิราภรณ์ ใจดี",
  ),
  createData(
    "0018",
    "แพลตฟอร์มรีวิววิชาจากรุ่นพี่",
    "approved",
    "18/07/2568",
    "นายธนพล ศรีสุข",
  ),
  createData(
    "0019",
    "แอปแนะนำเส้นทางเดินในคณะ",
    "rejected",
    "19/07/2568",
    "นางสาววริศรา กล้าหาญ",
  ),
  createData(
    "0020",
    "ระบบประเมินความพึงพอใจอาจารย์",
    "drafted",
    "22/07/2568",
    "นายภูวดล แสงทอง",
  ),
];

export default function Projects() {
  const [status, setStatus] = useState<ChipVariant[]>([]);
  const [search, setSearch] = useState<string>("");

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        row.id.toLowerCase().includes(search.toLowerCase()) ||
        row.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        !status || status.length === 0 || status.includes(row.status);
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const handleStatusChange = (e: any) => {
    const value = e.target.value;
    setStatus(Array.isArray(value) ? value : []);
  };

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
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
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          รายการโครงการ
        </Typography>
        <Button
          size="medium"
          variant="contained"
          startIcon={<AddCircleOutline />}
          sx={{ fontSize: "16px", lineHeight: "24px" }}
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
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: { endAdornment: <Search fontSize="medium" /> },
              }}
              fullWidth
            />
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="status-select-label">สถานะ</InputLabel>
              <Select
                labelId="status-select-label"
                multiple
                value={status}
                onChange={handleStatusChange}
                input={<OutlinedInput label="สถานะ" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((option, index) => (
                      <StatusChips key={index} variantType={option} />
                    ))}
                  </Box>
                )}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={status.includes(option)} />
                    <StatusChips variantType={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={"12px"} sx={{ alignItems: "center" }}>
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
              label={`${rows.length} โครงการ`}
              sx={{ backgroundColor: "#E6F1ED", color: "#013020" }}
            />
          </Stack>

          <ProjectTable rows={filteredRows} />
        </Stack>
      </Paper>
    </Container>
  );
}
