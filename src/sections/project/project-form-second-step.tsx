import { Field } from "@/components/hook-form/field";
import RHFDateTimePicker from "@/components/hook-form/rhf-date-time-picker";

import StatusChips from "@/components/StatusChips";
import { SvgColor } from "@/components/svg/svg-color";
import {
  loadCarbonCalculator,
  type CarbonCalculator,
} from "@/helper/realtime-carbon-calculate/loader";
import type { UseBooleanReturn } from "@/hooks/use-boolean";
import type {
  ProjectFormValues,
  Scope1ActivityForm,
  Scope2EntryForm,
  Scope3AttendeeForm,
  Scope3OvernightForm,
  Scope3SouvenirForm,
  Scope3WasteForm,
} from "@/sections/project/form/type";
import {
  projectsQueryKeys,
  type EmissionFactorMap,
} from "@/services/project/query/project-query";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  useFormContext,
  useWatch,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormSetValue,
} from "react-hook-form";
import {
  activityOptions,
  activityUnitOptions,
  buildingOptions,
  energyUnitOptions,
  equipmentOptions,
  giftUnitOptions,
  roomOptions,
  wasteOptions,
  type TRoom,
} from "./form/constant";
import { buildRealtimeCarbonDetail } from "./helper/carbon-detail-builder";
import ProjectCarbonDetail from "./project-carbon-detail";
import ProjectRejectDetailButton from "./project-reject-detail-button";
import { StyledAddButton, StyledStack } from "./styles";

// ---------------------------------------------------------------------------------
type Params = {
  id: string;
};

type TProjectFormSecondStepProps = {
  step: number;
  scope1Activities: Scope1ActivityForm[];
  scope2Entries: Scope2EntryForm[];
  scope3Attendee: Scope3AttendeeForm[];
  scope3Overnight: Scope3OvernightForm[];
  scope3Souvenir: Scope3SouvenirForm[];
  scope3Waste: Scope3WasteForm[];
  errors: FieldErrors<ProjectFormValues>;
  customId: string;
  title: string;
  ownerFullName: string;
  phoneNumberText: string;
  greyColor: string;
  disableColor: string;
  redColor: string;
  setValue: UseFormSetValue<ProjectFormValues>;
  removeScope1Activity: (index: number) => void;
  appendScope1Activity: (value: Scope1ActivityForm) => void;
  removeScope2Entry: (index: number) => void;
  appendScope2Entry: (value: Scope2EntryForm) => void;
  removeScope3Attendee: (index: number) => void;
  appendScope3Attendee: (value: Scope3AttendeeForm) => void;
  removeScope3Overnight: (index: number) => void;
  appendScope3Overnight: (value: Scope3OvernightForm) => void;
  removeScope3Souvenir: (index: number) => void;
  appendScope3Souvenir: (value: Scope3SouvenirForm) => void;
  removeScope3Waste: (index: number) => void;
  appendScope3Waste: (value: Scope3WasteForm) => void;
  handleBack: () => void;
  onSubmit: (data: ProjectFormValues, status: "draft" | "pending") => void;
  openDialog: UseBooleanReturn;
  confirmDisabled: boolean;
  handleSubmit: UseFormHandleSubmit<ProjectFormValues>;
  isEdit?: boolean;
};

type CarbonSummary = {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
};

const ZERO_SUMMARY: CarbonSummary = {
  scope1: 0,
  scope2: 0,
  scope3: 0,
  total: 0,
};

const createZeroSummary = (): CarbonSummary => ({ ...ZERO_SUMMARY });

const nearlyEqual = (a: number, b: number, epsilon = 1e-6) =>
  Math.abs(a - b) <= epsilon;

const summariesEqual = (a: CarbonSummary, b: CarbonSummary) =>
  nearlyEqual(a.scope1, b.scope1) &&
  nearlyEqual(a.scope2, b.scope2) &&
  nearlyEqual(a.scope3, b.scope3) &&
  nearlyEqual(a.total, b.total);

