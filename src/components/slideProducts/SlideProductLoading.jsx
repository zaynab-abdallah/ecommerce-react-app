import React from "react";
import "./slideSkeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function SlideProductSkeleton() {
  return (
    <div className="slide_products slide">
      <div className="container two">
        <div className="top_slide">
          <div className="title_skeleton skeltion"></div>
          <div className="sub_skeleton skeltion"></div>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          className="mySwiper"
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="slide_card_skeleton">
                <div className="img_skeleton skeltion"></div>
                <div className="text_skeleton skeltion"></div>
                <div className="text_skeleton small skeltion"></div>
                <div className="btn_skeleton skeltion"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideProductSkeleton;
