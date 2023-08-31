import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SelectCustom from "../../../components/common/SelectCustom";

import createCategoryValidatorSchema from "../../../utils/validate/Category/create.category.validator.schema";

const CreateCategory = () => {
  const initialValues = {
    value: "",
    parent: "",
  };

  const categoryParentList = [
    { id: 1, title: "Cate 1" },
    { id: 2, title: "Cate 2" },
    { id: 3, title: "Cate 3" },
    { id: 4, title: "Cate 4" },
    { id: 5, title: "Cate 5" },
    { id: 6, title: "Cate 6" },
  ];

  const handleSubmitForm = (values) => {
    console.log(values);
  };
  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-white rounded p-8">
        <h2 className="text-2xl font-bold">Create Category</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={createCategoryValidatorSchema}
          onSubmit={(values) => handleSubmitForm(values)}
          className=""
        >
          {({ errors }) => (
            <Form className="w-1/2 flex flex-col justify-start items-center gap-4 p-4 bg-slate-300 rounded">
              {/* Value */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="value"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Category Name :
                  </label>
                  {errors.value ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.value}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="value"
                  name="value"
                  placeholder="Enter your new category"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.value ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {/* Category Parent List */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="parent"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Category Parent :
                  </label>
                  {errors.parent ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.parent}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="parent"
                  name="parent"
                  component={SelectCustom}
                  options={categoryParentList}
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.parent ? "outline outline-2 outline-red-500" : ""
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

export default CreateCategory;
