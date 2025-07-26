import type { ProjectFormValues } from "./type";
import { z } from "zod";

const ActivitySchema = z.object({
  type: z.string().optional(),
  amount: z.number().positive("กรุณากรอกค่าไม่ติดลบ").optional(),
  unit: z.string().optional(),
});

// Energy schema
const EnergySchema = z.object({
  type: z.string().optional(),
  building: z.string().optional(),
  room: z.string().optional(),
  equipment: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  quantity: z.number().positive("กรุณากรอกค่าไม่ติดลบ").optional(),
  unit: z.string().optional(),
});

// Participant schema
const ParticipantSchema = z.object({
  date: z.string({
    required_error: "กรุณาเลือกวันที่",
  }),
  participant_amount: z
    .number({
      required_error: "กรุณาระบุจำนวนคน",
    })
    .positive("กรุณากรอกค่าไม่ติดลบ"),
});

// Accommodation schema
const AccommodationSchema = z.object({
  date: z.string().optional(),
  participant_amount: z.number().positive("กรุณากรอกค่าไม่ติดลบ").optional(),
});

// Gift schema
const GiftSchema = z.object({
  type: z.string().optional(),
  amount: z.number().positive("กรุณากรอกค่าไม่ติดลบ").optional(),
  unit: z.string().optional(),
});

// Waste schema
const WasteSchema = z.object({
  type: z.string().optional(),
  amount: z.number().positive("กรุณากรอกค่าไม่ติดลบ").optional(),
  unit: z.string().optional(),
});

const ProjectFormSchema = z
  .object({
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
  })
  .refine(
    (data) => {
      if (data.underProject === "กวศ.") {
        return data.field && data.field.trim().length > 0;
      }
      return true;
    },
    {
      message: "กรุณากรอกฝ่าย",
      path: ["field"],
    },
  )
  .refine(
    (data) => {
      if (data.underProject === "ชมรม") {
        return data.clubName && data.clubName.trim().length > 0;
      }
      return true;
    },
    {
      message: "กรุณากรอกชื่อชมรม",
      path: ["clubName"],
    },
  )
  .refine(
    (data) => {
      if (data.underProject === "other") {
        return (
          data.otherUnderProject && data.otherUnderProject.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "กรุณาระบุ",
      path: ["otherUnderProject"],
    },
  );

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
  activities: [{ type: "", amount: undefined, unit: "" }],
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
  gift: [{ type: "", amount: undefined, unit: "" }],
  waste: [{ type: "", amount: undefined, unit: "" }],
};

export { defaultValues };
