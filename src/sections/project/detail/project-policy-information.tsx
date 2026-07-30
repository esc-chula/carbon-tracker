"use client";

import ContainerWithOutlined from "@/components/container/container-with-outlined";
import { SvgColor } from "@/components/svg/svg-color";
import type {
  PolicyImplementationPhoto,
  ProjectInfo,
} from "@/types/project/project";
import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type ProjectPolicyInformationProps = {
  data: ProjectInfo;
  children?: ReactNode;
};

function PolicyPhotoFileRow({ photo }: { photo: PolicyImplementationPhoto }) {
  const canDownload = Boolean(photo.url);

  const handleDownload = () => {
    if (!photo.url) return;

    const link = document.createElement("a");
    link.href = photo.url;
    link.download = photo.filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
        cursor: canDownload ? "pointer" : "default",
        transition: "background-color 0.2s ease",
        borderRadius: 1,
        px: 1,
        py: 0.5,
        width: "max-content",
        maxWidth: 1,
        "&:hover": canDownload
          ? {
              backgroundColor: (theme) => theme.palette.action.hover,
            }
          : undefined,
      }}
      onClick={handleDownload}
      role={canDownload ? "button" : undefined}
      tabIndex={canDownload ? 0 : undefined}
      onKeyDown={(event) => {
        if (!canDownload) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleDownload();
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
        <Box
          component="img"
          src="/assets/icons/ic-file.svg"
          width={32}
          height={32}
        />

        <Stack sx={{ minWidth: 0 }}>
          <Typography variant="body2" noWrap>
            {photo.filename}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {photo.mime_type}
          </Typography>
        </Stack>
      </Box>

      <SvgColor src="/assets/icons/ic-check.svg" />
    </Box>
  );
}

function ProjectPolicyInformation({
  data,
  children,
}: ProjectPolicyInformationProps) {
  return (
    <ContainerWithOutlined>
      <Typography variant="h3" fontSize={16}>
        การดำเนินนโยบายสิ่งแวดล้อม
      </Typography>

      <Stack spacing={1}>
        <Typography variant="body2" fontWeight={700}>
          นโยบายสิ่งแวดล้อม
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {data.environmental_policy}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" fontWeight={700}>
          ข้อเสนอแนะในการดำเนินนโยบาย
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {data.policy_implementation_suggestion}
        </Typography>
      </Stack>

      {!!data.policy_implementation_photos?.length && (
        <Stack spacing={1}>
          <Typography variant="body2" fontWeight={700}>
            รูปภาพการดำเนินการตามนโยบาย
          </Typography>

          <Stack spacing={1}>
            {data.policy_implementation_photos.map((photo) => (
              <PolicyPhotoFileRow key={photo.storage_key} photo={photo} />
            ))}
          </Stack>
        </Stack>
      )}

      {children}
    </ContainerWithOutlined>
  );
}

export default ProjectPolicyInformation;
