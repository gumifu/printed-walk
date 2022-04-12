import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "../styles/globals.css";

// import required modules
import { Pagination, Navigation } from "swiper";
const DetailFlyerImage = ({ id, img, subimg }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        loop={subimg ? true : false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className=" bg-white shadow-2xl shadow-gray-900">
            <img src={img} alt="" className="object-cover " />
          </div>
        </SwiperSlide>
        {subimg && (
          <SwiperSlide>
            <div className=" bg-white shadow-2xl shadow-gray-900">
              <img src={subimg} alt="" className="object-cover w-full" />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default DetailFlyerImage;
