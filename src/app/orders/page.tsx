import BottomBar from "@/components/BottomBar";
import React from "react";
import { Metadata } from "next";

import Image from "next/image";
import Form from "./Form";

export const metaData: Metadata = {
  title: "Orders",
};

function BookingPage() {
  return (
    <>
      <section className="relative px-8 mt-28">
        <figure className="w-full h-[219px] relative">
          <Image fill className="w-full h-full object-containt object-center" src="/images/chef.png" alt="chef illustration" sizes="(max-width:768px) 100vw" />
        </figure>
      </section>
      <Form />
      <div className="mt-36"></div>
      <BottomBar />
    </>
  );
}

export default BookingPage;