export function ProjectFormSecondStep(props: TProjectFormSecondStepProps) {
  const {
    step,
    scope1Activities,
    scope2Entries,
    scope3Attendee,
    scope3Overnight,
    scope3Souvenir,
    scope3Waste,
    errors,
    customId,
    title,
    ownerFullName,
    phoneNumberText,
    greyColor,
    disableColor,
    redColor,
    setValue,
    removeScope1Activity,
    appendScope1Activity,
    removeScope2Entry,
    appendScope2Entry,
    removeScope3Attendee,
    appendScope3Attendee,
    removeScope3Overnight,
    appendScope3Overnight,
    removeScope3Souvenir,
    appendScope3Souvenir,
    removeScope3Waste,
    appendScope3Waste,
    handleBack,
    openDialog,
    confirmDisabled,
    onSubmit,
    handleSubmit,
    isEdit = false,
  } = props;

  // --------------------------- Hook ---------------------------

  const { control, watch } = useFormContext<ProjectFormValues>();
  const params = useParams<Params>();
  const projectId = params?.id ?? "";
  const emissionFactorsQuery = useQuery({
    ...projectsQueryKeys.emissionFactorsOptions(),
  });

  const emissionFactors: EmissionFactorMap | undefined =
    emissionFactorsQuery.data;
  const emissionFactorErrorMessage =
    emissionFactorsQuery.error instanceof Error
      ? emissionFactorsQuery.error.message
      : null;

  const scope2EntriesWatch = useWatch({ control, name: "scope2_entries" });

  const watchedValues = watch();

  const realtimeCarbonDetail = useMemo(
    () => buildRealtimeCarbonDetail(watchedValues),
    [watchedValues],
  );

  const calculatorRef = useRef<CarbonCalculator | null>(null);
  const [calculatorLoaded, setCalculatorLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadCarbonCalculator()
      .then((calc) => {
        if (mounted) {
          calculatorRef.current = calc;
          setCalculatorLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Failed to load carbon calculator:", error);
        if (mounted) {
          calculatorRef.current = null;
          setCalculatorLoaded(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const [carbonSummary, setCarbonSummary] = useState<CarbonSummary>(() =>
    createZeroSummary(),
  );

  useEffect(() => {
    scope2EntriesWatch?.forEach((entry, index) => {
      const kind = entry?.kind;

      if (kind === "generator") {
        const generatorFacilities = entry?.generator_facilities ?? [];
        if (!generatorFacilities.length) {
          setValue(
            `scope2_entries.${index}.generator_facilities`,
            ["เครื่องปั่นไฟฟ้า"],
            {
              shouldDirty: false,
              shouldTouch: false,
              shouldValidate: false,
            },
          );
        }

        if (entry?.meter_facilities?.length) {
          setValue(`scope2_entries.${index}.meter_facilities`, [], {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }
      } else if (kind === "meter") {
        const meterFacilities = entry?.meter_facilities ?? [];
        if (!meterFacilities.length) {
          setValue(`scope2_entries.${index}.meter_facilities`, ["มิเตอร์"], {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }

        if (entry?.generator_facilities?.length) {
          setValue(`scope2_entries.${index}.generator_facilities`, [], {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }

        if (entry?.unit !== "kWh") {
          setValue(`scope2_entries.${index}.unit`, "kWh", {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }
      } else {
        if (entry?.generator_facilities?.length) {
          setValue(`scope2_entries.${index}.generator_facilities`, [], {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }

        if (entry?.meter_facilities?.length) {
          setValue(`scope2_entries.${index}.meter_facilities`, [], {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }
      }
    });
  }, [scope2EntriesWatch, setValue]);

  useEffect(() => {
    if (step !== 2) {
      setCarbonSummary((prev) =>
        summariesEqual(prev, ZERO_SUMMARY) ? prev : createZeroSummary(),
      );
      return;
    }

    if (!calculatorLoaded || !calculatorRef.current) {
      setCarbonSummary((prev) =>
        summariesEqual(prev, ZERO_SUMMARY) ? prev : createZeroSummary(),
      );
      return;
    }

    if (
      emissionFactorErrorMessage ||
      !emissionFactors ||
      Object.keys(emissionFactors).length === 0
    ) {
      setCarbonSummary((prev) =>
        summariesEqual(prev, ZERO_SUMMARY) ? prev : createZeroSummary(),
      );
      return;
    }

    const timeoutId = setTimeout(() => {
      try {
        const result = calculatorRef.current!(
          realtimeCarbonDetail,
          emissionFactors,
        );

        if (result?.error) {
          setCarbonSummary((prev) =>
            summariesEqual(prev, ZERO_SUMMARY) ? prev : createZeroSummary(),
          );
          return;
        }

        const summary: CarbonSummary = {
          scope1: result.scope1?.activity ?? 0,
          scope2:
            (result.scope2?.building ?? 0) + (result.scope2?.generator ?? 0),
          scope3:
            (result.scope3?.transportation ?? 0) +
            (result.scope3?.attendee ?? 0) +
            (result.scope3?.overnight ?? 0) +
            (result.scope3?.souvenir ?? 0) +
            (result.scope3?.waste ?? 0),
          total: result.total ?? 0,
        };

        if (!Number.isFinite(summary.total)) {
          summary.total = summary.scope1 + summary.scope2 + summary.scope3;
        }

        setCarbonSummary((prev) =>
          summariesEqual(prev, summary) ? prev : summary,
        );
      } catch (error) {
        console.error("Carbon calculation error:", error);
        setCarbonSummary((prev) =>
          summariesEqual(prev, ZERO_SUMMARY) ? prev : createZeroSummary(),
        );
      }
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    step,
    calculatorLoaded,
    emissionFactors,
    emissionFactorErrorMessage,
    realtimeCarbonDetail,
  ]);

  const fieldErrorMessage = (error: unknown) =>
    typeof error === "object" && error != null && "message" in error
      ? (error as { message?: string }).message
      : undefined;

  // --------------------------- Value ---------------------------

  const file = watch("transportations_csv_file");
  const status = watch("status");

  // --------------------------- Render ---------------------------F

  const renderFirstScope = (
    <StyledStack>
      <Stack direction="row" spacing={1.5}>
        <ProjectCarbonDetail carbon={carbonSummary.scope1} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            Scope 1 : <br />
            ปริมาณการปล่อยก๊าซเรือนกระจกทางตรง
          </Typography>
          <Typography variant="caption" color={greyColor}>
            สามารถประมาณได้จากบิลงบประมาณจบโครงการ
          </Typography>
        </Stack>
      </Stack>

      <Grid container spacing={2} alignItems="start">
        {scope1Activities.map((field, index) => {
          const activityName = watch(`scope1_activities.${index}.name`);
          const activityValue = watch(`scope1_activities.${index}.value`);

          return (
            <Fragment key={index}>
              <Grid size={{ xs: 7.5 }}>
                <Field.CustomAutoComplete
                  name={`scope1_activities.${index}.name`}
                  label="ประเภทกิจกรรม"
                  options={activityOptions}
                  helperText={errors.scope1_activities?.[index]?.name?.message}
                  onInputChange={(_, value) => {
                    if (!value)
                      return setValue(`scope1_activities.${index}.unit`, "");

                    if (value === "ก๊าซหุงต้ม") {
                      setValue(`scope1_activities.${index}.unit`, "kg");
                    } else {
                      setValue(`scope1_activities.${index}.unit`, "box");
                    }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.Text
                  type="number"
                  name={`scope1_activities.${index}.value`}
                  label="ปริมาณพลังงานที่ใช้"
                  slotProps={{ htmlInput: { min: 0 } }}
                  disabled={!activityName}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.CustomAutoComplete
                  name={`scope1_activities.${index}.unit`}
                  label="หน่วย"
                  options={activityUnitOptions}
                  helperText={errors.scope1_activities?.[index]?.unit?.message}
                  disabled={!activityValue}
                  creatable
                  readOnly
                />
              </Grid>
              <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                <IconButton onClick={() => removeScope1Activity(index)}>
                  <SvgColor src="/assets/icons/ic-trash.svg" color={redColor} />
                </IconButton>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
      <StyledAddButton
        variant="outlined"
        startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
        onClick={() =>
          appendScope1Activity({ name: "", value: undefined, unit: "" })
        }
      >
        เพิ่มกิจกรรม
      </StyledAddButton>
    </StyledStack>
  );

  const renderSecondScope = (
    <StyledStack>
      <Stack direction="row" spacing={1.5}>
        <ProjectCarbonDetail carbon={carbonSummary.scope2} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            Scope 2 : <br />
            ปริมาณการปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน
          </Typography>
          <Typography variant="caption" color={greyColor}>
            สามารถประมาณได้จากบิลงบประมาณจบโครงการ
          </Typography>
        </Stack>
      </Stack>

      {scope2Entries.map((field, index) => {
        const kind = watch(`scope2_entries.${index}.kind`);
        const building = watch(`scope2_entries.${index}.name`);
        const generatorFacilities = watch(
          `scope2_entries.${index}.generator_facilities`,
        );
        const meterFacilities = watch(
          `scope2_entries.${index}.meter_facilities`,
        );

        const energyValue = watch(`scope2_entries.${index}.value`);
        const meterValue = watch(`scope2_entries.${index}.meter_value`);
        const room = watch(`scope2_entries.${index}.room`);

        return (
          <Fragment key={`${index}-${kind ?? "default"}`}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body1" fontWeight={400}>
                การใช้พลังงาน
              </Typography>
              <Field.GroupRadio
                name={`scope2_entries.${index}.kind`}
                options={[
                  { value: "building", label: "การใช้งานอาคาร." },
                  { value: "generator", label: "การใช้เครื่องปั่นไฟ" },
                  { value: "meter", label: "มิเตอร์ไฟฟ้า" },
                ]}
              />
            </Stack>
            <Grid container spacing={2} alignItems="start">
              {kind === "generator" ? (
                <>
                  <Grid size={{ xs: 2 }}>
                    <Field.MultipleAutoComplete
                      name={`scope2_entries.${index}.generator_facilities`}
                      label="อุปกรณ์ที่ใช้"
                      options={[
                        {
                          value: "เครื่องปั่นไฟฟ้า",
                          label: "เครื่องปั่นไฟฟ้า",
                        },
                      ]}
                      value={[
                        {
                          value: "เครื่องปั่นไฟฟ้า",
                          label: "เครื่องปั่นไฟฟ้า",
                        },
                      ]}
                      helperText={
                        errors.scope2_entries?.[index]?.generator_facilities
                          ?.message
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 7.5 }}>
                    <Field.Text
                      type="number"
                      name={`scope2_entries.${index}.value`}
                      label="ปริมาณพลังงานที่ใช้"
                      slotProps={{ htmlInput: { min: 0 } }}
                      disabled={!generatorFacilities?.length}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Field.CustomAutoComplete
                      name={`scope2_entries.${index}.unit`}
                      label="หน่วย"
                      options={energyUnitOptions}
                      helperText={errors.scope2_entries?.[index]?.unit?.message}
                      disabled={!energyValue}
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                    <IconButton onClick={() => removeScope2Entry(index)}>
                      <SvgColor
                        src="/assets/icons/ic-trash.svg"
                        color={redColor}
                      />
                    </IconButton>
                  </Grid>
                </>
              ) : kind === "meter" ? (
                <>
                  <Grid size={{ xs: 2.75 }}>
                    <Field.MultipleAutoComplete
                      name={`scope2_entries.${index}.meter_facilities`}
                      label="อุปกรณ์ที่ใช้"
                      options={[
                        {
                          value: "มิเตอร์",
                          label: "มิเตอร์",
                        },
                      ]}
                      value={[
                        {
                          value: "มิเตอร์",
                          label: "มิเตอร์",
                        },
                      ]}
                      helperText={
                        errors.scope2_entries?.[index]?.meter_facilities
                          ?.message
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 2.75 }}>
                    <Field.CustomAutoComplete
                      name={`scope2_entries.${index}.name`}
                      label="อาคารที่ใช้"
                      options={buildingOptions}
                      helperText={errors.scope2_entries?.[index]?.name?.message}
                      creatable
                    />
                  </Grid>
                  <Grid size={{ xs: 2.75 }}>
                    <Field.CustomAutoComplete
                      name={`scope2_entries.${index}.room`}
                      label="ห้องที่ใช้"
                      options={roomOptions[building as TRoom] ?? []}
                      disabled={!building}
                      creatable
                    />
                  </Grid>
                  <Grid size={{ xs: 2.75 }}>
                    <Field.Text
                      type="number"
                      name={`scope2_entries.${index}.meter_value`}
                      label="ปริมาณพลังงานที่ใช้"
                      slotProps={{ htmlInput: { min: 0 } }}
                      helperText={
                        errors.scope2_entries?.[index]?.meter_value?.message
                      }
                      disabled={!room}
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1.75 }}>
                    <Typography>kWh</Typography>
                  </Grid>
                  <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                    <IconButton onClick={() => removeScope2Entry(index)}>
                      <SvgColor
                        src="/assets/icons/ic-trash.svg"
                        color={redColor}
                      />
                    </IconButton>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.CustomAutoComplete
                      name={`scope2_entries.${index}.name`}
                      label="อาคารที่ใช้"
                      options={buildingOptions}
                      helperText={errors.scope2_entries?.[index]?.name?.message}
                      creatable
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.CustomAutoComplete
                      name={`scope2_entries.${index}.room`}
                      label="ห้องที่ใช้"
                      options={roomOptions[building as TRoom] ?? []}
                      disabled={!building}
                      creatable
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.MultipleAutoComplete
                      name={`scope2_entries.${index}.building_facilities`}
                      label="อุปกรณ์ที่ใช้"
                      options={equipmentOptions}
                      helperText={
                        errors.scope2_entries?.[index]?.building_facilities
                          ?.message
                      }
                      disabled={!room}
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <RHFDateTimePicker
                      name={`scope2_entries.${index}.start_time`}
                      label="วันและเวลาเริ่มใช้"
                      helperText={
                        errors.scope2_entries?.[index]?.start_time?.message
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <RHFDateTimePicker
                      name={`scope2_entries.${index}.end_time`}
                      label="วันและเวลาหยุดใช้"
                      helperText={
                        errors.scope2_entries?.[index]?.end_time?.message
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                    <IconButton onClick={() => removeScope2Entry(index)}>
                      <SvgColor
                        src="/assets/icons/ic-trash.svg"
                        color={redColor}
                      />
                    </IconButton>
                  </Grid>
                </>
              )}
            </Grid>
          </Fragment>
        );
      })}
      <StyledAddButton
        variant="outlined"
        startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
        onClick={() =>
          appendScope2Entry({
            kind: "building",
            name: "",
            room: "",
            building_facilities: [],
            generator_facilities: [],
            meter_facilities: [],
            start_time: undefined,
            end_time: undefined,
            meter_value: undefined,
            value: undefined,
            unit: "",
          })
        }
      >
        เพิ่มการใช้พลังงาน
      </StyledAddButton>
    </StyledStack>
  );

  const renderThirdScope = (
    <StyledStack>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <ProjectCarbonDetail carbon={carbonSummary.scope3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            Scope 3 : อื่นๆ
          </Typography>
          <Typography variant="caption" color={greyColor}>
            การเดินทางของผู้เข้าร่วมและ staff
          </Typography>
        </Stack>
      </Stack>

      <Field.CSVUploadField control={control} name="transportations_csv_file" />

      {!file && (
        <Button
          component="a"
          href={
            "https://docs.google.com/spreadsheets/d/1aZXR5jRYHNlC6jHlkh0Qa4R4gYYiy-A7OMuFdhPZ0AI/edit?usp=sharing"
          }
          target="_blank"
          variant="contained"
          sx={{ alignSelf: "start" }}
        >
          ดูตัวอย่าง CSV Template
        </Button>
      )}

      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          จำนวนผู้เข้าร่วมรวมกับ staff ตลอดทั้งโครงการ
          <Typography component="span" color="red">
            *
          </Typography>
        </Typography>
        <Grid container spacing={2} alignItems="start">
          {scope3Attendee.map((field, index) => {
            const date = watch(`scope3_attendee.${index}.date`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 3 }}>
                  <RHFDateTimePicker
                    mode="date"
                    name={`scope3_attendee.${index}.date`}
                    label="เลือกวันที่"
                    helperText={errors.scope3_attendee?.[index]?.date?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 8.5 }}>
                  <Field.Text
                    type="number"
                    name={`scope3_attendee.${index}.value`}
                    label="จำนวนคน"
                    slotProps={{ htmlInput: { min: 0 } }}
                    error={!!errors.scope3_attendee?.[index]?.value}
                    helperText={errors.scope3_attendee?.[index]?.value?.message}
                    disabled={!date}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton
                    onClick={() => removeScope3Attendee(index)}
                    disabled={scope3Attendee.length === 1}
                  >
                    <SvgColor
                      src="/assets/icons/ic-trash.svg"
                      color={
                        scope3Attendee.length === 1 ? disableColor : redColor
                      }
                    />
                  </IconButton>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() =>
            appendScope3Attendee({
              date: undefined,
              value: undefined,
            })
          }
        >
          เพิ่มวันที่
        </StyledAddButton>
      </StyledStack>
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          การพักแรมของผู้เข้าร่วมและ staff ตลอดทั้งโครงการ
        </Typography>
        <Grid container spacing={2} alignItems="start">
          {scope3Overnight?.map((field, index) => {
            const date = watch(`scope3_overnight.${index}.date`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 3 }}>
                  <RHFDateTimePicker
                    mode="date"
                    name={`scope3_overnight.${index}.date`}
                    label="เลือกวันที่พักแรม"
                    helperText={errors.scope3_overnight?.[index]?.date?.message}
                  />
                </Grid>
                <Grid size={{ xs: 8.5 }}>
                  <Field.Text
                    type="number"
                    name={`scope3_overnight.${index}.value`}
                    label="จำนวนคน"
                    slotProps={{ htmlInput: { min: 0 } }}
                    disabled={!date}
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton onClick={() => removeScope3Overnight(index)}>
                    <SvgColor
                      src="/assets/icons/ic-trash.svg"
                      color={redColor}
                    />
                  </IconButton>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() =>
            appendScope3Overnight({
              date: undefined,
              value: undefined,
            })
          }
        >
          เพิ่มวันที่พักแรม
        </StyledAddButton>
      </StyledStack>
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          ของแจกผู้เข้าร่วมและ staff
        </Typography>
        <Grid container spacing={2} alignItems="start">
          {scope3Souvenir?.map((field, index) => {
            const souvenirType = watch(`scope3_souvenir.${index}.type`);
            const amount = watch(`scope3_souvenir.${index}.value`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 7.5 }}>
                  <Field.CustomAutoComplete
                    name={`scope3_souvenir.${index}.type`}
                    label="เลือกประเภทของแจก"
                    options={giftUnitOptions}
                    helperText={fieldErrorMessage(
                      errors.scope3_souvenir?.[index]?.type,
                    )}
                    onInputChange={(_, value) => {
                      if (value) {
                        setValue(`scope3_souvenir.${index}.unit`, "kg");
                      } else {
                        setValue(`scope3_souvenir.${index}.unit`, "");
                      }
                    }}
                    creatable
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Text
                    type="number"
                    name={`scope3_souvenir.${index}.value`}
                    label="ปริมาณของแจก"
                    slotProps={{ htmlInput: { min: 0 } }}
                    disabled={!souvenirType}
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.CustomAutoComplete
                    name={`scope3_souvenir.${index}.unit`}
                    label="หน่วย"
                    options={[{ value: "kg", label: "กิโลกรัม" }]}
                    helperText={fieldErrorMessage(
                      errors.scope3_souvenir?.[index]?.unit,
                    )}
                    disabled={!amount}
                    readOnly
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton onClick={() => removeScope3Souvenir(index)}>
                    <SvgColor
                      src="/assets/icons/ic-trash.svg"
                      color={redColor}
                    />
                  </IconButton>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() =>
            appendScope3Souvenir({ type: "", value: undefined, unit: "" })
          }
        >
          เพิ่มของแจก
        </StyledAddButton>
      </StyledStack>
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          ของเสียหลังการจัดงาน
        </Typography>
        <Grid container spacing={2} alignItems="start">
          {scope3Waste?.map((field, index) => {
            const wasteType = watch(`scope3_waste.${index}.type`);
            const amount = watch(`scope3_waste.${index}.value`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 7.5 }}>
                  <Field.CustomAutoComplete
                    name={`scope3_waste.${index}.type`}
                    label="เลือกประเภทของเสีย"
                    options={wasteOptions}
                    helperText={fieldErrorMessage(
                      errors.scope3_waste?.[index]?.type,
                    )}
                    onInputChange={(_, value) => {
                      if (value) {
                        setValue(`scope3_waste.${index}.unit`, "kg");
                      } else {
                        setValue(`scope3_waste.${index}.unit`, "");
                      }
                    }}
                    creatable
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Text
                    type="number"
                    name={`scope3_waste.${index}.value`}
                    label="ปริมาณของเสีย"
                    slotProps={{ htmlInput: { min: 0 } }}
                    disabled={!wasteType}
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.CustomAutoComplete
                    name={`scope3_waste.${index}.unit`}
                    label="หน่วย"
                    options={[{ value: "kg", label: "กิโลกรัม" }]}
                    helperText={fieldErrorMessage(
                      errors.scope3_waste?.[index]?.unit,
                    )}
                    disabled={!amount}
                    readOnly
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton onClick={() => removeScope3Waste(index)}>
                    <SvgColor
                      src="/assets/icons/ic-trash.svg"
                      color={redColor}
                    />
                  </IconButton>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() =>
            appendScope3Waste({ type: "", value: undefined, unit: "" })
          }
        >
          เพิ่มของเสีย
        </StyledAddButton>
      </StyledStack>
    </StyledStack>
  );

  return (
    <>
      {step === 2 && (
        <>
          <Stack sx={{ padding: "16px 24px" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h4">{`[${customId}] ${title}`}</Typography>

              {isEdit && <StatusChips variantType={status} />}
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`ผู้กรอก: ${ownerFullName} (${phoneNumberText})`}</Typography>
          </Stack>

          {status === "fixing" && (
            <Stack padding="24px 0px  0px 24px">
              <ProjectRejectDetailButton id={projectId} />
            </Stack>
          )}

          <Stack sx={{ padding: 3, gap: 4, marginBottom: 10 }}>
            {renderFirstScope}

            {renderSecondScope}

            {renderThirdScope}

            <ProjectCarbonDetail carbon={carbonSummary.total} all />

            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: "16px 24px", justifyContent: "end" }}
            >
              <Button variant="text" color="secondary" onClick={handleBack}>
                ย้อนกลับ
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                disabled={confirmDisabled}
                onClick={() => {
                  void handleSubmit((data) => onSubmit(data, "draft"))();
                }}
              >
                บันทึกแบบร่าง
              </Button>

              <Button
                type="button"
                variant="contained"
                onClick={openDialog.onTrue}
              >
                ส่งแบบฟอร์ม
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
}
