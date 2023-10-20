import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, generatePath } from "react-router-dom";

import { Steps } from "antd";

import CreateProduct from "../../../components/Seller/product/CreateProduct";
import CreateProductItem from "../../../components/Seller/product/CreateProductItem";
import SubmitCreate from "../../../components/Seller/product/SubmitCreate";

import handleErrorProduct from "../../../utils/handle/seller/handleErrorProduct";
import { createProduct } from "../../../redux/slice/seller/product.seller.slice";
import ROUTES from "../../../constants/ROUTES";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopName } = useParams();
  const { loading } = useSelector((state) => state.ProductSeller.createProduct);
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

  const handleDone = () => {
    dispatch(
      createProduct({
        product: product,
        productItem: productItem,
        callback: {
          goToListProduct: () =>
            navigate(generatePath(ROUTES.SELLER.PRODUCT.LIST, { shopName })),
        },
      })
    );
  };

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
            className="w-24 h-10 flex justify-center items-center gap-2 text-white bg-primary rounded"
          >
            {loading ? (
              <div>
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-200 animate-spin fill-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}
            <span>Done</span>
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
