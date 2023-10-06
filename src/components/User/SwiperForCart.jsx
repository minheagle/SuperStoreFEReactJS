import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const SwiperForCart = ({ listImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleRenderImage = () => {
    return listImage?.map((item) => {
      return (
        <SwiperSlide key={item.imgProductId}>
          <img
            src={item.imgProductUrl}
            alt=""
            className="object-cover aspect-square"
          />
        </SwiperSlide>
      );
    });
  };
  return (
    <div>
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="border border-slate-300 rounded"
      >
        {handleRenderImage()}
      </Swiper>
    </div>
  );
};

export default SwiperForCart;
