"use client";

import { Field } from "@/components/hook-form/field";
import { Form } from "@/components/hook-form/form-provider";
import RHFDateTimePicker from "@/components/hook-form/rhf-date-time-picker";
import CSVUploadComponent from "@/components/hook-form/rhf-upload";
import { SvgColor } from "@/components/svg/svg-color";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { Fragment, type Dispatch, type SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { defaultValues, ProjectFormSchema } from "./form/schema";
import type { ProjectFormValues } from "./form/type";
import { StyledAddButton, StyledStack } from "./styles";
import {
  fieldOptions,
  departmentOptins,
  equipmentOptions,
  energyUnitOptions,
  buildingOptions,
  roomOptions,
  type TRoom,
  giftUnitOptions,
  wasteOptions,
} from "./form/constant";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------------

type TProjectFormProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

function ProjectForm({ step, setStep }: TProjectFormProps) {
  const theme = useTheme();
  const router = useRouter();

  // --------------------------- Form ---------------------------

  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: defaultValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const {
    fields: activities,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: "activities",
  });

  const {
    fields: energies,
    append: appendEnergy,
    remove: removeEnergy,
  } = useFieldArray({
    control,
    name: "energies",
  });

  const {
    fields: participant,
    append: appendParticipant,
    remove: removeParticipant,
  } = useFieldArray({
    control,
    name: "participant",
  });

  const {
    fields: accommodation,
    append: appendAccommodation,
    remove: removeAccommodation,
  } = useFieldArray({
    control,
    name: "accommodation",
  });

  const {
    fields: gift,
    append: appendGift,
    remove: removeGift,
  } = useFieldArray({
    control,
    name: "gift",
  });

  const {
    fields: waste,
    append: appendWaste,
    remove: removeWaste,
  } = useFieldArray({
    control,
    name: "waste",
  });

  // --------------------------- Value ---------------------------

  const whiteColor = theme.palette.background.paper;
  const greyColor = theme.palette.text.secondary;
  const disableColor = theme.palette.action.disabled;
  const redColor = "#B71931";

  const underProject = watch("underProject");
  const projectCode = watch("projectCode");
  const projectName = watch("projectName");
  const fullName = watch("fullName");
  const tel = watch("tel");

  const telText = `${tel.substring(0, 3)}-${tel.substring(3, 6)}-${tel.substring(6, 10)}`;

  // --------------------------- Function ---------------------------

  const handleNext = async () => {
    const isValid = await trigger([
      "projectCode",
      "projectName",
      "underProject",
      "fullName",
      "nickname",
      "year",
      "department",
      "clubName",
      "otherUnderProject",
      "field",
      "tel",
    ]);

    if (isValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: ProjectFormValues) => {
    router.push(`create-project/${data.projectCode}/success`);
  };

  // --------------------------- Render ---------------------------

  const renderFormFirstStep = (
    <>
      {step === 1 && (
        <>
          <Stack sx={{ padding: "16px 24px" }}>
            <Typography variant="h4">เพิ่มข้อมูลโครงการใหม่</Typography>
          </Stack>
          <Stack sx={{ padding: 3, gap: 4 }}>
            <StyledStack>
              <Typography variant="subtitle1" fontWeight={700}>
                ข้อมูลโครงการ
              </Typography>
              <Field.Text
                type="string"
                name="projectCode"
                label="รหัสโครงการ"
                regex={/^\d*$/}
                slotProps={{
                  htmlInput: {
                    maxLength: 4,
                  },
                }}
                error={!!errors.projectCode}
                helperText={errors.projectCode?.message}
                required
              />
              <Field.Text
                name="projectName"
                label="ชื่อโครงการ"
                error={!!errors.projectName}
                helperText={errors.projectName?.message}
                required
              />

              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 1.2 }}>
                  <Typography variant="body1" fontWeight={400}>
                    โครงการภายใต้{" "}
                    <Typography component="span" color="red">
                      *
                    </Typography>
                  </Typography>
                </Grid>
                <Grid size={{ xs: 0.8 }}>
                  <Field.Radio name="underProject" label="กวศ." value="กวศ." />
                </Grid>
                <Grid size={{ xs: 2.8 }}>
                  <Field.CustomAutoComplete
                    name="field"
                    label="ฝ่าย"
                    options={fieldOptions}
                    helperText={errors.field?.message}
                    required
                    disabled={underProject !== "กวศ."}
                  />
                </Grid>
                <Grid size={{ xs: 0.8 }}>
                  <Field.Radio name="underProject" label="ชมรม" value="ชมรม" />
                </Grid>
                <Grid size={{ xs: 2.8 }}>
                  <Field.Text
                    name="clubName"
                    label="ชื่อชมรม"
                    error={!!errors.clubName}
                    helperText={errors.clubName?.message}
                    required
                    disabled={underProject !== "ชมรม"}
                  />
                </Grid>
                <Grid size={{ xs: 0.8 }}>
                  <Field.Radio
                    name="underProject"
                    label="อื่นๆ"
                    value="other"
                  />
                </Grid>
                <Grid size={{ xs: 2.8 }}>
                  <Field.Text
                    name="otherUnderProject"
                    label="โปรดระบุ"
                    error={!!errors.otherUnderProject}
                    helperText={errors.otherUnderProject?.message}
                    required
                    disabled={underProject !== "other"}
                  />
                </Grid>
              </Grid>
              {!!errors.underProject && (
                <FormHelperText
                  sx={{ marginTop: -2 }}
                  error={!!errors.underProject}
                >
                  {errors.underProject.message}
                </FormHelperText>
              )}
            </StyledStack>

            <StyledStack>
              <Typography variant="subtitle1" fontWeight={700}>
                ข้อมูลผู้กรอกแบบฟอร์ม
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 8 }}>
                  <Field.Text
                    name="fullName"
                    label="ชื่อ-นามสกุล"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Text
                    name="nickname"
                    label="ชื่อเล่น"
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.CustomAutoComplete
                    name="year"
                    label="ชั้นปี"
                    options={[
                      { value: "ปี 1", label: "ปี 1" },
                      { value: "ปี 2", label: "ปี 2" },
                      { value: "ปี 3", label: "ปี 3" },
                      { value: "ปี 4", label: "ปี 4" },
                    ]}
                    helperText={errors.year?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 9 }}>
                  <Field.CustomAutoComplete
                    name="department"
                    label="ภาคที่เรียน"
                    options={departmentOptins}
                    helperText={errors.department?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 3 }}>
                  <Field.Phone
                    name="tel"
                    label="เบอร์โทรศัพท์"
                    error={!!errors.tel}
                    helperText={errors.tel?.message}
                    required
                  />
                </Grid>
              </Grid>
            </StyledStack>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ padding: "16px 24px", justifyContent: "end" }}
          >
            <Button variant="outlined">ยกเลิก</Button>
            <Button variant="contained" onClick={handleNext}>
              ถัดไป
            </Button>
          </Stack>
        </>
      )}
    </>
  );

  const renderFormSecondStep = (
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
            <StyledStack>
              <Typography variant="subtitle1" fontWeight={700}>
                Scope 1 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางตรง
              </Typography>
              <Typography variant="caption" color={greyColor}>
                สามารถประมาณได้จากบิลงบประมาณจบโครงการ
              </Typography>

              <Grid container spacing={2} alignItems="center">
                {activities.map((field, index) => (
                  <Fragment key={field.id}>
                    <Grid size={{ xs: 7.5 }}>
                      <Field.CustomAutoComplete
                        name={`activities.${index}.type`}
                        label="ประเภทกิจกรรม"
                        options={[
                          { value: "gas", label: "ก๊าซหุงต้ม" },
                          { value: "normal_food", label: "อาหารปกติ" },
                          { value: "vegan", label: "อาหารมังสวิรัติ" },
                        ]}
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <Field.Text
                        type="number"
                        name={`activities.${index}.amount`}
                        label="ปริมาณพลังงานที่ใช้"
                        slotProps={{ htmlInput: { min: 0 } }}
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
                          { value: "other", label: "อื่นๆ (โปรดระบุ)" },
                        ]}
                      />
                    </Grid>
                    <Grid size={{ xs: 0.5 }}>
                      <IconButton
                        onClick={() => removeActivity(index)}
                        disabled={activities.length === 1}
                      >
                        <SvgColor
                          src="/assets/icons/ic-trash.svg"
                          color={
                            activities.length === 1 ? disableColor : redColor
                          }
                        />
                      </IconButton>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
              <StyledAddButton
                variant="outlined"
                startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
                onClick={() =>
                  appendActivity({ type: "", amount: "", unit: "" })
                }
              >
                เพิ่มกิจกรรม
              </StyledAddButton>
            </StyledStack>

            <StyledStack>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Scope 2 :
                  ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน
                </Typography>
                <Typography variant="caption" color={greyColor}>
                  สามารถประมาณได้จากบิลงบประมาณจบโครงการ
                </Typography>
              </Stack>

              {energies.map((field, index) => {
                const type = watch(`energies.${index}.type`);

                const building = watch(`energies.${index}.building`);

                return (
                  <Fragment key={field.id}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="body1" fontWeight={400}>
                        การใช้พลังงาน
                      </Typography>

                      <Field.GroupRadio
                        name={`energies.${index}.type`}
                        options={[
                          { value: "building", label: "การใช้งานอาคาร." },
                          { value: "electric", label: "การใช้งานปั่นไฟ" },
                        ]}
                      />
                    </Stack>

                    <Grid container spacing={2} alignItems="center">
                      {type === "electric" ? (
                        <>
                          <Grid size={{ xs: 2 }}>
                            <Field.MultipleAutoComplete
                              name={`energies.${index}.equipment`}
                              label="อุปกรณ์ที่ใช้"
                              options={equipmentOptions}
                            />
                          </Grid>
                          <Grid size={{ xs: 7.5 }}>
                            <Field.Text
                              type="number"
                              name={`energies.${index}.quantity`}
                              label="ปริมาณพลังงานที่ใช้"
                              slotProps={{ htmlInput: { min: 0 } }}
                            />
                          </Grid>
                          <Grid size={{ xs: 2 }}>
                            <Field.CustomAutoComplete
                              name={`energies.${index}.unit`}
                              label="หน่วย"
                              options={energyUnitOptions}
                            />
                          </Grid>
                          <Grid size={{ xs: 0.5 }}>
                            <IconButton
                              onClick={() => removeEnergy(index)}
                              disabled={energies.length === 1}
                            >
                              <SvgColor
                                src="/assets/icons/ic-trash.svg"
                                color={
                                  energies.length === 1
                                    ? disableColor
                                    : redColor
                                }
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
                            />
                          </Grid>
                          <Grid size={{ xs: 2.3 }}>
                            {roomOptions[building as TRoom] ? (
                              <Field.CustomAutoComplete
                                name={`energies.${index}.room`}
                                label="ห้องที่ใช้"
                                options={roomOptions[building as TRoom]}
                              />
                            ) : (
                              <Field.Text
                                name={`energies.${index}.room`}
                                label="ห้องที่ใช้"
                              />
                            )}
                          </Grid>
                          <Grid size={{ xs: 2.3 }}>
                            <Field.MultipleAutoComplete
                              name={`energies.${index}.equipment`}
                              label="อุปกรณ์ที่ใช้"
                              options={equipmentOptions}
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

                          <Grid size={{ xs: 0.5 }}>
                            <IconButton
                              onClick={() => removeEnergy(index)}
                              disabled={energies.length === 1}
                            >
                              <SvgColor
                                src="/assets/icons/ic-trash.svg"
                                color={
                                  energies.length === 1
                                    ? disableColor
                                    : redColor
                                }
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

            <StyledStack>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Scope 3 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางอ้อม
                </Typography>
                <Typography variant="caption" color={greyColor}>
                  การเดินทางของผู้เข้าร่วมและ staff
                </Typography>
              </Stack>

              <CSVUploadComponent />

              <StyledStack sx={{ borderRadius: 2 }}>
                <Typography variant="body2" fontWeight={700}>
                  จำนวนผู้เข้าร่วมรวมกับ staff ตลอดทั้งโครงการ
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </Typography>

                <Grid container spacing={2} alignItems="center">
                  {participant.map((field, index) => (
                    <Fragment key={field.id}>
                      <Grid size={{ xs: 3 }}>
                        <RHFDateTimePicker
                          name={`participant.${index}.date`}
                          label="เลือกวันที่"
                          helperText={
                            errors.participant?.[index]?.date?.message
                          }
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 8.5 }}>
                        <Field.Text
                          type="number"
                          name={`participant.${index}.participant_amount`}
                          label="จำนวนคน"
                          slotProps={{ htmlInput: { min: 0 } }}
                          error={
                            !!errors.participant?.[index]?.participant_amount
                          }
                          helperText={
                            errors.participant?.[index]?.participant_amount
                              ?.message
                          }
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 0.5 }}>
                        <IconButton
                          onClick={() => removeParticipant(index)}
                          disabled={participant.length === 1}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color={
                              participant.length === 1 ? disableColor : redColor
                            }
                          />
                        </IconButton>
                      </Grid>
                    </Fragment>
                  ))}
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

                <Grid container spacing={2} alignItems="center">
                  {accommodation.map((field, index) => (
                    <Fragment key={field.id}>
                      <Grid size={{ xs: 3 }}>
                        <RHFDateTimePicker
                          name={`accommodation.${index}.date`}
                          label="เลือกวันที่พักแรม"
                        />
                      </Grid>
                      <Grid size={{ xs: 8.5 }}>
                        <Field.Text
                          type="number"
                          name={`accommodation.${index}.participant_amount`}
                          label="จำนวนคน"
                          slotProps={{ htmlInput: { min: 0 } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 0.5 }}>
                        <IconButton
                          onClick={() => removeAccommodation(index)}
                          disabled={accommodation.length === 1}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color={
                              accommodation.length === 1
                                ? disableColor
                                : redColor
                            }
                          />
                        </IconButton>
                      </Grid>
                    </Fragment>
                  ))}
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

                <Grid container spacing={2} alignItems="center">
                  {gift.map((field, index) => (
                    <Fragment key={field.id}>
                      <Grid size={{ xs: 7.5 }}>
                        <Field.CustomAutoComplete
                          name={`gift.${index}.type`}
                          label="เลือกประเภทของแจก"
                          options={giftUnitOptions}
                        />
                      </Grid>
                      <Grid size={{ xs: 2 }}>
                        <Field.Text
                          type="number"
                          name={`gift.${index}.amount`}
                          label="ปริมาณของแจก"
                          slotProps={{ htmlInput: { min: 0 } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 2 }}>
                        <Field.CustomAutoComplete
                          name={`gift.${index}.unit`}
                          label="หน่วย"
                          options={[
                            { value: "kg", label: "กิโลกรัม" },
                            { value: "g", label: "กรัม" },
                            { value: "other", label: "อื่นๆ (โปรดระบุ)" },
                          ]}
                        />
                      </Grid>
                      <Grid size={{ xs: 0.5 }}>
                        <IconButton
                          onClick={() => removeGift(index)}
                          disabled={gift.length === 1}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color={gift.length === 1 ? disableColor : redColor}
                          />
                        </IconButton>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
                <StyledAddButton
                  variant="outlined"
                  startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
                  onClick={() => appendGift({ type: "", amount: "", unit: "" })}
                >
                  เพิ่มกิจกรรม
                </StyledAddButton>
              </StyledStack>

              <StyledStack sx={{ borderRadius: 2 }}>
                <Typography variant="body2" fontWeight={700}>
                  ของเสียหลังการจัดงาน
                </Typography>

                <Grid container spacing={2} alignItems="center">
                  {waste.map((field, index) => (
                    <Fragment key={field.id}>
                      <Grid size={{ xs: 7.5 }}>
                        <Field.CustomAutoComplete
                          name={`waste.${index}.type`}
                          label="เลือกประเภทของเสีย"
                          options={wasteOptions}
                        />
                      </Grid>
                      <Grid size={{ xs: 2 }}>
                        <Field.Text
                          type="number"
                          name={`waste.${index}.amount`}
                          label="ปริมาณของเสีย"
                          slotProps={{ htmlInput: { min: 0 } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 2 }}>
                        <Field.CustomAutoComplete
                          name={`waste.${index}.unit`}
                          label="หน่วย"
                          options={[{ value: "kg", label: "กิโลกรัม" }]}
                        />
                      </Grid>
                      <Grid size={{ xs: 0.5 }}>
                        <IconButton
                          onClick={() => removeWaste(index)}
                          disabled={waste.length === 1}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color={waste.length === 1 ? disableColor : redColor}
                          />
                        </IconButton>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
                <StyledAddButton
                  variant="outlined"
                  startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
                  onClick={() =>
                    appendWaste({ type: "", amount: "", unit: "" })
                  }
                >
                  เพิ่มของเสีย
                </StyledAddButton>
              </StyledStack>
            </StyledStack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: "16px 24px", justifyContent: "end" }}
            >
              <Button variant="text" onClick={handleBack}>
                ย้อนกลับ
              </Button>
              <Button variant="outlined">บันทึกแบบร่าง</Button>
              <Button variant="contained" type="submit">
                ส่งแบบฟอร์ม
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundColor: whiteColor,
          marginBottom: 8,
        }}
      >
        {renderFormFirstStep}

        {renderFormSecondStep}
      </Stack>
    </Form>
  );
}

export default ProjectForm;
