import { useEffect, useState } from "react";

const InputAddress = ({ address, handleOnChangeAddress, handleError }) => {
  console.log(address);
  const [value, setValue] = useState(address ? address : null);

  useEffect(() => {
    handleError();
  }, [value]);

  const handOnChangeValue = (e) => {
    setValue(e.target.value);
    handleOnChangeAddress(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        defaultValue={value}
        onChange={(e) => handOnChangeValue(e)}
        className="border border-black outline-none rounded"
      />
    </div>
  );
};

export default InputAddress;
