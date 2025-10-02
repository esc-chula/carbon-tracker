import { z } from "zod";

import type {
  ReviewCheckForm,
  ReviewFormValues,
  ReviewRejectionNoteForm,
  ReviewScope3Form,
} from "./type";

type ReviewRejectionNoteFormInput = Partial<ReviewRejectionNoteForm>;

type ReviewCheckFormInput = Omit<ReviewCheckForm, "rejection_notes"> & {
  rejection_notes?: ReviewRejectionNoteFormInput[];
};

type ReviewScope3FormInput = {
  attendee: ReviewCheckFormInput;
  overnight: ReviewCheckFormInput;
  souvenir: ReviewCheckFormInput;
  waste: ReviewCheckFormInput;
};

type ReviewFormValuesInput = {
  note?: string;
  detail: {
    owner: ReviewCheckFormInput;
    project: ReviewCheckFormInput;
    scope1: ReviewCheckFormInput;
    scope2: ReviewCheckFormInput;
    scope3: ReviewScope3FormInput;
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

const ReviewScope3Schema: z.ZodType<
  ReviewScope3Form,
  z.ZodTypeDef,
  ReviewScope3FormInput
> = z.object({
  attendee: ReviewCheckSchema,
  overnight: ReviewCheckSchema,
  souvenir: ReviewCheckSchema,
  waste: ReviewCheckSchema,
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
    scope1: ReviewCheckSchema,
    scope2: ReviewCheckSchema,
    scope3: ReviewScope3Schema,
  }),
});

export { ReviewCheckSchema, ReviewFormSchema, ReviewScope3Schema };
