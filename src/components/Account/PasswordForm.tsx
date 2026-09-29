"use client";

import { useFormState } from "react-dom";
import { TAccountState, updatePasswordAction } from "@/components/Account/actions";
import { Field } from "@/components/ui/Field";
import PasswordInput from "@/components/ui/PasswordInput";
import FormAlert from "@/components/ui/FormAlert";
import SubmitButton from "@/components/ui/SubmitButton";

const initialState: TAccountState = {};

export default function PasswordForm() {
  const [state, formAction] = useFormState(updatePasswordAction, initialState);
  const e = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.message && <FormAlert variant={state.success ? "success" : "error"}>{state.message}</FormAlert>}

      {/* key berubah setelah berhasil → isian password dikosongkan (tidak tertinggal di layar). */}
      <div key={state.savedAt ?? 0} className="grid gap-4 md:grid-cols-3">
        <Field id="current_password" label="Password saat ini" error={e.current_password}>
          <PasswordInput id="current_password" name="current_password" autoComplete="current-password" invalid={!!e.current_password} />
        </Field>
        <Field id="new_password" label="Password baru" error={e.password}>
          <PasswordInput id="new_password" name="password" autoComplete="new-password" placeholder="Minimal 8 karakter" invalid={!!e.password} />
        </Field>
        <Field id="new_password_confirmation" label="Ulangi password baru" error={e.password_confirmation}>
          <PasswordInput id="new_password_confirmation" name="password_confirmation" autoComplete="new-password" invalid={!!e.password_confirmation} />
        </Field>
      </div>

      <SubmitButton variant="secondary" pendingText="Mengganti..." className="w-fit">
        Ganti Password
      </SubmitButton>
    </form>
  );
}
