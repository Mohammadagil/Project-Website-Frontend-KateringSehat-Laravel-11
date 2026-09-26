"use client";

import { useFormState } from "react-dom";
import { registerAction, TFormState } from "@/components/Auth/actions";
import { Field, Input } from "@/components/ui/Field";
import PasswordInput from "@/components/ui/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import FormAlert from "@/components/ui/FormAlert";

const initialState: TFormState = {};

export default function RegisterForm({ next }: { next: string }) {
  const [state, formAction] = useFormState(registerAction, initialState);
  const e = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      {state.message && <FormAlert>{state.message}</FormAlert>}

      <Field id="name" label="Nama lengkap" error={e.name}>
        <Input id="name" name="name" autoComplete="name" placeholder="Rina Amelia" invalid={!!e.name} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" label="Email" error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" invalid={!!e.email} />
        </Field>
        <Field id="phone" label="No. HP" error={e.phone} hint="Dipakai kurir untuk konfirmasi pengantaran.">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0812 3456 7890" invalid={!!e.phone} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="password" label="Password" error={e.password}>
          <PasswordInput id="password" name="password" autoComplete="new-password" placeholder="Minimal 8 karakter" invalid={!!e.password} />
        </Field>
        <Field id="password_confirmation" label="Ulangi password" error={e.password_confirmation}>
          <PasswordInput id="password_confirmation" name="password_confirmation" autoComplete="new-password" placeholder="Ketik ulang" invalid={!!e.password_confirmation} />
        </Field>
      </div>

      <SubmitButton size="lg" block pendingText="Mendaftarkan..." className="mt-1">
        Daftar
      </SubmitButton>
    </form>
  );
}