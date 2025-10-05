export type TUpdateProjectRequest = {
  id: string;
  carbon_detail?: string;
  custom_id?: string;
  org?: string;
  org_detail?: string;
  title?: string;
  transportations_csv_file?: File | null;
};

export type TUpdateProjectResponse = void;
