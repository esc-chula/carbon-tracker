export type TGetCarbonEmissionRequest = { id: string };

export type TGetCarbonEmissionResponse = {
  $schema?: string;
  carbon_emission: number;
  project_id: string;
};
