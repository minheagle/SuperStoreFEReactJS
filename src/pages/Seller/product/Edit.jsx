import { useEffect } from "react";
import { useParams, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../../../constants/ROUTES";
import { getDetail } from "../../../redux/slice/seller/product.seller.slice";
import { getAllList } from "../../../redux/slice/public/category.public.slice";

import LoadingFull from "../../../components/common/LoadingFull";

const Edit = () => {
  const dispatch = useDispatch();
  const { shopName, productId } = useParams();

  const { data, loading } = useSelector(
    (state) => state.ProductSeller.get_detail
  );
  const { list } = useSelector((state) => state.CategoryPublic);

  useEffect(() => {
    dispatch(getAllList());
  }, []);

  useEffect(() => {
    if (productId) {
      dispatch(
        getDetail({
          productId,
        })
      );
    }
  }, [productId]);

  const handleFindCategory = (categoryId) => {
    const findCategory = list?.data?.find((item) => item.id === categoryId);
    return findCategory?.content;
  };

  const handleRenderImageForProductItem = (data) => {
    return data?.map((image) => {
      return (
        <div
          key={image.imgProductId}
          className="col-span-1 border border-slate-300 rounded"
        >
          <img
            src={image.imgProductUrl}
            alt=""
            className="object-cover aspect-square rounded"
          />
        </div>
      );
    });
  };

  const handleRenderOptionForProductItem = (data) => {
    return data?.map((option) => {
      return (
        <div
          key={option.opTypeId}
          className="col-span-1 w-full flex justify-center items-center gap-2 border border-slate-300 rounded"
        >
          <div className="w-1/2 flex justify-start items-center font-medium pl-2">
            <span className="flex-1 flex justify-start items-center">
              {option.optionName}
            </span>
            <span className="shrink-0">:</span>
          </div>
          <span className="w-1/2 flex justify-start items-center">
            {option.optionValue.valueName}
          </span>
        </div>
      );
    });
  };

  const handleRenderProductItems = (data) => {
    return data?.map((productItem) => {
      return (
        <div
          key={productItem.pitemId}
          className="col-span-1 border border-slate-300 rounded"
        >
          <div className="w-full h-full flex flex-col justify-start items-center gap-2 p-2">
            <div className="shrink-0 w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-center items-center gap-2">
                <span className="shrink-0 w-28 flex justify-start items-center font-medium">
                  Price
                </span>
                <span>:</span>
                <span className="flex-1 flex justify-start items-center text-red-600">
                  {productItem.price.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <span className="shrink-0 w-28 flex justify-start items-center font-medium">
                  Quantity Stock
                </span>
                <span>:</span>
                <span className="flex-1 flex justify-start items-center">
                  {productItem.qtyInStock}
                </span>
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col justify-start items-center gap-2">
              <span className="w-full font-medium">Images :</span>
              <div className="w-full grid grid-cols-2 gap-2">
                {handleRenderImageForProductItem(productItem.imageProductList)}
              </div>
            </div>
            <div className="shrink-0 w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <span className="w-full font-medium">Options :</span>
                <div className="w-full grid grid-cols-1 gap-2">
                  {handleRenderOptionForProductItem(productItem.optionTypes)}
                </div>
              </div>
              <div className="w-full flex justify-start items-center">
                <Link
                  to={generatePath(ROUTES.SELLER.PRODUCT.UPDATE_PRODUCT_ITEMS, {
                    shopName,
                    productId,
                    productItemId: productItem.pitemId,
                  })}
                  className="bg-primary text-white rounded px-4 py-1"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return <LoadingFull />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
        <div className="w-full flex flex-col justify-start items-center gap-2 p-4 border border-slate-300 rounded">
          <div className="w-full">
            <h2 className="font-semibold">Product :</h2>
          </div>
          <div className="w-full flex flex-col justify-start items-center pl-4">
            <div className="w-full flex justify-center items-center gap-4">
              <span className="shrink-0 w-24 flex justify-start items-center font-medium">
                Name
              </span>
              <span>:</span>
              <span className="flex-1">{data?.productName}</span>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <span className="shrink-0 w-24 flex justify-start items-center font-medium">
                Category
              </span>
              <span>:</span>
              <span className="flex-1">
                {data?.categoryId ? handleFindCategory(data.categoryId) : ""}
              </span>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <span className="shrink-0 w-24 flex justify-start items-center font-medium">
                Min Price
              </span>
              <span>:</span>
              <span className="flex-1 text-primary">
                {data?.minPrice ? data.minPrice.toLocaleString() : 0} VNĐ
              </span>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <span className="shrink-0 w-24 flex justify-start items-center font-medium">
                Max Price
              </span>
              <span>:</span>
              <span className="flex-1 text-primary">
                {data?.maxPrice ? data.maxPrice.toLocaleString() : 0} VNĐ
              </span>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <span className="shrink-0 w-24 flex justify-start items-center font-medium">
                Description
              </span>
              <span>:</span>
              <span className="flex-1">{data?.description}</span>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <Link
              to={generatePath(ROUTES.SELLER.PRODUCT.UPDATE_PRODUCT, {
                shopName,
                productId,
              })}
              className="bg-primary text-white rounded px-4 py-1"
            >
              Edit
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-2 p-4 border border-slate-300 rounded">
          <div className="w-full">
            <h2 className="font-semibold">Product Items :</h2>
          </div>
          <div className="w-full grid grid-cols-3 p-4 gap-4">
            {handleRenderProductItems(data?.productItemResponseList)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
