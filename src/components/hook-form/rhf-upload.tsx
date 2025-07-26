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

export default function CSVUploadComponent(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFile: File): void => {
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
      setUploadStatus("uploading");

      setTimeout(() => {
        setUploadStatus("complete");
      }, 1500);
    } else {
      setUploadStatus("error");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDeleteFile = (): void => {
    setFile(null);
    setUploadStatus("idle");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
                sx={{ width: 140, height: 120 }}
              />

              <Stack spacing={1} alignItems="start" justifyContent="center">
                <Typography variant="h4">เลือกไฟล์ที่คุณต้องการ</Typography>
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
                    sx={{ color: (theme) => theme.palette.text.secondary }}
                  >
                    หรือ
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: 100 }}
                    onClick={() => inputRef.current?.click()}
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
            />
          </UploadArea>
        ) : (
          <Stack justifyContent="start">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src="/assets/icons/ic-file.svg"
                  width={32}
                  height={32}
                ></Box>
                <Stack>
                  <Typography variant="body2">{file.name}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatFileSize(file.size)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {uploadStatus === "uploading"
                        ? "Uploading..."
                        : "Complete"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={handleDeleteFile} size="small">
                  <SvgColor src="/assets/icons/ic-trash.svg" color="#B71931" />
                </IconButton>
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

        {uploadStatus === "error" && (
          <Alert severity="error" sx={{ mt: 2 }}>
            กรุณาอัปโหลดไฟล์ .csv เท่านั้น
          </Alert>
        )}

        {!file && (
          <Typography variant="body2" color="#919EAB" sx={{ mt: 1 }}>
            กรุณาอัปโหลดไฟล์ .csv จากข้อมูลลงทะเบียน
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
