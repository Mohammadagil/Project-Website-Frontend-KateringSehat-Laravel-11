declare module "*.svg" {
  import * as React from "react";

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.css";

// Tambahkan deklarasi spesifik untuk Swiper CSS
declare module "swiper/css" {}
declare module "swiper/css/pagination" {}
declare module "swiper/css/navigation" {}
declare module "swiper/react" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Swiper: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const SwiperSlide: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Navigation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Pagination: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const A11y: any;
}