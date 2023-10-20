import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllListOfSeller } from "../../../redux/slice/seller/voucher.seller.slice";

import VoucherItem from "../../../components/Seller/voucher/VoucherItem";

const Vouchers = () => {
  const dispatch = useDispatch();

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

  const handleRenderListVoucher = () => {
    return data?.map((voucher) => {
      return (
        <VoucherItem
          key={voucher.promotionId}
          data={voucher}
          sellerId={shopData.id}
        />
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full flex justify-center items-center">
        <h2 className="font-semibold text-xl">List Voucher</h2>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {handleRenderListVoucher()}
      </div>
    </div>
  );
};

export default Vouchers;
