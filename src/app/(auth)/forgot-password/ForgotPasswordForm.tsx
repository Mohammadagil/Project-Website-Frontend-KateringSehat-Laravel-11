"use client";

import { useFormState } from "react-dom";
import { forgotPasswordAction, TFormState } from "@/components/Auth/actions";
import { Field, Input } from "@/components/ui/Field";
import SubmitButton from "@/components/ui/SubmitButton";
import FormAlert from "@/components/ui/FormAlert";

const initialState: TFormState = {};

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPasswordAction, initialState);

  if (state.success) {
    return (
      <FormAlert variant="success">
        Kalau email itu terdaftar, link reset sudah kami kirim. Cek kotak masuk (dan folder spam), lalu ikuti link untuk membuat password baru.
      </FormAlert>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      {state.message && <FormAlert>{state.message}</FormAlert>}

      <Field id="email" label="Email" error={state.errors?.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" invalid={!!state.errors?.email} />
      </Field>

      <SubmitButton size="lg" block pendingText="Mengirim...">
        Kirim Link Reset
      </SubmitButton>
    </form>
  );
}