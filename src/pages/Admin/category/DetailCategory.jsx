import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getDetailCategory } from "../../../redux/slice/admin/category.slice";

const DetailCategory = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailCategory(state.categoryId));
  }, [dispatch]);

  //   console.log(state.categoryId);
  return <div>DetailCategory</div>;
};

export default DetailCategory;
