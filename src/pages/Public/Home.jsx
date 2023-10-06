import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllList } from "../../redux/slice/public/category.public.slice";
import { getAllListProduct } from "../../redux/slice/public/product.public.slice";

import Category from "../../components/Public/category/Category";
import Products from "../../components/Public/product/Products";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllList());
    dispatch(getAllListProduct());
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <Category />
      <Products />
    </div>
  );
};

export default Home;
