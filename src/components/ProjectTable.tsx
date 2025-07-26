"use client";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TablePagination } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import theme from "@/styles/theme/theme";
import StatusChips, { type ChipVariant } from "./StatusChips";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grayOpa[24],
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: `1px solid ${theme.palette.grayOpa[24]}`,
  },
}));

type Row = {
  id: string;
  name: string;
  status: ChipVariant;
  updatedDate: string;
  updatedBy: string;
};

export default function ProjectTable({ rows }: { rows: Row[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer
      sx={{
        borderRadius: "12px",
        border: `1px solid ${theme.palette.grayOpa[24]}`,
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
            <StyledTableCell sx={{ minWidth: 220 }}>อัปเดตโดย</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
        <TableFooter>
          <TableRow>
            <TablePagination
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="แถวต่อหน้า"
              labelDisplayedRows={({ from, to, count }) =>
                `${from} จาก ${count}`
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
