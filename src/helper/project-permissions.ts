import type { TOwner } from "@/types/user/get-owner";

function canModifyProject(
  currentOwner: Pick<TOwner, "id" | "is_admin"> | null | undefined,
  projectOwnerId: string | null | undefined,
): boolean {
  if (!currentOwner) return false;
  if (currentOwner.is_admin) return true;
  return Boolean(projectOwnerId && currentOwner.id === projectOwnerId);
}

export { canModifyProject };
