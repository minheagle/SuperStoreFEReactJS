import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWard } from "../../redux/slice/63_province/63_provinces.slice";

const SelectWard = ({ district, ward, handleOnChangeWard, handleError }) => {
  const dispatch = useDispatch();
  const districtData = JSON.parse(district);
  const { data } = useSelector((state) => state.ProvinceVietNam.wards);
  const [value, setValue] = useState(ward ? ward : null);

  useEffect(() => {
    dispatch(
      getWard({
        districtId: districtData.id,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    handleError();
  }, [value]);

  const newWardList = [{ id: 0, name: "Select your ward" }, ...data];

  const handleRenderOption = () => {
    return newWardList?.map((item) => {
      return (
        <option key={item.id} value={JSON.stringify(item)}>
          {item.name}
        </option>
      );
    });
  };

  const handleOnChangeValue = (e) => {
    setValue(e.target.value);
    handleOnChangeWard(e.target.value);
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

export default SelectWard;
