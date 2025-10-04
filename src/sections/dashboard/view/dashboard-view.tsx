"use client";

import { dashboardKeys } from "@/services/dashboard/query/dashboard-query";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Park } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { PIE_CHART_COLOR_SCHEMA } from "../constants";
import DashboardCalendarHeatmap from "../dashboard-calendar";
import DashboardPieChart from "../dashboard-pie-chart";
import { StyledBox, StyledPaper } from "../styles";
import { color } from "@/styles/colors";

// ---------------------------------------------------------------------------------

function DashboardView() {
  // --------------------------- API ---------------------------

  const dashboard = useQuery({ ...dashboardKeys.overviewOptions({}) });

  // --------------------------- Value ---------------------------

  const TREE_CONSTANT = 21;

  const totalTree = Math.round(
    (dashboard.data?.dashboard.carbon_emission_per_person.total ?? 0) /
    TREE_CONSTANT,
  );

  // --------------------------- Render ---------------------------

  if (!dashboard.isSuccess || dashboard.isLoading) {
    return (
      <Stack
        sx={{
          height: "calc(100vh - 100px)",
          width: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={50} />
      </Stack>
    );
  }

  return (
    <Stack spacing={4} sx={{ paddingY: 4 }}>
      <Stack spacing={1}>
        <Typography variant="h1" fontWeight={700}>
          ก๊าซเรือนกระจกในจุฬาฯ มาจากไหน?
        </Typography>
        <Typography variant="h4" fontWeight={500}>
          จากโครงการทั้งหมด{" "}
          <Chip
            size="small"
            label={`${dashboard.data.dashboard.total_project} โครงการ`}
            sx={{ backgroundColor: "#E6F1ED", color: "#013020" }}
          />
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        <Grid
          component={Paper}
          elevation={2}
          sx={{ padding: "16px 24px", borderRadius: 4 }}
          container
          spacing={4}
          direction="column"
          size={{ xs: 12, lg: 7 }}
        >
          <Stack>
            <Typography variant="h2" fontWeight={700}>
              ฝ่ายไหนปล่อย carbon มากที่สุด?
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              ปริมาณการปล่อย carbon แยกตามฝ่าย
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={5}
            sx={{ padding: "12px 16px", alignItems: "center" }}
          >
            <Box
              sx={{
                width: 1,
                maxWidth: 180,
                height: 180,
                alignSelf: "center",
              }}
            >
              <DashboardPieChart
                key={JSON.stringify(
                  dashboard.data.dashboard.carbon_emission_by_organization,
                )}
                data={dashboard.data.dashboard.carbon_emission_by_organization}
              />
            </Box>

            <Grid
              direction="column"
              container
              spacing={1.5}
              size={{ xs: 12 }}
              sx={{
                maxHeight: 170,
                maxWidth: 530,
                pr: 1,
                overflow: "auto",
                flexWrap: "nowrap",
              }}
            >
              {dashboard.data?.dashboard?.carbon_emission_by_organization?.map(
                (data, index) => {
                  return (
                    <Grid key={index} container spacing={3} size={{ xs: 12 }}>
                      <Grid
                        container
                        spacing={1.5}
                        size={{ xs: 7 }}
                        sx={{ flexWrap: "nowrap" }}
                      >
                        <Box
                          sx={{
                            marginTop: 0.7,
                            width: 12,
                            height: 12,
                            bgcolor: PIE_CHART_COLOR_SCHEMA[index],
                          }}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={index >= 3 ? 500 : 700}
                        >
                          {index + 1}.
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={index >= 3 ? 500 : 700}
                        >
                          {data.organization}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 5 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: index >= 3 ? 500 : 700,
                            color: (theme) => theme.palette.text.secondary,
                            wordBreak: "break-all",
                          }}
                        >
                          {data.total.toFixed(0)} kgCO₂ (
                          {data.percent.toFixed(0)}
                          %)
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                },
              )}
            </Grid>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <StyledPaper elevation={2} sx={{ height: 1, padding: 0 }}>
            <Stack direction="row" height={1}>
              <Stack sx={{ pl: 2, alignSelf: "flex-end" }}>
                <Box
                  component="img"
                  src="/assets/icons/ic-save-planet.svg"
                  height={280}
                  width={180}
                />
              </Stack>
              <Stack spacing={0.5} sx={{ padding: "16px 24px", flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  ปริมาณคาร์บอนเฉลี่ยต่อคน
                </Typography>
                <Typography variant="h2" fontWeight={700}>
                  {dashboard.data.dashboard.carbon_emission_per_person.total.toFixed(
                    2,
                  )}{" "}
                  kgCO₂
                </Typography>

                <Stack spacing={1}>
                  <Stack>
                    <Typography variant="body1" fontWeight={500}>
                      Scope 1 : การปลดปล่อยทางตรง
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {dashboard.data.dashboard.carbon_emission_per_person.scope1.toFixed(
                        2,
                      )}{" "}
                      kgCO₂
                    </Typography>
                  </Stack>
                  <StyledBox
                    width={
                      dashboard.data.dashboard.carbon_emission_per_person
                        .scope1 /
                      dashboard.data.dashboard.carbon_emission_per_person.total
                    }
                  />

                  <Stack>
                    <Typography variant="body1" fontWeight={500}>
                      Scope 2 : การปลดปล่อยทางอ้อมจากการใช้พลังงาน
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {dashboard.data.dashboard.carbon_emission_per_person.scope2.toFixed(
                        2,
                      )}{" "}
                      kgCO₂
                    </Typography>
                  </Stack>
                  <StyledBox
                    width={
                      dashboard.data.dashboard.carbon_emission_per_person
                        .scope2 /
                      dashboard.data.dashboard.carbon_emission_per_person.total
                    }
                  />

                  <Stack>
                    <Typography variant="body1" fontWeight={500}>
                      Scope 3 : การปลดปล่อยก๊าซเรือนกระจกทางอ้อม
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {dashboard.data.dashboard.carbon_emission_per_person.scope3.toFixed(
                        2,
                      )}{" "}
                      kgCO₂
                    </Typography>
                  </Stack>
                  <StyledBox
                    width={
                      dashboard.data.dashboard.carbon_emission_per_person
                        .scope3 /
                      dashboard.data.dashboard.carbon_emission_per_person.total
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          </StyledPaper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <StyledPaper elevation={2} sx={{ paddingBottom: 0 }}>
            <Typography variant="h2" fontWeight={700}>
              ฤดูกาลแห่งการกินไฟ
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              Heatmap การใช้ไฟฟ้าตลอดทั้งปีการศึกษา 2568
            </Typography>

            <DashboardCalendarHeatmap
              key={JSON.stringify(
                dashboard.data.dashboard.heatmap.electricity_usages,
              )}
              data={dashboard.data.dashboard.heatmap.electricity_usages}
            />
          </StyledPaper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <StyledPaper elevation={2}>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              height={1}
              spacing={4}
            >
              <Stack>
                <Typography variant="h2" fontWeight={700}>
                  ถ้านิสิตจะชดเชย ต้องปลูกต้นไม้กี่ต้น?
                </Typography>
                <Typography variant="subtitle1" fontSize={40} fontWeight={700}>
                  ~ {totalTree} ต้น/คน
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  *ต้นไม้เฉลี่ยดูดซับ ~{TREE_CONSTANT} kgCO₂/ปี
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{
                  flex: 1,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {[...Array(totalTree)].map((_, index) => (
                  <Park
                    key={index}
                    sx={{
                      width: 1,
                      maxWidth: 50,
                      height: 50,
                      alignSelf: "center",
                    }}
                    htmlColor={color.PRIMARY_700}
                  />
                ))}
              </Stack>
            </Stack>
          </StyledPaper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default DashboardView;
