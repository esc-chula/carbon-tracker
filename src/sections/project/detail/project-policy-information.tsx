"use client";

import ContainerWithOutlined from "@/components/container/container-with-outlined";
import type {
  PolicyImplementationPhoto,
  ProjectInfo,
} from "@/types/project/project";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";

type ProjectPolicyInformationProps = {
  data: ProjectInfo;
  children?: ReactNode;
};

function formatFileSize(bytes?: number | null): string {
  if (bytes === undefined) return "Loading...";
  if (bytes === null) return "Unknown size";
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, index)).toFixed(2))} ${sizes[index]}`;
}

function PolicyPhotoFileRow({ photo }: { photo: PolicyImplementationPhoto }) {
  const canDownload = Boolean(photo.url);
  const [fileSize, setFileSize] = useState<number | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!photo.url) {
      setFileSize(null);
      return;
    }

    let ignore = false;

    async function fetchPhotoSize() {
      try {
        const response = await fetch(photo.url as string);
        if (!response.ok) {
          throw new Error("Failed to fetch policy photo");
        }

        const blob = await response.blob();

        if (!ignore) {
          setFileSize(blob.size);
        }
      } catch {
        if (!ignore) {
          setFileSize(null);
        }
      }
    }

    void fetchPhotoSize();

    return () => {
      ignore = true;
    };
  }, [photo.url]);

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {formatFileSize(fileSize)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box component="img" src="/assets/icons/ic-check.svg" />
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 3fr" },
          gap: { xs: 1, md: 3 },
          alignItems: "start",
        }}
      >
        <Typography
          variant="body2"
          fontWeight={500}
          color="#637381"
          sx={{ minWidth: 0 }}
        >
          นโยบายสิ่งแวดล้อม
        </Typography>
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            minWidth: 0,
            overflowWrap: "anywhere",
            whiteSpace: "pre-wrap",
          }}
        >
          {data.environmental_policy}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 3fr" },
          gap: { xs: 1, md: 3 },
          alignItems: "start",
        }}
      >
        <Typography
          variant="body2"
          fontWeight={500}
          color="#637381"
          sx={{ minWidth: 0 }}
        >
          ข้อเสนอแนะในการดำเนินนโยบาย
        </Typography>
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            minWidth: 0,
            overflowWrap: "anywhere",
            whiteSpace: "pre-wrap",
          }}
        >
          {data.policy_implementation_suggestion}
        </Typography>
      </Box>

      {!!data.policy_implementation_photos?.length && (
        <Stack spacing={1}>
          <Typography variant="body2" fontWeight={500} color="#637381">
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
