import type { TUpdateProjectRequest } from "@/types/project/update-project";
import type { ProjectFormValues } from "../form/type";
import CreateProjectFormatter from "./create-project-formatter";
import type { TProjectStatus } from "@/types/project/list-project";

function UpdateProjectFormatter(
  id: string,
  data: ProjectFormValues,
  status: TProjectStatus,
): TUpdateProjectRequest {
  const formatted = CreateProjectFormatter(data, status);

  return {
    id,
    carbon_input: formatted.carbon_input,
    custom_id: formatted.custom_id,
    org: formatted.org,
    org_detail: formatted.org_detail,
    policy_implementation_photo_keys: data.policy_implementation_photo_keys,
    policy_implementation_photos: formatted.policy_implementation_photos,
    project_info: formatted.project_info,
    title: formatted.title,
    transportations_csv_file: formatted.transportations_csv_file ?? null,
  };
}

export default UpdateProjectFormatter;
