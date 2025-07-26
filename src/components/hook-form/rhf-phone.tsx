import type { TextFieldProps } from "@mui/material/TextField";

import { Controller, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";

// ---------------------------------------------------------------------------------

const REGEX_NUMBER_ONLY = /^\d*$/;

// ----------------------------------------------------------------------

type RHFPhoneProps = TextFieldProps & {
  name: string;
};

function RHFPhone({ name, helperText, type, ...other }: RHFPhoneProps) {
  const { inputProps, ...rest } = other;

  const mergedInputProps = {
    ...inputProps,
    autoComplete: "off",
    maxLength: 10,
  };

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type="text"
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            const getValue = event.target.value;

            if (!REGEX_NUMBER_ONLY.test(getValue)) {
              return;
            }

            field.onChange(event.target.value);
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={mergedInputProps}
          {...rest}
        />
      )}
    />
  );
}

export default RHFPhone;
