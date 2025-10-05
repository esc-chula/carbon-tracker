import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { ky } from "@/services/ky";
import {
  type TUpdateProjectStatusRequest,
  type TUpdateProjectStatusResponse,
} from "@/types/project/update-project-status";

// ---------------------------------------------------------------------------------

async function putUpdateProjectStatus(
  payload: TUpdateProjectStatusRequest,
): Promise<TUpdateProjectStatusResponse> {
  const { id, status } = payload;

  await ky.put(`projects/${id}/status`, {
    json: {
      status,
    },
  });
}

// ---------------------------------------------------------------------------------

function useUpdateProjectStatusMutation(): UseMutationResult<
  TUpdateProjectStatusResponse,
  unknown,
  TUpdateProjectStatusRequest,
  unknown
> {
  return useMutation<
    TUpdateProjectStatusResponse,
    unknown,
    TUpdateProjectStatusRequest
  >({
    mutationFn: putUpdateProjectStatus,
  });
}

export { useUpdateProjectStatusMutation };
