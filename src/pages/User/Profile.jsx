import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-datepicker/dist/react-datepicker.css";

import AvatarUploader from "../../components/User/AvatarUploader";

import editProfileValidator from "../../utils/validate/User/edit.profile.validator.schema";
import { updateUser } from "../../redux/slice/user/user.slice";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const initialValues = {
    userName: userData?.userName ? userData.userName : "",
    fullName: userData?.fullName ? userData.fullName : "",
    email: userData?.email ? userData.email : "",
    phone: userData?.phone ? userData.phone : "",
    dateOfBirth: userData?.dateOfBirth ? userData.dateOfBirth : "",
  };

  const handleSubmitForm = (values) => {
    dispatch(
      updateUser({
        updateUserForm: values,
        userId: userData.id,
        callback: {},
      })
    );
  };

  return (
    <div className="w-full flex justify-center items-center bg-white rounded pt-4">
      <div className="w-full flex flex-col justify-start gap-4 px-8">
        <h2 className="flex justify-start items-center text-left text-2xl font-normal">
          My Profile
        </h2>
        <hr />
        <div className="w-full flex justify-center content-center">
          <div className="w-3/4">
            <Formik
              initialValues={initialValues}
              validationSchema={editProfileValidator}
              onSubmit={(values) => handleSubmitForm(values)}
            >
              {({ errors }) => (
                <Form className="w-full flex flex-col justify-start items-center gap-2 p-12">
                  {/* User Name */}
                  <div className="w-full h-24 flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-1/2 flex justify-start items-center">
                        <span className="">User Name :</span>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        {errors.userName ? (
                          <div className="w-full flex justify-end items-center gap-2 text-red-500">
                            <FontAwesomeIcon
                              icon="fas fa-info-circle"
                              className=""
                            />
                            <span className="text-sm">{errors.userName}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="userName"
                      className={`w-full h-12 text-left border-2 rounded outline-none px-2 ${
                        errors.userName ? "border-primary" : "border-black"
                      }`}
                    />
                  </div>
                  {/* Full Name */}
                  <div className="w-full h-24 flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-1/2 flex justify-start items-center">
                        <span className="">Full Name :</span>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        {errors.fullName ? (
                          <div className="w-full flex justify-end items-center gap-2 text-red-500">
                            <FontAwesomeIcon
                              icon="fas fa-info-circle"
                              className=""
                            />
                            <span className="text-sm">{errors.fullName}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="fullName"
                      className={`w-full h-12 text-left border-2 rounded outline-none px-2 ${
                        errors.fullName ? "border-primary" : "border-black"
                      }`}
                    />
                  </div>
                  {/* Email */}
                  <div className="w-full h-24 flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-1/2 flex justify-start items-center">
                        <span className="">Email :</span>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        {errors.email ? (
                          <div className="w-full flex justify-end items-center gap-2 text-red-500">
                            <FontAwesomeIcon
                              icon="fas fa-info-circle"
                              className=""
                            />
                            <span className="text-sm">{errors.email}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="email"
                      className={`w-full h-12 text-left border-2 rounded outline-none px-2 ${
                        errors.email ? "border-primary" : "border-black"
                      }`}
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="w-full h-24 flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-1/2 flex justify-start items-center">
                        <span className="">Phone Number :</span>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        {errors.phone ? (
                          <div className="w-full flex justify-end items-center gap-2 text-red-500">
                            <FontAwesomeIcon
                              icon="fas fa-info-circle"
                              className=""
                            />
                            <span className="text-sm">{errors.phone}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="phone"
                      className={`w-full h-12 text-left border-2 rounded outline-none px-2 ${
                        errors.phone ? "border-primary" : "border-black"
                      }`}
                    />
                  </div>
                  {/* Date Of Birth */}
                  <div className="w-full h-24 flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-1/2 flex justify-start items-center">
                        <span className="">Date Of Birth :</span>
                      </div>
                      <div className="w-1/2 flex justify-end items-center">
                        {errors.dateOfBirth ? (
                          <div className="w-full flex justify-end items-center gap-2 text-red-500">
                            <FontAwesomeIcon
                              icon="fas fa-info-circle"
                              className=""
                            />
                            <span className="text-sm">
                              {errors.dateOfBirth}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Field
                      name="dateOfBirth"
                      className={`w-full h-12 text-left border-2 rounded outline-none px-2 ${
                        errors.dateOfBirth ? "border-primary" : "border-black"
                      }`}
                    >
                      {({ field, form }) => {
                        const { name } = field;
                        const { setFieldValue } = form;
                        const value = field.value ? moment(field.value) : null;
                        {
                          /* console.log(field.value); */
                        }
                        return (
                          <DatePicker
                            id={name}
                            selected={value ? value.toDate() : null}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="mm/dd/yyyy"
                            onChange={(date) =>
                              setFieldValue(name, moment(date))
                            }
                            className="w-full border border-black rounded"
                          />
                        );
                      }}
                    </Field>
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Save Change
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {/* Avatar */}
          <div className="w-1/4 flex flex-col justify-start items-center pt-12">
            <AvatarUploader
              userId={userData?.id ? userData.id : null}
              value={userData?.imageUrl ? userData.imageUrl : null}
              imagePublicId={
                userData?.imgPublicId ? userData.imgPublicId : null
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
