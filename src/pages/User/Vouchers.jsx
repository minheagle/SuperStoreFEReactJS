import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllVoucherOfUser } from "../../redux/slice/user/voucher.user.slice";

import VoucherItem from "../../components/User/voucher/VoucherItem";

const Vouchers = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.VoucherUser.get_all_of_user
  );

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    if (userData) {
      dispatch(
        getAllVoucherOfUser({
          userId: userData.id,
        })
      );
    }
    window.scroll(0, 0);
  }, []);

  const handleRenderListVoucher = () => {
    return data?.map((item, index) => {
      return <VoucherItem key={index} data={item} />;
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full flex justify-center items-center">
        <h2 className="font-semibold text-xl">List Voucher</h2>
      </div>
      <div className="w-full grid grid-cols-4 gap-4">
        {handleRenderListVoucher()}
      </div>
    </div>
  );
};

export default Vouchers;
