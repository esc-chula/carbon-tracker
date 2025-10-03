"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import StatusChips from "@/components/StatusChips";
import { showError, showSuccess } from "@/components/toast/toast";
import { useUpdateProjectMutation } from "@/services/project/mutation/use-update-project";
import { useUpdateProjectStatusMutation } from "@/services/project/mutation/use-update-project-status";
import { projectsQueryKeys } from "@/services/project/query/project-query";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import type { TProjectStatus } from "@/types/project/list-project";
import { CircularProgress, Stack, Typography } from "@mui/material";
import type { ProjectFormValues } from "../../form/type";
import { projectToFormValues } from "../../helper/project-to-form-values";
import UpdateProjectFormatter from "../../helper/update-project-formatter";
import ProjectForm, {
  type ProjectFormConfirmHandlerArgs,
} from "../../project-form";
import ProjectFormStepper from "../../project-form-stepper";

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
    status: TProjectStatus,
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

  if (project.isLoading || owner.isLoading || !project.isSuccess) {
    return (
      <Stack
        sx={{
          height: "calc(100vh - 100px)",
          width: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={50} />
      </Stack>
    );
  }

  if (!["draft", "fixing"].includes(project.data.project.status)) {
    return (
      <Stack
        sx={{
          height: "calc(100vh - 100px)",
          width: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        direction="row"
        spacing={2}
      >
        <Typography>สามารถแก้ไขได้เฉพาะโครงการที่อยู่ในสถานะ</Typography>
        <StatusChips variantType="draft" />
        <Typography>หรือ</Typography>
        <StatusChips variantType="fixing" />
        <Typography>เท่านั้น</Typography>
      </Stack>
    );
  }

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
