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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fullName, nickname, department, student_id, tel, ...other } =
    defaultValues;

  const initialValues: ProjectFormValues = {
    ...other,
    fullName: owner.data?.owner.fullname ?? "",
    nickname: owner.data?.owner.nickname ?? "",
    department: owner.data?.owner.major ?? "",
    student_id: owner.data?.owner.student_id ?? "",
    tel: owner.data?.owner.phone_number ?? "",
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
