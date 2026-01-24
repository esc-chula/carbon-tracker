import type { ProjectFormValues } from "./type";
import { z } from "zod";

/** Helpers to parse numbers coming from <input type="number" /> */
const toOptionalNumber = (val: unknown) => {
  if (val === "" || val == null) return undefined;
  if (typeof val === "string") {
    const t = val.trim();
    if (t === "") return undefined;
    const n = Number(t);
    return Number.isNaN(n) ? undefined : n;
  }
  if (typeof val === "number") return val;
  return undefined;
};

const toRequiredNumber = (val: unknown) => {
  if (val === "" || val == null) return undefined;
  if (typeof val === "string") {
    const t = val.trim();
    if (t === "") return undefined;
    const n = Number(t);
    return Number.isNaN(n) ? undefined : n;
  }
  if (typeof val === "number") return val;
  return undefined;
};

// Scope 1 schema
const Scope1ActivitySchema = z.object({
  name: z.string().min(1, "กรุณาเลือกประเภทกิจกรรม"),
  value: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณากรอกปริมาณพลังงานที่ใช้" })
      .positive("กรุณากรอกค่าที่ไม่ติดลบ"),
  ),
  unit: z.string().min(1, "กรุณาเลือกหน่วย"),
});

// Scope 2 schema
const Scope2EntrySchema = z
  .object({
    kind: z.enum(["building", "generator", "meter"]),
    name: z.string().optional(),
    room: z.string().optional(),
    building_facilities: z.array(z.string()).optional(),
    generator_facilities: z.array(z.string()).optional(),
    meter_facilities: z.array(z.string()).optional(),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    meter_value: z.preprocess(
      toOptionalNumber,
      z.number().positive("กรุณากรอกค่าที่ไม่ติดลบ").optional(),
    ),
    value: z.preprocess(
      toOptionalNumber,
      z.number().positive("กรุณากรอกค่าที่ไม่ติดลบ").optional(),
    ),
    unit: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.kind === "building") {
      if (!data.name?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "กรุณากรอกชื่ออาคาร",
        });
      }
      if (!data.room?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["room"],
          message: "กรุณากรอกห้องใช้",
        });
      }
      if (!data.start_time?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["start_time"],
          message: "กรุณาเลือกวันและเวลาเริ่ม",
        });
      }
      if (!data.end_time?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["end_time"],
          message: "กรุณาเลือกวันและเวลาสิ้นสุด",
        });
      }
    }

    if (data.kind === "generator") {
      if (data.value == null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["value"],
          message: "กรุณากรอกปริมาณพลังงานที่ใช้",
        });
      }
      if (!data.unit?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["unit"],
          message: "กรุณาเลือกหน่วย",
        });
      }

      if (!data.generator_facilities?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["generator_facilities"],
          message: "กรุณาเลือกอุปกรณ์ที่ใช้",
        });
      }
    }

    if (data.kind === "meter") {
      if (!data.name?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "กรุณากรอกชื่ออาคาร",
        });
      }
      if (!data.room?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["room"],
          message: "กรุณากรอกห้องใช้",
        });
      }
      if (data.meter_value == null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["meter_value"],
          message: "กรุณากรอกค่ามิเตอร์",
        });
      }

      if (!data.meter_facilities?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["meter_facilities"],
          message: "กรุณาเลือกอุปกรณ์ที่ใช้",
        });
      }
    }

    if (data.start_time && data.end_time) {
      const start = new Date(data.start_time).getTime();
      const end = new Date(data.end_time).getTime();
      if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["end_time"],
          message: "วันสิ้นสุดต้องไม่ก่อนวันเริ่ม",
        });
      }
    }
  });

// Scope 3 schema
const Scope3AttendeeSchema = z.object({
  date: z.string({ required_error: "กรุณาเลือกวันที่" }),
  value: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุจำนวนคน" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
});

const Scope3OvernightSchema = z.object({
  date: z.string({ required_error: "กรุณาเลือกวันที่พักแรม" }),
  value: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุจำนวนคน" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
});

const Scope3SouvenirSchema = z.object({
  type: z.string().min(1, "กรุณาเลือกประเภทของแจก"),
  value: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุปริมาณของแจก" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
  unit: z.string().min(1, "กรุณาเลือกหน่วย"),
});

const Scope3WasteSchema = z.object({
  type: z.string().min(1, "กรุณาเลือกประเภทของเสีย"),
  value: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุปริมาณของเสีย" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
  unit: z.string().min(1, "กรุณาเลือกหน่วย"),
});

