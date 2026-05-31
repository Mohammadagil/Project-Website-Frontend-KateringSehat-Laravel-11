import React from "react";
import Image from "next/image";
import { TPackageDetails } from "@/components/Packages/types";
import { getPackageDetails } from "@/components/Packages/actions";
import { Metadata, ResolvingMetadata } from "next";
import Notes from "@/assets/images/notes.svg";
import People from "@/assets/images/people.svg";
import ComposerHeader from "./ComposerHeader";
import { OpenModal } from "@/components/Modal";
import Form from "./Form";

type Request = {
  params: {
    packageSlug: string;
  };
  searchParams: {
    tier: string;
  };
};

export async function generateMetadata({ params }: Request, parent: ResolvingMetadata): Promise<Metadata> {
  const cateringPackage: { data: TPackageDetails } = await getPackageDetails(params.packageSlug);
  return { title: `Information | ${cateringPackage.data.name}`, description: cateringPackage.data.about };
}

async function PackageTiersPage({ params, searchParams }: Request) {
  const cateringPackage: { data: TPackageDetails } = await getPackageDetails(params.packageSlug);
  const currentTier = cateringPackage.data.tiers.find((tier) => String(tier.id) === searchParams.tier);
  const lowestTier = cateringPackage.data.tiers.length > 0 ? cateringPackage.data.tiers.reduce((min, current) => (current.price < min.price ? current : min)) : null;
  const highestTier = cateringPackage.data.tiers.length > 0 ? cateringPackage.data.tiers.reduce((max, current) => (current.price > max.price ? current : max)) : null;

  return (
    <>
      <ComposerHeader />
      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex gap-x-3 items-center">
            <figure className="w-[100px] h-[120px] flex-none rounded-2xl overflow-hidden relative">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${cateringPackage.data.thumbnail}`} alt={cateringPackage.data.name} sizes="(max-width:768px) 100vw" />
            </figure>
            <span className="flex flex-col gap-y-3">
              <span className="font-semibold">Asian Spicy Guandong</span>
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <Notes />
                </span>
                <span className="text-gray2">{cateringPackage.data.category.name}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <People />
                </span>
                <span className="text-gray2">
                  {lowestTier?.quantity || 0} - {highestTier?.quantity || 0} orang
                </span>
              </span>
            </span>
          </div>

          {!!currentTier && (
            <div className="">
              <h2 className="font-semibold mb-3">Tier Package</h2>
              <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-2 border-dashed">
                <span className="flex gap-x-2 items-center">
                  <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
                    <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${currentTier?.photo}`} alt={currentTier.name} sizes="(max-width:768px) 100vw" />
                  </figure>
                  <h3 className="font-semibold text-lg">{currentTier.name}</h3>
                  <OpenModal modal="tier" queries={{ packageSlug: params.packageSlug, tierId: searchParams.tier }} className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
                    Details
                  </OpenModal>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <Form data={cateringPackage.data} tierId={searchParams.tier} />
    </>
  );
}

export default PackageTiersPage;
