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

export type TReviewOtherDetailV2 = {
  attendees: TReviewCheck;
  internal_vehicles: TReviewCheck;
  overnight_on_campus: TReviewCheck;
  overnight_off_campus: TReviewCheck;
  souvenirs: TReviewCheck;
  waste: TReviewCheck;
  transportations: TReviewCheck;
};

export type TReviewProjectDetailV2 = {
  project: TReviewCheck;
  owner: TReviewCheck;
  project_info: TReviewCheck;
  food_beverage: TReviewCheck;
  energy: TReviewCheck;
  other: TReviewOtherDetailV2;
};

export type TReviewProjectRequest = {
  id: string;
  detail: TReviewProjectDetail;
  note?: string;
};

export type TReviewProjectResponse = void;