const ProjectFormStepOneBaseSchema = z.object({
  custom_id: z.string().min(1, "กรุณากรอกรหัสโครงการ"),
  title: z.string().min(1, "กรุณากรอกชื่อโครงการ"),
  org: z.string().min(1, "กรุณาเลือกประเภทโครงการ"),
  org_detail: z.string().optional(),
  owner_fullname: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  owner_nickname: z.string().min(1, "กรุณากรอกชื่อเล่น"),
  owner_student_id: z.string().min(1, "กรุณากรอกรหัสนิสิต"),
  owner_major: z.string().min(1, "กรุณาเลือกภาคที่เรียน"),
  owner_phone_number: z.string().min(1, "กรุณากรอกเบอร์โทรศัพท์"),
  field: z.string().optional(),
  clubName: z.string().optional(),
  otherUnderProject: z.string().optional(),
});

const ProjectFormStepOneSchema = ProjectFormStepOneBaseSchema.superRefine(
  (data, ctx) => {
    const org = data.org?.trim();
    if (!org) return;

    if (org === "กวศ.") {
      if (!data.field?.trim()) {
        ctx.addIssue({
          path: ["field"],
          code: z.ZodIssueCode.custom,
          message: "กรุณากรอกฝ่าย",
        });
      }
    }

    if (org === "ชมรม") {
      if (!data.clubName?.trim()) {
        ctx.addIssue({
          path: ["clubName"],
          code: z.ZodIssueCode.custom,
          message: "กรุณากรอกชื่อชมรม",
        });
      }
    }

    if (org === "other") {
      if (!data.otherUnderProject?.trim()) {
        ctx.addIssue({
          path: ["otherUnderProject"],
          code: z.ZodIssueCode.custom,
          message: "กรุณาระบุ",
        });
      }
    }
  },
);

const ProjectFormStepTwoSchema = z.object({
  scope1_activities: z.array(Scope1ActivitySchema).optional(),
  scope2_entries: z.array(Scope2EntrySchema).optional(),
  scope3_attendee: z.array(Scope3AttendeeSchema),
  scope3_overnight: z.array(Scope3OvernightSchema).optional(),
  scope3_souvenir: z.array(Scope3SouvenirSchema).optional(),
  scope3_waste: z.array(Scope3WasteSchema).optional(),
  transportations_csv_file: z.any().optional(),
});

const ProjectFormSchema = ProjectFormStepOneBaseSchema.merge(
  ProjectFormStepTwoSchema,
).superRefine((data, ctx) => {
  const org = data.org?.trim();
  if (!org) return;

  if (org === "กวศ." && !data.field?.trim()) {
    ctx.addIssue({
      path: ["field"],
      code: z.ZodIssueCode.custom,
      message: "กรุณากรอกฝ่าย",
    });
  }

  if (org === "ชมรม" && !data.clubName?.trim()) {
    ctx.addIssue({
      path: ["clubName"],
      code: z.ZodIssueCode.custom,
      message: "กรุณากรอกชื่อชมรม",
    });
  }

  if ((org === "other" || org === "อื่นๆ") && !data.otherUnderProject?.trim()) {
    ctx.addIssue({
      path: ["otherUnderProject"],
      code: z.ZodIssueCode.custom,
      message: "กรุณาระบุ",
    });
  }
});

// Export schemas
export {
  ProjectFormSchema,
  ProjectFormStepOneSchema,
  ProjectFormStepTwoSchema,
  Scope1ActivitySchema,
  Scope2EntrySchema,
  Scope3AttendeeSchema,
  Scope3OvernightSchema,
  Scope3SouvenirSchema,
  Scope3WasteSchema,
};

const defaultValues: ProjectFormValues = {
  custom_id: "",
  title: "",
  org: "",
  org_detail: "",

  owner_fullname: "",
  owner_nickname: "",
  owner_student_id: "",
  owner_major: "",
  owner_phone_number: "",
  scope1_activities: [{ name: "", value: undefined, unit: "" }],
  scope2_entries: [
    {
      kind: "building",
      name: "",
      room: "",
      building_facilities: [],
      generator_facilities: [],
      meter_facilities: [],
      start_time: undefined,
      end_time: undefined,
      meter_value: undefined,
      value: undefined,
      unit: "",
    },
  ],
  scope3_attendee: [{ date: undefined, value: undefined }],
  scope3_overnight: [{ date: undefined, value: undefined }],
  scope3_souvenir: [{ type: "", value: undefined, unit: "" }],
  scope3_waste: [{ type: "", value: undefined, unit: "" }],
  field: "",
  clubName: "",
  otherUnderProject: "",
};

export { defaultValues };
