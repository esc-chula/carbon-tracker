import type { TCreateProjectRequest } from "@/types/project/create-project";
import type { ProjectFormValues } from "../form/type";
import type { TProjectStatus } from "@/types/project/list-project";
import { buildCarbonDetail } from "./carbon-detail-builder";

function CreateProjectFormatter(
  data: ProjectFormValues,
  status: TProjectStatus,
): TCreateProjectRequest {
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

  const carbonDetails = buildCarbonDetail(data);

  const transportationsFile =
    data.transportations_csv_file && data.transportations_csv_file.size === 0
      ? undefined
      : data.transportations_csv_file;

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
    transportations_csv_file: transportationsFile,
    carbon_detail: JSON.stringify(carbonDetails),
  };

  return formattedData;
}

export default CreateProjectFormatter;
