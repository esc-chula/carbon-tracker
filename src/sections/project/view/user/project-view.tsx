"use client";

import { projectsQueryKeys } from "@/services/project/query/project-query";
import { CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ProjectHeader from "../../detail/project-header";
import ProjectInformation from "../../detail/project-information";
import ProjectOwnerInformation from "../../detail/project-owner-information";
import ProjectFirstScopeInformation from "../../detail/project-first-scope-information";
import ProjectSecondScopeInformation from "../../detail/project-second-scope-information";
import ProjectThirdScopeInformation from "../../detail/project-third-scope-information";

type Params = {
  id: string;
};

function ProjectView() {
  // --------------------------- Hook ---------------------------

  const params = useParams<Params>();
  const { id } = params;

  // --------------------------- API ---------------------------

  const project = useQuery({
    ...projectsQueryKeys.projectOptions({
      id: id,
      include_transportations: true,
    }),
    enabled: !!id,
  });

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
        />
      </Stack>
    </Stack>
  );
}

export default ProjectView;
