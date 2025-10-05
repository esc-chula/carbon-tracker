export type ReviewRejectionNoteForm = {
  note: string;
};

export type ReviewCheckForm = {
  passed: boolean;
  rejection_notes: ReviewRejectionNoteForm[];
};

export type ReviewScope3Form = {
  attendee: ReviewCheckForm;
  overnight: ReviewCheckForm;
  souvenir: ReviewCheckForm;
  waste: ReviewCheckForm;
};

export type ReviewFormValues = {
  note?: string;
  detail: {
    owner: ReviewCheckForm;
    project: ReviewCheckForm;
    scope1: ReviewCheckForm;
    scope2: ReviewCheckForm;
    scope3: ReviewScope3Form;
  };
};
