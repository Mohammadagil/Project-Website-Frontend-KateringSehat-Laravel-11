import React from "react";
import Image from "next/image";
import { TBonus } from "./types";

export function ContentBonus({data}: {data: TBonus}) {
  return (
    <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border">
      <figure className="w-full aspect-video rounded-2xl overflow-hidden relative">
       <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${data.photo}`} alt={data.name} sizes="(max-width:768px) 100vw" />
      </figure>

      <span className="font-semibold text-center text-sm">{data.name}</span>
    </div>
  );
}
