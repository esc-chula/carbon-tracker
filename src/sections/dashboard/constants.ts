import { fieldOptions } from "../project/form/constant";

const PIE_CHART_COLOR_SCHEMA = [
  "#6B1B1F",
  "#97262C",
  "#AC5156",
  "#828F9A",
  "#A7B1BC",
  "#CBD1D7",
  "#DBE0E4",
  "#E5E8EB",
  "#EDEFF1",
  "#F1F3F4",
  "#F7F8F9",
  "#F7F8F9",
];

const compareFn = (a: number, b: number) => {
  if (a < b) return 1;

  if (a > b) return -1;

  return 0;
};

const DATA_PIE = fieldOptions
  .slice(0, -1)
  .map((f) => ({
    id: f.value,
    label: f.label,
    value: Math.floor(Math.random() * 10000) + 1000,
  }))
  .sort((a, b) => compareFn(a.value, b.value));

export { DATA_PIE, PIE_CHART_COLOR_SCHEMA };
