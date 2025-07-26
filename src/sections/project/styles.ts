import { Button, Stack, styled } from "@mui/material";

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.grayOpa[24]}`,
  borderRadius: 12,
}));

const StyledAddButton = styled(Button)(({ theme }) => ({
  borderColor: "#A7B1BC",
  color: "#A7B1BC",
  borderStyle: "dashed",
  textTransform: "none",
  fontWeight: 400,
  fontSize: 14,
  height: 40,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  borderRadius: 8,
  "&:hover": {
    borderColor: "#A7B1BC",
    backgroundColor: "#F4F6F8",
  },
  "& .MuiButton-startIcon": {
    color: "#A7B1BC",
    marginRight: theme.spacing(1),
    "& span": {
      width: 14,
      height: 14,
    },
  },
}));

export { StyledStack, StyledAddButton };
