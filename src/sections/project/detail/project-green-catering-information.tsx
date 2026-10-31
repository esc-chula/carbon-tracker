import ContainerWithOutlined from "@/components/container/container-with-outlined";
import {
  TableCustom,
  type DisplayColumn,
} from "@/components/table/table-custom";
import type { Restaurant } from "@/types/project/project";
import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import {
  GreenCateringLocationMapper,
  GreenCateringPackagingMapper,
} from "../helper/value-mapper";

type TProjectGreenCateringInformationProps = {
  data: Restaurant[] | null | undefined;
  children?: ReactNode;
};

type TRestaurantRow = {
  name: string;
  location: string;
  packaging: string;
  contact: string;
};

function ProjectGreenCateringInformation({
  data,
  children,
}: TProjectGreenCateringInformationProps) {
  const columns: DisplayColumn<TRestaurantRow>[] = [
    { id: "name", label: "ชื่อร้านอาหาร", width: 250 },
    { id: "location", label: "สถานที่", width: 210 },
    { id: "packaging", label: "บรรจุภัณฑ์", width: 210 },
    { id: "contact", label: "ช่องทางการติดต่อร้าน", width: 210 },
  ];

  const rows: TRestaurantRow[] =
    data?.map((restaurant) => ({
      name: restaurant.name,
      location:
        restaurant.location.type === "other"
          ? restaurant.location.other
          : GreenCateringLocationMapper(restaurant.location.type),
      packaging:
        restaurant.packaging.type === "other"
          ? restaurant.packaging.other
          : GreenCateringPackagingMapper(restaurant.packaging.type),
      contact: restaurant.contact,
    })) ?? [];

  return (
    <ContainerWithOutlined>
      <Stack spacing={1.5}>
        <Typography variant="h5" fontSize={16}>
          Green Catering
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ข้อมูลร้านอาหารที่ใช้ภายในโครงการ
        </Typography>
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

export default ProjectGreenCateringInformation;
