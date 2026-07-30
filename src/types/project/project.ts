export type CarbonDetail = {
  scope1: {
    activities: Scope1Activity[] | null;
  };
  scope2: {
    buildings: LegacyScope2Building[] | null;
    generators: LegacyScope2Generator[] | null;
  };
  scope3: {
    attendee: Scope3Attendee[] | null;
    overnight: Scope3Overnight[] | null;
    souvenir: Scope3Souvenir[] | null;
    transportations?: Scope3Transportation[] | null;
    waste: Scope3Waste[] | null;
  };
};

export type ProjectInfo = {
  environmental_policy: string;
  policy_implementation_suggestion: string;
  policy_implementation_photos?: PolicyImplementationPhoto[] | null;
};

export type PolicyImplementationPhoto = {
  storage_key: string;
  filename: string;
  mime_type: string;
  size?: number;
  size_bytes?: number;
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

type LegacyScope2Building = {
  name: string;
  room: string;
  start_time: ISODateTime | null;
  end_time: ISODateTime | null;
  meter_value: number;
  facilities: string[] | null;
};

type LegacyScope2Generator = {
  facilities: string[] | null;
  unit: string;
  value: number;
};

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
