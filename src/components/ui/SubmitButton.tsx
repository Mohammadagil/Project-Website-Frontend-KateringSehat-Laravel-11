"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { buttonClass, StyleProps } from "@/components/ui/Button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps & { pendingText?: string };

// Tombol submit yang otomatis nonaktif + berganti teks selama form diproses.
export default function SubmitButton({ children, pendingText = "Memproses...", variant, size, block, className, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={buttonClass({ variant, size, block, className })} {...props}>
      {pending ? pendingText : children}
    </button>
  );
}