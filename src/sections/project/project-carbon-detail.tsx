import CountingAnimation from "@/components/CountingAnimation";
import { Stack, Typography } from "@mui/material";

// ---------------------------------------------------------------------------------

type TProjectCarbonDetailProps = {
  carbon: number;
  all?: boolean;
};

function ProjectCarbonDetail({ carbon, all }: TProjectCarbonDetailProps) {
  if (all) {
    return (
      <Stack
        spacing={1}
        sx={{
          border: "1px solid #97262C",
          borderRadius: 2,
          padding: "16px 12px",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" fontSize={16}>
          โครงการนี้ปล่อยแก๊สเรือนกระจกไป
        </Typography>

        <Typography variant="h3" color="#6B1B1F" fontSize={36}>
          <CountingAnimation to={carbon} duration={1000} decimals={2} />{" "}
          <Typography component="span" variant="inherit" color="textPrimary">
            kgCO₂
          </Typography>
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={1}
      sx={{
        width: "max-content",
        border: "1px solid #DBE0E4",
        borderRadius: 2,
        padding: "8px 12px",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="#637381">
        ปล่อยแก๊สเรือนกระจกไป
      </Typography>

      <Typography variant="h3" color="#6B1B1F">
        <CountingAnimation to={carbon} duration={1000} decimals={2} />{" "}
        <Typography component="span" variant="inherit" color="textPrimary">
          kgCO₂
        </Typography>
      </Typography>
    </Stack>
  );
}

export default ProjectCarbonDetail;
