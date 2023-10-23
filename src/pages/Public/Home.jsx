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
  const { total } = useSelector((state) => state.ProductPublic.list);

  useEffect(() => {
    dispatch(getAllList());
    dispatch(
      getAllListProduct({
        params: {
          minPrice,
          page: page,
          size,
        },
      })
    );
    window.scroll(0, 0);
  }, [dispatch]);

  const handleChangePage = (page, pageSize) => {
    dispatch(
      getAllListProduct({
        params: {
          minPrice,
          page: page,
          size: pageSize,
        },
      })
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <Category />
      <Products />
      <Pagination
        defaultCurrent={page}
        defaultPageSize={size}
        pageSizeOptions={[24, 48, 96]}
        total={total}
        onChange={(page, pageSize) => handleChangePage(page, pageSize)}
      />
    </div>
  );
};

export default Home;
