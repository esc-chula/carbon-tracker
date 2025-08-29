import { color } from "@/styles/colors";
import type { TGetDashboardResponse } from "@/types/dashboard/get-dashboard";
import { Box, Stack, Typography, GlobalStyles } from "@mui/material";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

const COLORS = {
  empty: "#E5E7EB",
  q0: "#CBD1D7", // 0–20
  q1: "#DFBCBE", // 20–40
  q2: "#B96E72", // 40–60
  q3: "#97262C", // 60–80
  q4: "#6B1B1F", // 80–100
};

const LEGEND = [
  { label: "80 - 100", color: COLORS.q4 },
  { label: "60 - 80", color: COLORS.q3 },
  { label: "40 - 60", color: COLORS.q2 },
  { label: "20 - 40", color: COLORS.q1 },
  { label: "0 - 20", color: COLORS.q0 },
];

// ---------------------------------------------------

type TDashboardCalendarHeatmap = {
  data?: TGetDashboardResponse["dashboard"]["heatmap"]["electricity_usages"];
};

export default function DashboardCalendarHeatmap({
  data,
}: TDashboardCalendarHeatmap) {
  // --------------------------- Value ---------------------------

  const formattedData = data?.map((item) => ({
    date: item.date,
    rank: item.rank,
    amount: item.amount,
  }));

  return (
    <>
      <Stack
        key={JSON.stringify(formattedData)}
        direction="row"
        sx={{ padding: "16px 32px" }}
      >
        <GlobalStyles
          styles={{
            ".react-calendar-heatmap text": {
              fill: color.TEXT_PRIMARY,
              fontSize: 7,
              fontWeight: 500,
            },

            ".react-calendar-heatmap .color-empty": { fill: COLORS.empty },
            ".react-calendar-heatmap .q0": { fill: COLORS.q0 },
            ".react-calendar-heatmap .q1": { fill: COLORS.q1 },
            ".react-calendar-heatmap .q2": { fill: COLORS.q2 },
            ".react-calendar-heatmap .q3": { fill: COLORS.q3 },
            ".react-calendar-heatmap .q4": { fill: COLORS.q4 },
          }}
        />

        <Stack sx={{ width: 1, overflowX: "scroll" }}>
          <Box sx={{ width: { xs: 900, lg: 1 } }}>
            <CalendarHeatmap
              startDate={new Date("2025-07-01")}
              endDate={new Date("2026-06-30")}
              values={formattedData ?? []}
              showWeekdayLabels
              weekdayLabels={["", "M", "", "W", "", "F", ""]}
              classForValue={(v) => {
                switch (v?.rank) {
                  case 5:
                    return "q4";
                  case 4:
                    return "q3";
                  case 3:
                    return "q2";
                  case 2:
                    return "q1";
                  case 1:
                    return "q0";
                  default:
                    return "color-empty";
                }
              }}
              //TODO: เดี๋ยวกลับมาแก้
              tooltipDataAttrs={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((v: any) => {
                  const tip = v?.date
                    ? `${new Date(v.date as string).toLocaleDateString("th-TH")}: ${(v?.amount ?? 0).toFixed(2)} ยูนิต`
                    : "No data";
                  return { "data-tip": tip };
                }) as unknown as CalendarHeatmap.TooltipDataAttrs
              }
            />
          </Box>
        </Stack>

        <Stack sx={{ minWidth: 132, paddingX: 3 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={700}>
              เปอร์เซนไทล์
            </Typography>
            {LEGEND.map((it) => (
              <Stack
                key={it.label}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: it.color,
                  }}
                />
                <Typography variant="body2">{it.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <ReactTooltip
        delayShow={10}
        place="bottom"
        padding="4px 8px"
        backgroundColor={color.PRIMARY_800}
      />
    </>
  );
}
