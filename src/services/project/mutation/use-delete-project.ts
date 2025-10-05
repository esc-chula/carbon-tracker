import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { ky } from "@/services/ky";
import {
  type TDeleteProjectRequest,
  type TDeleteProjectResponse,
} from "@/types/project/delete-project";

// ---------------------------------------------------------------------------------

async function deleteProject(
  payload: TDeleteProjectRequest,
): Promise<TDeleteProjectResponse> {
  const { id } = payload;

  await ky.delete(`projects/${id}`);
}

// ---------------------------------------------------------------------------------

function useDeleteProjectMutation(): UseMutationResult<
  TDeleteProjectResponse,
  unknown,
  TDeleteProjectRequest,
  unknown
> {
  return useMutation<TDeleteProjectResponse, unknown, TDeleteProjectRequest>({
    mutationFn: deleteProject,
  });
}

export { useDeleteProjectMutation };
