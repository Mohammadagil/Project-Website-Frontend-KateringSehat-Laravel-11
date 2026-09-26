"use client";

import { ComponentProps, useState } from "react";
import { Input } from "@/components/ui/Field";
import { EyeIcon } from "@/components/ui/icons";

type Props = Omit<ComponentProps<typeof Input>, "type">;

export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} type={visible ? "text" : "password"} className="pr-12" />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        aria-pressed={visible}
        className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:text-ink"
      >
        <EyeIcon className="h-[19px] w-[19px]" />
      </button>
    </div>
  );
}