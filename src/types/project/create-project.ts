import type { TProjectStatus } from "./list-project";

export type TCreateProjectRequest = {
  carbon_detail: string;
  custom_id: string;
  org: string;
  org_detail: string;
  owner_fullname: string;
  owner_major: string;
  owner_nickname: string;
  owner_phone_number: string;
  owner_student_id: string;
  status: TProjectStatus;
  title: string;
  transportations_csv_file?: File;
};

export type TCreateProjectResponse = {
  project_id: string;
};
