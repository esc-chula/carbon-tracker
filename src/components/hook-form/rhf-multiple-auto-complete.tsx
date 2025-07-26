import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  type AutocompleteProps,
  Chip,
} from "@mui/material";

// ----------------------------------------------------------------------

type TOption = {
  label: string;
  value: string | number;
};

type RHFMultipleAutocomplete<T> = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
} & Omit<AutocompleteProps<T, true, false, false>, "renderInput" | "multiple">;

function RHFMultipleAutocomplete<T extends TOption>({
  name,
  label,
  placeholder,
  helperText,
  required,
  options,
  ...other
}: RHFMultipleAutocomplete<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Find the selected options based on the current field values
        const selectedOptions = Array.isArray(field.value)
          ? options.filter((option) => field.value.includes(option.value))
          : [];

        return (
          <Autocomplete
            multiple
            options={options}
            value={selectedOptions}
            onChange={(event, newValues) => {
              // Update the form field with an array of values
              const values = newValues.map((option) => option.value);
              field.onChange(values);
            }}
            isOptionEqualToValue={(option, value) => {
              // Handle comparison between options
              if (!option || !value) return false;
              return option.value === value.value;
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.value}
                  label={option.label}
                  size="small"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error.message : helperText}
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

export default RHFMultipleAutocomplete;
