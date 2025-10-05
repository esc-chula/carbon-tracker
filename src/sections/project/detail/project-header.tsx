import StatusChips from "@/components/StatusChips";
import type { TGetProjectResponse } from "@/types/project/get-project";
import type { TProjectStatus } from "@/types/project/list-project";
import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------------

type TProjectHeaderProps = {
  data: Pick<
    TGetProjectResponse["project"],
    "custom_id" | "title" | "status" | "owner"
  >;
  children?: ReactNode;
};

function ProjectHeader({ data, children }: TProjectHeaderProps) {
  // --------------------------- Values ---------------------------

  const phoneNumberText =
    (data?.owner?.phone_number.length ?? 0 >= 10)
      ? `${data?.owner?.phone_number.substring(0, 3)}-${data?.owner?.phone_number.substring(3, 6)}-${data?.owner?.phone_number.substring(6, 10)}`
      : data?.owner?.phone_number;

  // --------------------------- Render ---------------------------

  return (
    <Stack
      direction="column"
      spacing={0.5}
      sx={{ width: 1, padding: "16px 24px" }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4">
          [{data.custom_id}] {data.title}
        </Typography>

        <StatusChips variantType={data.status as TProjectStatus} />
      </Stack>

      <Typography variant="body2" color="text.secondary">
        ผู้กรอก: {data?.owner?.fullname} ({phoneNumberText})
      </Typography>

      {children}
    </Stack>
  );
}
// [{data.custom_id}] {data.title}

export default ProjectHeader;
