import React from "react";
import { Chip, styled, type ChipProps } from "@mui/material";

export type ChipVariant =
  | "submit"
  | "pending"
  | "approved"
  | "rejected"
  | "drafted";

interface StatusChipProps extends ChipProps {
  variantType?: ChipVariant;
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "variantType",
})<{ variantType?: ChipVariant }>(({ variantType }) => {
  const variantStyles: Record<
    ChipVariant,
    { backgroundColor: string; color: string }
  > = {
    submit: { backgroundColor: "#D7EEFC", color: "#003768" },
    pending: { backgroundColor: "#F9F0D5", color: "#876607" },
    approved: { backgroundColor: "#D8FBDE", color: "#0A5554" },
    rejected: { backgroundColor: "#FFEBEB", color: "#7A092E" },
    drafted: { backgroundColor: "#E9EAEB", color: "#212B36" },
  };

  return variantType ? variantStyles[variantType] : {};
});

const StatusChips: React.FC<StatusChipProps> = ({ variantType, ...props }) => {
  const variantLabels: Record<ChipVariant, string> = {
    submit: "ส่งแล้ว",
    pending: "กำลังตรวจ",
    approved: "ผ่านการตรวจ",
    rejected: "ไม่ผ่านการตรวจ",
    drafted: "แบบร่าง",
  };

  const label = variantType ? variantLabels[variantType] : "";

  return (
    <StyledChip
      variantType={variantType}
      label={label}
      {...props}
      size="small"
    />
  );
};

export default StatusChips;
