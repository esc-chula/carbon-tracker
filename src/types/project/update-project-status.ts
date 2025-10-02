import type { TProjectStatus } from "./list-project";

export type TProjectStatusUpdatable = Extract<TProjectStatus, "pending" | "fixing">;

export type TUpdateProjectStatusRequest = {
  id: string;
  status: TProjectStatusUpdatable;
};

export type TUpdateProjectStatusResponse = void;
