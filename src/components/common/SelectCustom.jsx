const SelectCustom = ({ field, form }) => {
  const cateList = [
    { id: 1, title: "Cate 1" },
    { id: 2, title: "Cate 2" },
    { id: 3, title: "Cate 3" },
    { id: 4, title: "Cate 4" },
    { id: 5, title: "Cate 5" },
    { id: 6, title: "Cate 6" },
  ];

  const newCateList = [{ id: "", title: "Select an option" }, ...cateList];

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
