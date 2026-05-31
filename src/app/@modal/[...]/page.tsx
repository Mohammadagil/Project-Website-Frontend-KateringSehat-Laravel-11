import ModalFilterCategories from "@/components/Categories/ModalFilterCategories";
import { RouterBack, PreventScrolling, TModalPosRegistered, TModalRegistered } from "@/components/Modal";
import ModalDetailTier from "@/components/Tiers/ModalDetailTier";
import React from "react";

type Request = {
  searchParams: {
    modal: TModalRegistered;
    "modal-pos": TModalPosRegistered;
    [key: string]: string;
  };
};

function page({ searchParams }: Request) {
  if (searchParams.modal) {
    let modalPosition = "items-center";
    let modalWrapper = "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20";

    if (searchParams["modal-pos"] === "bottom") {
      modalPosition = "items-end";
      modalWrapper = "bg-white rounded-t-2xl p-4 flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245] relative z-20";
    }
    return (
      <>
        <div className={["fixed inset-0 z-50 bg-color4/80 flex justify-center", modalPosition].join(" ")}>
          <div className={modalWrapper}>
            {/* render semua konten disini, contoh capture if(modal ==== "apa") {maka render disini} */}
            {searchParams.modal === "filter-category" && <ModalFilterCategories categorySlug={searchParams.categorySlug} />}

            {searchParams.modal === "tier" && <ModalDetailTier packageSlug={searchParams.packageSlug} tierId={searchParams.tierId} />}
          </div>

          <RouterBack />
        </div>
        <PreventScrolling />
      </>
    );
  }
  return null;
}
export default page;
