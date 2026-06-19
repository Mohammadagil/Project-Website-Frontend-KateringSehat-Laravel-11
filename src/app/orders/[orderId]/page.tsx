import React from "react";
import User from "@/assets/images/user.svg";
import Envelope from "@/assets/images/envelope.svg";
import Phone from "@/assets/images/phone.svg";
import ArrowCircleDown from "@/assets/images/arrow-circle-down.svg";
import Calendar from "@/assets/images/calendar.svg";
import Package from "@/assets/images/package.svg";
import Clock from "@/assets/images/clock.svg";
import Truck from "@/assets/images/truck.svg";
import Tax from "@/assets/images/tax.svg";
import PinPoint from "@/assets/images/pinpoint.svg";
import HomeTown from "@/assets/images/hometown.svg";
import Map from "@/assets/images/map.svg";
import Notes2 from "@/assets/images/notes2.svg";
import ComposerHeader from "./ComposerHeader";
import Image from "next/image";
import Notes from "@/assets/images/notes.svg";
import People from "@/assets/images/people.svg";
import Receipt from "@/assets/images/receipt.svg";
import { OpenModal } from "@/components/Modal";
import { TBookingDetails } from "@/components/Packages/types";
import { checkBookingByTrxId } from "@/components/Packages/actions";
import { format } from "date-fns";

type Request = {
  params: {
    orderId: string;
  };
  searchParams: {
    phone: string;
    [key: string]: string;
  };
};

