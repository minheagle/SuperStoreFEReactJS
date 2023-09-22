import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AvatarUploader from "../../components/User/AvatarUploader";

import editProfileValidator from "../../utils/validate/User/edit.profile.validator.schema";

const Profile = () => {
  const { data } = useSelector((state) => state.Auth.information);

  const initialValues = {
    fullName: data?.fullName ? data.fullName : "",
    gender: data?.gender ? data.gender : "",
    dateOfBirth: data?.dateOfBirth ? data.dateOfBirth : "",
    avatar: data?.avatar ? data.avatar : "",
  };

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full flex justify-center items-center bg-white rounded pt-4">
      <div className="w-full flex flex-col justify-start gap-4 px-8">
        <h2 className="flex justify-start items-center text-left text-2xl font-normal">
          My Profile
        </h2>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={editProfileValidator}
          onSubmit={(values) => handleSubmitForm(values)}
          className=""
        >
          {({ errors, values }) => (
            <Form>
              <div className="w-full flex justify-center content-center">
                <div className="w-3/4 flex flex-col justify-start items-center gap-4">
                  <div className="w-full h-12 flex gap-4">
                    <span className="w-1/5 flex justify-end items-center">
                      User Name
                    </span>
                    <span className="w-4/5 flex justify-start items-center">
                      {data?.fullName}
                    </span>
                  </div>
                  <div className="w-full h-12 flex justify-start content-center gap-4">
                    <span className="w-1/5 flex justify-end items-center">
                      Full Name
                    </span>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={initialValues.fullName}
                      className="w-4/5 text-left border-2 border-black rounded outline-none p-2"
                    />
                  </div>
                  <div className="w-full h-12 flex gap-4">
                    <span className="w-1/5 flex justify-end items-center">
                      Email
                    </span>
                    <span className="w-4/5 flex justify-start items-center">
                      {data?.email}
                    </span>
                  </div>
                  <div className="w-full h-12 flex gap-4">
                    <span className="w-1/5 flex justify-end items-center">
                      Phone Number
                    </span>
                    <span className="w-4/5 flex justify-start items-center">
                      {data?.phone}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Save Change
                  </button>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <div className="w-full flex flex-col justify-start items-center gap-4">
                    <Field
                      id="avatar"
                      name="avatar"
                      component={AvatarUploader}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
