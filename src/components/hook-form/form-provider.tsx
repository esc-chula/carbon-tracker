import type { FieldValues, UseFormReturn } from "react-hook-form";

import { FormProvider as RHFForm } from "react-hook-form";

// ----------------------------------------------------------------------

type FormProps<T extends FieldValues> = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<T>;
};

function Form<T extends FieldValues>(props: FormProps<T>) {
  const { children, onSubmit, methods } = props;
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  );
}

export type { FormProps };
export { Form };
