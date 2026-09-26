import { HTMLAttributes } from "react";
import { cn } from "@/libs/cn";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[20px] border border-line bg-card", className)} {...props} />;
}
