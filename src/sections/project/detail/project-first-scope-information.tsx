import ContainerWithOutlined from "@/components/container/container-with-outlined";
import {
  TableCustom,
  type DisplayColumn,
} from "@/components/table/table-custom";
import type { TGetProjectResponse } from "@/types/project/get-project";
import type { Scope1Activity } from "@/types/project/project";
import { ActivityNameMapper, ActivityUnitMapper } from "../helper/value-mapper";
import { Stack, Typography } from "@mui/material";

// ---------------------------------------------------------------------------------

type TProjectFirstScopeInformationProps = {
  data: TGetProjectResponse["project"]["carbon_detail"]["scope1"]["activities"];
};

function ProjectFirstScopeInformation({
  data,
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
      <Stack spacing={0.5}>
        <Typography variant="h5" fontSize={16}>
          Scope 1 : ปริมาณการปล่อยก๊าซเรือนกระจกทางตรง
        </Typography>
        <Typography variant="caption" color="text.secondary">
          สามารถประมาณได้จากบิลงบประมาณจบโครงการ
        </Typography>
      </Stack>

      <TableCustom
        rows={rows}
        columns={columns}
        showIndex
        indexHeader="รายการที่"
      />
    </ContainerWithOutlined>
  );
}

export default ProjectFirstScopeInformation;
