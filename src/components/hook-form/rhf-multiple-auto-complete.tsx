"use client";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Checkbox,
  Chip,
  MenuItem,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TOption = { label: string; value: string | number };

type TRHFMultipleAutoCompleteProps<T extends TOption> = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  options: T[];
  selectedValues?: Array<T | T["value"]>;
} & Omit<
  AutocompleteProps<T, true, false, false>,
  "renderInput" | "multiple" | "options"
>;

function normalizeExternalSelection<T extends TOption>(
  selection: Array<T | T["value"]> | undefined,
) {
  if (!Array.isArray(selection)) return undefined;

  const normalized = selection
    .map((option) =>
      typeof option === "object" && option !== null && "value" in option
        ? option.value
        : option,
    )
    .filter((value): value is string | number => value !== undefined && value !== null);

  return normalized;
}

const arraysEqual = (a: unknown, b: Array<string | number> | undefined) => {
  if (!Array.isArray(b)) return false;
  if (!Array.isArray(a)) return false;
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
};

export default function RHFMultipleAutoComplete<T extends TOption>({
  name,
  label,
  placeholder,
  helperText,
  required,
  options,
  selectedValues,
  ...other
}: TRHFMultipleAutoCompleteProps<T>) {
  const { control, setValue, getValues } = useFormContext();
  const {
    value: externalValueProp,
    defaultValue: defaultValueProp,
    ...restProps
  } = other as {
    value?: Array<T | T["value"]>;
    defaultValue?: Array<T | T["value"]>;
  };

  const normalizedExternalValues = useMemo(
    () =>
      normalizeExternalSelection(
        selectedValues ?? externalValueProp ?? defaultValueProp,
      ),
    [defaultValueProp, externalValueProp, selectedValues],
  );

  useEffect(() => {
    if (!normalizedExternalValues) return;

    const currentValue = getValues(name);
    if (arraysEqual(currentValue, normalizedExternalValues)) return;

    setValue(name, normalizedExternalValues, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [getValues, name, normalizedExternalValues, setValue]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedOptions = Array.isArray(field.value)
          ? options.filter((option) => field.value.includes(option.value))
          : [];

        return (
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedOptions}
            onChange={(_, newValues) =>
              field.onChange(newValues.map((option) => option.value))
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
            {...restProps}
          />
        );
      }}
    />
  );
}
