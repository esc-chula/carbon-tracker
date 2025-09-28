import ContainerWithOutlined from "@/components/container/container-with-outlined";
import type { TGetProjectResponse } from "@/types/project/get-project";
import { Stack, Typography } from "@mui/material";

// ---------------------------------------------------------------------------------

type TProjectInformationProps = {
  data: Pick<
    TGetProjectResponse["project"],
    "custom_id" | "title" | "org" | "org_detail"
  >;
};

function ProjectInformation({ data }: TProjectInformationProps) {
  return (
    <ContainerWithOutlined>
      <Typography variant="h5" fontSize={16}>
        ข้อมูลโครงการ
      </Typography>

      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          รหัสโครงการ
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data.custom_id}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          ชื่อโครงการ
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data.title}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          width={150}
        >
          โครงการภายใต้
        </Typography>

        <Typography variant="body2" fontWeight={500}>
          {data.org} ({data.org_detail})
        </Typography>
      </Stack>
    </ContainerWithOutlined>
  );
}

export default ProjectInformation;
