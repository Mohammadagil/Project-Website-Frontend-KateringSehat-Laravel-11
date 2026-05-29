import Link from "next/link";
import React from "react";
import { getAllTestimonials } from "./actions";
import { TTestimonial } from "./types";
import Image from "next/image";

import Star from "@/assets/images/star.svg";

import Slider from "@/components/Slider";

// 2 EXPORT FUNCTION DAN 1 ASYNC FUNCTION

export function ContentTestimonial({ data }: { data: TTestimonial }) {
  return (
    <div className="h-full rounded-3xl overflow-hidden relative border p-3 flex flex-col gap-y-3">
      <span className="text-color1 flex gap-x-1">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </span>

      <p className="italic text-sm font-semibold leading-6">“{data.message}”</p>

      <div className="flex gap-x-3 items-center">
        <figure className="w-9 flex-none aspect-square relative rounded-full overflow-hidden">
          <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${data.photo}`} alt="slide sale 1" sizes="(max-width:768px) 100vw" />
        </figure>
        <span className="font-semibold">{data.name}</span>
      </div>
    </div>
  );
}

export function WrapperTestimonials({ data }: { data: TTestimonial[] }) {
  return (
    <Slider spaceBetween={20} swiperClassName="!h-[200px] !px-4" swiperSlideClassName="!w-[240px]">
      {data.map((item) => {
        return <ContentTestimonial key={item.id} data={item} />;
      })}
    </Slider>
  );
}

async function Testimonials() {
  const { data }: { data: TTestimonial[] } = await getAllTestimonials();

  if (data.length === 0) return "Tidak ada data";

  return <WrapperTestimonials data={data} />;
}

export default Testimonials;

// 1 EXPORT FUNCTION DAN 1 ASYNC FUNCTION

// export function WrapperTestimonials({ data }: { data: TTestimonial[] }) {
//   if (data.length === 0) return "Tidak ada data";

//   return (
//     <Slider spaceBetween={20} swiperClassName="!h-[200px] !px-4" swiperSlideClassName="!w-[240px]">
//       {data.map((item) => {
//         return (
//           <div key={item.id} className="h-full rounded-3xl overflow-hidden relative border p-3 flex flex-col gap-y-3">
//             <span className="text-color1 flex gap-x-1">
//               <Star />
//               <Star />
//               <Star />
//               <Star />
//               <Star />
//             </span>

//             <p className="italic text-sm font-semibold leading-6">“{item.message}”</p>

//             <div className="flex gap-x-3 items-center">
//               <figure className="w-9 flex-none aspect-square relative rounded-full overflow-hidden">
//                 <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${item.photo}`} alt={item.name} sizes="(max-width:768px) 100vw" />
//               </figure>

//               <span className="font-semibold">{item.name}</span>
//             </div>
//           </div>
//         );
//       })}
//     </Slider>
//   );
// }

// async function Testimonials() {
//   const { data }: { data: TTestimonial[] } = await getAllTestimonials();

//   return <WrapperTestimonials data={data} />;
// }


