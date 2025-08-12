import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  createFilterOptions,
  type AutocompleteProps,
} from "@mui/material";

type BaseOption = { label: string; value: string | number };
type CreatableOption = BaseOption & { inputValue?: string };

type RHFCustomAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  creatable?: boolean;
  options: BaseOption[];
} & Omit<
  AutocompleteProps<CreatableOption, false, false, boolean>,
  "renderInput" | "options" | "onChange" | "value"
>;

const filter = createFilterOptions<CreatableOption>();

export default function RHFCustomAutocomplete({
  name,
  label,
  placeholder,
  helperText,
  required,
  creatable = false,
  options,
  ...other
}: RHFCustomAutocompleteProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const matched = options.find((o) => o.value === field.value) ?? null;
        const autoValue: CreatableOption | string | null =
          creatable && typeof field.value === "string" && !matched
            ? field.value
            : matched;

        return (
          <Autocomplete<CreatableOption, false, false, boolean>
            {...other}
            options={options as CreatableOption[]}
            value={autoValue}
            freeSolo={creatable}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                field.onChange(newValue);
              } else if (newValue?.inputValue) {
                field.onChange(newValue.inputValue);
              } else {
                field.onChange(newValue ? newValue.value : "");
              }
            }}
            filterOptions={(opts, params) => {
              const filtered = filter(opts, params);
              const { inputValue } = params;
              const exists = opts.some(
                (o) => o.label === inputValue || String(o.value) === inputValue,
              );
              if (creatable && inputValue !== "" && !exists) {
                filtered.push({
                  label: `เพิ่ม "${inputValue}"`,
                  value: inputValue,
                  inputValue,
                });
              }
              return filtered;
            }}
            getOptionLabel={(option) => {
              if (typeof option === "string") return option;
              if (option.inputValue) return option.inputValue;
              return option.label;
            }}
            isOptionEqualToValue={(option, value) => {
              if (typeof value === "string") return option.value === value;
              return option.value === value.value;
            }}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                  {option.label}
                </li>
              );
            }}
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
          />
        );
      }}
    />
  );
}
