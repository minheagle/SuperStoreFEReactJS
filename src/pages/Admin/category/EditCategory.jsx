import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoryImageUploader from "../../../components/Admin/category/CategoryImageUploader";
import ImageCategory from "./ImageCategory";
import LoadingFull from "../../../components/common/LoadingFull";

import updateCategoryValidatorSchema from "../../../utils/validate/Category/update.category.validator.schema";
import {
  getDetailCategory,
  updateCategory,
} from "../../../redux/slice/admin/category.slice";
import ROUTES from "../../../constants/ROUTES";

const EditCategory = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, update } = useSelector((state) => state.Category);
  const [changeImage, setChangeImage] = useState(false);
  const [displayCancelButton, setDisplayCancelButton] = useState(true);

  useEffect(() => {
    dispatch(getDetailCategory(state.categoryId));
  }, [state.categoryId]);

  const initialValues = {
    content: detail?.data?.content,
    imageUrl: detail?.data?.imageUrl,
    file: "",
  };

  const handleOnChangeImage = (value) => {
    setChangeImage(value);
  };

  const handleOnChangeDisplayCancelButton = (value) => {
    setDisplayCancelButton(value);
  };

  const handleFormData = (values) => {
    const formData = new FormData();
    formData.append("id", detail.data.id);
    formData.append("content", values.content);
    formData.append("imagePublicId", detail.data.imagePublicId);
    formData.append("file", values.file);
    return formData;
  };

  const handleSubmitForm = (values) => {
    if (values.file) {
      const form = handleFormData(values);
      dispatch(
        updateCategory({
          data: form,
          categoryId: detail.data.id,
          hasImage: true,
          callback: {
            goToList: () => navigate(ROUTES.ADMIN.CATEGORIES.LIST),
          },
        })
      );
    } else {
      dispatch(
        updateCategory({
          data: {
            id: detail.data.id,
            content: values.content,
          },
          categoryId: detail.data.id,
          hasImage: false,
          callback: {
            goToList: () => navigate(ROUTES.ADMIN.CATEGORIES.LIST),
          },
        })
      );
    }
  };

  if (detail.loading) {
    return <LoadingFull />;
  }

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-white rounded p-8">
        <h2 className="text-2xl font-bold">Edit Category</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={updateCategoryValidatorSchema}
          onSubmit={(values) => handleSubmitForm(values)}
          className=""
        >
          {({ errors }) => (
            <Form className="w-1/2 flex flex-col justify-start items-center gap-4 p-4 bg-slate-300 rounded">
              {/* Content */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="content"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Category Name :
                  </label>
                  {errors.content ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.content}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="content"
                  name="content"
                  placeholder="Enter your new category name"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.content ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {!changeImage ? (
                <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-between items-center">
                    <label
                      htmlFor="imageUrl"
                      className="w-full flex justify-start items-center font-semibold"
                    >
                      Image :
                    </label>
                  </div>
                  <Field
                    id="imageUrl"
                    name="imageUrl"
                    component={ImageCategory}
                    handleOnChangeImage={handleOnChangeImage}
                    className="w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2"
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-between items-center">
                    <label
                      htmlFor="file"
                      className="w-full flex justify-start items-center font-semibold"
                    >
                      Image Upload :
                    </label>
                    {errors.file ? (
                      <div className="w-full flex justify-end items-center gap-2 text-red-500">
                        <FontAwesomeIcon
                          icon="fas fa-info-circle"
                          className=""
                        />
                        <span className="text-sm">{errors.file}</span>
                      </div>
                    ) : (
                      <>
                        {displayCancelButton ? (
                          <div className="bg-red-600 rounded">
                            <button
                              onClick={() => handleOnChangeImage(false)}
                              className="text-white bg-red-600 py-1 px-2 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                  <Field
                    type="text"
                    id="file"
                    name="file"
                    component={CategoryImageUploader}
                    handleOnChangeDisplayCancelButton={
                      handleOnChangeDisplayCancelButton
                    }
                    className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                      errors.file ? "outline outline-2 outline-red-500" : ""
                    }`}
                  />
                </div>
              )}
              {/* Submit */}
              <button
                type="submit"
                className="w-20 h-8 flex justify-center items-center gap-2 text-white bg-slate-500 rounded"
              >
                {update.loading ? (
                  <div>
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-gray-200 animate-spin fill-slate-500"
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
                <span>Submit</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCategory;
