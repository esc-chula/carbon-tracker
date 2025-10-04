"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import StatusChips from "@/components/StatusChips";
import { showError, showSuccess } from "@/components/toast/toast";
import { useUpdateProjectMutation } from "@/services/project/mutation/use-update-project";
import { useUpdateProjectStatusMutation } from "@/services/project/mutation/use-update-project-status";
import {
  fetchGetProjectTransportationsCsv,
  projectsQueryKeys,
} from "@/services/project/query/project-query";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import type { TProjectStatus } from "@/types/project/list-project";
import { CircularProgress, Stack, Typography } from "@mui/material";
import type { ProjectFormValues } from "../../form/type";
import { projectToFormValues } from "../../helper/project-to-form-values";
import UpdateProjectFormatter from "../../helper/update-project-formatter";
import { canModifyProject } from "@/helper/project-permissions";
import ProjectForm, {
  type ProjectFormConfirmHandlerArgs,
} from "../../project-form";
import ProjectFormStepper from "../../project-form-stepper";
import { HTTPError } from "ky";

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

  const currentOwner = owner.data?.owner ?? null;
  const canEditProject = canModifyProject(
    currentOwner,
    project.data?.project?.owner_id ?? null,
  );

  useEffect(() => {
    if (!projectId) return;
    if (!owner.isSuccess || !project.isSuccess) return;
    if (canEditProject) return;

    void router.replace(`/project/${projectId}`);
  }, [canEditProject, owner.isSuccess, project.isSuccess, projectId, router]);

  const fallbackOwner = owner.data?.owner ?? null;

  const transportationsCsvQuery = useQuery<File | null>({
    queryKey: ["project-transportations-csv", projectId],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { blob, filename, contentType } =
          await fetchGetProjectTransportationsCsv({ id: projectId });

        return new File([blob], filename, {
          type: contentType || blob.type || "text/csv",
          lastModified: Date.now(),
        });
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 404) {
          return null;
        }
        console.error(error);
        showError("ไม่สามารถโหลดไฟล์ CSV การเดินทางได้");
        throw error;
      }
    },
    enabled: canEditProject && projectId.length > 0,
  });

  const transportationsCsvFile = transportationsCsvQuery.data ?? null;

  const initialValues: ProjectFormValues = useMemo(() => {
    const base = projectToFormValues({
      project: project.data?.project,
      fallbackOwner,
    });

    if (transportationsCsvFile) {
      base.transportations_csv_file = transportationsCsvFile;
    }

    return base;
  }, [fallbackOwner, project.data?.project, transportationsCsvFile]);

  const handleSubmit = async (
    data: ProjectFormValues,
    status: TProjectStatus,
  ) => {
    if (!projectId) return;
    if (!canEditProject) {
      showError("คุณไม่มีสิทธิ์แก้ไขโครงการนี้");
      return;
    }

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

  if (transportationsCsvQuery.isLoading) {
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

  if (project.isSuccess && owner.isSuccess && !canEditProject) {
    return null;
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
