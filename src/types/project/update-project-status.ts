import type { TProjectStatus } from "./list-project";

export type TUpdateProjectStatusRequest = {
  id: string;
  status: TProjectStatus;
};

export type TUpdateProjectStatusResponse = void;
