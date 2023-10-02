import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Steps } from "antd";

import { getDetailAddress } from "../../redux/slice/63_province/63_provinces.slice";

import SelectProvince from "./SelectProvince";
import SelectDistrict from "./SelectDistrict";
import SelectWard from "./SelectWard";
import LoadingFull from "../../components/common/LoadingFull";

const ModalForUpdateAddress = ({
  isOpen,
  handleToggleUpdateModal,
  handleChangeCheckedValue,
  checkedValue,
  addressChecked,
}) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.ProvinceVietNam.address_detail
  );

  const [current, setCurrent] = useState(0);
  const [province, setProvince] = useState(
    data?.province ? data.province : null
  );
  const [district, setDistrict] = useState(
    data?.district ? data.district : null
  );
  const [ward, setWard] = useState(data?.ward ? data.ward : null);
  const [address, setAddress] = useState(
    addressChecked ? addressChecked : null
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (checkedValue) {
      dispatch(
        getDetailAddress({
          detailAddress: checkedValue,
        })
      );
    }
  }, [checkedValue]);

  console.log(checkedValue);

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

  const handleCloseButton = () => {
    handleChangeCheckedValue(null);
    handleToggleUpdateModal(false);
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

  if (loading && isOpen) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
        <div className="relative w-1/2 h-36 flex flex-col justify-start items-center gap-4 bg-white p-4 rounded">
          <LoadingFull />
        </div>
      </div>
    );
  }

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
      <div className="relative w-1/2 h-36 flex flex-col justify-start items-center gap-4 bg-white p-4 rounded">
        <button
          onClick={() => handleCloseButton()}
          className="absolute top-0 right-0 w-6 h-6 text-white bg-red-600 rounded"
        >
          <FontAwesomeIcon icon="fas fa-times" />
        </button>
        <Steps current={current} items={items} className="pt-4" />
        <div className="w-full">{steps[current].content()}</div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalForUpdateAddress;
