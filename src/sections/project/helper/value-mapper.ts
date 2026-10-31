/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  activityOptions,
  activityUnitOptions,
  equipmentOptions,
  greenCateringLocationOptions,
  greenCateringPackagingOptions,
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

const greenCateringLocationMap: Record<string, string> = Object.fromEntries(
  greenCateringLocationOptions.map((opt) => [opt.value, opt.label]),
);

function GreenCateringLocationMapper(value: string) {
  return greenCateringLocationMap[value] ?? value;
}

const greenCateringPackagingMap: Record<string, string> = Object.fromEntries(
  greenCateringPackagingOptions.map((opt) => [opt.value, opt.label]),
);

function GreenCateringPackagingMapper(value: string) {
  return greenCateringPackagingMap[value] ?? value;
}

export {
  ActivityNameMapper,
  ActivityUnitMapper,
  FacilityMapper,
  GreenCateringLocationMapper,
  GreenCateringPackagingMapper,
};
