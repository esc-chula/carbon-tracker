import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { ky } from "@/services/ky";
import {
  type TUpdateProjectRequest,
  type TUpdateProjectResponse,
} from "@/types/project/update-project";

// ---------------------------------------------------------------------------------

async function patchUpdateProject(
  payload: TUpdateProjectRequest,
): Promise<TUpdateProjectResponse> {
  const { id, transportations_csv_file, ...fields } = payload;

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  if (transportations_csv_file) {
    formData.append("transportations_csv_file", transportations_csv_file);
  }

  await ky.patch(`projects/${id}`, {
    body: formData,
  });
}

// ---------------------------------------------------------------------------------

function useUpdateProjectMutation(): UseMutationResult<
  TUpdateProjectResponse,
  unknown,
  TUpdateProjectRequest,
  unknown
> {
  return useMutation<TUpdateProjectResponse, unknown, TUpdateProjectRequest>({
    mutationFn: patchUpdateProject,
  });
}

export { useUpdateProjectMutation };
