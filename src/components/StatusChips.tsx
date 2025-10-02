import React from "react";
import { Chip, colors, styled, type ChipProps } from "@mui/material";
import theme from "@/styles/theme/theme";

export type ChipVariant =
  | "fixing"
  | "pending"
  | "approved"
  | "rejected"
  | "draft";

interface StatusChipProps extends ChipProps {
  variantType?: ChipVariant;
}

const variantStyles: Record<
  ChipVariant,
  { backgroundColor: string; color: string }
> = {
  fixing: { backgroundColor: "#F5EDFF", color: "#53278C" },
  pending: { backgroundColor: "#D7EEFC", color: "#13608C" },
  approved: { backgroundColor: "#D8FBDE", color: "#0A5554" },
  rejected: { backgroundColor: "#FFEBEB", color: "#7A092E" },
  draft: { backgroundColor: "#E9EAEB", color: "#212B36" },
};

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "variantType",
})<{ variantType?: ChipVariant }>(({ variantType }) => {
  return variantType ? variantStyles[variantType] : {};
});

const StatusChips: React.FC<StatusChipProps> = ({ variantType, ...props }) => {
  const variantLabels: Record<ChipVariant, string> = {
    fixing: "กำลังแก้ไข",
    pending: "กำลังตรวจ",
    approved: "ผ่านการตรวจ",
    rejected: "ไม่ผ่านการตรวจ",
    draft: "แบบร่าง",
  };
  const label = variantType ? variantLabels[variantType] : "";
  return (
    <StyledChip
      variantType={variantType}
      label={label}
      {...props}
      size="small"
      sx={{ fontWeight: theme.typography.fontWeightBold }}
    />
  );
};

export default StatusChips;
