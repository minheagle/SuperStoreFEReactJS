import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";

import { getAllList } from "../../redux/slice/public/category.public.slice";
import { getAllListProduct } from "../../redux/slice/public/product.public.slice";

import Category from "../../components/Public/category/Category";
import Products from "../../components/Public/product/Products";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, minPrice, maxPrice, productName, page, size } =
    useSelector((state) => state.Filter);

  useEffect(() => {
    dispatch(getAllList());
    dispatch(
      getAllListProduct({
        params: {
          categoryId: null,
          minPrice,
          maxPrice,
          productName: null,
          page: page - 1,
          size,
        },
      })
    );
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <Category />
      <Products />
      <Pagination defaultCurrent={page} defaultPageSize={size} total={100} />
    </div>
  );
};

export default Home;
