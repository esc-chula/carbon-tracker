import { Stack, type StackProps } from "@mui/material";
import type { ReactNode } from "react";

type TContainerWithOutlinedProps = {
  borderRadius?: number;
  children: ReactNode;
} & StackProps;

function ContainerWithOutlined({
  children,
  borderRadius = 3,
  ...other
}: TContainerWithOutlinedProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: 2,
        border: (theme) => `1px solid ${theme.palette.grayOpa[24]}`,
        borderRadius: borderRadius,
      }}
      {...other}
    >
      {children}
    </Stack>
  );
}

export default ContainerWithOutlined;
