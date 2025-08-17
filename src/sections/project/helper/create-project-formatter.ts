import type { CarbonDetail } from "@/types/project/project";
import type { ProjectFormValues } from "../form/type";
import type { TCreateProjectRequest } from "@/types/project/create-project";

function CreateProjectFormatter(
  data: ProjectFormValues,
  status: "draft" | "pending",
): TCreateProjectRequest {
  const formattedOrganizeDetail = (org: "กวศ." | "ชมรม" | "อื่นๆ") => {
    switch (org) {
      case "กวศ.":
        return data.field;
      case "ชมรม":
        return data.clubName;
      case "อื่นๆ":
        return data.otherUnderProject;

      default:
        return "";
    }
  };

  const carbonDetails: CarbonDetail = {
    scope1: {
      activities:
        data.activities?.map((item) => {
          return {
            name: item?.activity_type ?? "",
            value: item.amount ?? 0,
            unit: item.unit ?? "",
          };
        }) ?? null,
    },
    scope2: {
      buildings:
        data.energies
          ?.filter((item) => item.type === "building")
          .map((item) => ({
            name: item.building ?? "",
            room: item.room ?? "",
            start_time: item.startDate ?? "",
            end_time: item.endDate ?? "",
            facilities: item.equipment ?? null,
          })) ?? null,
      generators:
        data.energies
          ?.filter((item) => item.type === "electric")
          .map((item) => ({
            facilities: item.equipment ?? null,
            unit: item.unit ?? "",
            value: item.quantity ?? 0,
          })) ?? null,
    },
    scope3: {
      attendee:
        data.participant.map((item) => ({
          date: item.date ?? "",
          value: item.participant_amount ?? 0,
        })) ?? null,
      overnight:
        data.accommodation?.map((item) => ({
          date: item.date ?? "",
          value: item.participant_amount ?? 0,
        })) ?? null,
      souvenir:
        data.gift?.map((item) => ({
          type: item.gift_type ?? "",
          unit: item.unit ?? "",
          value: item.amount ?? 0,
        })) ?? null,
      transportations: undefined,
      waste:
        data.waste?.map((item) => ({
          type: item.waste_type ?? "",
          unit: item.unit ?? "",
          value: item.amount ?? 0,
        })) ?? null,
    },
  };

  const formattedData: TCreateProjectRequest = {
    custom_id: data.projectCode,
    org: data.underProject,
    org_detail:
      formattedOrganizeDetail(data.underProject as "กวศ." | "ชมรม" | "อื่นๆ") ??
      "",
    owner_fullname: data.fullName,
    owner_major: data.department,
    owner_nickname: data.nickname,
    owner_phone_number: data.tel,
    owner_student_id: data.student_id,
    status: status,
    title: data.projectName,
    transportations_csv_file: data.transportations_csv_file,
    carbon_detail: JSON.stringify(carbonDetails),
  };

  return formattedData;
}

export default CreateProjectFormatter;
