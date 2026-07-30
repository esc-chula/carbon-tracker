import type { TOwner } from "../user/get-owner";
import type {
  CarbonDetail,
  CarbonInput,
  ProjectInfo,
  Scope3Transportation,
} from "./project";
import type { TReviewProjectDetailV2 } from "./review-project";

export type TGetProjectRequest = {
  id: string;
  include_transportations?: boolean;
  include_review?: boolean;
};

export type CarbonResult = {
  scope1: { activity: number };
  scope2: {
    building: number;
    generator: number;
    meter: number;
  };
  scope3: {
    attendee: number;
    overnight: number;
    souvenir: number;
    transportation: number;
    waste: number;
  };
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

type ProjectCarbonDetail = CarbonDetail & {
  scope3: CarbonDetail["scope3"] & {
    transportations?: Scope3Transportation[] | null;
  };
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
    /** @deprecated Use carbon_input. Kept until detail/result screens migrate to V2. */
    carbon_detail: ProjectCarbonDetail;
    carbon_result: CarbonResultV2;
  };
  review?: TProjectReviewV2 | null;
};
