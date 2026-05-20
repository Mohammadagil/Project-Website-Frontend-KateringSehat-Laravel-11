import { TPackage } from "@/components/Packages/types";

export type TTestimonial = {
  id: number;
  name: string;
  photo: string;
  message: string;
  cateringPackage: TPackage;
};
