import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  const { data } = useSelector((state) => state.Auth.information);
  return (
    <div className="w-full flex justify-center items-center bg-white rounded">
      <div className="w-full flex flex-col justify-start gap-4 px-8">
        <h2 className="flex justify-start items-center text-left text-2xl font-normal">
          My Profile
        </h2>
        <hr />
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
              <input
                type="text"
                defaultValue={data?.fullName}
                className="w-4/5 text-left border-2 border-black rounded outline-none p-2"
              />
            </div>
            <div className="w-full h-12 flex gap-4">
              <span className="w-1/5 flex justify-end items-center">Email</span>
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
          </div>
          <div className="w-1/4 flex justify-center items-center">
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <div>
                {data?.avatar ? (
                  <div className="w-24 h-24">
                    <img
                      src=""
                      alt=""
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 flex justify-center items-center bg-slate-100 rounded-full">
                    <FontAwesomeIcon
                      icon="fas fa-user"
                      className="text-4xl text-slate-300"
                    />
                  </div>
                )}
              </div>
              <button className=" bg-primary text-white rounded px-4 py-2">
                Select Image
              </button>
              <div className="flex flex-col justify-start items-start text-sm font-light">
                <span>Max size 5Mb</span>
                <span>Type support : JPEG, JPG, PNG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
