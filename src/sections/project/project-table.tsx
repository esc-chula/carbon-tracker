"use client";
import StatusChips, { type ChipVariant } from "@/components/StatusChips";
import theme from "@/styles/theme/theme";
import { Stack, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, type ChangeEvent } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grayOpa[24],
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: `1px solid ${theme.palette.grayOpa[24]}`,
  },
}));

// ---------------------------------------------------------------------------------

type Row = {
  id: string;
  name: string;
  status: ChipVariant;
  updatedDate: string;
  updatedBy: string;
};

export default function ProjectTable({ rows }: { rows: Row[] }) {
  // --------------------------- Hook ---------------------------

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --------------------------- Function ---------------------------

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // --------------------------- Render ---------------------------

  return (
    <Stack>
      <TableContainer
        sx={{
          borderRadius: 1.5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          border: `1px solid ${theme.palette.grayOpa[24]}`,
          borderBottomStyle: "none",
          height: "calc(100vh - 418px)",
        }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ minWidth: 170 }}>
                รหัสโครงการ
              </StyledTableCell>
              <StyledTableCell sx={{ minWidth: 250 }}>
                ชื่อโครงการ
              </StyledTableCell>
              <StyledTableCell sx={{ minWidth: 160 }}>สถานะ</StyledTableCell>
              <StyledTableCell sx={{ minWidth: 160 }}>
                วันที่อัปเดตล่าสุด
              </StyledTableCell>
              <StyledTableCell sx={{ minWidth: 220 }}>
                อัปเดตโดย
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: "calc(100vh - 600px)", overflow: "scroll" }}>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>
                  <StatusChips variantType={row.status} />
                </StyledTableCell>
                <StyledTableCell>{row.updatedDate}</StyledTableCell>
                <StyledTableCell>{row.updatedBy}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        sx={{
          borderRadius: 1.5,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          border: `1px solid ${theme.palette.grayOpa[24]}`,
        }}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="แถวต่อหน้า"
        labelDisplayedRows={({ from, count }) => `${from} จาก ${count}`}
      />
    </Stack>
  );
}
