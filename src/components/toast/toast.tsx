import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";
import { toast } from "sonner";

export const showSuccess = (title: string) =>
  toast.custom(
    () => (
      <Paper
        elevation={0}
        sx={{
          width: 250,
          display: "flex",
          alignItems: "center",
          bgcolor: "#EAF9E7",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          px: 2,
          py: 1.4,
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <CheckCircleOutline sx={{ color: "#1B806A" }} fontSize="small" />
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ color: "#0A5554" }}
          >
            {title}
          </Typography>
        </Stack>
      </Paper>
    ),
    { duration: 2500 },
  );

export const showError = (title: string) =>
  toast.custom(
    () => (
      <Paper
        elevation={0}
        sx={{
          width: 260,
          display: "flex",
          alignItems: "center",
          bgcolor: "#FDECEA",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          px: 2,
          py: 1.4,
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <ErrorOutline sx={{ color: "#D32F2F" }} fontSize="small" />
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ color: "#7F1D1D" }}
          >
            {title}
          </Typography>
        </Stack>
      </Paper>
    ),
    { duration: 2500 },
  );
