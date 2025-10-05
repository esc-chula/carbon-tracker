"use client";

import { Form } from "@/components/hook-form/form-provider";
import type { ProjectFormValues } from "@/sections/project/form/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import {
  useFieldArray,
  useForm,
  type UseFormHandleSubmit,
} from "react-hook-form";
import { ProjectFormSchema, ProjectFormStepOneSchema } from "./form/schema";

import { ProjectFormFirstStep } from "./project-form-first-step";
import { ProjectFormSecondStep } from "./project-form-second-step";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { useBoolean } from "@/hooks/use-boolean";
import type { TProjectStatus } from "@/types/project/list-project";

// ---------------------------------------------------------------------------------

type ProjectFormSubmitHandler = (
  data: ProjectFormValues,
  status: TProjectStatus,
) => Promise<void> | void;

type ProjectFormConfirmHandlerArgs = {
  handleSubmit: UseFormHandleSubmit<ProjectFormValues>;
  submit: ProjectFormSubmitHandler;
  closeDialog: () => void;
};

type ProjectFormConfirmHandler = (
  args: ProjectFormConfirmHandlerArgs,
) => Promise<void> | void;

type TProjectFormProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  initialValues: ProjectFormValues;
  onSubmit: ProjectFormSubmitHandler;
  onConfirmClick: ProjectFormConfirmHandler;
  confirmDisabled?: boolean;
  isEdit?: boolean;
};

