import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Star from "react-rating-star-with-type";

import { getAllByProduct } from "../../../redux/slice/public/rating.public.slice";

import defaultAvatar from "../../../assets/default-avatar.jpg";

const CommentAndRating = ({ productId }) => {
  const dispatch = useDispatch();

  const { all_by_product } = useSelector((state) => state.RatingPublic);

  useEffect(() => {
    dispatch(
      getAllByProduct({
        productId,
      })
    );
  }, []);

  const handleRenderImage = (data = []) => {
    return data?.map((item, index) => {
      return (
        <div key={index} className="col-span-1 w-full">
          <img
            src={item}
            alt=""
            className="w-full object-cover aspect-square rounded"
          />
        </div>
      );
    });
  };

  const handleRenderListComment = () => {
    return all_by_product?.data?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full flex flex-col justify-start items-start gap-2 border border-slate-300 p-4 rounded"
        >
          <div className="w-full flex justify-start gap-4">
            <div className="w-12 h-12 shrink-0">
              {item?.imgAvatar ? (
                <img
                  src={item?.imgAvatar}
                  alt=""
                  className="object-cover aspect-square rounded-full"
                />
              ) : (
                <img
                  src={defaultAvatar}
                  alt=""
                  className="object-cover aspect-square rounded-full"
                />
              )}
            </div>
            <div className="flex-1 flex justify-start items-center gap-2">
              <div className="flex flex-col ">
                <span className="font-medium">{item?.fullName}</span>
                <div className="flex justify-start items-center">
                  <Star
                    count={5}
                    value={item?.voteStar}
                    size={16}
                    color1="gray"
                    color2="orange"
                    edit={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <span className="font-medium">Comment : </span>
            <span>{item?.comment}</span>
          </div>
          <div className="w-full grid grid-cols-6 gap-2">
            {handleRenderImage(item?.imgURL)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-2 pl-6">
      <div className="w-full font-semibold">Product Rating</div>
      {all_by_product?.data?.length === 0 ? (
        <div>
          <span>No rating available</span>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-center gap-2">
          {handleRenderListComment()}
        </div>
      )}
    </div>
  );
};

export default CommentAndRating;
