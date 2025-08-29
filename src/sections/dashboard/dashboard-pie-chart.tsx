import { PIE_CHART_COLOR_SCHEMA } from "@/sections/dashboard/constants";
import { color } from "@/styles/colors";
import type { TGetDashboardResponse } from "@/types/dashboard/get-dashboard";
import { ResponsivePie } from "@nivo/pie";

// ---------------------------------------------------------------------------------

type TDashboardPieChart = {
  data: TGetDashboardResponse["dashboard"]["carbon_emission_by_organization"];
};

function DashboardPieChart({ data }: TDashboardPieChart) {
  // --------------------------- Value ---------------------------

  const formattedData = data
    ?.filter((item) => item.total > 0)
    .map((item, index) => ({
      id: index,
      label: item.organization,
      value: item.percent,
    }));

  const accumulate = data?.reduce((sum, org) => sum + org.total, 0) ?? 0;

  return (
    <ResponsivePie
      data={formattedData ?? []}
      innerRadius={0.6}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      padAngle={0.6}
      layers={[
        "arcs",
        "legends",

        (props) => {
          const { centerX, centerY } = props;

          return (
            <>
              <text
                x={centerX}
                y={centerY - 12}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fill: color.TEXT_PRIMARY,
                }}
              >
                ทั้งหมด
              </text>
              <text
                x={centerX}
                y={centerY + 8}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  fill: color.TEXT_PRIMARY,
                }}
              >
                {accumulate.toFixed(0)} kgCO₂
              </text>
            </>
          );
        },
      ]}
      colors={PIE_CHART_COLOR_SCHEMA}
      isInteractive={false}
    />
  );
}

export default DashboardPieChart;
