"use client";

import React, { Children, ReactNode } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";

type Props = {
  children: ReactNode;
  spaceBetween: number;
  swiperSlideClassName?: string;
  swiperClassName?: string;
  hasPagination?: boolean;
};

function Slider({ children, spaceBetween, swiperSlideClassName, swiperClassName, hasPagination }: Props) {
  const modules = [Navigation, A11y];
  if (!!hasPagination) {
    modules.push(Pagination);
  }
  return (
    <Swiper loop={true} slidesPerView="auto" spaceBetween={spaceBetween} className={swiperClassName} modules={modules} maxBackfaceHiddenSlides={10} pagination={hasPagination ? { clickable: true } : false}>
      {Children.toArray(children).map((slide) => {
        return (
          <SwiperSlide className={swiperSlideClassName} key={(slide as React.ReactElement).key}>
            {slide}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
