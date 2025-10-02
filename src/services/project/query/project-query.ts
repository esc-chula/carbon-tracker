import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type {
  TListProjectsRequest,
  TListProjectsResponse,
} from "@/types/project/list-project";
import type {
  TGetCarbonEmissionRequest,
  TGetCarbonEmissionResponse,
} from "@/types/project/get-carbon";
import type {
  TGetProjectRequest,
  TGetProjectResponse,
} from "@/types/project/get-project";
import type {
  TGetCertificateRequest,
  TGetCertificateResponse,
} from "@/types/project/get-certificate";

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

async function fetchGetCarbonEmission(
  payload: TGetCarbonEmissionRequest,
): Promise<TGetCarbonEmissionResponse> {
  const res = await ky
    .get(`projects/${payload.id}/calculate`)
    .json<TGetCarbonEmissionResponse>();
  return res;
}

async function fetchGetProject(
  payload: TGetProjectRequest,
): Promise<TGetProjectResponse> {
  const res = await ky
    .get(`projects/${payload.id}`, {
      searchParams:
        payload.include_transportations !== undefined
          ? { include_transportations: payload.include_transportations }
          : undefined,
    })
    .json<TGetProjectResponse>();
  return res;
}

async function fetchGetCertificate(
  payload: TGetCertificateRequest,
): Promise<TGetCertificateResponse> {
  const res = await ky.get(`projects/${payload.id}/certificate`, {
    headers: { Accept: "application/pdf" },
  });

  const blob = await res.blob();
  const contentType = res.headers.get("content-type") ?? "application/pdf";

  const disposition = res.headers.get("content-disposition") ?? "";
  let filename = "certificate.pdf";
  const match = /filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i.exec(
    disposition,
  );
  if (match?.[1]) {
    try {
      filename = decodeURIComponent(match[1]);
    } catch {
      filename = match[1];
    }
  }

  return { blob, filename, contentType };
}

// ---------------------------------------------------------------------------------

const projectsQueryKeys = {
  all: () => ["projects-management"] as const,

  list: (payload: TListProjectsRequest) =>
    [...projectsQueryKeys.all(), { payload }] as const,

  listOptions: (payload: TListProjectsRequest) =>
    queryOptions({
      queryKey: [...projectsQueryKeys.list(payload)] as const,
      queryFn: () => fetchListProjects(payload),
    }),

  calculate: (payload: TGetCarbonEmissionRequest) =>
    [...projectsQueryKeys.all(), "calculate", { payload }] as const,

  calculateOptions: (payload: TGetCarbonEmissionRequest) =>
    queryOptions({
      queryKey: [...projectsQueryKeys.calculate(payload)] as const,
      queryFn: () => fetchGetCarbonEmission(payload),
    }),

  project: (payload: TGetProjectRequest) =>
    [...projectsQueryKeys.all(), "project", { payload }] as const,

  projectOptions: (payload: TGetProjectRequest) =>
    queryOptions({
      queryKey: [...projectsQueryKeys.project(payload)] as const,
      queryFn: () => fetchGetProject(payload),
    }),

  certificate: (payload: TGetCertificateRequest) =>
    [...projectsQueryKeys.all(), "certificate", { payload }] as const,

  certificateOptions: (payload: TGetCertificateRequest) =>
    queryOptions({
      queryKey: [...projectsQueryKeys.certificate(payload)] as const,
      queryFn: () => fetchGetCertificate(payload),
    }),
};

export {
  projectsQueryKeys,
  fetchListProjects,
  fetchGetCarbonEmission,
  fetchGetProject,
  fetchGetCertificate,
};
