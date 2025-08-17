import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import type {
  TCreateProjectRequest,
  TCreateProjectResponse,
} from "@/types/project/create-project";
import { ky } from "@/services/ky";

// ---------------------------------------------------------------------------------

async function postCreateProject(
  payload: TCreateProjectRequest,
): Promise<TCreateProjectResponse> {
  const formData = new FormData();

  formData.append("carbon_detail", payload.carbon_detail);
  formData.append("custom_id", payload.custom_id);
  formData.append("org", payload.org);
  formData.append("org_detail", payload.org_detail);
  formData.append("owner_fullname", payload.owner_fullname);
  formData.append("owner_major", payload.owner_major);
  formData.append("owner_nickname", payload.owner_nickname);
  formData.append("owner_phone_number", payload.owner_phone_number);
  formData.append("owner_student_id", payload.owner_student_id);
  formData.append("status", payload.status);
  formData.append("title", payload.title);

  if (payload.transportations_csv_file) {
    formData.append(
      "transportations_csv_file",
      payload.transportations_csv_file,
    );
  }

  const response = await ky
    .post("projects/", {
      body: formData,
    })
    .json<TCreateProjectResponse>();

  return response;
}

// ---------------------------------------------------------------------------------

function useCreateProjectMutation(): UseMutationResult<
  TCreateProjectResponse,
  unknown,
  TCreateProjectRequest,
  unknown
> {
  return useMutation<TCreateProjectResponse, unknown, TCreateProjectRequest>({
    mutationFn: postCreateProject,
  });
}
export { useCreateProjectMutation };
