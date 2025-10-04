"use client";

import {
  fetchGetCertificate,
  projectsQueryKeys,
} from "@/services/project/query/project-query";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import ProjectFirstScopeInformation from "../../detail/project-first-scope-information";
import ProjectHeader from "../../detail/project-header";
import ProjectInformation from "../../detail/project-information";
import ProjectOwnerInformation from "../../detail/project-owner-information";
import ProjectSecondScopeInformation from "../../detail/project-second-scope-information";
import ProjectThirdScopeInformation from "../../detail/project-third-scope-information";
import ProjectRejectDetailButton from "../../project-reject-detail-button";
import { showSuccess, showError } from "@/components/toast/toast";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import { canModifyProject } from "@/helper/project-permissions";

type Params = {
  id: string;
};

function ProjectView() {
  // --------------------------- Hook ---------------------------

  const params = useParams<Params>();
  const router = useRouter();
  const { id } = params;

  // --------------------------- API ---------------------------

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });
  const currentOwner = owner.data?.owner ?? null;

  const project = useQuery({
    ...projectsQueryKeys.projectOptions({
      id: id,
      include_transportations: true,
    }),
    enabled: !!id,
  });

  const generateCertificate = useMutation({
    mutationFn: fetchGetCertificate,
    onSuccess: (data) => {
      if (!(data.blob instanceof Blob)) return;
      const url = URL.createObjectURL(data.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      showSuccess("พิมพ์ใบรับรองสำเร็จ");
    },
    onError: () => {
      showError("พิมพ์ใบรับรองไม่สำเร็จ");
    },
  });

  // --------------------------- Function ---------------------------

  const handleExport = () => {
    generateCertificate.mutate({ id: id });
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

  const canManage = canModifyProject(
    currentOwner,
    project.data?.project.owner_id,
  );

  // --------------------------- Render ---------------------------

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
        {["rejected", "fixing"].includes(project.data.project.status) && (
          <ProjectRejectDetailButton id={id} />
        )}

        <ProjectInformation data={informationData} />

        <ProjectOwnerInformation data={ownerData} />

        <ProjectFirstScopeInformation
          data={project.data?.project?.carbon_detail?.scope1?.activities ?? []}
        />

        <ProjectSecondScopeInformation
          data={
            project.data?.project.carbon_detail.scope2 ?? {
              buildings: null,
              generators: null,
            }
          }
        />

        <ProjectThirdScopeInformation
          data={project.data?.project?.carbon_detail?.scope3}
          projectId={project.data?.project.id}
          ownerId={project.data.project.owner_id}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ padding: "16px 24px", justifyContent: "end" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/")}
          >
            ย้อนกลับ
          </Button>

          {project.data.project.status === "approved" && canManage && (
            <Button variant="contained" onClick={handleExport}>
              พิมพ์ใบรับรอง
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProjectView;
