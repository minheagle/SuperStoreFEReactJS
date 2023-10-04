import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Steps } from "antd";

import { getDetailAddress } from "../../../redux/slice/63_province/63_provinces.slice";
import { updateAddress } from "../../../redux/slice/user/user.slice";
import ROUTES from "../../../constants/ROUTES";

import SelectProvince from "../../../components/User/SelectProvince";
import SelectDistrict from "../../../components/User/SelectDistrict";
import SelectWard from "../../../components/User/SelectWard";
import InputAddress from "../../../components/User/InputAddress";

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { addressId } = useParams();
  const { data, loading } = useSelector(
    (state) => state.ProvinceVietNam.address_detail
  );
  const userData = JSON.parse(localStorage.getItem("userData"));
  let addressChecked = userData?.address?.find(
    (item) => item.id === Number.parseInt(addressId)
  );
  const handleDetailAddress = (value) => {
    const arr = value?.split(", ");
    return {
      wardName: arr[1],
      districtName: arr[2],
      provinceName: arr[3],
    };
  };

  const handleAddress = (value) => {
    const arr = value?.split(", ");
    return arr[0];
  };

  useEffect(() => {
    dispatch(
      getDetailAddress({
        detailAddress: handleDetailAddress(addressChecked.addressName),
      })
    );
  }, []);

  const [current, setCurrent] = useState(0);
  const [province, setProvince] = useState(
    data?.province ? JSON.stringify(data.province) : null
  );
  const [district, setDistrict] = useState(
    data?.district ? JSON.stringify(data.district) : null
  );
  const [ward, setWard] = useState(
    data?.ward ? JSON.stringify(data.ward) : null
  );
  const [address, setAddress] = useState(
    addressChecked ? handleAddress(addressChecked.addressName) : null
  );
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

  const handleDone = () => {
    const userAddress = `${address}, ${JSON.parse(ward).name}, ${
      JSON.parse(district).name
    }, ${JSON.parse(province).name}`;
    dispatch(
      updateAddress({
        addressUpdate: userAddress,
        addressId: addressId,
        callback: {
          goToAddress: () => navigate(ROUTES.USER.ACCOUNT_ADDRESS),
        },
      })
    );
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
    </div>
  );
};

export default Update;
