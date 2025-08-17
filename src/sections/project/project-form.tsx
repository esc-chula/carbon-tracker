"use client";

import { Form } from "@/components/hook-form/form-provider";
import type { ProjectFormValues } from "@/sections/project/form/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useTheme } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ProjectFormSchema } from "./form/schema";

import { useCreateProjectMutation } from "@/services/project/mutation";
import CreateProjectFormatter from "./helper/create-project-formatter";
import { ProjectFormFirstStep } from "./project-form-first-step";
import { ProjectFormSecondStep } from "./project-form-second-step";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------------

type TProjectFormProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  initialValues: ProjectFormValues;
};

function ProjectForm({ step, setStep, initialValues }: TProjectFormProps) {
  const theme = useTheme();
  const router = useRouter();

  // --------------------------- Form ---------------------------

  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: initialValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
    setError,
    setValue,
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

  // --------------------------- API ---------------------------

  const createProject = useCreateProjectMutation();

  // --------------------------- Function ---------------------------

  const handleNext = async () => {
    const isValid = await trigger([
      "projectCode",
      "projectName",
      "underProject",
      "fullName",
      "nickname",
      "student_id",
      "department",
      "clubName",
      "otherUnderProject",
      "field",
      "tel",
    ]);

    const values = getValues();
    const type = values.underProject?.trim();

    if (type === "กวศ." && !values.field?.trim()) {
      setError("field", { type: "manual", message: "กรุณากรอกฝ่าย" });
      return;
    }

    if (type === "ชมรม" && !values.clubName?.trim()) {
      setError("clubName", { type: "manual", message: "กรุณากรอกชื่อชมรม" });
      return;
    }

    if (type === "other" && !values.otherUnderProject?.trim()) {
      setError("otherUnderProject", { type: "manual", message: "กรุณาระบุ" });
      return;
    }

    if (!isValid) return;

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (
    data: ProjectFormValues,
    status: "draft" | "pending",
  ) => {
    const formattedData = CreateProjectFormatter(data, status);

    try {
      const response = await createProject.mutateAsync(formattedData);

      if (status === "pending")
        return router.push(`create-project/${response.project_id}/success`);

      if (status === "draft") return router.push("/");
    } catch (error) {
      console.log("error", error);
    }
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
          underProject={underProject}
          handleNext={handleNext}
        />
        <ProjectFormSecondStep
          step={step}
          activities={activities}
          energies={energies}
          participant={participant}
          accommodation={accommodation}
          gift={gift}
          waste={waste}
          errors={errors}
          projectCode={projectCode}
          projectName={projectName}
          fullName={fullName}
          telText={telText}
          greyColor={greyColor}
          disableColor={disableColor}
          redColor={redColor}
          watch={watch}
          setValue={setValue}
          removeActivity={removeActivity}
          appendActivity={appendActivity}
          removeEnergy={removeEnergy}
          appendEnergy={appendEnergy}
          removeParticipant={removeParticipant}
          appendParticipant={appendParticipant}
          removeAccommodation={removeAccommodation}
          appendAccommodation={appendAccommodation}
          removeGift={removeGift}
          appendGift={appendGift}
          removeWaste={removeWaste}
          appendWaste={appendWaste}
          handleBack={handleBack}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </Stack>
    </Form>
  );
}

export default ProjectForm;
