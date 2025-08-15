import RHFCustomAutocomplete from "./rhf-custom-autocomplete";
import RHFDateTimePicker from "./rhf-date-time-picker";
import RHFPhone from "./rhf-phone";
import RHFGroupRadio from "./rhf-group-radio";
import RHFTextField from "./rhf-textfield";
import RHFRadio from "./rhf-radio";
import RHFMultipleAutoComplete from "./rhf-multiple-auto-complete";
import RHFPassword from "./rhf-password";

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Radio: RHFRadio,
  GroupRadio: RHFGroupRadio,
  CustomAutoComplete: RHFCustomAutocomplete,
  MultipleAutoComplete: RHFMultipleAutoComplete,
  Phone: RHFPhone,
  DateTimePicker: RHFDateTimePicker,
  Password: RHFPassword,
};
