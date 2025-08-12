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

// Activity schema
const ActivitySchema = z.object({
  activity_type: z.string().min(1, "กรุณาเลือกประเภทกิจกรรม"),
  amount: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณากรอกปริมาณพลังงานที่ใช้" })
      .positive("กรุณากรอกค่าที่ไม่ติดลบ"),
  ),
  unit: z.string().min(1, "กรุณาเลือกหน่วย"),
});

// Energy schema
const EnergySchema = z
  .object({
    type: z.string(),
    building: z.string().optional(),
    room: z.string().optional(),
    equipment: z.array(z.string()).min(1, "กรุณาเลือกอุปกรณ์ที่ใช้"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    quantity: z.preprocess(
      toOptionalNumber,
      z.number().positive("กรุณากรอกค่าที่ไม่ติดลบ").optional(),
    ),
    unit: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "building") {
      if (!data.building?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["building"],
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
      if (!data.startDate?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["startDate"],
          message: "กรุณาเลือกวันและเวลาเริ่ม",
        });
      }
      if (!data.endDate?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "กรุณาเลือกวันและเวลาสิ้นสุด",
        });
      }
    }

    if (data.type === "electric") {
      if (data.quantity == null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["quantity"],
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
    }

    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate).getTime();
      const end = new Date(data.endDate).getTime();
      if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "วันสิ้นสุดต้องไม่ก่อนวันเริ่ม",
        });
      }
    }
  });

// Participant schema
const ParticipantSchema = z.object({
  date: z.string({ required_error: "กรุณาเลือกวันที่" }),
  participant_amount: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุจำนวนคน" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
});

// Accommodation schema
const AccommodationSchema = z.object({
  date: z.string({ required_error: "กรุณาเลือกวันที่พักแรม" }),
  participant_amount: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุจำนวนคน" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
});

// Gift schema
const GiftSchema = z.object({
  gift_type: z.string().min(1, "กรุณาเลือกประเภทของแจก"),
  amount: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุปริมาณของแจก" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
  unit: z.string().min(1, "กรุณาเลือกหน่วย"),
});

// Waste schema
const WasteSchema = z.object({
  waste_type: z.string().min(1, "กรุณาเลือกประเภทของเสีย"),
  amount: z.preprocess(
    toRequiredNumber,
    z
      .number({ required_error: "กรุณาระบุปริมาณของเสีย" })
      .positive("กรุณากรอกค่าไม่ติดลบ"),
  ),
  unit: z.string().min(1, "กรุณาเลือกหน่วย"),
});

const ProjectFormSchema = z.object({
  projectCode: z.string().min(1, "กรุณากรอกรหัสโครงการ"),
  projectName: z.string().min(1, "กรุณากรอกชื่อโครงการ"),
  underProject: z.string().min(1, "กรุณาเลือกประเภทโครงการ"),
  otherUnderProject: z.string().optional(),
  clubName: z.string().optional(),
  field: z.string().optional(),
  fullName: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  nickname: z.string().min(1, "กรุณากรอกชื่อเล่น"),
  year: z.string().min(1, "กรุณาเลือกชั้นปี"),
  department: z.string().min(1, "กรุณาเลือกภาคที่เรียน"),
  tel: z.string().min(1, "กรุณากรอกเบอร์โทรศัพท์"),
  activities: z.array(ActivitySchema).optional(),
  energies: z.array(EnergySchema).optional(),
  participant: z.array(ParticipantSchema),
  accommodation: z.array(AccommodationSchema).optional(),
  gift: z.array(GiftSchema).optional(),
  waste: z.array(WasteSchema).optional(),
});

// Export schemas
export {
  ActivitySchema,
  EnergySchema,
  ParticipantSchema,
  AccommodationSchema,
  GiftSchema,
  WasteSchema,
  ProjectFormSchema,
};

const defaultValues: ProjectFormValues = {
  projectCode: "",
  projectName: "",
  underProject: "",
  otherUnderProject: "",
  fullName: "",
  nickname: "",
  year: "",
  clubName: "",
  department: "",
  tel: "",
  activities: [{ activity_type: "", amount: undefined, unit: "" }],
  energies: [
    {
      type: "building",
      building: "",
      room: "",
      equipment: [],
      startDate: undefined,
      endDate: undefined,
      quantity: undefined,
      unit: "",
    },
  ],
  participant: [{ date: undefined, participant_amount: undefined }],
  accommodation: [{ date: undefined, participant_amount: undefined }],
  gift: [{ gift_type: "", amount: undefined, unit: "" }],
  waste: [{ waste_type: "", amount: undefined, unit: "" }],
};

export { defaultValues };
