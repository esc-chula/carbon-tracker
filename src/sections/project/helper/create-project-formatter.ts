import type { TCreateProjectRequest } from "@/types/project/create-project";
import type { ProjectFormValues } from "../form/type";
import type { TProjectStatus } from "@/types/project/list-project";
import { buildCarbonInput } from "./carbon-detail-builder";

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

  const carbonInput = buildCarbonInput(data);
  const projectInfo = {
    environmental_policy: data.environmental_policy.trim(),
    policy_implementation_suggestion:
      data.policy_implementation_suggestion.trim(),
  };

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
    owner_line_id: data.owner_line_id.trim(),
    owner_student_id: data.owner_student_id,
    policy_implementation_photos: data.policy_implementation_photos ?? [],
    project_info: JSON.stringify(projectInfo),
    status,
    title: data.title,
    transportations_csv_file: transportationsFile,
    carbon_input: JSON.stringify(carbonInput),
  };

  return formattedData;
}

export default CreateProjectFormatter;
