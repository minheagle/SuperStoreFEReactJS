import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetail } from "../../../redux/slice/admin/userForAdmin.slice";

const EditUser = () => {
  const { userId } = useLocation().state;
  console.log(userId);
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.UserForAdmin.detail
  );

  //   useEffect(() => {
  //     dispatch(getUserDetail(stateLocation.userId));
  //   }, [stateLocation]);
  return <div>EditUser</div>;
};

export default EditUser;
