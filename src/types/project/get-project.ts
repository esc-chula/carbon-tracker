import type { TOwner } from "../user/get-owner";
import type { CarbonInput, ProjectInfo } from "./project";
import type { TReviewProjectDetailV2 } from "./review-project";

export type TGetProjectRequest = {
  id: string;
  include_transportations?: boolean;
  include_review?: boolean;
};

export type CarbonResultV2 = {
  energy: {
    buildings: number;
    meters: number;
    generators: number;
  };
  food_beverage: {
    activities: number;
  };
  other: {
    attendees: number;
    internal_vehicles: number;
    overnight_off_campus: number;
    overnight_on_campus: number;
    souvenirs: number;
    transportations: number;
    waste: number;
  };
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
};

export type TProjectReviewV2 = {
  id: string;
  project_id: string;
  note: string;
  detail: TReviewProjectDetailV2;
};

export type TGetProjectResponse = {
  $schema?: string;
  project: {
    id: string;
    org: string;
    org_detail: string;
    owner_id: string;
    owner?: TOwner;
    status: string;
    title: string;
    custom_id: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
    updated_owner_id: string;
    deleted_at: string | null;
    project_info: ProjectInfo;
    carbon_input: CarbonInput;
    carbon_result: CarbonResultV2;
  };
  review?: TProjectReviewV2 | null;
};
