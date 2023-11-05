import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "antd";

import { getAllUser } from "../../../redux/slice/admin/userForAdmin.slice";
import {
  changePageUsers,
  changeSizeUsers,
  changeSortUsers,
} from "../../../redux/slice/admin/paging.user.admin.slice";
import defaultAvatar from "../../../assets/default-avatar.jpg";

import Table from "../../../components/common/Table";
import Paging from "../../../components/common/Paging";
import ROUTES from "../../../constants/ROUTES";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error, paging } = useSelector(
    (state) => state.UserForAdmin.list
  );
  const { page, size, sort } = useSelector((state) => state.PagingAdmin.users);

  const total = paging?.totalElements
    ? Number.parseInt(paging.totalElements)
    : 0;

  useEffect(() => {
    dispatch(
      getAllUser({
        params: {
          page,
          size,
          sort,
        },
      })
    );
  }, [page, size, sort]);

  const handleChangeSize = (pageNew, sizeNew) => {
    if (pageNew !== page) {
      dispatch(changePageUsers(pageNew));
    }
    if (sizeNew !== size) {
      dispatch(changeSizeUsers(sizeNew));
    }
  };

  const columns = [
    {
      key: "userName",
      title: "Username",
      layout: "4/12",
      render: (record) => {
        return (
          <div className="w-full flex justify-start items-center gap-2">
            <div className="shrink-0 w-12 h-12 flex justify-center items-center">
              {record?.imageUrl ? (
                <img
                  src={record.imageUrl}
                  alt=""
                  className="w-full object-cover aspect-square rounded-full"
                />
              ) : (
                <img
                  src={defaultAvatar}
                  alt=""
                  className="w-full object-cover aspect-square rounded-full"
                />
              )}
            </div>
            <div className="flex-1">
              <span className="line-clamp-1">{record.userName}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: "phone",
      title: "Phone",
      layout: "2/12",
    },
    {
      key: "email",
      title: "Email",
      layout: "3/12",
    },
    {
      key: "role",
      title: "Role",
      layout: "2/12",
      render: (record) => {
        return (
          <div className="w-full flex flex-col justify-start items-start">
            <ul>
              {record?.roles?.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      layout: "1/12",
      render: (record) => {
        return (
          <div className="w-full flex justify-around items-center">
            <Link
              to={generatePath(ROUTES.ADMIN.USERS.DETAIL, {
                userName: record.userName,
              })}
              state={{ userName: record.userName }}
            >
              <FontAwesomeIcon icon="fas fa-info-circle" className="" />
            </Link>
            <Link
              to={generatePath(ROUTES.ADMIN.USERS.EDIT, {
                userName: record.userName,
              })}
              state={{ userName: record.userName }}
            >
              <FontAwesomeIcon icon="fas fa-edit" className="text-yellow-500" />
            </Link>
            <button>
              <FontAwesomeIcon icon="fas fa-trash" className="text-red-600" />
            </button>
          </div>
        );
      },
    },
  ];

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
              onClick={() => navigate(ROUTES.ADMIN.USERS.CREATE)}
              className="w-24 h-10 text-white bg-slate-500 rounded"
            >
              Create
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          styleHead="bg-slate-600 text-white"
          styleLineHead="w-full h-12"
          styleCellHead="h-12 border border-slate-400"
          styleLineBody="h-10 hover:bg-slate-400 hover:text-white"
          styleCellBody="border border-slate-500 p-2"
          className="w-full border-collapse border border-slate-500"
        />
        <Pagination
          showSizeChanger
          defaultCurrent={page}
          current={page}
          total={total}
          onChange={(page, size) => handleChangeSize(page, size)}
        />
      </div>
    </div>
  );
};

export default Users;
