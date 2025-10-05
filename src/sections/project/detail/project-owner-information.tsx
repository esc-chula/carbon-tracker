import ContainerWithOutlined from "@/components/container/container-with-outlined";
import type { TGetProjectResponse } from "@/types/project/get-project";
import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------------

type TProjectOwnerInformationProps = {
  data: TGetProjectResponse["project"]["owner"];
  children?: ReactNode;
};

function ProjectOwnerInformation({ data, children }: TProjectOwnerInformationProps) {
  // --------------------------- Values ---------------------------

  const phoneNumberText =
    (data?.phone_number.length ?? 0 >= 10)
      ? `${data?.phone_number.substring(0, 3)}-${data?.phone_number.substring(3, 6)}-${data?.phone_number.substring(6, 10)}`
      : data?.phone_number;

  // --------------------------- Render ---------------------------

  return (
    <ContainerWithOutlined>
      <Typography variant="h5" fontSize={16}>
        ข้อมูลผู้กรอกแบบฟอร์ม
      </Typography>

      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          ชื่อ-นามสกุล
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data?.fullname}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          ชื่อเล่น
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data?.nickname}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          รหัสนิสิต
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data?.student_id}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          ภาคที่เรียน
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data?.major}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          เบอร์โทรศัพท์
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {phoneNumberText}
        </Typography>
      </Stack>

      {children}
    </ContainerWithOutlined>
  );
}

export default ProjectOwnerInformation;
