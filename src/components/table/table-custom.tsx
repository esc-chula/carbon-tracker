import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material";

export type DisplayColumn<T extends object> = {
  id: keyof T;
  label: React.ReactNode;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: number | string;
  minWidth?: number | string;
};

export type TTableCustomProps<
  T extends Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    React.ReactNode | string | number | boolean | null | undefined
  >,
> = {
  rows: T[];
  columns: Array<DisplayColumn<T>>;
  getRowId?: (row: T, index: number) => string | number;
  showIndex?: boolean;
  indexHeader?: React.ReactNode;
  sx?: SxProps<Theme>;
  dense?: boolean;
};

export function TableCustom<
  T extends Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    React.ReactNode | string | number | boolean | null | undefined
  >,
>({
  rows,
  columns,
  getRowId,
  showIndex = false,
  indexHeader = "ลำดับ",
  sx,
}: TTableCustomProps<T>) {
  const theme = useTheme();
  const borderColor = theme.palette.grayOpa[24];
  const headerBg = theme.palette.grayOpa[8];

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        ...sx,
      }}
    >
      <Table
        sx={{
          width: "auto",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: headerBg,
              "& th": {
                border: "none",
                borderBottom: `1px solid ${borderColor}`,
              },
              "& th:first-of-type": {
                borderTopLeftRadius: 12,
              },
              "& th:last-of-type": {
                borderTopRightRadius: 12,
              },
            }}
          >
            {showIndex && (
              <TableCell
                sx={{ fontWeight: 600, p: 2, width: 120, minWidth: 120 }}
              >
                <Typography variant="h5" fontSize={14}>
                  {indexHeader}
                </Typography>
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={String(col.id)}
                align={col.align ?? "left"}
                sx={{
                  p: 2,
                  width: col.width,
                  minWidth: col.width,
                  maxWidth: col.width,
                  fontWeight: 600,
                }}
              >
                <Typography variant="h5" fontSize={14}>
                  {col.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody sx={{ border: "1px solid #000000" }}>
          {rows.length === 0 ? (
            <TableRow
              sx={{
                td: {
                  borderBottom: `1px solid ${borderColor}`,
                },
                "&:last-of-type td:last-of-type": {
                  borderBottomRightRadius: 12,
                },
                "&:last-of-type td:first-of-type": {
                  borderBottomLeftRadius: 12,
                },
                "& td:first-of-type": {
                  borderLeft: `1px solid ${borderColor}`,
                },
                "& td:last-of-type": {
                  borderRight: `1px solid ${borderColor}`,
                },
              }}
            >
              {showIndex && (
                <TableCell sx={{ p: 2, fontWeight: 500 }}>-</TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  align={col.align ?? "left"}
                  sx={{ p: 2, fontWeight: 500 }}
                >
                  -
                </TableCell>
              ))}
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow
                key={String(getRowId?.(row, rowIndex) ?? rowIndex)}
                sx={{
                  td: {
                    borderBottom: `1px solid ${borderColor}`,
                  },
                  "&:last-of-type td:last-of-type": {
                    borderBottomRightRadius: 12,
                  },
                  "&:last-of-type td:first-of-type": {
                    borderBottomLeftRadius: 12,
                  },
                  "& td:first-of-type": {
                    borderLeft: `1px solid ${borderColor}`,
                  },
                  "& td:last-of-type": {
                    borderRight: `1px solid ${borderColor}`,
                  },
                }}
              >
                {showIndex && (
                  <TableCell sx={{ p: 2, fontWeight: 500 }}>
                    {rowIndex + 1}
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={String(col.id)}
                    align={col.align ?? "left"}
                    sx={{ p: 2, fontWeight: 500 }}
                  >
                    {col.render ? col.render(row, rowIndex) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableCustom;
