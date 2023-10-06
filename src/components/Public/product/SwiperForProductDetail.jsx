import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const SwiperForProductDetail = ({ listImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleRenderImage = () => {
    return listImage?.map((item, index) => {
      return (
        <SwiperSlide key={index}>
          <img src={item} alt="" className="object-cover aspect-square" />
        </SwiperSlide>
      );
    });
  };

  const handleRenderImageThumbnail = () => {
    return listImage?.map((item, index) => {
      const isActive = index === activeIndex;
      return (
        <SwiperSlide key={index} className="p-2">
          <div
            className={`w-full flex justify-center items-center border rounded ${
              isActive ? "border-primary" : "border-slate-300"
            }`}
          >
            <img src={item} alt="" className="object-contain aspect-square" />
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full flex justify-center items-center p-2">
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="border border-slate-300 rounded"
        >
          {handleRenderImage()}
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="flex justify-start items-center gap-2"
      >
        {handleRenderImageThumbnail()}
      </Swiper>
    </div>
  );
};

export default SwiperForProductDetail;
