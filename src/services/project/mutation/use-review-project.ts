import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { ky } from "@/services/ky";
import {
  type TReviewProjectRequest,
  type TReviewProjectResponse,
} from "@/types/project/review-project";

// ---------------------------------------------------------------------------------

async function putReviewProject(
  payload: TReviewProjectRequest,
): Promise<TReviewProjectResponse> {
  const { id, detail, note } = payload;

  await ky.put(`projects/${id}/review`, {
    json: {
      detail,
      note,
    },
  });
}

// ---------------------------------------------------------------------------------

function useReviewProjectMutation(): UseMutationResult<
  TReviewProjectResponse,
  unknown,
  TReviewProjectRequest,
  unknown
> {
  return useMutation<TReviewProjectResponse, unknown, TReviewProjectRequest>({
    mutationFn: putReviewProject,
  });
}

export { useReviewProjectMutation };
