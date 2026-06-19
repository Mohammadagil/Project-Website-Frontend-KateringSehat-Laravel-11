import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: ReactNode;
  overrideClassName?: (isPending: boolean) => string[];
  pendingText?: string;
};

function SubmitButton({ children, overrideClassName, pendingText }: Props) {
  const { pending } = useFormStatus();

  let className = ["rounded-full flex items-center justify-center px-5", pending ? "cursor-not-allowed bg-gray1 text-gray2" : "bg-color1 text-white"];

  if (!!overrideClassName) {
    className = overrideClassName(pending);
  }

  return (
    <button type="submit" className={className.join(" ")} disabled={pending} aria-disabled={pending}>
      {pending ? pendingText || "Loading..." : children}
    </button>
  );
}

export default SubmitButton;
