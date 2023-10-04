import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import changePasswordSchema from "../../utils/validate/User/change.password.validator.schema";
import { changePassword } from "../../redux/slice/user/user.slice";

import ROUTES from "../../constants/ROUTES";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : "";

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmitForm = (values) => {
    // console.log(values);
    if (userData) {
      dispatch(
        changePassword({
          changePasswordForm: values,
          userId: userData.id,
          callback: {
            goToLogin: () => navigate(ROUTES.PUBLIC.LOGIN),
          },
        })
      );
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-2 p-2 pt-12">
      <div className="w-full flex justify-center items-center">
        <span className="text-2xl font-semibold">Change Password </span>
      </div>
      <div className="w-full flex justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={(values) => handleSubmitForm(values)}
        >
          {({ errors }) => (
            <Form className="w-1/2 flex flex-col justify-start items-center gap-4">
              {/* Old password */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 flex justify-start items-center">
                    <span className="font-semibold">Old Password : </span>
                  </div>
                  {errors.oldPassword ? (
                    <div className="w-1/2 flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span>{errors.oldPassword}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full">
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Enter your old password"
                    className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                      errors.oldPassword
                        ? "outline outline-2 outline-red-500"
                        : ""
                    }`}
                  />
                </div>
              </div>
              {/* New password */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 flex justify-start items-center">
                    <span className="font-semibold">New Password : </span>
                  </div>
                  {errors.newPassword ? (
                    <div className="w-1/2 flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span>{errors.newPassword}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full">
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                      errors.newPassword
                        ? "outline outline-2 outline-red-500"
                        : ""
                    }`}
                  />
                </div>
              </div>
              {/* Confirm password */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 flex justify-start items-center">
                    <span className="font-semibold">Confirm Password : </span>
                  </div>
                  {errors.confirmPassword ? (
                    <div className="w-1/2 flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your confirm password"
                    className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                      errors.confirmPassword
                        ? "outline outline-2 outline-red-500"
                        : ""
                    }`}
                  />
                </div>
              </div>
              <div className="w-full flex justify-start items-center">
                <button
                  type="submit"
                  className="w-24 h-10 text-white bg-primary rounded"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
