import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type {
  TListProjectsRequest,
  TListProjectsResponse,
} from "@/types/project/list-project";

// ---------------------------------------------------------------------------------

function buildSearchParams(p: TListProjectsRequest): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set("limit", String(p.limit));
  if (p.offset !== undefined) sp.set("offset", String(p.offset));
  if (p.search) sp.set("search", p.search);
  if (p.sort) sp.set("sort", p.sort);
  if (p.status) sp.set("status", p.status);
  return sp;
}

async function fetchListProjects(
  payload: TListProjectsRequest,
): Promise<TListProjectsResponse> {
  const res = await ky
    .get("projects/", {
      searchParams: buildSearchParams(payload),
    })
    .json<TListProjectsResponse>();

  return res;
}

// ---------------------------------------------------------------------------------

const projectsQueryKeys = {
  all: () => ["projects-management"] as const,

  list: (payload: TListProjectsRequest) =>
    [...projectsQueryKeys.all(), { payload }] as const,

  listOptions: (payload: TListProjectsRequest) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    queryOptions({
      queryKey: [...projectsQueryKeys.list(payload)] as const,
      queryFn: () => fetchListProjects(payload),
    }),
};

export { projectsQueryKeys, fetchListProjects };
