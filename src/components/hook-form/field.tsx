import RHFCustomAutocomplete from "./rhf-custom-autocomplete";
import RHFDateTimePicker from "./rhf-date-time-picker";
import RHFPhone from "./rhf-phone";
import RHFGroupRadio from "./rhf-group-radio";
import RHFTextField from "./rhf-textfield";
import RHFRadio from "./rhf-radio";
import RHFMultipleAutocomplete from "./rhf-multiple-auto-complete";

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Radio: RHFRadio,
  GroupRadio: RHFGroupRadio,
  CustomAutoComplete: RHFCustomAutocomplete,
  MultipleAutoComplete: RHFMultipleAutocomplete,
  Phone: RHFPhone,
  DateTimePicker: RHFDateTimePicker,
};
