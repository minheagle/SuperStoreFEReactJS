import { useEffect, useState } from "react";
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

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { list, delete_item } = useSelector((state) => state.Category);

  const convertData = list.data.length === 0 ? [] : list.data;

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleDeleteCategory = (categoryId) => {
    dispatch(
      deleteCategory({
        data: categoryId,
        callback: {
          refreshPage: () => window.location.reload(),
        },
      })
    );
  };

  const convertToTree = (data) => {
    if (data.length === 0) {
      return;
    }
    // Tạo một map để lưu trữ các nút theo id
    const nodeMap = {};

    // Tạo cây gốc
    let rootNode = null;

    // Lặp qua danh sách dữ liệu ban đầu và tạo các nút
    data?.forEach((item) => {
      const { id, content, parentId, imageUrl } = item;
      const newNode = {
        title: (
          <div className="w-full h-24 flex justify-start items-center pl-24">
            <div className="w-1/2 flex justify-start items-center pl-4">
              <span className="font-semibold">{content}</span>
            </div>
            <div className="w-1/2 flex justify-end items-center">
              <div className="w-full flex justify-around items-center">
                <Link
                  to={generatePath(ROUTES.ADMIN.CATEGORIES.EDIT, {
                    id: id,
                  })}
                  state={{ categoryId: id }}
                  className="w-20 h-10 flex justify-center items-center text-white bg-yellow-500 rounded"
                >
                  Edit
                </Link>
                {/* {parentId === 0 ? (
                <div className="group relative">
                  <button className="w-20 h-10 text-white bg-slate-300 border border-blue-600 rounded">
                    Move
                  </button>
                  <div className="absolute hidden top-10 left-0 z-20 p-2 group-hover:block">
                    <div className="w-36 bg-slate-600 p-1 text-white rounded">
                      <p>Category is root</p>
                      <p>Can't move</p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleMoveCategory(true, id)}
                  className="w-20 h-10 text-white bg-blue-600 rounded"
                >
                  Move
                </button>
              )} */}
                {parentId === 0 ? (
                  <div className="group relative">
                    <button className="w-20 h-10 text-white bg-slate-300 border border-red-600 rounded">
                      Delete
                    </button>
                    <div className="absolute hidden top-10 left-0 z-20 p-2 group-hover:block">
                      <div className="w-36 bg-slate-600 p-1 text-white rounded">
                        <p>Category is root</p>
                        <p>Can't delete</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteCategory(id)}
                    className="w-20 h-10 text-white bg-red-600 rounded"
                  >
                    {delete_item.loading ? (
                      <div>
                        <svg
                          aria-hidden="true"
                          className="inline w-4 h-4 text-gray-200 animate-spin fill-red-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ),
        key: id,
        icon: (
          <div className="w-24 h-24">
            <img
              src={imageUrl}
              alt=""
              className="object-cover w-24 h-24 rounded-full"
            />
          </div>
        ),
        children: [],
      };
      nodeMap[id] = newNode;

      // Nếu parentId là 0, đây là nút gốc
      if (parentId === 0) {
        rootNode = newNode;
      } else {
        // Nếu không, thêm nút này vào danh sách con của nút cha
        if (nodeMap[parentId]) {
          nodeMap[parentId]?.children.push(newNode);
        }
      }
    });

    return [rootNode]; // Trả về mảng chứa nút gốc
  };

  const handleMoveCategory = (isOpenModal, selectedCategoryId) => {
    setOpenModal(isOpenModal);
    setSelectedCategory(selectedCategoryId);
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
        <div className="w-1/2">
          <DirectoryTree
            multiple
            treeData={convertToTree(convertData)}
            className="w-full"
          />
        </div>
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
