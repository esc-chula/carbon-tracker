import type {
  CarbonDetail,
  Scope3Transportation,
} from "./project";

export type TGetProjectRequest = {
  id: string;
  include_transportations?: boolean;
};

export type CarbonResult = {
  scope1: { activity: number };
  scope2: {
    building: number;
    generator: number;
  };
  scope3: {
    attendee: number;
    overnight: number;
    souvenir: number;
    transportation: number;
    waste: number;
  };
};

type ProjectCarbonDetail = CarbonDetail & {
  scope3: CarbonDetail["scope3"] & {
    transportations?: Scope3Transportation[] | null;
  };
};

export type TGetProjectResponse = {
  project: {
    id: string;
    org: string;
    org_detail: string;
    owner_id: string;
    status: string;
    title: string;
    custom_id: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
    updated_owner_id: string;
    deleted_at: string | null;
    carbon_detail: ProjectCarbonDetail;
    carbon_result: CarbonResult;
  };
};
