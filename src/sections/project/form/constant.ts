import constants from "@/constants/constants.json";

type Option = { value: string; label: string };
type RoomOption = Option & { meter_only?: boolean };
type RoomRecord = Record<string, RoomOption[]>;
type FieldOptionsByYear = Record<string, Option[]>;

type TRoom = keyof typeof constants.room_options;

const fieldOptionsByYear =
  constants.field_options_by_year as FieldOptionsByYear;

const getFieldOptionsByYear = (year?: string | number): Option[] => {
  const yearKey = String(year ?? "2026");
  return fieldOptionsByYear[yearKey] ?? fieldOptionsByYear["2026"] ?? [];
};

const roomOptions = constants.room_options as RoomRecord;

const filterRoomOptions = (predicate: (option: RoomOption) => boolean) =>
  Object.fromEntries(
    Object.entries(roomOptions).map(([building, options]) => [
      building,
      options.filter(predicate),
    ]),
  ) as Partial<RoomRecord>;

const roomOptionsMeterOnly = filterRoomOptions(
  (option) => option.meter_only === true,
);

const roomOptionsExcludeMeterOnly = filterRoomOptions(
  (option) => option.meter_only !== true,
);

const getBuildingOptions = (optionsByBuilding: Partial<RoomRecord>) =>
  Object.entries(optionsByBuilding)
    .filter(([, options]) => (options?.length ?? 0) > 0)
    .map(([building]) => ({
      value: building,
      label: building,
    }));

const fieldOptions = getFieldOptionsByYear("2026");
const departmentOptions = constants.department_options;
const activityOptions = constants.activity_options;
const activityUnitOptions = constants.activity_unit_options;
const buildingOptions = constants.building_options;
const buildingOptionsMeterOnly = getBuildingOptions(roomOptionsMeterOnly);
const buildingOptionsExcludeMeterOnly = getBuildingOptions(
  roomOptionsExcludeMeterOnly,
);
const equipmentOptions = constants.equipment_options;
const energyUnitOptions = constants.equipment_unit_options;
const internalVehicleOptions = constants.internal_vehicle_options;
const giftUnitOptions = constants.gift_options;
const wasteOptions = constants.waste_options;

export type { TRoom };
export {
  activityOptions,
  activityUnitOptions,
  buildingOptions,
  buildingOptionsMeterOnly,
  buildingOptionsExcludeMeterOnly,
  departmentOptions,
  energyUnitOptions,
  equipmentOptions,
  fieldOptions,
  fieldOptionsByYear,
  getFieldOptionsByYear,
  giftUnitOptions,
  internalVehicleOptions,
  roomOptions,
  roomOptionsMeterOnly,
  roomOptionsExcludeMeterOnly,
  wasteOptions,
};
