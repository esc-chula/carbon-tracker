import CountingAnimation from "@/components/CountingAnimation";
import { Stack, Typography } from "@mui/material";

// ---------------------------------------------------------------------------------

type TProjectCarbonDetailProps = {
  carbon: number;
  all?: boolean;
  scopes?: {
    scope1: number;
    scope2: number;
    scope3: number;
  };
};

function ProjectCarbonDetail({
  carbon,
  all,
  scopes,
}: TProjectCarbonDetailProps) {
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
        {scopes && (
          <Stack spacing={1} sx={{ width: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h3" fontSize={16}>
                Scope 1 : ปริมาณการปล่อยก๊าซเรือนกระจกทางตรง
              </Typography>
              <Typography variant="h3" fontSize={20}>
                <Typography component="span" variant="inherit" color="#6B1B1F">
                  <CountingAnimation
                    to={scopes.scope1}
                    duration={1000}
                    decimals={2}
                  />
                </Typography>{" "}
                <Typography component="span" variant="inherit">
                  kgCO₂
                </Typography>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h3" fontSize={16}>
                Scope 2 : ปริมาณการปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน
              </Typography>
              <Typography variant="h3" fontSize={20}>
                <Typography component="span" variant="inherit" color="#6B1B1F">
                  <CountingAnimation
                    to={scopes.scope2}
                    duration={1000}
                    decimals={2}
                  />
                </Typography>{" "}
                <Typography component="span" variant="inherit">
                  kgCO₂
                </Typography>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h3" fontSize={16}>
                Scope 3 : อื่นๆ
              </Typography>
              <Typography variant="h3" fontSize={20}>
                <Typography component="span" variant="inherit" color="#6B1B1F">
                  <CountingAnimation
                    to={scopes.scope3}
                    duration={1000}
                    decimals={2}
                  />
                </Typography>{" "}
                <Typography component="span" variant="inherit">
                  kgCO₂
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        )}

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
