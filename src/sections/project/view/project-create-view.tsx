"use client";

import { useState } from "react";
import ProjectForm from "../project-form";
import ProjectFormStepper from "../project-form-stepper";

// ---------------------------------------------------------------------------------

function ProjectCreateView() {
  // --------------------------- Hook ---------------------------

  const [step, setStep] = useState<number>(1);

  // --------------------------- Render ---------------------------

  return (
    <>
      <ProjectFormStepper step={step} />
      <ProjectForm step={step} setStep={setStep} />
    </>
  );
}

export default ProjectCreateView;
