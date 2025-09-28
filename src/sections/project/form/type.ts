type Scope1ActivityForm = {
  name?: string;
  value?: number;
  unit?: string;
};

type Scope2EntryForm = {
  kind?: "building" | "generator";

  name?: string;
  room?: string;
  building_facilities?: Array<string>;
  generator_facilities?: Array<string>;
  start_time?: string;
  end_time?: string;

  value?: number;
  unit?: string;
};

type Scope3AttendeeForm = {
  date: string | undefined;
  value: number | undefined;
};

type Scope3OvernightForm = {
  date?: string | undefined;
  value?: number | undefined;
};

type Scope3SouvenirForm = {
  type?: string;
  value?: number;
  unit?: string;
};

type Scope3WasteForm = {
  type?: string;
  value?: number;
  unit?: string;
};

type ProjectFormValues = {
  custom_id: string;
  title: string;
  org: string;
  org_detail: string;
  owner_fullname: string;
  owner_nickname: string;
  owner_student_id: string;
  owner_major: string;
  owner_phone_number: string;
  transportations_csv_file?: File;
  scope1_activities?: Array<Scope1ActivityForm>;
  scope2_entries?: Array<Scope2EntryForm>;
  scope3_attendee: Array<Scope3AttendeeForm>;
  scope3_overnight?: Array<Scope3OvernightForm>;
  scope3_souvenir?: Array<Scope3SouvenirForm>;
  scope3_waste?: Array<Scope3WasteForm>;

  // UI helper fields for org detail selection
  field?: string;
  clubName?: string;
  otherUnderProject?: string;
};

export type {
  ProjectFormValues,
  Scope1ActivityForm,
  Scope2EntryForm,
  Scope3AttendeeForm,
  Scope3OvernightForm,
  Scope3SouvenirForm,
  Scope3WasteForm,
};
