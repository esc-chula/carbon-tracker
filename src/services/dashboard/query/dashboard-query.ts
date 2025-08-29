import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type {
  TGetDashboardRequest,
  TGetDashboardResponse,
} from "@/types/dashboard/get-dashboard";

// ---------------------------------------------------------------------------------
// Fetcher
async function fetchGetDashboard(
  payload: TGetDashboardRequest,
): Promise<TGetDashboardResponse> {
  const res = await ky
    .get("dashboard/", {
      searchParams:
        payload.year !== undefined ? { year: String(payload.year) } : undefined,
    })
    .json<TGetDashboardResponse>();
  return res;
}

// ---------------------------------------------------------------------------------
// Query Keys
const dashboardKeys = {
  all: () => ["dashboard"] as const,

  overview: (payload: TGetDashboardRequest) =>
    [...dashboardKeys.all(), "overview", { payload }] as const,

  overviewOptions: (payload: TGetDashboardRequest) =>
    queryOptions({
      queryKey: [...dashboardKeys.overview(payload)] as const,
      queryFn: () => fetchGetDashboard(payload),
    }),
};

export { dashboardKeys, fetchGetDashboard };
