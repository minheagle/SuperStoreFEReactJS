import { useDispatch, useSelector } from "react-redux";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryItem from "./CategoryItem";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/virtual";

const Category = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.CategoryPublic.list);

  const handleRenderCategoryList = () => {
    return data?.map((item, index) => {
      return (
        <SwiperSlide key={index}>
          <CategoryItem index={index} item={item} />
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-1"></div>
      <div className="relative col-span-10 flex flex-col justify-start items-center gap-2 py-4">
        <div className="w-full h-12 flex justify-start items-center bg-primary rounded ">
          <h2 className="font-normal text-xl text-white pl-4">Categories : </h2>
        </div>
        <Swiper
          modules={[Virtual, Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={7}
          navigation
          className="w-full flex flex-wrap"
        >
          {handleRenderCategoryList()}
        </Swiper>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Category;
