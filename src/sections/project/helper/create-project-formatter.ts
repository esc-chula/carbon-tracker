import type { CarbonDetail } from "@/types/project/project";
import type { TCreateProjectRequest } from "@/types/project/create-project";
import type { ProjectFormValues } from "../form/type";

const toArray = <T>(values: T[] | undefined) => values?.length ? values : [];

function CreateProjectFormatter(
  data: ProjectFormValues,
  status: "draft" | "pending",
): TCreateProjectRequest {
  const scope2Entries = data.scope2_entries ?? [];

  const scope2Buildings = scope2Entries
    .filter((item) => item.kind === "building")
    .map((item) => ({
      name: item.name?.trim() ?? "",
      room: item.room?.trim() ?? "",
      start_time: item.start_time?.trim() ?? "",
      end_time: item.end_time?.trim() ?? "",
      facilities: toArray(item.building_facilities),
    }));

  const scope2Generators = scope2Entries
    .filter((item) => item.kind === "generator")
    .map((item) => ({
      facilities: toArray(item.generator_facilities),
      unit: item.unit?.trim() ?? "",
      value: item.value ?? 0,
    }));

  const resolveOrgDetail = () => {
    const org = data.org;

    switch (org) {
      case "กวศ.":
        return data.field?.trim() ?? "";
      case "ชมรม":
        return data.clubName?.trim() ?? "";
      case "other":
      case "อื่นๆ":
        return data.otherUnderProject?.trim() ?? "";
      default:
        return data.org_detail?.trim() ?? "";
    }
  };

  const carbonDetails: CarbonDetail = {
    scope1: {
      activities:
        data.scope1_activities?.map((item) => ({
          name: item?.name ?? "",
          value: item?.value ?? 0,
          unit: item?.unit ?? "",
        })) ?? [],
    },
    scope2: {
      buildings: scope2Buildings,
      generators: scope2Generators,
    },
    scope3: {
      attendee:
        data.scope3_attendee?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      overnight:
        data.scope3_overnight?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      souvenir:
        data.scope3_souvenir?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
      transportations: [],
      waste:
        data.scope3_waste?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
    },
  };

  const formattedData: TCreateProjectRequest = {
    custom_id: data.custom_id,
    org: data.org,
    org_detail: resolveOrgDetail(),
    owner_fullname: data.owner_fullname,
    owner_major: data.owner_major,
    owner_nickname: data.owner_nickname,
    owner_phone_number: data.owner_phone_number,
    owner_student_id: data.owner_student_id,
    status,
    title: data.title,
    transportations_csv_file: data.transportations_csv_file,
    carbon_detail: JSON.stringify(carbonDetails),
  };

  return formattedData;
}

export default CreateProjectFormatter;
