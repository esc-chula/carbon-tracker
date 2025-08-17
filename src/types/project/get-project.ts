export type TGetProjectRequest = {
  id: string;
  include_transportations?: boolean;
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
    deleted_at: string | null;
    transportations: Array<{
      id: string;
      project_id: string;
      type: string;
      origin: { district: string; province: string };
    }> | null;
  };
  carbon_detail: {
    scope1: {
      activities: Array<{ name: string; unit: string; value: number }> | null;
    };
    scope2: {
      buildings: Array<{
        name: string;
        room: string;
        start_time: string;
        end_time: string;
        facilities: string[] | null;
      }> | null;
      generators: Array<{
        unit: string;
        value: number;
        facilities: string[] | null;
      }> | null;
    };
    scope3: {
      attendee: Array<{ date: string; value: number }> | null;
      overnight: Array<{ date: string; value: number }> | null;
      souvenir: Array<{ type: string; unit: string; value: number }> | null;
      transportations: Array<unknown> | null; // refine if you have schema
      waste: Array<{ type: string; unit: string; value: number }> | null;
    };
  };
};
