import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createUser } from "../../../redux/slice/admin/userForAdmin.slice";
import SelectCustom from "../../../components/common/SelectCustom";

import createUserValidatorSchema from "../../../utils/validate/User/create.user.validator.schema";

const CreateUser = () => {
  const dispatch = useDispatch();
  const initialValues = {
    fullName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    re_password: "",
    role: "",
  };

  const roleList = [
    { id: 1, title: "Admin" },
    { id: 2, title: "Manager" },
    { id: 3, title: "Staff" },
    { id: 4, title: "User" },
  ];

  const handleOnSubmitForm = (values) => {
    dispatch(createUser(values));
  };
  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 p-8 bg-white rounded">
        <h2 className="text-2xl font-bold">Create User</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={createUserValidatorSchema}
          onSubmit={(values) => handleOnSubmitForm(values)}
          className=""
        >
          {({ errors }) => (
            <Form className="w-1/2 flex flex-col justify-start items-center gap-4 p-4 bg-slate-300 rounded">
              {/* Full Name */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="fullName"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Full Name :
                  </label>
                  {errors.fullName ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.fullName}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.fullName ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {/* Phone */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="phone"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Phone Number :
                  </label>
                  {errors.phone ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.phone}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.phone ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {/* Address */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="address"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Address :
                  </label>
                  {errors.address ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.address}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.address ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {/* Email  */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="email"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Email :
                  </label>
                  {errors.email ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.email}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.email ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {/* Password */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Password :
                  </label>
                  {errors.password ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.password}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.password ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              {/* Re_password */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="re_password"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Re_Password :
                  </label>
                  {errors.re_password ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.re_password}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="password"
                  id="re_password"
                  name="re_password"
                  placeholder="Enter your re_password"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.re_password
                      ? "outline outline-2 outline-red-500"
                      : ""
                  }`}
                />
              </div>
              {/* Role */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="role"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Role :
                  </label>
                  {errors.role ? (
                    <div className="w-full flex justify-end items-center gap-2 text-red-500">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.role}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="role"
                  name="role"
                  component={SelectCustom}
                  options={roleList}
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.role ? "outline outline-2 outline-red-500" : ""
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

export default CreateUser;
