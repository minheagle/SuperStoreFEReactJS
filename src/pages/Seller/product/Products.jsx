import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllList } from "../../../redux/slice/seller/product.seller.slice";

import ListProduct from "../../../components/Seller/product/ListProduct";

const Products = () => {
  const dispatch = useDispatch();

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  const shopName = shopData?.storeName?.replaceAll(" ", "-");

  useEffect(() => {
    dispatch(
      getAllList({
        shopId: shopData.id,
      })
    );
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <ListProduct shopName={shopName} />
    </div>
  );
};

export default Products;
