import { useBoolean } from "@/hooks/use-boolean";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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
};

function AddThaiYearToDate(date: string | Dayjs | null): Dayjs | null {
  if (!date) {
    return null;
  }

  const addYear = dayjs(date).add(543, "year");

  return addYear;
}

function RHFDateTimePicker({
  name,
  label,
  required,
  helperText,
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

        return (
          <DateTimePicker
            sx={{
              "& .MuiPickersInputBase-root": {
                borderRadius: 2,

                "& .MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: "#E5E8EB",
                },

                "&.Mui-focused:not(.Mui-error)": {
                  "& .MuiPickersOutlinedInput-notchedOutline": {
                    borderColor: (theme) => theme.palette.text.primary,
                  },
                },
                "&:hover:not(.Mui-focused):not(.Mui-error)": {
                  "& .MuiPickersOutlinedInput-notchedOutline": {
                    borderColor: (theme) => theme.palette.text.secondary,
                  },
                },
              },
            }}
            value={value}
            onChange={(date) => {
              field.onChange(
                dayjs(
                  date as string | number | Dayjs | Date | null | undefined,
                ).format(),
              );
            }}
            ampm={false}
            format="DD/MM/YYYY HH:mm [น.]"
            slotProps={{
              textField: {
                value: transFormDate,
                label: label,
                fullWidth: true,
                error: !!error,
                helperText: error ? error?.message : helperText,
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
              },
            }}
            onOpen={isOpenCalendar.onTrue}
            onClose={isOpenCalendar.onFalse}
            open={isOpenCalendar.value}
          />
        );
      }}
    />
  );
}

export default RHFDateTimePicker;
