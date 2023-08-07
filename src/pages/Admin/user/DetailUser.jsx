import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserDetail } from "../../../redux/slice/userForAdmin.slice";

const DetailUser = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  useEffect(() => {
    dispatch(getUserDetail(state.userId));
  }, []);
  return <div>DetailUser</div>;
};

export default DetailUser;
