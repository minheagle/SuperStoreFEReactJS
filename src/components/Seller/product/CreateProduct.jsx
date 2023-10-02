import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { TreeSelect } from "antd";

import LoadingFull from "../../common/LoadingFull";

import createProductSchema from "../../../utils/validate/Seller/product/create.product.schema.js";
import convertToTree from "../../../utils/handle/handleDataForTreeSelect.js";
import { getAllList } from "../../../redux/slice/public/category.public.slice.js";
import { createProduct } from "../../../redux/slice/seller/product.seller.slice";

const CreateProduct = ({
  product,
  handleChangeProduct,
  hasError,
  handleError,
  handleChangeHasError,
}) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.CategoryPublic.list);

  useEffect(() => {
    handleError();
    dispatch(getAllList());
  }, [product]);

  const convertData = data.length === 0 ? [] : convertToTree(data);
  const productSchema = createProductSchema(data);

  const initialValues = {
    sellerId: product.sellerId,
    categoryId: product.categoryId,
    productName: product.productName,
    description: product.description,
  };

  const handleSubmit = (values) => {
    handleChangeProduct(values);
    handleChangeHasError(false);
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
            <div className="w-full flex flex-col justify-start items-center gap-2">
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
                    defaultValue={product.categoryId}
                    placeholder="Select your category"
                    onChange={(value) => setFieldValue(field.name, value)}
                    className="w-1/2 hover:border-slate-300"
                  />
                )}
              </Field>
            </div>
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
            {hasError ? (
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
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
