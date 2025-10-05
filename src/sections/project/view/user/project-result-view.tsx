"use client";

import { projectsQueryKeys } from "@/services/project/query/project-query";
import type { TReviewCheck } from "@/types/project/review-project";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import ProjectHeader from "../../detail/project-header";
import ProjectInformation from "../../detail/project-information";
import ProjectOwnerInformation from "../../detail/project-owner-information";
import ProjectFirstScopeInformation from "../../detail/project-first-scope-information";
import ProjectSecondScopeInformation from "../../detail/project-second-scope-information";
import ProjectThirdScopeInformation from "../../detail/project-third-scope-information";
import ContainerWithOutlined from "@/components/container/container-with-outlined";
import { useUpdateProjectStatusMutation } from "@/services/project/mutation";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import { canModifyProject } from "@/helper/project-permissions";
import ProjectCarbonDetail from "../../project-carbon-detail";
import { totalCarbonResult } from "@/types/project/get-project";

type Params = {
  id: string;
};

function ProjectResultView() {
  // --------------------------- Hook ---------------------------

  const params = useParams<Params>();
  const router = useRouter();
  const { id } = params;

  // --------------------------- API ---------------------------

  const project = useQuery({
    ...projectsQueryKeys.projectOptions({
      id: id,
      include_transportations: true,
      include_review: true,
    }),
    enabled: !!id,
  });

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });
  const currentOwner = owner.data?.owner ?? null;

  const { mutateAsync: updateProjectStatus, isPending: isUpdatingStatus } =
    useUpdateProjectStatusMutation();

  const canEdit = project.data?.project
    ? canModifyProject(currentOwner, project.data.project.owner_id)
    : false;

  // --------------------------- Function ---------------------------

  const handleFixing = async () => {
    if (!canEdit) return;
    await updateProjectStatus({ id: id, status: "fixing" });
    router.push(`/project/${id}/edit`);
    return;
  };

  // --------------------------- Values ---------------------------

  const headerData = {
    custom_id: project.data?.project.custom_id ?? "",
    title: project.data?.project.title ?? "",
    status: project.data?.project.status ?? "",
    owner: project.data?.project?.owner,
  };

  const informationData = {
    custom_id: project.data?.project.custom_id ?? "",
    title: project.data?.project.title ?? "",
    org: project.data?.project.org ?? "",
    org_detail: project.data?.project?.org_detail ?? "",
  };

  const ownerData = project.data?.project.owner;

  const carbonResult = project.data?.project.carbon_result;
  const carbonUsageAll = carbonResult ? totalCarbonResult(carbonResult) : 0;

  // --------------------------- Render ---------------------------

  const renderPass = (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box component="img" src="/assets/icons/ic-pass-check.svg" />

      <Typography variant="body2" fontWeight={500}>
        ผ่านการตรวจ
      </Typography>
    </Stack>
  );

  const renderIssue = (note: string, key?: number) => (
    <Stack key={key} direction="row" spacing={2} alignItems="center">
      <Box component="img" src="/assets/icons/ic-warning.svg" />

      <Typography variant="body2" fontWeight={500}>
        ปัญหา: {note}
      </Typography>
    </Stack>
  );

  const renderReviewStatus = (review?: TReviewCheck | null) => {
    if (!review) return null;

    if (review.passed) {
      return renderPass;
    }

    return (
      review.rejection_notes?.map((note, index) => renderIssue(note, index)) ??
      null
    );
  };

  if (project.isLoading || !project.isSuccess) {
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

  return (
    <Stack sx={{ marginTop: 5, backgroundColor: "#ffffff", borderRadius: 3 }}>
      <ProjectHeader data={headerData} />

      <Stack spacing={4} sx={{ padding: 3 }}>
        <ProjectInformation data={informationData}>
          {renderReviewStatus(project.data.review?.detail?.project)}
        </ProjectInformation>

        <ProjectOwnerInformation data={ownerData}>
          {renderReviewStatus(project.data.review?.detail?.owner)}
        </ProjectOwnerInformation>

        <ProjectFirstScopeInformation
          data={project.data?.project?.carbon_detail?.scope1?.activities ?? []}
          carbon={project.data?.project.carbon_result.scope1}
        >
          {renderReviewStatus(project.data.review?.detail?.scope1)}
        </ProjectFirstScopeInformation>

        <ProjectSecondScopeInformation
          data={
            project.data?.project.carbon_detail.scope2 ?? {
              buildings: null,
              generators: null,
            }
          }
          carbon={project.data?.project.carbon_result.scope2}
        >
          {renderReviewStatus(project.data.review?.detail?.scope2)}
        </ProjectSecondScopeInformation>

        <ProjectThirdScopeInformation
          data={project.data?.project?.carbon_detail?.scope3}
          projectId={project.data?.project.id}
          carbon={project.data?.project.carbon_result.scope3}
          ownerId={project.data.project.owner_id}
          attendeeChildren={renderReviewStatus(
            project.data.review?.detail?.scope3?.attendee,
          )}
          overnightChildren={renderReviewStatus(
            project.data.review?.detail?.scope3?.overnight,
          )}
          souvenirChildren={renderReviewStatus(
            project.data.review?.detail?.scope3?.souvenir,
          )}
          wasteChildren={renderReviewStatus(
            project.data.review?.detail?.scope3?.waste,
          )}
        >
          <ProjectCarbonDetail carbon={carbonUsageAll} all />
        </ProjectThirdScopeInformation>

        {project.data.review?.note && (
          <ContainerWithOutlined>
            <Typography variant="h3" fontSize={16}>
              รายละเอียดเพิ่มเติม
            </Typography>

            <Typography variant="body2" fontWeight={500}>
              {project.data.review?.note}
            </Typography>
          </ContainerWithOutlined>
        )}

        <Stack
          direction="row"
          spacing={2}
          sx={{ padding: "16px 24px", justifyContent: "end" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.back()}
            disabled={isUpdatingStatus}
          >
            ย้อนกลับ
          </Button>

          {project.data.project.status === "rejected" && canEdit && (
            <Button
              variant="contained"
              onClick={handleFixing}
              disabled={isUpdatingStatus}
            >
              แก้ไขข้อมูล
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProjectResultView;
