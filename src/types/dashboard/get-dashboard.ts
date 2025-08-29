// request
export type TGetDashboardRequest = {
  year?: number;
};

// response
export type TGetDashboardResponse = {
  dashboard: {
    carbon_emission_by_organization:
      | {
          organization: string;
          percent: number;
          total: number;
        }[]
      | null;

    carbon_emission_per_person: {
      scope1: number;
      scope2: number;
      scope3: number;
      total: number;
    };

    heatmap: {
      electricity_usages:
        | {
            amount: number;
            date: string;
            rank: number;
            year: number;
          }[]
        | null;
    };
    total_project: number;
  };
};
