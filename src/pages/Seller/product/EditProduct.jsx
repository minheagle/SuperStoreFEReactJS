import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, generatePath, useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";
// import { TreeSelect } from "antd";

import {
  getDetail,
  updateProduct,
} from "../../../redux/slice/seller/product.seller.slice";
// import { getAllList } from "../../../redux/slice/public/category.public.slice";
// import convertToTree from "../../../utils/handle/handleDataForTreeSelect";
import updateProductSchema from "../../../utils/validate/Seller/product/update.product.schema";
import ROUTES from "../../../constants/ROUTES";

import LoadingFull from "../../../components/common/LoadingFull";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopName, productId } = useParams();

  const { data, loading } = useSelector(
    (state) => state.ProductSeller.get_detail
  );
  //   const { list } = useSelector((state) => state.CategoryPublic);

  //   const convertData = list?.data?.length === 0 ? [] : convertToTree(list?.data);
  const productSchema = updateProductSchema();

  //   useEffect(() => {
  //     dispatch(getAllList());
  //   }, []);

  useEffect(() => {
    if (productId) {
      dispatch(
        getDetail({
          productId,
        })
      );
    }
  }, [productId]);

  const initialValues = {
    productName: data?.productName,
    description: data?.description,
  };

  const compareData = (values) => {
    let isCompare = true;
    for (const [key, value] of Object.entries(values)) {
      if (data[key] !== value) {
        isCompare = false;
        break;
      }
    }
    return isCompare;
  };

  const handleSubmit = (values) => {
    if (compareData(values)) {
      navigate(
        generatePath(ROUTES.SELLER.PRODUCT.UPDATE, { shopName, productId })
      );
    } else {
      dispatch(
        updateProduct({
          productId: Number.parseInt(productId),
          updateProductForm: values,
          callback: {
            goToEditPage: () =>
              navigate(
                generatePath(ROUTES.SELLER.PRODUCT.UPDATE, {
                  shopName,
                  productId,
                })
              ),
          },
        })
      );
    }
  };

  if (loading) {
    return <LoadingFull />;
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, setFieldValue }) => (
          <Form className="w-full flex flex-col justify-start items-center gap-4 p-4">
            {/* Category */}
            {/* <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-1/2 flex justify-start items-center">
                <div className="w-1/2 flex justify-start items-center">
                  <span className="font-semibold">Category :</span>
                </div>
                {errors.categoryId ? (
                  <div className="w-1/2 flex justify-end items-center">
                    <span className="text-sm text-primary">
                      {errors.categoryId}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field name="categoryId">
                {({ field }) => (
                  <TreeSelect
                    notFoundContent={<div>No result</div>}
                    treeData={convertData}
                    defaultValue={data?.categoryId}
                    placeholder="Select your category"
                    onChange={(value) => setFieldValue(field.name, value)}
                    className="w-1/2 hover:border-slate-300"
                  />
                )}
              </Field>
            </div> */}
            {/* Product Name */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-1/2 flex justify-start items-center">
                <div className="w-1/2 flex justify-start items-center">
                  <span className="font-semibold">Product Name :</span>
                </div>
                {errors.productName ? (
                  <div className="w-1/2 flex justify-end items-center">
                    <span className="text-sm text-primary">
                      {errors.productName}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                name="productName"
                placeholder="Enter product name"
                className="w-1/2 border border-black shadow appearance-none rounded pl-2"
              />
            </div>
            {/* Description */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-1/2 flex justify-start items-center">
                <div className="w-1/2 flex justify-start items-center">
                  <span className="font-semibold">Description :</span>
                </div>
                {errors.description ? (
                  <div className="w-1/2 flex justify-end items-center">
                    <span className="text-sm text-primary">
                      {errors.description}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                name="description"
                placeholder="Enter description"
                className="w-1/2 border border-black shadow appearance-none rounded pl-2"
              />
            </div>
            {/* Submit */}
            <div className="w-full flex flex-col justify-start items-center">
              <div className="w-1/2 flex justify-start items-center">
                <button
                  type="submit"
                  className="w-24 h-10 text-white bg-primary rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
