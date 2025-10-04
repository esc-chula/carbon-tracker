import {
  activityOptions,
  activityUnitOptions,
  equipmentOptions,
} from "../form/constant";

const activityMap: Record<string, string> = Object.fromEntries(
  activityOptions.map((opt) => [opt.value, opt.label]),
);

function ActivityNameMapper(value: string) {
  return activityMap[value] ?? value;
}

const activityUnitMap: Record<string, string> = Object.fromEntries(
  activityUnitOptions.map((opt) => [opt.value, opt.label]),
);

function ActivityUnitMapper(value: string) {
  return activityUnitMap[value] ?? value;
}

const facilityMap: Record<string, string> = Object.fromEntries(
  equipmentOptions.map((opt) => [opt.value, opt.label]),
);

function FacilityMapper(value: string) {
  return facilityMap[value] ?? value;
}

export { ActivityNameMapper, ActivityUnitMapper, FacilityMapper };