function ProjectForm({
  step,
  setStep,
  initialValues,
  onSubmit,
  onConfirmClick,
  confirmDisabled = false,
  isEdit = false,
}: TProjectFormProps) {
  const theme = useTheme();

  // --------------------------- Hook ---------------------------

  const openDialog = useBoolean();
  const { onFalse: closeDialog } = openDialog;

  // --------------------------- Form ---------------------------

  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: initialValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    clearErrors,
  } = methods;

  const {
    fields: scope1Activities,
    append: appendScope1Activity,
    remove: removeScope1Activity,
  } = useFieldArray({
    control,
    name: "scope1_activities",
  });

  const {
    fields: scope2Entries,
    append: appendScope2Entry,
    remove: removeScope2Entry,
  } = useFieldArray({
    control,
    name: "scope2_entries",
  });

  const {
    fields: scope3Attendee,
    append: appendScope3Attendee,
    remove: removeScope3Attendee,
  } = useFieldArray({
    control,
    name: "scope3_attendee",
  });

  const {
    fields: scope3Overnight,
    append: appendScope3Overnight,
    remove: removeScope3Overnight,
  } = useFieldArray({
    control,
    name: "scope3_overnight",
  });

  const {
    fields: scope3Souvenir,
    append: appendScope3Souvenir,
    remove: removeScope3Souvenir,
  } = useFieldArray({
    control,
    name: "scope3_souvenir",
  });

  const {
    fields: scope3Waste,
    append: appendScope3Waste,
    remove: removeScope3Waste,
  } = useFieldArray({
    control,
    name: "scope3_waste",
  });

  // --------------------------- Value ---------------------------

  const whiteColor = theme.palette.background.paper;
  const greyColor = theme.palette.text.secondary;
  const disableColor = theme.palette.action.disabled;
  const redColor = "#B71931";

  const org = watch("org");
  const customId = watch("custom_id");
  const title = watch("title");
  const ownerFullName = watch("owner_fullname");
  const ownerPhoneNumber = watch("owner_phone_number") ?? "";

  const phoneNumberText =
    ownerPhoneNumber.length >= 10
      ? `${ownerPhoneNumber.substring(0, 3)}-${ownerPhoneNumber.substring(3, 6)}-${ownerPhoneNumber.substring(6, 10)}`
      : ownerPhoneNumber;

  useEffect(() => {
    const trimmedOrg = org?.trim();

    if (trimmedOrg === "กวศ.") {
      setValue("clubName", "", { shouldDirty: true, shouldValidate: false });
      setValue("otherUnderProject", "", {
        shouldDirty: true,
        shouldValidate: false,
      });
      clearErrors(["clubName", "otherUnderProject"]);
      return;
    }

    if (trimmedOrg === "ชมรม") {
      setValue("field", "", { shouldDirty: true, shouldValidate: false });
      setValue("otherUnderProject", "", {
        shouldDirty: true,
        shouldValidate: false,
      });
      clearErrors(["field", "otherUnderProject"]);
      return;
    }

    if (trimmedOrg === "other" || trimmedOrg === "อื่นๆ") {
      setValue("field", "", { shouldDirty: true, shouldValidate: false });
      setValue("clubName", "", { shouldDirty: true, shouldValidate: false });
      clearErrors(["field", "clubName"]);
      return;
    }

    setValue("field", "", { shouldDirty: true, shouldValidate: false });
    setValue("clubName", "", { shouldDirty: true, shouldValidate: false });
    setValue("otherUnderProject", "", {
      shouldDirty: true,
      shouldValidate: false,
    });
    clearErrors(["field", "clubName", "otherUnderProject"]);
  }, [org, clearErrors, setValue]);

  // --------------------------- Function ---------------------------

  const handleNext = async () => {
    const firstStepValid = ProjectFormStepOneSchema.safeParse(getValues());

    if (!firstStepValid.success) {
      firstStepValid.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          setError(path as keyof ProjectFormValues, {
            type: "manual",
            message: issue.message,
          });
        } else {
          setError("org" as keyof ProjectFormValues, {
            type: "manual",
            message: issue.message,
          });
        }
      });

      return;
    }

    const values = firstStepValid.data;
    clearErrors([
      "custom_id",
      "title",
      "org",
      "owner_fullname",
      "owner_nickname",
      "owner_student_id",
      "owner_major",
      "owner_phone_number",
      "field",
      "clubName",
      "otherUnderProject",
    ]);
    const resolvedOrgDetail = (() => {
      switch (values.org?.trim()) {
        case "กวศ.":
          return values.field ?? "";
        case "ชมรม":
          return values.clubName ?? "";
        case "other":
        case "อื่นๆ":
          return values.otherUnderProject ?? "";
        default:
          return values.org_detail ?? "";
      }
    })();

    setValue("org_detail", resolvedOrgDetail.trim());

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleConfirmClick = () => {
    const result = onConfirmClick({
      handleSubmit,
      submit: onSubmit,
      closeDialog,
    });

    void result;
  };

  // --------------------------- Render ---------------------------

  return (
    <Form methods={methods}>
      <Stack
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundColor: whiteColor,
          marginBottom: 8,
        }}
      >
        <ProjectFormFirstStep
          step={step}
          errors={errors}
          org={org}
          handleNext={handleNext}
          isEdit={isEdit}
        />
        <ProjectFormSecondStep
          step={step}
          scope1Activities={scope1Activities}
          scope2Entries={scope2Entries}
          scope3Attendee={scope3Attendee}
          scope3Overnight={scope3Overnight}
          scope3Souvenir={scope3Souvenir}
          scope3Waste={scope3Waste}
          errors={errors}
          customId={customId}
          title={title}
          ownerFullName={ownerFullName}
          phoneNumberText={phoneNumberText}
          greyColor={greyColor}
          disableColor={disableColor}
          redColor={redColor}
          setValue={setValue}
          removeScope1Activity={removeScope1Activity}
          appendScope1Activity={appendScope1Activity}
          removeScope2Entry={removeScope2Entry}
          appendScope2Entry={appendScope2Entry}
          removeScope3Attendee={removeScope3Attendee}
          appendScope3Attendee={appendScope3Attendee}
          removeScope3Overnight={removeScope3Overnight}
          appendScope3Overnight={appendScope3Overnight}
          removeScope3Souvenir={removeScope3Souvenir}
          appendScope3Souvenir={appendScope3Souvenir}
          removeScope3Waste={removeScope3Waste}
          appendScope3Waste={appendScope3Waste}
          handleBack={handleBack}
          onSubmit={onSubmit}
          openDialog={openDialog}
          handleSubmit={handleSubmit}
          confirmDisabled={confirmDisabled}
          isEdit={isEdit}
        />
      </Stack>

      <ConfirmDialog
        open={openDialog.value}
        title={<Box component="img" src="/assets/icons/ic-upload-form.svg" />}
        content={
          <Stack spacing={1}>
            <Typography variant="h3">คุณต้องการส่งแบบฟอร์มหรือไม่</Typography>
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
            onClick={handleConfirmClick}
            disabled={confirmDisabled}
          >
            ส่งแบบฟอร์ม
          </Button>
        }
        onClose={openDialog.onFalse}
      />
    </Form>
  );
}

export default ProjectForm;

export type {
  ProjectFormSubmitHandler,
  ProjectFormConfirmHandlerArgs,
  ProjectFormConfirmHandler,
};
