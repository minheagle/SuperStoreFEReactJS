import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addAddress } from "../../redux/slice/user/user.slice";
import { getDetailAddress } from "../../redux/slice/63_province/63_provinces.slice";
import ROUTES from "../../constants/ROUTES";

import SelectProvince from "./SelectProvince";
import SelectDistrict from "./SelectDistrict";
import SelectWard from "./SelectWard";
import InputAddress from "./InputAddress";

const ModalForAddress = ({
  isOpen,
  isUpdate,
  checkedValue,
  handleCloseCreateModal,
  handleToggleUpdateState,
  handleChangeCheckedValue,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector(
    (state) => state.ProvinceVietNam.address_detail
  );

  const [current, setCurrent] = useState(0);
  const [province, setProvince] = useState(
    data?.province ? data.province : null
  );
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [address, setAddress] = useState(null);
  const [hasError, setHasError] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  console.log(isUpdate);
  console.log(checkedValue);

  useEffect(() => {
    if (isUpdate && checkedValue) {
      dispatch(
        getDetailAddress({
          detailAddress: checkedValue,
        })
      );
    }
  }, [isUpdate, checkedValue]);

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

  const handleDone = () => {
    const userAddress = `${address}, ${JSON.parse(ward).name}, ${
      JSON.parse(district).name
    }, ${JSON.parse(province).name}`;
    dispatch(
      addAddress({
        addressString: userAddress,
        userId: userData.id,
        callback: {
          closeModal: () => handleCloseCreateModal(false),
          goToAddress: () => navigate(ROUTES.USER.ACCOUNT_ADDRESS),
        },
      })
    );
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

  const handleCloseButton = () => {
    handleChangeCheckedValue(null);
    handleToggleUpdateState(false);
    handleCloseCreateModal(false);
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
      <div className="relative w-1/2 flex flex-col justify-start items-center gap-4 bg-white p-4 rounded">
        <button
          onClick={() => handleCloseButton()}
          className="absolute top-0 right-0 w-6 h-6 text-white bg-red-600 rounded"
        >
          <FontAwesomeIcon icon="fas fa-times" />
        </button>
        <Steps current={current} items={items} className="pt-4" />
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
    </div>
  ) : (
    ""
  );
};

export default ModalForAddress;
