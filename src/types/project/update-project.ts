export type TUpdateProjectRequest = {
  id: string;
  carbon_input?: string;
  custom_id?: string;
  org?: string;
  org_detail?: string;
  policy_implementation_photo_keys?: string[];
  policy_implementation_photos?: File[];
  project_info?: string;
  owner_fullname?: string;
  owner_line_id?: string;
  owner_major?: string;
  owner_nickname?: string;
  owner_phone_number?: string;
  owner_student_id?: string;
  title?: string;
  transportations_csv_file?: File | null;
};

export type TUpdateProjectResponse = void;
