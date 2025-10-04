import { Stack, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------------

type TProjectRejectDetailButtonProps = {
  id: string;
};

function ProjectRejectDetailButton({ id }: TProjectRejectDetailButtonProps) {
  const router = useRouter();

  return (
    <Stack
      component="button"
      direction="row"
      spacing={2}
      sx={{
        width: 320,
        alignItems: "center",
        borderRadius: 2,
        backgroundColor: "#FFE7E7",
        padding: "10px 16px",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/project/${id}/result`)}
    >
      <Box component="img" src="/assets/icons/ic-reject-warning.svg" />

      <Typography
        variant="h3"
        sx={{ fontSize: 16, color: "#7A092E", textDecoration: "underline" }}
      >
        รายละเอียดข้อมูลที่ต้องแก้ไข
      </Typography>
    </Stack>
  );
}

export default ProjectRejectDetailButton;
