import type { TOwner } from "../user/get-owner";
import type { CarbonDetail, Scope3Transportation } from "./project";

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

export function totalCarbonResult(carbon_result: CarbonResult): number {
  return (
    carbon_result.scope1.activity +
    carbon_result.scope2.building +
    carbon_result.scope2.generator +
    carbon_result.scope3.attendee +
    carbon_result.scope3.overnight +
    carbon_result.scope3.souvenir +
    carbon_result.scope3.transportation +
    carbon_result.scope3.waste
  );
}

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
};
