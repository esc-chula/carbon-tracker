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
    carbon_detail: formatted.carbon_detail,
    custom_id: formatted.custom_id,
    org: formatted.org,
    org_detail: formatted.org_detail,
    title: formatted.title,
    transportations_csv_file: formatted.transportations_csv_file ?? null,
  };
}

export default UpdateProjectFormatter;
