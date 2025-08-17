import { Field } from "@/components/hook-form/field";
import { Form } from "@/components/hook-form/form-provider";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

// ---------------------------------------------------------------------------------

type TLoginFormProps = {
  onSubmit: () => void;
};

function LoginForm({ onSubmit }: TLoginFormProps) {
  // --------------------------- Form ---------------------------

  const methods = useForm({});

  const { handleSubmit } = methods;

  // --------------------------- Render ---------------------------

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Field.Text name="email" label="อีเมล" required />

        <Field.Password name="password" label="รหัสผ่าน" required />

        <Button variant="contained" sx={{ height: 40 }}>
          เข้าสู่ระบบ
        </Button>
      </Stack>
    </Form>
  );
}

export default LoginForm;
