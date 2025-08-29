import { Box, Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(4),
  borderRadius: 16,
}));
const StyledBox = styled(Box)(() => ({
  height: 16,
  backgroundColor: "#97262C",
}));

export { StyledPaper, StyledBox };
