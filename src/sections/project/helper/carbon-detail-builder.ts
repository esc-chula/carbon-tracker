import type { CarbonInput, EnergyItem } from "@/types/project/project";
import type { ProjectFormValues } from "../form/type";

const toArray = <T>(values: T[] | undefined | null): T[] =>
  values?.length ? values : [];

function buildCarbonInput(data: ProjectFormValues): CarbonInput {
  const scope2Entries = data.scope2_entries ?? [];

  const energyItems: EnergyItem[] = scope2Entries.map((item) => {
    if (item.kind === "meter") {
      return {
        type: "meter",
        name: item.name?.trim() ?? "",
        room: item.room?.trim() ?? "",
        meter_value: item.meter_value ?? 0,
      };
    }

    if (item.kind === "generator") {
      return {
        type: "generator",
        unit: item.unit?.trim() ?? "",
        value: item.value ?? 0,
        date: item.date?.trim() ?? item.start_time?.trim() ?? "",
      };
    }

    return {
      type: "building",
      name: item.name?.trim() ?? "",
      room: item.room?.trim() ?? "",
      facilities: toArray(item.building_facilities),
      start_time: item.start_time?.trim() ?? "",
      end_time: item.end_time?.trim() ?? "",
    };
  });

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
      items: energyItems,
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
      waste:
        data.scope3_waste?.map((item) => ({
          type: item.type ?? "",
          unit: item.unit ?? "",
          value: item.value ?? 0,
        })) ?? [],
    },
    green_catering: {
      restaurants:
        data.green_catering
          ?.filter(
            (item) =>
              item.name?.trim() ??
              item.contact?.trim() ??
              item.location ??
              item.packaging,
          )
          .map((item) => ({
            name: item.name?.trim() ?? "",
            contact: item.contact?.trim() ?? "",
            location: {
              type: item.location ?? "",
              other: item.location_other?.trim() ?? "",
            },
            packaging: {
              type: item.packaging ?? "",
              other: item.packaging_other?.trim() ?? "",
            },
          })) ?? [],
    },
  };
}

function buildRealtimeCarbonInput(data: ProjectFormValues): CarbonInput {
  return buildCarbonInput(data);
}

export { buildCarbonInput, buildRealtimeCarbonInput };
