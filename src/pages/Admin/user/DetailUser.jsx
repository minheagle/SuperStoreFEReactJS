import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";

import EmptyResult from "../../../components/common/EmptyResult";

import { getUserDetail } from "../../../redux/slice/admin/userForAdmin.slice";

const DetailUser = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { data, loading, error } = useSelector(
    (state) => state.UserForAdmin.detail
  );

  useEffect(() => {
    dispatch(
      getUserDetail({
        userName: state.userName,
      })
    );
  }, [state.userName]);

  const userInfo = {
    id: data?.id ? data.id : "",
    fullName: data?.fullName ? data.fullName : "",
    address: data?.address ? data.address : "",
    email: data?.email ? data.email : "",
    phone: data?.phone ? data.phone : "",
    role: data?.role ? data.role : "",
    joinedTime: data?.createdAt
      ? moment(data.createdAt).format("HH:mm:ss DD-MM-YYYY")
      : "",
    isActive: data?.isActive ? data.isActive : false,
    isBlocked: data?.isBlocked ? data.isBlocked : false,
    isBanned: data?.isBanned ? data.isBanned : false,
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full bg-white p-8 rounded">
        <div className="w-full flex justify-start items-center">
          <div className="w-1/3 p-4">
            <div>
              <img
                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-avatar-ff-ngau-nam-584x560.jpg"
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex-1 flex justify-start content-start border-2 border-slate-500 rounded">
            <div className="w-2/3 flex flex-col justify-start items-center gap-8 p-8 border-r-2 border-slate-500">
              <h2 className="text-xl font-semibold underline decoration-1">
                User Information
              </h2>
              <div className="w-full flex flex-col justify-start items-center gap-4">
                <div className="w-full flex justify-start items-center gap-4">
                  <h3 className="w-1/3 font-medium">Full Name : </h3>
                  <span className="flex-1">{userInfo.fullName}</span>
                </div>
                {/* <div className="w-full flex justify-start items-center gap-4">
                  <h3 className="w-1/3 font-medium">Address : </h3>
                  <span className="flex-1">{userInfo.address}</span>
                </div> */}
                <div className="w-full flex justify-start items-center gap-4">
                  <h3 className="w-1/3 font-medium">Phone : </h3>
                  <span className="flex-1">{userInfo.phone}</span>
                </div>
                <div className="w-full flex justify-start items-center gap-4">
                  <h3 className="w-1/3 font-medium">Email : </h3>
                  <span className="flex-1">{userInfo.email}</span>
                </div>
                <div className="w-full flex justify-start items-center gap-4">
                  <h3 className="w-1/3 font-medium">Role : </h3>
                  <span className="flex-1">{userInfo.role}</span>
                </div>
                <div className="w-full flex justify-start items-center gap-4">
                  <h3 className="w-1/3 font-medium">Joined Date : </h3>
                  <span className="flex-1">{userInfo.joinedTime}</span>
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col justify-start items-center gap-8 p-8">
              <h3 className="text-xl font-semibold underline decoration-1">
                Actions
              </h3>
              <div className="w-full flex flex-col justify-start items-center gap-4">
                <div className="w-full flex justify-between items-center">
                  <div className="">
                    <span className="font-medium">Blocked Account</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={userInfo.isBlocked}
                      checked={userInfo.isBlocked}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="">
                    <span className="font-medium">Active Account</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={userInfo.isActive}
                      checked={userInfo.isActive}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="">
                    <span className="font-medium">Banned Account</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={userInfo.isBanned}
                      checked={userInfo.isBanned}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start content-start gap-4">
          <div className="w-1/3 flex flex-col justify-start items-center border-2 border-slate-500 rounded">
            <h3 className="text-xl font-semibold">Actions</h3>
          </div>
          <div className="w-1/3 flex flex-col justify-start items-center border-2 border-slate-500 rounded">
            <h3 className="text-xl font-semibold">Actions</h3>
            <div className="w-full flex justify-normal items-center p-2">
              <EmptyResult title="No information" />
            </div>
          </div>
          <div className="w-1/3 flex flex-col justify-start items-center border-2 border-slate-500 rounded">
            <h3 className="text-xl font-semibold">Actions</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
