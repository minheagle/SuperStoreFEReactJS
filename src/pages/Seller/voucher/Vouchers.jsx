import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getAllListOfSeller } from "../../../redux/slice/seller/voucher.seller.slice";

import VoucherItem from "../../../components/Seller/voucher/VoucherItem";
import VoucherExpired from "../../../components/Seller/voucher/VoucherExpired";

const Vouchers = () => {
  const dispatch = useDispatch();
  const today = moment().toDate();

  const { data, loading } = useSelector(
    (state) => state.VoucherSeller.list_of_seller
  );

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  useEffect(() => {
    if (shopData) {
      dispatch(
        getAllListOfSeller({
          sellerId: shopData.id,
        })
      );
    }
  }, [shopData.id]);

  const handleRenderListVoucherAvailable = () => {
    const newList = data?.filter((item) => {
      return (
        (item?.isActive && moment(item?.endDate).toDate() >= today) ||
        (!item?.isActive && moment(item?.endDate).toDate() >= today)
      );
    });
    if (newList?.length === 0) {
      return (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-2xl font-medium">List is empty</h2>
        </div>
      );
    }
    return newList?.map((voucher) => {
      return (
        <VoucherItem
          key={voucher.promotionId}
          data={voucher}
          sellerId={shopData.id}
        />
      );
    });
  };

  const handleRenderListVoucherExpired = () => {
    const newList = data?.filter((item) => {
      return !item?.isActive && moment(item?.endDate).toDate() <= today;
    });
    if (newList?.length === 0) {
      return (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-2xl font-medium">List is empty</h2>
        </div>
      );
    }
    return newList?.map((voucher) => {
      return <VoucherExpired key={voucher.promotionId} data={voucher} />;
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full flex justify-center items-center">
        <h2 className="font-semibold text-xl">List Voucher</h2>
      </div>
      <div className="w-full flex justify-start items-start bg-primary font-medium text-white text-xl pl-2 py-1 rounded">
        <h2>Available :</h2>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {handleRenderListVoucherAvailable()}
      </div>
      <div className="w-full flex justify-start items-start bg-primary font-medium text-white text-xl pl-2 py-1 rounded">
        <h2>Expired :</h2>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {handleRenderListVoucherExpired()}
      </div>
    </div>
  );
};

export default Vouchers;
