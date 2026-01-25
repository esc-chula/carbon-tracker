import { ArrowDownIcon } from "@/components/icon/arrow-down-icon";
import {
  autocompleteClasses,
  Box,
  inputBaseClasses,
  menuItemClasses,
  outlinedInputClasses,
  svgIconClasses,
} from "@mui/material";
import { alpha, createTheme } from "@mui/material/styles";
import { color } from "../colors";
import { typography } from "./typography";

const theme = createTheme({
  typography,
  palette: {
    primary: {
      main: color.PRIMARY_MAIN,
      50: color.PRIMARY_50,
      100: color.PRIMARY_100,
      200: color.PRIMARY_200,
      300: color.PRIMARY_300,
      400: color.PRIMARY_400,
      500: color.PRIMARY_500,
      600: color.PRIMARY_600,
      700: color.PRIMARY_700,
      800: color.PRIMARY_800,
      900: color.PRIMARY_900,
      contrastText: color.PRIMARY_CONTRAST,
    },
    secondary: {
      main: "#919EAB",

      contrastText: color.TEXT_SECONDARY,
    },
    action: {
      disabled: color.DISABLED,
    },
    grayOpa: {
      8: color.GRAY_OPA_8,
      12: color.GRAY_OPA_12,
      16: color.GRAY_OPA_16,
      24: color.GRAY_OPA_24,
      32: color.GRAY_OPA_32,
      48: color.GRAY_OPA_48,
      80: color.GRAY_OPA_80,
      90: color.GRAY_OPA_90,
    },
    blueOpa: {
      8: color.BLUE_OPA_8,
      12: color.BLUE_OPA_12,
      16: color.BLUE_OPA_16,
      24: color.BLUE_OPA_24,
      32: color.BLUE_OPA_32,
      48: color.BLUE_OPA_48,
    },
    greenOpa: {
      8: color.GREEN_OPA_8,
      12: color.GREEN_OPA_12,
      16: color.GREEN_OPA_16,
      24: color.GREEN_OPA_24,
      32: color.GREEN_OPA_32,
      48: color.GREEN_OPA_48,
    },
    redOpa: {
      8: color.RED_OPA_8,
      12: color.RED_OPA_12,
      16: color.RED_OPA_16,
      24: color.RED_OPA_24,
      32: color.RED_OPA_32,
      48: color.RED_OPA_48,
    },
    yellowOpa: {
      8: color.YELLOW_OPA_8,
      12: color.YELLOW_OPA_12,
      16: color.YELLOW_OPA_16,
      24: color.YELLOW_OPA_24,
      32: color.YELLOW_OPA_32,
      48: color.YELLOW_OPA_48,
    },
    info: {
      50: color.INFO_50,
      100: color.INFO_100,
      200: color.INFO_200,
      300: color.INFO_300,
      400: color.INFO_400,
      500: color.INFO_500,
      600: color.INFO_600,
      700: color.INFO_700,
      800: color.INFO_800,
      900: color.INFO_900,
      main: color.INFO_500,
      contrastText: color.TEXT_WHITE,
    },
    success: {
      50: color.SUCCESS_50,
      100: color.SUCCESS_100,
      200: color.SUCCESS_200,
      300: color.SUCCESS_300,
      400: color.SUCCESS_400,
      500: color.SUCCESS_500,
      600: color.SUCCESS_600,
      700: color.SUCCESS_700,
      800: color.SUCCESS_800,
      900: color.SUCCESS_900,
      main: color.SUCCESS_500,
      contrastText: color.TEXT_WHITE,
    },
    warning: {
      50: color.WARNING_50,
      100: color.WARNING_100,
      200: color.WARNING_200,
      300: color.WARNING_300,
      400: color.WARNING_400,
      500: color.WARNING_500,
      600: color.WARNING_600,
      700: color.WARNING_700,
      800: color.WARNING_800,
      900: color.WARNING_900,
      main: color.WARNING_500,
      contrastText: color.TEXT_WHITE,
    },
    error: {
      50: color.ERROR_50,
      100: color.ERROR_100,
      200: color.ERROR_200,
      300: color.ERROR_300,
      400: color.ERROR_400,
      500: color.ERROR_500,
      600: color.ERROR_600,
      700: color.ERROR_700,
      800: color.ERROR_800,
      900: color.ERROR_900,
      main: color.ERROR_700,
      contrastText: color.TEXT_WHITE,
    },

    background: {
      lightBlue: "#e1e7f4",
      neutral: "#f4f6f8",
      lightGrey: "#f9fafb",
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: color.TEXT_PRIMARY,
      secondary: color.TEXT_SECONDARY,
      disabled: color.TEXT_DISABLE,
    },
    divider: color.DIVIDER_LIGHT_BLUE_32,
    lightGray: {
      50: color.LIGHT_GRAY_50,
      100: color.LIGHT_GRAY_100,
      200: color.LIGHT_GRAY_200,
      300: color.LIGHT_GRAY_300,
      400: color.LIGHT_GRAY_400,
      500: color.LIGHT_GRAY_500,
      600: color.LIGHT_GRAY_600,
      700: color.LIGHT_GRAY_700,
      800: color.LIGHT_GRAY_800,
      900: color.LIGHT_GRAY_900,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F6F8",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#1C252E",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: () => ({
          [`&.${inputBaseClasses.disabled}`]: {
            "& svg": { color: "#919EABCC" },
          },
          [`& .${inputBaseClasses.input}:focus`]: {
            borderRadius: "inherit",
          },
          "&.Mui-disabled": {
            backgroundColor: "#919EAB33",
          },
        }),
        input: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(15),
          [theme.breakpoints.down("sm")]: {
            fontSize: theme.typography.pxToRem(16),
          },
          "&::placeholder": {
            opacity: 1,
            color: "#919EABCC",
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          borderRadius: 8,
          [`&.${outlinedInputClasses.focused}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#1C252E",
            },
          },
          [`&.${outlinedInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#ff5530",
            },
          },
          [`&.${outlinedInputClasses.disabled}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#919EAB33",
            },
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: "#E5E8EB",
          transition: theme.transitions.create(["border-color"], {
            duration: theme.transitions.duration.shortest,
          }),
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`& span.${autocompleteClasses.tag}`]: {
            ...theme.typography.subtitle2,
            height: 24,
            minWidth: 24,
            lineHeight: "24px",
            textAlign: "center",
            padding: theme.spacing(0, 0.75),
            color: "#212B36",
            borderRadius: theme.shape.borderRadius,
          },
        }),
        paper: () => ({
          padding: 5,
          elevation: 8,
          borderRadius: 8,
          boxShadow: `0px 5px 5px -3px rgba(0, 0, 0, 0.2), 
                0px 8px 10px 1px rgba(0, 0, 0, 0.14)`,
        }),
        listbox: ({ theme }) => ({
          padding: 0,

          [`& .${autocompleteClasses.option}`]: {
            padding: theme.spacing(1),
            borderRadius: 8,
            "&:not(:last-of-type)": { marginBottom: 4 },
            [`&.${menuItemClasses.selected}`]: {
              fontWeight: theme.typography.fontWeightSemiBold,
              backgroundColor: alpha(theme.palette.grey[500], 0.16),
              "&:hover": {
                backgroundColor: alpha(theme.palette.grey[500], 0.08),
              },
            },
            [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
              backgroundColor: alpha(theme.palette.grey[500], 0.16),
              "&:hover": {
                backgroundColor: alpha(theme.palette.grey[500], 0.08),
              },
            },
          },
        }),
        endAdornment: {
          [`& .${svgIconClasses.root}`]: { width: 18, height: 18 },
        },
      },
      defaultProps: {
        popupIcon: <ArrowDownIcon />,
        renderOption: (props, option, _state, ownerState) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              data-testid={`option-${option.value}`}
              {...optionProps}
            >
              {ownerState.getOptionLabel(option)}
            </Box>
          );
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-disabled .MuiFormLabel-asterisk": {
            color: color.DISABLED, // or theme.palette.text.disabled
          },
        },
        asterisk: {
          color: "red",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: color.PRIMARY_MAIN,
          "&:hover": {
            backgroundColor: color.PRIMARY_700,
          },
          "&.Mui-disabled": {
            color: color.TEXT_DISABLE,
            backgroundColor: color.GRAY_OPA_32,
          },
        },
        outlinedPrimary: {
          borderColor: color.PRIMARY_MAIN,
          color: color.PRIMARY_MAIN,
          "&:hover": {
            backgroundColor: color.PRIMARY_50,
            borderColor: color.PRIMARY_MAIN,
          },
          "&.Mui-disabled": {
            borderColor: color.TEXT_DISABLE,
            color: color.TEXT_DISABLE,
          },
        },
        outlinedError: {
          borderColor: "#B71931",
          color: "#B71931",
          "&:hover": {
            backgroundColor: alpha("#B71931", 0.08),
            borderColor: "#B71931",
          },
        },
      },
    },
  },
});

export default theme;
