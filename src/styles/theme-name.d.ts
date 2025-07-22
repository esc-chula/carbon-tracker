import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    lightBlue?: string;
    neutral?: string;
    lightGrey?: string;
  }
  interface Palette {
    grayOpa: Record<number, string>;
    blueOpa: Record<number, string>;
    greenOpa: Record<number, string>;
    redOpa: Record<number, string>;
    yellowOpa: Record<number, string>;
    lightGray: Record<number, string>;
  }
  interface PaletteOptions {
    grayOpa?: Record<number, string>;
    blueOpa?: Record<number, string>;
    greenOpa?: Record<number, string>;
    redOpa?: Record<number, string>;
    yellowOpa?: Record<number, string>;
    lightGray?: Record<number, string>;
  }
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
  interface PaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
}
