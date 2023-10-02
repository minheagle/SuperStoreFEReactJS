import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProvince } from "../../redux/slice/63_province/63_provinces.slice";

const SelectProvince = ({ province, handleOnChangeProvince, handleError }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ProvinceVietNam.provinces);
  const [value, setValue] = useState(province ? province : null);

  // console.log(province);

  useEffect(() => {
    dispatch(getAllProvince());
  }, [dispatch]);

  useEffect(() => {
    handleError();
  }, [value]);

  const newProvinceList = [{ id: 0, name: "Select your province" }, ...data];

  const handleRenderOption = () => {
    return newProvinceList?.map((item) => {
      return (
        <option key={item.id} value={JSON.stringify(item)}>
          {item.name}
        </option>
      );
    });
  };

  const handleOnChangeValue = (e) => {
    setValue(e.target.value);
    handleOnChangeProvince(e.target.value);
  };
  return (
    <div>
      <select
        name=""
        id=""
        defaultValue={value}
        onChange={(e) => handleOnChangeValue(e)}
      >
        {handleRenderOption()}
      </select>
    </div>
  );
};

export default SelectProvince;
