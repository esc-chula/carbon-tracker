import ContainerWithOutlined from "@/components/container/container-with-outlined";
import {
  TableCustom,
  type DisplayColumn,
} from "@/components/table/table-custom";
import { transFormDateToThai } from "@/helper/formatter/date-formatter";
import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { FacilityMapper } from "../helper/value-mapper";
import type { CarbonInput } from "@/types/project/project";

// ---------------------------------------------------------------------------------

type Scope2BuildingRow = {
  name: string;
  room: string;
  start_time: string;
  end_time: string;
  facilities: string;
};

type Scope2MeterRow = {
  facilities: string;
  name: string;
  room: string;
  meter_value: number;
  unit: string;
};

type TProjectSecondScopeInformationProps = {
  data: CarbonInput["energy"] | undefined;
  carbon?: number;
  children?: ReactNode;
};

function ProjectSecondScopeInformation({
  data,
  children,
}: TProjectSecondScopeInformationProps) {
  // --------------------------- Values ---------------------------

  const buildingColumns: DisplayColumn<Scope2BuildingRow>[] = [
    { id: "name", label: "อาคารที่ใช้", width: 250 },
    { id: "room", label: "ห้องที่ใช้", width: 250 },
    { id: "facilities", label: "อุปกรณ์ที่ใช้", width: 220 },
    { id: "start_time", label: "วันและเวลาเริ่มใช้", width: 220 },
    { id: "end_time", label: "วันและเวลาหยุดใช้", width: 220 },
  ];

  const meterColumns: DisplayColumn<Scope2MeterRow>[] = [
    { id: "facilities", label: "อุปกรณ์ที่ใช้", width: 250 },
    { id: "name", label: "อาคารที่ใช้", width: 250 },
    { id: "room", label: "ห้องที่ใช้", width: 220 },
    { id: "meter_value", label: "ปริมาณพลังงานที่ใช้", width: 220 },
    { id: "unit", label: "หน่วย", width: 220 },
  ];

  const energyItems = data?.items ?? [];

  const buildingRows: Scope2BuildingRow[] = energyItems
    .filter((item) => item.type === "building")
    .map((building) => ({
      name: building.name,
      room: building.room,
      facilities: building.facilities
        .map((facility) => FacilityMapper(facility))
        .join(", "),
      start_time: transFormDateToThai(building.start_time),
      end_time: transFormDateToThai(building.end_time),
    }));

  const meterRows: Scope2MeterRow[] = energyItems
    .filter((item) => item.type === "meter")
    .map((meter) => ({
      facilities: "มิเตอร์",
      name: meter.name,
      room: meter.room,
      meter_value: meter.meter_value,
      unit: "kWh",
    }));

  const generatorUsage = energyItems
    .filter((item) => item.type === "generator")
    .reduce((sum, generator) => sum + generator.value, 0);

  return (
    <ContainerWithOutlined>
      <Stack direction="row" spacing={1.5}>
        <Stack spacing={1.5}>
          <Typography variant="h5" fontSize={16}>
            การปล่อยก๊าซเรือนกระจกจากการใช้พลังงาน
          </Typography>
          <Typography variant="caption" color="text.secondary">
            สามารถประมาณได้จากบิลงบประมาณจบโครงการ
          </Typography>
        </Stack>
      </Stack>

      <TableCustom
        rows={buildingRows}
        columns={buildingColumns}
        showIndex
        indexHeader="รายการที่"
      />

      <TableCustom
        rows={meterRows}
        columns={meterColumns}
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
