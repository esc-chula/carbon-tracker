"use client";

import { useState } from "react";
import ProjectForm from "../project-form";
import ProjectFormStepper from "../project-form-stepper";
import { defaultValues } from "../form/schema";
import { useQuery } from "@tanstack/react-query";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import type { ProjectFormValues } from "../form/type";

// ---------------------------------------------------------------------------------

function ProjectCreateView() {
  // --------------------------- Hook ---------------------------

  const [step, setStep] = useState<number>(1);

  // --------------------------- API ---------------------------

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });

  // --------------------------- Form ---------------------------

  const {
    owner_fullname,
    owner_nickname,
    owner_major,
    owner_student_id,
    owner_phone_number,
    ...other
  } = defaultValues;

  const initialValues: ProjectFormValues = {
    ...other,
    owner_fullname: owner.data?.owner.fullname ?? owner_fullname,
    owner_nickname: owner.data?.owner.nickname ?? owner_nickname,
    owner_major: owner.data?.owner.major ?? owner_major,
    owner_student_id: owner.data?.owner.student_id ?? owner_student_id,
    owner_phone_number:
      owner.data?.owner.phone_number ?? owner_phone_number,
  };

  // --------------------------- Render ---------------------------

  return (
    <>
      <ProjectFormStepper step={step} />
      <ProjectForm
        key={JSON.stringify(owner)}
        step={step}
        setStep={setStep}
        initialValues={initialValues}
      />
    </>
  );
}

export default ProjectCreateView;
