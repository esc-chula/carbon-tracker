export type CarbonDetail = {
  scope1: {
    activities: Scope1Activity[] | null;
  };
  scope2: {
    buildings: Scope2Building[] | null;
    generators: Scope2Generator[] | null;
  };
  scope3: {
    attendee: Scope3Attendee[] | null;
    overnight: Scope3Overnight[] | null;
    souvenir: Scope3Souvenir[] | null;
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
  name: string;
  room: string;
  start_time: ISODateTime;
  end_time: ISODateTime;
  facilities: string[] | null;
};

export type Scope2Generator = {
  facilities: string[] | null;
  unit: string;
  value: number;
};

// --- Scope 3
export type Scope3Attendee = {
  date: ISODateTime;
  value: number;
};

export type Scope3Overnight = {
  date: ISODateTime;
  value: number;
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
