import type { FormControlLabelProps } from "@mui/material/FormControlLabel";
import { Controller, useFormContext } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

type RHFRadioProps = {
  name: string;
  value: string;
  label: string;
  helperText?: React.ReactNode;
  labelProps?: Omit<FormControlLabelProps, "control" | "label" | "value">;
};

function RHFRadio({ name, value, label, labelProps }: RHFRadioProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormControlLabel
            value={value}
            control={
              <Radio
                checked={field.value === value}
                onChange={() => field.onChange(value)}
              />
            }
            label={label}
            {...labelProps}
          />
        </FormControl>
      )}
    />
  );
}

export default RHFRadio;
