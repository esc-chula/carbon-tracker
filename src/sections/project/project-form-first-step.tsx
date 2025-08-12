import { Field } from "@/components/hook-form/field";
import {
  departmentOptions,
  fieldOptions,
} from "@/sections/project/form/constant";
import type { ProjectFormValues } from "@/sections/project/form/type";
import { StyledStack } from "@/sections/project/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import type { FieldErrors } from "react-hook-form";

// ---------------------------------------------------------------------------------

type TProjectFormFirstStepProps = {
  step: number;
  errors: FieldErrors<ProjectFormValues>;
  underProject: string;
  handleNext: () => void;
};

export function ProjectFormFirstStep({
  step,
  errors,
  underProject,
  handleNext,
}: TProjectFormFirstStepProps) {
  return (
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
              <Grid container spacing={2} alignItems="start">
                <Grid size={{ xs: 1.2 }} sx={{ paddingTop: 2 }}>
                  <Typography variant="body1" fontWeight={400}>
                    โครงการภายใต้{" "}
                    <Typography component="span" color="red">
                      *
                    </Typography>
                  </Typography>
                </Grid>
                <Grid size={{ xs: 0.8 }} sx={{ paddingTop: 0.8 }}>
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
                <Grid size={{ xs: 0.8 }} sx={{ paddingTop: 0.8 }}>
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
                <Grid size={{ xs: 0.8 }} sx={{ paddingTop: 0.8 }}>
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
                    options={departmentOptions}
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
}
