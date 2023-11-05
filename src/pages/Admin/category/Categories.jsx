import { useEffect } from "react";
import { Link, useNavigate, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tree } from "antd";
const { DirectoryTree } = Tree;

import {
  getAllCategory,
  deleteCategory,
} from "../../../redux/slice/admin/category.slice";
import ROUTES from "../../../constants/ROUTES.js";

import CategoryItem from "../../../components/Admin/category/CategoryItem.jsx";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, delete_item } = useSelector((state) => state.Category);

  const convertData = list.data.length === 0 ? [] : list.data;

  useEffect(() => {
    dispatch(getAllCategory());
  }, [delete_item.loading]);

  const buildNestedArray = (data = []) => {
    const map = new Map();
    const result = [];

    // Đầu tiên, tạo một bản đồ với id của mỗi phần tử làm khóa
    data.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    // Sau đó, xây dựng mảng kết quả với các mục gốc (có parentId = 0)
    data.forEach((item) => {
      if (item.parentId === 0) {
        result.push(map.get(item.id));
      } else {
        // Nếu không phải là mục gốc, thêm nó vào danh sách con của mục cha tương ứng
        map.get(item.parentId).children.push(map.get(item.id));
      }
    });

    return result;
  };

  // const handleMoveCategory = (isOpenModal, selectedCategoryId) => {
  //   setOpenModal(isOpenModal);
  //   setSelectedCategory(selectedCategoryId);
  // };

  const handleRenderCategories = () => {
    const newList = buildNestedArray(convertData);
    return newList?.map((item) => {
      return <CategoryItem key={item.id} item={item} />;
    });
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-white rounded p-8">
        <div className="w-full flex justify-between items-center">
          <div className="w-1/3 flex justify-center items-center border rounded">
            <FontAwesomeIcon
              icon="fas fa-search"
              className="w-1/12 px-2 text-slate-500"
            />
            <input type="text" className="w-9/12" />
            <div className="w-2/12 p-1">
              <button className="w-full bg-slate-500 text-white rounded">
                Search
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate(ROUTES.ADMIN.CATEGORIES.CREATE)}
              className="w-24 h-10 text-white bg-slate-500 rounded"
            >
              Create
            </button>
          </div>
        </div>
        {/* Directory Tree */}
        <div className="w-2/3">{handleRenderCategories()}</div>
        {/* Modal */}
        {/* {openModal ? (
          <ModalListCategory
            handleMoveCategory={handleMoveCategory}
            selectedCategory={selectedCategory}
          />
        ) : (
          ""
        )} */}
        {/* <Paging /> */}
      </div>
    </div>
  );
};

export default Categories;
