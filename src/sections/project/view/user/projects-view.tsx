"use client";

import StatusChips, { type ChipVariant } from "@/components/StatusChips";
import { useDebounce } from "@/hooks/use-debounce";
import { useSetState } from "@/hooks/use-set-state";
import { projectsQueryKeys } from "@/services/project/query/project-query";
import theme from "@/styles/theme/theme";
import { AddCircleOutline, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import type { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProjectTable from "../../project-table";

// ---------------------------------------------------------------------------------

const OPTIONS: ChipVariant[] = [
  "approved",
  "pending",
  "draft",
  "fixing",
  "rejected",
];

// ---------------------------------------------------------------------------------

export default function ProjectsView() {
  // --------------------------- Hook ---------------------------

  const [status, setStatus] = useState<ChipVariant[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const router = useRouter();

  // --------------------------- Filters ---------------------------

  const searchFilter = useSetState({
    search: "",
  });

  const debouncedSearchFilter = useDebounce(searchFilter, 1000);

  // --------------------------- API ---------------------------

  const projects = useQuery({
    ...projectsQueryKeys.listOptions({
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      search: debouncedSearchFilter.state.search,
      status: status.join(","),
      sort: "-created_at",
    }),
  });

  // --------------------------- Function ---------------------------

  const handleStatusChange = (e: SelectChangeEvent<typeof status>) => {
    const value = e.target.value;
    setStatus(Array.isArray(value) ? value : []);
  };

  const handleAddProject = () => {
    router.push("/project/create");
  };

  // --------------------------- Render ---------------------------

  return (
    <>
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
          onClick={handleAddProject}
          sx={{ fontSize: "16px", lineHeight: "24px" }}
        >
          เพิ่มโครงการ
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 1.5 }}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              size="medium"
              label="ค้นหาด้วยรหัสโครงการหรือชื่อโครงการ"
              onChange={(e) => searchFilter.setField("search", e.target.value)}
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
                {OPTIONS.map((option) => (
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
              label={`${projects.data?.count} โครงการ`}
              sx={{ backgroundColor: "#E6F1ED", color: "#013020" }}
            />
          </Stack>

          <ProjectTable
            count={projects.data?.count ?? 0}
            rows={projects.data?.projects ?? []}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Stack>
      </Paper>
    </>
  );
}
