import { defaultValues } from "../form/schema";
import type { ProjectFormValues } from "../form/type";
import type { TGetProjectResponse } from "@/types/project/get-project";
import type { TOwner } from "@/types/user/get-owner";

const cloneDefaultValues = (): ProjectFormValues => structuredClone(defaultValues);

type BuildInitialValuesParams = {
  project?: TGetProjectResponse["project"];
  fallbackOwner?: TOwner | null;
};

function projectToFormValues({
  project,
  fallbackOwner,
}: BuildInitialValuesParams): ProjectFormValues {
  const values = cloneDefaultValues();

  if (!project) {
    if (fallbackOwner) {
      values.owner_fullname = fallbackOwner.fullname;
      values.owner_nickname = fallbackOwner.nickname;
      values.owner_major = fallbackOwner.major;
      values.owner_phone_number = fallbackOwner.phone_number;
      values.owner_student_id = fallbackOwner.student_id;
    }
    return values;
  }

  const owner = project.owner ?? fallbackOwner ?? null;

  values.custom_id = project.custom_id ?? values.custom_id;
  values.title = project.title ?? values.title;
  values.org = project.org ?? values.org;
  values.org_detail = project.org_detail ?? values.org_detail;
  values.status = (project.status ?? values.status) as typeof values.status;
  values.owner_fullname = owner?.fullname ?? values.owner_fullname;
  values.owner_nickname = owner?.nickname ?? values.owner_nickname;
  values.owner_major = owner?.major ?? values.owner_major;
  values.owner_phone_number = owner?.phone_number ?? values.owner_phone_number;
  values.owner_student_id = owner?.student_id ?? values.owner_student_id;

  const resolvedOrg = values.org?.trim();
  if (resolvedOrg === "กวศ.") {
    values.field = values.org_detail;
    values.clubName = "";
    values.otherUnderProject = "";
  } else if (resolvedOrg === "ชมรม") {
    values.clubName = values.org_detail;
    values.field = "";
    values.otherUnderProject = "";
  } else if (resolvedOrg === "other" || resolvedOrg === "อื่นๆ") {
    values.otherUnderProject = values.org_detail;
    values.field = "";
    values.clubName = "";
  } else {
    values.field = "";
    values.clubName = "";
    values.otherUnderProject = "";
  }

  const carbonDetail = project.carbon_detail;

  const scope1Activities = carbonDetail.scope1?.activities ?? [];
  if (scope1Activities?.length) {
    values.scope1_activities = scope1Activities.map((activity) => ({
      name: activity?.name ?? "",
      value: activity?.value ?? undefined,
      unit: activity?.unit ?? "",
    }));
  }

  const scope2Entries: NonNullable<ProjectFormValues["scope2_entries"]> = [];

  const buildings = carbonDetail.scope2?.buildings ?? [];
  buildings?.forEach((building) => {
    scope2Entries.push({
      kind: "building",
      name: building?.name ?? "",
      room: building?.room ?? "",
      building_facilities: building?.facilities ?? [],
      generator_facilities: [],
      start_time: building?.start_time ?? "",
      end_time: building?.end_time ?? "",
      value: undefined,
      unit: "",
    });
  });

  const generators = carbonDetail.scope2?.generators ?? [];
  generators?.forEach((generator) => {
    scope2Entries.push({
      kind: "generator",
      name: undefined,
      room: undefined,
      building_facilities: [],
      generator_facilities: generator?.facilities ?? [],
      start_time: undefined,
      end_time: undefined,
      value: generator?.value ?? undefined,
      unit: generator?.unit ?? "",
    });
  });

  if (scope2Entries.length) {
    values.scope2_entries = scope2Entries;
  }

  const attendee = carbonDetail.scope3?.attendee ?? [];
  if (attendee?.length) {
    values.scope3_attendee = attendee.map((item) => ({
      date: item?.date ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const overnight = carbonDetail.scope3?.overnight ?? [];
  if (overnight?.length) {
    values.scope3_overnight = overnight.map((item) => ({
      date: item?.date ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const souvenir = carbonDetail.scope3?.souvenir ?? [];
  if (souvenir?.length) {
    values.scope3_souvenir = souvenir.map((item) => ({
      type: item?.type ?? "",
      unit: item?.unit ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const waste = carbonDetail.scope3?.waste ?? [];
  if (waste?.length) {
    values.scope3_waste = waste.map((item) => ({
      type: item?.type ?? "",
      unit: item?.unit ?? "",
      value: item?.value ?? undefined,
    }));
  }

  values.transportations_csv_file = undefined;

  return values;
}

export { projectToFormValues };
