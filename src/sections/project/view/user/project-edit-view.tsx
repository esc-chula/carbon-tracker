"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import ProjectForm, {
  type ProjectFormConfirmHandlerArgs,
} from "../../project-form";
import ProjectFormStepper from "../../project-form-stepper";
import type { ProjectFormValues } from "../../form/type";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import { projectsQueryKeys } from "@/services/project/query/project-query";
import { useUpdateProjectMutation } from "@/services/project/mutation/use-update-project";
import { useUpdateProjectStatusMutation } from "@/services/project/mutation/use-update-project-status";
import UpdateProjectFormatter from "../../helper/update-project-formatter";
import { projectToFormValues } from "../../helper/project-to-form-values";
import { showError, showSuccess } from "@/components/toast/toast";

// ---------------------------------------------------------------------------------

type Params = {
  id: string;
};

function ProjectEditView() {
  // --------------------------- Hook ---------------------------

  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const params = useParams<Params>();
  const projectId = params?.id ?? "";

  // --------------------------- API ---------------------------

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });
  const project = useQuery({
    ...projectsQueryKeys.projectOptions({
      id: projectId,
      include_transportations: true,
    }),
    enabled: projectId.length > 0,
  });

  const { mutateAsync: updateProject, isPending: isUpdatingProject } =
    useUpdateProjectMutation();
  const { mutateAsync: updateProjectStatus, isPending: isUpdatingStatus } =
    useUpdateProjectStatusMutation();

  // --------------------------- Form ---------------------------

  const fallbackOwner = owner.data?.owner ?? null;

  const initialValues: ProjectFormValues = useMemo(
    () =>
      projectToFormValues({
        project: project.data?.project,
        fallbackOwner,
      }),
    [fallbackOwner, project.data?.project],
  );

  const handleSubmit = async (
    data: ProjectFormValues,
    status: "draft" | "pending",
  ) => {
    if (!projectId) return;

    const formattedData = UpdateProjectFormatter(projectId, data, status);

    try {
      await updateProject(formattedData);

      if (status === "pending") {
        await updateProjectStatus({ id: projectId, status: "pending" });
        router.push(`/project/${projectId}/success`);
        return;
      }

      showSuccess("บันทึกแบบร่างสำเร็จ");
      router.push("/");
    } catch {
      showError("ส่งแบบฟอร์มไม่สำเร็จ");
    }
  };

  const handleConfirmClick = ({
    handleSubmit: formHandleSubmit,
    submit,
    closeDialog,
  }: ProjectFormConfirmHandlerArgs) => {
    const runSubmit = formHandleSubmit((formData) => {
      void submit(formData, "pending");
    });

    void runSubmit();
    closeDialog();
  };

  // --------------------------- Value ---------------------------

  const formKey = project.data?.project
    ? `project-${project.data.project.id}-${project.data.project.updated_at}`
    : "project-edit-form-loading";

  const isSubmitting = isUpdatingProject || isUpdatingStatus;

  // --------------------------- Render ---------------------------

  return (
    <>
      <ProjectFormStepper step={step} isEdit />
      <ProjectForm
        key={formKey}
        step={step}
        setStep={setStep}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onConfirmClick={handleConfirmClick}
        confirmDisabled={isSubmitting}
        isEdit
      />
    </>
  );
}

export default ProjectEditView;
