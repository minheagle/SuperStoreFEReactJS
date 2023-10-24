import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultAvatar from "../../assets/default-avatar.jpg";
import { getShopDetail } from "../../redux/slice/public/shop.public.slice";

const AboutShop = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { data, loading } = useSelector(
    (state) => state.ShopPublic.shop_detail
  );

  const backgroundUrlDefault =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";

  const [background, setBackground] = useState(
    data?.storeBackgroundUrl ? data.storeBackgroundUrl : backgroundUrlDefault
  );

  useEffect(() => {
    dispatch(
      getShopDetail({
        sellerId: state.shopId,
      })
    );
  }, []);

  useEffect(() => {
    if (data) {
      setBackground(data?.storeBackgroundUrl);
    }
  }, [data]);

  return (
    <div className="w-full h-64 bg-white grid grid-cols-12 py-4">
      <div className="col-span-1"></div>
      <div className="col-span-10 grid grid-cols-3 gap-2">
        <div className="col-span-2 w-full border border-slate-300 rounded-lg">
          <div
            className={`w-full h-60 flex flex-col justify-start items-center rounded-lg px-8`}
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="w-full h-48 flex justify-start items-center gap-4 py-2">
              <div className="shrink-0 w-40 h-40 border-2 border-slate-400 rounded-full">
                {data?.storeAvatarUrl ? (
                  <img
                    src={data.storeAvatarUrl}
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
              <div className="flex-1 text-white">{data?.storeName}</div>
            </div>
            <div className="w-full h-12 flex justify-start items-center text-white">
              <div className="w-1/2 h-12 flex justify-between items-center">
                <button
                  type="button"
                  className="w-2/5 h-8 flex justify-center items-center gap-2 bg-primary rounded"
                >
                  <FontAwesomeIcon icon="fas fa-plus" />
                  <span>Follow</span>
                </button>
                <button
                  type="button"
                  className="w-2/5 h-8 flex justify-center items-center gap-2 bg-primary rounded"
                >
                  <FontAwesomeIcon icon="fas fa-comments" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-full flex flex-col justify-start items-center border border-slate-300 rounded p-2">
          <div className="w-full flex gap-2">
            <span className="font-medium">Store Address : </span>
            <span>{data?.storeAddress}</span>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default AboutShop;
