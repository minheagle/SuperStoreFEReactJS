import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import ReactStar from "react-rating-star-with-type";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import createRatingValidator from "../../../utils/validate/User/create.rating.validator.schema";
import { createRating } from "../../../redux/slice/user/rating.user.slice";

import ImageUploader from "../../Admin/ImageUploader";

const ModalRating = ({ isOpen, setIsOpenModal, data, orderId }) => {
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const [resetImage, setResetImage] = useState(false);

  const handleToggleResetImage = (value) => {
    setResetImage(value);
  };

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const initialValues = {
    orderId: orderId,
    userId: userData?.id,
    productId: data?.product?.productId,
    voteStar: 5,
    comment: "",
    imageProductReviewFile: null,
  };

  const handleFormData = (values) => {
    const formData = new FormData();
    formData.append("orderId", values?.orderId);
    formData.append("userId", values?.userId);
    formData.append("productId", values?.productId);
    formData.append("voteStar", values?.voteStar);
    formData.append("comment", values?.comment);
    values?.imageProductReviewFile?.forEach((file, index) => {
      formData.append(`imageProductReviewFile[${index}]`, file);
    });

    return formData;
  };

  const handleOnSubmit = (values) => {
    if (values.orderId && values.userId && values.productId) {
      // console.log(values);
      dispatch(
        createRating({
          productReviewRequest: handleFormData(values),
          callback: {
            notification: (message) => notify(message),
            closeModal: () => setIsOpenModal(false),
          },
        })
      );
    }
  };

  return isOpen ? (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen flex justify-center items-center my-auto bg-slate-300 bg-opacity-50">
      <div className="relative w-1/2 max-h-[400px] bg-white rounded overflow-auto touch-auto">
        <div className="sticky top-0 right-0 w-full flex justify-end items-center">
          <button
            onClick={() => setIsOpenModal(false)}
            className="flex justify-center items-center text-red-600"
          >
            <FontAwesomeIcon icon="fas fa-window-close" className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full flex flex-col justify-start items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={createRatingValidator}
            onSubmit={(values) => handleOnSubmit(values)}
          >
            {({ errors }) => (
              <Form className="w-2/3 flex flex-col justify-start items-center gap-2 p-4">
                {/* Star */}
                <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-center items-center">
                    <div className="w-1/2 flex justify-start items-center">
                      <span className="font-medium">Star : </span>
                    </div>
                    <div className="w-1/2 flex justify-end items-center">
                      {errors.voteStar ? (
                        <div className="w-full flex justify-end items-center gap-2 text-red-600">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">{errors.voteStar}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <Field
                    name="voteStar"
                    className={`w-full h-12 text-left border-2 rounded outline-none px-2 ${
                      errors.voteStar ? "border-primary" : "border-black"
                    }`}
                  >
                    {({ field, form }) => {
                      const { name, value } = field;
                      const { setFieldValue } = form;
                      return (
                        <div className="w-full">
                          <ReactStar
                            onChange={(value) => setFieldValue(name, value)}
                            count={5}
                            value={value}
                            isEdit={true}
                            // activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
                            activeColor="#FFCE00"
                            size={24}
                          />
                        </div>
                      );
                    }}
                  </Field>
                </div>
                {/* Comment */}
                <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-center items-center">
                    <div className="w-1/2 flex justify-start items-center">
                      <span className="font-medium">Comment : </span>
                    </div>
                    <div className="w-1/2 flex justify-end items-center">
                      {errors.comment ? (
                        <div className="w-full flex justify-end items-center gap-2 text-red-600">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">{errors.comment}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <Field
                    type="text"
                    name="comment"
                    className={`w-full h-8 text-left border-2 rounded outline-none px-2 ${
                      errors.comment ? "border-red-600" : "border-black"
                    }`}
                  />
                </div>
                {/* Image Product Review File */}
                <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-center items-center">
                    <div className="w-1/2 flex justify-start items-center">
                      <span className="font-medium">
                        Image Product Review :
                      </span>
                    </div>
                    <div className="w-1/2 flex justify-end items-center">
                      {errors.imageProductReviewFile ? (
                        <div className="w-full flex justify-end items-center gap-2 text-red-600">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">
                            {errors.imageProductReviewFile}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <Field
                    name="imageProductReviewFile"
                    component={ImageUploader}
                    resetImage={resetImage}
                    handleToggleResetImage={handleToggleResetImage}
                    className={`w-full text-left border-2 rounded outline-none px-2 ${
                      errors.imageProductReviewFile
                        ? "border-red-600"
                        : "border-black"
                    }`}
                  />
                </div>
                {/* Submit */}
                <div className="w-full flex justify-start items-center">
                  <button
                    type="submit"
                    className="px-2 py-1 bg-primary text-white rounded"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalRating;
