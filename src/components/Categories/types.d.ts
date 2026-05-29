import {TPackage} from "@/components/Packages/types";

export type TCategory = {
  id: number;
  name: string;
  slug: string;
  photo: string;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
  catering_packages: TPackage[];
  catering_packages_count: number;
};
