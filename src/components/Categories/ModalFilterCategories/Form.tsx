"use client";

import { TCity } from "@/components/Cities/types";
import { TCategory } from "../types";
import { useFormState } from "react-dom";
import { navigateFilterCategories } from "../actions";

type Props = {
  categorySlug: string;
  categories: TCategory[];
  cities: TCity[];
};

function FormFilterCategories({ categorySlug, categories, cities }: Props) {
  const [, formAction] = useFormState(navigateFilterCategories, { message: "", field: "" });
  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <h6 className="text-xl font-semibold">Set Filter (2)</h6>

      <div className="flex flex-col gap-y-4">
        <h6 className="text-sm font-semibold">Category</h6>
        {categories.map((category) => {
          return (
            <label key={category.id} htmlFor={`${category.id}-${category.slug}`} className="flex gap-x-2 cursor-pointer">
              <input type="radio" name="category" id={`${category.id}-${category.slug}`} className="hidden peer" defaultChecked={category.slug === categorySlug} defaultValue={category.slug} />
              <span className="radio p-1 rounded-full border border-color2 w-6 aspect-square peer-checked:[&>span]:opacity-100">
                <span className="aspect-square h-full block rounded-full opacity-0 bg-color2 transition-all duration-300"></span>
              </span>
              <span className="">{category.name}</span>
            </label>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-4">
        <h6 className="text-sm font-semibold">City</h6>
        {cities.map((city) => {
          return (
            <label key={city.id} htmlFor={`${city.id}-${city.slug}`} className="flex gap-x-2 cursor-pointer">
              <input type="radio" name="city" id={`${city.id}-${city.slug}`} className="hidden peer" defaultValue={city.slug} />
              <span className="radio p-1 rounded-full border border-color2 w-6 aspect-square peer-checked:[&>span]:opacity-100">
                <span className="aspect-square h-full block rounded-full opacity-0 bg-color2 transition-all duration-300"></span>
              </span>
              <span className="">{city.name}</span>
            </label>
          );
        })}
      </div>

      <button type="submit" className="bg-color1 text-white px-5 py-3 rounded-full font-semibold text-center">View Results</button>
    </form>
  );
}

export default FormFilterCategories;
