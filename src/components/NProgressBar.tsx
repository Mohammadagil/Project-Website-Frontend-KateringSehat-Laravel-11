"use client";

import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function NProgressBar({ children }: Props) {
  return (
    <>
      {children}
      <NextTopLoader color="#F97316" height={4} showSpinner={false} easing="ease" speed={200} />
    </>
  );
}

export default NProgressBar;
