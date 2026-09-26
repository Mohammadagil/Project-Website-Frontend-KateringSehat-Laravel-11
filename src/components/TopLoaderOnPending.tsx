"use client";
import { useFormStatus } from "react-dom";
import { useTopLoader } from "nextjs-toploader";
import { useEffect } from "react";

function TopLoaderOnPending() {
  const { pending } = useFormStatus();
  const loader = useTopLoader();

  useEffect(() => {
    if (pending) {
      loader.start();
    } else {
      loader.done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  return null;
}

export default TopLoaderOnPending;
