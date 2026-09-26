"use client";

import { useFormState } from "react-dom";
import { resetPasswordAction, TFormState } from "@/components/Auth/actions";
import { Field } from "@/components/ui/Field";
import PasswordInput from "@/components/ui/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import FormAlert from "@/components/ui/FormAlert";

const initialState: TFormState = {};

export default function ResetPasswordForm({ token, email }: { token: string; email: string }) {
  const [state, formAction] = useFormState(resetPasswordAction, initialState);
  const e = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />

      {state.message && <FormAlert>{state.message}</FormAlert>}

      <Field id="password" label="Password baru" error={e.password}>
        <PasswordInput id="password" name="password" autoComplete="new-password" placeholder="Minimal 8 karakter" invalid={!!e.password} />
      </Field>
      <Field id="password_confirmation" label="Ulangi password baru" error={e.password_confirmation}>
        <PasswordInput id="password_confirmation" name="password_confirmation" autoComplete="new-password" invalid={!!e.password_confirmation} />
      </Field>

      <SubmitButton size="lg" block pendingText="Menyimpan...">
        Simpan Password Baru
      </SubmitButton>
    </form>
  );
}