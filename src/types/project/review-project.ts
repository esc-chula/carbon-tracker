export type TReviewCheck = {
  passed: boolean;
  rejection_notes?: string[] | null;
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
  detail: TReviewProjectDetailV2;
  note?: string;
};

export type TReviewProjectResponse = void;
