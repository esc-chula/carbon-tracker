"use client";

import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";

// ---------------------------------------------------------------------------------

type TProjectFormStepperProps = {
  step: number;
  isEdit?: boolean;
};

function ProjectFormStepper({
  step,
  isEdit = false,
}: TProjectFormStepperProps) {
  const theme = useTheme();

  // --------------------------- Value ---------------------------

  const whiteColor = theme.palette.common.white;
  const greenColor = theme.palette.primary.main;
  const blackColor = theme.palette.text.primary;
  const greyColor = theme.palette.text.secondary;

  // --------------------------- Condition ---------------------------

  const projectAddingColor = step === 1 ? greenColor : blackColor;
  const projectDetailColor = step === 1 ? greyColor : greenColor;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ py: 5, alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          width: 24,
          height: 24,
          borderRadius: 100,
          pr: 1,
          pl: 1,
          backgroundColor: projectAddingColor,
          alignItems: "center",
          transition: "background-color 0.3s",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: 14, color: whiteColor, mt: 0.25 }}
        >
          1
        </Typography>
      </Box>
      <Typography
        variant="button"
        sx={{ color: projectAddingColor, transition: "color 0.3s" }}
      >
        {!isEdit ? "เพิ่มโครงการใหม่" : "แก้ไขข้อมูลโครงการ"}
      </Typography>
      <Divider sx={{ width: 180 }} />
      <Box
        sx={{
          display: "flex",
          width: 24,
          height: 24,
          borderRadius: 100,
          pr: 1,
          pl: 1,
          backgroundColor: projectDetailColor,
          alignItems: "center",
          transition: "background-color 0.3s",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: 14, color: whiteColor, mt: 0.25 }}
        >
          2
        </Typography>
      </Box>
      <Typography
        variant="button"
        sx={{ color: projectDetailColor, transition: "color 0.3s" }}
      >
        {!isEdit ? "แก้ไขรายละเอียดโครงการ" : "กรอกรายละเอียดโครงการ"}
      </Typography>
    </Stack>
  );
}

export default ProjectFormStepper;
