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
      scope1: mapReviewCheck(values.detail.scope1),
      scope2: mapReviewCheck(values.detail.scope2),
      scope3: {
        attendee: mapReviewCheck(values.detail.scope3.attendee),
        overnight: mapReviewCheck(values.detail.scope3.overnight),
        souvenir: mapReviewCheck(values.detail.scope3.souvenir),
        waste: mapReviewCheck(values.detail.scope3.waste),
      },
    },
  };
}

export { buildReviewProjectPayload };