async function OrdersFoundPage({ searchParams, params }: Request) {
  const bookingDetails: { data: TBookingDetails } = await checkBookingByTrxId(params.orderId, searchParams.phone);

  return (
    <>
      <ComposerHeader />
      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          {bookingDetails.data.isPaid === 0 && (
            <span className="bg-color5 flex gap-x-3 p-3 rounded-2xl items-center">
              <span className="">
                <Receipt />
              </span>
              <span className="flex flex-col">
                <span className="text-sm">Status Pembayaran</span>
                <span className="font-semibold">Terpending</span>
              </span>
            </span>
          )}

          {bookingDetails.data.isPaid === 1 && (
            <span className="bg-color3 text-white flex gap-x-3 p-3 rounded-2xl items-center">
              <span className="">
                <Receipt />
              </span>
              <span className="flex flex-col">
                <span className="text-sm">Status Pembayaran</span>
                <span className="font-semibold">Sukses Terbayar & Siap Antar</span>
              </span>
            </span>
          )}

          <div className="flex gap-x-3 items-center">
            <figure className="w-[100px] h-[120px] flex-none rounded-2xl overflow-hidden relative">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.HOST_API}/${bookingDetails.data.cateringPackage.thumbnail}`}
                alt={bookingDetails.data.cateringPackage.name}
                sizes="(max-width:768px) 100vw"
              />
            </figure>
            <span className="flex flex-col gap-y-3">
              <span className="font-semibold">{bookingDetails.data.cateringPackage.name}</span>
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <Notes />
                </span>
                <span className="text-gray2">{bookingDetails.data.cateringPackage.category.name}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <People />
                </span>
                <span className="text-gray2">{bookingDetails.data.cateringTier?.quantity || 0} orang</span>
              </span>
            </span>
          </div>

          <div className="">
            <h2 className="font-semibold mb-3">Tier Package</h2>
            <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-2 border-dashed">
              <span className="flex gap-x-2 items-center">
                <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
                  <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${bookingDetails.data.cateringTier.photo}`} alt={bookingDetails.data.cateringTier.name} sizes="(max-width:768px) 100vw" />
                </figure>
                <h3 className="font-semibold text-lg">{bookingDetails.data.cateringTier.name}</h3>
                <OpenModal modal="tier" queries={{ packageSlug: bookingDetails.data.cateringPackage.slug, tierId: String(bookingDetails.data.cateringTier.id) }} className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
                  Details
                </OpenModal>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-y-7 px-4">
        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="customer-information" className="peer hidden" defaultChecked />
          <label htmlFor="customer-information" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Customer Information</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowCircleDown />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <User />
              </span>
              <input
                readOnly
                type="text"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="name"
                id="name"
                placeholder="Full Name"
                defaultValue={bookingDetails.data.name || ""}
              />
              <label htmlFor="name" className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Full Name
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Envelope />
              </span>
              <input
                readOnly
                type="email"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="email"
                id="email"
                placeholder="Email"
                defaultValue={bookingDetails.data.email || ""}
              />
              <label htmlFor="email" className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Email
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Phone />
              </span>
              <input
                readOnly
                type="tel"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="phone"
                id="phone"
                placeholder="Phone"
                defaultValue={bookingDetails.data.phone || ""}
              />
              <label htmlFor="phone" className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Phone
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Calendar />
              </span>
              <input
                readOnly
                type="date"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
                name="started_at"
                id="started_at"
                placeholder="Start At"
                defaultValue={bookingDetails.data.started_at || ""}
              />
              <label htmlFor="started_at" className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Start At
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="shipping-address" className="peer hidden" defaultChecked />
          <label htmlFor="shipping-address" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Shipping Address</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowCircleDown />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Calendar />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Started At</span>
                <span className="font-semibold">{bookingDetails.data ? format(bookingDetails.data.started_at, "dd LLLL yyyy") : "-"}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Clock />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Time</span>
                <span className="font-semibold">Lunch Time</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <PinPoint />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">City</span>
                <span className="font-semibold">{bookingDetails.data.cateringPackage.city.name}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                <HomeTown />
              </span>
              <textarea
                readOnly
                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                name="address"
                id="address"
                rows={3}
                placeholder="Address"
                defaultValue={bookingDetails.data.address || ""}
              ></textarea>
              <label htmlFor="address" className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Address
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Map />
              </span>
              <input
                readOnly
                type="text"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="post_code"
                id="post_code"
                placeholder="Post code"
                defaultValue={bookingDetails.data.past_codes || ""}
              />
              <label htmlFor="post_code" className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Post code
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                <Notes2 />
              </span>
              <textarea
                readOnly
                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                name="notes"
                id="notes"
                rows={3}
                placeholder="Notes"
                defaultValue={bookingDetails.data.notes || ""}
              ></textarea>
              <label htmlFor="notes" className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300">
                Notes
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="payment-details" className="peer hidden" defaultChecked />
          <label htmlFor="payment-details" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Payment Details</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowCircleDown />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Package />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Paket Catering</span>
                <span className="font-semibold">Rp {(bookingDetails.data.cateringTier.price || 0).thousands()}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Clock />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Duration</span>
                <span className="font-semibold">{`${bookingDetails.data.cateringTier.duration || 0} Day${(bookingDetails.data.cateringTier.duration || 0) > 1 ? "s" : ""}`} Regularly</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <People />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Quantity</span>
                <span className="font-semibold">{`${(bookingDetails.data.cateringTier.quantity || 0).thousands()} People`}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Truck />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Delivery</span>
                <span className="font-semibold">Rp 0 (Free)</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Tax />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">PPN 11%</span>
                <span className="font-semibold">Rp {bookingDetails.data.total_tax_amount.thousands()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="proof-payment" className="peer hidden" defaultChecked />
          <label htmlFor="proof-payment" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Upload Proof of Payment</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowCircleDown />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <span className="relative w-[390px] aspect-video rounded-2xl overflow-hidden">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${bookingDetails.data.proof}`} alt={`${bookingDetails.data.name} Proof payment`} sizes="(max-width:768px) 100vw" />
            </span>
          </div>
        </div>

        <div className="sticky bottom-4 z-50 mb-8">
          <a href="" className="bg-color1 text-White rounded-full flex items-center justify-center px-5 w-full py-3">
            Contact Customer Service
          </a>
        </div>
      </div>
    </>
  );
}

export default OrdersFoundPage;
