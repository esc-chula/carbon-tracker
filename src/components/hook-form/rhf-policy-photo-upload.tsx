"use client";

import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type JSX,
  type MouseEvent,
} from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import type { PolicyImplementationPhoto } from "@/types/project/project";
import { SvgColor } from "../svg/svg-color";

interface UploadAreaProps {
  isDragOver: boolean;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
});

const UploadArea = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isDragOver",
})<UploadAreaProps>(({ theme, isDragOver }) => ({
  border: `1px dashed ${isDragOver ? theme.palette.text.primary : "#DBE0E4"}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(5),
  textAlign: "center",
  backgroundColor: isDragOver
    ? theme.palette.action.hover
    : theme.palette.background.neutral,
  transition: "all 0.3s ease",
}));

export type PolicyPhotoUploadFieldProps<TFieldValues extends FieldValues> = {
  name: string;
  control: Control<TFieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: RegisterOptions<TFieldValues, any>;
  maxFiles?: number;
  maxSizeBytes?: number;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  existingPhotos?: PolicyImplementationPhoto[];
  onRemoveExistingPhoto?: (storageKey: string) => void;
};

export default function PolicyPhotoUploadField<
  TFieldValues extends FieldValues,
>({
  name,
  control,
  rules,
  maxFiles = 4,
  maxSizeBytes = 3 * 1024 * 1024,
  label = "เลือกไฟล์รูปภาพที่คุณต้องการ",
  helperText = "กรุณาอัปโหลดรูปภาพ PNG หรือ JPG (max. 3MB) สูงสุด 4 รูป",
  disabled,
  existingPhotos = [],
  onRemoveExistingPhoto,
}: PolicyPhotoUploadFieldProps<TFieldValues>): JSX.Element {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isPhotoFile = (file: File) =>
    ["image/png", "image/jpeg"].includes(file.type) &&
    /\.(png|jpe?g)$/i.test(file.name);

  const validatePhotos = (files: File[]): string | true => {
    const photoCount = existingPhotos.length + files.length;

    if (!photoCount)
      return "กรุณาอัปโหลดรูปภาพ PNG หรือ JPG (max. 3MB) สูงสุด 4 รูป";
    if (photoCount > maxFiles)
      return "กรุณาอัปโหลดรูปภาพ PNG หรือ JPG (max. 3MB) สูงสุด 4 รูป";

    const isValid = files.every(
      (file) => isPhotoFile(file) && file.size <= maxSizeBytes,
    );

    return isValid
      ? true
      : "กรุณาอัปโหลดรูปภาพ PNG หรือ JPG (max. 3MB) สูงสุด 4 รูป";
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          const files = Array.isArray(value) ? (value as File[]) : [];
          return validatePhotos(files);
        },
        ...rules,
      }}
      render={({ field, fieldState }) => {
        const files = Array.isArray(field.value)
          ? (field.value as File[]).filter(
              (file) => typeof File !== "undefined" && file instanceof File,
            )
          : [];
        const hasFiles = existingPhotos.length > 0 || files.length > 0;

        const addFiles = (incomingFileList: FileList | File[]) => {
          if (disabled) return;

          const incomingFiles = Array.from(incomingFileList);
          const nextFiles = [...files, ...incomingFiles];
          const validation = validatePhotos(nextFiles);

          if (validation !== true) {
            setSelectionError(validation);
            return;
          }

          setSelectionError(null);
          field.onChange(nextFiles);
        };

        const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          if (disabled) return;
          setIsDragOver(true);
        };

        const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          if (disabled) return;
          setIsDragOver(false);
        };

        const handleDrop = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          if (disabled) return;
          setIsDragOver(false);

          if (e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
          }
        };

        const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
          }
          e.target.value = "";
        };

        const handleDeleteFile =
          (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
            if (disabled) return;

            e.preventDefault();
            e.stopPropagation();

            const nextFiles = files.filter(
              (_, fileIndex) => fileIndex !== index,
            );
            field.onChange(nextFiles);
            setSelectionError(null);
          };

        return (
          <Stack sx={{ width: 1, alignItems: "center" }}>
            <Box sx={{ width: 1, maxWidth: 1040, p: 3 }}>
              {existingPhotos.length + files.length < maxFiles && (
                <UploadArea
                  elevation={0}
                  isDragOver={isDragOver}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Stack
                    direction="row"
                    spacing={5}
                    sx={{ padding: 3, justifyContent: "center" }}
                  >
                    <Box
                      component="img"
                      src="/assets/icons/ic-csv-laptop.svg"
                      alt="Policy photo upload"
                      sx={{
                        width: 140,
                        height: 120,
                        opacity: disabled ? 0.6 : 1,
                      }}
                    />

                    <Stack
                      spacing={1}
                      alignItems="start"
                      justifyContent="center"
                    >
                      <Typography variant="h4">{label}</Typography>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      >
                        ลากมาวางที่นี่จากคอมพิวเตอร์ของคุณ
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            color: (theme) => theme.palette.text.secondary,
                          }}
                        >
                          หรือ
                        </Typography>
                        <Button
                          variant="outlined"
                          sx={{ borderRadius: 100 }}
                          onClick={() => !disabled && inputRef.current?.click()}
                          disabled={disabled}
                        >
                          อัปโหลดไฟล์
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>

                  <VisuallyHiddenInput
                    ref={inputRef}
                    accept="image/png,image/jpeg"
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    name={field.name}
                    disabled={disabled}
                  />
                </UploadArea>
              )}

              {hasFiles && (
                <Stack
                  spacing={1.5}
                  sx={{
                    mt: existingPhotos.length + files.length < maxFiles ? 2 : 0,
                  }}
                >
                  {existingPhotos.map((photo) => (
                    <Box
                      key={photo.storage_key}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5,
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                        width: "max-content",
                        maxWidth: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          component="img"
                          src={photo.url ?? "/assets/icons/ic-file.svg"}
                          width={32}
                          height={32}
                          sx={{
                            borderRadius: 0.5,
                            objectFit: "cover",
                          }}
                        />
                        <Stack>
                          <Typography variant="body2">
                            {photo.filename}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {photo.mime_type}
                          </Typography>
                        </Stack>
                      </Box>

                      {!disabled && (
                        <IconButton
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onRemoveExistingPhoto?.(photo.storage_key);
                          }}
                          size="small"
                          disabled={disabled}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color="#B71931"
                          />
                        </IconButton>
                      )}
                    </Box>
                  ))}

                  {files.map((file, index) => (
                    <Box
                      key={`${file.name}-${file.size}-${index}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5,
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                        width: "max-content",
                        maxWidth: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          component="img"
                          src="/assets/icons/ic-file.svg"
                          width={32}
                          height={32}
                        />
                        <Stack>
                          <Typography variant="body2">{file.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatFileSize(file.size)}
                          </Typography>
                        </Stack>
                      </Box>

                      {!disabled && (
                        <IconButton
                          onClick={handleDeleteFile(index)}
                          size="small"
                          disabled={disabled}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color="#B71931"
                          />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Stack>
              )}

              {(selectionError ?? fieldState.error?.message) && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {selectionError ?? fieldState.error?.message}
                </Alert>
              )}

              {!selectionError && !fieldState.error?.message && (
                <Typography variant="body2" color="#919EAB" sx={{ mt: 1 }}>
                  {helperText}
                </Typography>
              )}
            </Box>
          </Stack>
        );
      }}
    />
  );
}
