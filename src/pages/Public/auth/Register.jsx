import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ROUTES from "../../../constants/ROUTES";
import validatorSchema from "../../../utils/validate/Auth/register.validator.schema";
import { register } from "../../../redux/slice/auth.slice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.Auth.register);

  const [displayError, setDisplayError] = useState(true);

  const initialValues = {
    userName: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const handleOnChangeField = (setFieldValue, e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFieldValue(fieldName, fieldValue);
    if (error) {
      setDisplayError(false);
    }
  };

  const handleErrorFromApi = (fieldName) => {
    if (error) {
      const errorObject = error?.find((item) => item?.field === fieldName);
      return errorObject?.message;
    }
  };

  const handleErrorFieldFromApi = (fieldName) => {
    if (error) {
      console.log(error);
      // const errorObject = error?.find((item) => item?.field === fieldName);
      // if (errorObject) {
      //   return true;
      // }
    }
    return false;
  };

  const handleSubmitFormRegister = (values) => {
    dispatch(
      register({
        data: values,
        callback: {
          goToLogin: () => navigate(ROUTES.PUBLIC.LOGIN),
        },
      })
    );
    setDisplayError(true);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 pt-4">
      <div className="w-1/2 flex flex-col justify-start items-center gap-4 p-8 bg-slate-100 border rounded">
        <h2 className="text-2xl text-primary">Welcome to Super Store</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validatorSchema}
          onSubmit={(values) => handleSubmitFormRegister(values)}
          className="w-full flex flex-col justify-start items-center gap-4"
        >
          {({ errors, setFieldValue }) => (
            <Form className="w-full flex flex-col justify-normal items-center gap-4">
              {/* Username */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="userName"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    User Name :
                  </label>
                  {errors.userName ||
                  (displayError ? handleErrorFieldFromApi("userName") : "") ? (
                    <div className="w-full flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">
                        {errors.userName ||
                          (displayError ? handleErrorFromApi("userName") : "")}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter your user name"
                  onChange={(e) => handleOnChangeField(setFieldValue, e)}
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.userName ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
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
                    <div className="w-full flex justify-end items-center gap-2 text-primary">
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
                    Phone :
                  </label>
                  {errors.phone ||
                  (displayError ? handleErrorFieldFromApi("phone") : "") ? (
                    <div className="w-full flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">
                        {errors.phone ||
                          (displayError ? handleErrorFromApi("phone") : "")}
                      </span>
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
              {/* Email */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="email"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Email :
                  </label>
                  {errors.email ||
                  (displayError ? handleErrorFieldFromApi("email") : "") ? (
                    <div className="w-full flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">
                        {errors.email ||
                          (displayError ? handleErrorFromApi("email") : "")}
                      </span>
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
                    <div className="w-full flex justify-end items-center gap-2 text-primary">
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
              {/* Re-password */}
              <div className="w-full flex flex-col justify-start items-center gap-2">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="rePassword"
                    className="w-full flex justify-start items-center font-semibold"
                  >
                    Re-Password :
                  </label>
                  {errors.rePassword ? (
                    <div className="w-full flex justify-end items-center gap-2 text-primary">
                      <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                      <span className="text-sm">{errors.rePassword}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Field
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  placeholder="Enter your re-password"
                  className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                    errors.rePassword ? "outline outline-2 outline-red-500" : ""
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-24 h-10 flex justify-center items-center gap-2 text-white bg-primary rounded"
              >
                {loading ? (
                  <div>
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-gray-200 animate-spin fill-primary"
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
                <span>Register</span>
              </button>
            </Form>
          )}
        </Formik>
        <hr className="w-full border border-primary" />
        <Link to={ROUTES.PUBLIC.LOGIN}>
          <button className="w-24 h-10 text-white bg-primary rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
