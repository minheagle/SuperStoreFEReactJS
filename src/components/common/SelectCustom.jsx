const SelectCustom = ({ onChange }) => {
  const cateList = [
    { id: 1, title: "Cate 1" },
    { id: 2, title: "Cate 2" },
    { id: 3, title: "Cate 3" },
    { id: 4, title: "Cate 4" },
    { id: 5, title: "Cate 5" },
    { id: 6, title: "Cate 6" },
  ];

  const newCateList = [{ id: 0, title: "Select an option" }, ...cateList];

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
      name="category"
      id=""
      onChange={(e) => onChange(e)}
      className="outline-none"
    >
      {handleRenderCateList()}
    </select>
  );
};

export default SelectCustom;
