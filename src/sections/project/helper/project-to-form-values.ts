import { defaultValues } from "../form/schema";
import type { ProjectFormValues } from "../form/type";
import type { TGetProjectResponse } from "@/types/project/get-project";
import type { TOwner } from "@/types/user/get-owner";

const cloneDefaultValues = (): ProjectFormValues =>
  structuredClone(defaultValues);

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
      values.owner_line_id = fallbackOwner.line_id;
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
  values.owner_line_id = owner?.line_id ?? values.owner_line_id;
  values.owner_student_id = owner?.student_id ?? values.owner_student_id;
  values.environmental_policy =
    project.project_info?.environmental_policy ?? values.environmental_policy;
  values.policy_implementation_suggestion =
    project.project_info?.policy_implementation_suggestion ??
    values.policy_implementation_suggestion;
  values.policy_implementation_existing_photos =
    project.project_info?.policy_implementation_photos ??
    values.policy_implementation_existing_photos;
  values.policy_implementation_photo_keys =
    project.project_info?.policy_implementation_photos?.map(
      (photo) => photo.storage_key,
    ) ?? values.policy_implementation_photo_keys;

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

  const carbonInput = project.carbon_input;

  const scope1Activities = carbonInput.food_beverage?.activities ?? [];
  if (scope1Activities?.length) {
    values.scope1_activities = scope1Activities.map((activity) => ({
      name: activity?.name ?? "",
      value: activity?.value ?? undefined,
      unit: activity?.unit ?? "",
    }));
  }

  const scope2Entries: NonNullable<ProjectFormValues["scope2_entries"]> = [];

  const energyItems = carbonInput.energy?.items ?? [];
  energyItems.forEach((item) => {
    if (item.type === "building") {
      scope2Entries.push({
        kind: "building",
        name: item.name ?? "",
        room: item.room ?? "",
        building_facilities: item.facilities ?? [],
        generator_facilities: [],
        meter_facilities: [],
        start_time: item.start_time ?? "",
        end_time: item.end_time ?? "",
        meter_value: undefined,
        value: undefined,
        unit: "",
      });
      return;
    }

    if (item.type === "meter") {
      scope2Entries.push({
        kind: "meter",
        name: item.name ?? "",
        room: item.room ?? "",
        building_facilities: [],
        generator_facilities: [],
        meter_facilities: ["มิเตอร์"],
        start_time: undefined,
        end_time: undefined,
        meter_value: item.meter_value || undefined,
        value: undefined,
        unit: "",
      });
      return;
    }

    scope2Entries.push({
      kind: "generator",
      name: undefined,
      room: undefined,
      building_facilities: [],
      generator_facilities: [],
      meter_facilities: [],
      start_time: undefined,
      end_time: undefined,
      date: item.date ?? "",
      meter_value: undefined,
      value: item.value ?? undefined,
      unit: item.unit ?? "",
    });
  });

  if (scope2Entries.length) {
    values.scope2_entries = scope2Entries;
  }

  const attendee = carbonInput.other?.attendees ?? [];
  if (attendee?.length) {
    values.scope3_attendee = attendee.map((item) => ({
      date: item?.date ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const internalVehicles = carbonInput.other?.internal_vehicles ?? [];
  if (internalVehicles?.length) {
    values.scope3_internal_vehicles = internalVehicles.map((item) => ({
      distance_km: item?.distance_km ?? undefined,
      people_count: item?.people_count ?? undefined,
      vehicle_type: item?.vehicle_type ?? "",
    }));
  }

  const overnightOnCampus = carbonInput.other?.overnight_on_campus ?? [];
  if (overnightOnCampus?.length) {
    values.scope3_overnight_on_campus = overnightOnCampus.map((item) => ({
      date: item?.date ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const overnightOffCampus = carbonInput.other?.overnight_off_campus ?? [];
  if (overnightOffCampus?.length) {
    values.scope3_overnight_off_campus = overnightOffCampus.map((item) => ({
      date: item?.date ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const souvenir = carbonInput.other?.souvenirs ?? [];
  if (souvenir?.length) {
    values.scope3_souvenir = souvenir.map((item) => ({
      type: item?.type ?? "",
      unit: item?.unit ?? "",
      value: item?.value ?? undefined,
    }));
  }

  const waste = carbonInput.other?.waste ?? [];
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
