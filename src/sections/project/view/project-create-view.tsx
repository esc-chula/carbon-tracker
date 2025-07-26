"use client";

import { useState } from "react";
import ProjectForm from "../project-form";
import ProjectFormStepper from "../project-form-stepper";

function ProjectCreateView() {
  const [step, setStep] = useState<number>(2);

  return (
    <>
      <ProjectFormStepper step={step} />
      <ProjectForm step={step} setStep={setStep} />
    </>
  );
}

export default ProjectCreateView;
