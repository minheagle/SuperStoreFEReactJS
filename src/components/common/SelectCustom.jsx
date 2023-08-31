const SelectCustom = ({ field, form, options }) => {
  const newCateList = [{ id: "", title: "Select an option" }, ...options];

  const isError = form.errors[field.name] && form.touched[field.name];

  const handleRenderCateList = () => {
    return newCateList.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      );
    });
  };

  return (
    <select
      {...field}
      onChange={(e) => field.onChange(e)}
      className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
        isError ? "outline outline-2 outline-red-500" : ""
      }`}
    >
      {handleRenderCateList()}
    </select>
  );
};

export default SelectCustom;
