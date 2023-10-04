import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDistrict } from "../../redux/slice/63_province/63_provinces.slice";

const SelectDistrict = ({
  province,
  district,
  handleOnChangeDistrict,
  handleError,
}) => {
  const dispatch = useDispatch();
  const provinceData = JSON.parse(province);
  const { data } = useSelector((state) => state.ProvinceVietNam.districts);
  const [value, setValue] = useState(district ? district : null);

  useEffect(() => {
    dispatch(
      getDistrict({
        provinceId: provinceData.id,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    handleError();
  }, [value]);

  const newDistrictList = [{ id: 0, name: "Select your district" }, ...data];

  const handleRenderOption = () => {
    return newDistrictList?.map((item) => {
      return (
        <option key={item.id} value={JSON.stringify(item)}>
          {item.name}
        </option>
      );
    });
  };

  const handleOnChangeValue = (e) => {
    setValue(e.target.value);
    handleOnChangeDistrict(e.target.value);
  };

  return (
    <div>
      <select
        name=""
        id=""
        value={value}
        onChange={(e) => handleOnChangeValue(e)}
      >
        {handleRenderOption()}
      </select>
    </div>
  );
};

export default SelectDistrict;
