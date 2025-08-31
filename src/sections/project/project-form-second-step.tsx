import { Field } from "@/components/hook-form/field";
import RHFDateTimePicker from "@/components/hook-form/rhf-date-time-picker";

import { SvgColor } from "@/components/svg/svg-color";
import type {
  Accommodation,
  Activity,
  Energy,
  Gift,
  Participant,
  ProjectFormValues,
  Waste,
} from "@/sections/project/form/type";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import {
  useFormContext,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import {
  buildingOptions,
  energyUnitOptions,
  equipmentOptions,
  giftUnitOptions,
  roomOptions,
  wasteOptions,
  type TRoom,
} from "./form/constant";
import { StyledAddButton, StyledStack } from "./styles";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { useBoolean } from "@/hooks/use-boolean";

// ---------------------------------------------------------------------------------

type TProjectFormSecondStepProps = {
  step: number;
  activities: Activity[];
  energies: Energy[];
  participant: Participant[];
  accommodation: Accommodation[];
  gift: Gift[];
  waste: Waste[];
  errors: FieldErrors<ProjectFormValues>;
  projectCode: string;
  projectName: string;
  fullName: string;
  telText: string;
  greyColor: string;
  disableColor: string;
  redColor: string;
  watch: UseFormWatch<ProjectFormValues>;
  setValue: UseFormSetValue<ProjectFormValues>;
  removeActivity: (index: number) => void;
  appendActivity: (value: Activity) => void;
  removeEnergy: (index: number) => void;
  appendEnergy: (value: Energy) => void;
  removeParticipant: (index: number) => void;
  appendParticipant: (value: Participant) => void;
  removeAccommodation: (index: number) => void;
  appendAccommodation: (value: Accommodation) => void;
  removeGift: (index: number) => void;
  appendGift: (value: Gift) => void;
  removeWaste: (index: number) => void;
  appendWaste: (value: Waste) => void;
  handleBack: () => void;
  onSubmit: (data: ProjectFormValues, status: "draft" | "pending") => void;
  handleSubmit: UseFormHandleSubmit<ProjectFormValues, ProjectFormValues>;
};

export function ProjectFormSecondStep(props: TProjectFormSecondStepProps) {
  const {
    step,
    activities,
    energies,
    participant,
    accommodation,
    gift,
    waste,
    errors,
    projectCode,
    projectName,
    fullName,
    telText,
    greyColor,
    disableColor,
    redColor,
    watch,
    setValue,
    removeActivity,
    appendActivity,
    removeEnergy,
    appendEnergy,
    removeParticipant,
    appendParticipant,
    removeAccommodation,
    appendAccommodation,
    removeGift,
    appendGift,
    removeWaste,
    appendWaste,
    handleBack,
    onSubmit,
    handleSubmit,
  } = props;

  // --------------------------- Hook ---------------------------

  const { control } = useFormContext();
  const isOpenDialog = useBoolean();
  const [disabled, setDisabled] = useState(false);

  // --------------------------- Function ---------------------------

  const handleClick = () => {
    setDisabled(true);

    void handleSubmit((data: ProjectFormValues) => onSubmit(data, "pending"))();

    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  // --------------------------- Value ---------------------------

  const file = watch("transportations_csv_file");

  // --------------------------- Render ---------------------------F

  const renderFirstScope = (
    <StyledStack>
      <Typography variant="subtitle1" fontWeight={700}>
        Scope 1 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางตรง
      </Typography>
      <Typography variant="caption" color={greyColor}>
        สามารถประมาณได้จากบิลงบประมาณจบโครงการ
      </Typography>
      <Grid container spacing={2} alignItems="start">
        {activities.map((field, index) => {
          const activity_type = watch(`activities.${index}.activity_type`);
          const amount = watch(`activities.${index}.amount`);

          return (
            <Fragment key={index}>
              <Grid size={{ xs: 7.5 }}>
                <Field.CustomAutoComplete
                  name={`activities.${index}.activity_type`}
                  label="ประเภทกิจกรรม"
                  options={[
                    { value: "gas", label: "ก๊าซหุงต้ม" },
                    { value: "normal_food", label: "อาหารปกติ" },
                    { value: "vegan", label: "อาหารมังสวิรัติ" },
                  ]}
                  helperText={
                    errors.activities?.[index]?.activity_type?.message
                  }
                  onInputChange={(_, value) => {
                    if (!value) return setValue(`activities.${index}.unit`, "");

                    if (value === "ก๊าซหุงต้ม") {
                      setValue(`activities.${index}.unit`, "kg");
                    } else {
                      setValue(`activities.${index}.unit`, "box");
                    }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.Text
                  type="number"
                  name={`activities.${index}.amount`}
                  label="ปริมาณพลังงานที่ใช้"
                  slotProps={{ htmlInput: { min: 0 } }}
                  disabled={!activity_type}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.CustomAutoComplete
                  name={`activities.${index}.unit`}
                  label="หน่วย"
                  options={[
                    { value: "box", label: "กล่อง" },
                    { value: "kg", label: "กิโลกรัม" },
                    { value: "g", label: "กรัม" },
                  ]}
                  helperText={errors.activities?.[index]?.unit?.message}
                  disabled={!amount}
                  creatable
                  readOnly
                />
              </Grid>
              <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                <IconButton onClick={() => removeActivity(index)}>
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
          appendActivity({ activity_type: "", amount: undefined, unit: "" })
        }
      >
        เพิ่มกิจกรรม
      </StyledAddButton>
    </StyledStack>
  );

  const renderSecondScope = (
    <StyledStack>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Scope 2 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน
        </Typography>
        <Typography variant="caption" color={greyColor}>
          สามารถประมาณได้จากบิลงบประมาณจบโครงการ
        </Typography>
      </Stack>
      {energies.map((field, index) => {
        const type = watch(`energies.${index}.type`);
        const building = watch(`energies.${index}.building`);
        const equipment = watch(`energies.${index}.equipment`);
        const quantity = watch(`energies.${index}.quantity`);
        const room = watch(`energies.${index}.room`);

        return (
          <Fragment key={index}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body1" fontWeight={400}>
                การใช้พลังงาน
              </Typography>
              <Field.GroupRadio
                name={`energies.${index}.type`}
                options={[
                  { value: "building", label: "การใช้งานอาคาร." },
                  { value: "electric", label: "การใช้เครื่องปั่นไฟ" },
                ]}
              />
            </Stack>
            <Grid container spacing={2} alignItems="start">
              {type === "electric" ? (
                <>
                  <Grid size={{ xs: 2 }}>
                    <Field.MultipleAutoComplete
                      name={`energies.${index}.equipment`}
                      label="อุปกรณ์ที่ใช้"
                      options={equipmentOptions}
                      value={[
                        {
                          value: "เครื่องปั่นไฟฟ้า",
                          label: "เครื่องปั่นไฟฟ้า",
                        },
                      ]}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 7.5 }}>
                    <Field.Text
                      type="number"
                      name={`energies.${index}.quantity`}
                      label="ปริมาณพลังงานที่ใช้"
                      slotProps={{ htmlInput: { min: 0 } }}
                      disabled={!equipment}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Field.CustomAutoComplete
                      name={`energies.${index}.unit`}
                      label="หน่วย"
                      options={energyUnitOptions}
                      helperText={errors.energies?.[index]?.unit?.message}
                      disabled={!quantity}
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                    <IconButton onClick={() => removeEnergy(index)}>
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
                      name={`energies.${index}.building`}
                      label="อาคารที่ใช้"
                      options={buildingOptions}
                      helperText={errors.energies?.[index]?.building?.message}
                      creatable
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.CustomAutoComplete
                      name={`energies.${index}.room`}
                      label="ห้องที่ใช้"
                      options={roomOptions[building as TRoom] ?? []}
                      disabled={!building}
                      creatable
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.MultipleAutoComplete
                      name={`energies.${index}.equipment`}
                      label="อุปกรณ์ที่ใช้"
                      options={equipmentOptions}
                      helperText={errors.energies?.[index]?.equipment?.message}
                      disabled={!room}
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <RHFDateTimePicker
                      name={`energies.${index}.startDate`}
                      label="วันและเวลาเริ่มใช้"
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <RHFDateTimePicker
                      name={`energies.${index}.endDate`}
                      label="วันและเวลาหยุดใช้"
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                    <IconButton onClick={() => removeEnergy(index)}>
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
          appendEnergy({
            type: "building",
            building: "",
            room: "",
            equipment: [],
            startDate: undefined,
            endDate: undefined,
            quantity: undefined,
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
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Scope 3 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางอ้อม
        </Typography>
        <Typography variant="caption" color={greyColor}>
          การเดินทางของผู้เข้าร่วมและ staff
        </Typography>
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
          {participant.map((field, index) => {
            const date = watch(`participant.${index}.date`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 3 }}>
                  <RHFDateTimePicker
                    mode="date"
                    name={`participant.${index}.date`}
                    label="เลือกวันที่"
                    helperText={errors.participant?.[index]?.date?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 8.5 }}>
                  <Field.Text
                    type="number"
                    name={`participant.${index}.participant_amount`}
                    label="จำนวนคน"
                    slotProps={{ htmlInput: { min: 0 } }}
                    error={!!errors.participant?.[index]?.participant_amount}
                    helperText={
                      errors.participant?.[index]?.participant_amount?.message
                    }
                    disabled={!date}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton
                    onClick={() => removeParticipant(index)}
                    disabled={participant.length === 1}
                  >
                    <SvgColor
                      src="/assets/icons/ic-trash.svg"
                      color={participant.length === 1 ? disableColor : redColor}
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
            appendParticipant({
              date: undefined,
              participant_amount: undefined,
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
          {accommodation.map((field, index) => {
            const date = watch(`accommodation.${index}.date`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 3 }}>
                  <RHFDateTimePicker
                    mode="date"
                    name={`accommodation.${index}.date`}
                    label="เลือกวันที่พักแรม"
                    helperText={errors.accommodation?.[index]?.date?.message}
                  />
                </Grid>
                <Grid size={{ xs: 8.5 }}>
                  <Field.Text
                    type="number"
                    name={`accommodation.${index}.participant_amount`}
                    label="จำนวนคน"
                    slotProps={{ htmlInput: { min: 0 } }}
                    disabled={!date}
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton onClick={() => removeAccommodation(index)}>
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
            appendAccommodation({
              date: undefined,
              participant_amount: undefined,
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
          {gift.map((field, index) => {
            const gift_type = watch(`gift.${index}.gift_type`);
            const amount = watch(`gift.${index}.amount`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 7.5 }}>
                  <Field.CustomAutoComplete
                    name={`gift.${index}.gift_type`}
                    label="เลือกประเภทของแจก"
                    options={giftUnitOptions}
                    helperText={errors.gift?.[index]?.gift_type?.message}
                    onInputChange={(_, value) => {
                      if (value) {
                        setValue(`gift.${index}.unit`, "kg");
                      } else {
                        setValue(`gift.${index}.unit`, "");
                      }
                    }}
                    creatable
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Text
                    type="number"
                    name={`gift.${index}.amount`}
                    label="ปริมาณของแจก"
                    slotProps={{ htmlInput: { min: 0 } }}
                    disabled={!gift_type}
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.CustomAutoComplete
                    name={`gift.${index}.unit`}
                    label="หน่วย"
                    options={[{ value: "kg", label: "กิโลกรัม" }]}
                    helperText={errors.gift?.[index]?.unit?.message}
                    disabled={!amount}
                    readOnly
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton onClick={() => removeGift(index)}>
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
            appendGift({ gift_type: "", amount: undefined, unit: "" })
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
          {waste.map((field, index) => {
            const waste_type = watch(`waste.${index}.waste_type`);
            const amount = watch(`waste.${index}.amount`);

            return (
              <Fragment key={index}>
                <Grid size={{ xs: 7.5 }}>
                  <Field.CustomAutoComplete
                    name={`waste.${index}.waste_type`}
                    label="เลือกประเภทของเสีย"
                    options={wasteOptions}
                    helperText={errors.waste?.[index]?.waste_type?.message}
                    onInputChange={(_, value) => {
                      if (value) {
                        setValue(`waste.${index}.unit`, "kg");
                      } else {
                        setValue(`waste.${index}.unit`, "");
                      }
                    }}
                    creatable
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Text
                    type="number"
                    name={`waste.${index}.amount`}
                    label="ปริมาณของเสีย"
                    slotProps={{ htmlInput: { min: 0 } }}
                    disabled={!waste_type}
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.CustomAutoComplete
                    name={`waste.${index}.unit`}
                    label="หน่วย"
                    options={[{ value: "kg", label: "กิโลกรัม" }]}
                    helperText={errors.waste?.[index]?.unit?.message}
                    disabled={!amount}
                    readOnly
                  />
                </Grid>
                <Grid size={{ xs: 0.5 }} sx={{ paddingTop: 1 }}>
                  <IconButton onClick={() => removeWaste(index)}>
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
            appendWaste({ waste_type: "", amount: undefined, unit: "" })
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
            <Typography variant="h4">{`[${projectCode}] ${projectName}`}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`ผู้กรอก: ${fullName} (${telText})`}</Typography>
          </Stack>

          <Stack sx={{ padding: 3, gap: 4, marginBottom: 10 }}>
            {renderFirstScope}

            {renderSecondScope}

            {renderThirdScope}

            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: "16px 24px", justifyContent: "end" }}
            >
              <Button variant="outlined" onClick={handleBack}>
                ย้อนกลับ
              </Button>
              {/* <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  void handleSubmit((data) => onSubmit(data, "draft"))();
                }}
              >
                บันทึกแบบร่าง
              </Button> */}

              <Button
                type="button"
                variant="contained"
                onClick={isOpenDialog.onTrue}
              >
                ส่งแบบฟอร์ม
              </Button>
            </Stack>
          </Stack>

          <ConfirmDialog
            open={isOpenDialog.value}
            title={
              <Box component="img" src="/assets/icons/ic-upload-form.svg" />
            }
            content={
              <Stack spacing={1}>
                <Typography variant="h3">
                  คุณต้องการส่งแบบฟอร์มหรือไม่
                </Typography>
                <Typography variant="h5" fontWeight={500} color="#637381">
                  ข้อมูลของโครงการจะไม่สามารถแก้ไขได้
                  <br />
                  หลังจากส่งแบบฟอร์ม
                </Typography>
              </Stack>
            }
            action={
              <Button
                variant="contained"
                onClick={handleClick}
                disabled={disabled}
              >
                ส่งแบบฟอร์ม
              </Button>
            }
            onClose={isOpenDialog.onFalse}
          />
        </>
      )}
    </>
  );
}
