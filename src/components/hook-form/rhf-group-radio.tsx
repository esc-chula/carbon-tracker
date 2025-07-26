import type { FormControlLabelProps } from "@mui/material/FormControlLabel";
import { Controller, useFormContext } from "react-hook-form";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";

type TOption = {
  value: string;
  label: string;
};

type RHFGroupRadioProps = {
  name: string;
  options: Array<TOption>;
  helperText?: React.ReactNode;
  row?: boolean;
  labelProps?: Omit<FormControlLabelProps, "control" | "label" | "value">;
};

function RHFGroupRadio({
  name,
  options,
  helperText,
  row = true,
  labelProps,
}: RHFGroupRadioProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <RadioGroup
            row={row}
            value={field.value ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.value);
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                {...labelProps}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default RHFGroupRadio;
