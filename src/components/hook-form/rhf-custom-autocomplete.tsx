import { Controller, useFormContext } from "react-hook-form";

import { TextField, Autocomplete, type AutocompleteProps } from "@mui/material";

// ----------------------------------------------------------------------

type TOption = {
  label: string;
  value: string | number;
};

type RHFCustomAutocomplete<T> = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
} & Omit<AutocompleteProps<T, false, false, false>, "renderInput">;

function RHFCustomAutocomplete<T extends TOption>({
  name,
  label,
  placeholder,
  helperText,
  required,
  options,
  ...other
}: RHFCustomAutocomplete<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Find the active option based on the current field value
        const selectedOption =
          options.find((option) => option.value === field.value) ?? null;

        return (
          <Autocomplete
            options={options}
            value={selectedOption}
            onChange={(event, newValue) => {
              // Update the form field with just the value
              field.onChange(newValue ? newValue.value : "");
            }}
            isOptionEqualToValue={(option, value) => {
              // Handle comparison between options
              if (!option || !value) return false;
              return option.value === value.value;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={helperText}
                required={required}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}

export default RHFCustomAutocomplete;
