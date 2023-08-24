import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createProduct } from "../../../redux/slice/admin/product.slice";
import createProductValidator from "../../../utils/validate/create.product.validator.schema";

import ImageUploader from "../../../components/Admin/ImageUploader";
import SelectCustom from "../../../components/common/SelectCustom";
import OptionForProduct from "../../../components/Admin/OptionForProduct";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const initialValues = {
    productName: "",
    category: "",
    basePrice: "",
    isNew: false,
    options: [],
    images: [],
    descriptions: "",
  };

  const handleFormData = (values) => {
    const formData = new FormData();

    formData.append("productName", values.productName);
    formData.append("basePrice", values.basePrice);
    formData.append("isNew", values.isNew);
    formData.append("options", values.options);
    values.images.map((item) => {
      formData.append("images", item);
    });
    formData.append("descriptions", values.descriptions);
    return formData;
  };

  const handleSubmitForm = (values) => {
    const createProductFormData = handleFormData(values);
    dispatch(createProduct(createProductFormData));
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-white rounded p-8">
        <h2 className="text-2xl font-bold">Create Product</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={createProductValidator}
          onSubmit={(values) => handleSubmitForm(values)}
          className="w-1/2 flex flex-col justify-center items-center"
        >
          {({ errors }) => (
            <Form className="w-1/2 flex flex-col justify-start items-center gap-4 p-4 bg-slate-300 rounded">
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="productName"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Product Name :
                  </label>
                  {errors.productName ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.productName}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Enter your product name"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.productName
                      ? "outline outline-2 outline-red-500"
                      : ""
                  }`}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="category"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Category :
                  </label>
                  {errors.category ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.category}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="category"
                  name="category"
                  component={SelectCustom}
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.category ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="basePrice"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Base Price :
                  </label>
                  {errors.basePrice ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.basePrice}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="basePrice"
                  name="basePrice"
                  placeholder="Enter your base price"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.basePrice ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="isNew"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Is new :
                  </label>
                  {errors.isNew ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.isNew}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full flex justify-start items-center">
                  <Field
                    type="checkbox"
                    id="isNew"
                    name="isNew"
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="options"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Options :
                  </label>
                  {errors.options ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.options}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  id="options"
                  name="options"
                  component={OptionForProduct}
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.options ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="images"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Upload Images :
                  </label>
                  {!Array.isArray(errors.images) && errors.images ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.images}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  id="images"
                  name="images"
                  component={ImageUploader}
                  className={`w-full ${
                    errors.images ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="descriptions"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Descriptions :
                  </label>
                  {errors.descriptions ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.descriptions}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="descriptions"
                  name="descriptions"
                  placeholder="Enter your descriptions"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.descriptions
                      ? "outline outline-2 outline-red-500"
                      : ""
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-20 h-8 text-white bg-slate-500 rounded"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
