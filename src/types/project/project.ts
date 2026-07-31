export type ProjectInfo = {
  environmental_policy: string;
  policy_implementation_suggestion: string;
  policy_implementation_photos?: PolicyImplementationPhoto[] | null;
};

export type PolicyImplementationPhoto = {
  storage_key: string;
  filename: string;
  size?: number;
  mime_type: string;
  url?: string;
};

export type CarbonInput = {
  energy: {
    items: EnergyItem[] | null;
  };
  food_beverage: {
    activities: Scope1Activity[] | null;
  };
  other: {
    attendees: Scope3Attendee[] | null;
    internal_vehicles: InternalVehicle[] | null;
    overnight_on_campus: Scope3Overnight[] | null;
    overnight_off_campus: Scope3Overnight[] | null;
    souvenirs: Scope3Souvenir[] | null;
    transportations?: Scope3Transportation[] | null;
    waste: Scope3Waste[] | null;
  };
};

type ISODateTime = string;

// --- Scope 1
export type Scope1Activity = {
  name: string;
  unit: string;
  value: number;
};

// --- Scope 2
export type Scope2Building = {
  type: "building";
  name: string;
  room: string;
  facilities: string[];
  start_time: ISODateTime;
  end_time: ISODateTime;
};

export type Scope2Meter = {
  type: "meter";
  name: string;
  room: string;
  meter_value: number;
};

export type Scope2Generator = {
  type: "generator";
  unit: string;
  value: number;
  date: ISODateTime;
};

export type EnergyItem = Scope2Building | Scope2Meter | Scope2Generator;

// --- Scope 3
export type Scope3Attendee = {
  date: ISODateTime;
  value: number;
};

export type Scope3Overnight = {
  date: ISODateTime;
  value: number;
};

export type InternalVehicle = {
  distance_km: number;
  people_count: number;
  vehicle_type: string;
};

export type Scope3Souvenir = {
  type: string;
  unit: string;
  value: number;
};

export type Scope3Transportation = {
  id: string;
  origin: {
    district: string;
    province: string;
  };
  project_id: string;
  type: string;
};

export type Scope3Waste = {
  type: string;
  unit: string;
  value: number;
};
