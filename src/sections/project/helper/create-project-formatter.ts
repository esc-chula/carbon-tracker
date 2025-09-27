import type { CarbonDetail } from "@/types/project/project";
import type { ProjectFormValues } from "../form/type";
import type { TCreateProjectRequest } from "@/types/project/create-project";

function CreateProjectFormatter(
  data: ProjectFormValues,
  status: "draft" | "pending",
): TCreateProjectRequest {
  const resolveOrgDetail = () => {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const org = data.org as "กวศ." | "ชมรม" | "other" | string;

    switch (org) {
      case "กวศ.":
        return data.field?.trim() ?? "";
      case "ชมรม":
        return data.clubName?.trim() ?? "";
      case "other":
      case "อื่นๆ":
        return data.otherUnderProject?.trim() ?? "";
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
        })) ?? null,
    },
    scope2: {
      buildings:
        data.scope2_entries
          ?.filter((item) => item.kind === "building")
          .map((item) => ({
            name: item.name ?? "",
            room: item.room ?? "",
            start_time: item.start_time ?? "",
            end_time: item.end_time ?? "",
            facilities: item.facilities ?? null,
          })) ?? null,
      generators:
        data.scope2_entries
          ?.filter((item) => item.kind === "generator")
          .map((item) => ({
            facilities: item.facilities ?? null,
            unit: item.unit ?? "",
            value: item.value ?? 0,
          })) ?? null,
    },
    scope3: {
      attendee:
        data.scope3_attendee.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? null,
      overnight:
        data.scope3_overnight?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? null,
      souvenir:
        data.scope3_souvenir?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? null,
      transportations: undefined,
      waste:
        data.scope3_waste?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? null,
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
