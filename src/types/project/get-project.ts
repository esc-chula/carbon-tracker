import type { TOwner } from "../user/get-owner";
import type { CarbonDetail, Scope3Transportation } from "./project";
import type { TReviewProjectDetail } from "./review-project";

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

export type TProjectReview = {
  id?: string;
  project_id: string;
  note: string;
  detail: TReviewProjectDetail;
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
    carbon_detail: ProjectCarbonDetail;
    carbon_result: CarbonResult;
  };
  review?: TProjectReview | null;
};
