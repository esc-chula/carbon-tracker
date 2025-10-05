import ContainerWithOutlined from "@/components/container/container-with-outlined";
import {
  TableCustom,
  type DisplayColumn,
} from "@/components/table/table-custom";
import { transFormDateToThai } from "@/helper/formatter/date-formatter";
import type { TGetProjectResponse } from "@/types/project/get-project";
import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { FacilityMapper } from "../helper/value-mapper";
import ProjectCarbonDetail from "../project-carbon-detail";

// ---------------------------------------------------------------------------------

type Scope2Building = {
  name: string;
  room: string;
  start_time: string;
  end_time: string;
  facilities: string;
  meter_value: number;
};

type TProjectSecondScopeInformationProps = {
  data: TGetProjectResponse["project"]["carbon_detail"]["scope2"];
  carbon: TGetProjectResponse["project"]["carbon_result"]["scope2"];
  children?: ReactNode;
};

function ProjectSecondScopeInformation({
  data,
  carbon,
  children,
}: TProjectSecondScopeInformationProps) {
  // --------------------------- Values ---------------------------

  const columns: DisplayColumn<Scope2Building>[] = [
    { id: "name", label: "อาคารที่ใช้", width: 250 },
    { id: "room", label: "ห้องที่ใช้", width: 250 },
    { id: "facilities", label: "อุปกรณ์ที่ใช้", width: 220 },
    { id: "start_time", label: "วันและเวลาเริ่มใช้", width: 220 },
    { id: "end_time", label: "วันและเวลาหยุดใช้", width: 220 },
  ];

  const rows: Scope2Building[] =
    data?.buildings?.map((building) => ({
      name: building.name,
      room: building.room,
      facilities:
        building.facilities
          ?.map((facility) => FacilityMapper(facility))
          .join(", ") ?? "",
      start_time: transFormDateToThai(building.start_time),
      end_time: transFormDateToThai(building.end_time),
      meter_value: building.meter_value,
    })) ?? [];

  const generatorUsage = data.generators?.reduce((sum, c) => sum + c.value, 0);

  const carbonUsage = carbon.building + carbon.generator;

  return (
    <ContainerWithOutlined>
      <Stack direction="row" spacing={1.5}>
        <ProjectCarbonDetail carbon={carbonUsage} />
        <Stack spacing={1.5}>
          <Typography variant="h5" fontSize={16}>
            Scope 2 : <br />
            ปริมาณการปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน
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

      <Stack direction="row" spacing={0.5}>
        <Box
          component="img"
          sx={{
            height: 20,
            width: 20,
          }}
          src="/assets/icons/ic-information.svg"
        />

        <Typography variant="body2">
          มีการใช้งานเครื่องปั่นไฟ พลังงาน {generatorUsage} หน่วย
        </Typography>
      </Stack>

      {children}
    </ContainerWithOutlined>
  );
}

export default ProjectSecondScopeInformation;
