"use client";

import {
  Alert,
  Box,
  Button,
  IconButton,
  LinearProgress,
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
} from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { SvgColor } from "../svg/svg-color";

type UploadStatus = "idle" | "uploading" | "complete" | "error";

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

export type CSVUploadFieldProps<TFieldValues extends FieldValues> = {
  name: string;
  control: Control<TFieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: RegisterOptions<TFieldValues, any>;
  maxSizeBytes?: number;
  uploadingSimulateMs?: number;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  onDownload?: () => Promise<void> | void;
};

export default function CSVUploadField<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  maxSizeBytes = 5 * 1024 * 1024,
  uploadingSimulateMs = 1500,
  label = "เลือกไฟล์ที่คุณต้องการ",
  helperText = "กรุณาอัปโหลดไฟล์ .csv จากข้อมูลลงทะเบียน",
  disabled,
  onDownload,
}: CSVUploadFieldProps<TFieldValues>): JSX.Element {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateCsv = (f: File | null): string | true => {
    if (!f) return "กรุณาอัปโหลดไฟล์ .csv";

    const isCsv = f.type === "text/csv" || /\.csv$/i.test(f.name);
    if (!isCsv) return "กรุณาอัปโหลดไฟล์ .csv เท่านั้น";

    if (f.size > maxSizeBytes) {
      return `ไฟล์มีขนาดเกินกำหนด (${formatFileSize(f.size)} > ${formatFileSize(maxSizeBytes)})`;
    }
    return true;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => validateCsv(value ?? null),
        ...rules,
      }}
      render={({ field, fieldState }) => {
        const file: File | null = field.value ?? null;
        const canDownload = Boolean(file);

        const startUpload = (f: File | null) => {
          if (!f) {
            setUploadStatus("idle");
            return;
          }
          const v = validateCsv(f);
          if (v !== true) {
            setUploadStatus("error");

            field.onChange(f);
            return;
          }
          field.onChange(f);
          setUploadStatus("uploading");

          window.setTimeout(
            () => setUploadStatus("complete"),
            uploadingSimulateMs,
          );
        };

        const handleFileUpload = (uploadedFile: File) => {
          if (disabled) return;
          startUpload(uploadedFile);
        };

        const handleDownload = async () => {
          if (!file) return;

          if (onDownload) {
            await onDownload();
            return;
          }

          const url = window.URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = url;
          link.download = file.name || "file.csv";
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
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
          const files = e.dataTransfer.files;
          if (files.length > 0 && files[0]) {
            handleFileUpload(files[0]);
          }
        };

        const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files && files.length > 0 && files[0]) {
            handleFileUpload(files[0]);
          }
        };

        const handleDeleteFile = () => {
          if (disabled) return;

          field.onChange(null);
          setUploadStatus("idle");
          if (inputRef.current) inputRef.current.value = "";
        };

        return (
          <Stack sx={{ width: 1, alignItems: !file ? "center" : "start" }}>
            <Box sx={{ width: 1, maxWidth: 1040, p: 3 }}>
              {!file ? (
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
                      alt="CSV Upload"
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
                        sx={{ color: (theme) => theme.palette.text.secondary }}
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
                    accept=".csv"
                    type="file"
                    onChange={handleFileInputChange}
                    name={field.name}
                    disabled={disabled}
                  />
                </UploadArea>
              ) : (
                <Stack justifyContent="start" width="max-content">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      cursor: canDownload ? "pointer" : "default",
                      transition: "background-color 0.2s ease",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      "&:hover": canDownload
                        ? {
                            backgroundColor: (theme) =>
                              theme.palette.action.hover,
                          }
                        : undefined,
                    }}
                    onClick={() => {
                      if (!canDownload) return;
                      void handleDownload();
                    }}
                    role={canDownload ? "button" : undefined}
                    tabIndex={canDownload ? 0 : undefined}
                    onKeyDown={(event) => {
                      if (!canDownload) return;
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        void handleDownload();
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src="/assets/icons/ic-file.svg"
                        width={32}
                        height={32}
                      />
                      <Stack>
                        <Typography variant="body2">{file.name}</Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {formatFileSize(file.size)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {uploadStatus === "uploading"
                              ? "Uploading..."
                              : uploadStatus === "error"
                                ? "Error"
                                : "Complete"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {!disabled && (
                        <IconButton
                          onClick={handleDeleteFile}
                          size="small"
                          disabled={disabled}
                        >
                          <SvgColor
                            src="/assets/icons/ic-trash.svg"
                            color="#B71931"
                          />
                        </IconButton>
                      )}
                      {uploadStatus === "uploading" ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 24,
                            height: 24,
                          }}
                        >
                          <LinearProgress
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: "50%",
                              },
                            }}
                          />
                        </Box>
                      ) : (
                        <Box component="img" src="/assets/icons/ic-check.svg" />
                      )}
                    </Box>
                  </Box>
                </Stack>
              )}

              {fieldState.error?.message && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {fieldState.error.message}
                </Alert>
              )}

              {!file && !fieldState.error?.message && (
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
