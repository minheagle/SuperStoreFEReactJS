import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Steps } from "antd";

import CreateProduct from "../../../components/Seller/product/CreateProduct";
import CreateProductItem from "../../../components/Seller/product/CreateProductItem";
import SubmitCreate from "../../../components/Seller/product/SubmitCreate";

import handleErrorProduct from "../../../utils/handle/seller/handleErrorProduct";

const Create = () => {
  const dispatch = useDispatch();
  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : {};

  const [current, setCurrent] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [product, setProduct] = useState({
    sellerId: shopData?.id,
    categoryId: "",
    productName: "",
    description: "",
  });
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    handleError();
  }, []);

  const handleChangeProduct = (values) => {
    setProduct(values);
  };

  const handleChangeProductItem = (value) => {
    setProductItem(value);
  };

  const handleChangeHasError = (value) => {
    setHasError(value);
  };

  const handleError = () => {
    switch (current) {
      case 0:
        if (handleErrorProduct.checkValueCreateProduct(product)) {
          setHasError(true);
        }
        break;
      case 1:
        if (handleErrorProduct.checkValueCreateProductItem(productItem)) {
          setHasError(true);
        }
        break;
    }
  };

  const steps = [
    {
      title: "Product",
      description: "",
      content: () => (
        <CreateProduct
          product={product}
          handleChangeProduct={handleChangeProduct}
          hasError={hasError}
          handleError={handleError}
          handleChangeHasError={handleChangeHasError}
        />
      ),
    },
    {
      title: "Product Item",
      description: "",
      content: () => (
        <CreateProductItem
          productItem={productItem}
          handleChangeProductItem={handleChangeProductItem}
          hasError={hasError}
          handleError={handleError}
          handleChangeHasError={handleChangeHasError}
        />
      ),
    },
    {
      title: "Submit",
      description: "",
      content: () => (
        <SubmitCreate product={product} productItem={productItem} />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleDone = () => {};

  return (
    <div className="w-full">
      <Steps current={current} items={items} className="text-primary" />
      <div className="w-full">{steps[current].content()}</div>
      <div className="w-full flex justify-start items-center gap-4">
        {current < steps.length - 1 ? (
          hasError ? (
            <button
              type="button"
              className="w-24 h-10 text-primary bg-white border border-primary rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={() => next()}
              className="w-24 h-10 text-white bg-primary rounded"
            >
              Next
            </button>
          )
        ) : (
          ""
        )}
        {current === steps.length - 1 ? (
          <button
            type="button"
            onClick={() => handleDone()}
            className="w-24 h-10 text-white bg-primary rounded"
          >
            Done
          </button>
        ) : (
          ""
        )}
        {current > 0 ? (
          <button
            type="button"
            onClick={() => prev()}
            className="w-24 h-10 text-white bg-slate-300 rounded"
          >
            Previous
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Create;
