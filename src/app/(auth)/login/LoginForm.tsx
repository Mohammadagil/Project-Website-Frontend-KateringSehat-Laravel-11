"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginAction, TFormState } from "@/components/Auth/actions";
import { Field, Input } from "@/components/ui/Field";
import PasswordInput from "@/components/ui/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import FormAlert from "@/components/ui/FormAlert";

const initialState: TFormState = {};

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px]">
      <input type="hidden" name="next" value={next} />

      {state.message && <FormAlert>{state.message}</FormAlert>}

      <Field id="email" label="Email" error={state.errors?.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" invalid={!!state.errors?.email} />
      </Field>

      <Field
        id="password"
        label="Password"
        error={state.errors?.password}
        labelAside={
          <Link href="/forgot-password" className="text-[13px] font-bold text-accent-deep">
            Lupa password?
          </Link>
        }
      >
        <PasswordInput id="password" name="password" autoComplete="current-password" placeholder="Masukkan password" invalid={!!state.errors?.password} />
      </Field>

      <SubmitButton size="lg" block pendingText="Memeriksa...">
        Masuk
      </SubmitButton>
    </form>
  );
}