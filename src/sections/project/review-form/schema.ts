import { z } from "zod";

import type {
  ReviewCheckForm,
  ReviewFormValues,
  ReviewOtherForm,
  ReviewRejectionNoteForm,
} from "./type";

type ReviewRejectionNoteFormInput = Partial<ReviewRejectionNoteForm>;

type ReviewCheckFormInput = Omit<ReviewCheckForm, "rejection_notes"> & {
  rejection_notes?: ReviewRejectionNoteFormInput[];
};

type ReviewOtherFormInput = {
  attendees: ReviewCheckFormInput;
  internal_vehicles: ReviewCheckFormInput;
  overnight_on_campus: ReviewCheckFormInput;
  overnight_off_campus: ReviewCheckFormInput;
  souvenirs: ReviewCheckFormInput;
  waste: ReviewCheckFormInput;
  transportations: ReviewCheckFormInput;
};

type ReviewFormValuesInput = {
  note?: string;
  detail: {
    owner: ReviewCheckFormInput;
    project: ReviewCheckFormInput;
    project_info: ReviewCheckFormInput;
    food_beverage: ReviewCheckFormInput;
    energy: ReviewCheckFormInput;
    other: ReviewOtherFormInput;
  };
};

const rejectionNoteSchema = z
  .string()
  .trim()
  .min(1, "กรุณาระบุสิ่งที่ต้องแก้ไข");

const ReviewCheckSchema: z.ZodType<
  ReviewCheckForm,
  z.ZodTypeDef,
  ReviewCheckFormInput
> = z.object({
  passed: z.boolean({
    required_error: "กรุณาเลือกสถานะของข้อมูลส่วนนี้",
  }),
  rejection_notes: z
    .array(
      z.object({
        note: rejectionNoteSchema,
      }),
    )
    .default([]),
});

const ReviewOtherSchema: z.ZodType<
  ReviewOtherForm,
  z.ZodTypeDef,
  ReviewOtherFormInput
> = z.object({
  attendees: ReviewCheckSchema,
  internal_vehicles: ReviewCheckSchema,
  overnight_on_campus: ReviewCheckSchema,
  overnight_off_campus: ReviewCheckSchema,
  souvenirs: ReviewCheckSchema,
  waste: ReviewCheckSchema,
  transportations: ReviewCheckSchema,
});

const ReviewFormSchema: z.ZodType<
  ReviewFormValues,
  z.ZodTypeDef,
  ReviewFormValuesInput
> = z.object({
  note: z.string().optional(),
  detail: z.object({
    owner: ReviewCheckSchema,
    project: ReviewCheckSchema,
    project_info: ReviewCheckSchema,
    food_beverage: ReviewCheckSchema,
    energy: ReviewCheckSchema,
    other: ReviewOtherSchema,
  }),
});

export { ReviewCheckSchema, ReviewFormSchema, ReviewOtherSchema };
