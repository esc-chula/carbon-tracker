import { Field } from "@/components/hook-form/field";
import StatusChips from "@/components/StatusChips";
import {
  departmentOptions,
  fieldOptions,
} from "@/sections/project/form/constant";
import type { ProjectFormValues } from "@/sections/project/form/type";
import { StyledStack } from "@/sections/project/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useParams, useRouter } from "next/navigation";
import { useFormContext, type FieldErrors } from "react-hook-form";
import ProjectRejectDetailButton from "./project-reject-detail-button";

// ---------------------------------------------------------------------------------

type Params = {
  id: string;
};

type TProjectFormFirstStepProps = {
  step: number;
  errors: FieldErrors<ProjectFormValues>;
  org: string;
  handleNext: () => void;
  isEdit?: boolean;
};

export function ProjectFormFirstStep({
  step,
  errors,
  org,
  handleNext,
  isEdit = false,
}: TProjectFormFirstStepProps) {
  // --------------------------- Hook ---------------------------

  const router = useRouter();
  const { getValues } = useFormContext();
  const params = useParams<Params>();

  // --------------------------- Value ---------------------------

  const projectId = params?.id ?? "";
  const status = getValues("status");

  // --------------------------- Render ---------------------------

  return (
    <>
      {step === 1 && (
        <>
          <Stack
            direction="row"
            spacing={3}
            sx={{ padding: "16px 24px", alignItems: "center" }}
          >
            <Typography variant="h4">
              {!isEdit ? "เพิ่มข้อมูลโครงการใหม่" : "แก้ไขข้อมูลโครงการ"}
            </Typography>

            {isEdit && <StatusChips variantType={status} />}
          </Stack>

          {status === "fixing" && (
            <Stack padding="24px 0px  0px 24px">
              <ProjectRejectDetailButton id={projectId} />
            </Stack>
          )}

          <Stack sx={{ padding: 3, gap: 4 }}>
            <StyledStack>
              <Typography variant="subtitle1" fontWeight={700}>
                ข้อมูลโครงการ
              </Typography>
              <Field.Text
                type="string"
                name="custom_id"
                label="รหัสโครงการ"
                regex={/^\d*$/}
                slotProps={{
                  htmlInput: {
                    maxLength: 4,
                  },
                }}
                error={!!errors.custom_id}
                helperText={errors.custom_id?.message}
                required
              />
              <Field.Text
                name="title"
                label="ชื่อโครงการ"
                error={!!errors.title}
                helperText={errors.title?.message}
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
                  <Field.Radio name="org" label="กวศ." value="กวศ." />
                </Grid>
                <Grid size={{ xs: 2.8 }}>
                  <Field.CustomAutoComplete
                    name="field"
                    label="ฝ่าย"
                    options={fieldOptions}
                    helperText={errors.field?.message}
                    required
                    disabled={org !== "กวศ."}
                  />
                </Grid>
                <Grid size={{ xs: 0.8 }} sx={{ paddingTop: 0.8 }}>
                  <Field.Radio name="org" label="ชมรม" value="ชมรม" />
                </Grid>
                <Grid size={{ xs: 2.8 }}>
                  <Field.Text
                    name="clubName"
                    label="ชื่อชมรม"
                    error={!!errors.clubName}
                    helperText={errors.clubName?.message}
                    required
                    disabled={org !== "ชมรม"}
                  />
                </Grid>
                <Grid size={{ xs: 0.8 }} sx={{ paddingTop: 0.8 }}>
                  <Field.Radio name="org" label="อื่นๆ" value="other" />
                </Grid>
                <Grid size={{ xs: 2.8 }}>
                  <Field.Text
                    name="otherUnderProject"
                    label="โปรดระบุ"
                    error={!!errors.otherUnderProject}
                    helperText={errors.otherUnderProject?.message}
                    required
                    disabled={org !== "other"}
                  />
                </Grid>
              </Grid>
              {!!errors.org && (
                <FormHelperText sx={{ marginTop: -2 }} error={!!errors.org}>
                  {errors.org.message}
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
                    name="owner_fullname"
                    label="ชื่อ-นามสกุล"
                    regex={/^[ \u0E00-\u0E7F]*$/}
                    error={!!errors.owner_fullname}
                    helperText={errors.owner_fullname?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Text
                    name="owner_nickname"
                    label="ชื่อเล่น"
                    error={!!errors.owner_nickname}
                    helperText={errors.owner_nickname?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Field.Phone
                    name="owner_student_id"
                    label="รหัสนิสิต"
                    error={!!errors.owner_student_id}
                    helperText={errors?.owner_student_id?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 9 }}>
                  <Field.CustomAutoComplete
                    name="owner_major"
                    label="ภาคที่เรียน"
                    options={departmentOptions}
                    helperText={errors.owner_major?.message}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 3 }}>
                  <Field.Phone
                    name="owner_phone_number"
                    label="เบอร์โทรศัพท์"
                    error={!!errors.owner_phone_number}
                    helperText={errors.owner_phone_number?.message}
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
            <Button variant="outlined" onClick={() => router.push("/")}>
              ยกเลิก
            </Button>
            <Button variant="contained" onClick={handleNext}>
              ถัดไป
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}
