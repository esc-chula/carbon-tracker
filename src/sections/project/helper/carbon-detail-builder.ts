import type { CarbonDetail, CarbonInput } from "@/types/project/project";
import type { ProjectFormValues } from "../form/type";

const toArray = <T>(values: T[] | undefined | null): T[] =>
  values?.length ? values : [];

function buildCarbonDetail(data: ProjectFormValues): CarbonDetail {
  const scope2Entries = data.scope2_entries ?? [];

  const scope2Buildings = scope2Entries
    .filter((item) => item.kind === "building" || item.kind === "meter")
    .map((item) => ({
      name: item.name?.trim() ?? "",
      room: item.room?.trim() ?? "",
      start_time: item.start_time?.trim() ?? null,
      end_time: item.end_time?.trim() ?? null,
      facilities:
        item.kind === "meter"
          ? toArray(item.meter_facilities)
          : toArray(item.building_facilities),
      meter_value: item.meter_value ?? 0,
    }));

  const scope2Generators = scope2Entries
    .filter((item) => item.kind === "generator")
    .map((item) => ({
      facilities: toArray(item.generator_facilities),
      unit: item.unit?.trim() ?? "",
      value: item.value ?? 0,
    }));

  const carbonDetails: CarbonDetail = {
    scope1: {
      activities:
        data.scope1_activities?.map((item) => ({
          name: item?.name ?? "",
          value: item?.value ?? 0,
          unit: item?.unit ?? "",
        })) ?? [],
    },
    scope2: {
      buildings: scope2Buildings,
      generators: scope2Generators,
    },
    scope3: {
      attendee:
        data.scope3_attendee?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      overnight:
        data.scope3_overnight?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      souvenir:
        data.scope3_souvenir?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
      transportations: [],
      waste:
        data.scope3_waste?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
    },
  };

  return carbonDetails;
}

function buildCarbonInput(data: ProjectFormValues): CarbonInput {
  const scope2Entries = data.scope2_entries ?? [];

  const energyBuildings = scope2Entries
    .filter((item) => item.kind === "building" || item.kind === "meter")
    .map((item) => ({
      name: item.name?.trim() ?? "",
      room: item.room?.trim() ?? "",
      start_time: item.start_time?.trim() ?? null,
      end_time: item.end_time?.trim() ?? null,
      facilities:
        item.kind === "meter"
          ? toArray(item.meter_facilities)
          : toArray(item.building_facilities),
      meter_value: item.meter_value ?? 0,
    }));

  const energyGenerators = scope2Entries
    .filter((item) => item.kind === "generator")
    .map((item) => ({
      facilities: toArray(item.generator_facilities),
      unit: item.unit?.trim() ?? "",
      value: item.value ?? 0,
    }));

  return {
    food_beverage: {
      activities:
        data.scope1_activities?.map((item) => ({
          name: item?.name ?? "",
          value: item?.value ?? 0,
          unit: item?.unit ?? "",
        })) ?? [],
    },
    energy: {
      buildings: energyBuildings,
      generators: energyGenerators,
    },
    other: {
      attendees:
        data.scope3_attendee?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      internal_vehicles:
        data.scope3_internal_vehicles?.map((item) => ({
          distance_km: item?.distance_km ?? 0,
          people_count: item?.people_count ?? 0,
          vehicle_type: item?.vehicle_type ?? "",
        })) ?? [],
      overnight_on_campus:
        data.scope3_overnight_on_campus?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      overnight_off_campus:
        data.scope3_overnight_off_campus?.map((item) => ({
          date: item.date ?? "",
          value: item.value ?? 0,
        })) ?? [],
      souvenirs:
        data.scope3_souvenir?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
      transportations: [],
      waste:
        data.scope3_waste?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
    },
  };
}

type RealTimeDate = Date | undefined;

type RealtimeCarbonDetail = {
  scope1: {
    activities: Array<{
      name: string;
      unit: string;
      value: number;
    }>;
  };
  scope2: {
    buildings: Array<{
      name: string;
      room: string;
      start_time?: RealTimeDate;
      end_time?: RealTimeDate;
      meter_value: number;
      facilities: string[];
    }>;
    generators: Array<{
      facilities: string[];
      unit: string;
      value: number;
    }>;
  };
  scope3: {
    attendee: Array<{
      date?: RealTimeDate;
      value: number;
    }>;
    overnight: Array<{
      date?: RealTimeDate;
      value: number;
    }>;
    souvenir: Array<{
      type: string;
      unit: string;
      value: number;
    }>;
    transportations: Array<{
      type: string;
      origin?: {
        district: string;
        province: string;
      };
    }>;
    waste: Array<{
      type: string;
      unit: string;
      value: number;
    }>;
  };
};

