"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  Chip,
  Checkbox,
  type AutocompleteProps,
  MenuItem,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type TOption = { label: string; value: string | number };

type TRHFMultipleAutoCompleteProps<T extends TOption> = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  options: T[];
} & Omit<
  AutocompleteProps<T, true, false, false>,
  "renderInput" | "multiple" | "options"
>;

export default function RHFMultipleAutoComplete<T extends TOption>({
  name,
  label,
  placeholder,
  helperText,
  required,
  options,
  ...other
}: TRHFMultipleAutoCompleteProps<T>) {
  const { control } = useFormContext();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // field.value is an array of primitive values (value: string | number)
        const selectedOptions = Array.isArray(field.value)
          ? options.filter((o) => field.value.includes(o.value))
          : [];

        return (
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedOptions}
            onChange={(_, newValues) =>
              field.onChange(newValues.map((o) => o.value))
            }
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <MenuItem
                  key={key}
                  sx={{ padding: "0 !important" }}
                  {...optionProps}
                >
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    sx={{ mr: 1 }}
                    checked={selected}
                  />
                  {option.label}
                </MenuItem>
              );
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={String(option.value)}
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
