import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, generatePath } from "react-router-dom";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getProductItemDetail } from "../../../redux/slice/seller/product.seller.slice";
import updateProductItemWithoutImageSchema from "../../../utils/validate/Seller/product/update.product.item.schema";
import ROUTES from "../../../constants/ROUTES";

import LoadingFull from "../../../components/common/LoadingFull";

const EditProductItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopName, productId, productItemId } = useParams();

  const { data, loading } = useSelector(
    (state) => state.ProductSeller.get_item_detail
  );

  console.log(data);

  useEffect(() => {
    dispatch(getProductItemDetail({ productId, productItemId }));
  }, [productId, productItemId]);

  const initialValues = {
    price: data?.price,
    qtyInStock: data?.qtyInStock,
    status: false,
    imageProductList: [],
    optionTypes: data?.optionTypes,
    pitemId: 0,
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  if (loading) {
    return <LoadingFull />;
  }

  return (
    <div className="w-full flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={updateProductItemWithoutImageSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, values }) => (
          <Form className="w-3/5 flex flex-col justify-start items-center gap-4 border border-slate-300 rounded p-4">
            {/* Price */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-center items-center">
                <div className="w-1/2">
                  <span className="font-semibold">Price :</span>
                </div>
                <div className="w-1/2 flex justify-end items-center gap-4 text-red-600">
                  {errors.price ? (
                    <>
                      <FontAwesomeIcon icon="fas fa-info-circle" />
                      <span>{errors.price}</span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Field
                name="price"
                className={`w-full outline-none border rounded pl-1 ${
                  errors.price ? "border-red-600" : "border-slate-300"
                }`}
              />
            </div>
            {/* Quantity Stock */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-center items-center">
                <div className="w-1/2">
                  <span className="font-semibold">Quantity Stock :</span>
                </div>
                <div className="w-1/2 flex justify-end items-center gap-4 text-red-600">
                  {errors.qtyInStock ? (
                    <>
                      <FontAwesomeIcon icon="fas fa-info-circle" />
                      <span>{errors.qtyInStock}</span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Field
                name="qtyInStock"
                className={`w-full outline-none border rounded pl-1 ${
                  errors.qtyInStock ? "border-red-600" : "border-slate-300"
                }`}
              />
            </div>
            <FieldArray name="optionTypes">
              {({ push, remove }) => (
                <div>
                  {values?.optionTypes?.map((option, index) => (
                    <div key={index}>
                      <button type="button" onClick={() => remove(index)}>
                        Remove Option
                      </button>
                      <div>
                        <label htmlFor={`optionTypes.${index}.opTypeId`}>
                          Option Type ID:
                        </label>
                        <Field
                          type="number"
                          id={`optionTypes.${index}.opTypeId`}
                          name={`optionTypes.${index}.opTypeId`}
                        />
                        <ErrorMessage
                          name={`optionTypes.${index}.opTypeId`}
                          component="div"
                        />
                      </div>
                      <div>
                        <label htmlFor={`optionTypes.${index}.optionName`}>
                          Option Name:
                        </label>
                        <Field
                          type="text"
                          id={`optionTypes.${index}.optionName`}
                          name={`optionTypes.${index}.optionName`}
                        />
                        <ErrorMessage
                          name={`optionTypes.${index}.optionName`}
                          component="div"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`optionTypes.${index}.optionValue.opValueId`}
                        >
                          Option Value ID:
                        </label>
                        <Field
                          type="number"
                          id={`optionTypes.${index}.optionValue.opValueId`}
                          name={`optionTypes.${index}.optionValue.opValueId`}
                        />
                        <ErrorMessage
                          name={`optionTypes.${index}.optionValue.opValueId`}
                          component="div"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`optionTypes.${index}.optionValue.valueName`}
                        >
                          Value Name:
                        </label>
                        <Field
                          type="text"
                          id={`optionTypes.${index}.optionValue.valueName`}
                          name={`optionTypes.${index}.optionValue.valueName`}
                        />
                        <ErrorMessage
                          name={`optionTypes.${index}.optionValue.valueName`}
                          component="div"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        opTypeId: 0,
                        optionName: "",
                        optionValue: { opValueId: 0, valueName: "" },
                      })
                    }
                  >
                    Add Option
                  </button>
                </div>
              )}
            </FieldArray>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductItem;
