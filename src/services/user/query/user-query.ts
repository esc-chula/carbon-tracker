import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import type { TGetOwnerResponse } from "@/types/user/get-owner";

// ---------------------------------------------------------------------------------

async function fetchGetOwner(): Promise<TGetOwnerResponse> {
  const res = await ky.get("owners/me").json<TGetOwnerResponse>();
  return res;
}

async function fetchValidateOwner(): Promise<void> {
  const res = await ky.post("owners/validate", { throwHttpErrors: false });
  if (res.status !== 204) {
    throw new Error("Unauthorized email");
  }
}

// ---------------------------------------------------------------------------------

const ownersQueryKeys = {
  all: () => ["owners-management"] as const,

  me: () => [...ownersQueryKeys.all(), "me"] as const,

  meOptions: () =>
    queryOptions({
      queryKey: [...ownersQueryKeys.me()] as const,
      queryFn: () => fetchGetOwner(),
    }),
};

export { ownersQueryKeys, fetchGetOwner, fetchValidateOwner };
