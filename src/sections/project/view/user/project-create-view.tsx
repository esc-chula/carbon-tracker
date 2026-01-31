"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm, {
  type ProjectFormConfirmHandlerArgs,
} from "../../project-form";
import ProjectFormStepper from "../../project-form-stepper";
import { defaultValues } from "../../form/schema";
import { useQuery } from "@tanstack/react-query";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import type { ProjectFormValues } from "../../form/type";
import { useCreateProjectMutation } from "@/services/project/mutation";
import CreateProjectFormatter from "../../helper/create-project-formatter";
import { showError, showSuccess } from "@/components/toast/toast";
import type { TProjectStatus } from "@/types/project/list-project";
import { HTTPError } from "ky";
import { mapApiErrorToMessage } from "@/lib/error-mapping";

// ---------------------------------------------------------------------------------

function ProjectCreateView() {
  // --------------------------- Hook ---------------------------

  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  // --------------------------- API ---------------------------

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });

  const { mutateAsync, isPending } = useCreateProjectMutation();

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
    owner_phone_number: owner.data?.owner.phone_number ?? owner_phone_number,
  };

  const handleSubmit = async (
    data: ProjectFormValues,
    status: TProjectStatus,
  ) => {
    const formattedData = CreateProjectFormatter(data, status);

    try {
      const response = await mutateAsync(formattedData);

      if (status === "pending") {
        router.push(`/project/${response.project_id}/success`);
        return;
      }

      if (status === "draft") {
        showSuccess("บันทึกแบบร่างสำเร็จ");
        router.push("/");
        return;
      }
    } catch (error) {
      let errorMessage = "ส่งแบบฟอร์มไม่สำเร็จ";
      if (error instanceof HTTPError) {
        const errorData = await error.response.json();
        errorMessage = mapApiErrorToMessage(errorData, errorMessage);
      }
      showError(errorMessage);
    }
  };

  const handleConfirmClick = ({
    handleSubmit,
    submit,
    closeDialog,
  }: ProjectFormConfirmHandlerArgs) => {
    const runSubmit = handleSubmit((data) => {
      void submit(data, "pending");
    });

    void runSubmit();

    closeDialog();
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
        onSubmit={handleSubmit}
        onConfirmClick={handleConfirmClick}
        confirmDisabled={isPending}
      />
    </>
  );
}

export default ProjectCreateView;
