export type TReviewCheck = {
  passed: boolean;
  rejection_notes?: string[] | null;
};

export type TReviewScope3 = {
  attendee: TReviewCheck;
  overnight: TReviewCheck;
  souvenir: TReviewCheck;
  waste: TReviewCheck;
};

export type TReviewProjectDetail = {
  owner: TReviewCheck;
  project: TReviewCheck;
  scope1: TReviewCheck;
  scope2: TReviewCheck;
  scope3: TReviewScope3;
};

export type TReviewProjectRequest = {
  id: string;
  detail: TReviewProjectDetail;
  note?: string;
};

export type TReviewProjectResponse = void;
