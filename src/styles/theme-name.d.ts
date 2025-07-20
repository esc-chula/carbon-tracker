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
  }
  interface PaletteOptions {
    grayOpa?: Record<number, string>;
    blueOpa?: Record<number, string>;
    greenOpa?: Record<number, string>;
    redOpa?: Record<number, string>;
    yellowOpa?: Record<number, string>;
  }
}
