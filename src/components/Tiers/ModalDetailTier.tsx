import React from "react";
import { TPackageDetails } from "../Packages/types";
import { getPackageDetails } from "../Packages/actions";
import { ContentTier } from ".";

type Props = {
  packageSlug: string;
  tierId: string;
};

async function ModalDetailTier({ packageSlug, tierId }: Props) {
  const cateringPackage: { data: TPackageDetails } = await getPackageDetails(packageSlug);
  const currentTier = cateringPackage.data.tiers.find((tier) => String(tier.id) === tierId);

  if(!currentTier) return "Tier not found";

  return (
    <ContentTier data={currentTier} packageSlug={packageSlug} />
  );
}

export default ModalDetailTier;
