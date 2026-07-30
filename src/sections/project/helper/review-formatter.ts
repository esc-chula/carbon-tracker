import type { ReviewCheckForm, ReviewFormValues } from "../review-form/type";
import type { TReviewProjectRequest } from "@/types/project/review-project";

type BuildReviewProjectPayloadParams = {
  id: string;
  values: ReviewFormValues;
};

function mapRejectionNotes(notes?: { note: string }[]) {
  if (!notes?.length) {
    return undefined;
  }

  const sanitizedNotes = notes
    .map((item) => item.note?.trim() ?? "")
    .filter((note) => note.length > 0);

  if (!sanitizedNotes.length) {
    return [];
  }

  return sanitizedNotes;
}

function mapReviewCheck(check: ReviewCheckForm) {
  return {
    passed: check.passed,
    rejection_notes: check.passed
      ? null
      : (mapRejectionNotes(check.rejection_notes) ?? []),
  };
}

function buildReviewProjectPayload({
  id,
  values,
}: BuildReviewProjectPayloadParams): TReviewProjectRequest {
  return {
    id,
    note: values.note?.trim() ? values.note.trim() : "",
    detail: {
      owner: mapReviewCheck(values.detail.owner),
      project: mapReviewCheck(values.detail.project),
      project_info: mapReviewCheck(values.detail.project_info),
      food_beverage: mapReviewCheck(values.detail.food_beverage),
      energy: mapReviewCheck(values.detail.energy),
      other: {
        attendees: mapReviewCheck(values.detail.other.attendees),
        internal_vehicles: mapReviewCheck(
          values.detail.other.internal_vehicles,
        ),
        overnight_on_campus: mapReviewCheck(
          values.detail.other.overnight_on_campus,
        ),
        overnight_off_campus: mapReviewCheck(
          values.detail.other.overnight_off_campus,
        ),
        souvenirs: mapReviewCheck(values.detail.other.souvenirs),
        waste: mapReviewCheck(values.detail.other.waste),
        transportations: mapReviewCheck(values.detail.other.transportations),
      },
    },
  };
}

export { buildReviewProjectPayload };
