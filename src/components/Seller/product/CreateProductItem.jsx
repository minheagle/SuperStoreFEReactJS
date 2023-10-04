import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";

import ImageUploader from "../../Admin/ImageUploader";
import OptionForProduct from "../../Admin/OptionForProduct";

import createProductItemValidatorSchema from "../../../utils/validate/Seller/product/create.product.item.schema";

const CreateProductItem = ({
  productItem,
  handleChangeProductItem,
  hasError,
  handleError,
  handleChangeHasError,
}) => {
  const [createOption, setCreateOption] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [items, setItems] = useState(productItem ? productItem : []);
  const [resetImage, setResetImage] = useState(false);
  const [resetOptions, setResetOptions] = useState(false);

  useEffect(() => {
    handleError();
  }, []);

  const handleToggleResetImage = (value) => {
    setResetImage(value);
  };

  const handleToggleResetOptions = (value) => {
    setResetOptions(value);
  };

  const initialValuesWithOption = {
    price: "",
    qtyInStock: "",
    imgProductFile: "",
    optionTypeRequestList: "",
  };

  const handleAddOptionView = (value) => {
    setCreateOption(value);
  };

  const handleConfirm = () => {
    handleChangeProductItem(items);
    handleChangeHasError(false);
  };

  const handleOnSubmitForm = (values) => {
    // console.log(values);

    setItems([...items, values]);
    setAddMore(true);
  };

  const handleRenderImageForItem = (value) => {
    return value ? (
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <span className="w-full flex justify-start items-center pl-2 font-semibold">
          Images :
        </span>
        <div className="w-full">
          {value?.map((item, index) => {
            return (
              <div
                key={index}
                className="w-1/4 flex justify-center items-center flex-wrap p-2"
              >
                <div className="w-full border border-slate-400 p-2 rounded">
                  <img src={URL.createObjectURL(item)} alt="" className="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      ""
    );
  };

  const handleRenderOptionForItem = (value) => {
    return value ? (
      <div className="w-full flex flex-col justify-start items-center gap-2 p-2">
        <span className="w-full flex justify-start items-center pl-2 font-semibold">
          Options :
        </span>
        <div className="w-full flex flex-col justify-start items-center gap-2">
          {value?.map((item, index) => {
            return (
              <div
                key={index}
                className="w-1/2 flex justify-center items-center border border-slate-400 rounded"
              >
                <span className="w-1/2 flex justify-end items-center pr-2 font-semibold">
                  {item.optionName} :
                </span>
                <span className="w-1/2 flex justify-start items-center pl-2">
                  {item.optionValueRequest}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      ""
    );
  };

  const handleRenderItems = () => {
    return items?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-1/2 flex justify-center content-stretch p-2"
          style={{ maxHeight: "100%" }}
        >
          <div className="w-full flex flex-col justify-start items-center border border-slate-500 rounded">
            <div className="w-full flex justify-center items-center">
              <div className="w-1/2 flex justify-start items-center gap-2 pl-2">
                <span className="font-semibold">Price :</span>
                <span>{item.price}</span>
              </div>
              <div className="w-1/2 flex justify-start items-center gap-2 pl-2">
                <span className="font-semibold">Quantity Stock :</span>
                <span>{item.qtyInStock}</span>
              </div>
            </div>
            <div className="w-full">
              {handleRenderImageForItem(item.imgProductFile)}
            </div>
            <div className="w-full">
              {handleRenderOptionForItem(item.optionTypeRequestList)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Formik
        initialValues={initialValuesWithOption}
        validationSchema={createProductItemValidatorSchema(createOption)}
        onSubmit={(values) => handleOnSubmitForm(values)}
      >
        {({ errors, resetForm }) => (
          <Form className="w-full flex justify-center items-center">
            <div className="w-1/2 flex flex-col justify-start items-center gap-4">
              {/* Price */}
              <div className="w-full">
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 flex justify-start items-center">
                    <span className="font-semibold">Price :</span>
                  </div>
                  {errors.price ? (
                    <div className="w-1/2 flex justify-end items-center">
                      <span className="text-sm text-primary">
                        {errors.price}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="number"
                  name="price"
                  className="w-full border border-black shadow appearance-none rounded pl-2"
                />
              </div>
              {/* Quantity Stock */}
              <div className="w-full">
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 flex justify-start items-center">
                    <span className="font-semibold">Quantity Stock :</span>
                  </div>
                  {errors.qtyInStock ? (
                    <div className="w-1/2 flex justify-end items-center">
                      <span className="text-sm text-primary">
                        {errors.qtyInStock}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="number"
                  min={0}
                  name="qtyInStock"
                  className="w-full border border-black shadow appearance-none rounded pl-2"
                />
              </div>
              <div className="w-full">
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 flex justify-start items-center">
                    <span className="font-semibold">Images :</span>
                  </div>
                  {errors.imgProductFile ? (
                    <div className="w-1/2 flex justify-end items-center">
                      <span className="text-sm text-primary">
                        {errors.imgProductFile}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  name="imgProductFile"
                  component={ImageUploader}
                  resetImage={resetImage}
                  handleToggleResetImage={handleToggleResetImage}
                  className="w-full border border-black shadow appearance-none rounded pl-2"
                />
              </div>
              {/* optionTypeRequestList */}
              {createOption ? (
                <div className="w-full">
                  <div className="w-full flex justify-start items-center">
                    <div className="w-1/2 flex justify-start items-center">
                      <span className="font-semibold">Options :</span>
                    </div>
                    {errors.optionTypeRequestList ? (
                      <div className="w-1/2 flex justify-end items-center">
                        <span className="text-sm text-primary">
                          {errors.optionTypeRequestList}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Field
                    name="optionTypeRequestList"
                    component={OptionForProduct}
                    resetOptions={resetOptions}
                    handleToggleResetOptions={handleToggleResetOptions}
                    className="w-full border border-black shadow appearance-none rounded pl-2"
                  />
                </div>
              ) : (
                ""
              )}
              {/* Submit */}
              <div className="w-full flex justify-start items-center">
                {hasError ? (
                  addMore ? (
                    <>
                      <div className="w-1/2 flex justify-start items-center">
                        <button
                          type="submit"
                          onClick={() => {
                            resetForm();
                            setAddMore(false);
                            handleToggleResetImage(true);
                            handleToggleResetOptions(true);
                          }}
                          className="w-24 h-10 text-white bg-primary rounded"
                        >
                          Add more ?
                        </button>
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        <button
                          type="button"
                          onClick={() => handleConfirm()}
                          className="w-24 h-10 text-white bg-primary rounded"
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  ) : createOption ? (
                    <>
                      <div className="w-1/2 flex justify-start items-center">
                        <button
                          type="submit"
                          className="w-24 h-10 text-white bg-primary rounded"
                        >
                          Add
                        </button>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        <button
                          type="button"
                          onClick={() => handleAddOptionView(false)}
                          className="w-36 h-10 text-white bg-red-600 rounded"
                        >
                          Delete option ?
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 flex justify-start items-center">
                        <button
                          type="submit"
                          className="w-24 h-10 text-white bg-primary rounded"
                        >
                          Add
                        </button>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        <button
                          type="button"
                          onClick={() => handleAddOptionView(true)}
                          className="w-36 h-10 text-white bg-primary rounded"
                        >
                          Add option ?
                        </button>
                      </div>
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="w-full flex justify-start items-center flex-wrap">
        {handleRenderItems()}
      </div>
    </div>
  );
};

export default CreateProductItem;
