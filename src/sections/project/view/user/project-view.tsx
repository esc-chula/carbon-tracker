"use client";

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { showError, showSuccess } from "@/components/toast/toast";
import { canModifyProject } from "@/helper/project-permissions";
import { useBoolean } from "@/hooks/use-boolean";
import { useUpdateProjectStatusMutation } from "@/services/project/mutation";
import {
  fetchGetCertificate,
  projectsQueryKeys,
} from "@/services/project/query/project-query";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import { totalCarbonResult } from "@/types/project/get-project";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import ProjectFirstScopeInformation from "../../detail/project-first-scope-information";
import ProjectHeader from "../../detail/project-header";
import ProjectInformation from "../../detail/project-information";
import ProjectOwnerInformation from "../../detail/project-owner-information";
import ProjectSecondScopeInformation from "../../detail/project-second-scope-information";
import ProjectThirdScopeInformation from "../../detail/project-third-scope-information";
import ProjectCarbonDetail from "../../project-carbon-detail";
import ProjectRejectDetailButton from "../../project-reject-detail-button";

type Params = {
  id: string;
};

function ProjectView() {
  // --------------------------- Hook ---------------------------

  const params = useParams<Params>();
  const router = useRouter();
  const { id } = params;

  const openDialog = useBoolean();

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

  const { mutateAsync: updateProjectStatus, isPending: isUpdatingStatus } =
    useUpdateProjectStatusMutation();

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

  const handleReject = async () => {
    await updateProjectStatus({ id: id, status: "pending" });

    openDialog.onFalse();

    router.push(`/admin/project/${id}/review`);

    showSuccess("ยกเลิกการอนุมัติสำเร็จ");
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

  const carbonResult = project.data?.project.carbon_result;
  const carbonUsageAll = carbonResult ? totalCarbonResult(carbonResult) : 0;

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
    <>
      <Stack sx={{ marginTop: 5, backgroundColor: "#ffffff", borderRadius: 3 }}>
        <ProjectHeader data={headerData} />

        <Stack spacing={4} sx={{ padding: 3 }}>
          {["rejected", "fixing"].includes(project.data.project.status) && (
            <ProjectRejectDetailButton id={id} />
          )}

          <ProjectInformation data={informationData} />

          <ProjectOwnerInformation data={ownerData} />

          <ProjectFirstScopeInformation
            data={
              project.data?.project?.carbon_detail?.scope1?.activities ?? []
            }
            carbon={project.data?.project.carbon_result.scope1}
          />

          <ProjectSecondScopeInformation
            data={
              project.data?.project.carbon_detail.scope2 ?? {
                buildings: null,
                generators: null,
              }
            }
            carbon={project.data?.project.carbon_result.scope2}
          />

          <ProjectThirdScopeInformation
            data={project.data?.project?.carbon_detail?.scope3}
            projectId={project.data?.project.id}
            ownerId={project.data.project.owner_id}
            carbon={project.data?.project.carbon_result.scope3}
          >
            <ProjectCarbonDetail carbon={carbonUsageAll} all />
          </ProjectThirdScopeInformation>

          <Stack
            direction="row"
            spacing={2}
            sx={{ padding: "16px 24px", justifyContent: "end" }}
          >
            {project.data.project.status === "approved" &&
            currentOwner?.is_admin ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={openDialog.onTrue}
                >
                  ยกเลิกการอนุมัติ
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => router.push("/")}
                >
                  ย้อนกลับ
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      <ConfirmDialog
        key={`${project.data?.project.id}-${openDialog.value}`}
        open={openDialog.value}
        title={
          <Box component="img" src={"/assets/icons/ic-reject-dialog.svg"} />
        }
        content={
          <Stack spacing={1}>
            <Typography variant="h3" whiteSpace="break-spaces">
              คุณต้องการยกเลิกการอนุมัติ{"\n"}แบบฟอร์มโครงการหรือไม่?
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              color="#637381"
              whiteSpace="break-spaces"
            >
              หลังจากยกเลิกการอนุมัติแบบฟอร์มโครงการแล้ว{"\n"}ระบบจะยกเลิกสถานะ
              “ผ่านการตรวจ”{"\n"}กลับไปเป็นสถานะ “กำลังตรวจ”
            </Typography>
          </Stack>
        }
        action={
          <Button
            variant="contained"
            color={"error"}
            onClick={handleReject}
            disabled={isUpdatingStatus}
          >
            ยกเลิกการอนุมัติ
          </Button>
        }
        onClose={openDialog.onFalse}
      />
    </>
  );
}

export default ProjectView;
