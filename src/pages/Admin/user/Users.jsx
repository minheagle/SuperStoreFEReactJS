import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getAllUser } from "../../../redux/slice/admin/userForAdmin.slice";

import Table from "../../../components/common/Table";
import Paging from "../../../components/common/Paging";
import ROUTES from "../../../constants/ROUTES";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error, totalCount } = useSelector(
    (state) => state.UserForAdmin.list
  );

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const columns = [
    {
      key: "fullName",
      title: "FullName",
      layout: "3/12",
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
      layout: "1/12",
    },
    {
      key: "actions",
      title: "Actions",
      layout: "3/12",
      render: (record) => {
        return (
          <div className="w-full flex justify-around items-center">
            <Link
              to={record._id}
              state={{ userId: record._id }}
              className="w-1/4 text-center text-white bg-green-600 rounded"
            >
              View
            </Link>
            <Link
              to={generatePath(ROUTES.ADMIN.USERS.EDIT, { id: record._id })}
              state={{ userId: record._id }}
              className="w-1/4 text-center text-white bg-yellow-400 rounded"
            >
              Edit
            </Link>
            <button className="w-1/4 text-white bg-red-500 rounded">
              Delete
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
        <Paging total={totalCount} />
      </div>
    </div>
  );
};

export default Users;
