import { getCategoryDetails } from "@/components/Categories/actions";
import { TCategory } from "@/components/Categories/types";
import { ContentPopular } from "@/components/Packages/index";
import { ContentNewest } from "@/components/Packages/index";
import React from "react";
import ComposerHeader from "./ComposerHeader";
import Image from "next/image";
import { OpenModal } from "@/components/Modal";

import People from "@/assets/images/people.svg";

import "@/libs/thousands";
import { getFilteredPackagesByCityAndCategory } from "@/components/Packages/actions";
import { TPackage } from "@/components/Packages/types";
import { Metadata, ResolvingMetadata } from "next";

type Request = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    citySlug: string;
  };
};

export async function generateMetadata({ params }: Request, parent: ResolvingMetadata): Promise<Metadata> {
  const categories: { data: TCategory } = await getCategoryDetails(params.categorySlug);
  return { title: `Category ${categories.data.name}` };
}

async function PageCategoryDetails({ params, searchParams }: Request) {
  const categories: { data: TCategory } = await getCategoryDetails(params.categorySlug);

  let catering_packages = categories.data.catering_packages;

  if (searchParams.citySlug && searchParams.citySlug !== "") {
    const filtered: { data: TPackage[] } = await getFilteredPackagesByCityAndCategory(searchParams.citySlug, params.categorySlug);

    catering_packages = filtered.data;
  }

  return (
    <>
      <ComposerHeader />
      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex gap-x-3 items-center">
            <figure className="relative w-[100px] h-[120px] rounded-2xl overflow-hidden">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.HOST_API}/${categories.data.photo}`} alt={categories.data.name} sizes="(max-width:768px) 100vw" />
            </figure>
            <span className="flex flex-col gap-y-3">
              <span className="font-semibold">{categories.data.name}</span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <People />
                </span>
                <span className="text-gray2">
                  {catering_packages.length.thousands()}
                  {` Package${catering_packages.length > 1 ? "s" : ""}`}
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <ContentPopular data={catering_packages.filter((item) => item.is_popular === 1)} />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>
        <ContentNewest data={catering_packages} />
      </section>

      <div className="sticky bottom-4 mt-36 px-4 z-50 flex justify-center">
        <OpenModal queries={{ categorySlug: params.categorySlug }} modal="filter-category" modalPosition="bottom" className="bg-white border border-gray1 shadow-[0px_12px_30px_0px_#07041517] px-3 py-2 font-semibold text-sm rounded-full">
          SeeFilters
        </OpenModal>
      </div>
    </>
  );
}

export default PageCategoryDetails;
