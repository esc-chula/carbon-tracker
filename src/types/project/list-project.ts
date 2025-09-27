export type TProjectStatus =
  | "fixing"
  | "draft"
  | "pending"
  | "approved"
  | "rejected";

export type TListProjectsRequest = {
  limit: number;
  offset?: number;
  search?: string;
  sort?: string;
  status?: string;
};

export type TListProjectsItem = {
  id: string;
  title: string;
  status: TProjectStatus;
  custom_id: string;
  org: string;
  org_detail: string;
  owner_id: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TListProjectsResponse = {
  $schema?: string;
  count: number;
  projects: TListProjectsItem[] | null;
};
