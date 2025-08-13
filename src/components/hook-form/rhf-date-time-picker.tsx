import { useBoolean } from "@/hooks/use-boolean";
import type { SxProps, Theme } from "@mui/material/styles";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Controller, useFormContext } from "react-hook-form";
import { ArrowDownIcon } from "../icon/arrow-down-icon";

dayjs.extend(buddhistEra);
dayjs.extend(localizedFormat);
dayjs.locale("th");

type RHFDateTimePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: React.ReactNode;
  mode?: "datetime" | "date";
  dateOnlyToStartOfDay?: boolean;
  disabled?: boolean;
};

function AddThaiYearToDate(date: string | Dayjs | null): Dayjs | null {
  if (!date) return null;
  return dayjs(date).add(543, "year");
}

const commonSx: SxProps<Theme> = {
  "& .MuiPickersInputBase-root": {
    borderRadius: 2,
    "& .MuiPickersOutlinedInput-notchedOutline": { borderColor: "#E5E8EB" },
    "&.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline": {
      borderColor: (theme) => theme.palette.text.primary,
    },
    "&:hover:not(.Mui-focused):not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline":
      { borderColor: (theme) => theme.palette.text.secondary },
  },
};

export default function RHFDateTimePicker({
  name,
  label,
  required,
  helperText,
  mode = "datetime",
  dateOnlyToStartOfDay = true,
  disabled = false,
}: RHFDateTimePickerProps) {
  const isOpenCalendar = useBoolean();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value
          ? dayjs(field.value as string | number | Date)
          : null;
        const transFormDate = field.value
          ? AddThaiYearToDate(field.value as string | Dayjs | null)
          : null;

        if (mode === "date") {
          return (
            <DatePicker
              sx={commonSx}
              value={value}
              format="DD/MM/YYYY"
              views={["year", "month", "day"]}
              onChange={(date: Dayjs | null) => {
                if (!date) return field.onChange(null);
                const d = dateOnlyToStartOfDay ? date.startOf("day") : date;
                field.onChange(d.format());
              }}
              slotProps={{
                textField: {
                  value: transFormDate,
                  label,
                  fullWidth: true,
                  error: !!error,
                  helperText: error ? error.message : helperText,
                  required,
                  onClick: isOpenCalendar.onTrue,
                  InputProps: {
                    endAdornment: (
                      <ArrowDownIcon
                        sx={{
                          width: 18,
                          height: 18,
                          color: "text.secondary",
                          transform: isOpenCalendar.value
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    ),
                  },
                  disabled: disabled,
                },
              }}
              onOpen={isOpenCalendar.onTrue}
              onClose={isOpenCalendar.onFalse}
              open={isOpenCalendar.value}
              disabled={disabled}
            />
          );
        }

        return (
          <DateTimePicker
            sx={commonSx}
            value={value}
            ampm={false}
            format="DD/MM/YYYY HH:mm [น.]"
            onChange={(date: Dayjs | null) => {
              field.onChange(date ? date.format() : null);
            }}
            slotProps={{
              textField: {
                value: transFormDate,
                label,
                fullWidth: true,
                error: !!error,
                helperText: error ? error.message : helperText,
                required,
                onClick: isOpenCalendar.onTrue,
                InputProps: {
                  endAdornment: (
                    <ArrowDownIcon
                      sx={{
                        width: 18,
                        height: 18,
                        color: "text.secondary",
                        transform: isOpenCalendar.value
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  ),
                },
                disabled: disabled,
              },
            }}
            onOpen={isOpenCalendar.onTrue}
            onClose={isOpenCalendar.onFalse}
            open={isOpenCalendar.value}
            disabled={disabled}
          />
        );
      }}
    />
  );
}
