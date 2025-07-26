"use client";

import { Form } from "@/components/hook-form/form-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useTheme } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { defaultValues, ProjectFormSchema } from "./form/schema";
import type { ProjectFormValues } from "@/sections/project/form/type";
import { useRouter } from "next/navigation";
import { ProjectFormStep1 } from "@/sections/project/ProjectFormStep1";
import { ProjectFormStep2 } from "@/sections/project/ProjectFormStep2";

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
        <ProjectFormStep1
          step={step}
          errors={errors}
          underProject={underProject}
          handleNext={handleNext}
        />
        <ProjectFormStep2
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
        />
      </Stack>
    </Form>
  );
}

export default ProjectForm;
