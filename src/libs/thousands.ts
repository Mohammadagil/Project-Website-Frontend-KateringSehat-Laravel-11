type TLocales = "en-US" | "id-ID";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Number {
  thousands(locales?: TLocales): string;
}

Number.prototype.thousands = function (locales: TLocales): string {
  return new Intl.NumberFormat(locales || "id-ID").format(Number(this));
};
