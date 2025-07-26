import type { FocusEvent, ChangeEvent } from "react";
import type { TextFieldProps } from "@mui/material/TextField";

import { Controller, useController, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  regex?: RegExp;
};

function RHFTextField({ name, helperText, type, regex, ...other }: Props) {
  const { control } = useFormContext();
  const controller = useController({ name });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (regex && !regex.test(value)) {
      return;
    }

    if (type === "number") {
      controller.field.onChange(Number(value));
    } else {
      controller.field.onChange(value);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart().trimEnd();
    if (type === "number") {
      controller.field.onChange(Number(value));
    } else {
      controller.field.onChange(value);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: "off",
          }}
          {...other}
        />
      )}
    />
  );
}

export default RHFTextField;
