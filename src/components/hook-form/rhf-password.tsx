import type { TextFieldProps } from "@mui/material/TextField";
import type { ChangeEvent, FocusEvent } from "react";

import { Controller, useController, useFormContext } from "react-hook-form";

import { IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useBoolean } from "@/hooks/use-boolean";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

// ----------------------------------------------------------------------

type TRHFPasswordProps = TextFieldProps & {
  name: string;
  regex?: RegExp;
};

function RHFPassword({
  name,
  helperText,
  type,
  regex,
  ...other
}: TRHFPasswordProps) {
  const { control } = useFormContext();
  const controller = useController({ name });

  const isShowPassword = useBoolean();

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
          type={isShowPassword.value ? "text" : "password"}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            maxLength: 20,
            "data-testid": `${name}-input`,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: 1 }}>
                <IconButton
                  onClick={isShowPassword.onToggle}
                  edge="end"
                  data-testid={`toggle-${name}-button`}
                >
                  {isShowPassword.value ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...other}
        />
      )}
    />
  );
}

export default RHFPassword;
