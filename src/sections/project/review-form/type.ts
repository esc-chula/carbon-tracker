export type ReviewRejectionNoteForm = {
  note: string;
};

export type ReviewCheckForm = {
  passed: boolean;
  rejection_notes: ReviewRejectionNoteForm[];
};

export type ReviewOtherForm = {
  attendees: ReviewCheckForm;
  internal_vehicles: ReviewCheckForm;
  overnight_on_campus: ReviewCheckForm;
  overnight_off_campus: ReviewCheckForm;
  souvenirs: ReviewCheckForm;
  waste: ReviewCheckForm;
  transportations: ReviewCheckForm;
};

export type ReviewFormValues = {
  note?: string;
  detail: {
    owner: ReviewCheckForm;
    project: ReviewCheckForm;
    project_info: ReviewCheckForm;
    food_beverage: ReviewCheckForm;
    energy: ReviewCheckForm;
    other: ReviewOtherForm;
  };
};
