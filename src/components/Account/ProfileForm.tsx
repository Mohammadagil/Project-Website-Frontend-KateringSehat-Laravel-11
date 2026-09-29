"use client";

import { useFormState } from "react-dom";
import { TAccountState, updateProfileAction } from "@/components/Account/actions";
import { Field, Input } from "@/components/ui/Field";
import FormAlert from "@/components/ui/FormAlert";
import SubmitButton from "@/components/ui/SubmitButton";
import { TSessionUser } from "@/libs/session";

const initialState: TAccountState = {};

export default function ProfileForm({ user }: { user: TSessionUser }) {
  const [state, formAction] = useFormState(updateProfileAction, initialState);
  const e = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.message && <FormAlert variant={state.success ? "success" : "error"}>{state.message}</FormAlert>}

      <div className="grid gap-4 md:grid-cols-3">
        <Field id="name" label="Nama lengkap" error={e.name}>
          <Input id="name" name="name" autoComplete="name" defaultValue={user.name} invalid={!!e.name} />
        </Field>
        <Field id="email" label="Email" error={e.email}>
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={user.email} invalid={!!e.email} />
        </Field>
        <Field id="phone" label="No. HP" error={e.phone} hint="Dipakai kurir untuk konfirmasi pengantaran.">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={user.phone} invalid={!!e.phone} />
        </Field>
      </div>

      <SubmitButton pendingText="Menyimpan..." className="w-fit">
        Simpan Profil
      </SubmitButton>
    </form>
  );
}
