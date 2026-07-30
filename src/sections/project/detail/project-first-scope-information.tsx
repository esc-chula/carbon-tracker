import ContainerWithOutlined from "@/components/container/container-with-outlined";
import {
  TableCustom,
  type DisplayColumn,
} from "@/components/table/table-custom";
import type { Scope1Activity } from "@/types/project/project";
import { ActivityNameMapper, ActivityUnitMapper } from "../helper/value-mapper";
import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------------

type TProjectFirstScopeInformationProps = {
  data: Scope1Activity[] | null | undefined;
  carbon?: number;
  children?: ReactNode;
};

function ProjectFirstScopeInformation({
  data,
  children,
}: TProjectFirstScopeInformationProps) {
  // --------------------------- Values ---------------------------
  const columns: DisplayColumn<Scope1Activity>[] = [
    { id: "name", label: "ประเภททรัพยากร", width: 410 },
    { id: "value", label: "ปริมาณ", width: 220 },
    { id: "unit", label: "หน่วย", width: 250 },
  ];

  const rows: Scope1Activity[] =
    data?.map((activity) => ({
      name: ActivityNameMapper(activity.name),
      value: activity.value,
      unit: ActivityUnitMapper(activity.unit),
    })) ?? [];

  return (
    <ContainerWithOutlined>
      <Stack direction="row" spacing={1.5}>
        <Stack spacing={1.5}>
          <Typography variant="h5" fontSize={16}>
            การปล่อยก๊าซเรือนกระจกจากอาหารและเครื่องดื่ม
          </Typography>
          <Typography variant="caption" color="text.secondary">
            สามารถประมาณได้จากบิลงบประมาณจบโครงการ
          </Typography>
        </Stack>
      </Stack>

      <TableCustom
        rows={rows}
        columns={columns}
        showIndex
        indexHeader="รายการที่"
      />

      {children}
    </ContainerWithOutlined>
  );
}

export default ProjectFirstScopeInformation;
