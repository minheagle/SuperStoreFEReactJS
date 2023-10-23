import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { ToastContainer, toast } from "react-toastify";

import { addAddress } from "../../../redux/slice/user/user.slice";
import ROUTES from "../../../constants/ROUTES";

import SelectProvince from "../../../components/User/SelectProvince";
import SelectDistrict from "../../../components/User/SelectDistrict";
import SelectWard from "../../../components/User/SelectWard";
import InputAddress from "../../../components/User/InputAddress";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const [current, setCurrent] = useState(0);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [address, setAddress] = useState(null);
  const [hasError, setHasError] = useState(false);

  const steps = [
    {
      title: "Province",
      description: "Select your province",
      content: () => (
        <SelectProvince
          province={province}
          handleOnChangeProvince={handleOnChangeProvince}
          handleError={handleError}
        />
      ),
    },
    {
      title: "District",
      description: "Select your district",
      content: () => (
        <SelectDistrict
          province={province}
          district={district}
          handleOnChangeDistrict={handleOnChangeDistrict}
          handleError={handleError}
        />
      ),
    },
    {
      title: "Ward",
      description: "Select your ward",
      content: () => (
        <SelectWard
          district={district}
          ward={ward}
          handleOnChangeWard={handleOnChangeWard}
          handleError={handleError}
        />
      ),
    },
    {
      title: "Address",
      description: "Input your address",
      content: () => (
        <InputAddress
          address={address}
          handleOnChangeAddress={handleOnChangeAddress}
          handleError={handleError}
        />
      ),
    },
  ];

  const handleOnChangeProvince = (value) => {
    setProvince(value);
  };

  const handleOnChangeDistrict = (value) => {
    setDistrict(value);
  };

  const handleOnChangeWard = (value) => {
    setWard(value);
  };

  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };

  const handleError = () => {
    switch (current) {
      case 0:
        if (!province) {
          setHasError(true);
        } else {
          setHasError(false);
        }
        break;
      case 1:
        if (!district) {
          setHasError(true);
        } else {
          setHasError(false);
        }
        break;
      case 2:
        if (!ward) {
          setHasError(true);
        } else {
          setHasError(false);
        }
        break;
      case 3:
        if (!address) {
          setHasError(true);
        } else {
          setHasError(false);
        }
        break;
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const checkExistsAddress = (address) => {
    let check = false;
    userData?.address?.forEach((item) => {
      if (item?.addressName === address) {
        check = true;
      }
    });
    return check;
  };

  const handleDone = () => {
    const userAddress = `${address}, ${JSON.parse(ward).name}, ${
      JSON.parse(district).name
    }, ${JSON.parse(province).name}`;
    if (checkExistsAddress(userAddress)) {
      notify("Address is exists !");
      navigate(ROUTES.USER.ACCOUNT.ADDRESS);
    } else {
      dispatch(
        addAddress({
          addressString: userAddress,
          userId: userData.id,
          callback: {
            goToAddress: () => navigate(ROUTES.USER.ACCOUNT.ADDRESS),
            notification: (message) => notify(message),
          },
        })
      );
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-24">
      <div className="w-full flex flex-col justify-start items-center gap-4 bg-white border border-slate-400 p-4 rounded">
        <Steps current={current} items={items} className="w-full pt-4" />
        <div className="w-full">{steps[current].content()}</div>
        <div className="w-full flex justify-start items-center gap-4">
          {current < steps.length - 1 && hasError ? (
            <button className="w-24 h-10 text-white bg-red-600 rounded">
              Next
            </button>
          ) : current === steps.length - 1 ? (
            ""
          ) : (
            <button
              onClick={() => next()}
              className="w-24 h-10 text-white bg-blue-600 rounded"
            >
              Next
            </button>
          )}
          {current === steps.length - 1 && hasError ? (
            <button className="w-24 h-10 text-white bg-red-600 rounded">
              Done
            </button>
          ) : current === steps.length - 1 ? (
            <button
              onClick={() => handleDone()}
              className="w-24 h-10 text-white bg-primary rounded"
            >
              Done
            </button>
          ) : (
            ""
          )}
          {current > 0 && (
            <button
              onClick={() => prev()}
              className="w-24 h-10 text-white bg-slate-300 rounded"
            >
              Previous
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Create;
