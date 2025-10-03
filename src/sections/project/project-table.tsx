"use client";
import StatusChips from "@/components/StatusChips";
import { SvgColor } from "@/components/svg/svg-color";
import {
  fetchGetCertificate,
  projectsQueryKeys,
} from "@/services/project/query/project-query";
import theme from "@/styles/theme/theme";
import type { TListProjectsItem } from "@/types/project/list-project";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import ProjectPopoverMenu from "./project-popover-menu";
import { showError, showSuccess } from "@/components/toast/toast";
import { useRouter } from "next/navigation";
import { useDeleteProjectMutation } from "@/services/project/mutation";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { useBoolean } from "@/hooks/use-boolean";

dayjs.extend(buddhistEra);

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

type TProjectTableProps = {
  rows: Array<TListProjectsItem>;

  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
};

export default function ProjectTable({
  count,
  rows,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}: TProjectTableProps) {
  // --------------------------- Hook ---------------------------

  const router = useRouter();
  const queryClient = useQueryClient();

  const openDialog = useBoolean();

  const [projectId, setProjectId] = useState<string>();

  // --------------------------- API ---------------------------

  const generateCertificate = useMutation({
    mutationFn: fetchGetCertificate,
    onSuccess: (data) => {
      if (!(data.blob instanceof Blob)) return;
      const url = URL.createObjectURL(data.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      showSuccess("พิมพ์ใบรับรองสำเร็จ");
    },
    onError: () => {
      showError("พิมพ์ใบรับรองไม่สำเร็จ");
    },
  });

  const { mutate, isPending } = useDeleteProjectMutation();

  // --------------------------- Function ---------------------------

  const handleExport = (projectId: string) => {
    generateCertificate.mutate({ id: projectId });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (targetProjectId: string) => {
    setProjectId(targetProjectId);
    openDialog.onTrue();
  };

  const handleCloseDialog = () => {
    openDialog.onFalse();
    setProjectId(undefined);
  };

  const handleConfirmDelete = () => {
    if (!projectId) return;

    mutate(
      { id: projectId },
      {
        onSuccess: () => {
          showSuccess("ลบโครงการสำเร็จ");
          void queryClient.invalidateQueries({
            queryKey: projectsQueryKeys.all(),
          });
          handleCloseDialog();
        },
        onError: () => {
          showError("ลบโครงการไม่สำเร็จ");
          handleCloseDialog();
        },
      },
    );
  };

  // --------------------------- Render ---------------------------

  return (
    <>
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
                <StyledTableCell sx={{ minWidth: 80 }} />
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflow: "scroll" }}>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <StyledTableCell>{row.custom_id}</StyledTableCell>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell>
                    <StatusChips variantType={row.status} />
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(row.updated_at).format("DD/MM/BBBB")}
                  </StyledTableCell>
                  <StyledTableCell>{row.updated_by}</StyledTableCell>
                  <StyledTableCell align="center">
                    <ProjectPopoverMenu>
                      <MenuItem
                        onClick={() => handleExport(row.id)}
                        disabled={row.status !== "approved"}
                      >
                        <Stack
                          spacing={1.5}
                          direction="row"
                          alignItems="center"
                        >
                          <SvgColor src="/assets/icons/ic-document.svg" />

                          <Typography variant="subtitle2" fontWeight={500}>
                            พิมพ์ใบรับรอง
                          </Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem
                        onClick={() => router.push(`/project/${row.id}`)}
                      >
                        <Stack
                          spacing={1.5}
                          direction="row"
                          alignItems="center"
                        >
                          <SvgColor src="/assets/icons/ic-eye.svg" />

                          <Typography variant="subtitle2" fontWeight={500}>
                            ดูข้อมูลคาร์บอน
                          </Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(row.id)}>
                        <Stack
                          spacing={1.5}
                          direction="row"
                          alignItems="center"
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color="#B71931"
                          />

                          <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            color="#B71931"
                          >
                            ลบ
                          </Typography>
                        </Stack>
                      </MenuItem>
                    </ProjectPopoverMenu>
                  </StyledTableCell>
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
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="แถวต่อหน้า"
          labelDisplayedRows={({ count }) =>
            `${page + 1} จาก ${Math.ceil(count / rowsPerPage)}`
          }
        />
      </Stack>

      <ConfirmDialog
        key={`${projectId}-${openDialog.value}`}
        open={openDialog.value}
        title={<Box component="img" src="/assets/icons/ic-trash-dialog.svg" />}
        content={
          <Stack spacing={1}>
            <Typography variant="h3">
              ข้อมูลของโครงการจะถูกลบอย่างถาวร
            </Typography>
            <Typography variant="h5" fontWeight={500} color="#637381">
              ข้อมูลของโครงการจะถูกลบอย่างถาวร
            </Typography>
          </Stack>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isPending || !projectId}
          >
            ลบ
          </Button>
        }
        onClose={handleCloseDialog}
      />
    </>
  );
}