type RealtimeCarbonInput = {
  food_beverage: RealtimeCarbonDetail["scope1"];
  energy: RealtimeCarbonDetail["scope2"];
  other: {
    attendees: RealtimeCarbonDetail["scope3"]["attendee"];
    internal_vehicles: Array<{
      distance_km: number;
      people_count: number;
      vehicle_type: string;
    }>;
    overnight_on_campus: RealtimeCarbonDetail["scope3"]["overnight"];
    overnight_off_campus: RealtimeCarbonDetail["scope3"]["overnight"];
    souvenirs: RealtimeCarbonDetail["scope3"]["souvenir"];
    transportations: RealtimeCarbonDetail["scope3"]["transportations"];
    waste: RealtimeCarbonDetail["scope3"]["waste"];
  };
};

const toValidDate = (value: string | null | undefined): RealTimeDate => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

function buildRealtimeCarbonDetail(
  data: ProjectFormValues,
): RealtimeCarbonDetail {
  const base = buildCarbonDetail(data);

  return {
    scope1: {
      activities: toArray(base.scope1.activities).map((activity) => ({
        name: activity.name,
        unit: activity.unit,
        value: activity.value,
      })),
    },
    scope2: {
      buildings: toArray(base.scope2.buildings).map((building) => ({
        name: building.name,
        room: building.room,
        facilities: toArray(building.facilities),
        start_time: toValidDate(building.start_time),
        end_time: toValidDate(building.end_time),
        meter_value: building.meter_value,
      })),
      generators: toArray(base.scope2.generators).map((generator) => ({
        facilities: toArray(generator.facilities),
        unit: generator.unit,
        value: generator.value,
      })),
    },
    scope3: {
      attendee: toArray(base.scope3.attendee).map((attendee) => ({
        date: toValidDate(attendee.date),
        value: attendee.value,
      })),
      overnight: toArray(base.scope3.overnight).map((overnight) => ({
        date: toValidDate(overnight.date),
        value: overnight.value,
      })),
      souvenir: toArray(base.scope3.souvenir).map((souvenir) => ({
        type: souvenir.type,
        unit: souvenir.unit,
        value: souvenir.value,
      })),
      transportations: toArray(base.scope3.transportations).map(
        (transportation) => ({
          type: transportation.type,
          origin: transportation.origin,
        }),
      ),
      waste: toArray(base.scope3.waste).map((waste) => ({
        type: waste.type,
        unit: waste.unit,
        value: waste.value,
      })),
    },
  };
}

function buildRealtimeCarbonInput(data: ProjectFormValues): RealtimeCarbonInput {
  const base = buildCarbonInput(data);

  return {
    food_beverage: {
      activities: toArray(base.food_beverage.activities).map((activity) => ({
        name: activity.name,
        unit: activity.unit,
        value: activity.value,
      })),
    },
    energy: {
      buildings: toArray(base.energy.buildings).map((building) => ({
        name: building.name,
        room: building.room,
        facilities: toArray(building.facilities),
        start_time: toValidDate(building.start_time),
        end_time: toValidDate(building.end_time),
        meter_value: building.meter_value,
      })),
      generators: toArray(base.energy.generators).map((generator) => ({
        facilities: toArray(generator.facilities),
        unit: generator.unit,
        value: generator.value,
      })),
    },
    other: {
      attendees: toArray(base.other.attendees).map((attendee) => ({
        date: toValidDate(attendee.date),
        value: attendee.value,
      })),
      internal_vehicles: toArray(base.other.internal_vehicles).map(
        (vehicle) => ({
          distance_km: vehicle.distance_km,
          people_count: vehicle.people_count,
          vehicle_type: vehicle.vehicle_type,
        }),
      ),
      overnight_on_campus: toArray(base.other.overnight_on_campus).map(
        (overnight) => ({
          date: toValidDate(overnight.date),
          value: overnight.value,
        }),
      ),
      overnight_off_campus: toArray(base.other.overnight_off_campus).map(
        (overnight) => ({
          date: toValidDate(overnight.date),
          value: overnight.value,
        }),
      ),
      souvenirs: toArray(base.other.souvenirs).map((souvenir) => ({
        type: souvenir.type,
        unit: souvenir.unit,
        value: souvenir.value,
      })),
      transportations: toArray(base.other.transportations).map(
        (transportation) => ({
          type: transportation.type,
          origin: transportation.origin,
        }),
      ),
      waste: toArray(base.other.waste).map((waste) => ({
        type: waste.type,
        unit: waste.unit,
        value: waste.value,
      })),
    },
  };
}

export {
  buildCarbonDetail,
  buildCarbonInput,
  buildRealtimeCarbonDetail,
  buildRealtimeCarbonInput,
};
export type { RealtimeCarbonDetail, RealtimeCarbonInput };
